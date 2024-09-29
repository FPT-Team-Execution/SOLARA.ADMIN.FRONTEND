import axiosClient from "./axiosClient.ts";
import {AUTH_URL} from "../url/authUrl.ts";
import {BaseReModel} from "../../types/general.type.ts";
import {CreateUserResponseModel} from "../../types/user.type.ts";
import {AxiosResponse} from "axios";

export const authApi: IAuthApi = {
    login: async () => {
        return await axiosClient.post<BaseReModel<CreateUserResponseModel>>(AUTH_URL.LOGIN());
    }
}

interface IAuthApi {
    login: () => Promise<AxiosResponse<BaseReModel<CreateUserResponseModel>>>;
}