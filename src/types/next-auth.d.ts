import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      organizationId: string
      organizationSlug: string
      organizationName: string
    } & DefaultSession["user"]
  }
}
