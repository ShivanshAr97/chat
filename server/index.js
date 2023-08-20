const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors");
const chatsData = require("./data");
const connectDatabase = require("./config/db");
const useRouter = require('./routes/UserRoutes')

dotenv.config();
connectDatabase()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())

app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/user', useRouter)

app.get('/chats/:id', (req, res) => {
    const val = chatsData.chatsData.find((c)=> c.id.toString() === req.params.id)
    res.send(val)
})


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})