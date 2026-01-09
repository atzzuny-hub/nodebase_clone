import { checkout, polar, portal} from '@polar-sh/better-auth'
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/db";
import { polarClient } from './polar';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword: { 
    enabled: true
  },
  plugins:[
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              // productId: "73cefe0c-e40a-4217-bf89-e9154bd780dc",
              productId: "7a1e0631-cf46-4c21-b553-f6c7abd59c6a",
              slug: "pro"
            }
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly:true
        }),
        portal(),
      ]
    })
  ]
});