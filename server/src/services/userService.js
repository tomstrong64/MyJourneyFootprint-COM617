import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
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
