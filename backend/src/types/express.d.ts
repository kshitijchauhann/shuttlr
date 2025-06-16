import { Session, SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      email: string;
      name: string;
      userName: string;
    };
  }
} 