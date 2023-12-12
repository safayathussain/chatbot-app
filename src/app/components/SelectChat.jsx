import React, { useState } from 'react'

const SelectChat = ({chat, submitFunc}) => {
  const { msg, options, auth } = chat;
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.name;
    const isChecked = event.target.checked;
    setSelectedItems((prevSelectedItems) => {
      if (isChecked) {
        return [...prevSelectedItems, value]; 
      } else {
        return prevSelectedItems.filter((item) => item !== value);
      }
    });
  };
  return (
    <div>
      <div className={`mt-5 flex justify-end`}>
        <div className='p-3 bg-lime-500 w-max max-w-[250px] rounded-md'>
          <p className='text-black text-sm mb-3'>{msg}:</p>
          <div className='bg-white p-2 rounded-md'>
            {
              options.map(item => {
                return <>
                  <div className="relative flex items-start w-full my-1">
                    <div className="flex items-center h-5">
                      <input onChange={handleCheckboxChange} id={item.replace(' ', '')} name={item} type="checkbox" className="border-gray-200 rounded disabled:opacity-50 " />
                    </div>
                    <label htmlFor={item.replace(' ', '')} className="ms-2 block w-full text-sm text-black">
                      {item}
                    </label>
                  </div>
                  <hr />
                </>
              })
            }
          </div>
          {/* <div className='flex justify-center'>
            <button onClick={() => submitFunc(selectedItems)} className='px-3 mt-2 py-1 bg-white text-lime-600 rounded-md'>
              submit
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default SelectChat