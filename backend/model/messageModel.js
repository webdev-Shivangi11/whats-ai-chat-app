import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chat: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' } ,// optional if messages are project-based
  read: { type: Boolean, default: false }
});
// const conversationSchema=newchema({
//   users: [ { type: Schema.Types.ObjectId, ref: 'User' } ],  // or userIds
//   createdAt: { type: Date, default: Date.now }
// });

export default mongoose.model('Message', messageSchema);