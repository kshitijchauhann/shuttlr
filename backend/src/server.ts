import express from "express";
import { Pool } from "pg";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import router from "./routes/routes.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: express.Application = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'cats',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(3000, () => console.log("app listening on port 3000!"));
