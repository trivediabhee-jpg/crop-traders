import ActiveCrop from "../models/activecrop-model.js";
import { sendWhatsAppMessage } from "../services/whatsappService.js";

// ➕ Create Active Crop
export const createActiveCrop = async (req, res) => {
  try {
    const {
      cropName,
      quantity,
      expectedPrice,
      harvestDate,
      storageDuration,
      notes,
    } = req.body;

    // Crop Save
    const crop = await ActiveCrop.create({
      farmer: req.user._id,
      cropName,
      quantity,
      expectedPrice,
      harvestDate,
      storageDuration,
      notes,
    });

    // WhatsApp Message
    const message = `🌾 New Active Crop Request

👤 Farmer: ${req.user.fullname}
📞 Phone: ${req.user.phone}
📍 Village: ${req.user.village}

🌱 Crop: ${crop.cropName}
📦 Quantity: ${crop.quantity}
💰 Expected Price: ₹${crop.expectedPrice}
📅 Harvest Date: ${crop.harvestDate}
🗓 Storage: ${crop.storageDuration} Days

📝 Notes:
${crop.notes || "No Notes"}
`;

    // Send WhatsApp Message
    await sendWhatsAppMessage(message);

    res.status(201).json({
      success: true,
      message: "Crop request created",
      crop,
    });

  } catch (error) {
    console.log("Create Crop Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📄 Get My Active Crops
export const getMyActiveCrops = async (req, res) => {
  try {
    const crops = await ActiveCrop.find({
      farmer: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(crops);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};                      
