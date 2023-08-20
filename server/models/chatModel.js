const mongoose = require("mongoose")

const chatModel = mongoose.Schema(
    {
        isGroupChat:{type:Boolean, default: false},
        chatName:{type:String, trim:true},
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }],
        latestMess:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        },
        groupAdmin:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }],
}, {timestamp:true})

const Chat = mongoose.model('Chat', chatModel);

module.exports = Chat