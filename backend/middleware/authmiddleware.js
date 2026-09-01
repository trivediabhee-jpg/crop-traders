import jwt from "jsonwebtoken";
import User from "../models/User.js";


// ==========================================
// 🔒 PROTECT MIDDLEWARE
// ==========================================

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    // Token Check
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // Verify Token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find User
    const user = await User.findById(
      decoded.id
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {
    console.error(
      "JWT Error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Not authorized, token invalid or expired",
    });
  }
};


// ==========================================
// 👑 OWNER ONLY MIDDLEWARE
// ==========================================

export const ownerOnly = (req, res, next) => {

  if (req.user?.role !== "owner") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Owner only.",
    });
  }

  next();
};

