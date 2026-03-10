import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { neon } from "@neondatabase/serverless"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
        slug: { label: "Organização", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials?.slug) {
          return null
        }

        try {
          const sql = neon(process.env.DATABASE_URL!)

          const orgs = await sql`
            SELECT * FROM "Organization" 
            WHERE slug = ${credentials.slug} 
            AND active = true 
            LIMIT 1
          `

          if (!orgs.length) return null
          const org = orgs[0]

          const users = await sql`
            SELECT * FROM "User" 
            WHERE email = ${credentials.email} 
            AND "organizationId" = ${org.id} 
            AND active = true 
            LIMIT 1
          `

          if (!users.length) return null
          const user = users[0]

          const validPassword = await bcrypt.compare(credentials.password, user.password)
          if (!validPassword) return null

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            organizationId: org.id,
            organizationSlug: org.slug,
            organizationName: org.name,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.organizationId = (user as any).organizationId
        token.organizationSlug = (user as any).organizationSlug
        token.organizationName = (user as any).organizationName
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.organizationId = token.organizationId as string
        session.user.organizationSlug = token.organizationSlug as string
        session.user.organizationName = token.organizationName as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
}

export default NextAuth(authOptions)