const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: mongoose } = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const msgRoutes = require("./routes/msgRoutes"); 
const socket = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
app.use("/api/auth/",userRoutes);
app.use("/api/message/",msgRoutes);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("DB Connected !!");
})
.catch((err)=>{
    console.log(err);
});

const server = app.listen(process.env.PORT,()=>{
    console.log("On port 3000");
});

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true,
    },
});

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-received",data.msg);
        }
    })
})