const router = require('express').Router();
const Scan = require('../models/scan');
const callGroq = require('../services/groq');

router.post('/analyze', async (req, res) => {
  console.log('--- /api/analyze hit ---');

  try {
    const { type, text } = req.body;

    if (!type || !text) {
      return res.status(400).json({ error: 'type and text are required' });
    }

    if (!['url', 'email', 'sms'].includes(type)) {
      return res.status(400).json({ error: 'type must be url, email or sms' });
    }

    const key = type + ':' + text.trim();

    const cached = await Scan.findOne({ key });
    if (cached) {
      console.log('MongoDB cache hit!');
      return res.json({ ...cached.toObject(), fromCache: true });
    }

    console.log('Calling Groq API...');
    const result = await callGroq(type, text.trim());

    const scan = await Scan.create({
      key,
      inputType: type,
      inputText: text.trim(),
      ...result
    });

    res.json({ ...scan.toObject(), fromCache: false });

  } catch (error) {
    console.error('Analyze route error:', error);
    res.status(500).json({ error: 'Analysis failed: ' + error.message });
  }
});

router.get('/history', async (req, res) => {
  try {
    const history = await Scan.find()
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch history' });
  }
});

module.exports = router;