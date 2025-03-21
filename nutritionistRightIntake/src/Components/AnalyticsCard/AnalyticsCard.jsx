import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./AnalyticsCard.css";

const AnalyticsCard = (meetingsArray) => {
  const clientAnalytics = meetingsArray?.meetingsArray?.clientAnalytics;

  console.log("clientAnalytics : ", clientAnalytics);

  const [hoveredMonth, setHoveredMonth] = useState(null);

  return (
    <>
      {clientAnalytics && (
        <div className="analytics-card-container">
          <div className="analytics-card-heading">
            <span>Client Analytics</span>
          </div>
          <div className="analytics-chart-wrapper">
            <ResponsiveContainer width={500} height={400}>
              <BarChart data={clientAnalytics}>
                <XAxis
                  dataKey="month"
                  axisLine={false} // ✅ Hides the bottom line
                  tickLine={false}
                  tick={{ fill: "#333", fontWeight: 600, fontStyle: "italic" }}
                />
                <Tooltip cursor={{ fill: "transparent" }} />

                <Bar
                  dataKey="clients"
                  radius={[10, 10, 10, 10]} // Rounded corners
                  barSize={100}
                  spacing={20}
                  onMouseLeave={() => setHoveredMonth(null)}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {clientAnalytics?.map((entry) => (
                    <Cell
                      key={entry.month}
                      fill={
                        hoveredMonth === entry.month ? "#77A5B9" : "#D3E0EA"
                      }
                      strokeWidth={2}
                      onMouseEnter={() => setHoveredMonth(entry.month)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {!clientAnalytics && <img src="./noactiveclients.png" alt="" />}
    </>
  );
};

export default AnalyticsCard;
