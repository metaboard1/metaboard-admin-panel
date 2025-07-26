'use client';

import React, { ReactElement, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface props {
    label?: string;
    value?: string;
    anchor?: React.ReactElement;
    children?: React.ReactNode;
}
const Dropdown = ({
    label,
    value,
    anchor,
    children
}: props) => {

    const [dropdownData, setDropDownData] = useState({
        isVisible: false,
        selectedValue: ''
    });

    const handleDataChange = (key: string, value: boolean | string) => {
        setDropDownData((prevData) => ({
            ...prevData,
            [key]: value
        }));
    }
    return (
        <div className={`relative inline-block text-left ${anchor ? '' : 'w-1/1'}`}>

            {
                !anchor ?
                    <>
                        {
                            label &&
                            <label className="block text-sm/6 font-medium text-gray-900">{label}</label>
                        }

                        <button
                            type="button"
                            className="mt-2 inline-flex  w-full justify-between items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                            onClick={() => handleDataChange('isVisible', !dropdownData.isVisible)}
                            aria-expanded={dropdownData.isVisible}
                            aria-haspopup="true"
                        >
                            {dropdownData.selectedValue || 'Select'}
                            <ChevronDown size={17} className="text-gray-400 transition-transform duration-200 ease-in-out" />
                        </button>
                    </>
                    :
                    <button
                        type="button"
                        className=""
                        onClick={() => handleDataChange('isVisible', !dropdownData.isVisible)}
                        aria-expanded={dropdownData.isVisible}
                        aria-haspopup="true"
                    >
                        {anchor}
                    </button>

            }

            <div
                className={`absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition-all duration-200 z-50 ${dropdownData.isVisible
                    ? 'opacity-100 scale-100 visible'
                    : 'opacity-0 scale-95 invisible pointer-events-none'
                    }`}
            >
                <div className="py-1" role="none">
                    {React.Children.map(children, (child, index) => {
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child as ReactElement<{ onClick?: (e: React.MouseEvent) => void }>, {
                                onClick: (e: React.MouseEvent) => {
                                    setDropDownData(() => ({
                                        isVisible: false,
                                        // @ts-ignore
                                        selectedValue: child?.props?.name
                                    }))
                                    // @ts-ignore
                                    child?.props?.onClick?.(e);
                                },
                                key: child.key ?? index,
                            });
                        }
                        return child;
                    })}
                    {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Account settings
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => console.log("okk")}>
                        Support
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        License
                    </a>
                    <button
                        type="submit"
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Sign out
                    </button> */}
                </div>
            </div>
        </div>
    );
}
export default Dropdown;
