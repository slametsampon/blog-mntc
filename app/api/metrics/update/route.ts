import Disturbance from '@/models/Disturbance'
import db from '@/utils/db'
import { getError } from '@/utils/error'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const yearStr = searchParams.get('yearStr')
  await db.connect()
  const existingData = await Disturbance.find({
    dateStr: { $regex: yearStr },
  }).exec()
  const dataJson = JSON.parse(JSON.stringify(existingData))
  console.log('Update-GET-dataJson : ', dataJson)
  await db.disconnect()
  return new Response(JSON.stringify(dataJson))
}

export async function POST(request: Request) {
  const req = await request.json()
  console.log('POST')
  console.log('request.json() : ', req)
  const item = { dateStr: req.dateStr, description: req.description, duration: req.duration }
  try {
    await db.connect()
    await Disturbance.insertMany(item)
    await db.disconnect()
  } catch (error) {
    console.log('addDisturbanceItem-error : ', getError(error))
  }
  return new Response(JSON.stringify({ message: 'POST' }))
}

export async function PUT(request: Request) {
  const req = await request.json()
  console.log('PUT')
  console.log('request.json() : ', req)
  const filter = { _id: req.id }
  const update = { dateStr: req.dateStr, description: req.description, duration: req.duration }
  try {
    await db.connect()
    await Disturbance.findByIdAndUpdate(filter, update, {
      new: true,
    })
    await db.disconnect()
    console.log('saveEditDisturbanceItem-successful-update : ', update)
  } catch (error) {
    console.log('saveEditDisturbanceItem-error : ', getError(error))
  }
  return new Response(JSON.stringify({ message: 'PUT' }))
}

export async function DELETE(request: Request) {
  const req = await request.json()
  console.log('DELETE')
  console.log('request.json() : ', req)
  const filter = { _id: req.id }
  try {
    await db.connect()
    await Disturbance.deleteOne(filter)
    await db.disconnect()
  } catch (error) {
    console.log('saveEditDisturbanceItem-error : ', getError(error))
  }
  return new Response(JSON.stringify({ message: 'DELETE' }))
}
