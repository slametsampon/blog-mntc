import PlanSD from '@/models/PlanSdList'
import db from '@/utils/db'
import { getError } from '@/utils/error'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const yearStr = searchParams.get('yearStr')
  await db.connect()
  const existingData = await PlanSD.find({
    dateStr: { $regex: yearStr },
  }).exec()
  const dataJson = JSON.parse(JSON.stringify(existingData))
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
    await PlanSD.insertMany(item)
    await db.disconnect()
  } catch (error) {
    console.log('addPlanSdItem-error : ', getError(error))
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
    await PlanSD.findByIdAndUpdate(filter, update, {
      new: true,
    })
    await db.disconnect()
    console.log('saveEditPlanSdItem-successful-update : ', update)
  } catch (error) {
    console.log('saveEditPlanSdItem-error : ', getError(error))
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
    await PlanSD.deleteOne(filter)
    await db.disconnect()
  } catch (error) {
    console.log('saveEditPlanSdItem-error : ', getError(error))
  }
  return new Response(JSON.stringify({ message: 'DELETE' }))
}
