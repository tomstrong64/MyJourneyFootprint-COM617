import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: 'postgres://postgres:postgres@localhost:5432/postgres',
});

export const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const createUser = async (req, res) => {

    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await client.query(
            'INSERT INTO Users(name, email, password) VALUES($1, $2, $3) RETURNING *',
            [req.body.name, req.body.email, hashedPassword]
        );



    } catch {
        res.redirect('/register');
    }   
}




export const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
};

export const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  next();
};
