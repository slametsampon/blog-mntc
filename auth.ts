import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import UserModel from './models/User'
import { User } from './utils/definition'
import db from './utils/db'

async function getUser(email: string): Promise<User | undefined> {
  try {
    await db.connect()
    const user = await UserModel.findOne({ email: email })
    await db.disconnect()
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email)
          console.log('user : ', user)
          if (!user) return null
          const passwordsMatch = await bcrypt.compare(password, user.password)
          console.log('passwordsMatch : ', passwordsMatch)

          if (passwordsMatch) {
            console.log('signin - user : ', user)
            return user
          }
        }

        console.log('Invalid credentials')
        return null
      },
    }),
  ],
})
