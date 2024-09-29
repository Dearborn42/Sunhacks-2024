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
    }
})