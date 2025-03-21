const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { privateRoute } = require("./middleware/Protected")
require("dotenv").config()
const path = require("path")

const app = express()
// step 1 middlewares
app.use(express.json()) // req.body
app.use(express.static("dist"))
app.use(cors({
    origin: "https://complete-auth.onrender.com",
    credentials: true
}))
app.use(cookieParser()) // req.cookies
// step 2 route
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/todo", privateRoute, require("./routes/todo.routes"))
//  step 3 404 route
app.use("*", (req, res) => {
    // res.status(404).json({ message: "resource not found" })
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})
// step 4 db connection
mongoose.connect(process.env.MONGO_URL)

//  step 5 start server
mongoose.connection.once("open", () => {
    console.log("db connected");
    app.listen(process.env.PORT, console.log("server running"))

})
