import bcrypt from "bcrypt";
import slugify from "slugify";
import { addUserLocal, findUser, getPassword, updatePassword } from "../database/queries.js";
import { Request, Response } from "express";

interface User {
  id: string;
  email: string;
  name: string;
  userName: string;
}

export const loginSuccess = (req: Request, res: Response) => {
  const user = req.user as any; // Use 'any' to access the property from the database
  const userData: User = {
    id: user.id,
    email: user.email,
    name: user.name,
    userName: user.username, // Correctly map 'username' to 'userName'
  };
  res.status(200).json({ message: "Login Successful", user: userData });
};
const generateUsername = (nameOrEmail: string): string => {
  const base = slugify(nameOrEmail.split("@")[0] || "user").toLowerCase();
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${base}${suffix}`;
};

export const userLocalSignUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const existingUser = await findUser(email);
    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userName = generateUsername(name);

    await addUserLocal(name, email, hashedPassword, userName);

    // Return the generated username in the response
    res.status(201).json({
      message: "Signup Successful",
      user: {
        name,
        email,
        userName,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const hashedPassword = await getPassword(email);

    if (!hashedPassword) {
      res.status(404).json({ message: "User not found" });
      return 
    }

    const match = await bcrypt.compare(currentPassword, hashedPassword);

    if (!match) {
      res.status(401).json({ message: "Incorrect current password" });
      return 
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await updatePassword(email, newHashedPassword);

    res.status(200).json({ message: "Password updated successfully" });
    return 
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Internal server error" });
    return 
  }
};
