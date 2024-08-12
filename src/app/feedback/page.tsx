import { FeedbackForm } from "~/components/feedback-form";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center pt-20">
        <FeedbackForm />
      </main>
    </HydrateClient>
  );
}
