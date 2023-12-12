"use client"
import Image from 'next/image'
import { BiDislike, BiSolidMessageAltDots } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import TopBar from './components/TopBar';
import ChatTime from './components/ChatTime';
import Chat from './components/Chat';
import SelectChat from './components/SelectChat';
import YesNoChat from './components/YesNoChat';
import { useState } from 'react';
export default function Home() {
  const [chats, setChats] = useState([])
  const [myChatsCount, setMyChatsCount] = useState(0)
  const [msgInput, setMsgInput] = useState('')
  const getResponse = (type) => {
    setTimeout(() => {
      if (type === 'yesNo') {
        setChats(prevChats => {
          const newChats = [...prevChats, {
            msgType: 'yesNo',
            msg: 'this is not written by me & yesno',
            auth: 'ai'
          }];
          return newChats;
        });
      } else if (type === 'select') {
        setChats(prevChats => {
          const newChats = [...prevChats, {
            msg: 'this is not written by me & select',
            msgType: 'select',
            options: ['Domestic Abuse', 'Divorce & separation'],
            auth: 'ai'
          }];
          return newChats;
        });

      } else {
        setChats(prevChats => {
          const newChats = [...prevChats, {
            msg: 'this is not written by me ',
            auth: 'ai'
          }];
          return newChats;
        });
      }
    }, 1000);
  }
  const sendChat = (msg) => {
    setChats(prevChats => {
      const newChats = [...prevChats, { msg, auth: 'me' }];
      return newChats;
    });
    setMsgInput('')
    setMyChatsCount(myChatsCount + 1)
    if (myChatsCount / 2 === 0) {
      getResponse('select')
    } else if (myChatsCount / 3 === 0) {
      getResponse('yesNo')
    } else {
      getResponse()
    }
  }
  const handleSelectInput = (items) => {
    console.log(items)
    getResponse()
  }
  return (
    <div className='bg-gray-100 w-screen h-screen overflow-hidden'>
      <div className='max-w-[500px] mx-auto bg-white h-screen'>
        <TopBar />
        {/* chat track */}
        <div className='p-5 overflow-y-scroll h-[calc(100vh-200px)]'>
          {/* time */}
          <ChatTime />
          {/* chats */}
          {
            chats.map((chat, i) => {
              if (chat.msgType === 'select') {
                return <SelectChat key={i} chat={chat} submitFunc={handleSelectInput} />
              } else if (chat.msgType === 'yesNo') {
                return <YesNoChat key={i} />
              } else {
                return <Chat key={i} chat={chat} />
              }
            })
          }
          {/*  */}
          {/*  */}
          {/* <YesNoChat /> */}
          <div className='fixed bottom-4 bg-gray-200 -ml-5 w-full max-w-[500px] '>
            <hr />
            <div className='flex items-center '>
              <input type="text" value={msgInput} onChange={(e) => setMsgInput(e.target.value)} name="" id="" className='p-3 w-full bg-gray-200 focus:outline-none text-gray-600' placeholder='Write a message' />
              <PiPaperPlaneRightFill color='#2563eb' size={30} className='mr-7' onClick={() => sendChat(msgInput)} />
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  )
}
