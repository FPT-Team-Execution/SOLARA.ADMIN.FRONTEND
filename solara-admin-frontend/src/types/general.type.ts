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
    search?: string;
    orderOn?: string;
    isAscending: boolean;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  message?: string;
  responseRequest: T;
  data: T;
}