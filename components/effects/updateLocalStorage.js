import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useEffect } from "react";

export default function UpdateLocalStorage() {
  let brw = null;
  if (typeof chrome !== "undefined" && chrome.runtime) {
    brw = chrome;
  } else if (typeof browser !== "undefined" && browser.runtime) {
    brw = browser;
  }
  const {
    SettingsImageEnable,
    SettingsImageEnableVisuals,
    SettingsUncheckEnable,
    SettingsTTS
  } = useContext(GlobalContext);
  useEffect(() => {
    brw.storage.local
      .set({
        image: SettingsImageEnable,
        imageVisual: SettingsImageEnableVisuals,
        checkbox: SettingsUncheckEnable,
        tts: SettingsTTS
      })
      .then(() => {
        console.log("Updated Settings Set");
      })
      .catch((error)=> {
        console.log("Error Occured Saving: ", error)
      });
  }, [SettingsImageEnable, SettingsImageEnableVisuals, SettingsUncheckEnable, SettingsTTS]);
  return <></>;
}
