import { useContext, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Inter } from "next/font/google";
import Details from "./details";
import TabSelector from "./tabSelector";
import HomeTab from "./tabs/homeTab";
import AnalysisTab from "./tabs/analysisTab";
import AboutTab from "./tabs/aboutTab";
import Navbar from "./navbar";
import { GlobalContext } from "@/context/GlobalContext";
import * as effects from "@/components/effects";
const inter = Inter({ subsets: ["latin"], weight: "400" });

export default function Index() {
  const { stage } = useContext(GlobalContext);
  const env = process.env.NODE_ENV;
  return (
    <div
      style={inter.style}
      className="bg-[#24272a] w-[450px] h-auto flex flex-col gap-2 rounded-md text-white overflow-hidden"
    >
      {env === "production" && (
        <>
          <effects.Launch />
          <effects.SendText />
          <effects.SendImages />
          <effects.UpdateDetections />
          <effects.UpdateLocalStorage />
          {/* <effects.TTSpeak/> */}
        </>
      )}

      <Navbar />
      {stage == 2 || stage == 1 ? (
        <div className="flex flex-col p-2">
          <Details />
          <div className="flex flex-col w-full">
            <TabSelector />
            <HomeTab />
            <AnalysisTab />
            <AboutTab />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full items-center justify-center gap-4">
          <Loader2 className="h-32 w-32 animate-spin" />
          <span>Analyzing page text and unchecking checkboxes</span>
        </div>
      )}
    </div>
  );
}

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
//     name: "Not Dark Pattern",
//     value: 189,
//   },
// ];
