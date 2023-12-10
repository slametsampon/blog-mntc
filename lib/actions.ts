'use server'

import Disturbance from '@/models/Disturbance'
import PlanSD from '@/models/PlanSdList'
import db from '@/utils/db'
import { TDisturbance } from '@/utils/definition'
import { getError } from '@/utils/error'

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

export async function deletePlanSdItem(id: string) {
  const filter = { _id: id }
  try {
    await db.connect()
    await PlanSD.deleteOne(filter)
    await db.disconnect()
  } catch (error) {
    console.log('deletePlanSdItem-error : ', getError(error))
  }
}

export async function saveEditPlanSdItem(item: TDisturbance, id: string) {
  const filter = { _id: id }
  const update = { dateStr: item.dateStr, description: item.description, duration: item.duration }
  console.log('saveEditPlanSdItem-filter : ', filter)
  console.log('saveEditPlanSdItem-update : ', update)
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
}

export async function addPlanSdItem(item: TDisturbance) {
  try {
    await db.connect()
    await PlanSD.insertMany(item)
    await db.disconnect()
  } catch (error) {
    console.log('addPlanSdItem-error : ', getError(error))
  }
}

export async function getDisturbanceList(year: number) {
  const yearStr = `${year.toString()}`
  await db.connect()
  const existingData = await Disturbance.find({
    dateStr: { $regex: yearStr },
  }).exec()
  const dataJson = JSON.parse(JSON.stringify(existingData))
  await db.disconnect()
  return dataJson
}

export async function deleteDisturbanceItem(id: string) {
  const filter = { _id: id }
  try {
    await db.connect()
    await Disturbance.deleteOne(filter)
    await db.disconnect()
  } catch (error) {
    console.log('deleteDisturbanceItem-error : ', getError(error))
  }
}

export async function saveEditDisturbanceItem(item: TDisturbance, id: string) {
  const filter = { _id: id }
  const update = { dateStr: item.dateStr, description: item.description, duration: item.duration }
  // console.log('saveEditDisturbanceItem-update : ', update)
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
}

export async function addDisturbanceItem(item: TDisturbance) {
  // console.log('addDisturbanceItem-item : ', item)
  try {
    await db.connect()
    await Disturbance.insertMany(item)
    await db.disconnect()
  } catch (error) {
    console.log('addDisturbanceItem-error : ', getError(error))
  }
}
