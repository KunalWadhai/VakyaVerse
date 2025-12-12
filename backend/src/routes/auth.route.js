import express from 'express';
const authRouter = express.Router();
import {signup, login, logout, updateProfile, checkUserAuthenticated} from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { arcjetProtection } from '../middlewares/arcject.middleware.js';

authRouter
     .post("/auth/signup", signup)
     .post("/auth/login", arcjetProtection, login)
     .post("/auth/logout", logout)
     .put("/auth/updateProfile", protectRoute, updateProfile)
     .get("/auth/check", protectRoute, checkUserAuthenticated)

export default authRouter;