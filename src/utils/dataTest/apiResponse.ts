
type messageType = "ok" | "error" | "bad_request" | "success";

export interface ResponseStruct {
    status: 200 | 400 | 401 | 404 | 500 | 503;
    message: messageType; // tipo de resultado
    errorMsg?: string | null; // mensaje de error
    data?: Record<string, unknown> | null
}

const defaultResponseApi: ResponseStruct = {
    status: 200,
    message: 'ok',
    errorMsg: null,
    data: null
};


export const getDefaultResponseApi = (): ResponseStruct => {
    return defaultResponseApi
}