("use client");
import * as React from "react";
import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormRow from "@/components/shared/FormRow";
import { Textarea } from "@/components/ui/textarea";
import MultipleFileUploader from "@/components/shared/MultipleFileUploader";
import useCreateProject from "./useCreateProject";
import { Project, User } from "@/types/types";
import useEditPost from "./useEditPost";
import { CgFileAdd } from "react-icons/cg";
import { FiLink } from "react-icons/fi";

import { AiTwotoneEdit } from "react-icons/ai";
import FullSnLoading from "@/components/shared/FullSnLoading";
import useObjectCompare from "@/hooks/useCompareObjects";
import ErrorComp from "@/components/shared/ErrorComp";
import FormDialog from "./FormDialog";
import { handleText } from "@/utils/helper";

const projectSchema = z.object({
  name: z.string().min(2).max(50),
  type: z
    .string()
    .min(6, { message: `password is too short` })
    .max(55, { message: `password is too long.` }),

  description: z.string().min(6, { message: `password is too short` }),
  technologies: z
    .string()
    .trim()
    .transform((string) =>
      string
        .split(",")
        .map((el) => el.trim())
        .filter((el) => el !== "")
        .join(",")
    ),
  links: z
    .object({
      description: z.string().min(4, {
        message: "Description is required and must be at least 4 characters.",
      }),
      url: z.string().min(4, {
        message: "URL is required and must be at least 4 characters.",
      }),
    })
    .array(),
  startDate: z.date(),
  endDate: z.date(),
  contributors: z.string(),

  projectImages: z.custom<File[]>(),
});

type projectSchemaTypes = z.infer<typeof projectSchema>;

const steps = ["Name & Date", "Links & contrbuters", "Description & Images"];

type FieldNames =
  | "name"
  | "type"
  | "description"
  | "technologies"
  | "links"
  | "startDate"
  | "endDate"
  | "contributors";
// | "projectImages";

const stepFields: Record<number, FieldNames[]> = {
  0: ["name", "type", "startDate", "endDate"],
  1: ["links"],
  2: ["description"],
};

