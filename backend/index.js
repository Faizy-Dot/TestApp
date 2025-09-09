import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import 'dotenv/config'
import UserModal from "./models/Users.js";
import authRoutes from "./routers/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error:", err));

app.get("/", async (req, res) => {

    let users = await UserModal.find()
    res.status(200).json({ message: "users fetched successfully", users: users });
});

app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username) return res.status(400).json({ message: "Plz fill Username" });
        if (!email) return res.status(400).json({ message: "Plz fill Email" });
        if (!password) return res.status(400).json({ message: "Plz fill Password" });
        const existingUser = await UserModal.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        const newUser = new UserModal({ username, email, password});
        await newUser.save();

        console.log("newUSer==>", newUser)

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
