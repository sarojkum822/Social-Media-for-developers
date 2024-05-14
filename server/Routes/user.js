import express from 'express';
import { getUserDetails, login, logout, register } from '../Controllers/user.controllers.js';
import { isAuthenticated } from '../Middlewares/auth.js';

const router = express.Router();


// router.post("/all", isAuthenticated, getAllUsers);

router.post("/register", register);
router.post("/login", login);
router.get("/profile",isAuthenticated, getUserDetails);
router.post("/logout", logout);




export default router;