import React from 'react'

const RangeChat = () => {
    return (
        <div className='flex justify-end'>
            <div className='bg-lime-500 rounded-md w-max max-w-[250px] p-3 mt-3'>
                <div className='flex justify-between text-xs -mb-2'>
                    <div>
                        1
                    </div>
                    <div>
                        10
                    </div>
                </div>
                <input type="range" min={0} max={10} step={1} />
            </div>
        </div>
    )
}

export default RangeChat