import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

declare module "next-auth" {
  interface User {
    avatar?: string | null
    accessToken?: string
  }
  interface Session {
    accessToken?: string
    user: {
      id: string
      name: string
      email: string
      avatar?: string | null
    }
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string
    avatar?: string | null
    accessToken?: string
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        if (!res.ok) return null

        const data = await res.json()
        return {
          id: data.user?.id ?? data.id ?? data._id,
          name: data.user?.name ?? data.name,
          email: data.user?.email ?? data.email,
          avatar: data.user?.avatar ?? data.avatar ?? null,
          accessToken: data.token ?? data.accessToken,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!
        token.avatar = user.avatar
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.avatar = token.avatar ?? null
      session.accessToken = token.accessToken
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
