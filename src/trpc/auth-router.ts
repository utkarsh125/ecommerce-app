import { publicProcedure, router } from "./trpc";

import { AuthCredentialsValidator } from "../lib/validators/account-credentials.validator";
import { TRPCError } from "@trpc/server";
import { getPayLoadClient } from "../get-payload";

export const authRouter = router({
    createPayloadUser: publicProcedure.input(AuthCredentialsValidator).mutation(async ({input}) => {
        //access to the email and password
        const {email, password} = input;
        const payload = await getPayLoadClient()

        //check if user already exists
        const {docs: users} = await payload.find({
            collection: "users",
            where: {
                email: {
                    equals: email,
                }
            }
        })

        if(users.length !== 0){//length of user>0 --->user exists
            throw new TRPCError({code: 'CONFLICT'})
        }

        await payload.create({
            collection: "users",
            data: {
                //create new user
                email, 
                password,
                role: 'user',
            },
        })

        return {success: true, sentToEmail: email}
    })
 })