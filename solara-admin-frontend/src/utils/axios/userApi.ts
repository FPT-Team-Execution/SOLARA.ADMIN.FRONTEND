import axiosClient from "./axiosClient";
import { IBaseModel, IPaginate, IPageRequest } from "../../types/general.type";
import { USER_URL } from "../url/userUrl";
import { UserDto, UserResModel, UpdateUserRequest, CreateUserRequest } from "../../types/user";
import { notification } from "antd";
import { messageHelper } from "../funcs/messageHelper";

interface IUserApi {
    getUsers: (query: IPageRequest) => Promise<IBaseModel<IPaginate<UserDto>>>;
    getUser: (id: string) => Promise<IBaseModel<UserResModel>>;
    postUser: (request: CreateUserRequest) => Promise<IBaseModel<UserResModel>>;
    putUser: (request: UpdateUserRequest) => Promise<IBaseModel<UserResModel>>;
    deleteUser: (id: string) => Promise<IBaseModel<UserDto>>;
}

export const userApi: IUserApi = {
    getUsers: async (query: IPageRequest) => {
        const response = await axiosClient.get<IBaseModel<IPaginate<UserDto>>>(USER_URL.GETS(query));
        return response.data;
    },
    getUser: async (id: string) => {
        const response = await axiosClient.get<IBaseModel<UserResModel>>(USER_URL.GET_POS_PUT_DEL(id));
        return response.data;
    },
    postUser: async (request: CreateUserRequest) => {
        const response = await axiosClient.post<IBaseModel<UserResModel>>(USER_URL.GET_POS_PUT_DEL(), request);
        if (response.data.isSuccess == true) notification.success({
            message: 'Success',
            description: messageHelper.createSucess("user")
        })
        return response.data;
    },
    putUser: async (request: UpdateUserRequest) => {
        const response = await axiosClient.put<IBaseModel<UserResModel>>(USER_URL.GET_POS_PUT_DEL(), request);
        if (response.data.isSuccess == true) notification.success({
            message: 'Success',
            description: messageHelper.updateSucess("user")
        })
        return response.data;
    },
    deleteUser: async (id: string) => {
        const response = await axiosClient.delete<IBaseModel<UserDto>>(USER_URL.GET_POS_PUT_DEL(id));
        if (response.data.isSuccess == true) notification.success({
            message: 'Success',
            description: messageHelper.deleteSucess("user")
        })
        return response.data;
    }
}