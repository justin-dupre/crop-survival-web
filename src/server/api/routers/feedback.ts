import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const feedbackRouter = createTRPCRouter({
  createAnonymous: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.feedback.create({
        data: {
          feedback: input.name
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const latestFeedback = await ctx.db.feedback.findFirst({
      orderBy: { createdAt: "desc" },
    });
    return latestFeedback;
  }),

  getAllFeedback: publicProcedure.query(async ({ ctx }) => {
    const feedback = await ctx.db.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });
    return feedback;
  }),
});
