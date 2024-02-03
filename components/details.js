import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";

export default function Details() {
  const {faviconUrl, pageTitle} = useContext(GlobalContext)
  return (
    <div className="flex flex-col w-full items-center justify-center gap-2">
      <div className="w-fit flex flex-row gap-2 px-4 py-2 rounded-full bg-[#21394a] text-[#1098fc] ">
        <span>Website: </span>
        <img className="h-[16px] w-auto" src={faviconUrl} />
        <span>{pageTitle}</span>
      </div>
    </div>
  );
}
