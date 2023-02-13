import express from "express"
import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const SECRET = process.env.SECRET

// Create Router
const router = express.Router()

// signup post
router.post("/signup", async (req, res) => {
    try{
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))

    // generate the user
    const user = await User.create(req.body)

    // send response
    res.json({status: "User Created"})
    } catch(error){
        res.status(400).json({error})
    }
})

// login post
router.post("/login", async (req, res) => {
    try {

    // desconstruct username and password
    const {username, password} = req.body

    // check for / get the user

    const user = await User.findOne({username})

    if(user){
        // password check
        const passwordCheck = await bcrypt.compare(password, user.password)

        // check if true
        if(passwordCheck){

            // build the authorization payload
            const payload = {username} 

            // create and assign the token
            const token = await jwt.sign(payload, SECRET)

            // send response
            res.cookie("token", token, {httpOnly: true, path: '/', secure: req.hostname === "localhost" ? false : true}).json({payload, status: "logged in"})
        } else {
            res.status(400).json({error: "The password is incorrect"})
        }
    } else {
        res.status(400).json({error: "User does not exist"})
    }
} catch(error){
    res.status(400).json({error})
}
})

// logout post
router.post("/logout", async (req, res) => {
    // destroy cookie
    res.clearCookie("token").json({response: "You are logged out"})
})

export default router