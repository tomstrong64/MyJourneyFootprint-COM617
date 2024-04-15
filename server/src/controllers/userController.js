// controllers/userController.js
import pkg from 'pg';
const { Client } = pkg;

const client = new Client({ connectionString:  "postgres://postgres:postgres@localhost:5432/postgres",
});

export const createUser = async (req, res) => {
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

export const login = async (req, res) => {
  try {
    // check if all fields are provided
    if (!req.body.email || !req.body.password)
      return res.status(400).json({ message: 'Email and password required' });
    const email = req.body.email.toLowerCase();

    // connect to the PostgreSQL client
    await client.connect();

    // check if user exists
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userValues = [email];
    const userResult = await client.query(userQuery, userValues);
    const user = userResult.rows[0];

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
  } finally {
    // close the PostgreSQL client connection
    await client.end();
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, email, password } = req.body;

    if (!id || !email || !password) {
      return res
        .status(400)
        .json({ message: 'ID, email, and password required' });
    }

    await client.connect();

    const updateQuery =
      'UPDATE users SET email = $1, password = $2 WHERE id = $3';
    const updateValues = [email, password, id];
    await client.query(updateQuery, updateValues);

    res.status(200).json({ message: 'User updated successfully' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.end();
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID required' });
    }

    await client.connect();

    const deleteQuery = 'DELETE FROM users WHERE id = $1';
    const deleteValues = [id];
    await client.query(deleteQuery, deleteValues);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.end();
  }
};