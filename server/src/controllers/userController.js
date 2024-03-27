// controllers/userController.js
const User = require('../Models/user');
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
import client from '../config/db'; // add this
import pg from pg 

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await client.query(
      'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
      [req.body.name, req.body.email, hashedPassword]
    );

    //generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    //set token in cookie
    res.cookie('token', token);

    //return token to client
    return res.status(201).json({
      message: 'User created successfully',
      token,
      redirect: '/',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Internal server error' });
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
