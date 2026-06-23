const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      unique: true,
      required: true
    },
    inputType: {
      type: String,
      enum: ['url', 'email', 'sms'],
      required: true
    },
    inputText: {
      type: String,
      required: true
    },
    verdict: {
      type: String,
      enum: ['safe', 'suspicious', 'dangerous'],
      required: true
    },
    confidence: {
      type: String,
      enum: ['low', 'medium', 'high']
    },
    reasons: {
      type: [String],
      default: []
    },
    summary: {
      type: String
    },
    modelLabel: {
      type: String
    },
    modelScore: {
      type: Number
    },
    modelSource: {
      type: String,
      enum: ['huggingface', 'mock']
    },
    feedback: {
      type: String,
      enum: ['up', 'down', null],
      default: null
    },
    correctedVerdict: {
      type: String,
      enum: ['safe', 'suspicious', 'dangerous', null],
      default: null
    },
    feedbackAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Scan', ScanSchema);
