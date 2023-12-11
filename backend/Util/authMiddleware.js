import { User } from "../api/User/model.js"
import jwt from "jsonwebtoken";

const authenticateToken = async (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        return res.sendStatus(401)
    }
    const token = header.split(' ')[1]    
    const secret =  process.env.TOKEN_SECRET || "API"
    jwt.verify(token, secret, (error, user) => {
        if (error) {
            res.status(403).send("Token expired")
            return
        }
        const userData = User.findOne({ _id: user._id })
        if (!userData) {
            res.sendStatus(401)
            return
        }
        req.user = user
        next()
    })
}

export default authenticateToken