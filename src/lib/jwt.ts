import jwt from 'jsonwebtoken';

const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

export interface JWTPayload {
  user_id: string;
  email: string;
  role: string;
}


export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(
    payload as jwt.JwtPayload,
    JWT_SECRET as jwt.Secret,
    { expiresIn: JWT_EXPIRES_IN }  as jwt.SignOptions // Removed 'as string' here
  );
};


export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};