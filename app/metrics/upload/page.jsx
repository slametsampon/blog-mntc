'use client'
// import { genPageMetadata } from '@/app/seo'

import { useState } from 'react'
import Papa from 'papaparse'
import CardUploadData from '@/components/CardUploadData'
import csvToObjectMetric from '@/utils/csvToObjectMetric'
import { useSession } from 'next-auth/react'
import CustomLink from '@/components/Link'

export default function Page() {
  const { data: session, status } = useSession()
  console.log('status', status)
  console.log('session', session)

  // State to store parsed data
  const [parsedData, setParsedData] = useState([])

  //State to store table Column name
  const [tableRows, setTableRows] = useState([])

  //State to store the values
  const [values, setValues] = useState([])

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = []
        const valuesArray = []
        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d))
          valuesArray.push(Object.values(d))
        })
        // Parsed Data Response in array format
        setParsedData(results.data)
        // Filtered Column Names
        setTableRows(rowsArray[0])
        // Filtered Values
        setValues(valuesArray)
        //convert and storing to metricsData
        csvToObjectMetric(rowsArray[0], valuesArray)
      },
    })
  }

  return (
    <div>
      {/* File Uploader */}
      {session ? (
        <>
          <input
            className="py-5 px-3 bg-green-100 rounded-2xl shadow-2xl"
            type="file"
            name="file"
            onChange={changeHandler}
            accept=".csv"
            style={{ display: 'block', margin: '10px auto' }}
          />
          <CardUploadData title={'Upload Data'} uploadHeader={tableRows} uploadData={values} />
        </>
      ) : (
        <>
          <h1 className="text-xl">Access Denied</h1>
          <p className="text-lg font-semibold mt-5 text-green-600">Please login </p>
        </>
      )}
    </div>
  )
}
Page.auth = true
