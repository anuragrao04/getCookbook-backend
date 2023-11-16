// Add Express
const express = require("express");

// Initialize Express
const app = express();

// On GET request
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

// export it so that it can be recognised by vercel's serverless function
module.exports = app;
