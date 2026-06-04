import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Enter an email"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled")
    }
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error("Email already in use")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ email, password: hash })
    return user
}


userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled")
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect password")
    }

    return user
}

export const User = mongoose.model("user", userSchema)
