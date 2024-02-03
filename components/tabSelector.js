import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";

export default function TabSelector() {
  const { tabs, setTabs } = useContext(GlobalContext);
  return (
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
  );
}
