import React, { useContext } from 'react'
import FileInput from './FileInput'
import { globalContext } from './contextAPI'

export default function SideBar({ classname }) {

  const { data, count, handleAutomationClick, AutomationRunning } = useContext(globalContext);

  return (
    <div className={`${classname} bg-white h-full w-80 border-r-2 border-gray-400`}>
      <div className='w-[90%]'>
        <FileInput
          isDisable={data.length!=0}
        />
      </div>

      <div className=' w-[90%] py-6 flex flex-col gap-2 text-gray-600'>
        <p className='bg-white p-2 rounded shadow'>Total candidate : <span className='font-semibold'>{data?.length || 0}</span></p>
        <p className='bg-white p-2 rounded shadow'>Selected : <span className='font-semibold'>{count.selected}</span></p>
        <p className='bg-white p-2 rounded shadow'>Not Selected : <span className='font-semibold'>{count.notSelected}</span></p>
      </div>

      <div className={`w-8 h-8 rounded-full animate-ping bg-sky-600 ${AutomationRunning?'visible':'invisible'} `}/>

      <div className=''>
        <button
          className={`${data.length!=0 ? 'bg-blue-500 hover:bg-blue-600  cursor-pointer' : 'bg-blue-400'} text-gray-50 font-semibold text-xl py-3 px-6 mb-2 rounded-lg m-auto`}
          disabled={data.length==0}
          onClick={handleAutomationClick}
        >
          {AutomationRunning?"Stop":"Start"} Automation
        </button>
      </div>
    </div>
  )
}
