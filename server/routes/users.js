const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register.
router.post('/register', async (req, res) => {
  try {
    // Generate new password.
    const salt = await bcrypt.genSalt(10);
    const cryptedPass = await bcrypt.hash(req.body.password, salt);

    // Create new user.
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: cryptedPass,
    });

    // Save user and respond.
    const userSaved = await newUser.save();
    res.status(200).json(userSaved._id);
    console.log('[Success] Registering user!');
  } catch (err) {
    console.log('[Failed] Registering user!');
    res.status(500).json(err);
  }
});

// Login.
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (!user) {
      console.log('[Failed] Logging in user!');
      res.status(400).json('Wrong username or password!');
    } else {
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) {
        console.log('[Failed] Logging in user!');
        res.status(400).json('Wrong username or password!');
      } else {
        res.status(200).json(user);
        console.log('[Success] Logging in user!');
      }
    }
  } catch (err) {
    console.log('[Failed] Logging in user!');
    res.status(500).json(err);
  }
});

module.exports = router;
