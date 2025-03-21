const jwt = require("jsonwebtoken")
exports.privateRoute = (req, res, next) => {

    // step 1 check for cookie
    const token = req.cookies.USER
    if (!token) {
        return res.status(401).json({ message: "no cookie found" })
    }
    //  step 2 verify token with jwt
    //                                              👇 from auth.controller
    jwt.verify(token, process.env.JWT_KEY, (error, data) => {
        if (error) {
            console.log(error)
            return res.status(401).json({ message: "jwt error" })

        }
        req.loggedin = data._id
        //  step 3 call next
        next()
    })
}