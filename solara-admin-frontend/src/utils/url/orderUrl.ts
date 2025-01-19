import {IPageRequest} from "../../types/general.type.ts";

export const ORDER_URL = {
    GETS: (query: IPageRequest) => `/orders?${new URLSearchParams(query as never).toString()}`,
};
