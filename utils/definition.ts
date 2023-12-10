import { Date } from 'mongoose'

export type TUser = {
  id: string
  name: string
  email: string
  password: string
  isActive?: boolean
  isAdmin?: boolean
  levelId?: number
  jointDate?: Date
  updated?: Date
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
export type TDisturbance = {
  dateStr: string
  description: string
  duration: number
}

export type TReliabilityYear = {
  year: number
  day: number
  schSdDay: number
  unschSdDay: number
  sdDay: number
  operationDay: number
  operationTargetHour: number
  operationActualHour: number
  operationPercentageHour: number
}

export type TReliability = {
  month: number[]
  monthDay: number[]
  monthTargetDay: number[]
  monthTargetHrs: number[]
  monthActualHrs: number[]
  percentageHour: number[]
  percentageDay: number[]
}

export type TOpex = {
  month: number[]
  monthBudget: number[]
  monthActual: number[]
  percentage: number[]
}
export type TCapex = {
  month: number[]
  monthBudget: number[]
  monthActual: number[]
  percentage: number[]
}