const ProjectForm = ({
  user,
  post,
}: {
  user: User | undefined;
  post?: Project;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const imageLinks = post?.projectImages.map((imageObj) => imageObj.imageUrl);
  const viewedImages = imageLinks?.filter(
    (image) => !deletedImages.includes(image)
  );
  // const { user ,isLoading} = useAuth();
  const { isCreating, createProject, createError } = useCreateProject();
  const { isEditing, editPost, edittingError } = useEditPost();
  const formRef = useRef<HTMLFormElement>(null);

  const defaultValues = {
    name: post?.name || "",
    type: post?.type || "",
    startDate: post ? new Date(post.startDate) : undefined,
    endDate: post ? new Date(post.endDate) : undefined,
    technologies: post?.technologies || "",
    contributors: post?.contributors || "",
    links: post ? JSON.parse(post.links) : [],
    description: post?.description || "",
    projectImages: [],
  };
  const handleDeleteImage = React.useCallback((link: string) => {
    setDeletedImages((prevImages) => [...prevImages, link]);
  }, []);
  function handleDelteAllImgs() {
    setDeletedImages(imageLinks || []);
  }

  const form = useForm<projectSchemaTypes>({
    mode: "onChange",
    shouldUnregister: false,
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const isEqual = useObjectCompare(form.getValues(), defaultValues);

  // checkStep is a function that stops the user from clicking the next button while some fields are empty or has errors on it.
  function checkStep() {
    let isThereErrors;
    for (let i = 0; i < stepFields[activeStep].length; i++) {
      const fieldName = stepFields[activeStep][i];
      if (form.formState.errors[fieldName]) {
        isThereErrors = true;
        break;
      }
    }

    const fieldsPerStep = form.watch(stepFields[activeStep]);
    const isError = () => {
      // this code if for the validation of the links.
      if (activeStep === 1 && Array.isArray(fieldsPerStep[0])) {
        for (let i = 0; i < fieldsPerStep[0].length; i++) {
          const item = fieldsPerStep[0][i];
          if (item.description === "" || item.url === "") {
            return true;
          }
        }
      } else
        return fieldsPerStep.some(
          (field) => field === undefined || field === ""
        );
    };

    return isThereErrors || isError() ? true : false;
  }

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  // I wanted to put the submit button outside of the form componenet duo to style reasons, this function allows us to submit the form from outside the form it self.
  function submitButton() {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  }
  // (activeStep === 2 && isEqual) ||
  const handleNext = () => {
    if (checkStep()) form.trigger();

    if (!checkStep()) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function onSubmit(values: projectSchemaTypes) {
    if (post) {
      editPost({
        postToEdit: { ...values, links: JSON.stringify(values.links) },
        postId: post.id,
        imagesToDelete: deletedImages,
      });
    } else {
      console.log(typeof values.startDate);
      console.log(values.startDate);
      console.log(values);
      createProject({
        ...values,
        links: JSON.stringify(values.links),
        user_id: user?.id || "",
      });
    }
  }

  if (createError || edittingError)
    return (
      <ErrorComp message={createError?.message || edittingError?.message} />
    );
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1000px",
        // marginInline: "auto",
        // marginTop: "30px",
        margin: "auto",
      }}
    >
      {/*  TITLE. start */}
      {!post ? (
        <h1 className=" flex items-center  text-4xl mb-6 font-semibold">
          Create post <CgFileAdd className="pl-2" size={30} />
        </h1>
      ) : (
        <h1 className=" flex items-center  text-4xl mb-6 font-semibold">
          Edit post <AiTwotoneEdit className="pl-2" size={30} />
        </h1>
      )}
      {/*  TITLE. end */}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel className=" flex-col sm:flex-row" {...labelProps}>
                <span className="text-[10px] sm:text-base "> {label}</span>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          {/* <FullSnLoading className=" h-[46dvb]" /> */}
          {isCreating || isEditing ? (
            <div className=" h-[50dvb]">
              <FullSnLoading className=" h-full" />
            </div>
          ) : (
            <div className=" h-[47dvb]"></div>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button>Loading...</Button>
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </Box>
        </>
      ) : (
        <>
          <div>
            <div className="   mx-auto  overflow-y-auto h-[60dvb]  px-3">
              <Form {...form}>
                <form
                  ref={formRef}
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* {renderComponent()} */}

                  <div
                    className={`${
                      activeStep === 0 ? "block" : "hidden"
                    }    mt-5 space-y-4 pb-1`}
                  >
                    <FormRow className=" flex-col sm:flex-row sm:form-row justify-between  items-center">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isCreating || isEditing}
                                placeholder="Project's name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem className=" w-full">
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isCreating || isEditing}
                                placeholder="type"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormRow>

                    <FormRow className=" flex-col sm:flex-row sm:form-row justify-between  items-center">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className=" w-full">
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    disabled={isCreating || isEditing}
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !form.getValues().startDate &&
                                        "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {form.getValues().startDate ? (
                                      format(form.getValues().startDate, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={form.getValues().startDate}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className=" w-full">
                            <FormLabel>End date</FormLabel>
                            <FormControl>
                              <FormControl>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      disabled={isCreating || isEditing}
                                      variant={"outline"}
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !form.getValues().endDate &&
                                          "text-muted-foreground"
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {form.getValues().endDate ? (
                                        format(form.getValues().endDate, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={form.getValues().endDate}
                                      onSelect={field.onChange}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormRow>

                    <FormField
                      control={form.control}
                      name="technologies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tools used</FormLabel>
                          <FormControl>
                            <Textarea
                              disabled={isCreating || isEditing}
                              className=" h-[175px]"
                              placeholder="Tools used to create the project such as , React, typescript, etc..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div
                    className={`${
                      activeStep === 1 ? "  block" : " hidden"
                    }     mt-5 space-y-4 pb-2`}
                  >
                    {/* LINKS START */}
                    <div className="   space-y-5">
                      {!fields.length ? (
                        <div
                          onClick={() => append({ description: "", url: "" })}
                          className=" flex justify-center items-center  min-h-[140px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm   ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer gap-2  font-semibold tracking-wider"
                        >
                          Add Links <FiLink size={20} />
                        </div>
                      ) : (
                        fields.map((field, index) => (
                          <React.Fragment key={field.id}>
                            {index !== 0 && (
                              <div className=" my-5">
                                <div className="w-[90%] mx-auto h-[1px] bg-gray-300"></div>
                              </div>
                            )}

                            <div className=" flex flex-col sm:flex-row items-center gap-3 h-fit mt-10">
                              <FormField
                                control={form.control}
                                name={`links.${index}.description`}
                                render={({ field }) => (
                                  <FormItem className=" w-full sm:w-40">
                                    <FormLabel>What the URL for</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="React form hook"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Enter what the URL is for.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name={`links.${index}.url`}
                                render={({ field }) => (
                                  <FormItem className=" w-full  sm:flex-1">
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="https://www.react-hook-form.com/api/usefieldarray/"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Enter the URL.
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <Button
                                type="button"
                                variant="secondary"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </Button>
                            </div>
                          </React.Fragment>
                        ))
                      )}
                      <div>
                        <FormDescription className="  font-semibold text-xs text-green-500 pr-6">
                          Enter any post-related links below. To display a
                          preview link on the post, type 'preview' in the "What
                          the URL for" field and enter 'your link' in the URL
                          field. <FormDialog />
                        </FormDescription>
                        <Button
                          className=" float-right my-2"
                          type="button"
                          onClick={() => append({ description: "", url: "" })}
                        >
                          Add a link
                        </Button>
                      </div>
                    </div>
                    {/* LINKS END */}
                    <FormField
                      control={form.control}
                      name="contributors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contributors</FormLabel>
                          <FormControl>
                            <Textarea
                              disabled={isCreating || isEditing}
                              className=" h-[140px]"
                              placeholder="Name or links of people have helped or contributed in creating this project."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div
                    className={`${
                      activeStep === 2 ? "block" : "hidden"
                    }    mt-5 space-y-4`}
                  >
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              className=" h-[140px]"
                              disabled={isCreating || isEditing}
                              placeholder="Talk about the project."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="projectImages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Post images</FormLabel>
                          <FormControl>
                            <MultipleFileUploader
                              fieldChange={field.onChange}
                              handleDeleteImage={handleDeleteImage}
                              handleDeleteAllImages={handleDelteAllImgs}
                              mediaUrl={viewedImages}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <Box
            sx={{ display: "flex", flexDirection: "row", pt: 2, gap: "10px" }}
          >
            <Button
              color="inherit"
              disabled={activeStep === 0 || isCreating || isEditing}
              onClick={handleBack}
              // sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {/* {isStepOptional(activeStep) && (
              <Button
                disabled={isCreating || isEditing}
                color="inherit"
                onClick={handleSkip}
                //  sx={{ mr: 1 }}
              >
                Skip
              </Button>
            )} */}
            <Button
              className="  disabled:cursor-not-allowed"
              disabled={
                deletedImages.length
                  ? false
                  : (activeStep === 2 && isEqual) ||
                    checkStep() ||
                    isCreating ||
                    isEditing
              }
              onClick={() => {
                activeStep === 2 && submitButton();
                handleNext();
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProjectForm;

// const renderComponent = () => {
//   switch (activeStep) {
//     case 0:
//       return (
//         <>
//           <FormRow className=" justify-between">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Project's name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="type"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Type</FormLabel>
//                   <FormControl>
//                     <Input placeholder="type" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </FormRow>

//           <FormRow className=" justify-between">
//             <FormField
//               control={form.control}
//               name="startDate"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Start Date</FormLabel>
//                   <FormControl>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <Button
//                           variant={"outline"}
//                           className={cn(
//                             "w-full justify-start text-left font-normal",
//                             !form.getValues().startDate &&
//                               "text-muted-foreground"
//                           )}
//                         >
//                           <CalendarIcon className="mr-2 h-4 w-4" />
//                           {form.getValues().startDate ? (
//                             format(form.getValues().startDate, "PPP")
//                           ) : (
//                             <span>Pick a date</span>
//                           )}
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={form.getValues().startDate}
//                           onSelect={field.onChange}
//                           initialFocus
//                         />
//                       </PopoverContent>
//                     </Popover>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="endDate"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>End date</FormLabel>
//                   <FormControl>
//                     <FormControl>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant={"outline"}
//                             className={cn(
//                               "w-full justify-start text-left font-normal",
//                               !form.getValues().endDate &&
//                                 "text-muted-foreground"
//                             )}
//                           >
//                             <CalendarIcon className="mr-2 h-4 w-4" />
//                             {form.getValues().endDate ? (
//                               format(form.getValues().endDate, "PPP")
//                             ) : (
//                               <span>Pick a date</span>
//                             )}
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0" align="start">
//                           <Calendar
//                             mode="single"
//                             selected={form.getValues().endDate}
//                             onSelect={field.onChange}
//                             initialFocus
//                           />
//                         </PopoverContent>
//                       </Popover>
//                     </FormControl>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </FormRow>

//           <FormField
//             control={form.control}
//             name="technologies"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Technologies</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     className=" h-[150px]"
//                     placeholder="React, typescript, etc..."
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </>
//       );

//     case 1:
//       return (
//         <>
//           <FormField
//             control={form.control}
//             name="links"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Links</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     className=" h-[150px]"
//                     placeholder="Links"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="contributors"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Contributors</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     className=" h-[150px]"
//                     placeholder="React, typescript, etc..."
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </>
//       );
//     case 2:
//       return (
//         <>
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="React, typescript, etc..."
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="projectImages"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Profile image</FormLabel>
//                 <FormControl>
//                   <MultipleFileUploader fieldChange={field.onChange} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </>
//       );
//   }
// };
