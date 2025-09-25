import mongoose from 'mongoose';

const Conversation = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true }, 
  messages: [ MessageSchema ]
});
export  default Conversation;