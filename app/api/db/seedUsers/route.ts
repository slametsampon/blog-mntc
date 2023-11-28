import User from 'models/User'
import db from 'utils/db'
import metricsStatic from '@/data/metricsStatic'

export async function GET(request: Request) {
  await db.connect()
  await User.deleteMany()
  await User.insertMany(metricsStatic.users)
  await db.disconnect()
  return new Response('users seeded successfully')
}
