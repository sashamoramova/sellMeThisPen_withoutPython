const { translate } = require('../services/speach.service');

exports.translateText = async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).json({ error: 'No text provided' });
    }
    
    const { text, translated } = await translate(req.body.text);
    res.json({ text, translated });
  } catch (e) {
    console.error('TRANSLATION ERROR:', e);
    res.status(500).json({ error: 'Server error', details: e.message });
  }
};
