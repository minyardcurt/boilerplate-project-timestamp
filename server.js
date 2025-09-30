const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (if any)
app.use(express.static('public'));

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API endpoint
app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;

  // If no date provided, use current date
  let date = dateParam ? new Date(dateParam) : new Date();

  // Handle UNIX timestamp input
  if (!isNaN(dateParam) && !isNaN(Number(dateParam))) {
    date = new Date(Number(dateParam));
  }

  // Check for invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
