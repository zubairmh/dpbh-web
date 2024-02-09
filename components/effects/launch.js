import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useEffect } from "react";

export default function Launch() {
  let brw = null;
  if (typeof chrome !== "undefined" && chrome.runtime) {
    brw = chrome;
  } else if (typeof browser !== "undefined" && browser.runtime) {
    brw = browser;
  }
  const { setStages, setFaviconUrl, setImages, setText, setPageTitle } =
    useContext(GlobalContext);
  useEffect(() => {
    const id = setTimeout(() => {
      brw.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        setStages(0);
        // uncheck checkbox
        brw.tabs.sendMessage(
          tabs[0].id,
          { message: "uncheck" },
          (response) => {}
        );
        brw.tabs.sendMessage(
          tabs[0].id,
          { message: "getPage" },
          function (response) {
            // console.log("getPagee : ", response);
            console.log("abcd", response);
            var data = JSON.parse(response);
            setText(data[0]);
          }
        );
        brw.tabs.sendMessage(
          tabs[0].id,
          { message: "image" },
          function (response) {
            // console.log(response);
            if (response.length == 0) {
              setStages(2);
            }
            setImages(response);
          }
        );
        brw.tabs.sendMessage(
          tabs[0].id,
          { message: "favicon" },
          function (response) {
            // console.log(response);
            setFaviconUrl(response);
          }
        );
        brw.tabs.sendMessage(
          tabs[0].id,
          { message: "title" },
          function (response) {
            // console.log(response);
            setPageTitle(response);
          }
        );
      });
    }, 2000);
    return () => clearTimeout(id);
  }, []);
  return <></>;
}
