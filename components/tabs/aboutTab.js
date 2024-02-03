import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function AboutTab() {
  const { tabs } = useContext(GlobalContext);
  return (
    <div
      style={{ display: tabs == 2 ? "flex" : "none" }}
      id="about-tab"
      className="p-4 rounded text-white flex flex-col"
    >
      <h1 className="text-xl font-bold">Learn More:</h1>
      <ScrollArea className="w-full h-[19rem] p-4 border-none">
        <Accordion type="single" collapsible className="w-full h-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-white text-lg font-bold ">
              Misdirection
            </AccordionTrigger>
            <AccordionContent>
              When the design purposefully focuses your attention on one thing
              in order to distract your attention from another
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-white text-lg font-bold ">
              Urgency
            </AccordionTrigger>
            <AccordionContent>
              When a user is placed under time pressure, they are less able to
              critically evaluate the information shown to them because they
              have less time and may experience anxiety or stress
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-white text-lg font-bold ">
              Forced Action
            </AccordionTrigger>
            <AccordionContent>
              User are required to do something else undesirable in return
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-white text-lg font-bold ">
              Sneaking
            </AccordionTrigger>
            <AccordionContent>
              The user is drawn into a transaction on false pretences.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-white text-lg font-bold ">
              Fake Social Proof
            </AccordionTrigger>
            <AccordionContent>
              The user is misled into believing a product is more popular.They
              were shown fake reviews, testimonials, or activity messages
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-white text-lg font-bold ">
              Obstruction
            </AccordionTrigger>
            <AccordionContent>
              The user is faced with barriers or hurdles, making it hard for
              them to complete their task
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-white text-lg font-bold ">
              Fake Scarcity
            </AccordionTrigger>
            <AccordionContent>
              The user is pressured into completing an action because they are
              presented with a fake indication of limited supply or popularity
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </div>
  );
}
