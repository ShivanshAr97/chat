const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors");
const chatsData = require("./data");
const connectDatabase = require("./config/db");
const UserRoutes = require('./routes/UserRoutes')
const chatRoutes = require('./routes/chatRoutes')
const {notFound, errorHandler} = require("./middlewares/errorMiddleware")

dotenv.config();
connectDatabase()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/user', UserRoutes)
app.use('/api/chat', chatRoutes)

app.use(notFound)
app.use(errorHandler)

app.get('/chats/:id', (req, res) => {
    const val = chatsData.chatsData.find((c)=> c.id.toString() === req.params.id)
    res.send(val)
})


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})