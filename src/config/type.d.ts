declare namespace jsonwebtoken {
  interface JwtPayload {
    id?: string;
    email?: string;
    email_verification?: boolean;
    role?: string;
  }
}

interface user {
  id: string;
  email: string;
  email_verification: boolean;
  role: string;
}

declare namespace Express {
  interface Request {
    user?: user;
  }
}
