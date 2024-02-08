import { GlobalContext } from "@/context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AboutTab() {
  const { tabs } = useContext(GlobalContext);
  const [aosInitialized, setAosInitialized] = useState(false);

  useEffect(() => {
    if (tabs === 2 && !aosInitialized) {
      setAosInitialized(true);
    }
  }, [tabs, aosInitialized]);

  const triggerProps = {
    className: "text-white text-lg font-bold",
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      style={{ display: tabs === 2 ? "flex" : "none" }}
      id="about-tab"
      className="p-4 rounded text-white flex flex-col"
    >
      <h1 className="text-xl font-bold">Learn More:</h1>
      <ScrollArea className="w-full h-[19rem] p-4 border-none">
        <Accordion type="single" collapsible className="w-full h-full">
          <AnimatePresence>
            {[0, 1, 2, 3, 4, 5, 6].map((index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={tabs === 2 ? "visible" : "hidden"}
                exit="hidden"
                transition={{ duration: 0.4 * index, ease: "easeOut" }}
              >
                <AccordionItem value={`item-${index + 1}`}>
                  <AccordionTrigger {...triggerProps}>
                    {accordionTitles[index]}
                  </AccordionTrigger>
                  <AccordionContent>
                    {accordionContents[index]}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </AnimatePresence>
        </Accordion>
      </ScrollArea>
    </div>
  );
}

const accordionTitles = [
  "Misdirection",
  "Urgency",
  "Forced Action",
  "Sneaking",
  "Fake Social Proof",
  "Obstruction",
  "Fake Scarcity",
];

const accordionContents = [
  "When the design purposefully focuses your attention on one thing in order to distract your attention from another",
  "When a user is placed under time pressure, they are less able to critically evaluate the information shown to them because they have less time and may experience anxiety or stress",
  "Users are required to do something else undesirable in return",
  "The user is drawn into a transaction on false pretences.",
  "The user is misled into believing a product is more popular. They were shown fake reviews, testimonials, or activity messages",
  "The user is faced with barriers or hurdles, making it hard for them to complete their task",
  "The user is pressured into completing an action because they are presented with a fake indication of limited supply or popularity",
];
