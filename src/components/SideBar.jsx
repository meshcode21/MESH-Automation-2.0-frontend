import React, { useContext } from 'react'
import FileInput from './FileInput'
import { globalContext } from './contextAPI'

export default function SideBar({ classname }) {

  const { currentIndex, data, count, handleAutomationClick, handleResetClick, AutomationRunning, automationTerminated, setAutomationTerminated } = useContext(globalContext);

  return (
    <div className={`${classname} bg-white h-full w-80 border-r-2 border-gray-400`}>
      <div className='w-[90%]'>
        <FileInput
          isDisable={data.length != 0}
        />
      </div>

      <div className=' w-[90%] py-6 flex flex-col gap-2 text-gray-600'>
        <p className='bg-white p-2 rounded shadow'>Total candidate : <span className='font-semibold'>{data?.length || 0}</span></p>
        <p className='bg-white p-2 rounded shadow'>Selected : <span className='font-semibold'>{count.selected}</span></p>
        <p className='bg-white p-2 rounded shadow'>Not Selected : <span className='font-semibold'>{count.notSelected}</span></p>
        <p className='bg-white p-2 rounded shadow'>Current Index : <span className='font-semibold'>{AutomationRunning ? currentIndex + 1 : 0}</span></p>
      </div>

      <div className={`w-5 h-5 rounded-full animate-ping border-4 border-blue-600 ${AutomationRunning ? 'visible' : 'invisible'} `} />

      <div className='flex flex-col w-[90%] gap-2 mb-2'>
        {
          !automationTerminated ? (
            <>
              <button
                className={`${data.length != 0 ? 'bg-blue-500 hover:bg-blue-600  cursor-pointer' : 'bg-blue-400'} text-gray-50 font-semibold text-xl h-12 w-full rounded-lg m-auto`}
                disabled={data.length == 0}
                onClick={handleAutomationClick}
              >
                {AutomationRunning ? "Stop" : "Start"} Automation
              </button>
              <button
                className={`box-border ${(data.length != 0) && !AutomationRunning ? 'hover:bg-gray-600 bg-gray-500 text-white  cursor-pointer' : 'bg-gray-400 '} text-gray-50 font-semibold text-xl h-11 w-full rounded-lg m-auto `}
                disabled={AutomationRunning}
                onClick={handleResetClick}
              >
                Reset
              </button>
            </>
          ) : (
            <button
              className={`bg-blue-500 hover:bg-blue-600  cursor-pointer text-gray-50 font-semibold text-xl h-12 w-full rounded-lg m-auto`}
              onClick={() => { handleResetClick(); setAutomationTerminated(false); }}
            >
              Start New
            </button>
          )
        }
      </div>
    </div>
  )
}
