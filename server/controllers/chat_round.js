import Message from "../models/Message.js";

export async function getMessages(req, res){
    const {sender, reciever} = req.params;
    try {
        const messages1 = await Message.find({messageSender: sender, messageReceiver: reciever });
        const messages2 = await Message.find({messageSender: reciever, messageReceiver: sender });
        const finalList = [ ...messages1, ...messages2 ];
        return res.status(200).json({ success: true, messages: JSON.stringify(finalList) });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export async function createMessage(req, res){
    try {
        const message = new Message(req.body);
        await message.save();
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }

}