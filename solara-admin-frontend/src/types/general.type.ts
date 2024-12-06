export interface IBaseModel<T> {
    isSuccess: boolean;
    message: string;
    statusCode: number;
    responseRequest?: T;
};

export interface IPaginate<T> {
    size: number,
    page: number,
    total: number,
    totalPages: number,
    items: T[]
}

export interface IPageRequest {
    searchProp?: string;
    searchKey?: string;
    page: number;
    size: number;
    orderOn?: string;
    isAscending: boolean;
}