import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    wheat: [
      { date: "2025-01-01", price: 2100 },
      { date: "2025-01-02", price: 2150 },
      { date: "2025-01-03", price: 2080 }
    ],
    rice: [
      { date: "2025-01-01", price: 3200 },
      { date: "2025-01-02", price: 3250 },
      { date: "2025-01-03", price: 3300 }
    ],
    corn: [
      { date: "2025-01-01", price: 1800 },
      { date: "2025-01-02", price: 1750 },
      { date: "2025-01-03", price: 1820 }
    ],
    daal: [
      { date: "2025-01-01", price: 6000 },
      { date: "2025-01-02", price: 6100 },
      { date: "2025-01-03", price: 6050 }
    ]
  });
});

export default router;
