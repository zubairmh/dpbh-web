import { GlobalContext } from "@/context/GlobalContext";
import { mapping } from "@/lib/globals";
import { useContext, useState, useEffect } from "react";
export default function SendText() {
  const { setDetections, text, index, setindex, stage } = useContext(GlobalContext);

  let brw = null;
  if (typeof chrome !== "undefined" && chrome.runtime) {
    brw = chrome;
  } else if (typeof browser !== "undefined" && browser.runtime) {
    brw = browser;
  }
  useEffect(() => {
    if (text.length != 0 && stage==0) {
      console.log("Sending Text");
      const words = text;
      const body = {
        string: words,
      };
      // console.log(body);
      fetch("https://dark.rachancheet.me/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("got response from api 0", data);
          var dataArr = [];
          data["all_counts"].forEach((element, index) => {
            console.log("working");
            dataArr.push({
              name: mapping[index],
              value: element,
            });
          });
          setDetections(dataArr);
          console.log("got response from api 1 ");
          let ind = index;
          for (let n = 0; n < data.pattern_id.length; n++) {
            ind[data.pattern_id[n]].push(n);
          }
          setindex(ind);
          console.log("index recived ");
          brw.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              brw.tabs.sendMessage(
                tabs[0].id,
                { message: "draw", index: index },
                function (response) {}
              );
            }
          );
          console.log("index : ", index);
        });
    }
  }, [text]);

  return <></>;
}
