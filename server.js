const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/productivity', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema
const timeSchema = new mongoose.Schema({
    domain: String,
    time: Number,
    productive: Number,
    unproductive: Number
});

const TimeEntry = mongoose.model('TimeEntry', timeSchema);

// API routes
app.post('/api/time', async (req, res) => {
    const { domain, time, productive, unproductive } = req.body;
    const entry = new TimeEntry({ domain, time, productive, unproductive });
    await entry.save();
    res.status(201).send(entry);
});

app.get('/api/time', async (req, res) => {
    const entries = await TimeEntry.find();
    res.send(entries);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});