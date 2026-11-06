import { useCallback, useEffect, useRef, useState } from "react";

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
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [isOpen, setIsOpen] = useState(false);

    const updatePosition = useCallback(() => {
        if (!containerRef.current || !tooltipRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const gap = 8;
        const margin = 12;

        let pos = position;

        // Auto-flip si choca con los bordes de la ventana
        if (pos.includes('top') && containerRect.top - tooltipRect.height - gap < margin) {
            pos = pos.replace('top', 'bottom') as Position;
        } else if (pos.includes('bottom') && containerRect.bottom + tooltipRect.height + gap > window.innerHeight - margin) {
            pos = pos.replace('bottom', 'top') as Position;
        } else if (pos === 'left' && containerRect.left - tooltipRect.width - gap < margin) {
            pos = 'right';
        } else if (pos === 'right' && containerRect.right + tooltipRect.width + gap > window.innerWidth - margin) {
            pos = 'left';
        }

        let top = 0;
        let left = 0;

        switch (pos) {
            case 'top':
                top = containerRect.top - tooltipRect.height - gap;
                left = containerRect.left + containerRect.width / 2 - tooltipRect.width / 2;
                break;
            case 'bottom':
                top = containerRect.bottom + gap;
                left = containerRect.left + containerRect.width / 2 - tooltipRect.width / 2;
                break;
            case 'left':
                top = containerRect.top + containerRect.height / 2 - tooltipRect.height / 2;
                left = containerRect.left - tooltipRect.width - gap;
                break;
            case 'right':
                top = containerRect.top + containerRect.height / 2 - tooltipRect.height / 2;
                left = containerRect.right + gap;
                break;
            case 'top-left':
                top = containerRect.top - tooltipRect.height - gap;
                left = containerRect.left;
                break;
            case 'top-right':
                top = containerRect.top - tooltipRect.height - gap;
                left = containerRect.right - tooltipRect.width;
                break;
            case 'bottom-left':
                top = containerRect.bottom + gap;
                left = containerRect.left;
                break;
            case 'bottom-right':
                top = containerRect.bottom + gap;
                left = containerRect.right - tooltipRect.width;
                break;
        }

        // Mantener siempre dentro de los límites de la pantalla
        top = Math.max(margin, Math.min(top, window.innerHeight - tooltipRect.height - margin));
        left = Math.max(margin, Math.min(left, window.innerWidth - tooltipRect.width - margin));

        setCoords({ top, left });
    }, [position]);

    useEffect(() => {
        if (!isOpen) return;

        // Calcular coordenadas apenas se renderiza visible
        updatePosition();

        const handleScrollOrResize = () => updatePosition();
        window.addEventListener('scroll', handleScrollOrResize, true);
        window.addEventListener('resize', handleScrollOrResize);

        return () => {
            window.removeEventListener('scroll', handleScrollOrResize, true);
            window.removeEventListener('resize', handleScrollOrResize);
        };
    }, [isOpen, updatePosition]);

    const handleToggleClick = () => {
        if (timerRef.current) clearTimeout(timerRef.current);

        setIsOpen((prev) => {
            const next = !prev;
            if (next && autoclose) {
                timerRef.current = setTimeout(() => {
                    setIsOpen(false);
                }, 2500);
            }
            return next;
        });
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <div
            className="relative inline-flex w-fit"
            onMouseEnter={trigger === 'hover' ? () => setIsOpen(true) : undefined}
            onMouseLeave={trigger === 'hover' ? () => setIsOpen(false) : undefined}
        >
            {isOpen && (
                <div
                    ref={tooltipRef}
                    style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
                    className="fixed z-99999 w-max max-w-64 rounded-md bg-black dark:bg-gray shadow-lg pointer-events-auto"
                >
                    {typeof content === 'string' ? (
                        <p className="p-2 text-sm text-light">
                            {content}
                        </p>
                    ) : (
                        content
                    )}
                </div>
            )}

            <div
                ref={containerRef}
                onClick={trigger === 'click' ? handleToggleClick : undefined}
                className={trigger === 'click' ? 'cursor-pointer' : ''}
            >
                {children}
            </div>
        </div>
    );
}

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


