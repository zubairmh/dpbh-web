import { GlobalContext } from "@/context/GlobalContext";
import { Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Pie, Legend, Cell, PieChart } from "recharts";
import Generatereport from "../generatedoc";
const colors = [
  "#a6cee3",
  "#1f78b4",
  "#b2df8a",
  "#33a02c",
  "#e31a1c",
  "#ff7f00",
  "#6a3d9a",
  "#b645b3",
];

export default function AnalysisTab() {
  const [isClient, setIsClient] = useState(false);
  const { tabs, detections, urls } = useContext(GlobalContext);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * 1.4 * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * 1.4 * Math.sin(-midAngle * (Math.PI / 180));
    // if (index == 2) {
    //   setScore((percent * 100).toFixed(0));
    // }
    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontSize={40} // Adjust the label size here
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="animate-fade"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;

    // console.log(color);
    return <span style={{ color: "white" }}>{value}</span>;
  };
  return (
    <div
      style={{ display: tabs == 1 ? "flex" : "none" }}
      id="analysis-tab"
      className="p-2 rounded text-white flex flex-col gap-5 "
    >
      {isClient && detections.length != 0 ? (
        <>
          <PieChart
            width={600}
            height={600}
            className="!w-full !h-44 shadow-none"
          >
            <Pie
              data={detections}
              dataKey="value"
              nameKey="name"
              cx="0%"
              cy="50%"
              innerRadius={140}
              outerRadius={190}
              fill="#8884d8"
              label={renderCustomizedLabel}
            >
              {/* <Label fontSize={80} value={score} position="center" /> */}
              {detections.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Legend
              iconSize={15}
              iconType="circle"
              formatter={renderColorfulLegendText}
              align="right"
              verticalAlign="top"
              layout="vertical"
            />
          </PieChart>
          <Generatereport />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {urls ? (
              Object.keys(urls).map((key, index) => (
                <div
                  key={index}
                  style={{ marginBottom: "10px", textAlign: "center" }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "100px",
                      backgroundColor: "blue",
                    }}
                  ></div>
                  <div>{key}</div>
                  {urls[key]}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col w-full h-full items-center justify-center">
          <Loader2 className="h-32 w-32 animate-spin" />
        </div>
      )}
    </div>
  );
}
