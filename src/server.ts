import { nextApp, nextHandler } from "./next-utils"

import express from "express"
import { getPayLoadClient } from "./get-payload"

const app = express()
const PORT = Number(process.env.PORT) || 3000

const start = async() => {
    //startup admin dashboard

    const payload = await getPayLoadClient({
        initOptions: {
            express: app,
            onInit: async (cms) => {
                cms.logger.info(`Admin URL ${cms.getAdminURL}`);
            }
        }
    })

    app.use((req, res) => nextHandler(req,res)) //FORWARD IT TO NEXTJS
    //COMPLETELY INDEPENDENT OF VERCEL PLATFORM

    nextApp.prepare().then(() => {
        // payload.logger.info('Next.js Started');
        app.listen(PORT, async() => {
        // payload.logger.info(
        //     `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}` //
        // )
    })
    })

    
    
}

start()