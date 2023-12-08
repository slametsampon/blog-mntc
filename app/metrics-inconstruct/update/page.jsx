'use client'
import metricsStatic from '@/data/metricsStatic'
import { getError } from '@/utils/error'
import { getDefaultFormatedMonth } from '@/utils/getDefaultFormatedDate'
import { useSession } from 'next-auth/react'
import { useReducer, useRef, useState, useEffect } from 'react'
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
  const Once = useRef(false)
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
  const [tempList, setTempList] = useState([])
  const [editItem, setEditItem] = useState({})
  const [isButtonDisable, setIsButtonDisable] = useState(false)
  const defaultDescription = 'PLN power dip'
  const defaultFormattedMonth = getDefaultFormatedMonth()
  const defaultDuration = '1'

  const setDefaultEntryData = () => {
    setValue('schMonth', defaultFormattedMonth)
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
        const data = metricsStatic.planSdList
        setTempList(data)
        dispatch({ type: 'FETCH_SUCCESS_SD_LIST', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL_SD_LIST', payload: getError(err) })
      }
    }

    feetchSdList()
    setDefaultEntryData()
  }, [])

  const onOptionChange = (e) => {
    setSdType(e.target.value)
  }

  const submitHandler = async (data) => {
    console.log('submitHandler-data : ', data)
  }

  return (
    <div>
      <>
        <div className="mt-5 rounded-2xl bg-blue-50 pb-3 pt-3 shadow-md dark:bg-gray-900">
          <form className="mx-auto max-w-screen-md px-3" onSubmit={handleSubmit(submitHandler)}>
            <h1 className="pb-6 pt-3 text-xl font-bold">Operation Setup Target</h1>
            <div className="mb-4 font-medium">
              <label htmlFor="schMonth" className="font-semibold">
                Month Year
              </label>
              <div className="grid grid-cols-2">
                <input
                  type="month"
                  {...register('schMonth', {
                    required: 'Please enter schMonth',
                    minLength: { value: 6, message: 'schMonth is more than 5 chars' },
                  })}
                  className="input w-full rounded-2xl bg-blue-50 dark:bg-gray-900"
                  defaultValue={defaultFormattedMonth}
                  id="schMonth"
                ></input>
              </div>
              {errors.schMonth && <div className="text-red-500">{errors.schMonth.message}</div>}
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
            <div className="mb-4 font-medium">
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <input
                type="text"
                {...register('description', {
                  required: 'Please enter description',
                  minLength: { value: 10, message: 'description is more than 9 chars' },
                })}
                className="w-full rounded-2xl bg-blue-50 dark:bg-gray-900"
                id="description"
                defaultValue={defaultDescription}
              ></input>
              {errors.description && (
                <div className="text-red-500 ">{errors.description.message}</div>
              )}
            </div>
            <button className="primary-button rounded-2xl bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-700 dark:bg-gray-900">
              Submit
            </button>
          </form>
        </div>
      </>
    </div>
  )
}
