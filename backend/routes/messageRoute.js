import express from 'express';
import { sendMessage, getUserMessages } from '../controllers/messageController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send', verifyToken, sendMessage);
router.get('/history', verifyToken, getUserMessages);

export default router;
