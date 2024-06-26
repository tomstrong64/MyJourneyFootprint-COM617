import bcrypt from 'bcrypt';
import client from '../services/db.js';
import { getUserById } from '../services/userService.js';

export const createUser = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password)
      return res
        .status(400)
        .json({ message: 'Name, email and password required' });

    const email = req.body.email.toLowerCase();

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await client.query(
      'INSERT INTO Users(name, email, password) VALUES($1, $2, $3) RETURNING *',
      [req.body.name, email, hashedPassword]
    );

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    // check if all fields are provided
    if (!req.body.email || !req.body.password)
      return res.status(400).json({ message: 'Email and password required' });
    const email = req.body.email.toLowerCase();

    // check if user exists
    const userQuery = 'SELECT * FROM Users WHERE email = $1';
    const userValues = [email];
    const userResult = await client.query(userQuery, userValues);
    const user = userResult.rows[0];

    if (!user)
      return res.status(401).json({ message: 'Invalid email or password' });

    // check if password matches
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Invalid email or password' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, email, name, password } = req.body;

    if (!id || !email || !password) {
      return res
        .status(400)
        .json({ message: 'ID, email, and password required' });
    }

    const updateQuery =
      'UPDATE Users SET email = $1, name = $2 password = $3 WHERE id = $4';
    const updateValues = [email, name, password, id];
    await client.query(updateQuery, updateValues);

    res.status(200).json({ message: 'User updated successfully' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID required' });
    }

    const deleteQuery = 'DELETE FROM users WHERE id = $1';
    const deleteValues = [id];
    await client.query(deleteQuery, deleteValues);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUser = async (req, res) => {
  try {
    console.log('authenticate', req.isAuthenticated());
    console.log('req.user', req.user);
    const user = await getUserById(req.user);
    return res.status(200).json(user.name);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
