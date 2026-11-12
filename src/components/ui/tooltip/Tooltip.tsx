import { XCircle } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Trigger = 'click' | 'hover';
type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface Props {
    children: React.ReactNode;
    content: React.ReactNode | string;
    trigger?: Trigger;
    autoclose?: boolean;
    showCloseIcon?: boolean;
    position?: Position;
}

const GAP = 8;     // separación entre trigger y tooltip
const MARGIN = 12; // margen mínimo contra los bordes de la ventana

// Calcula top/left (position: fixed) a partir del rect del trigger y del tooltip
function getCoords(pos: Position, t: DOMRect, tip: DOMRect) {
    const centerX = t.left + t.width / 2 - tip.width / 2;
    const centerY = t.top + t.height / 2 - tip.height / 2;
    const above = t.top - tip.height - GAP;
    const below = t.bottom + GAP;

    const map: Record<Position, { top: number; left: number }> = {
        top: { top: above, left: centerX },
        bottom: { top: below, left: centerX },
        left: { top: centerY, left: t.left - tip.width - GAP },
        right: { top: centerY, left: t.right + GAP },
        'top-left': { top: above, left: t.left },
        'top-right': { top: above, left: t.right - tip.width },
        'bottom-left': { top: below, left: t.left },
        'bottom-right': { top: below, left: t.right - tip.width },
    };

    return map[pos];
}

export default function Tooltip({ children, content, trigger = "hover", position = 'top', autoclose = false, showCloseIcon = true }: Props) {

    const containerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    // POSICIÓN: se calcula antes del paint para evitar "parpadeo"
    useLayoutEffect(() => {
        if (!isOpen || !containerRef.current || !tooltipRef.current) return;

        const t = containerRef.current.getBoundingClientRect();
        const tip = tooltipRef.current.getBoundingClientRect();

        // Auto-flip vertical / horizontal si no cabe
        let pos = position;
        if (pos.startsWith('top') && t.top - tip.height - GAP < MARGIN) pos = pos.replace('top', 'bottom') as Position;
        else if (pos.startsWith('bottom') && t.bottom + tip.height + GAP > window.innerHeight - MARGIN) pos = pos.replace('bottom', 'top') as Position;
        else if (pos === 'left' && t.left - tip.width - GAP < MARGIN) pos = 'right';
        else if (pos === 'right' && t.right + tip.width + GAP > window.innerWidth - MARGIN) pos = 'left';

        const { top, left } = getCoords(pos, t, tip);

        // Mantener siempre dentro de la pantalla
        setCoords({
            top: Math.max(MARGIN, Math.min(top, window.innerHeight - tip.height - MARGIN)),
            left: Math.max(MARGIN, Math.min(left, window.innerWidth - tip.width - MARGIN)),
        });
    }, [isOpen, position]);

    // EVENTOS: cerrar al hacer scroll/resize y (en modo click) al hacer click fuera
    useEffect(() => {
        if (!isOpen) return;

        const close = () => setIsOpen(false);
        const onClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (!containerRef.current?.contains(target) && !tooltipRef.current?.contains(target)) close();
        };

        window.addEventListener('scroll', close, true);
        window.addEventListener('resize', close);
        if (trigger === 'click') document.addEventListener('mousedown', onClickOutside);

        // Autocierre
        const timer = autoclose ? setTimeout(close, 2500) : undefined;

        return () => {
            window.removeEventListener('scroll', close, true);
            window.removeEventListener('resize', close);
            document.removeEventListener('mousedown', onClickOutside);
            if (timer) clearTimeout(timer);
        };
    }, [isOpen, trigger, autoclose]);

    const hoverProps = trigger === 'hover'
        ? { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) }
        : {};

    return (
        <div className="relative inline-flex w-fit" {...hoverProps}>
            {isOpen && (
                <div
                    ref={tooltipRef}
                    style={{ top: coords.top, left: coords.left }}
                    className="fixed z-99999 w-max max-w-64 p-2 rounded-md bg-black shadow-lg"
                >
                    {showCloseIcon && trigger == 'click' && (
                        <div className="flex justify-end mb-1.5">
                            <button type="button" onClick={() => setIsOpen(false)} className="text-error">
                                <XCircle className="size-4" />
                            </button>
                        </div>
                    )}

                    {typeof content === 'string'
                        ? <p className="p-2 text-sm font-medium text-light">{content}</p>
                        : content}
                </div>
            )}

            <div
                ref={containerRef}
                onClick={trigger === 'click' ? () => setIsOpen(prev => !prev) : undefined}
                className={trigger === 'click' ? 'cursor-pointer' : ''}
            >
                {children}
            </div>
        </div>
    );
}










// import { XCircle } from "lucide-react";
// import { useCallback, useEffect, useRef, useState } from "react";

// type Trigger = 'click' | 'hover';
// type Position = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

// interface Props {
//     children: React.ReactNode;
//     content: React.ReactNode | string;
//     trigger?: Trigger;
//     autoclose?: boolean;
//     showCloseIcon?: boolean;
//     position?: Position;
// }

// export default function Tooltip({ children, content, trigger = "hover", position = 'top', autoclose = false, showCloseIcon = true }: Props) {

//     const containerRef = useRef<HTMLDivElement>(null);
//     const tooltipRef = useRef<HTMLDivElement>(null);
//     const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//     const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
//     const [isOpen, setIsOpen] = useState(false);

