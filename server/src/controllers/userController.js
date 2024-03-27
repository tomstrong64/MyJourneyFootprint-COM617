// controllers/userController.js
const User = require('../Models/user');
const bcrypt = require('bcrypt');
exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.redirect('/login');
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    // check if all fields are provided
    if (!req.body.email || !req.body.password)
      return res.status(400).json({ message: 'Email and password required' });
    const email = req.body.email.toLowerCase();
    // check if user exists
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(401).json({ message: 'Invalid email or password' });

    // check if password matches
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Invalid email or password' });

    res.redirect('/');
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
