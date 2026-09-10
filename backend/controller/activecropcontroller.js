import ActiveCrop from "../models/activecrop-model.js";
import { sendWhatsAppMessage } from "../services/whatsappService.js";


// =====================================================
// 👨‍🌾 CREATE ACTIVE CROP - FARMER
// =====================================================

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


    // Create crop request
    const crop = await ActiveCrop.create({

      farmer: req.user._id,

      cropName,
      quantity,
      expectedPrice,
      harvestDate,
      storageDuration,
      notes,

    });


    // WhatsApp message
    const message = `🌾 New Active Crop Request

👤 Farmer: ${req.user.fullname || "Unknown"}
📞 Phone: ${req.user.phone || "N/A"}
📍 Village: ${req.user.village || "N/A"}

🌱 Crop: ${crop.cropName}
📦 Quantity: ${crop.quantity}
💰 Expected Price: ₹${crop.expectedPrice}
📅 Harvest Date: ${crop.harvestDate}
🗓 Storage: ${crop.storageDuration} Days

📝 Notes:
${crop.notes || "No Notes"}
`;


    // Send WhatsApp notification
    try {
      await sendWhatsAppMessage(message);
    } catch (whatsappError) {
      console.log(
        "WhatsApp Error:",
        whatsappError.message
      );
    }


    res.status(201).json({

      success: true,

      message: "Crop request created successfully",

      crop,

    });


  } catch (error) {

    console.log(
      "Create Crop Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};



// =====================================================
// 👨‍🌾 GET MY ACTIVE CROPS - FARMER
// =====================================================

export const getMyActiveCrops = async (req, res) => {

  try {

    const crops = await ActiveCrop.find({

      farmer: req.user._id,

    })
      .populate(
        "farmer",
        "fullname email phone village"
      )
      .sort({
        createdAt: -1,
      });


    res.status(200).json({

      success: true,

      crops,

    });


  } catch (error) {

    console.log(
      "Get My Crops Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};



// =====================================================
// 👑 GET ALL ACTIVE CROPS - OWNER
// =====================================================

export const getAllActiveCrops = async (req, res) => {

  try {

    const crops = await ActiveCrop.find()

      .populate(
        "farmer",
        "fullname email phone village"
      )

      .sort({
        createdAt: -1,
      });


    res.status(200).json({

      success: true,

      crops,

    });


  } catch (error) {

    console.log(
      "Get All Active Crops Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};                  
