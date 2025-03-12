const express = require("express");
const path = require('path');

// Create an Express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to parse JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set the view engine to EJS and specify the views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Define the route to render the index.ejs file
app.get('/', (req, res) => {
  res.render('index'); // Renders index.ejs in the views folder
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
