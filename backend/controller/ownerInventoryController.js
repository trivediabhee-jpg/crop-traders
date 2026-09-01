import OwnerInventory from "../models/ownerinventory-model.js";

// ➕ Add Crop to Owner Inventory
export const addInventoryCrop = async (req, res) => {
  try {
    const {
      cropName,
      quantity,
      price,
      unit,
      description,
    } = req.body;

    if (!cropName || !quantity || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Crop name, quantity and price are required",
      });
    }

    const crop = await OwnerInventory.create({
      owner: req.user._id,
      cropName,
      quantity,
      price,
      unit: unit || "kg",
      description: description || "",
      available: true,
    });

    res.status(201).json({
      success: true,
      message: "Crop added to inventory",
      crop,
    });

  } catch (error) {
    console.log("Add Inventory Crop Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 📦 Get Owner Inventory
export const getOwnerInventory = async (req, res) => {
  try {
    const crops = await OwnerInventory.find({
      owner: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      crops,
    });

  } catch (error) {
    console.log("Get Inventory Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ✏️ Update Inventory Crop
export const updateInventoryCrop = async (req, res) => {
  try {
    const { id } = req.params;

    const crop = await OwnerInventory.findOneAndUpdate(
      {
        _id: id,
        owner: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Crop updated successfully",
      crop,
    });

  } catch (error) {
    console.log("Update Inventory Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// 🗑 Delete Inventory Crop
export const deleteInventoryCrop = async (req, res) => {
  try {
    const { id } = req.params;

    const crop = await OwnerInventory.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Crop removed from inventory",
    });

  } catch (error) {
    console.log("Delete Inventory Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};