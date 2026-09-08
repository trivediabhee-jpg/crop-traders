import BuyRequest from "../models/Buyreq-model.js";

// ===============================
// CREATE BUY REQUEST
// ===============================
export const createBuyRequest = async (req, res) => {
  try {
    const {
      company,
      person,
      email,
      phone,
      crop,
      quantity,
      price,
      location,
      date,
      notes,
    } = req.body;

    const newRequest = new BuyRequest({
      company,
      person,
      email,
      phone,
      crop,
      quantity,
      price,
      location,
      date,
      notes,
      status: "Pending",
    });

    const savedRequest = await newRequest.save();

    res.status(201).json({
      success: true,
      message: "Buy request sent successfully",
      request: savedRequest,
    });
  } catch (error) {
    console.error("Create Buy Request Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create buy request",
      error: error.message,
    });
  }
};


// ===============================
// GET ALL BUY REQUESTS
// ===============================
export const getBuyRequests = async (req, res) => {
  try {
    const requests = await BuyRequest.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Get Buy Requests Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch buy requests",
      error: error.message,
    });
  }
};


// ===============================
// UPDATE BUY REQUEST STATUS
// ===============================
export const updateBuyRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedRequest = await BuyRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({
        success: false,
        message: "Buy request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Buy request status updated",
      request: updatedRequest,
    });
  } catch (error) {
    console.error("Update Buy Request Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update buy request",
      error: error.message,
    });
  }
};