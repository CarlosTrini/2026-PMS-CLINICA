import { useEffect, useRef } from "react";

type Trigger = 'click' | 'hover';
type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface Props {
    children: React.ReactNode;
    content: React.ReactNode | string;
    trigger?: Trigger
    autoclose?: boolean;
    position?: Position
}



export default function Tooltip({ children, content, trigger = "hover", position = 'top', autoclose = true }: Props) {

    const containerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const POSITION: Record<Position, string> = {
        top: 'bottom-full left-1/2 -translate-x-1/2 ',
        bottom: 'top-full left-1/2 -translate-x-1/2 ',
        left: 'right-full top-1/2 -translate-y-1/2 ',
        right: 'left-full top-1/2 -translate-y-1/2 ',

        'top-left': 'bottom-full left-0 ',
        'top-right': 'bottom-full right-0 ',
        'bottom-left': 'top-full left-0 ',
        'bottom-right': 'top-full right-0 ',
    };





    const showTooltip = () => {
        tooltipRef.current?.classList.toggle('invisible');
        tooltipRef.current?.classList.toggle('visible');

        if (!autoclose) return; // EL TOOLTIP NO SE CIERRA... HASTA QUE SE DE OTRO CLICK

        const timer = setTimeout(() => {
            tooltipRef.current?.classList.add('invisible');
            tooltipRef.current?.classList.remove('visible');
        }, 1500);

        return () => {
            clearTimeout(timer);
        }

    }

    useEffect(() => {
        if (trigger === 'click') {
            containerRef.current?.addEventListener('click', showTooltip);
        }

        return () => {
            containerRef.current?.removeEventListener('click', () => { showTooltip(); });
        }

    }, [trigger]);

    return (
        <>

            <div className="relative inline-flex w-fit group">
                <div
                    ref={tooltipRef}
                    className={`
                    absolute z-50 w-max max-w-64
                    rounded-md bg-black dark:bg-gray shadow-lg
                    ${POSITION[position]}
                    ${trigger === 'hover'
                            ? 'invisible opacity-0 group-hover:visible group-hover:opacity-100'
                            : 'invisible'
                        }
                    `}
                >
                    {typeof content === 'string' ? (
                        <p className="p-2 text-sm text-white">
                            {content}
                        </p>
                    ) : (
                        content
                    )}
                </div>

                <div
                    ref={containerRef}
                    className={trigger === 'click' ? 'cursor-pointer' : ''}
                >
                    {children}
                </div>
            </div>


            {/* <div className="relative group p-3">
                <div ref={tooltipRef} className={`absolute ${POSITION[position]}  bg-black z-100  rounded-md ${trigger == 'hover' ? 'invisible group-hover:visible' : 'invisible'} `}>
                    {
                        typeof content === 'string'
                            ? <p className=" text-sm p-2 text-white">{content}</p>
                            : content
                    }
                </div>

                <div ref={containerRef} className={`${trigger == 'click' && 'cursor-pointer'}`} >
                    {children}
                </div>
            </div> */}
        </>
    );
};

