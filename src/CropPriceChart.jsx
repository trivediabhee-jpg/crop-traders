import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

/* 🔥 YAHI ADD KARNA HAI */
const mean = arr =>
  arr.reduce((a, b) => a + b, 0) / arr.length;

const CropPriceChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/prices")
      .then(res => res.json())
      .then(result => {

        const merged = result.wheat.map((item, index) => ({
          date: item.date,
          wheat: item.price,
          rice: result.rice[index].price,
          corn: result.corn[index].price,
          daal: result.daal[index].price
        }));

        setData(merged);
      });
  }, []);

  /* 🔥 mean calculation */
  const wheatMean = mean(data.map(d => d.wheat));
  const riceMean  = mean(data.map(d => d.rice));
  const cornMean  = mean(data.map(d => d.corn));
  const daalMean  = mean(data.map(d => d.daal));

  return (
    <div className="w-full h-[500px] bg-white p-6 rounded-xl shadow">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        Crop Price Fluctuation 📈
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* 🔵 Price Lines */}
          <Line dataKey="wheat" stroke="#eab308" />
          <Line dataKey="rice" stroke="#22c55e" />
          <Line dataKey="corn" stroke="#f97316" />
          <Line dataKey="daal" stroke="#ef4444" />

          {/* 🔴 Mean Price Lines */}
          <ReferenceLine y={wheatMean} stroke="#eab308" strokeDasharray="5 5" />
          <ReferenceLine y={riceMean} stroke="#22c55e" strokeDasharray="5 5" />
          <ReferenceLine y={cornMean} stroke="#f97316" strokeDasharray="5 5" />
          <ReferenceLine y={daalMean} stroke="#ef4444" strokeDasharray="5 5" />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CropPriceChart;

