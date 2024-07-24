import { Media } from "./collections/Products/Media";
import { Products } from "./collections/Products/Products";
import { Users } from "./collections/Users";
import { buildConfig } from "payload/config";
import dotenv from "dotenv";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import path from "path";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
})
export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || ``,
  collections: [Users, Products, Media], //Products and users
  routes: {
    admin: "/sell",
  },
  admin: {
    user: "users",//this will target the collection we want will not produce slug duplicate error.
    bundler: webpackBundler(),
    meta: {
        titleSuffix: "- DigitalHippo",
        favicon: "/favicon.ico",
        ogImage: "/thumbnail.jpg"
    }
  },

  rateLimit: {
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!, //exclamation mark to tell typescript that this value definitely exists
  }),

  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts")
,  }
});
