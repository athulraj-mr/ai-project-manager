import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import { prisma } from "@/lib/prisma"
import { loginSchema } from "@/lib/validations/auth"

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const parsed =
          loginSchema.safeParse(credentials)

        if (!parsed.success) {
          return null
        }

        const { email, password } =
          parsed.data

        const user =
          await prisma.user.findUnique({
            where: {
              email,
            },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
            },
          })

        if (!user) {
          return null
        }

        const validPassword =
          await bcrypt.compare(
            password,
            user.password
          )

        if (!validPassword) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }

      return session
    },
  },
})