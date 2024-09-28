import bcrypt from 'bcrypt';
import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
    userName:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        unique: true,
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    desiredSkills:{
        type: Array,
        required: true,
    },
    creditWorth:{
        type: Number,
        requried: true,
    }
}, { collection: 'Posts'});


const Post = mongoose.model('Post', postSchema);

export default Post;