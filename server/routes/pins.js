const router = require('express').Router();

const Pin = require('../models/Pin');

// Create a Pin.
router.post('/', async (req, res) => {
  const pinCandidate = new Pin(req.body);
  try {
    const savedPin = await pinCandidate.save();
    res.status(200).json(savedPin);
    console.log('[Success] Adding Pin to DB!');
  } catch (err) {
    console.log('[Failed] Adding Pin to DB!');
    res.status(500).json(err);
  }
});

// Get all Pins And filer by title, ratings, and username.
router.get('/', async (req, res) => {
  try {
    const pins = await Pin.find();
    console.log('[Success] Finding all Pins from DB!');
    res.status(200).json(pins);
  } catch (err) {
    console.log('[Failed] Finding all Pins from DB!');
    res.status(500).json(err);
  }
});

module.exports = router;
