import { GlobalContext } from "@/context/GlobalContext";
import { mapping } from "@/lib/globals";
import { useContext, useState, useEffect } from "react";
export default function SendText() {
  const {setDetections, text, index, setindex} = useContext(GlobalContext)

  useEffect(() => {
    if (text.length != 0) {
      console.log("Sending Text")
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
            // if (data.pattern_id[n] != 2) {
            // console.log("working");
            // ah.push(ellis[n]);
            // console.log(data.pattern_id);
            // bh.push(data.pattern_id[n]);
            ind[data.pattern_id[n]].push(n);
          }
          setindex(ind);
          console.log("index : ", index);
          // }
          // console.log("got responce from api 2 ", ah, bh, data.pattern_id);
          // draw(ah, bh);
        });
    }
  }, [text]);


  return <></>;
}
