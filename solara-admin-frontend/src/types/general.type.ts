import {TopicModel} from "./topic.type.ts";

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

export type SubModel<TPayload> = {
    success: boolean,
    status: number,
    payload: TPayload
}

export type PageReqModel = {
    page: number,
    pageSize: number,
    sort: string
}

export type PageResModel = {
    size: number,
    number: number,
    totalElements: number,
    totalPages: number
}

export type PaginationTopicResponseModel = {
    content: TopicModel[],
    page: PageReqModel
}