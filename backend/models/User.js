// models/User.js
import mongoose from "mongoose"
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  role: {
    type: String,
    enum: ["farmer", "client","owner"],
    required: true,
  },

  // 👇 NEW FIELDS
  village: {
    type: String,
  },

  phone: {
    type: String,
  }

}, { timestamps: true });

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return ;
  this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// confirm password ko DB me save nahi karte, sirf validation ke liye frontend/backend pe check hota hai

export default mongoose.model("User", userSchema);