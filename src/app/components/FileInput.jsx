import React from 'react'

const FileInput = () => {
    return (
        <div className={`mt-5 flex justify-end`}>
            <div className='p-3 bg-lime-500 w-max max-w-[250px] rounded-md'>
                <input type="file" accept="image/png, image/jpeg" name="file-input" id="file-input" class="text-white block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none  file:border-0 file:bg-gray-100 file:me-4 file:py-3 file:px-4"></input>
            </div>
        </div>
    )
}

export default FileInput