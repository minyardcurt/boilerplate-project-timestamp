// server.js
const express = require('express');
const app = express();

// Enable CORS (for FCC testing)
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files if needed
app.use(express.static('public'));

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint for timestamp
app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // No date provided, use current date
    date = new Date();
  } else {
    // If date is purely a number, treat as UNIX timestamp
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  if (date.toString() === 'Invalid Date') {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on the port
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
