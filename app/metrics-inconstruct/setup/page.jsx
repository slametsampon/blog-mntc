'use client'
import CardScheduleSD from '@/components/CardScheduleSD'
import metricsStatic from '@/data/metricsStatic'
import { getDefaultFormatedMonth } from '@/utils/getDefaultFormatedDate'
import { useSession } from 'next-auth/react'
import { useReducer, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST_PRIORITY':
      return { ...state, loading: true, error: '' }
    case 'FETCH_SUCCESS_PRIORITY':
      return { ...state, loading: false, priorities: action.payload, error: '' }
    case 'FETCH_FAIL_PRIORITY':
      return { ...state, loading: false, error: action.payload }

    default:
      state
  }
}

export default function Page() {
  const unscheduleSD = metricsStatic.unschSD
  const { status, data: session } = useSession()
  const Once = useRef(false)
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const [{ loading, error, sdListing }, dispatch] = useReducer(reducer, {
    loading: true,
    sdListing: [],
    error: '',
  })

  //calculate Job Ticket number
  const user = session?.user

  const submitHandler = async (data) => {
    console.log('submitHandler-data : ', data)
  }

  const handleOnclickAddButton = async ({ target }) => {
    const buttonValue = target.value
    const schMonth = getValues('schMonth')
    const durationDay = getValues('durationDay')
    const detailRemark = getValues('detailRemark')

    console.log('handleOnclickAddButton-buttonValue : ', buttonValue)
    console.log('handleOnclickAddButton-schMonth : ', schMonth)
    console.log('handleOnclickAddButton-durationDay : ', durationDay)
    console.log('handleOnclickAddButton-detailRemark : ', detailRemark)
  }
  const formattedDate = getDefaultFormatedMonth()
  return (
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
                  defaultValue={formattedDate}
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
                type="number"
                min="0"
                max="31"
                {...register('durationDay', {
                  required: 'Please enter durationDay',
                  minLength: { value: 1, message: 'durationDay is more than 1 chars' },
                })}
                className="rounded-2xl bg-blue-50 dark:bg-gray-900"
                id="durationDay"
                defaultValue="1"
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
                  {...register('scheduledType', {
                    required: 'Please enter scheduledType',
                  })}
                  id="scheduledType"
                  name="sdType"
                  value="scheduled"
                  checked
                />
                <label htmlFor="scheduledType" className="px-2">
                  Scheduled
                </label>
              </div>

              <div className="px-3">
                <input
                  type="radio"
                  {...register('unscheduledType', {
                    required: 'Please enter unscheduledType',
                  })}
                  id="unscheduledType"
                  name="sdType"
                  value="unscheduled"
                  checked
                />
                <label htmlFor="unscheduledType" className="px-2">
                  Un-Scheduled
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
                defaultValue="PLN power dip"
              ></input>
              {errors.detailRemark && (
                <div className="text-red-500 ">{errors.detailRemark.message}</div>
              )}
            </div>
            <input
              className="mb-3 primary-button rounded-2xl bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-700 dark:bg-gray-900"
              type="button"
              value="Add to list"
              onClick={handleOnclickAddButton}
            />
          </div>
          <div className="mt-3 mb-3 rounded-xl bg-slate-50  px-5 py-3 shadow-md dark:bg-gray-900">
            <CardScheduleSD title="UnSchedule Summary" unscheduleSD={unscheduleSD} />
            <div className="mb-4 mt-7">
              <button className="primary-button rounded-2xl bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-700 dark:bg-gray-900">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
