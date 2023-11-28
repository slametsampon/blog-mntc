'use server'

import { signIn } from '@/auth'

export async function authenticate(prevState: string | undefined, formData: FormData) {
  console.log('formData : ', formData)
  try {
    await signIn('credentials', Object.fromEntries(formData))
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialSignin'
    }
    throw error
  }
}
