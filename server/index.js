const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors");
const chatsData = require("./data");
const connectDatabase = require("./config/db");
const UserRoutes = require('./routes/UserRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require("./middlewares/errorMiddleware")

dotenv.config();
connectDatabase()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/user', UserRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

// app.use(notFound)
// app.use(errorHandler)

app.get('/chats/:id', (req, res) => {
    const val = chatsData.chatsData.find((c) => c.id.toString() === req.params.id)
    res.send(val)
})

app.get("/", (req, res) => {
    res.send("Hello")
})

const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
});
