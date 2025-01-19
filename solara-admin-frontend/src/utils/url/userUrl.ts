import { IPageRequest } from "../../types/general.type.ts";

export const USER_URL = {
    GETS: (query: IPageRequest) => {
        let url = '/users';
        const params = [];
        
        if (query?.page !== undefined) params.push(`page=${query.page}`);
        if (query?.size !== undefined) params.push(`size=${query.size}`);
        if (query?.orderOn !== undefined) params.push(`sort=${query.orderOn}`);
        
        if (params.length > 0) {
            url += '?' + params.join('&');
        }
        return url;
    },
    GET_POS_PUT_DEL: (id?: string | undefined) => {
        if (id !== undefined) {
            return `/users/${id}`;
        }
        return '/users';
    }
};