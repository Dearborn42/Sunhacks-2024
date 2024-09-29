const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//New imports
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

//Add this before the app.get() block
socketIO.on('connection', async (socket) => {
    socket.on('disconnect', () => {
        console.log('?: A user disconnected');
    });
});


app.post('/api/history', async(req, res)=>{
    const { name1, name2 } = req.body;
    const messages = await fetch(`http://localhost:5000/messages/get/${name1}/${name2}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });

    const messagesHistory = await messages.json();
    console.log(messagesHistory);
    const list = JSON.parse(messagesHistory.messages).sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
    console.log(list);
    var limit = list.length;
    var i = 0;
    while (i < limit) {
        const messageFetch = await fetch("http://localhost:4000/api/message", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(list[i])
        });
        const result = await messageFetch.json();
        if(result.success){
            i++;
        }
    }
})

app.post('/api/message', (req, res) => {
    const { messageSender, messageContent} = req.body;
    console.log(messageSender);
    socketIO.emit('notification', req.body);
    return res.status(200).json({success: true});
})

app.post("/api", async (req, res) => {
    const { name1, name2, message } = req.body;
    const date = new Date();
    console.log(name1, name2, message);
    const newMessage = await fetch("http://localhost:5000/messages/create", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({messageSender: name1, messageReceiver: name2, messageContent: message}),
    });
    const response = await newMessage.json();
    if(response.success){
        socketIO.emit('notification', { messageSender: name1, messageContent: message, date: date.toISOString() });
    }

    res.status(200).json({ name1, message });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});