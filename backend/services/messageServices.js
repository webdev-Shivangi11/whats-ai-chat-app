import messageModel from "../model/messageModel.js";



export const sendMessage = async ({ senderId, receiverId, chat, projectId }) => {
  const message = new messageModel({ sender: senderId, receiver: receiverId, chat, projectId });
  return await message.save();
};

export const getMessagesForUser = async ({userId,projectId}) => {
  return await messageModel.find({
    projectId,
    $or: [{ sender: userId }, { receiver: userId }]
  }).sort({ timestamp: 1 });
};


