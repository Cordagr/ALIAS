const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

// Initialize SendGrid with your API key
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

// Database setup (assuming you're using MySQL)
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'YOUR_DATABASE_NAME'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Route for sending verification email and creating user record
app.post('/signup', (req, res) => {
  const { email } = req.body;

  // Check if the user already exists in the database
  const checkUserSql = 'SELECT * FROM users WHERE email = ?';
  connection.query(checkUserSql, [email], (error, results) => {
    if (error) {
      console.error('Error checking user in database:', error);
      res.status(500).json({ error: 'Failed to create user' });
      return;
    }

    // If user already exists and is verified, return error
    if (results.length > 0 && results[0].verified) {
      res.status(400).json({ error: 'User with this email already exists and is verified' });
      return;
    }

    // Generate a unique verification token
    const verificationToken = uuid.v4();

    // Save verification token and email to your database
    const sql = 'INSERT INTO users (email, verification_token) VALUES (?, ?) ON DUPLICATE KEY UPDATE verification_token = VALUES(verification_token)';
    connection.query(sql, [email, verificationToken], (error, results) => {
      if (error) {
        console.error('Error saving verification token to database:', error);
        res.status(500).json({ error: 'Failed to create user' });
        return;
      }

      // Send verification email
      const msg = {
        to: email,
        from: 'YOUR_SENDGRID_VERIFIED_SENDER_EMAIL',
        subject: 'Verify Your Email Address',
        html: `
          <p>Please click <a href="http://yourapp.com/verify?token=${verificationToken}">here</a> to verify your email address.</p>
        `,
      };

      sgMail.send(msg)
        .then(() => {
          res.status(200).json({ message: 'Verification email sent successfully' });
        })
        .catch((error) => {
          console.error('Error sending verification email:', error);
          res.status(500).json({ error: 'Failed to send verification email' });
        });
    });
  });
});

// Endpoint to receive SendGrid webhook notifications
app.post('/sendgrid-webhook', (req, res) => {
    const { email, event } = req.body; // Assuming SendGrid sends email and event type in the request body
  
    // Handle the webhook event
    if (event === 'click') {
      // Mark the user's email as verified based on the email address
      const updateSql = 'UPDATE users SET verified = true WHERE email = ?';
      connection.query(updateSql, [email], (error, results) => {
        if (error) {
          console.error('Error updating user verification status:', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
        console.log(`User with email ${email} clicked the verification link`);
        res.sendStatus(200);
      });
    } else {
      // Ignore other events
      res.sendStatus(200);
    }
  });

// Route for completing profile after email verification
app.post('/complete-profile', (req, res) => {
  const { email, name, password } = req.body;

  // Hash password
  bcrypt.hash(password, 10, (err, passwordHash) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).json({ error: 'Failed to create user' });
      return;
    }

    // Update user record in the database with name and password
    const sql = 'UPDATE users SET name = ?, password_hash = ?, verified = true WHERE email = ?';
    connection.query(sql, [name, passwordHash, email], (error, results) => {
      if (error) {
        console.error('Error completing profile:', error);
        res.status(500).json({ error: 'Failed to complete profile' });
        return;
      }

      res.status(200).json({ message: 'Profile completed successfully' });
    });
  });
});


function generateToken(user) {
    const token = jwt.sign({ email: user.email, name: user.name }, 'your_secret_key', { expiresIn: '1h' });
    return token;
}

// Middleware function to verify JWT token and user verification status
function verifyTokenAndEmailVerification(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        const { email } = decoded;
        
        // Check user verification status
        const checkVerificationSql = 'SELECT * FROM users WHERE email = ?';
        connection.query(checkVerificationSql, [email], (error, results) => {
            if (error) {
                console.error('Error checking user verification status:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!results[0].verified) {
                return res.status(403).json({ message: 'Email not verified' });
            }

            req.user = decoded;
            next();
        });
    });
}

// Endpoint to create a new appointment
app.post('/appointments', (req, res) => {
    const { userId, date, timeSlotId, type, details } = req.body;
  
    // Query the database to check if the selected time slot is available
    const sql = 'SELECT * FROM available_time_slots WHERE id = ? AND is_booked = 0';
    connection.query(sql, [timeSlotId], (error, results) => {
      if (error) {
        console.error('Error checking time slot availability:', error);
        return res.status(500).json({ error: 'Failed to check time slot availability' });
      }
  
      // If the selected time slot is not available, return an error
      if (results.length === 0) {
        return res.status(409).json({ error: 'The selected time slot is not available. Please choose a different time.' });
      }
  
      // If the time slot is available, insert the appointment into the database
      const { start_time, end_time } = results[0]; // Assuming the available_time_slots table has start_time and end_time columns
      const insertSql = 'INSERT INTO appointments (user_id, date, start_time, end_time, type, details) VALUES (?, ?, ?, ?, ?, ?)';
      connection.query(insertSql, [userId, date, start_time, end_time, type, details], (error, results) => {
        if (error) {
          console.error('Error creating appointment:', error);
          return res.status(500).json({ error: 'Failed to create appointment' });
        }
  
        // Mark the time slot as booked
        const markAsBookedSql = 'UPDATE available_time_slots SET is_booked = 1 WHERE id = ?';
        connection.query(markAsBookedSql, [timeSlotId], (error) => {
          if (error) {
            console.error('Error marking time slot as booked:', error);
            return res.status(500).json({ error: 'Failed to mark time slot as booked' });
          }
  
          res.status(201).json({ message: 'Appointment created successfully', appointmentId: results.insertId });
        });
      });
    });
  });
  
  app.listen(3000, () => {
  console.log('Server is running on port 3000');
})
