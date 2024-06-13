import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    //example
    anyApiRoute: publicProcedure.query(() => {
        return "hello"
    })
})

export type AppRouter = typeof appRouter