'use client'
import CardScheduleSD from '@/components/CardScheduleSD'
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

  const [sdType, setSdType] = useState('unscheduled')
  const [buttonVal, setButtonVal] = useState('Add to list')
  const [tempList, setTempList] = useState([])
  const [editItem, setEditItem] = useState({})
  const [isButtonDisable, setIsButtonDisable] = useState(false)

  const onOptionChange = (e) => {
    setSdType(e.target.value)
  }

  const user = session?.user
  const defaultDetailRemark = 'PLN power dip'
  const defaultFormattedMonth = getDefaultFormatedMonth()
  const defaultDuration = '1'

  const submitHandler = async (data) => {
    console.log('submitHandler-data : ', data)
  }

  const editList = (item) => {
    // console.log('editList-item : ', item)
    // console.log('editList-tempList : ', tempList)
    const newList = tempList.map((itemList) => {
      if (itemList.date === item.date) {
        return {
          ...itemList,
          date: getValues('schMonth'),
          description: getValues('detailRemark'),
          duration: getValues('durationDay'),
        }
      } else return itemList
    })
    // console.log('editList-newList : ', newList)
    setTempList(newList)
  }

  const handleOnclickAddButton = async ({ target }) => {
    const buttonValue = target.value
    const schMonth = getValues('schMonth') || defaultFormattedMonth
    const durationDay = getValues('durationDay') || defaultDuration
    let detailRemark = getValues('detailRemark') || defaultDetailRemark
    console.log('handleOnclickAddButton-buttonValue : ', buttonValue)

    let prefix = 'UNSCH-'
    if (sdType === 'scheduled') prefix = 'SCH-'
    detailRemark = prefix + detailRemark

    // console.log('handleOnclickAddButton-typeof : ', typeof buttonValue)
    if (buttonValue === 'Save') {
      // console.log('handleOnclickAddButton-prior-editList : ')
      editList(editItem)
    }
  }

  useEffect(() => {
    const feetchSdList = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST_SD_LIST' })
        const data = metricsStatic.unschSD
        setTempList(data)
        dispatch({ type: 'FETCH_SUCCESS_SD_LIST', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL_SD_LIST', payload: getError(err) })
      }
    }

    feetchSdList()
  }, [])

  const actionEditDeleteItem = (action, item) => {
    switch (action) {
      case 'EDIT':
        // console.log('actionEditDeleteItem-action : ', action)
        // console.log('actionEditDeleteItem-item : ', item)
        setValue('detailRemark', item.description)
        setValue('durationDay', item.duration.toString())
        setValue('schMonth', getDefaultFormatedMonth(item.date))
        setButtonVal('Save')
        setIsButtonDisable(true)
        if (item.description.includes('SCH-')) {
          setSdType('scheduled')
        } else setSdType('unscheduled')
        setEditItem(item)
        return
      case 'DELETE':
        console.log('actionEditDeleteItem-action : ', action)
        console.log('actionEditDeleteItem-item : ', item)
        setTempList(tempList.filter((a) => a.date !== item.date))
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
                <fieldset className="mt-3 mb-4">
                  <legend className="font-semibold mb-1">Shutdown type:</legend>

                  <div className="mb-1 px-3">
                    <input
                      type="radio"
                      {...register('unscheduledType', {
                        required: 'Please enter unscheduledType',
                      })}
                      id="unscheduledType"
                      name="sdType"
                      value="unscheduled"
                      checked={sdType === 'unscheduled'}
                      onChange={onOptionChange}
                    />
                    <label htmlFor="unscheduledType" className="px-2">
                      Un-Scheduled
                    </label>
                  </div>

                  <div className="mb-1 px-3">
                    <input
                      type="radio"
                      {...register('scheduledType', {
                        required: 'Please enter scheduledType',
                      })}
                      id="scheduledType"
                      name="sdType"
                      value="scheduled"
                      checked={sdType === 'scheduled'}
                      onChange={onOptionChange}
                    />
                    <label htmlFor="scheduledType" className="px-2">
                      Scheduled
                    </label>
                  </div>
                </fieldset>
                <div className="mb-4 font-medium">
                  <label htmlFor="detailRemark" className="font-semibold">
                    Remark
                  </label>
                  <input
                    type="text"
                    {...register('detailRemark', {
                      required: 'Please enter detailRemark',
                      minLength: { value: 10, message: 'detailRemark is more than 9 chars' },
                    })}
                    className="w-full rounded-2xl bg-blue-50 dark:bg-gray-900"
                    id="detailRemark"
                    defaultValue={defaultDetailRemark}
                  ></input>
                  {errors.detailRemark && (
                    <div className="text-red-500 ">{errors.detailRemark.message}</div>
                  )}
                </div>
                <input
                  className="mb-3 primary-button rounded-2xl bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-700 dark:bg-gray-900"
                  type="button"
                  {...register('idButton', {
                    required: 'Please enter idButton',
                  })}
                  value={buttonVal}
                  onClick={handleOnclickAddButton}
                  id="idButton"
                  disabled={isButtonDisable}
                />
              </div>
              <div className="mt-3 mb-3 rounded-xl bg-slate-50  px-5 py-3 shadow-md dark:bg-gray-900">
                <CardScheduleSD
                  action={actionEditDeleteItem}
                  title="UnSchedule Summary"
                  unscheduleSD={tempList}
                />
                <div className="mb-4 mt-7">
                  <button className="primary-button rounded-2xl bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-700 dark:bg-gray-900">
                    Submit
                  </button>
                </div>
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
