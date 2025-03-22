import React, { useContext } from 'react'
import { globalContext } from './contextAPI'

export default function PlayGround() {

    const { data, selectedData, notSelectedData } = useContext(globalContext);

    return (
        <div className="grid grid-cols-7 grid-rows-6 gap-4 w-full p-4">

            <div className="scrollbar col-span-4 row-span-6 bg-white rounded px shadow overflow-auto relative">
                <h1 className='bg-sky-500 text-center text-white z-10 sticky top-0'>List of All Candidates</h1>
                <div className='px-2'>
                    <table class=" w-full" >
                        <thead className='border-b border-gray-400'>
                            <tr>
                                <th>S.N.</th>
                                <th>Details</th>
                                <th>Progress</th>
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm'>
                            {
                                data.map((item, index) => {
                                    return (
                                        <tr key={index + 1} className='border-b border-gray-400'>
                                            <td className='w-10'>
                                                <p className='text-center'>{index + 1}.</p>
                                            </td>
                                            <td className='flex'>
                                                <div className='flex flex-col px-2 '>
                                                    <h1 className='text-base'>Conformatio No. <span className='font-semibold'>{item.confirmationNumber}</span></h1>

                                                    <p>Name: <span className='font-semibold'>{item.name}</span></p>
                                                    <p>YOB: <span className='font-semibold'>{item.DOB}</span></p>

                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex justify-center items-center'>
                                                    {
                                                        (item.status == "...") ? "..." :
                                                            (item.status == "running") ? (
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 animate-spin">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                                                </svg>
                                                            ) :
                                                                (item.status == "not selected") ? (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-700">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                    </svg>
                                                                ) : (item.status == "selected") ? (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-green-700">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-700">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                    </svg>

                                                                )
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex justify-center items-center px-2'>
                                                    <h1 className='uppercase'>{item.status}</h1>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="scrollbar col-span-3 row-span-2 col-start-5 bg-white rounded shadow overflow-auto relative">
                <h1 className='bg-[#4e9c05] text-center text-white sticky top-0'>List of <b className='font-semibold'>Selected</b> Candidates</h1>
                <div>
                    <table class=" w-full" >
                        <tbody className='text-sm'>
                            {
                                selectedData.map((item, index) => {
                                    return (
                                        <tr key={index + 1} className='border-b border-gray-400'>
                                            <td className='w-16'>
                                                <p className='text-center'>{index + 1}.</p>
                                            </td>
                                            <td className='flex'>
                                                <div className='flex flex-col px-2 '>
                                                    <h1 className='text-base'>Conformatio No. <span className='font-semibold'>{item.confirmationNumber}</span></h1>

                                                    <p>Name: <span className='font-semibold'>{item.name}</span></p>
                                                    <p>YOB: <span className='font-semibold'>{item.DOB}</span></p>
                                                    <p>Address: <span className='font-semibold'>{item.address}</span></p>

                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex justify-center items-center px-5'>
                                                    <h1 className='uppercase'>{item.status}</h1>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="scrollbar col-span-3 row-span-4 col-start-5 row-start-3 bg-white rounded shadow overflow-auto relative">
                <h1 className='bg-[#c27012] text-center text-white sticky top-0'>List of <b className='font-semibold' s>Not-Selected</b> Candidates</h1>
                <div>
                    <table class=" w-full" >
                        <tbody className='text-sm'>
                            {
                                notSelectedData.map((item, index) => {
                                    return (
                                        <tr key={index + 1} className='border-b border-gray-400'>
                                            <td className='w-16'>
                                                <p className='text-center'>{index + 1}.</p>
                                            </td>
                                            <td className='flex'>
                                                <div className='flex flex-col px-2 '>
                                                    <h1 className='text-base'>Conformatio No. <span className='font-semibold'>{item.confirmationNumber}</span></h1>

                                                    <p>Name: <span className='font-semibold'>{item.name}</span></p>
                                                    <p>YOB: <span className='font-semibold'>{item.DOB}</span></p>

                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex justify-center items-center px-5'>
                                                    <h1 className='uppercase'>{item.status}</h1>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
