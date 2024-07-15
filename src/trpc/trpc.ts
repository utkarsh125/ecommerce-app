import { ExpressContext } from "@/server";
import { initTRPC } from "@trpc/server";

//serve the purpose of giving router
// const t = initTRPC.context().create()
const t = initTRPC.context<ExpressContext>().create()

export const router = t.router

export const publicProcedure = t.procedure