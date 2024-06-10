import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";

type FormValues = {
  users: { name: string; age: number }[];
};

// Component for adding links
const LinksForm: React.FC = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      users: [{ name: "John", age: 30 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <Controller
            control={control}
            name={`users.${index}.name`}
            render={({ field }) => <input {...field} />}
          />
          <Controller
            control={control}
            name={`users.${index}.age`}
            render={({ field }) => <input type="number" {...field} />}
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: "", age: 0 })}>
        Append
      </button>
      <input type="submit" />
    </form>
  );
};

export default LinksForm;
