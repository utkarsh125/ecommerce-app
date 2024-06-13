import { appRouter } from "@/trpc";
//handle the /api/trpc request from `server.ts`
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: request) => {
  //handle the request
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  });
};


export { handler as GET, handler as POST};