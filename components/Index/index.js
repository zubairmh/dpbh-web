import { useEffect, useState } from "react";
import {  Pie } from "recharts";
import { LineChart, Line } from "recharts";
import dynamic from "next/dynamic";

const PieChart = dynamic(() => (
  import("recharts").then(recharts => recharts.PieChart)
), { ssr: false });
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data01 = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];

export default function Index({ navigateToPage }) {
  const [tabs, setTabs] = useState(false);
  // const [text, setText]=useState("")
  // useEffect(()=>{
  //   const id=setTimeout(() => {
  //     chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
  //     chrome.tabs.sendMessage(tabs[0].id, {message: "getPage"}, function (response) {
  //       console.log(response);
  //       setText(response);
  //     });
  //   })
  //   }, 2000);
  //   return ()=>clearTimeout(id);
  // },[])
  return (
    <div className="bg-black w-[400px] h-[500px] flex flex-col gap-4 text-white p-4">
      <div className="flex flex-row justify-center gap-6 bg-white rounded  p-4 ">
        <img src="/police.png" width="40px" height="40px"></img>
        <h1 className=" text-3xl text-center font-bold  text-black">
          WebGuard
        </h1>
      </div>
      <div className="bg-white justify-center w-full h-full">
        <div className="flex flex-row justify-center gap-6 bg-white rounded  p-4 ">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="54px"
            height="54px"
            class="_1LzpKzfM"
            role="img"
            alt="temu"
            aria-label="temu"
            fill="#fb7701"
            stroke="none"
            stroke-width="18.962962962962962"
          >
            <title>temu</title>
            <path d="M796.4 0c125.7 0 227.6 101.9 227.6 227.6l0 568.8c0 125.7-101.9 227.6-227.6 227.6l-568.8 0c-125.7 0-227.6-101.9-227.6-227.6l0-568.8c0-125.7 101.9-227.6 227.6-227.6l568.8 0z m-256 531.9l-13.6 0c-12.1 0-22 9.8-21.9 21.9l0 150.5c0 12.1 9.8 22 21.9 22 12.1 0 22-9.8 22-22l0-98.8 37 52.2c7.7 10.8 23.7 10.8 31.5 0l37-52.2 0 98.8c0 12.1 9.8 22 22 22 12.1 0 22-9.8 21.9-22l0-150.5c0-12.1-9.8-22-21.9-21.9l-13.6 0c-5.2 0-10.2 2.5-13.2 6.8l-47.9 72-48-72c-3-4.3-7.9-6.8-13.2-6.8z m340.2 0c-12.1 0-22 9.8-22 21.9l0 91.9c0 28.9-16.3 43.7-43.1 43.6-26.8 0-43.1-15.3-43-44.9l0-90.6c0-12.1-9.8-22-22-21.9-12.1 0-22 9.8-21.9 21.9l0 91.6c0 53.6 32.8 80.9 86.4 80.9 53.6 0 87.6-27 87.5-82.2l0-90.3c0-12.1-9.8-22-21.9-21.9z m-616.9 0l-128.3 0c-12.1 0-22 9.8-22 21.9 0 12.1 9.8 22 22 22l42.2 0 0 128.3c0 12.1 9.8 22 21.9 22 12.1 0 22-9.8 22-22l0-128.3 42.2 0c12.1 0 22-9.8 22-22 0-12.1-9.8-22-22-21.9z m189.9 0l-118.9 0c-12.1 0-22 9.8-22 21.9l0 150.3c0 12.1 9.8 22 22 22l118.9 0c12.1 0 22-9.8 21.9-22 0-12.1-9.8-22-21.9-22l-97 0 0-31.2 84.4 0c12.1 0 22-9.8 22-21.9 0-12.1-9.8-22-22-22l-84.4 0 0-31.2 97 0c12.1 0 22-9.8 21.9-22 0-12.1-9.8-22-21.9-21.9z m-214.5-229.4l-4.1 0.1c-17.1 1.1-28.8 8.5-35.4 18.5-7.7-11.5-22.1-19.6-43.8-18.4l-0.5 0.7c-2.5 4-11.9 21.9 3.3 41.4 3.1 3.3 10.7 12.6 7.6 24.5l-44.1 71.3c-3.6 5.8-2 13.3 3.5 17.2 11.4 8 34.3 19 74 19 39.6 0 62.5-11 73.9-19l1.5-1.3c4.3-4.1 5.2-10.7 2-15.9l-44-71.3 0.3 1.3-0.5-2c-2.4-10.7 3.6-19.2 6.9-23l0.8-0.8c15.3-19.5 5.8-37.3 3.3-41.4l-0.4-0.7-4.3-0.2z m142.8 33.4c-15.1-30-34.7-35.1-44.5-27.3-7.5 6-24.8 29.7-26 31.3-19.1 27.1-18 33.7 6.5 49.1 13.8 8.7 24.9-2.5 29.7-5.8-2.3 14.3-9.3 36.8-19.8 52.6-5.7-4.3-9.9-7.6-12.5-10-3.3-3-8.3-2.8-11.5 0.3-1.5 1.5-2.3 3.5-2.2 5.7 0.1 2.1 1 4.1 2.5 5.5 25.5 23.3 59 36.5 94.7 36.6 35.8 0 69.5-13.2 95-36.6 3.3-3 3.4-8 0.4-11.2-3.2-3.2-8.2-3.3-11.5-0.3-2 1.8-4 3.5-6.1 5.2l-11.2-25c-1.8-4.3-3.8-9.7-6-16.2 1.1-2.7 3.4-5.3 6.7-8.7 2.4-2.4 4.4-4.8 5.9-7.1 7.4-11.7 3.2-18.6 0.9-23.2-5.3-10.8-13.6-7.3-19.6-0.9-7.4 7.8-14.6 11.2-26.2 13.8-9.7 2.2-17.2 1.1-23.4-2.8-8.6-5.3-21.8-25-21.8-25z m277.3-30.5c-32 30.4-1.3 96.5-59.5 124.6-6.4 3.1-11.7-7.1-20.3-7.1-24.3 0.2-70.7 21.6-72.5 32.4-1.5 8.9 18.3 16 76.7 16.1 50.8 0 67.2-77.3 85-77.4 17.8 0 9.5 70.1 7.6 77.4l18.6 0c-1.6-7.3-2.8-29.3-2.7-60.4 0-31.1 5.6-38 10.1-61.5 3.9-20.4-26.3-38.1-43-44.1z m182.4 2.5l-52.1 0c-33.7 0-61.7 26.1-64 59.7l-3.8 53.9c-1.8 25.6 18.5 47.3 44.1 47.4l99.4 0c25.7 0 45.9-21.7 44.2-47.4l-3.8-53.9c-2.4-33.6-30.3-59.7-64-59.7z m-442.6 124c15.7 0 27.7 7.7 32.1 22-10.7 2.8-21.4 4.2-32.3 4.1-16.4 0-22.2-1.5-32.7-4.3 4.2-12.6 18.1-21.8 32.9-21.8z m392.9-79.3l0 1.5c0 13 10.6 23.7 23.6 23.7 13 0 23.7-10.6 23.7-23.7l0-1.5c0-5.8 21-5.8 21 0l0 1.5c0 24.6-20 44.6-44.7 44.6-24.6 0-44.6-20-44.6-44.6l0-1.5c0-5.8 20.9-5.8 21 0z"></path>
          </svg>
          <h1 className=" text-4xl text-center font-bold  text-black">TEMU</h1>
        </div>
        <div className="flex flex-row justify-center gap-6">
          <div class="container mx-auto p-4">
            <div class="w-full">
              <div class="flex justify-around bg-white p-4 rounded-t">
                <div
                  class="cursor-pointer py-2 px-4 border-b-2 border-transparent hover:border-blue-500 text-black"
                  onClick={() => setTabs(false)}
                >
                  Account
                </div>
                <div
                  class="cursor-pointer py-2 px-4 border-b-2 border-transparent hover:border-blue-500 text-black"
                  onClick={() => setTabs(true)}
                >
                  Password
                </div>
              </div>

              <div
                style={{ display: !tabs ? "flex" : "none" }}
                id="account-tab"
                class="p-4 bg-white border rounded shadow mt-2 text-black"
              >
                <PieChart width={500} height={400} className="!w-full !h-32">
                  <Pie
                    data={data01}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={190}
                    fill="#8884d8"
                  />
                </PieChart>
                {/* <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
              </div>

              <div
                style={{ display: tabs ? "flex" : "none" }}
                id="password-tab"
                class="p-4 bg-white border rounded shadow mt-2 hidden text-black"
              >
                Change your password here.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <span>{text=="" ? <Loader2 className="h-32 w-32 animate-spin"/> : text}</span> */}
    </div>
  );
}
