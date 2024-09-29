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

export type PageReqModel = {
    page: number,
    size: number,
    sort: number
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