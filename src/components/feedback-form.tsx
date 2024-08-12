"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/trpc/react";
import { useToast } from "~/components/ui/use-toast";

const formSchema = z.object({
  feedback: z.string().min(2).max(300),
});

export function FeedbackForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
    },
  });

  const createFeedback = api.feedback.createAnonymous.useMutation({
    onSuccess: async () => {
      await utils.feedback.invalidate();
      toast({
        title: 'Feedback submitted!',
        description: 'Thank you!'
      })
      form.resetField('feedback');
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values.feedback);
    createFeedback.mutate({ name: values.feedback });
  }

  const utils = api.useUtils();


  // const [latestFeedback] = api.feedback.getLatest.useSuspenseQuery();






  return (
    <div className="w-[80vw] md:w-[70vw]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feedback</FormLabel>
                <FormControl>
                  <Textarea

                    placeholder="Please enter your feedback on Crop Survival"
                    {...field}
                    className="h-[50vh]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={!form.getValues('feedback')}>Submit</Button>
        </form>
      </Form>
    </div>
  );
}
