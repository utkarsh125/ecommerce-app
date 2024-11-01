import * as trpcExpress from "@trpc/server/adapters/express";

import { nextApp, nextHandler } from "./next-utils";

import { appRouter } from "./trpc";
import express from "express";
import { getPayloadClient } from "./get-payload";
import { inferAsyncReturnType } from "@trpc/server";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>

const start = async () => {
  //startup admin dashboard

  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL}`);
      },
    },
  });

  app.use(
    "/api/trpc/",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use((req, res) => nextHandler(req, res)); //FORWARD IT TO NEXTJS
  //COMPLETELY INDEPENDENT OF VERCEL PLATFORM

  nextApp.prepare().then(() => {
    payload.logger.info('Next.js Started');
    app.listen(PORT, async () => {
      payload.logger.info(
          `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}` //
      )
    });
  });
};

start();
