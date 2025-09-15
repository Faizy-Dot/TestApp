import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import 'dotenv/config'
import authRoutes from "./routers/auth.js";
import friendRequestRoutes from "./routers/friendRequest.js";


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRoutes)
app.use("/friendRequest" ,friendRequestRoutes )

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB connection error:", err));


// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
