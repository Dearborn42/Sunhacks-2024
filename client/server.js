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
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('disconnect', () => {
        console.log('?: A user disconnected');
    });
});

const messages = [];

app.post("/api", (req, res) => {
    const { name, message } = req.body;
    const date = new Date();
    messages.push({ name, message, date });
    socketIO.emit('notification', { name, message, date: date.toISOString() });

    res.status(200).json({ name, message });
});
app.delete("/api/:date", (req, res)=>{

})

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});