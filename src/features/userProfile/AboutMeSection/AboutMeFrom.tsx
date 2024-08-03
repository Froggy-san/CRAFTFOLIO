("use client");
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { colorSchema, silderColorSchema } from "@/formScehmas/colorSchema";
import { defaultText, defaultTextColor } from "@/utils/constants";
import FormFieldItem from "@/components/shared/FormFieldItem";
import { Textarea } from "@/components/ui/textarea";
import { IoMdArrowDropright } from "react-icons/io";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiArrowRight } from "react-icons/ti";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { TbArrowBigRightLine } from "react-icons/tb";
import { LuDot } from "react-icons/lu";
import { PiDotOutlineDuotone } from "react-icons/pi";
import { PiDotDuotone } from "react-icons/pi";
import { PiDotOutline } from "react-icons/pi";
import {
  BlockPicker,
  CompactPicker,
  MaterialPicker,
  SketchPicker,
  SliderPicker,
  TwitterPicker,
} from "react-color";
import React, { useState } from "react";
import { ClickAwayListener } from "@mui/material";
// import TagsInput from "@/components/shared/TagsInput";
import useEditAboutMe from "./useEditAboutMe";
import AboutMePreview from "./AboutMePreview";
import FormButtons from "@/components/shared/FormButtons";
import useObjectCompare from "@/hooks/useCompareObjects";
import { aboutMeFormProps } from "@/types/types";
import TagsInput from "@/components/shared/TagsInputRewrite";
import Heading from "@/components/shared/Heading";
const arrowSize = 21;

export const options: { label: JSX.Element; value: string }[] = [
  { label: <p>None</p>, value: "none" },
  {
    label: <IoMdArrowDropright size={arrowSize} />,
    value: "IoMdArrowDropright",
  },
  {
    label: <MdOutlineArrowRightAlt size={arrowSize} />,
    value: "MdOutlineArrowRightAlt",
  },

  {
    label: <MdOutlineSubdirectoryArrowRight size={arrowSize} />,
    value: "MdOutlineSubdirectoryArrowRight",
  },
  {
    label: <MdKeyboardArrowRight size={arrowSize} />,
    value: "MdKeyboardArrowRight",
  },
  {
    label: <TiArrowRight size={arrowSize} />,
    value: "TiArrowRight",
  },

  {
    label: <TbArrowBigRightLine size={arrowSize} />,
    value: "TbArrowBigRightLine",
  },
  {
    label: <LuDot size={arrowSize} />,
    value: "LuDot",
  },
  {
    label: <PiDotOutlineDuotone size={arrowSize} />,
    value: "PiDotOutlineDuotone",
  },

  {
    label: <PiDotOutline size={arrowSize} />,
    value: "PiDotOutline",
  },

  {
    label: <PiDotDuotone size={arrowSize} />,
    value: "PiDotDuotone",
  },
];
const aboutMeSchema = z.object({
  links: z.string().array().default([]),
  toolsAndTech: z.string().array(),
  arrowType: z.string(),
  arrowColor: silderColorSchema,
});

type aboutMeFormTypes = z.infer<typeof aboutMeSchema>;

