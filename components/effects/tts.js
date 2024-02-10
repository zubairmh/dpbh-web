import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useEffect } from "react";

export default function TTSpeak() {
    const {stage, detections, spoken, setSpoken}=useContext(GlobalContext)
    let brw=null;
    if (typeof chrome !== "undefined" && chrome.runtime) {
        brw = chrome;
    } else if (typeof browser !== "undefined" && browser.runtime) {
        brw = browser;
    }
    useEffect(()=> {
        if(!spoken && stage==2) {
            let message=""
            for(let i=0; i<detections.length; i++) {
                if(detections[i].value>0 && i!=2) {
                    message=message.concat(`${detections[i].name} ${detections[i].value} बारी आया है\n`)
                }
            }
            setSpoken(true);
            brw.tts.speak(message, {
                lang: 'hi-IN'
            });
        }
    }, [stage]);
    return <></>
}