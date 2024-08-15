import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = 'your_secret_key'; // Replace with your actual secret key

interface TokenPayload extends JwtPayload {
    id: string;
}

export const generateToken = (userId: string) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        return null;
    }
};