const AboutMeFrom = React.forwardRef(function (
  {
    linksAndTech,
    userId,
    handleCloseForm,
  }: {
    linksAndTech: aboutMeFormProps | undefined;
    userId: string | undefined;
    handleCloseForm: () => void;
  },
  ref?: React.Ref<HTMLDivElement>
) {
  const [showColorBoard, setShowColorBoard] = useState(false);
  const { isEditting, editAboutMe } = useEditAboutMe();

  const defaultValues = {
    links:
      linksAndTech && linksAndTech.links ? JSON.parse(linksAndTech.links) : [],
    toolsAndTech:
      linksAndTech && linksAndTech.toolsAndTech
        ? JSON.parse(linksAndTech.toolsAndTech)
        : [],
    arrowType: linksAndTech?.arrowType || "none",
    arrowColor:
      linksAndTech && linksAndTech.arrowColor
        ? JSON.parse(linksAndTech.arrowColor)
        : defaultTextColor,
  };
  const form = useForm<aboutMeFormTypes>({
    mode: "onChange",
    resolver: zodResolver(aboutMeSchema),
    defaultValues,
  });

  const isEqual = useObjectCompare(form.getValues(), defaultValues);
  const chosenColor = Object.values(form.getValues().arrowColor).join(",");
  const isTools = form.getValues().toolsAndTech.length;
  const isArrowChosen = form.getValues().arrowType !== "none" && isTools;

  function onSubmit(values: aboutMeFormTypes) {
    editAboutMe(
      {
        ...values,
        arrowColor: JSON.stringify(values.arrowColor),
        links: JSON.stringify(values.links),
        toolsAndTech: JSON.stringify(values.toolsAndTech),

        userId: userId || "",
      },
      { onSuccess: handleCloseForm }
    );
  }

  return (
    <div ref={ref} className=" mt-14 show-tag space-y-4">
      <Heading Text="Socials & Tools" className=" font-semibold" />{" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="links"
            render={({ field }) => (
              <FormItem className="">
                <div className="space-y-0.5">
                  <FormLabel className="text-base ">Links</FormLabel>
                </div>
                <FormControl>
                  <TagsInput tags={field.value} onChange={field.onChange}>
                    <TagsInput.TagsContainer>
                      <TagsInput.TagsInputField placeholder="Enter links" />
                    </TagsInput.TagsContainer>
                  </TagsInput>
                </FormControl>
                <FormDescription>
                  Enter related links: Note (some links will not be shown due to
                  us not being able to find a related logo).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="toolsAndTech"
            render={({ field }) => (
              <FormItem className="">
                <div className="space-y-0.5">
                  <FormLabel className="text-base ">Tools</FormLabel>
                </div>
                <FormControl>
                  <TagsInput tags={field.value} onChange={field.onChange}>
                    <TagsInput.TagsContainer>
                      <TagsInput.TagsInputField />
                    </TagsInput.TagsContainer>
                  </TagsInput>
                  {/* <TagsInput tags={field.value} onChange={field.onChange} /> */}
                </FormControl>
                <FormDescription>
                  Enter the tools and technology you use in your work.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" flex flex-col gap-y-8 lg:flex-row gap-3">
            <FormField
              control={form.control}
              name="arrowType"
              render={({ field }) => (
                <FormItem
                  className={`flex flex-col xs:flex-row items-center justify-between rounded-lg border transition-all duration-500  w-full  p-4 ${
                    isTools
                      ? "opacity-1 visible z-auto relative "
                      : "opacity-0 invisible  z-[-55] absolute"
                  }`}
                >
                  <div className="space-y-0.5 text-center xs:text-left">
                    <FormLabel className="text-base ">Arrow Shape</FormLabel>
                    <FormDescription>
                      Choose the shape of the arrow.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        style={{
                          color: `${
                            field.value === "none" ? "" : `rgba(${chosenColor})`
                          } `,
                        }}
                        className=" w-full xs:w-[180px] text-foreground "
                      >
                        <SelectValue placeholder="Arrow shape" />
                      </SelectTrigger>
                      <SelectContent
                        className={`max-h-[250px] ${
                          chosenColor && `text-[rgba(${chosenColor})]`
                        }`}
                      >
                        {options.map((option, index) => (
                          <SelectItem
                            style={{
                              color: `${
                                field.value === "none"
                                  ? ""
                                  : `rgba(${chosenColor})`
                              } `,
                            }}
                            key={index}
                            value={option.value}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="arrowColor"
              render={({ field }) => (
                <FormItem
                  // style={{ transition: "opacity .5s ease" }}
                  className={`flex flex-col  xs:flex-row items-center w-full justify-between rounded-lg border p-4 transition-all duration-500  ${
                    isArrowChosen
                      ? "opacity-1 visible z-auto relative "
                      : "opacity-0 invisible  z-[-55] absolute"
                  }`}
                >
                  <div className="space-y-0.5 text-center xs:text-left">
                    <FormLabel className="text-base ">Arrow Color</FormLabel>
                    <FormDescription>
                      Choose what color the arrow should be.
                    </FormDescription>
                  </div>
                  <ClickAwayListener
                    onClickAway={() => setShowColorBoard(false)}
                  >
                    <FormControl>
                      <div className=" relative w-full xs:w-fit">
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setShowColorBoard((is) => !is)}
                          style={{ backgroundColor: `rgb(${chosenColor})` }}
                          className="mt-1  p-0 w-full h-10 xs:w-7 xs:h-7 duration-75 border-2"
                        >
                          {" "}
                          {/* {
                          options.find(
                            (el) => el.value === form.getValues().arrowType
                          )?.label
                        } */}
                        </Button>

                        <SliderPicker
                          color={field.value}
                          onChange={(color) => {
                            field.onChange(color.rgb);
                            // console.log(color.rgb);
                          }}
                          className={` absolute center-abslute-x px-3 py-2 w-[300px] bg-white  duration-150  ${
                            showColorBoard
                              ? "opacity-1 visible"
                              : "opacity-0 invisible"
                          }`}
                        />
                      </div>
                    </FormControl>
                  </ClickAwayListener>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <AboutMePreview
            color={chosenColor}
            tools={form.getValues().toolsAndTech}
            arrow={
              form.getValues().arrowType !== "none"
                ? options.find((el) => el.value === form.getValues().arrowType)
                    ?.label || <span></span>
                : null
            }
          />

          <FormButtons
            submitDisabled={isEqual || isEditting}
            cancelDisabled={isEditting}
            cancelButtonOnClick={() => {
              form.reset();
              handleCloseForm();
            }}
          />
          {/* <Button type="submit">Submit</Button> */}
        </form>
      </Form>
    </div>
  );
});

export default AboutMeFrom;
