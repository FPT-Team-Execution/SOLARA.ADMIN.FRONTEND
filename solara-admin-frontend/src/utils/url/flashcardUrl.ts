import { IPageRequest } from "../../types/general.type.ts";

export const FLASHCARD_URL = {
    GET_ON_COLLECTION: (id: string, query: IPageRequest) => {
        let url = `/exercises/sub-topic/${id}`;
        const params = [];
        
        if (query?.page !== undefined) params.push(`page=${query.page}`);
        if (query?.size !== undefined) params.push(`Size=${query.size}`);
        if (query?.orderOn !== undefined) params.push(`sort=${query.orderOn}`);
        
        if (params.length > 0) {
            url += '?' + params.join('&');
        }
        return url;
    },
    GETS: (query: IPageRequest) => {
        let url = '/exercises';
        const params = [];
        
        if (query?.page !== undefined) params.push(`page=${query.page}`);
        if (query?.size !== undefined) params.push(`Size=${query.size}`);
        if (query?.orderOn !== undefined) params.push(`sort=${query.orderOn}`);
        
        if (params.length > 0) {
            url += '?' + params.join('&');
        }
        return url;
    },
    GET_POS_PUT_DEL: (id?: string | undefined) => {
        if (id !== undefined) {
            return `/exercises/${id}`;
        }
        return '/exercises';
    },
    DELS: () => {
        return '/exercises/bulk'
    }
}