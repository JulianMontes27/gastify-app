import { z } from "zod";

import client from "@/lib/honoRPCClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CiCircleCheck } from "react-icons/ci";

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
import { newPostSchema } from "../../../../server/routes/schemas";

const NewExpense = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof newPostSchema>>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      title: "",
      amount: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof newPostSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await client.api.expenses.$post({
        json: {
          title: values.title,
          amount: values.amount,
        },
      });
    } catch (error) {
      throw new Error("Post error");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col items-center justify-center m-auto w-full max-w-lg text-center gap-0"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg ">Add a new expense</FormLabel>
              <FormControl>
                <Input placeholder="Title" required {...field} />
              </FormControl>
              <FormDescription>
                Give your expense a unique title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="$"
                  required
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormDescription>The amount of the expense.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row w-full items-center justify-center">
          <Button disabled={form.formState.isSubmitting} type="submit">
            Create new expense
          </Button>
          {form.formState.isSubmitSuccessful && (
            <CiCircleCheck size={20} className="" />
          )}
        </div>
      </form>
    </Form>
  );
};

export default NewExpense;
