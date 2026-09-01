import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

 user.fullname = req.body.fullname || user.fullname;
    user.email = req.body.email || user.email;
    user.village = req.body.village || user.village;
    user.phone = req.body.phone || user.phone;

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};