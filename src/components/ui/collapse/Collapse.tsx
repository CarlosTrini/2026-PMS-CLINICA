import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

interface Props {
    children: React.ReactNode;
    title?: string;
    positionOpenBtn?: 'left' | 'right';
    defaultOpen?: boolean;
    collapseClassName?: string;
    bodyClassName?: string;
    maxHeightClassName?: string;
    contentHeader?: React.ReactNode;
}


const POSITION_OPEN_BUTTON = {
    left: 'order-0',
    right: 'order-2  justify-end',
}



export default function Collapse({ contentHeader, children, title = '', positionOpenBtn = 'left', defaultOpen = false, collapseClassName = '', bodyClassName = '', maxHeightClassName = '' }: Props): React.ReactElement {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const buttonClass = `w-full flex items-center text-theme-light-gray  gap-2`;
    const collapseClass = `${collapseClassName || 'generic-border-shadow rounded-lg  bg-theme-light-dark'}`;
    const bodyClass = `${bodyClassName || ''}`;
    const maxHeightClass = maxHeightClassName ? maxHeightClassName : 'max-h-500';

    return (
        <div className={collapseClass}>
            <header className={`p-4 w-full flex gap-2 ${positionOpenBtn === 'right' ? 'justify-end' : 'justify-start'}`}>
                <div className={`w-fit  ${POSITION_OPEN_BUTTON[positionOpenBtn]}`}>
                    <button className={`${buttonClass}`} onClick={() => setIsOpen(!isOpen)}>
                        <span className="font-bold">
                            {title}
                        </span>
                        {isOpen ? <ChevronUp className="text-theme-light-gray" /> : <ChevronDown className="text-theme-light-gray" />}
                    </button>
                </div>
                {
                    contentHeader && (
                        <div className={`w-full order-1 `}>
                            {contentHeader}
                        </div>
                    )
                }
            </header>

            <section className={`${bodyClass} 
            transition-all duration-300 ease-in-out transform origin-top
            ${isOpen
                    ? `opacity-100 scale-y-100 ${maxHeightClass} pb-5 visible overflow-y-auto`
                    : 'opacity-0 scale-y-0 max-h-0 pb-0 invisible overflow-hidden'
                } border-t border-gray-light dark:border-gray-dark px-5 overflow-hidden`}>
                {children}
            </section>
        </div>
    )
}