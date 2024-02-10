import { useEffect, useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
export default function DataPolicy() {
  let brw = null;
  if (typeof chrome !== "undefined" && chrome.runtime) {
    brw = chrome;
  } else if (typeof browser !== "undefined" && browser.runtime) {
    brw = browser;
  }
  useEffect(() => {

  }, []);
  return <></>;
}
