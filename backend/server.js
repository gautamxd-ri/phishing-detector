require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);
const express     = require('express');
const mongoose    = require('mongoose');
const cors        = require('cors');
const analyzeRoute  = require('./routes/analyze');
const feedbackRoute = require('./routes/feedback');

const app  = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://phishing-detector-rho-gray.vercel.app'
  ]
}));
app.use(express.json());

// Routes
app.use('/api', analyzeRoute);
app.use('/api', feedbackRoute);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Phishing Detector backend is running!' });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Something went wrong' });
});
