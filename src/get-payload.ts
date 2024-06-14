import type { InitOptions } from "payload/config";
import type { Payload } from "payload";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import path from "path";
import payload from "payload";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

//this will send our emails
const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY
  }
})

let cached = (global as any).payload;
if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayLoadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is missing");
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    cached.promise = payload.init({
      email:{
        transport: transporter,
        fromAddress: "onboarding@resend.dev", //this should allow you to send mails even if you don't have a domain
        fromName: "DigitalHippo",
      },
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
    return cached.client;  // Missing return statement

    
  } catch (error) {
    cached.promise = null;
    throw error;
  }
};
