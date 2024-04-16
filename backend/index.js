const express = require("express")
const connectDb = require("./connection/database")
const userRoutes = require("./routes/userRoutes")
const cors = require('cors')
const path = require("path")

const app = express()
const PORT = 3000

// const corsOptions = {
//     origin: "https://email-otp-verification-frontend.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"], 
//     credentials: true
// }

app.use(cors())

app.use(express.json())

app.use("/api", userRoutes)

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "dist")))
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`)
    })
})
