'use client'

import isObjectEmpty from '@/utils/isObjectEmpty'

export default function csvToJson(properties, data) {
  const jsonData = [{}]
  data.map((rowData, index) => {
    const obj = {}
    rowData.map((val, i) => {
      obj[properties[i]] = val
    })
    if (!isObjectEmpty(obj)) {
      if (index === 0) jsonData[index] = obj
      else jsonData.push(obj)
    }
  })
  return jsonData
}
