const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// Database setup
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
