
type messageType = "ok" | "error" | "bad_request" | "success";

export interface ResponseStruct<T = unknown> {
    message: messageType;
    errorMsg?: string | null;
    data: T | null;
}

export const getDefaultResponseApi = (): ResponseStruct => ({
    message: 'ok',
    errorMsg: null,
    data: null
})