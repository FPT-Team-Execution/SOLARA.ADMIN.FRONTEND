import axiosClient from "./axiosClient.ts";
import {AUTH_URL} from "../url/authUrl.ts";
import {BaseReModel} from "../../types/general.type.ts";
import {CreateUserResponseModel} from "../../types/user.ts";

interface IAuthApi {
    login: () => Promise<BaseReModel<CreateUserResponseModel>>;
}

export const authApi: IAuthApi = {
    login: async () => {
        const response = await axiosClient.post<BaseReModel<CreateUserResponseModel>>(AUTH_URL.LOGIN());
        return response.data;
    }
}

