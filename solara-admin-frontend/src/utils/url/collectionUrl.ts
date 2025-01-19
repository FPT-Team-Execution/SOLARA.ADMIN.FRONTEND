import { IPageRequest } from "../../types/general.type.ts";

export const COLLECTION_URL = {
    GET_ON_TOPIC: (id: string, query: IPageRequest) => {
        let url = `/sub-topics/topic/${id}`;
        const params = [];
        
        if (query?.page !== undefined) params.push(`page=${query.page}`);
        if (query?.size !== undefined) params.push(`Size=${query.size}`);
        if (query?.orderOn !== undefined) params.push(`OrderOn=${query.orderOn}`);
        
        if (params.length > 0) {
            url += '?' + params.join('&');
        }
        return url;
    },
    GETS: (query: IPageRequest) => {
        let url = '/sub-topics';
        const params = [];
        
        if (query?.page !== undefined) params.push(`page=${query.page}`);
        if (query?.size !== undefined) params.push(`Size=${query.size}`);
        if (query?.orderOn !== undefined) params.push(`OrderOn=${query.orderOn}`);
        
        if (params.length > 0) {
            url += '?' + params.join('&');
        }
        return url;
    },
    GET_POS_PUT_DEL: (id?: string | undefined) => {
        if (id !== undefined) {
            return `/sub-topics/${id}`;
        }
        return '/sub-topics';
    }
}