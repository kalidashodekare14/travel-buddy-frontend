import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

declare module "next-auth" {
  interface User {
    avatar?: string | null
  }
  interface Session {
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

        const user = await res.json()
        return {
          id: user.id ?? user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar ?? null,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!
        token.avatar = user.avatar
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.avatar = token.avatar ?? null
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
