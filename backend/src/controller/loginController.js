import { getDB } from "../models/index.js";
import { collections } from "../models/printModel.js";
// =======================
// USER CONTROLLER
// =======================
export const createUser = async (req, res) => {
  const { email, password, username, name } = req.body;
  if (!email || !password || !username || !name) {
    return res.status(400).json({ message: "Email, password, username, and name are required" });
  }

  try {
    const db = getDB();
    const result = await db.collection(collections.users).insertOne({
      _id: new ObjectId().toString(), // Unique ID
      email,
      password,
      username,
      name,
      balance: { $numberInt: "0" }, // Initialize balance as integer
    });

    res.status(201).json({ success: true, userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// Get user by user_id
export const getUserById = async (req, res) => {
  const { user_id } = req.params;
  try {
    const db = getDB();
    const user = await db.collection(collections.users).findOne({ _id: user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { username, name, balance } = user;
    res.json({ username, name, balance });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const db = getDB();
    const user = await db.collection(collections.users).findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const { _id, name, balance } = user;
    res.json({ success: true, user: { _id, username, name, balance } });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

