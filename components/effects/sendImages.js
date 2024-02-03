import { useEffect, useContext } from "react";
import { mapping } from "@/lib/globals";
import { GlobalContext } from "@/context/GlobalContext";
export default function SendImages() {
  const { images, setImageDetections, setStages } = useContext(GlobalContext);
  useEffect(() => {
    if (images.length != 0) {
      //   const body = {
      //     string: images,
      //   };
      setStages(1);
      var x = images.slice();
      const socket = new WebSocket("wss://dark.zubairmh.xyz/ws");
      var i = 0;
      var peak = x.length - 1;

      // Listen for messages
      socket.addEventListener("message", (event) => {
        if (event.data == "OK") {
          // console.log("Message from server ", event.data);
        } else {
          var out = JSON.parse(event.data);
          chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
              chrome.tabs.sendMessage(
                tabs[0].id,
                {
                  message: "disable",
                  link: out["link"],
                  pattern_type: out["unique"][0],
                },
                function (response) {
                  console.log(response);
                }
              );
              var dataArr = [];

              out["all_counts"].forEach((element, index) => {
                dataArr.push({
                  name: mapping[index],
                  value: element,
                });
              });
              setImageDetections(dataArr);
            }
          );
        }
        if (i <= peak) {
          console.log(`Sending image ${i}/${peak}`);
          socket.send(
            JSON.stringify({
              type: "data",
              link: x[i],
            })
          );
          i++;
        } else {
          setStages(2);
          socket.close();
        }
      });
    }
  }, [images]);

  return <></>;
}
