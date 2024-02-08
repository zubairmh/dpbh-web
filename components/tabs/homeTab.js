import { GlobalContext } from "@/context/GlobalContext";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import TextTransition, { presets } from "react-text-transition";

export default function HomeTab() {
  const { tabs, detections, showing, setshowing, drawn, setdrawn, index } =
    useContext(GlobalContext);

  function draw(i) {
    hide(showing);
    if (i == showing) {
      setshowing(-1);
      return;
    }
    setshowing(i);

    let msg = "draw";
    let a = drawn;
    if (a.includes(i)) {
      msg = "show";
    } else {
      a.push(i);
      setdrawn(a);
    }
    console.log("asfasf::", msg, drawn, showing, i);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { message: msg, index: index[i], i: i },
        function (response) {}
      );
    });
  }
  function hide(i) {
    if (i == -1) {
      return;
    }
    console.log("sending hide instructions", i, drawn);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { message: "hide", index: index[i], i: i },
        function (response) {}
      );
    });
  }
  return (
    <div
      style={{ display: tabs == 0 ? "flex" : "none" }}
      id="detections-tab"
      className="flex flex-col gap-5"
    >
      <h1 className="text-center font-bold text-xl">Detected Patterns</h1>
      {detections.length != 0 ? (
        <>
          <div className="grid grid-cols-3  gap-3 w-full  p-3">
            {detections.map((v, i) => {
              // console.log(v);
              return (
                <button
                  onClick={() => {
                    draw(i);
                  }}
                  key={i}
                  className="bg-[#2e3134]  rounded-md text-center p-2"
                >
                  <h1>{v.name}</h1>
                  <div className="flex flex-row justify-center items-center w-full text-xl font-bold">
                    {`${v.value}`.split("").map((txt, i) => (
                      <TextTransition key={i} delay={i * 100} inline>
                        {txt}
                      </TextTransition>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            id="startSaber"
            onClick={() => {
              chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                  chrome.tabs.sendMessage(
                    tabs[0].id,
                    { message: "startSaber" },
                    (response) => {}
                  );
                }
              );
            }}
          >
            Use Saber to remove unwanted elements
          </button>
        </>
      ) : (
        <div className="flex flex-col w-full h-full items-center justify-center">
          <Loader2 className="h-32 w-32 animate-spin" />
        </div>
      )}
    </div>
  );
}
