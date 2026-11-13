import { ResponseDataPaginated } from "@/types/dataTypes";
import { useState } from "react";
interface Props {
    initPage?: number;
    initLimit?: number;
}
export const usePagination = <T>({ initPage = 1, initLimit = 10 }: Props = {}) => {
    const [paginationInfo, setPaginationInfo] = useState<ResponseDataPaginated<T> | null>(null);
    const [page, setPage] = useState(initPage);
    const [limit, setLimit] = useState(initLimit);
    // son los mismo valores que: interface ResponseDataPaginated<T>
    return {
        page,
        limit,
        totalDocs: paginationInfo?.totalDocs ?? 0,
        totalPages: paginationInfo?.totalPages ?? 0,
        hasNextPage: paginationInfo?.hasNextPage ?? false,
        hasPrevPage: paginationInfo?.hasPrevPage ?? false,
        nextPage: paginationInfo?.nextPage ?? null,
        prevPage: paginationInfo?.prevPage ?? null,
        setPage,
        setLimit,
        setPaginationInfo,
    };
};