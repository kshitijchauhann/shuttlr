import express from "express";
import { Pool } from "pg";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { findUser, getPassword } from "./database/queries";
import router from "./routes/routes";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import {setupWebSocketServer} from "./signalling/signallingService";

dotenv.config();

const app: express.Application = express();

const server = createServer(app);

const wss = new WebSocketServer({ server });
 
setupWebSocketServer(wss);
app.use(cors({ origin: true, credentials: true }));

// Passport Local Strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await findUser(email);
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    const hashedPassword = await getPassword(email);
    if (!hashedPassword) {
        return done(null, false, { message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      return done(null, false, { message: 'Incorrect Password' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Serialize and Deserialize User
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await findUser(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'cats',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "lax",
        secure: process.env.NODE_ENV === "production", // Set to true in production with HTTPS
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Express + WebSocket server running on port ${PORT}!`);
});
