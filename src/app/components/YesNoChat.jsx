import React from 'react'

const YesNoChat = ({ submitFunc}) => {

  return (
    <div>
        <div className={`mt-5 flex justify-end`}>
            <div className='p-3 bg-lime-500 w-max max-w-[250px] rounded-md'>
              <p className='text-black text-sm mb-2'>Please select yes or no</p>
              <hr className=' border-black' />
              <div>
                <button onClick={() => submitFunc(true)} className='text-center text-sm w-full text-black'>
                  Yes
                </button>
                <hr className=' border-black' />
                <button onClick={() => submitFunc(false)} className='text-center text-sm w-full text-black'>
                  No
                </button>
                <hr className=' border-black' />
              </div>
            </div>
          </div>
    </div>
  )
}

export default YesNoChat