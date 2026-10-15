import express from "express";

import {
  addInventoryCrop,
  getOwnerInventory,
  getAvailableInventory,
  updateInventoryCrop,
  deleteInventoryCrop,
} from "../controller/ownerInventoryController.js";

import {
  protect,
  ownerOnly,
} from "../middleware/authmiddleware.js";

const router = express.Router();


// ==========================================
// CLIENT - AVAILABLE CROPS
// ==========================================

router.get(
  "/available",
  protect,
  getAvailableInventory
);


// ==========================================
// OWNER - ADD CROP
// ==========================================

router.post(
  "/",
  protect,
  ownerOnly,
  addInventoryCrop
);


// ==========================================
// OWNER - GET INVENTORY
// ==========================================

router.get(
  "/",
  protect,
  ownerOnly,
  getOwnerInventory
);


// ==========================================
// OWNER - UPDATE
// ==========================================

router.put(
  "/:id",
  protect,
  ownerOnly,
  updateInventoryCrop
);


// ==========================================
// OWNER - DELETE
// ==========================================

router.delete(
  "/:id",
  protect,
  ownerOnly,
  deleteInventoryCrop
);


export default router;