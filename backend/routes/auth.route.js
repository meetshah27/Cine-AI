import express from 'express';
import { authcheck, login, logout,signup } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/protect.route.js';

const router= express.Router();

router.post("/login",login);

router.post("/logout",logout);

router.post("/signup",signup);

router.get("/authcheck",protectRoute,authcheck)
export default router;