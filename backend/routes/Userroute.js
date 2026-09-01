import express from "express";
import {protect} from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

export default router;

