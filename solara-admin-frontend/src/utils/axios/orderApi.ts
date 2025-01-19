import axiosClient from "./axiosClient.ts";
import { IBaseModel, IPaginate, IPageRequest } from "../../types/general.type.ts";
import { ORDER_URL } from "../url/orderUrl.ts";

export interface OrderDto {
    id: string; // Order ID
    userId: string; // User ID
    orderStatus: string; // Status of the order (from API: `orderStatus`)
    paymentDate: string; // Created At (from API: `paymentDate`)
    total: number; // Total Amount (from API: `total`)
}

interface IOrderApi {
    getOrders: (query: IPageRequest) => Promise<IBaseModel<IPaginate<OrderDto>>>;
}

export const orderApi: IOrderApi = {
    getOrders: async (query: IPageRequest) => {
        const response = await axiosClient.get<IBaseModel<IPaginate<OrderDto>>>(ORDER_URL.GETS(query));
        return response.data;
    }
};
