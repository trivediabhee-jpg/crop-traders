import axios from "axios";

export const sendWhatsAppMessage = async (message) => {
  try {
    const url = `https://graph.facebook.com/v25.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const response = await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to: process.env.OWNER_WHATSAPP_NUMBER,
        type: "text",
        text: {
          body: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ WhatsApp Message Sent:", response.data);

  } catch (error) {
    console.log(
      "❌ WhatsApp Error:",
      error.response?.data || error.message
    );
  }
};