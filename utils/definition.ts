export interface Disturbance {
  date: string
  description: string
  duration: number
}
export type TUser = {
  id: string
  name: string
  email: string
  password: string
}
export type AuthUser = {
  token: string
  user: TUser
}

export type TLogin = {
  email: string
  password: string
}

export type AuthResponse = {
  message: string
  data?: AuthUser
  success?: boolean
}
