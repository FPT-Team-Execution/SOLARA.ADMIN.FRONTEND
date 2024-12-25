import {IPageRequest} from "../../types/general.type.ts";

export const TOPIC_URL = {
    GETS: (query: IPageRequest) => {
        let url = '/topics';
        const params = [];
        
        if (query?.page !== undefined) params.push(`page=${query.page}`);
        if (query?.size !== undefined) params.push(`Size=${query.size}`);
        if (query?.orderOn !== undefined) params.push(`OrderOn=${query.orderOn}`);
        if (query?.isAscending !== undefined) params.push(`IsAscending=${query.isAscending}`);
        
        if (params.length > 0) {
            url += '?' + params.join('&');
        }
        return url;
    },
    GET_POS_PUT_DEL: (id?: string | undefined) => {
        if (id !== undefined) {
            return `/topics/${id}`;
        }
        return '/topics';
    }
}