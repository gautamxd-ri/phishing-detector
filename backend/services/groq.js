const axios = require('axios');

module.exports = async function callGroq(type, text) {
  const prompt = `You are a cybersecurity expert specializing in phishing detection.

Analyze this ${type} and determine if it is phishing/dangerous or safe.

${type.toUpperCase()} TO ANALYZE:
"${text}"

Respond in this EXACT JSON format only, no extra text:
{
  "verdict": "safe" or "suspicious" or "dangerous",
  "confidence": "low" or "medium" or "high",
  "reasons": ["reason 1", "reason 2"],
  "summary": "one line summary"
}`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.1
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const rawText = response.data.choices[0].message.content.trim();
    console.log('Groq raw response:', rawText);

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Model did not return valid JSON: ' + rawText);
    }

    const result = JSON.parse(jsonMatch[0]);

    return {
      verdict: result.verdict || 'suspicious',
      confidence: result.confidence || 'medium',
      reasons: result.reasons || ['Analysis completed'],
      summary: result.summary || `This ${type} has been analyzed.`
    };

  } catch (error) {
    if (error.response) {
      console.error('Groq API Error:', JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
};