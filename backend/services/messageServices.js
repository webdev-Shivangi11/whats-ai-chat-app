import messageModel from "../model/messageModel";



export const sendMessage = async ({ senderId, receiverId, text, projectId }) => {
  const message = new messageModel({ sender: senderId, receiver: receiverId, text, projectId });
  return await message.save();
};

export const getMessagesForUser = async (userId) => {
  return await messageModel.find({
    $or: [{ sender: userId }, { receiver: userId }]
  }).sort({ timestamp: 1 });
};


