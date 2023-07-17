const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors");
const chatsData = require("./data")

dotenv.config();
const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/chats', (req, res) => {
    res.send(chatsData)
})

app.get('/chats/:id', (req, res) => {
    const val = chatsData.chatsData.find((c)=> c.id.toString() === req.params.id)
    res.send(val)
})


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})