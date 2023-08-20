const mongoose = require("mongoose")

const connectDatabase = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(conn.connection.host);
    } catch (e) {
        console.error(e);
        process.exit()
    }
}

module.exports = connectDatabase