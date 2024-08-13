import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { Feedback } from "@prisma/client";


export default async function FeedbackDialog({
  feedback, children,
}: Readonly<{ children: React.ReactNode, feedback: Feedback }>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
       {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Created on {feedback.createdAt.toLocaleDateString('en')}</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid gap-4 py-4">
            {feedback.feedback}
        </div>
      </DialogContent>
    </Dialog>
  );
}
