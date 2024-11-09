const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

// Connect to the SQLite database
const db = new sqlite3.Database('./dietary.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');

  // Create a table for meal plans (if it doesn't exist)
  db.run(`CREATE TABLE IF NOT EXISTS meal_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    breakfast TEXT,
    lunch TEXT,
    dinner TEXT
  )`);
});

// Middleware
app.use(cors());
app.use(express.json());

// Create a meal plan
app.post('/api/meal-plans', (req, res) => {
    const { breakfast, lunch, dinner } = req.body;
    db.run('INSERT INTO meal_plans (breakfast, lunch, dinner) VALUES (?, ?, ?)', [breakfast, lunch, dinner], (err) => {
      if (err) {
        return console.error(err.message);
      }
      res.json({ message: 'Meal plan created successfully' });
    });
  });


// API endpoint to get a meal plan
app.get('/api/meal-plan', (req, res) => {
  db.all('SELECT * FROM meal_plans ORDER BY RANDOM() LIMIT 1', (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(row[0]);
  });
});

// Get a specific meal plan
app.get('/api/meal-plans/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM meal_plans WHERE id = ?', id, (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      res.json(row);
    });
  });
  
  // Update a meal plan
  app.put('/api/meal-plans/:id', (req, res) => {
    const id = req.params.id;
    const { breakfast, lunch, dinner } = req.body;
    db.run('UPDATE meal_plans SET breakfast = ?, lunch = ?, dinner = ? WHERE id = ?', [breakfast, lunch, dinner, id], (err) => {
      if (err) {
        return console.error(err.message);
      }
      res.json({ message: 'Meal plan updated successfully' });
    });
  });
  
  // Delete a meal plan
  app.delete('/api/meal-plans/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM meal_plans WHERE id = ?', id, (err) => {
      if (err) {
        return console.error(err.message);
      }
      res.json({ message: 'Meal plan deleted successfully' });
    });
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});