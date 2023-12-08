'use server'

import metricsStatic from '@/data/metricsStatic'
import PlanSD from '@/models/PlanSdList'
import db from '@/utils/db'
import { TDisturbance } from '@/utils/definition'

export async function getPlanSdList(year: number) {
  const yearStr = `${year.toString()}`
  await db.connect()
  const existingData = await PlanSD.find({
    dateStr: { $regex: yearStr },
  }).exec()
  const dataJson = JSON.parse(JSON.stringify(existingData))
  await db.disconnect()
  return dataJson
}

export async function deletePlanSdList(year: number) {
  const yearStr = `${year.toString()}`
  await db.connect()
  const result = await PlanSD.deleteMany({
    dateStr: { $regex: yearStr },
  }).exec()
  const dataJson = JSON.parse(JSON.stringify(result))
  await db.disconnect()
  return dataJson
}

export async function savePlanSdList(year: number, newData: [TDisturbance]) {
  const existingData = await getPlanSdList(year)
  console.log('savePlanSdList - newData : ', newData)
  console.log('savePlanSdList - existingData : ', existingData)
  await db.connect()
  if (existingData.length > 0) {
    const result = deletePlanSdList(year)
    console.log('Delete existing data-result : ', result)
  }
  await PlanSD.insertMany(newData)
  await db.disconnect()
}
