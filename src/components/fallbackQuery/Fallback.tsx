import Image from 'next/image';
// import { useState, useEffect } from 'react';

interface Props {
    id: string;
    children: React.ReactNode;
    noDataPlaceholder?: string | React.ReactNode;
    isError: boolean | Error | null;
    isLoading: boolean;
    errorMsg?: string;
    data?: unknown | null;
    loadingClassName?: string; // de preferencia mandar solo el height y width
    errorClassName?: string; // de preferencia mandar solo el height y width
}


export default function Fallback({ id, children, isError, isLoading, data, errorMsg, loadingClassName, errorClassName, noDataPlaceholder }: Props) {

    const loadingStyles = loadingClassName ? loadingClassName : `min-h-20 w-full`;
    const errorStyles = errorClassName ? errorClassName : `min-h-10 w-full `;

    const noDataEva = <T,>(data: T) => {
        let isNull = false;
        if (
            (Array.isArray(data) && data.length === 0) ||
            (typeof data === 'object' && data !== null && Object.keys(data).length === 0) ||
            !data
        ) {
            isNull = true;
        }

        return isNull;
    }

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
                            <figure className='w-8 h-8 overflow-hidden'>
                                <Image
                                    src="/images/error.jpg"
                                    alt="Error"
                                    className='object-cover rounded-full '
                                    width={100}
                                    height={100}
                                />
                            </figure>
                            <h2 className="text-lg font-bold text-theme-light-gray">
                                {errorMsg ? errorMsg : "No se pudo cargar la información"}
                            </h2>
                        </div>)
                }

                {
                    !isLoading && !isError && !noDataEva(data) && <>{children}</>
                }

                {
                    !isLoading && !isError && noDataEva(data) && noDataPlaceholder && <>{noDataPlaceholder}</>
                }

            </section>

        </>
    )
}