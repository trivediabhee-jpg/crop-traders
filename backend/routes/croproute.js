import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import {
  createActiveCrop,
  getMyActiveCrops,
  
} from "../controller/activecropcontroller.js"

import { updateProfile } from "../controller/updatecontroller.js";

const router = express.Router();

// ➕ Create Crop
router.post("/activecrop", protect, createActiveCrop);

// 📄 Get Logged-in User Crops
router.get("/my", protect, getMyActiveCrops);

router.put("/update-profile", protect, updateProfile);
                                                           
export default router;