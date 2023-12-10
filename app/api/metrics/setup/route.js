import PlanSD from '@/models/PlanSdList'
import db from '@/utils/db'

export async function GET(req) {
  console.log('api-req : ', req)
  console.log('api-req.method : ', req.method)

  //   const { url } = request
  //   const year = 2023
  //   const yearStr = `${year.toString()}`
  //   const yearStr = url.search
  //   console.log('api- request : ', request.url)
  //   console.log('api- yearStr : ', yearStr)
  //   await db.connect()
  //   const existingData = await PlanSD.find({
  //     dateStr: { $regex: yearStr },
  //   }).exec()
  //   const dataJson = JSON.parse(JSON.stringify(existingData))
  //   console.log('api- dataJson : ', dataJson)
  //   await db.disconnect()
  //   return Response.json(existingData)
  //return new Response(dataJson)
}
