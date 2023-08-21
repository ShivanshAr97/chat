const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const tokenGenerator = require("../config/tokenGenerator")

const registerUser = asyncHandler(async (req, res) => {
    const { name, password, email, picture } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Fill all fields")
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password,
        picture
    })
    if (user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            password: user.password,
            picture: user.picture,
            token: tokenGenerator(user.id)
        })
    }
    else {
        throw new Error("Failed")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { password, email } = req.body

    const user = await User.findOne({ email })
    if(user && await(user.matchPassword(password))){
        res.json({
            id: user.id,
            name: user.name,
            password: user.password,
            picture: user.picture,
            token: tokenGenerator(user.id)
        })
    }
    else{
        throw new Error("Invalid password or email")
    }
})

const allUser = asyncHandler(async(req,res)=>{
    const keyword = req.query.search
    ?{
        $or:[
            {name:{$regex:req.query.search, $options:"i"}},
            {email:{$regex:req.query.search, $options:"i"}}
        ]
    }:{}
    const users = await User.findOne(keyword).find({id:{$ne:req.user.id}})
    res.send(users)
})

module.exports = { registerUser, loginUser, allUser }