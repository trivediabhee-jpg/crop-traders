import mongoose from "mongoose";

const activeCropSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cropName: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    expectedPrice: {
      type: Number,
      required: true,
      min: 1,
    },

    harvestDate: {
      type: Date,
      required: true,
    },

    storageDuration: {
      type: Number, // days
      required: true,
      min: 0,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "approved", "rejected", "completed"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ActiveCrop", activeCropSchema);                                                                                                                                     