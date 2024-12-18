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
import Typography from "@mui/material/Typography";
import FormRow from "@/components/shared/FormRow";
import { Textarea } from "@/components/ui/textarea";
import MultipleFileUploader from "@/components/shared/MultipleFileUploader/MultipleFileUploader";
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
import TagsInput from "@/components/shared/TagsInputRewrite";
import ContributorsTags from "./contribuorsInputField/ContributorsTags";
import { projectFormSchema } from "@/formScehmas/projectFormSchema";
import { AnimatePresence, motion } from "framer-motion";
import TooltipComp from "@/components/shared/TooltipComp";
// import TagsInput from "@/components/shared/TagsInput";

type projectSchemaTypes = z.infer<typeof projectFormSchema>;

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

  const { isCreating, createProject, createError } = useCreateProject();
  const { isEditing, editPost, edittingError } = useEditPost();

  const imageLinks = post?.projectImages.map((imageObj) => imageObj.imageUrl);
  const viewedImages = imageLinks?.filter(
    (image) => !deletedImages.includes(image),
  );

  const formRef = useRef<HTMLFormElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  function scrollTopOfElemnt() {
    if (formContainerRef.current) formContainerRef.current.scrollTop = 0;
  }

  const defaultValues = {
    name: post?.name || "",
    type: post?.type || "",
    startDate: post ? new Date(post.startDate) : new Date(),
    endDate: post ? new Date(post.endDate) : undefined,
    technologies:
      post && post.technologies ? JSON.parse(post.technologies) : [],
    contributors:
      post && post.contributors ? JSON.parse(post.contributors) : [],
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
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const isEqual = useObjectCompare(form.getValues(), defaultValues);

  // checkStepErrors is a function that stops the user from clicking the next button while some fields are empty or has errors on it.
  function checkStepErrors() {
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
          const item = fieldsPerStep[0][i] as {
            description: string;
            url: string;
          };
          if (item.description === "" || item.url === "") {
            return true;
          }
        }
      } else
        return fieldsPerStep.some(
          (field) => field === undefined || field === "",
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

  // I wanted to put the submit button outside the form componenet duo to style reasons, this function allows us to submit the form from outside the form it self.
  function submitButton() {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }
  }
  // (activeStep === 2 && isEqual) ||
  const handleNext = () => {
    if (checkStepErrors()) form.trigger();

    if (!checkStepErrors()) {
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
        postToEdit: {
          ...values,
          links: JSON.stringify(values.links),
          technologies: JSON.stringify(values.technologies),
          contributors: JSON.stringify(values.contributors),
        },

        postId: post.id,
        imagesToDelete: deletedImages,
        userId: user?.id || "",
      });
    } else {
      createProject({
        ...values,
        links: JSON.stringify(values.links),
        technologies: JSON.stringify(values.technologies),
        contributors: JSON.stringify(values.contributors),
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
        display: "flex",
        flexDirection: "column",
        gap: "",
        height: "98%",
        // marginInline: "auto",
        // marginTop: "30px",
        margin: "auto",
        "@media (min-width: 550px)": {
          height: "76dvh", // Adjust height based on content
        },
      }}
    >
      {/*  TITLE. start */}
      {!post ? (
        <h1 className="mb-6 flex items-center text-4xl font-semibold">
          Create post <CgFileAdd className="pl-2" size={30} />
        </h1>
      ) : (
        <h1 className="mb-6 flex items-center text-4xl font-semibold">
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
            <Step key={label} {...stepProps} className="">
              <StepLabel className="flex-col sm:flex-row" {...labelProps}>
                <span className="text-[10px] text-foreground sm:text-base">
                  {" "}
                  {label}
                </span>
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
            <div className="h-[50dvb]">
              <FullSnLoading className="h-full" />
            </div>
          ) : (
            <div className="h-[47dvb]"></div>
          )}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button>Loading...</Button>
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </Box>
        </>
      ) : (
        <>
          <div
            ref={formContainerRef}
            className="flex h-full w-full overflow-y-auto px-2"
          >
            <Form {...form}>
              <motion.form
                ref={formRef}
                onSubmit={form.handleSubmit(onSubmit)}
                className="h-fit w-full space-y-8"
              >
                {/* {renderComponent()} */}

                {/*                                                                      FIRST STEP                         */}
                {activeStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-5 space-y-4 pb-1`}
                  >
                    <FormRow className="sm:form-row flex-col items-center justify-between sm:flex-row">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="mb-auto w-full">
                            <FormLabel>
                              Name <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={isCreating || isEditing}
                                placeholder="Project's name"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Enter a name for your project.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem className="mb-auto w-full">
                            <FormLabel>
                              Type <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={isCreating || isEditing}
                                placeholder="type"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Specify the nature of your project. Examples: Web
                              development, graphic design, photography, etc.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormRow>

                    <FormRow className="sm:form-row flex-col items-center justify-between sm:flex-row">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="mb-auto w-full">
                            <FormLabel>
                              Start Date{" "}
                              <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    disabled={isCreating || isEditing}
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !form.getValues().startDate &&
                                        "text-muted-foreground",
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
                            <FormDescription>
                              When did you start working on this project?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="mb-auto w-full">
                            <FormLabel>
                              End date{" "}
                              <span className="text-destructive">*</span>
                            </FormLabel>
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
                                          "text-muted-foreground",
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
                            <FormDescription>
                              When did you complete this project?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </FormRow>

                    <FormField
                      control={form.control}
                      name="technologies"
                      render={({ field }) => (
                        <FormItem className="mb-auto w-full">
                          <FormLabel>Tools used</FormLabel>
                          <FormControl>
                            <TagsInput
                              Tags={field.value}
                              onChange={field.onChange}
                            >
                              <div className="relative">
                                <TagsInput.TagsContainer className="m-0 items-start">
                                  <TagsInput.TagsInputField />
                                </TagsInput.TagsContainer>
                                <TagsInput.SendBtn
                                  size="sm"
                                  className="absolute right-3 top-[120%] h-9 w-9 p-0 text-lg"
                                />
                              </div>
                            </TagsInput>
                          </FormControl>
                          <FormDescription>
                            List any tools, software, equipment, or materials
                            used in this project.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}

                {/*                                                                      FIRST STEP                         */}
                {/*                                                                      SECOND STEP                         */}

                {activeStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-5 space-y-4 pb-2`}
                  >
                    {/* LINKS START */}
                    <div className="space-y-5">
                      <h1 className="cursor-default">Links</h1>

                      {!fields.length ? (
                        <div
                          onClick={() => append({ description: "", url: "" })}
                          className="flex min-h-[140px] w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-semibold tracking-wider ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Add Links <FiLink size={20} />
                        </div>
                      ) : (
                        <>
                          {fields.map((field, index) => (
                            <React.Fragment key={field.id}>
                              <AnimatePresence>
                                {index !== 0 && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="my-5"
                                  >
                                    <div className="mx-auto h-[1px] w-[90%] bg-gray-300"></div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <motion.div
                                // layout
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 25 }}
                                className="mt-10 flex h-fit flex-col items-center gap-3 sm:flex-row"
                              >
                                <FormField
                                  control={form.control}
                                  name={`links.${index}.description`}
                                  render={({ field }) => (
                                    <FormItem className="mb-auto w-full sm:w-40">
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
                                    <FormItem className="mb-auto w-full sm:flex-1">
                                      <FormLabel>URL</FormLabel>
                                      <FormControl>
                                        <Input
                                          type="url"
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
                              </motion.div>
                            </React.Fragment>
                          ))}
                        </>
                      )}
                      <div className=" ">
                        <FormDescription className="text-xs font-semibold">
                          <Button
                            className="my-2 w-full"
                            type="button"
                            onClick={() => append({ description: "", url: "" })}
                          >
                            Add a link
                          </Button>
                          Enter any post-related links. To display a preview
                          link on the post, type 'preview' in the "What the URL
                          for" field and enter 'your link' in the URL field.{" "}
                          <FormDialog />
                        </FormDescription>
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
                            <ContributorsTags
                              contrbiutersTag={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormDescription>
                            Search for an existing users or add new ones.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                )}
                {/*                                                                      SECOND STEP                         */}
                {/*                                                                      THIRD STEP                         */}
                {/*Note that the display of this component differs from the other two above due to how we handle image states in the multipleFileUploader component. If you examine the component, you'll see that uploaded files are managed solely within the component itself; we don't retrieve them from the form state. Consequently, when a user drags and drops files and then navigates to another page (like page 2), the component unmounts, leading to the loss of the previously uploaded data. To address this, we chose to keep the component associated with step 2 rendered continuously, preserving its state. Alternatively, we could pass the image state from the useForm hook state. */}
                <motion.div
                  variants={{
                    hide: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 },
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={activeStep === 2 ? "show" : "hide"}
                  className={`mt-5 space-y-4 ${activeStep === 2 ? "block" : "hidden"}`}
                >
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Description{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            className="h-[133px]"
                            disabled={isCreating || isEditing}
                            placeholder="Talk about the project."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Describe the goals, process, and outcome of your
                          project.
                        </FormDescription>
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
                </motion.div>

                {/*                                                                      THIRD STEP                         */}
              </motion.form>
            </Form>
          </div>

          <Box
            sx={{ display: "flex", flexDirection: "row", pt: 2, gap: "10px" }}
          >
            <Button
              color="inherit"
              size="sm"
              disabled={activeStep === 0 || isCreating || isEditing}
              onClick={() => {
                handleBack();
                scrollTopOfElemnt();
              }}
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
            {/*  
              deletedImages.length
                  ? false
                  : */}

            {(activeStep === 2 && isEqual && !deletedImages.length) ||
            checkStepErrors() ? (
              <TooltipComp
                toolTipText={
                  activeStep === 2 && isEqual
                    ? "No changes has been made."
                    : "Check for errors or empty & required fields"
                }
              >
                <Button
                  className="disabled:pointer-events-auto"
                  size="sm"
                  disabled
                  onClick={() => {
                    activeStep === 2 && submitButton();
                    handleNext();
                    scrollTopOfElemnt();
                  }}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </TooltipComp>
            ) : (
              <Button
                className="disabled:cursor-not-allowed"
                size="sm"
                disabled={
                  (activeStep === 2 && isEqual && !deletedImages.length) ||
                  checkStepErrors() ||
                  isCreating ||
                  isEditing
                }
                onClick={() => {
                  activeStep === 2 && submitButton();
                  handleNext();
                  scrollTopOfElemnt();
                }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            )}
            {/* <Button
              className="  disabled:cursor-not-allowed"
              size="sm"
              disabled={
                (activeStep === 2 && isEqual && !deletedImages.length) ||
                checkStepErrors() ||
                isCreating ||
                isEditing
              }
              onClick={() => {
                activeStep === 2 && submitButton();
                handleNext();
                scrollTopOfElemnt();
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button> */}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProjectForm;
