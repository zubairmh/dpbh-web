import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { Inter } from "next/font/google";
import { FaArrowLeft } from "react-icons/fa6";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"], weight: "400" });

const textAnimation = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const staggerSettings = {
  hidden: { opacity: 0, x: -50 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: index * 0.2 },
  }),
};

export default function Settings() {
  const env = process.env.NODE_ENV;
  let brw = null;
  if (typeof chrome !== "undefined" && chrome.runtime) {
    brw = chrome;
  } else if (typeof browser !== "undefined" && browser.runtime) {
    brw = browser;
  }
  const {
    setActivePage,
    activePage,
    setSettingsImageEnable,
    setSettingsImageEnableVisuals,
    setSettingsUncheckEnable,
    setSettingsTTS
  } = useContext(GlobalContext);
  const [image, setImage] = useState(true);
  const [imageVisual, setImageVisual] = useState(true);
  const [checkbox, setCheckbox] = useState(true);
  const [tts, setTTS] = useState(true);
  useEffect(() => {
    brw.storage.local
      .get(["image", "imageVisual", "checkbox", "tts"])
      .then((result) => {
        if (
          typeof result.image === "undefined" ||
          typeof result.imageVisual === "undefined" ||
          typeof result.checkbox === "undefined"||
          typeof result.tts === "undefined"
        ) {
          brw.storage.local
            .set({ image: image, imageVisual: imageVisual, checkbox: checkbox, tts: tts })
            .then(() => {
              console.log("Default Settings Set");
            });
        } else {
          console.log("Are Images Enabled? " + result.image);
          console.log("Are Images Visual Enabled? " + result.imageVisual);
          console.log("Are Uncheck Checkboxes Enabled? " + result.checkbox);
          console.log("Is TTS Enabled? " + result.tts);
          setImage(result.image);
          setImageVisual(result.imageVisual);
          setCheckbox(result.checkbox);
          setSettingsTTS(result.tts);
        }
      });
  }, []);

  return (
    <div
      style={inter.style}
      className="bg-[#24272a] w-[400px] h-auto flex flex-col gap-2 rounded-md text-white overflow-hidden"
    >
      <div className="flex flex-row items-center p-4 shadow-xl text-center w-full">
        <motion.button
          onClick={() => setActivePage("index")}
          whileHover={{ scale: 1.1 }}
        >
          <FaArrowLeft />
        </motion.button>
        <motion.h1
          className="text-xl font-bold w-full"
          variants={textAnimation}
        >
          Settings
        </motion.h1>
      </div>

      <motion.div className="flex flex-col gap-2">
        <motion.div
          className="flex flex-row items-center justify-between p-4"
          variants={staggerSettings}
          key="active-page"
        >
          <span>Active Page</span>
          <span>{activePage}</span>
        </motion.div>
        <motion.div
          className="flex flex-row items-center justify-between p-4"
          variants={staggerSettings}
          key="disable-something"
        >
          <span>Enable Image Classification</span>
          <Switch
            checked={image}
            onCheckedChange={(enabled) => {
              console.log("Image", enabled);
              setImage(enabled);
              setSettingsImageEnable(enabled);
            }}
          />
        </motion.div>
        <motion.div
          className="flex flex-row items-center justify-between p-4"
          variants={staggerSettings}
          key="disable-something"
        >
          <span>Enable Visual Image Feedback</span>
          <Switch
            checked={imageVisual}
            onCheckedChange={(enabled) => {
              console.log("Image Visuals", enabled);
              setImageVisual(enabled);
              setSettingsImageEnableVisuals(enabled);
            }}
          />
        </motion.div>
        <motion.div
          className="flex flex-row items-center justify-between p-4"
          variants={staggerSettings}
          key="disable-something"
        >
          <span>Enable Forced Checkbox Removal</span>
          <Switch
            checked={checkbox}
            onCheckedChange={(enabled) => {
              console.log("Checkbox", enabled);
              setCheckbox(enabled);
              setSettingsUncheckEnable(enabled);
            }}
          />
        </motion.div>
        <motion.div
          className="flex flex-row items-center justify-between p-4"
          variants={staggerSettings}
          key="disable-something"
        >
          <span>Enable Audio AID (Turns on TTS)</span>
          <Switch
            checked={tts}
            onCheckedChange={(enabled) => {
              console.log("TTS", enabled);
              setTTS(enabled);
              setSettingsTTS(enabled);
            }}
          />
        </motion.div>
      </motion.div>
      {env === "development" && <div>Development Mode</div>}
    </div>
  );
}
