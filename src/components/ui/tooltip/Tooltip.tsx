import { useEffect, useRef, useState } from "react";

type Trigger = 'click' | 'hover';
type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface Props {
    children: React.ReactNode;
    content: React.ReactNode | string;
    trigger?: Trigger;
    autoclose?: boolean;
    position?: Position;
}

export default function Tooltip({ children, content, trigger = "hover", position = 'top', autoclose = true }: Props) {

    const containerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [actualPosition, setActualPosition] = useState<Position>(position);

    useEffect(() => {
        setActualPosition(position);
    }, [position]);

    const POSITION: Record<Position, string> = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 me-2',
        right: 'left-full top-1/2 -translate-y-1/2 ms-2',

        'top-left': 'bottom-full left-0 mb-2',
        'top-right': 'bottom-full right-0 mb-2',
        'bottom-left': 'top-full left-0 mt-2',
        'bottom-right': 'top-full right-0 mt-2',
    };

    const checkPosition = () => {
        if (!containerRef.current || !tooltipRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const margin = 12;

        let newPos = position;

        // Si va hacia arriba pero choca arriba -> cambiar a abajo
        if (position.includes('top') && containerRect.top - tooltipRect.height - margin < 0) {
            newPos = position.replace('top', 'bottom') as Position;
        }
        // Si va hacia abajo pero choca abajo -> cambiar a arriba
        else if (position.includes('bottom') && containerRect.bottom + tooltipRect.height + margin > window.innerHeight) {
            newPos = position.replace('bottom', 'top') as Position;
        }
        // Si va a la izquierda pero choca a la izquierda -> cambiar a la derecha
        else if (position.includes('left') && containerRect.left - tooltipRect.width - margin < 0) {
            newPos = position.replace('left', 'right') as Position;
        }
        // Si va a la derecha pero choca a la derecha -> cambiar a la izquierda
        else if (position.includes('right') && containerRect.right + tooltipRect.width + margin > window.innerWidth) {
            newPos = position.replace('right', 'left') as Position;
        }

        setActualPosition(newPos);
    };

    const showTooltip = () => {
        checkPosition();
        tooltipRef.current?.classList.toggle('invisible');
        tooltipRef.current?.classList.toggle('visible');

        if (!autoclose) return;

        const timer = setTimeout(() => {
            tooltipRef.current?.classList.add('invisible');
            tooltipRef.current?.classList.remove('visible');
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    };

    useEffect(() => {
        const container = containerRef.current;
        if (trigger === 'click' && container) {
            container.addEventListener('click', showTooltip);
        }

        return () => {
            if (container) {
                container.removeEventListener('click', showTooltip);
            }
        };
    }, [trigger, actualPosition]);

    return (
        <div
            className="relative inline-flex w-fit group"
            onMouseEnter={trigger === 'hover' ? checkPosition : undefined}
        >
            <div
                ref={tooltipRef}
                className={`
                absolute z-50 w-max max-w-64
                rounded-md bg-black dark:bg-gray shadow-lg pointer-events-auto
                ${POSITION[actualPosition]}
                ${trigger === 'hover'
                        ? 'invisible opacity-0 group-hover:visible group-hover:opacity-100  transition-opacity duration-150'
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
    );
};

// ==========================================
// RESPALDO ORIGINAL
// ==========================================
// import { useEffect, useRef } from "react";

// type Trigger = 'click' | 'hover';
// type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

// interface Props {
//     children: React.ReactNode;
//     content: React.ReactNode | string;
//     trigger?: Trigger
//     autoclose?: boolean;
//     position?: Position
// }

// export default function Tooltip({ children, content, trigger = "hover", position = 'top', autoclose = true }: Props) {

//     const containerRef = useRef<HTMLDivElement>(null);
//     const tooltipRef = useRef<HTMLDivElement>(null);

//     const POSITION: Record<Position, string> = {
//         top: 'bottom-full left-1/2 -translate-x-1/2 ',
//         bottom: 'top-full left-1/2 -translate-x-1/2 ',
//         left: 'right-full top-1/2 -translate-y-1/2 ',
//         right: 'left-full top-1/2 -translate-y-1/2 ',

//         'top-left': 'bottom-full left-0 ',
//         'top-right': 'bottom-full right-0 ',
//         'bottom-left': 'top-full left-0 ',
//         'bottom-right': 'top-full right-0 ',
//     };

//     const showTooltip = () => {
//         tooltipRef.current?.classList.toggle('invisible');
//         tooltipRef.current?.classList.toggle('visible');

//         if (!autoclose) return; // EL TOOLTIP NO SE CIERRA... HASTA QUE SE DE OTRO CLICK

//         const timer = setTimeout(() => {
//             tooltipRef.current?.classList.add('invisible');
//             tooltipRef.current?.classList.remove('visible');
//         }, 1500);

//         return () => {
//             clearTimeout(timer);
//         }
//     }

//     useEffect(() => {
//         if (trigger === 'click') {
//             containerRef.current?.addEventListener('click', showTooltip);
//         }

//         return () => {
//             containerRef.current?.removeEventListener('click', () => { showTooltip(); });
//         }
//     }, [trigger]);

//     return (
//         <>
//             <div className="relative inline-flex w-fit group">
//                 <div
//                     ref={tooltipRef}
//                     className={`
//                     absolute  w-max max-w-64
//                     rounded-md bg-black dark:bg-gray shadow-lg
//                     ${POSITION[position]}
//                     ${trigger === 'hover'
//                             ? 'invisible opacity-0 group-hover:visible group-hover:opacity-100'
//                             : 'invisible'
//                         }
//                     `}
//                 >
//                     {typeof content === 'string' ? (
//                         <p className="p-2 text-sm text-white">
//                             {content}
//                         </p>
//                     ) : (
//                         content
//                     )}
//                 </div>

//                 <div
//                     ref={containerRef}
//                     className={trigger === 'click' ? 'cursor-pointer' : ''}
//                 >
//                     {children}
//                 </div>
//             </div>
//         </>
//     );
// };


