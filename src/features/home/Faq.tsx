import React, { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Heading from "@/components/shared/Heading";
const FAQ_ITEMS: { itemHeading: ReactNode; itemContant: ReactNode }[] = [
  { itemHeading: "What is the prupose of this app?", itemContant: "" },
];
const Faq = () => {
  return (
    <div id="learn-more" className="my-40">
      <Heading
        as="h2"
        Text="FAQ"
        className="text-center text-[clamp(1.2rem,3.3vw,3.2rem)] font-semibold"
      />
      <Accordion type="single" collapsible className="mx-auto max-w-[1100px]">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is the prupose of this app?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
