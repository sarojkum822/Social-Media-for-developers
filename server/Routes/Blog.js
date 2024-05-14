// Import necessary modules
import express from 'express';
import { isAuthenticated } from '../Middlewares/auth.js';
import { AddBlog, ShowBlog } from '../Controllers/Blog.controllers.js';


const router = express.Router();

router.post('/addblog',isAuthenticated,AddBlog)
router.get('/showblog',ShowBlog);

// Routes


export default router;
