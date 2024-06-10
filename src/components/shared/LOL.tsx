("use client");
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
import { Input } from "@/components/ui/input";

// Define the schema for a single link object using Zod
const linkSchema = z.object({
  des: z.string().min(4, {
    message: "Description is required and must be at least 4 characters.",
  }),
  url: z
    .string()
    .min(4, { message: "URL is required and must be at least 4 characters." }),
});

// Define the schema for the form which includes an array of links
const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username is required and must be at least 2 characters.",
    })
    .max(50, { message: "Username must be less than 50 characters." }),
  links: linkSchema.array(),
});
const LOL = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((field, index) => (
          <div key={field.id} className=" flex items-center gap-3">
            <FormField
              control={form.control}
              name={`links.${index}.des`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>for</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`links.${index}.url`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>url</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={() => append({ des: "", url: "" })}>
          Add a link
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LOL;

/*
 <FormField
                      control={form.control}
                      name="links"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Links</FormLabel>
                          <FormControl>
                            <Textarea
                              disabled={isCreating || isEditing}
                              className=" h-[140px]"
                              placeholder="preview: link1, link2, link3, etc..."
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="  font-semibold text-xs text-green-500">
                            Enter any post-related links below. Please separate
                            them with a comma (","). To display a preview link
                            on the post, type 'preview: "your link"' (replace
                            'your link' with the actual URL). <FormDialog />
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />


                    */
