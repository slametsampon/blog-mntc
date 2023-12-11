'use client'
import CardListSD from '@/components/CardListSD'
import metricsStatic from '@/data/metricsStatic'
import { addPlanSdItem, deletePlanSdItem, getPlanSdList, saveEditPlanSdItem } from '@/lib/actions'
import { getError } from '@/utils/error'
import { getMonthFull, monthsFull } from '@/utils/getDateString'
import { useSession } from 'next-auth/react'
import { useReducer, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST_SD_LIST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS_SD_LIST':
      return { ...state, loading: false, sdList: action.payload, error: '' }
    case 'FETCH_FAIL_SD_LIST':
      return { ...state, loading: false, error: action.payload }

    default:
      state
  }
}

export default function Page() {
  const { status, data: session } = useSession()
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const [{ loading, error, sdList }, dispatch] = useReducer(reducer, {
    loading: true,
    sdList: [],
    error: '',
  })

  const buttonCmd = metricsStatic.buttondCommand
  const shutdownType = metricsStatic.shutdownType
  const [sdType, setSdType] = useState('unscheduled')
  const [buttonVal, setButtonVal] = useState(buttonCmd.AddToList)
  const [editItem, setEditItem] = useState({})
  const [isButtonDisable, setIsButtonDisable] = useState(false)
  const defaultDescription = 'External factor'
  const defaultTargetYear = new Date().getFullYear()
  const defaultTargetMonth = getMonthFull(new Date())
  const [targetYearMonth, setTargetYearMonth] = useState('')
  const defaultDuration = '1'
  const mthFull = monthsFull

  const setDefaultEntryData = () => {
    setValue('targetYear', defaultTargetYear)
    setValue('targetMonth', defaultTargetMonth)
    setValue('description', defaultDescription)
    setValue('durationDay', defaultDuration)
    setSdType(shutdownType.unschedule)

    //button set default
    setButtonVal(buttonCmd.AddToList)
    setIsButtonDisable(false)
  }

  useEffect(() => {
    const feetchSdList = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST_SD_LIST' })
        const results = await fetch(`/api/metrics/setup?yearStr=${defaultTargetYear}`)
        const data = await results.json()
        dispatch({ type: 'FETCH_SUCCESS_SD_LIST', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL_SD_LIST', payload: getError(err) })
      }
    }

    feetchSdList()
    setDefaultEntryData()
  }, [])

  const feetchSdListYear = async (year) => {
    try {
      dispatch({ type: 'FETCH_REQUEST_SD_LIST' })
      const results = await fetch(`/api/metrics/setup?yearStr=${year.toString()}`)
      const data = await results.json()
      dispatch({ type: 'FETCH_SUCCESS_SD_LIST', payload: data })
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL_SD_LIST', payload: getError(err) })
    }
  }

  const onOptionChange = (e) => {
    setSdType(e.target.value)
  }

  const submitHandler = async (data) => {
    console.log('submitHandler-data : ', data)
  }

  const editListItem = async (item) => {
    let prefix = 'UNSCH-'
    let description = getValues('description') || defaultDescription
    if (sdType === 'scheduled') prefix = 'SCH-'
    description = prefix + description
    const newItem = {
      id: item._id,
      dateStr: targetYearMonth,
      description: description,
      duration: getValues('durationDay'),
    }

    const response = await fetch('/api/metrics/setup', {
      method: 'PUT', // or 'POST'
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(newItem),
    })
  }

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

  const handleOnclickButton = async ({ target }) => {
    let addItem = {}
    let prefix = 'UNSCH-'
    let description = getValues('description') || defaultDescription

    const targetYear = new Date(targetYearMonth).getFullYear()
    const buttondCommand = target.value
    switch (buttondCommand) {
      case buttonCmd.SaveEdit:
        editListItem(editItem)
        //set default entry data
        feetchSdListYear(targetYear)
        setDefaultEntryData()
        return

      case buttonCmd.Cancel:
        //set default entry data
        setDefaultEntryData()
        return

      case buttonCmd.AddToList:
        if (sdType === 'scheduled') prefix = 'SCH-'
        description = prefix + description

        addItem = {
          dateStr: targetYearMonth,
          description: description,
          duration: parseFloat(getValues('durationDay')),
        }

        // addPlanSdItem(addItem)
        await fetch('/api/metrics/setup', {
          method: 'POST', // or 'POST'
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify(addItem),
        })

        //set default entry data
        feetchSdListYear(targetYear)
        setDefaultEntryData()
        return

      default:
        console.log('handleOnclickButton-no-action : ', buttondCommand)
    }
  }

  const actionEditDeleteItem = async (action, item) => {
    let description = item.description
    const targetYear = new Date(targetYearMonth).getFullYear()
    const deleteItem = {
      id: item._id,
    }
    switch (action) {
      case 'EDIT':
        setValue('durationDay', item.duration.toString())
        setValue('targetYear', new Date(item.dateStr).getFullYear())
        setValue('targetMonth', getMonthFull(new Date(item.dateStr)))
        setTargetYearMonth(item.dateStr)

        setSdType('scheduled')
        if (description.includes('UNSCH-')) {
          setSdType('unscheduled')
        }

        description = description.replace('UNSCH-', '')
        description = description.replace('SCH-', '')
        setValue('description', description)

        setButtonVal(buttonCmd.SaveEdit)
        setIsButtonDisable(false)
        setEditItem(item)
        return
      case 'DELETE':
        // deletePlanSdItem(item._id)

        await fetch('/api/metrics/setup', {
          method: 'DELETE', // or 'POST'
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify(deleteItem),
        })

        //set default entry data
        feetchSdListYear(targetYear)
        setDefaultEntryData()
        return

      default:
        console.log('actionEditDeleteItem-no-action : ', item)
    }
  }

  return (
    <div>
      {session ? (
        <>
          <div className="mt-5 rounded-2xl bg-blue-50 pb-3 pt-3 shadow-md dark:bg-gray-900">
            <form className="mx-auto max-w-screen-md px-3" onSubmit={handleSubmit(submitHandler)}>
              <h1 className="pb-6 pt-3 text-xl font-bold">Operation Setup Target</h1>
              <div className="mb-3 rounded-xl bg-slate-50  px-5 py-3 shadow-md dark:bg-gray-900">
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
                  {errors.targetYear && (
                    <div className="text-red-500">{errors.targetYear.message}</div>
                  )}
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
                  {errors.targetMonth && (
                    <div className="text-red-500">{errors.targetMonth.message}</div>
                  )}
                </div>
                <div className="mb-4 font-medium">
                  <label htmlFor="durationDay" className="font-semibold mr-3">
                    Duration (Day)
                  </label>
                  <input
                    type="text"
                    {...register('durationDay', {
                      required: 'Please enter durationDay',
                      minLength: { value: 1, message: 'durationDay is more than 1 chars' },
                    })}
                    className="rounded-2xl bg-blue-50 dark:bg-gray-900"
                    id="durationDay"
                    defaultValue={defaultDuration}
                  ></input>
                  {errors.durationDay && (
                    <div className="text-red-500 ">{errors.durationDay.message}</div>
                  )}
                </div>
                <div className="mb-3 mt-3">
                  <div className="font-semibold mb-1">Shutdown type:</div>
                  <input
                    type="radio"
                    {...register('unscheduledType', {
                      required: 'Please enter unscheduledType',
                    })}
                    id="unscheduledType"
                    name="sdType"
                    value={shutdownType.unschedule}
                    checked={sdType === shutdownType.unschedule}
                    onChange={onOptionChange}
                  />
                  <label htmlFor="unscheduledType" className="px-2">
                    Un-Scheduled
                  </label>
                  <input
                    type="radio"
                    {...register('scheduledType', {
                      required: 'Please enter scheduledType',
                    })}
                    id="scheduledType"
                    name="sdType"
                    value={shutdownType.schedule}
                    checked={sdType === shutdownType.schedule}
                    onChange={onOptionChange}
                  />
                  <label htmlFor="scheduledType" className="px-2">
                    Scheduled
                  </label>
                </div>
                <div className="mb-4 font-medium">
                  <label htmlFor="description" className="font-semibold">
                    Description
                  </label>
                  <textarea
                    type="text"
                    {...register('description', {
                      required: 'Please enter description',
                      minLength: { value: 10, message: 'description is more than 9 chars' },
                    })}
                    className="w-full rounded-2xl bg-blue-50 dark:bg-gray-900"
                    rows="3"
                    id="description"
                    defaultValue={defaultDescription}
                  ></textarea>
                  {errors.description && (
                    <div className="text-red-500 ">{errors.description.message}</div>
                  )}
                </div>
                <input
                  className="mb-3 mt-5 primary-button rounded-2xl bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-700 dark:bg-gray-900"
                  type="button"
                  {...register('idButton', {
                    required: 'Please enter idButton',
                  })}
                  value={buttonVal}
                  onClick={handleOnclickButton}
                  id="idButton"
                  disabled={isButtonDisable}
                />
                {buttonVal === buttonCmd.SaveEdit ? (
                  <input
                    className="mb-3 ml-3 primary-button rounded-2xl text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300  text-center me-2  dark:hover:bg-red-700 dark:focus:ring-red-900 px-6 py-2 font-bold  dark:bg-gray-900"
                    type="button"
                    {...register('idButtonCancel', {
                      required: 'Please enter idButtonCancel',
                    })}
                    value={buttonCmd.Cancel}
                    onClick={handleOnclickButton}
                    id="idButtonCancel"
                  />
                ) : null}
              </div>
              <div className="mt-3 mb-3 rounded-xl bg-slate-50  px-5 py-3 shadow-md dark:bg-gray-900">
                <CardListSD
                  action={actionEditDeleteItem}
                  title="S/D Plan Summary"
                  planSDList={sdList}
                />
              </div>
            </form>
          </div>
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
