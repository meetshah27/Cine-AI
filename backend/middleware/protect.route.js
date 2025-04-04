import jwt from 'jsonwebtoken';
import {User} from '../models/user.models.js';
import { ENV_VARS } from '../config/envVars.js';

export const protectRoute = async (req, res, next) => 
    {
        try 
        {
            const token = req.cookies["jwt-token"];
            if (!token) return res.status(401).json({ msg: 'Not authorized, token is missing' });
            const decode=jwt.verify(token, ENV_VARS.JWT_SECRET);
            if(!decode) return res.status(401).json({ msg: 'Not authorized, token is invalid' });
            const user=await User.findById(decode.userId).select('-password');
            if (!user) return res.status(404).json({ msg: 'User not found' });
            req.user=user;
            next();
        }
        catch (err)
        {
            console.error(err.message);
            return res.status(401).json({ msg: 'Not authorized, token is missing' });
        }
    }
