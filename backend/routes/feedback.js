const router = require('express').Router();
const Scan = require('../models/scan');

router.post('/feedback', async (req, res) => {
  try {
    const { scanId, key, feedback, correctedVerdict } = req.body;

    if (!feedback || !['up', 'down'].includes(feedback)) {
      return res.status(400).json({ error: 'feedback must be "up" or "down"' });
    }

    if (!scanId && !key) {
      return res.status(400).json({ error: 'scanId or key is required' });
    }

    if (feedback === 'down') {
      if (!correctedVerdict || !['safe', 'suspicious', 'dangerous'].includes(correctedVerdict)) {
        return res.status(400).json({
          error: 'correctedVerdict (safe, suspicious, dangerous) is required when feedback is down'
        });
      }
    }

    const scan = scanId
      ? await Scan.findById(scanId)
      : await Scan.findOne({ key });

    if (!scan) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    scan.feedback = feedback;
    scan.feedbackAt = new Date();
    scan.correctedVerdict = feedback === 'up' ? scan.verdict : correctedVerdict;

    await scan.save();

    res.json({
      message: 'Feedback saved',
      scan: scan.toObject()
    });
  } catch (error) {
    console.error('Feedback route error:', error);
    res.status(500).json({ error: 'Could not save feedback: ' + error.message });
  }
});

module.exports = router;
