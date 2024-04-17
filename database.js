USE YOUR_DATABASE_NAME;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    password_hash VARCHAR(255),
    verification_token VARCHAR(255),
    verified BOOLEAN DEFAULT false
);
