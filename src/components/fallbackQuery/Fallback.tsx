import { Loader2, SplinePointer } from 'lucide-react';
import Image from 'next/image';
// import { useState, useEffect } from 'react';

interface Props {
    id: string;
    children: React.ReactNode;
    isError: boolean | Error | null;
    isLoading: boolean;
    data?: any | null;
    loadingClassName?: string; // de preferencia mandar solo el height y width
    errorClassName?: string; // de preferencia mandar solo el height y width
}

export default function Fallback({ id, children, isError, isLoading, data, loadingClassName, errorClassName }: Props) {

    const loadingStyles = loadingClassName ? loadingClassName : `min-h-20 w-full`;
    const errorStyles = errorClassName ? errorClassName : `min-h-10 w-full `;

    return (
        <>
            <section id={id}>
                {
                    isLoading && !isError && (
                        <div className={`${loadingStyles} flex items-center justify-center`} >
                            <div className='loader'></div>
                        </div>)
                }

                {
                    !isLoading && isError && (
                        <div className={`${errorStyles} flex flex-col items-center justify-center`} >
                            <figure className='w-5 h-5 overflow-hidden'>
                                <Image
                                    src="/images/error.jpg"
                                    alt="Error"
                                    className='object-cover rounded-full '
                                    width={100}
                                    height={100}
                                />
                            </figure>
                            <h2 className="text-md font-bold text-error-dark/70">No se pudo cargar la información</h2>
                        </div>)
                }

                {
                    !isLoading && !isError && data !== null && data !== undefined && <>{children}</>
                }

            </section>

        </>
    )
}