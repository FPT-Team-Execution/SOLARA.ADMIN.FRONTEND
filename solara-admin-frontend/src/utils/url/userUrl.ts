import { IPageRequest } from "../../types/general.type.ts";

export const USER_URL = {
    GETS: (query: IPageRequest) => {
        return `/users?page=${query?.page}&size=${query?.size}&sort=${query?.orderOn}`;
    },
    GET_POS_PUT_DEL: (id?: string | undefined) => {
        if (id !== undefined) {
            return `/users/${id}`;
        }
        return `/users`;
    }
};