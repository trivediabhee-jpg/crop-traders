import express from "express";

import {
  createBuyRequest,
  getBuyRequests,
  updateBuyRequestStatus,
} from "../controller/buyRequestController.js";

import { protect, ownerOnly } from "../middleware/authmiddleware.js";

const router = express.Router();

// Client/Farmer buy request create karega
router.post("/", protect, createBuyRequest);

// Owner sabhi buy requests dekhega
router.get("/", protect, ownerOnly, getBuyRequests);

// Owner request ka status update karega
router.put("/:id/status", protect, ownerOnly, updateBuyRequestStatus);

export default router;