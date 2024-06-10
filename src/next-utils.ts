import next from "next";

const PORT = Number(process.env.PORT) || 3000;
export const nextApp = next({
    dev: process.env.NODE_ENV !== "production",
    port: PORT,
})

export const nextHandler = nextApp.getRequestHandler(); 
//THIS WILL ALLOW US TO SELF-HOST THIS PROJECT