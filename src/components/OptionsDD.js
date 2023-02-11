import { React, Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChromePicker } from 'react-color';
import { useNavigate  } from "react-router-dom";
export default function OptionsDD({
  color,
  handleColorChange
}) {
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-100 bg-white px-2 py-1 text-xs font-light text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          Options
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-max origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
                <div
                  className='block px-2 py-1 text-sm hover:bg-gray-50 cursor-pointer'
                  onClick={()=>navigate("/Boss_Scheduler/userselect")}
                >
                  Change Name
                </div>
            </Menu.Item>

          </div>
          <div className="py-1">
                <div className='flex flex-col px-2 py-1 text-xs'>
                  <div className="flex py-2 items-center">
                    <div>Color</div>
                  <div className="w-10 h-5 rounded ml-2"style={{background: color}}></div>

                  </div>
                  <ChromePicker 
                    color={color}
                    onChangeComplete={handleColorChange}
                  />
                </div>
          </div>
          
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
