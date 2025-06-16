import bcrypt from "bcrypt";
import slugify from "slugify";
import {addUserLocal, findUser, getPassword} from "../database/queries.js";
import { Request, Response } from "express";

interface User {
  id: string;
  email: string;
  name: string;
  userName: string;
}

export const userLocalLogin = async(req: Request, res: Response) => {
  const { email, password } = req.body;  

  if (!email || !password) {
    res.status(400).json( {message: "All fields are required"});
    return
  }

  try {
    const user = await findUser(email);
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const hashed_password = await getPassword(email);
    if (!hashed_password) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const match = await bcrypt.compare(password, hashed_password);
    if (!match) {
      res.status(401).json({ message: "Incorrect Password" });
      return;
    }

    const userData: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      userName: user.username
    };

    req.session.user = userData;

    res.status(200).json({ message: "Login Successful", user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
const generateUsername = (nameOrEmail: string): string => {
  const base = slugify(nameOrEmail.split("@")[0] || "user").toLowerCase(); 
  const suffix = Math.floor(1000 + Math.random() * 9000);    
  return `${base}${suffix}`; 
}

export const userLocalSignUp = async(req: Request, res: Response) => {
  const {name, email, password } = req.body;

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
        userName
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

