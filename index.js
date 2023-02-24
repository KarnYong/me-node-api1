// Require the necessary modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


// Create a new Express app
const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your API endpoints
app.get('/users', (req, res) => {
  // Query the database to get all users
  connection.query('SELECT * FROM users', (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/users', (req, res) => {
  // Insert a new user into the database
  const { name, email } = req.body;
  connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

// Set up a MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Connect to the MySQL server
connection.connect((error) => {
  if (error) throw error;
  console.log('Connected to the MySQL server.');
});

// Start the Express server
app.listen(5000, () => {
  console.log('Server started on port 5000.');
});
