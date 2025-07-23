import pool from "./pool.js";

interface User {
  id: string;
  email: string;
  name: string;
  username: string;
}

export const addUserLocal = async (
  name: string,
  email: string,
  password: string,
  userName: string,
) => {
  await pool.query(
    "INSERT INTO users (name, email, password_hash, username) VALUES ($1, $2, $3, $4)",
    [name, email, password, userName],
  );
};

export const findUser = async (email: string): Promise<User | null> => {
  const result = await pool.query(
    "SELECT id, email, name, username FROM users WHERE email = $1",
    [email],
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};

export const getPassword = async (email: string): Promise<string | null> => {
  const result = await pool.query(
    "SELECT password_hash FROM users WHERE email = $1",
    [email],
  );

  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0].password_hash;
};

export const updatePassword = async (email: string, password_hash: string) => {
  try {
    await pool.query("UPDATE users SET password_hash = $1 WHERE email = $2", [
      password_hash,
      email,
    ]);
  } catch (error) {
    console.log("Error updating password: ", error);
  }
};
