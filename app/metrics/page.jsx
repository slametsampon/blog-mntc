'use client'

import CardDisturbance from '@/components/CardDisturbance'
import CardReliability from '@/components/CardReliability'
import CardBudget from '@/components/CardBudget'
import metricsStatic from '@/data/metricsStatic'
import {
  capexCalc,
  disturbanceCalc,
  hourCalc,
  opexCalc,
  targetYearCalc,
  yearTargetCalc,
} from '@/utils/metricsCalc'
import { useForm } from 'react-hook-form'
import { useEffect, useReducer, useRef, useState } from 'react'
import { getError } from '@/utils/error'
import { getMonthFull, monthsFull } from '@/utils/getDateString'
import CardSummaryTargetYear from '@/components/CardSummaryTargetYear'
import CardReliablityMonth from '@/components/CardReliablityMonth'

//export const metadata = genPageMetadata({ title: 'Metrics' })

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST_SD_PLAN_LIST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS_SD_PLAN_LIST':
      return { ...state, loading: false, sdPlanList: action.payload, error: '' }
    case 'FETCH_FAIL_SD_PLAN_LIST':
      return { ...state, loading: false, error: action.payload }

    case 'FETCH_REQUEST_DISTURBANCES':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS_DISTURBANCES':
      return { ...state, loading: false, disturbances: action.payload, error: '' }
    case 'FETCH_FAIL_DISTURBANCES':
      return { ...state, loading: false, error: action.payload }

    default:
      state
  }
}

export default function Page() {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const [{ loading, error, sdPlanList, disturbances }, dispatch] = useReducer(reducer, {
    loading: true,
    sdPlanList: [],
    disturbances: [],
    error: '',
  })

  const toDay = new Date()
  const defaultTargetYear = toDay.getFullYear()
  const defaultTargetMonth = getMonthFull(toDay)
  const [targetYearMonth, setTargetYearMonth] = useState('')
  const [summaryTargetYear, setSummaryTargetYear] = useState({})
  const [reliabilityCalc, setReliabilityCalc] = useState({})
  const mthFull = monthsFull
  const isDataReady = useRef(false)

  useEffect(() => {
    const feetchSdPlanList = async (year) => {
      const yearStr = year.toString()
      try {
        dispatch({ type: 'FETCH_REQUEST_SD_PLAN_LIST' })
        const results = await fetch(`/api/metrics/reliability/setup?yearStr=${yearStr}`)
        const data = await results.json()
        dispatch({ type: 'FETCH_SUCCESS_SD_PLAN_LIST', payload: data })
        isDataReady.current = true
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL_SD_PLAN_LIST', payload: getError(err) })
      }
    }

    const feetchDisturbances = async (year) => {
      const yearStr = year.toString()
      try {
        dispatch({ type: 'FETCH_REQUEST_DISTURBANCES' })
        const results = await fetch(`/api/metrics/reliability/update?yearStr=${yearStr}`)
        const data = await results.json()
        dispatch({ type: 'FETCH_SUCCESS_DISTURBANCES', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL_DISTURBANCES', payload: getError(err) })
      }
    }
    if (!isDataReady.current) {
      feetchSdPlanList(defaultTargetYear)
      feetchDisturbances(defaultTargetYear)
      isDataReady.current = true

      //set default value
      setValue('targetYear', defaultTargetYear)
      setValue('targetMonth', defaultTargetMonth)
    }
    if (sdPlanList.length > 0) {
      setSummaryTargetYear(targetYearCalc(defaultTargetYear, sdPlanList))
    }
  }, [sdPlanList, disturbances])

  const reliabilityData = metricsStatic.reliability
  const disturbanceData = metricsStatic.disturbance
  const opexData = metricsStatic.opex
  const capexData = metricsStatic.capex

  yearTargetCalc(reliabilityData.currentYear)
  disturbanceCalc(reliabilityData, disturbanceData)
  hourCalc(reliabilityData, toDay)
  opexCalc(opexData, toDay)
  capexCalc(capexData, toDay)

  const handleOnchangeYearMonth = async ({ target }) => {
    const yearStr = getValues('targetYear').toString() || defaultTargetYear
    let MonthStr = getValues('targetMonth') || defaultTargetMonth
    if (target.id === 'targetMonth') {
      MonthStr = target.value
      setValue('targetMonth', MonthStr)
    }
    const monthIndex = mthFull.indexOf(MonthStr) + 1
    let monthIndexStr = monthIndex.toString()
    if (monthIndex < 10) monthIndexStr = `0${monthIndexStr}`
    setTargetYearMonth(`${yearStr}-${monthIndexStr}`)
    console.log('handleOnchangeYearMonth-targetYearMonth', `${yearStr}-${monthIndexStr}`)
  }

  const submitHandler = async (data) => {
    console.log('submitHandler-data : ', data)
  }

  return (
    <>
      <div className="mt-5 rounded-2xl bg-green-50 pb-3 pt-3 shadow-md dark:bg-gray-900">
        <form className="mx-auto max-w-screen-md px-3" onSubmit={handleSubmit(submitHandler)}>
          <h1 className="pb-6 pt-3 text-xl font-bold">KPI - Metrics</h1>
          <div className="mb-4 font-medium">
            <label htmlFor="targetYear" className="font-semibold">
              Year
            </label>
            <div className="grid grid-cols-2">
              <input
                type="number"
                {...register('targetYear', {
                  required: 'Please enter targetYear',
                  minLength: { value: 4, message: 'targetYear is more than 5 chars' },
                })}
                className="input w-full rounded-2xl bg-blue-50 dark:bg-gray-900"
                defaultValue={defaultTargetYear}
                onChange={handleOnchangeYearMonth}
                min={1990}
                max={2050}
                id="targetYear"
              ></input>
            </div>
            {errors.targetYear && <div className="text-red-500">{errors.targetYear.message}</div>}
          </div>
          <div className="mb-4 font-medium">
            <label htmlFor="targetMonth" className="font-semibold">
              Month
            </label>
            <div className="grid grid-cols-2">
              <select
                {...register('targetMonth', {
                  required: 'Please enter targetMonth',
                  minLength: { value: 3, message: 'targetMonth is more than 2 chars' },
                })}
                className="input w-full rounded-2xl bg-blue-50 dark:bg-gray-900"
                onChange={handleOnchangeYearMonth}
                id="targetMonth"
              >
                {' '}
                {mthFull.map((mth, index) => (
                  <option key={index} value={mth}>
                    {mth}
                  </option>
                ))}
              </select>
            </div>
            {errors.targetMonth && <div className="text-red-500">{errors.targetMonth.message}</div>}
          </div>
        </form>
      </div>
      <div className="mt-3 mb-3 rounded-xl bg-slate-50  px-5 py-3 shadow-md dark:bg-gray-900">
        <div className="text-xl mb-3 text-blue-600 dark:text-gray-100 font-semibold">
          {'Reliability'}
        </div>
        <CardSummaryTargetYear data={summaryTargetYear} />
        <CardReliablityMonth reliabilityDisplayData={reliabilityData} />
      </div>
      <CardDisturbance title={'Disturbances'} disturbanceData={disturbanceData} />
      <CardBudget title={'Budget'} opexData={opexData} capexData={capexData} />
    </>
  )
}
