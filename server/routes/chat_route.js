import express from 'express';
import {
    getMessages,
    createMessage
} from "../controllers/chat_round.js"
const router = express.Router();

router.get("/get/:sender/:reciever", getMessages);
router.post("/create", createMessage);

export default router