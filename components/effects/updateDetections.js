import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useEffect } from "react";

export default function UpdateDetections() {
    const {detections, imageDetections, images, setDetections, setImageDetections} = useContext(GlobalContext)
    useEffect(() => {
        if (detections.length != 0 && imageDetections.length != 0) {
          var x = [];
          detections.forEach((v, i) => {
            x.push({
              name: v.name,
              value: v.value + imageDetections[i].value,
            });
          });
          setImageDetections([]);
          setDetections(x);
        }
      }, [detections, imageDetections, images]);
    return <></>
}