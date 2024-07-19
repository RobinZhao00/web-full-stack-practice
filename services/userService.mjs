import bcrypt from "bcrypt";

async function createUser({ password, username }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await this.db.query("INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword]);
  return result.insertId;
}

async function deleteUser({ id }) {
  try {
    const [result] = await this.db.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
  }
  catch (err) {
    throw new Error("deleteUser error");
  }
}

async function updateUser({ name, email, id }) {
  try {
    const [result] = await this.db.query("UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id]);
    return result;
  }
  catch (err) {
    throw new Error("Fetch Data error");
  }
};

async function getUserById({ userId }) {
  const [rows] = await this.db.query("SELECT id, username FROM users WHERE id = ?", [userId]);
  return rows[0];
}

async function getUsers() {
  try {
    const [rows] = await this.db.query("SELECT * FROM user_infos");
    return rows;
  }
  catch (err) {
    throw new Error("Fetch Data error");
  }
}

async function authenticateUser({ username, password }) {
  const [rows] = await this.db.query("SELECT id, username, password FROM users WHERE username = ?",
    [username]);
  const user = rows[0];
  if (user && await bcrypt.compare(password, user?.password)) {
    return { id: user.id, username: user.username };
  } else {
    throw new Error("Invalid credentials");
  }
}

export default {
  createUser, deleteUser, updateUser, getUserById, getUsers, authenticateUser
};



