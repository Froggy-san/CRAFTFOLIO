// import { Tag, TagInput } from "emblor";
// import React from "react";
// ("use client");

// import { z } from "zod";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../ui/form";
// import { FormLabel } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// const FormSchema = z.object({
//   topics: z.array(
//     z.object({
//       id: z.string(),
//       text: z.string(),
//     })
//   ),
// });
// const TagsInputTwo = () => {
//   const [tags, setTags] = React.useState<Tag[]>([]);
//   const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
//     null
//   );
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       topics: [],
//     },
//   });

//   return <Form>
//     <form>

//   <FormField
//     control={...}
//     name="..."
//     render={() => (
//       <FormItem>
//         <FormLabel />
//         <FormControl>
//         <TagInput
//     {...field}
//     placeholder="Enter a topic"
//     tags={tags}
//     setTags={(newTags) => {
//       setTags(newTags);
//       setValue("topics", newTags as [Tag, ...Tag[]]);
//     }}
//     activeTagIndex={activeTagIndex}
//     setActiveTagIndex={setActiveTagIndex}
//   />;
//         </FormControl>
//         <FormDescription/>
//         <FormMessage />
//       </FormItem>
//     )}
//   />
//       </form>
// </Form>

// };

// export default TagsInputTwo;
