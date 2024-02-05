const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'crud_app',
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API routes

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

// Create a new user
app.post('/users/add', (req, res) => {
  const { first_name, last_name, profile_picture, description, age, address } = req.body;

  db.query(
    'INSERT INTO users (first_name, last_name, profile_picture, description, age, address) VALUES (?, ?, ?, ?, ?, ?)',
    [first_name, last_name, profile_picture, description, age, address],
    (err, result) => {
      if (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.status(201).json({ id: result.insertId });
    }
  );
});

// Update a user
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, profile_picture, description, age, address } = req.body;

  db.query(
    'UPDATE users SET first_name=?, last_name=?, profile_picture=?, description=?, age=?, address=? WHERE id=?',
    [first_name, last_name, profile_picture, description, age, address, userId],
    (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.status(200).json({ message: 'User updated successfully' });
    }
  );
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  db.query('DELETE FROM users WHERE id=?', [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
