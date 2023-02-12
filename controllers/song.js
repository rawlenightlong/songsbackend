import express from "express"
import Song from "../models/song.js"
import User from "../models/user.js"
import isLoggedIn from "../utils/authcheck.js"

const router = express.Router()

router.use(isLoggedIn)

// index route
router.get('/', async (req, res) => {
    try{
        // grab username from token payload
        const username = req.payload.username
        const songs = await Song.find({username})
        res.json(songs)
    }
    catch(error){
        res.status(400).json({error})
    }
})

// show route
router.get('/:id', async (req, res) => {
    try{
        const username = req.payload.username
        const song = await Song.findOne({username, _id: req.params.id})
        res.json(song)
    }
    catch(error){
        res.status(400).json({error})
    }
})

// create route
router.post('/', async (req, res) => {
    try{
        const username = req.payload.username
        req.body.username = username
        const song = await Song.create(req.body)
        res.json(song)
    }
    catch(error){
        res.status(400).json({error})
    }
})

// update route
router.put('/:id', async (req, res) => {
    try{
        const username = req.payload.username
        req.body.username = username
        const song = await Song.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(song)
    }
    catch(error){
        res.status(400).json({error})
    }
})

// delete route
router.delete('/', async (req, res) => {
    try{
        const username = req.payload.username
        req.body.username = username
        const song = await Song.deleteOne({_id: req.params.id, username})
    }
    catch(error){
        res.status(400).json({error})
    }
})

export default router