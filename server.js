import express from "express"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRouter from "./controllers/auth.js"
import songRouter from "./controllers/song.js"


// dotenv file
dotenv.config()
const PORT = process.env.PORT
// create express object
const app = express()

// register middleware
app.use(cors({
    origin: "*",

})) // allows external requests
app.use(morgan("dev")) // logging in console
app.use(express.json()) // parse json bodies
app.use(cookieParser())

// database

// routes / routers

// test route
app.get('/test', (req, res) => {
    res.send("server working")
})

app.use("/auth", authRouter)
app.use('/songs', songRouter)

// app listener
app.listen(PORT, () => {
    console.log(`Hey there, Delilah, what's it like in Port ${PORT}?`)
})
