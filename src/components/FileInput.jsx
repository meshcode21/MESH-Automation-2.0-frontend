import { useContext } from "react"
import { globalContext } from "./contextAPI"

export default function FileInput({ isDisable = false}) {
    
    const {handleFileChange, loading} = useContext(globalContext);

    return (
        <div className={`${isDisable?' opacity-50':''} flex items-center justify-center m-auto mt-3`}>
            <label htmlFor="dropzone-file" className={`${!isDisable?'hover:bg-gray-100 cursor-pointer':''} flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg  bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}>
                {
                    !loading ?
                        <>
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-1 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                {/* or drag and drop</p> */}
                                <p className="text-xs text-gray-500 dark:text-gray-400">Excell Data File</p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange={handleFileChange}
                                disabled = {isDisable}
                            />
                        </>
                        :   
                        <div className="flex gap-1 text-xs font-bold text-gray-500 dark:text-gray-400">
                            <div className="animate-spin">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            </div>
                            <p className="text-xl">Loading...</p>
                        </div>
                }
            </label>
        </div>
    )
}
