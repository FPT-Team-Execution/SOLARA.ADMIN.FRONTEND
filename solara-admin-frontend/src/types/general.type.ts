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
    page: number;
    size: number;
    isAscending?: boolean;
    orderOn?: string;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  message?: string;
  responseRequest: T;
  data: T;
}

export interface IBaseResponse<T = unknown> {
    isSuccess: boolean;
    message?: string;
    data?: T;
}

export interface IPagedResponse<T> {
    items: T[];
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
}

// Aliases for consistency with existing code
export type BaseResponse = IBaseResponse;
export type PagedResponse<T> = IPagedResponse<T>;