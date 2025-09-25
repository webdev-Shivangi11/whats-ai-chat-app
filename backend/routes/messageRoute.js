import express from 'express';
// import { sendMessage, getUserMessages } from '../controllers/messageController.js';
import * as authMidlleware from "../midlleware/authMiddleware.js";
import { sendMessage } from '../controller/messageController.js';
// import * as authMiddleware from "../midlleware/authMiddleware.js"

const router = express.Router();

router.post('/send',authMidlleware.authUser , sendMessage);
// router.get('/profile', authMiddleware.authUser, userController.profileController);

// router.get('/history', verifyToken, getUserMessages);

export default router;
