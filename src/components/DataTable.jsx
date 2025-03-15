import React from 'react'

export default function DataTable({ data }) {
    return (
        <div className='w-[80%] h-[90vh] mx-auto '>
            <div className='w-full flex my-2'>
                <button
                    className='bg-green-700 hover:bg-green-800 text-gray-50 font-semibold text-2xl py-3 px-6 rounded-2xl m-auto cursor-pointer'
                >
                    Start the Server
                </button>
            </div>
            {
                data.map((item, index) => {
                    console.log(item)
                    return (
                        <div key={index}>{item.name}</div>
                    )
                })
            }
            <div className='bg-white text-gray-700 w-full flex'>
                <div className='w-[30%] flex justify-center items-center'>
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 animate-spin">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>
                </div>
                <div className='w-[40%] flex flex-col items-center'>
                    <h1>Conformatio No. <span className='font-semibold'>20252651sdf1sa3321</span></h1>
                    <div className='flex gap-5 text-sm'>
                        <p>Name: <span className='font-semibold'>UDAS, MAHESH KUMAR</span></p>
                        <p>YOB: <span className='font-semibold'>2003</span></p>
                    </div>
                </div>
                <div className='w-[30%] flex justify-center items-center'>
                    <h1>SELECTED</h1>
                </div>
            </div>
        </div>
    )
}
