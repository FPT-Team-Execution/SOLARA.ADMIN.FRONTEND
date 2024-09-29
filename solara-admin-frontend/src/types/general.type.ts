export type BaseResReqModel<TRes, TReq> = {
    message: string,
    isSuccess: boolean,
    statusCode: number
    request: TReq | null
    response: TRes | null
}

export type BaseReModel<TRe> = {
    message: string,
    isSuccess: boolean,
    statusCode: number
    responseRequest: TRe | null
}

export type BaseModel = {
    message: string,
    isSuccess: boolean,
    statusCode: number
}