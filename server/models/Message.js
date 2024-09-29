import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
    messageSender: {
        type:String,
        required: true
    },
    messageReceiver: {
        type:String,
        required: true
    },
    messageContent: {
        type: String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    }
}, {collection: "Chats"});

const Message = mongoose.model('Message', messageSchema);

export default Message;