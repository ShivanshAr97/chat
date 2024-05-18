import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
import authRoutes from "./routes/auth.js"
import messageRoutes from "./routes/messages.js"
import connectDB from "./config/connect.js";

const app = express();
app.use(cors());
app.use(express.json());

import { Server } from "socket.io";

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    credentials: true,
  }
})

connectDB()

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});