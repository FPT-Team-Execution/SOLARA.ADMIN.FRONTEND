import {IPageRequest} from "../../types/general.type.ts";

export const COMPLETION_URL = {
    GETS: (query: IPageRequest) => `/completion-report?${new URLSearchParams(query as never).toString()}`,
};
