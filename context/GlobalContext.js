import React, { useState } from "react";
export const GlobalContext = React.createContext([]);
export default function GlobalProvider({ children }) {
  const [tabs, setTabs] = useState(0);
  const [text, setText] = useState([]);
  const [images, setImages] = useState([]);
  const [faviconUrl, setFaviconUrl] = useState("/");
  const [pageTitle, setPageTitle] = useState("untitled");
  const [stage, setStages] = useState(0);
  const [detections, setDetections] = useState([]);
  const [imageDetections, setImageDetections] = useState([]);
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
