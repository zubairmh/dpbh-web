import React, { useState, useEffect } from "react";
export const GlobalContext = React.createContext([]);
export default function GlobalProvider({ children }) {
  let brw = null;
  if (typeof chrome !== "undefined" && chrome.runtime) {
    brw = chrome;
  } else if (typeof browser !== "undefined" && browser.runtime) {
    brw = browser;
  }
  const [tabs, setTabs] = useState(0);
  const [text, setText] = useState([]);
  const [images, setImages] = useState([]);
  const [faviconUrl, setFaviconUrl] = useState("/");
  const [pageTitle, setPageTitle] = useState("untitled");
  const [stage, setStages] = useState(0);
  const [detections, setDetections] = useState([]);
  const [imageDetections, setImageDetections] = useState([]);
  const [activePage, setActivePage] = useState("index");
  const [index, setindex] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  });
  const [drawn, setdrawn] = useState([]);
  const [showing, setshowing] = useState(-1);
  const [SettingsImageEnable, setSettingsImageEnable] = useState(true);
  const [SettingsImageEnableVisuals, setSettingsImageEnableVisuals] = useState(true);
  const [SettingsUncheckEnable, setSettingsUncheckEnable] = useState(true);
  const [SettingsTTS, setSettingsTTS] = useState(true);
  const [spoken, setSpoken] = useState(false);
  useEffect(() => {
    brw.storage.local
      .get(["image", "imageVisual", "checkbox","tts"])
      .then((result) => {
        if (
          typeof result.image === "undefined" ||
          typeof result.imageVisual === "undefined" ||
          typeof result.checkbox === "undefined" ||
          typeof result.tts === "undefined" 
        ) {
          brw.storage.local
            .set({ image: SettingsImageEnable, imageVisual: SettingsImageEnableVisuals, checkbox: SettingsImageEnableVisuals, tts: SettingsTTS })
            .then(() => {
              console.log("Default Settings Set");
            });
        } else {
          console.log("Are Images Enabled? " + result.image);
          console.log("Are Images Visual Enabled? " + result.imageVisual);
          console.log("Are Uncheck Checkboxes Enabled? " + result.checkbox);
          console.log("TTS Enabled? " + result.tts);
          setSettingsImageEnable(result.image);
          setSettingsImageEnableVisuals(result.imageVisual);
          setSettingsUncheckEnable(result.checkbox);
          setSettingsTTS(result.tts);
        }
      });
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        // Getter
        tabs: tabs,
        text: text,
        images: images,
        faviconUrl: faviconUrl,
        pageTitle: pageTitle,
        stage: stage,
        detections: detections,
        imageDetections: imageDetections,
        index: index,
        drawn: drawn,
        showing: showing,
        activePage: activePage,
        SettingsImageEnable: SettingsImageEnable,
        SettingsImageEnableVisuals: SettingsImageEnableVisuals,
        SettingsUncheckEnable: SettingsUncheckEnable,
        SettingsTTS: SettingsTTS,
        spoken: spoken,

        // Setter
        setTabs: setTabs,
        setText: setText,
        setImages: setImages,
        setFaviconUrl: setFaviconUrl,
        setPageTitle: setPageTitle,
        setStages: setStages,
        setDetections: setDetections,
        setImageDetections: setImageDetections,
        setindex: setindex,
        setdrawn: setdrawn,
        setshowing: setshowing,
        setActivePage: setActivePage,
        setSettingsImageEnable: setSettingsImageEnable,
        setSettingsImageEnableVisuals: setSettingsImageEnableVisuals,
        setSettingsUncheckEnable: setSettingsUncheckEnable,
        setSettingsTTS: setSettingsTTS,
        setSpoken: setSpoken
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
