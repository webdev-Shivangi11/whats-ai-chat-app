// controllers/messageController.js
import * as messageService from '../services/messageService.js';
import userModel from '../model/userModel.js';
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, text, projectId } = req.body;
    const sender = await userModel.findOne({ email: req.user.email });

    const message = await messageService.sendMessage({
      senderId: sender._id,
      receiverId,
      text,
      projectId
    });

    res.status(201).json({ message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getUserMessages = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    const messages = await messageService.getMessagesForUser(user._id);
    res.status(200).json({ messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};