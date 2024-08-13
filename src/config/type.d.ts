declare namespace jsonwebtoken {
  interface JwtPayload {
    id?: string;
    isAdmin?: boolean;
  }
}

declare namespace Express {
  interface Request {
    user?: string;
  }
}
