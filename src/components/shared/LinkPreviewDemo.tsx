import React from "react";
import { LinkPreview } from "../ui/link-preview";

const LinkPreviewDemo = () => {
  return (
    <div className="flex justify-center items-center h-[40rem] flex-col px-4">
      <p className="text-neutral-500  dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto mb-10">
        <LinkPreview
          imageClassName="  blur-sm"
          url=""
          className="font-bold bg-red-900"
          isStatic
          imageSrc="https://jldptczaxybijbhlcbjj.supabase.co/storage/v1/object/public/projects/0.22022548774976847-448761789_403845375988886_4641902549961719231_n.jpg"
        >
          Tailwind CSS
        </LinkPreview>{" "}
        and{" "}
        <LinkPreview url="https://framer.com/motion" className="font-bold">
          Framer Motion
        </LinkPreview>{" "}
        are a great way to build modern websites.
      </p>
      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto">
        Visit{" "}
        <LinkPreview
          url="https://ui.aceternity.com"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
        >
          Aceternity UI
        </LinkPreview>{" "}
        for amazing Tailwind and Framer Motion components.
      </p>
    </div>
  );
};

export default LinkPreviewDemo;
