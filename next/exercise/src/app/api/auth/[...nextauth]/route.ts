import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.username) {
          return null
        }

        try {
          // 查找用户
          const user = await prisma.users.findFirst({
            where: {
              login: credentials.username
            }
          })

          if (!user) {
            return null
          }

          // 返回用户信息
          return {
            id: user.id.toString(),
            name: user.nickname || user.login,
            email: user.login // 使用login作为email
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/user/simulate'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name as string
      }
      return session
    }
  },
  session: {
    strategy: 'jwt'
  }
})

export { handler as GET, handler as POST }