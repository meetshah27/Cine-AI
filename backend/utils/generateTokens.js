import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';
export const generateToken = (userId,res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: '35d' });
    res.cookie("jwt-token", token,{
        maxAge: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: ENV_VARS.NODE_ENV !== 'development',
        sameSite:"strict" // Set to true if your site is served over HTTPS
    })
    return token;
};
