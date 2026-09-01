import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";

dotenv.config({ path: "./config.env" });

const createOwner = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const existingOwner = await User.findOne({
      role: "owner",
    });

    if (existingOwner) {
      console.log("❌ Owner already exists");
      process.exit();
    }

    const owner = await User.create({
      fullname: "AgriCold Owner",
      email: "owner@agricold.com",
      password: "Owner@12345",
      role: "owner",
      phone: "918840704897",
      village: "Owner",
    });

    console.log("✅ Owner Created Successfully");
    console.log("Email:", owner.email);
    console.log("Role:", owner.role);

    process.exit();
  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
};

createOwner();   