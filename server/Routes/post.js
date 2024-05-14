// Import necessary modules
import express from 'express';
import { isAuthenticated } from '../Middlewares/auth.js';
import { AddPost, ShowPost, EditPost, DeletePost } from '../Controllers/Post.controllers.js';

const router = express.Router();

// Routes
router.post('/addpost', isAuthenticated, AddPost);
router.get('/showpost', isAuthenticated, ShowPost);
router.put('/editpost', isAuthenticated, EditPost); 
router.delete('/deletepost', isAuthenticated, DeletePost); 

export default router;
