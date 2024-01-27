"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Pie,
  Legend,
  Label,
  Tooltip,
  Cell,
  LineChart,
  Line,
  RadialBar,
  PieChart,
  RadialBarChart,
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
} from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: "400" });
// const PieChart = dynamic(
//   () => import("recharts").then((recharts) => recharts.PieChart),
//   { ssr: false }
// );
// const RadialBarChart = dynamic(
//   () => import("recharts").then((recharts) => recharts.RadialBarChart),
//   { ssr: false }
// );
// const data01 = [
//   {
//     name: "Urgency",
//     value: 400,
//   },
//   {
//     name: "Misdirection",
//     value: 300,
//   },
//   {
//     name: "Scarcity",
//     value: 200,
//   },
//   {
//     name: "Obstruction",
//     value: 278,
//   },
//   {
//     name: "Social Proof",
//     value: 189,
//   },
//   {
//     name: "Sneaking",
//     value: 189,
//   },
//   {
//     name: "Sneaking",
//     value: 189,
//   },
// ];

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

const mapping = [
  "Urgency",
  "Misdirection",
  "Not Dark Pattern",
  "Scarcity",
  "Obstruction",
  "Social Proof",
  "Sneaking",
  "Forced Action",
];

export default function Index({ navigateToPage }) {
  const [tabs, setTabs] = useState(0);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [faviconUrl, setFaviconUrl] = useState("/");
  const [pageTitle, setPageTitle] = useState("untitled");
  const [isClient, setIsClient] = useState(false);
  const [stage, setStages] = useState(0);
  // const [score, setScore] = useState(0);
  const [detections, setDetections] = useState([]);
  const [imageDetections, setImageDetections] = useState([]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (text != "") {
      const words = text.split("\n");
      const result = words.filter((word) => word.length > 6);
      const body = {
        string: result,
      };
      console.log(body);
      fetch("https://dark.zubairmh.xyz/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          var dataArr = [];
          data["all_counts"].forEach((element, index) => {
            dataArr.push({
              name: mapping[index],
              value: element,
            });
          });
          setText("");
          setDetections(dataArr);
        });
    }
  }, [text]);

  useEffect(() => {
    if (images.length != 0) {
      const body = {
        string: images,
      };
      console.log(body);
      setStages(1);
      fetch("https://dark.zubairmh.xyz/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          var dataArr = [];

          data["all_counts"].forEach((element, index) => {
            console.log("text", detections);
            dataArr.push({
              name: mapping[index],
              value: element,
            });
          });
          setImageDetections(dataArr);
        });
    }
  }, [images]);

  useEffect(() => {
    if (
      detections.length != 0 &&
      imageDetections.length != 0 &&
      images.length != 0
    ) {
      var x = [];
      detections.forEach((v, i) => {
        x.push({
          name: v.name,
          value: v.value + imageDetections[i].value,
        });
      });
      setImages([]);
      setDetections(x);
      setStages(2);
    }
  }, [detections, imageDetections, images]);

  useEffect(() => {
    const id = setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        setStages(0);
        chrome.tabs.sendMessage(
          tabs[0].id,
          { message: "getPage" },
          function (response) {
            console.log(response);
            setText(response);
          }
        );
        chrome.tabs.sendMessage(
          tabs[0].id,
          { message: "image" },
          function (response) {
            console.log(response);
            if (response.length == 0) {
              setStages(2);
            }
            setImages(response);
          }
        );
        chrome.tabs.sendMessage(
          tabs[0].id,
          { message: "favicon" },
          function (response) {
            console.log(response);
            setFaviconUrl(response);
          }
        );
        chrome.tabs.sendMessage(
          tabs[0].id,
          { message: "title" },
          function (response) {
            console.log(response);
            setPageTitle(response);
          }
        );
      });
    }, 2000);
    return () => clearTimeout(id);
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

    console.log(color);
    return <span style={{ color: "white" }}>{value}</span>;
  };
  return (
    <div
      style={inter.style}
      className="bg-[#24272a] w-[400px] h-auto flex flex-col gap-2 rounded-md text-white overflow-hidden"
    >
      <div className="flex flex-row items-center justify-start gap-4 rounded p-4 shadow-xl ">
        <img src="/police.png" width="20px" height="15px"></img>
        <h1 className=" text-xl text-center font-bold  text-white">WebGuard</h1>
        <div className="grow" />
        <div className="flex flex-row items-center gap-2">
          {stage == 1 ? (
            <div className="w-fit flex flex-row items-center gap-2 px-4 py-2 rounded-full bg-[#32af3d] text-[white] ">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing images</span>
            </div>
          ) : (
            <>
              <span>Connection: </span>
              <div
                style={{ backgroundColor: detections.length==0 ? "#f87171" : "lime" }}
                className="h-3 w-3 rounded-full"
              ></div>
            </>
          )}
        </div>
      </div>
      {stage == 2 || stage == 1 ? (
        <div className="flex flex-col p-2">
          <div className="flex flex-col w-full items-center justify-center gap-2">
            <div className="w-fit flex flex-row gap-2 px-4 py-2 rounded-full bg-[#21394a] text-[#1098fc] ">
              <span>Website: </span>
              <img className="h-[16px] w-auto" src={faviconUrl} />
              <span>{pageTitle}</span>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-around p-4">
              <div
                style={{ borderColor: tabs == 0 ? "#3b82f6" : "transparent" }}
                className="cursor-pointer py-2 px-4 border-b-2 border-transparent hover:border-blue-500 text-white"
                onClick={() => setTabs(0)}
              >
                Home
              </div>
              <div
                style={{ borderColor: tabs == 1 ? "#3b82f6" : "transparent" }}
                className="cursor-pointer py-2 px-4 border-b-2 border-transparent hover:border-blue-500 text-white"
                onClick={() => setTabs(1)}
              >
                Analysis
              </div>
              <div
                style={{ borderColor: tabs == 2 ? "#3b82f6" : "transparent" }}
                className="cursor-pointer py-2 px-4 border-b-2 border-transparent hover:border-blue-500 text-white"
                onClick={() => setTabs(2)}
              >
                About
              </div>
            </div>

            <div
              style={{ display: tabs == 0 ? "flex" : "none" }}
              id="detections-tab"
              className="flex flex-col gap-5"
            >
              <h1 className="text-center font-bold text-xl">
                Detected Patterns
              </h1>
              {detections.length != 0 ? (
                <div className="grid grid-cols-3  gap-3 w-full  p-3">
                  {detections.map((v, i) => {
                    console.log(v);
                    return (
                      <div
                        key={i}
                        className="bg-[#2e3134]  rounded-md text-center p-2"
                      >
                        <h1>{v.name}</h1>
                        <h2>{v.value}</h2>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col w-full h-full items-center justify-center">
                  <Loader2 className="h-32 w-32 animate-spin" />
                </div>
              )}
            </div>

            <div
              style={{ display: tabs == 1 ? "flex" : "none" }}
              id="analysis-tab"
              className="p-2 rounded text-white flex flex-col gap-5 "
            >
              {isClient && detections.length != 0 ? (
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
              ) : (
                <div className="flex flex-col w-full h-full items-center justify-center">
                  <Loader2 className="h-32 w-32 animate-spin" />
                </div>
              )}
              <button className="flex flex-col w-full h-full items-center justify-center bg-[#6a7076] rounded-lg ">
                Generate Report
              </button>
            </div>

            <div
              style={{ display: tabs == 2 ? "flex" : "none" }}
              id="about-tab"
              className="p-4 rounded text-white flex flex-col"
            >
              <h1 className="text-xl font-bold">Learn More:</h1>
              <ScrollArea className="w-full h-[19rem] p-4 border-none">
                <Accordion type="single" collapsible className="w-full h-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-white text-lg font-bold ">
                      Misdirection
                    </AccordionTrigger>
                    <AccordionContent>
                      When the design purposefully focuses your attention on one
                      thing in order to distract your attention from another
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-white text-lg font-bold ">
                      Urgency
                    </AccordionTrigger>
                    <AccordionContent>
                      When a user is placed under time pressure, they are less
                      able to critically evaluate the information shown to them
                      because they have less time and may experience anxiety or
                      stress
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-white text-lg font-bold ">
                      Forced Action
                    </AccordionTrigger>
                    <AccordionContent>
                      User are required to do something else undesirable in
                      return
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-white text-lg font-bold ">
                      Sneaking
                    </AccordionTrigger>
                    <AccordionContent>
                      The user is drawn into a transaction on false pretences.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-white text-lg font-bold ">
                      Fake Social Proof
                    </AccordionTrigger>
                    <AccordionContent>
                      The user is misled into believing a product is more
                      popular.They were shown fake reviews, testimonials, or
                      activity messages
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-white text-lg font-bold ">
                      Obstruction
                    </AccordionTrigger>
                    <AccordionContent>
                      The user is faced with barriers or hurdles, making it hard
                      for them to complete their task
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-white text-lg font-bold ">
                      Fake Scarcity
                    </AccordionTrigger>
                    <AccordionContent>
                      The user is pressured into completing an action because
                      they are presented with a fake indication of limited
                      supply or popularity
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollArea>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full items-center justify-center gap-4">
          <Loader2 className="h-32 w-32 animate-spin" />
          {stage == 0 ? (
            <span>Analyzing page text</span>
          ) : (
            <span>Analyzing page images</span>
          )}
        </div>
      )}

      {/* <span>{text=="" ?  : text}</span> */}
    </div>
  );
}
