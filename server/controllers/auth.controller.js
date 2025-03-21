const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../model/User")
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body
        // step 1 check email already exist
        const result = await User.findOne({ email })
        if (result) {
            return res.status(401).json({ message: "email already exist" })
        }
        // step 2 hash password
        const hash = await bcrypt.hash(password, 10)
        //  step 3 register
        await User.create({ ...req.body, password: hash })
        res.status(201).json({ message: "register success" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "something went wrong" })

    }
}
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        //  step 1 check email
        const result = await User.findOne({ email })
        if (!result) {
            return res.status(401).json({ message: "email not found" })
        }
        // step 2 compare password
        const verify = await bcrypt.compare(password, result.password)
        if (!verify) {
            return res.status(401).json({ message: "invalid password" })
        }
        // step 3 create tooken
        const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)
        // step 4 attach cookie
        res.cookie("USER", token, { maxAge: 1000 * 60 * 60 })
        // step 5 send response
        res.json({ message: "login success", result: { name: result.name, email: result.email } })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "something went wrong" })
    }

}

exports.logout = (req, res) => {
    res.clearCookie("USER")
    res.json({ message: "logout success" })
}