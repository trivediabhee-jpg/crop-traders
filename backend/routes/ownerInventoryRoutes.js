import express from "express";

import {
  addInventoryCrop,
  getOwnerInventory,
  updateInventoryCrop,
  deleteInventoryCrop,
} from "../controller/ownerInventoryController.js";

import {
  protect,
  ownerOnly,
} from "../middleware/authmiddleware.js";

const router = express.Router();


// Add crop
router.post("/", protect, ownerOnly, addInventoryCrop);

// Get owner inventory
router.get("/", protect, ownerOnly, getOwnerInventory);

// Update crop
router.put("/:id", protect, ownerOnly, updateInventoryCrop);

// Delete crop
router.delete("/:id", protect, ownerOnly, deleteInventoryCrop);


export default router;