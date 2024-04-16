const express = require("express")
const connectDb = require("./connection/database")
const userRoutes = require("./routes/userRoutes")
const cors = require('cors')
const path = require("path")

const app = express()
const PORT = 3000

const corsOptions = {
    origin: "https://email-otp-verification-frontend-0z1q.onrender.com/",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"], 
    credentials: true
}

app.use(cors(corsOptions))

app.use(express.json())

app.use("/api", userRoutes)

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use('/', express.static('dist'))

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to connect to database:", err);
        process.exit(1); 
    });
