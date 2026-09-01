import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import priceRoutes from "./routes/prices.js";
import userRoutes from "./routes/Userroute.js";
import activeCropRoutes from "./routes/croproute.js";
import ownerInventoryRoutes from "./routes/ownerInventoryRoutes.js"

dotenv.config({ path: "./config.env" });

const app = express();

mongoose.connect(process.env.MONGO_URI)  // <-- without any options
.then(() => console.log("🔥 MongoDB Connected Successfully"))
.catch((err)=> console.log("❌ MongoDB connection error:", err));

// ✅ CORS setup
app.use(cors({
 origin: process.env.FRONTEND_URL || "http://localhost:5173",
 methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
 credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use("/api/auth",authRoutes);
app.use("/api/prices", priceRoutes);
app.use("/api/user", userRoutes);
app.use("/api/active-crops", activeCropRoutes);
app.use("/api/owner/inventory",ownerInventoryRoutes);


// ✅ Start server
const PORT = 4000;  
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});