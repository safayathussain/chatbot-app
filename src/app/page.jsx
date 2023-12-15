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
import FileInput from './components/FileInput';
import toast, { Toaster } from 'react-hot-toast';
let selectedIssue = '';
export default function Home() {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [chats, setChats] = useState([])
  const [myChatsCount, setMyChatsCount] = useState(0)
  const [msgInput, setMsgInput] = useState('')
  // const [selectedIssue, setSelectedIssue] = useState('')
  const chatTrackRef = useRef(null);
  const ques = {
    DomesticAbuse: {
      ques: [
        'Has your partner ever told you how to dress or how to spend your money?',
        'Has your partner ever threatened you or harmed you? If so, please provide details below.',
        'Do you have any safety concerns? If so, please dial 999.',
        'Have there been past instances of domestic abuse? If yes, have you reported it?',
        'Please attach any relevant images or files.'
      ]
    },
    DivorceSeparation: {
      ques: [
        'What are the primary grounds for filing for divorce or separation?',
        'Are there any children involved? If so, are there any desired custody arrangements?',
        'Would you be open to negotiation or other resolution options?',
        'What assets and debts collectively belong to the marital estate?',
        'Please attach any relevant images or files.'
      ]
    },
    ChildAbductionProtection: {
      ques: [
        'Are there any concerns for the safety of the child?',
        'Do you have any witnesses?',
        'Are there any parenting agreements or custody orders at present?',
        'Please provide more information to help us better understand your situation.',
        'Please attach any relevant images or files.'
      ]
    },
    FinancialDisputesSettlement: {
      ques: [
        'Briefly explain the breakdown of assets and liabilities of both parties.',
        'What is the annual salary of each party involved, this should include all bonuses and other revenue sources?',
        'Were there or are there any joint accounts?',
        'Were there any financial responsibilities that were assigned to each party? If so, were they fulfilled?',
        'Please attach any relevant images or files.'
      ]
    },
    InheritancePreMaritalAgreement: {
      ques: [
        'Have you discussed pre-marital agreement or inheritance with your spouse?',
        'Have you maintained all legal documents relating to inheritance or copies of the pre-marital agreement?',
        'Have you previously consulted with legal professionals regarding your predicament?',
        'Do you have any children? If so, have you considered all provisions in the pre-marital agreement or inheritance distribution?',
        'Please attach any relevant images or files.'
      ]
    },
    AdoptionChildcare: {
      ques: [
        'What is the condition of your adoption or childcare?',
        'What legal steps need to be taken for the finalisation of the adoption or child-care?',
        'Have you completed the necessary legal documentation?',
        'Can you provide some background information? This should include any medical records, social and psychological history.',
        'Please attach any relevant images or files.'
      ]
    },
    Surrogacy: {
      ques: [
        'Have the prospective parents and the surrogate undertaken the necessary medical and psychological testing?',
        'Have there been any arrangements made to compensate for the surrogate which will cover related expenses.',
        'Do you have alternative plans in place in case of unforeseen circumstances or future conflicts?',
        'If necessary, how may the surrogates parental rights be terminated?',
        'Please attach any relevant images or files.'
      ]
    },
    LegalAid: {
      ques: [
       'Can you briefly describe the legal matter for which you are seeking assistance?',
       'To determine your eligibility for legal aid, could you provide a general overview of your financial situation?',
       'Have you previously consulted any legal professionals regarding this matter?',
       'Please provide more information to help us better understand your situation.',
       'Please attach any relevant images or files.'
      ]
    }
  }
  const staticQues = [
    'What is your date of birth?',
    'Can you provide a safe telephone number ?',
    'Can you provide a safe email address ?',
    'Please use the slider to select the deadline .',
    'Please select which sectors of law your issue pertains to',
  ]
  const getResponse = (type, msg = '', options = []) => {
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
    if (myChatsCount < 10) {
      if (myChatsCount < 5) {
        getResponse('', staticQues[myChatsCount])
      } else {
        if (selectedIssue) {
          getResponse('', ques[selectedIssue].ques[myChatsCount - 5])
        }

      }
    console.log('jo', myChatsCount)

      if (myChatsCount === 4) {
        setTimeout(() => {
          setMyChatsCount(myChatsCount + 1)
          setChats(prevChats => {
            const newChats = [...prevChats, {
              msg: 'Select your issues',
              msgType: 'select',
              options: ['Domestic Abuse', 'Divorce & separation', 'Child Abduction & Protection', 'Financial Disputes & Settlement', 'Inheritance & Pre-marital Agreement', 'Adoption & Childcare', 'Surrogacy', 'Legal Aid & Other'],
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
      if (myChatsCount === 7) {

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
      if (myChatsCount === 9) {

        setTimeout(() => {
          setMyChatsCount(myChatsCount + 1)
          setChats(prevChats => {
            const newChats = [...prevChats, {
              msgType: 'file',
              msg: 'Select a file',
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
    const issues = [
      {
        title: 'Domestic Abuse',
        tag: 'DomesticAbuse'
      },
      {
        title: 'Divorce & separation',
        tag: 'DivorceSeparation'
      },
      {
        title: 'Child Abduction & Protection',
        tag: 'ChildAbductionProtection'
      },
      {
        title: 'Financial Disputes & Settlement',
        tag: 'FinancialDisputesSettlement'
      },
      {
        title: 'Inheritance & Pre-marital Agreement',
        tag: 'InheritancePreMaritalAgreement'
      },
      {
        title: 'Adoption & Childcare',
        tag: 'AdoptionChildcare'
      },
      {
        title: 'Surrogacy',
        tag: 'Surrogacy'
      },
      {
        title: 'Legal Aid & Other ',
        tag: 'LegalAid&Other'
      },
    ]
    issues.map(issue => {
      if (issue.title === items[0]) {
        selectedIssue = issue.tag
        console.log(selectedIssue, 'hlw')
      }
    })
    setMyChatsCount(myChatsCount + 1)
    sendChat(items[0])
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
    <div className='bg-gray-100 w-screen h-screen !overflow-hidden'>
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
              } else if (chat.msgType === 'file') {
                return <FileInput key={i} chat={chat} />
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
            myChatsCount === 10 &&
            <div className='flex mb-2 mt-10 justify-center'>
              <button className='text-sm px-5 py-2 rounded-md bg-gray-200 text-md text-black' onClick={() => toast.success('Submitted your information')}>Submit</button>
            </div>
          }
          {
            myChatsCount === 10 ? <div className='text-black p-5 text-center bg-gray-200 fixed bottom-0 max-w-[500px] -ml-5 w-full'>
              Powered by Team17
            </div> :
              <div className='fixed bottom-4 bg-gray-200 -ml-5 w-full max-w-[500px] '>
                <hr />
                <div className='flex items-center '>
                  <input type="text" value={msgInput} onChange={(e) => setMsgInput(e.target.value)} name="" id="" className='p-3 w-full bg-gray-200 focus:outline-none text-gray-600' placeholder='Write a message' />
                  <button onClick={() => sendChat(msgInput)} disabled={msgInput === ''}>
                    <PiPaperPlaneRightFill color='#2563eb' size={30} className='mr-7' />

                  </button>
                </div>
                <hr />
              </div>
          }
        </div>
      </div>
      <div><Toaster /></div>
    </div>
  )
}
