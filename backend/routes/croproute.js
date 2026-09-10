import express from "express";

import {
  createActiveCrop,
  getMyActiveCrops,
  getAllActiveCrops,
} from "../controller/activecropcontroller.js";

import { protect, ownerOnly } from "../middleware/authmiddleware.js";

import { updateProfile } from "../controller/updatecontroller.js";

const router = express.Router();

// ➕ Farmer: Create Active Crop Request
router.post("/activecrop", protect, createActiveCrop);

// 📄 Farmer: Get Only Logged-in Farmer's Crops
router.get("/my", protect, getMyActiveCrops);

// 👑 Owner: Get ALL Farmer Crop Requests
router.get("/owner/all", protect, ownerOnly, getAllActiveCrops);

// 👤 Update Profile
router.put("/update-profile", protect, updateProfile);

export default router;