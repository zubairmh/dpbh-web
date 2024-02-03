import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";
import { Loader2 } from "lucide-react";
export default function Navbar() {
    const {stage, detections}=useContext(GlobalContext)
    return (
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
              style={{
                backgroundColor: detections.length == 0 ? "#f87171" : "lime",
              }}
              className="h-3 w-3 rounded-full"
            ></div>
          </>
        )}
      </div>
    </div>
  );
}
