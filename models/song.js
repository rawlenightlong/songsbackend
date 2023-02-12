import mongoose from "../db/connection.js";

const {Schema, model} = mongoose

const songSchema = new Schema({
    artist: String,
    title: String,
    username: String
})

const Song = model("Song", songSchema)

export default Song