//     const updatePosition = useCallback(() => {
//         if (!containerRef.current || !tooltipRef.current) return;

//         const containerRect = containerRef.current.getBoundingClientRect();
//         const tooltipRect = tooltipRef.current.getBoundingClientRect();
//         const gap = 8;
//         const margin = 12;

//         let pos = position;

//         // Auto-flip si choca con los bordes de la ventana
//         if (pos.includes('top') && containerRect.top - tooltipRect.height - gap < margin) {
//             pos = pos.replace('top', 'bottom') as Position;
//         } else if (pos.includes('bottom') && containerRect.bottom + tooltipRect.height + gap > window.innerHeight - margin) {
//             pos = pos.replace('bottom', 'top') as Position;
//         } else if (pos === 'left' && containerRect.left - tooltipRect.width - gap < margin) {
//             pos = 'right';
//         } else if (pos === 'right' && containerRect.right + tooltipRect.width + gap > window.innerWidth - margin) {
//             pos = 'left';
//         }

//         let top = 0;
//         let left = 0;

//         switch (pos) {
//             case 'top':
//                 top = containerRect.top - tooltipRect.height;// - gap;
//                 left = containerRect.left + containerRect.width / 2 - tooltipRect.width / 2;
//                 break;
//             case 'bottom':
//                 top = containerRect.bottom + gap;
//                 left = containerRect.left + containerRect.width / 2 - tooltipRect.width / 2;
//                 break;
//             case 'left':
//                 top = containerRect.top + containerRect.height / 2 - tooltipRect.height / 2;
//                 left = containerRect.left - tooltipRect.width;
//                 break;
//             case 'right':
//                 top = containerRect.top + containerRect.height / 2 - tooltipRect.height / 2;
//                 left = containerRect.right;// + gap;
//                 break;
//             case 'top-left':
//                 top = containerRect.top - tooltipRect.height;// - gap;
//                 left = containerRect.left;
//                 break;
//             case 'top-right':
//                 top = containerRect.top - tooltipRect.height;// - gap;
//                 left = containerRect.right - tooltipRect.width;
//                 break;
//             case 'bottom-left':
//                 top = containerRect.bottom;// + gap;
//                 left = containerRect.left;
//                 break;
//             case 'bottom-right':
//                 top = containerRect.bottom;// + gap;
//                 left = containerRect.right - tooltipRect.width;
//                 break;
//         }

//         // Mantener siempre dentro de los límites de la pantalla
//         top = Math.max(margin, Math.min(top, window.innerHeight - tooltipRect.height - margin));
//         left = Math.max(margin, Math.min(left, window.innerWidth - tooltipRect.width - margin));

//         setCoords({ top, left });
//     }, [position]);

//     useEffect(() => {
//         if (!isOpen) return;

//         // Calcular coordenadas apenas se renderiza visible
//         updatePosition();

//         const handleScrollOrResize = () => updatePosition();
//         window.addEventListener('scroll', handleScrollOrResize, true);
//         window.addEventListener('resize', handleScrollOrResize);

//         return () => {
//             window.removeEventListener('scroll', handleScrollOrResize, true);
//             window.removeEventListener('resize', handleScrollOrResize);
//         };
//     }, [isOpen, updatePosition]);

//     const handleToggleClick = () => {
//         if (timerRef.current) clearTimeout(timerRef.current);

//         setIsOpen((prev) => {
//             const next = !prev;
//             if (next && autoclose) {
//                 timerRef.current = setTimeout(() => {
//                     setIsOpen(false);
//                 }, 2500);
//             }
//             return next;
//         });
//     };

//     useEffect(() => {
//         return () => {
//             if (timerRef.current) clearTimeout(timerRef.current);
//         };
//     }, []);


//     // RENDERS
//     const CloseIcon = () => (
//         <div className=" flex items-center justify-end mb-1.5">
//             <button
//                 onClick={() => setIsOpen(prev => !prev)}
//                 className="text-error hover:text-error"><XCircle className="w-4 h-4" /></button>
//         </div>
//     );

//     return (
//         <div
//             className="relative inline-flex w-fit"
//             onMouseEnter={trigger === 'hover' ? () => setIsOpen(true) : undefined}
//             onMouseLeave={trigger === 'hover' ? () => setIsOpen(false) : undefined}
//         // onMouseLeave={() => setIsOpen(false)}
//         >
//             {/* Tooltip Content */}
//             {isOpen && (
//                 <div
//                     ref={tooltipRef}
//                     style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
//                     className="p-2 bg-black fixed z-99999 w-max max-w-64 rounded-md  shadow-lg pointer-events-auto"
//                 >
//                     {showCloseIcon && <CloseIcon />}

//                     {typeof content === 'string' ? (
//                         <p className="text-sm font-medium text-light p-2  bg-gray-light dark:bg-gray rounded-md">
//                             {content}
//                         </p>
//                     ) : (

//                         content

//                     )}
//                 </div>
//             )}

//             <div
//                 ref={containerRef}
//                 onClick={trigger === 'click' ? handleToggleClick : undefined}
//                 className={`${trigger === 'click' ? 'cursor-pointer' : ''}`}
//             >
//                 {children}
//             </div>
//         </div>
//     );
// }