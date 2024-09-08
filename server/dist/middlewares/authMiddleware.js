import jwt from 'jsonwebtoken';
import { jwt_secret } from '../config.js';
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, jwt_secret);
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};