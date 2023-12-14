import React, { useState } from 'react'
import { FaArrowCircleRight } from "react-icons/fa";

const RangeChat = ({ submitFunc }) => {
    const [value, setValue] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    return (
        <div className='flex justify-end'>
            <div className='bg-lime-500 rounded-md w-max max-w-[250px] p-3 mt-3'>
                <div className='flex justify-between text-xs -mb-2'>
                    <div>
                        1
                    </div>
                    <div>
                        30
                    </div>
                </div>
                <input type="range" disabled={submitted} onChange={(e) => setValue(e.target.value)} value={value} min={0} max={30} step={1} />
                {
                    !submitted &&
                    <div className='flex justify-end'>
                        <p onClick={() => {
                            submitFunc(value)
                            setSubmitted(true)
                        }} className='text-white'>
                            <FaArrowCircleRight size={20} />
                        </p>

                    </div>
                }
            </div>
        </div>
    )
}

export default RangeChat
