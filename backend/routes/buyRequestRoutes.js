import express from "express";

import {
  createBuyRequest,
  getBuyRequests,
  updateBuyRequestStatus,
} from "../controller/buyRequestController.js";

const router = express.Router();

// Create buy request
router.post("/", createBuyRequest);

// Get all buy requests
router.get("/", getBuyRequests);

// Update request status
router.put("/:id/status", updateBuyRequestStatus);

export default router;    