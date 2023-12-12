import React from 'react'

const Chat = (chat) => {
const {msg, auth} = chat.chat
  return (
    <div>
        <div className={`mt-5 ${auth !== 'ai' && 'flex justify-end'}`}>
            <div className='p-3 bg-lime-500 w-max max-w-[250px] rounded-md'>
              <p className='text-black text-sm whitespace-pre-line'>{msg}</p>
            </div>
          </div>
    </div>
  )
}

export default Chat