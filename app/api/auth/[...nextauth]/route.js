import bcryptjs from 'bcryptjs'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from 'models/User'
import db from 'utils/db'

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id
        token.isAdmin = user?.isAdmin
        token.isActive = user?.isActive
        token.id = user.id
        // console.log('callbacks - jwt - user : ', user)
        // console.log('callbacks - jwt - token : ', token)
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id
        session.user.isAdmin = token?.isAdmin
        session.user.isActive = token?.isActive
        session.user.id = token.id
        // console.log('callbacks - session - token : ', token)
        // console.log('callbacks - session - session : ', session)
      }
      return session
    },
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials) {
        await db.connect()
        const user = await User.findOne({
          email: { $regex: credentials?.email, $options: 'i' },
        })
        await db.disconnect()
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            image: 'f',
          }
        }
        throw new Error('Invalid email or password')
      },
    }),
  ],
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
