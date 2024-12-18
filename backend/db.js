// Import the SQLite3 library so we can use it to work with our database.
// The "verbose()" function gives us extra information in case there are any errors.
const sqlite3 = require("sqlite3").verbose(); 

// Open a connection to the database file named "database.sqlite".
// If the file doesn't exist, SQLite will create it for us.
// The callback function runs after the connection attempt.
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    // If there's a problem opening the database, show an error message.
    console.error("Error opening database:", err.message);
  } else {
    // If the database opens successfully, let us know it's connected.
    console.log("Connected to SQLite database.");
  }
});

// Export the "db" object so we can use this database connection in other parts of the app.
module.exports = db;
