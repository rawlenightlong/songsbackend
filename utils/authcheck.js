import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config()


async function isLoggedIn(req, res, next){
    try {
        // check if the token is in the cookies
        const {token = false} = req.cookies
        if (token) {
            // verify token
            const payload = await jwt.verify(token, process.env.SECRET)
            // add payload to request
            req.payload = payload
            // move on
            next()
        } else {
            throw "not logged in"
        }
    } catch(error){
        res.status(400).json(error)
    }

}
export default isLoggedIn