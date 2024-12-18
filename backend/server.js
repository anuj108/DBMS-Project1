// Importing necessary modules
const express = require("express"); // Express framework for building the server
const bodyParser = require("body-parser"); // Middleware for parsing JSON data in requests
const db = require("./db"); // SQLite database file for storing and retrieving data

const app = express(); // Creating an instance of the Express application

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
// Middleware to serve static files from the "frontend" folder
app.use(express.static("frontend"));

// Route to fetch products with optional filters
app.get("/products", (req, res) => {
  // Extract filters from the query parameters of the request
  const { search, minPrice, maxPrice, sort } = req.query;

  // Start building the SQL query
  let query = "SELECT * FROM products"; //
  const conditions = []; // Array to store SQL conditions

  // Add conditions based on the filters provided by the user
  if (search) conditions.push(`name LIKE '%${search}%'`); // Filter products by name
  if (minPrice) conditions.push(`price >= ${minPrice}`); // Filter products with price >= minPrice
  if (maxPrice) conditions.push(`price <= ${maxPrice}`); // Filter products with price <= maxPrice

  // If there are any conditions, add them to the query with "AND" logic
  if (conditions.length) query += ` WHERE ${conditions.join(" AND ")}`;

  // If a sort option is provided, add ORDER BY to the query
  if (sort) query += ` ORDER BY ${sort}`;

  // Limit the number of products returned to 10
  query += " LIMIT 10";

  // Execute the SQL query
  db.all(query, [], (err, rows) => {
    if (err) {
      // If there is an error, send a 400 response with the error message
      return res.status(400).json({ error: err.message });
    }
    // Send the fetched rows (products) as a JSON response
    res.json(rows);
  });
});

// Route to add a new product
app.post("/products", (req, res) => {
  // Extract product details from the request body
  const { name, price, category } = req.body;

  // SQL query to insert a new product into the database
  db.run(
    "INSERT INTO products (name, price, category) VALUES (?, ?, ?)",
    [name, price, category], // Values to insert
    function (err) {
      if (err) {
        // If there is an error, send a 400 response with the error message
        return res.status(400).json({ error: err.message });
      }
      // Send a response with the ID of the newly added product
      res.json({ id: this.lastID });
    }
  );
});

// Start the server and listen on port 3000
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
