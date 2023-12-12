"use client"
import Image from 'next/image'
import { PiPaperPlaneRightFill } from "react-icons/pi";
import TopBar from './components/TopBar';
import ChatTime from './components/ChatTime';
import Chat from './components/Chat';
import SelectChat from './components/SelectChat';
import YesNoChat from './components/YesNoChat';
import { useEffect, useRef, useState } from 'react';
export default function Home() {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [chats, setChats] = useState([])
  const [myChatsCount, setMyChatsCount] = useState(0)
  const [msgInput, setMsgInput] = useState('')
  const chatTrackRef = useRef(null);
  const getResponse = (type) => {
    setTimeout(() => {
      if (type === 'yesNo') {
        setChats(prevChats => {
          const newChats = [...prevChats, {
            msgType: 'yesNo',
            msg: 'please select yes or no',
            auth: 'ai'
          }];
          return newChats;
        });
      } else if (type === 'select') {
        setChats(prevChats => {
          const newChats = [...prevChats, {
            msg: 'Select your issues',
            msgType: 'select',
            options: ['Domestic Abuse', 'Divorce & separation'],
            auth: 'ai'
          }];
          return newChats;
        });

      } else {
        setChats(prevChats => {
          const newChats = [...prevChats, {
            msg: 'Hope you enjoying',
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
    if ((Math.floor(Math.random() * 10)) / 2 === 0) {
      getResponse('select')
    } else if ((Math.floor(Math.random() * 10)) / 3 === 0) {
      getResponse('yesNo')
    } else {
      getResponse()
    }
  }
  const handleSelectInput = (items) => {
    console.log(items)
    getResponse('yesNo')
  }
  const handleYesNoInput = (data) => {
    console.log(data)
    getResponse('select')
  }
  useEffect(() => {
    // Scroll to the bottom when messages change
    chatTrackRef.current.scrollTop = chatTrackRef.current.scrollHeight;
  }, [chats.length]);
  const welcomeUser = () => {
    return <>
      <Chat chat={
        {
          msg: `Hello, Welcome to Beck Fitzgerald.
        
        By continuing, you agree to having your personal data and provided information processed as described in our privacy policy.
        `,
          auth: 'ai'
        }
      } />
      <Chat chat={
        {
          msg: `Please provide the following details below:`,
          auth: 'ai'
        }
      } />
      <Chat chat={
        {
          msg: `What is your Name?`,
          auth: 'ai'
        }
      } />
    </>
  }
  return (
    <div className='bg-gray-100 w-screen h-screen overflow-hidden'>
      <div className='max-w-[500px] mx-auto bg-white h-screen'>
        <TopBar liked={liked} disliked={disliked} setDisliked={setDisliked} setLiked={setLiked} />
        {/* chat track */}
        <div ref={chatTrackRef} className='p-5 overflow-y-scroll h-[calc(100vh-200px)]'>
          {/* time */}
          <ChatTime />

          {welcomeUser()}
          {/* chats */}
          {
            chats.length === 0 && <p className='text-center text-gray-600 text-xl mt-10'>Start chating</p>
          }
          {
            chats.map((chat, i) => {
              if (chat.msgType === 'select') {
                return <SelectChat key={i} chat={chat} submitFunc={handleSelectInput} />
              } else if (chat.msgType === 'yesNo') {
                return <YesNoChat key={i} submitFunc={handleYesNoInput} />
              } else {
                return <Chat key={i} chat={chat} />
              }
            })
          }
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
