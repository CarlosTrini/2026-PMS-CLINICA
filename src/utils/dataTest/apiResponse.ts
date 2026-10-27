
type messageType = "ok" | "error" | "bad_request" | "success";

export interface ResponseStruct {
    message: messageType; // tipo de resultado
    errorMsg?: string | null; // mensaje de error
    data?: Record<string, unknown> | null
}

export const getDefaultResponseApi = (): ResponseStruct => ({
    message: 'ok',
    errorMsg: null,
    data: null
})