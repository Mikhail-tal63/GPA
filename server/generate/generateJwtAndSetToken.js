const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const generateTokenAndSetCookie = (user_id, res) => {

    const token = jwt.sign({ user_id }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })


    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "strict"
    })

    return token

}

module.exports = generateTokenAndSetCookie