import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useEffect } from "react";

export default function Launch() {
    const {setStages, setFaviconUrl, setImages, setText, setPageTitle}=useContext(GlobalContext)
    useEffect(() => {
        const id = setTimeout(() => {
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            setStages(0);
            chrome.tabs.sendMessage(
              tabs[0].id,
              { message: "getPage" },
              function (response) {
                console.log("getPagee : ", response);
                setText(response[0]);
              }
            );
            chrome.tabs.sendMessage(
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
            chrome.tabs.sendMessage(
              tabs[0].id,
              { message: "favicon" },
              function (response) {
                // console.log(response);
                setFaviconUrl(response);
              }
            );
            chrome.tabs.sendMessage(
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
    return (
        <></>
    )
}