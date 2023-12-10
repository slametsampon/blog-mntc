'use client'
import CardListSD from '@/components/CardListSD'
import metricsStatic from '@/data/metricsStatic'
import {
  addDisturbanceItem,
  deleteDisturbanceItem,
  getDisturbanceList,
  saveEditDisturbanceItem,
} from '@/lib/actions'
import { getError } from '@/utils/error'
import { getDefaultFormatedDate } from '@/utils/getDefaultFormatedDate'
import { useSession } from 'next-auth/react'
import { useReducer, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST_SD_LIST':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS_SD_LIST':
      return { ...state, loading: false, disturbancesList: action.payload, error: '' }
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

  const [{ loading, error, disturbancesList }, dispatch] = useReducer(reducer, {
    loading: true,
    disturbancesList: [],
    error: '',
  })

  const buttonCmd = metricsStatic.buttondCommand
  const shutdownType = metricsStatic.shutdownType
  const [sdType, setSdType] = useState('external')
  const [buttonVal, setButtonVal] = useState(buttonCmd.AddToList)
  const [editItem, setEditItem] = useState({})
  const [isButtonDisable, setIsButtonDisable] = useState(false)
  const defaultDescription = 'External factor'
  const defaultTargetYear = new Date().getFullYear()
  const [targetYear, settargetYear] = useState(defaultTargetYear)
  const defaultDuration = '1'
  const formatedDate = getDefaultFormatedDate(new Date())

  const setDefaultEntryData = () => {
    setValue('inputDate', formatedDate)
    setValue('description', defaultDescription)
    setValue('durationDay', defaultDuration)
    setSdType(shutdownType.external)

    //button set default
    setButtonVal(buttonCmd.AddToList)
    setIsButtonDisable(false)
  }

  useEffect(() => {
    const feetchSdList = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST_SD_LIST' })
        const data = await getDisturbanceList(defaultTargetYear)
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
      const data = await getDisturbanceList(year)
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

  const editListItem = (item) => {
    let prefix = 'EXT-'
    let description = getValues('description') || defaultDescription
    if (sdType === 'internal') prefix = 'INT-'
    description = prefix + description
    const newItem = {
      dateStr: getValues('inputDate'),
      description: description,
      duration: getValues('durationDay'),
    }
    saveEditDisturbanceItem(newItem, item._id)
  }

  const handleOnchangeDate = async ({ target }) => {
    settargetYear(new Date(target.value).getFullYear())
  }

  const handleOnclickButton = async ({ target }) => {
    let addItem = {}
    let prefix = 'EXT-'
    let description = getValues('description') || defaultDescription

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
        if (sdType === 'internal') prefix = 'INT-'
        description = prefix + description

        addItem = {
          dateStr: getValues('inputDate'),
          description: description,
          duration: parseFloat(getValues('durationDay')),
        }

        addDisturbanceItem(addItem)

        //set default entry data
        feetchSdListYear(targetYear)
        setDefaultEntryData()
        return

      default:
        console.log('handleOnclickButton-no-action : ', buttondCommand)
    }
  }

  const actionEditDeleteItem = (action, item) => {
    let description = item.description
    switch (action) {
      case 'EDIT':
        setValue('durationDay', item.duration.toString())
        setValue('inputDate', getDefaultFormatedDate(new Date(item.dateStr)))
        console.log('actionEditDeleteItem : inputDate', getValues('inputDate'))

        setSdType('internal')
        if (description.includes('EXT-')) {
          setSdType('external')
        }

        description = description.replace('EXT-', '')
        description = description.replace('INT-', '')
        setValue('description', description)

        setButtonVal(buttonCmd.SaveEdit)
        setIsButtonDisable(false)
        setEditItem(item)
        return
      case 'DELETE':
        deleteDisturbanceItem(item._id)
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
              <h1 className="pb-6 pt-3 text-xl font-bold">Update Reliability</h1>
              <div className="mb-3 rounded-xl bg-slate-50  px-5 py-3 shadow-md dark:bg-gray-900">
                <div className="mb-4 font-medium">
                  <label htmlFor="inputDate" className="font-semibold">
                    Date
                  </label>
                  <div className="grid grid-cols-2">
                    <input
                      type="date"
                      {...register('inputDate', {
                        required: 'Please enter inputDate',
                        minLength: { value: 4, message: 'inputDate is more than 5 chars' },
                      })}
                      className="input w-full rounded-2xl bg-blue-50 dark:bg-gray-900"
                      defaultValue={formatedDate}
                      onChange={handleOnchangeDate}
                      id="inputDate"
                    ></input>
                  </div>
                  {errors.inputDate && (
                    <div className="text-red-500">{errors.inputDate.message}</div>
                  )}
                </div>
                <div className="mb-4 font-medium">
                  <label htmlFor="durationDay" className="font-semibold mr-3">
                    Duration (Hour)
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
                  <div className="font-semibold mb-1">Disturbance type:</div>
                  <input
                    type="radio"
                    {...register('internalType', {
                      required: 'Please enter internalType',
                    })}
                    id="internalType"
                    name="sdType"
                    value={shutdownType.internal}
                    checked={sdType === shutdownType.internal}
                    onChange={onOptionChange}
                  />
                  <label htmlFor="internalType" className="px-2">
                    Internal
                  </label>
                  <input
                    type="radio"
                    {...register('externalType', {
                      required: 'Please enter externalType',
                    })}
                    id="externalType"
                    name="sdType"
                    value={shutdownType.external}
                    checked={sdType === shutdownType.external}
                    onChange={onOptionChange}
                  />
                  <label htmlFor="externalType" className="px-2">
                    External
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
                  title="Disturbances summary"
                  planSDList={disturbancesList}
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
