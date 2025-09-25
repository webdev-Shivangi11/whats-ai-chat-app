import * as messageService from '../services/messageServices.js';
import userModel from '../model/userModel.js';

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, chat, projectId } = req.body;
    const sender = await userModel.findOne({ email: req.user.email });

    if (!sender || !receiverId || !chat || !projectId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const savedMessage = await messageService.sendMessage({
      senderId: sender._id,
      receiverId,
      // chat: message,
      // chat: chat,
      chat,
      projectId
    });

    res.status(201).json({ message: savedMessage });
  } catch (err) {
    console.error("Error sending project message:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getProjectMessagesForUser = async (req, res) => {
  try {
    const { projectId } = req.params;
    const user = await userModel.findOne({ email: req.user.email });

    const messages = await messageService.getMessagesByProjectAndUser({
      userId: user._id,
      projectId
    });

    res.status(200).json({ messages });
  } catch (err) {
    console.error("Error fetching project messages:", err);
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};
// // controllers/messageController.js
// import * as messageService from '../services/messageServices.js';
// import userModel from '../model/userModel.js';
// // import { sendMessage } from '../services/messageServices.js';
// export const sendMessage = async (req, res) => {
//   try {
//     const { receiverId, chat, projectId } = req.body;
//     const sender = await userModel.findOne({ email: req.user.email });

//     const message = await messageService.sendMessage({
//       senderId: sender._id,
//       receiverId,
//       chat,
//       projectId
//     });

//     res.status(201).json({ message });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getUserMessages = async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.user.email });
//     const messages = await messageService.getMessagesForUser(user._id);
//     res.status(200).json({ messages });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };