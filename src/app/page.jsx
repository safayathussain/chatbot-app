"use client"
import Image from 'next/image'
import { PiPaperPlaneRightFill } from "react-icons/pi";
import TopBar from './components/TopBar';
import ChatTime from './components/ChatTime';
import Chat from './components/Chat';
import SelectChat from './components/SelectChat';
import YesNoChat from './components/YesNoChat';
import { useEffect, useRef, useState } from 'react';
import RangeChat from './components/RangeChat';
export default function Home() {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [chats, setChats] = useState([])
  const [myChatsCount, setMyChatsCount] = useState(0)
  const [msgInput, setMsgInput] = useState('')
  const chatTrackRef = useRef(null);
  const staticQues = [
    'What is your date of birth?',
    'Can you provide a safe telephone number ?',
    'Can you provide a safe email address ?',
    'Please use the slider to select priority.',
    'Please select which sectors of law your issue pertains to',
    'Briefly explain the breakdown of assets and liabilities of both parties.',
    'What is the annual salary of each party involved, this should include all bonuses and other revenue sources?',
    'Were there any financial responsibilities that were assigned to each party? If so, were they fulfilled?',
    'Were there or are there any joint accounts ?',
    'Please provide more information to help us better understand your situation.',
    'Please attach any relevant images or files.'
  ]
  const getResponse = (type, msg = '', options = []) => {
    if (myChatsCount === 5) {

    }
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
            // options: ['Domestic Abuse', 'Divorce & separation'],
            options,
            auth: 'ai'
          }];
          return newChats;
        });

      } else {
        setChats(prevChats => {
          const newChats = [...prevChats, {
            msg,
            auth: 'ai'
          }];
          return newChats;
        });
      }
    }, 200);
  }
  const sendChat = (msg) => {
    setChats(prevChats => {
      const newChats = [...prevChats, { msg, auth: 'me' }];
      return newChats;
    });
    setMsgInput('')
    setMyChatsCount(myChatsCount + 1)
    // if ((Math.floor(Math.random() * 10)) / 2 === 0) {
    //   getResponse('select')
    // } else if ((Math.floor(Math.random() * 10)) / 3 === 0) {
    //   getResponse('yesNo')
    // } else {
    //   getResponse()
    // }

    if (myChatsCount < 11) {
      getResponse('', staticQues[myChatsCount])
      if (myChatsCount === 4) {

        setTimeout(() => {
          setMyChatsCount(myChatsCount + 1)
          setChats(prevChats => {
            const newChats = [...prevChats, {
              msg: 'Select your issues',
              msgType: 'select',
              options: ['Domestic Abuse', 'Divorce & separation'],
              // options,
              auth: 'ai'
            }];
            return newChats;
          });

        }, 500);
      }
      if (myChatsCount === 3) {

        setTimeout(() => {
          setMyChatsCount(myChatsCount + 1)
          setChats(prevChats => {
            const newChats = [...prevChats, {
              msg: 'Select your issues',
              msgType: 'range',
              range: [1, 10],
              auth: 'ai'
            }];
            return newChats;
          });
        }, 500);
      }
      if (myChatsCount === 8) {

        setTimeout(() => {
          setMyChatsCount(myChatsCount + 1)
          setChats(prevChats => {
            const newChats = [...prevChats, {
              msgType: 'yesNo',
              msg: 'please select yes or no',
              auth: 'me'
            }];
            return newChats;
          });
        }, 500);
      }
      console.log(myChatsCount)
    }
  }
  const handleSelectInput = (items) => {
    console.log(items)
    sendChat(items.join(', '))
    // getResponse('yesNo')
  }
  const handleYesNoInput = (data) => {
    console.log(data)
    sendChat(data ? 'Yes' : 'No')
  }
  const handleRangeFunc = (value) => {
    sendChat(value)
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
              } else if (chat.msgType === 'range') {
                return <RangeChat submitFunc={handleRangeFunc} key={i} chat={chat} />
              } else {
                return <Chat key={i} chat={chat} />
              }
            })
          }

          {/* main */}
          {/* {
            chats.map((chat, i) => {
              if (chat.msgType === 'select') {
                return <SelectChat key={i} chat={chat} submitFunc={handleSelectInput} />
              } else if (chat.msgType === 'yesNo') {
                return <YesNoChat key={i} submitFunc={handleYesNoInput} />
              } else {
                return <Chat key={i} chat={chat} />
              }
            })
          } */}
          {
            myChatsCount === 12 &&
            <div className='flex mb-2 mt-10 justify-center'>
              <button className='text-sm px-2 py-1 rounded-sm bg-gray-300 text-black'>Submit</button>
            </div>
          }
          {
            myChatsCount === 12 ? <div className='text-black p-5 text-center bg-gray-200 fixed bottom-0 max-w-[500px] -ml-5 w-full'>
              Powered by Team17
            </div> :
              <div className='fixed bottom-4 bg-gray-200 -ml-5 w-full max-w-[500px] '>
                <hr />
                <div className='flex items-center '>
                  <input type="text" value={msgInput} onChange={(e) => setMsgInput(e.target.value)} name="" id="" className='p-3 w-full bg-gray-200 focus:outline-none text-gray-600' placeholder='Write a message' />
                  <button onClick={() => sendChat(msgInput)} disabled={msgInput === ''}>
                  <PiPaperPlaneRightFill color='#2563eb' size={30} className='mr-7'  />

                  </button>
                </div>
                <hr />
              </div>
          }
        </div>
      </div>
    </div>
  )
}
