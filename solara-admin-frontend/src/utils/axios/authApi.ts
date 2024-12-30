import axiosClient from "./axiosClient.ts";
import {AUTH_URL} from "../url/authUrl.ts";
import {IBaseModel} from "../../types/general.type.ts";
import {UserResModel} from "../../types/user.ts";

interface IAuthApi {
    login: () => Promise<IBaseModel<UserResModel>>;
}

export const authApi: IAuthApi = {
    login: async () => {
        const response = await axiosClient.post<IBaseModel<UserResModel>>(AUTH_URL.LOGIN());
        return response.data;
    }
}

