export const dynamic = 'force-dynamic'

import { getCurrentUser } from "~/lib/session";
import { HydrateClient, api } from "~/trpc/server";
import { redirect } from "next/navigation";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";

export default async function AllFeedbackPage() {
  const user = await getCurrentUser();
  if (!user?.admin) {
    redirect("/");
  }

  const feedback = await api.feedback.getAllFeedback();

  return (
    <HydrateClient>

        <Table>
          <TableCaption>Hopefully the feedback is good.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Feedback</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedback.map((fb) => (
              <TableRow key={fb.id}>
                <TableCell className="font-medium">
                  {fb.id}
                </TableCell>
                <TableCell className="font-medium">
                  {fb.createdAt.toLocaleDateString('en-US')}
                </TableCell>
                <TableCell>{fb.feedback}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </HydrateClient>
  );
}
