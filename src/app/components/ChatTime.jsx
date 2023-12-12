import React from 'react'
import { BiSolidMessageAltDots } from 'react-icons/bi'

const ChatTime = () => {
  return (
    <div>
        <div className='flex gap-2 items-center'>
              <div className='w-[25px] h-[25px] rounded-full border flex justify-center items-center border-gray-300'>
                <BiSolidMessageAltDots color='#2563eb' size={13} />
              </div>
              <p className='text-gray-600 text-xs'>Livechat 02:00 AM</p>
            </div>
    </div>
  )
}

export default ChatTime