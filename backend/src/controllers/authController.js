
import { User } from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" })
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        //create token
        const token = createToken(user._id)
        console.log(token)
        res.status(201).json({ user, token })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }

}

export const signup = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)
        //create token
        const token = createToken(user._id)
        console.log(token)
        res.status(201).json({ user, token })
    } catch (error) {
        console.log(error)
        res.status(400).json({ "error": error.message })
    }

}