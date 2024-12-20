import { IPageRequest } from './general.type';

export type UserDto = {
    userId: string;
    email: string;
    fullName: string;
    gender: string;
    birthdate: Date | null;
    emailConfirm: boolean;
    phoneNumber: string;
    phoneConfirm: boolean;
    avatarUrl: string;
    createdOn?: Date | null;
    updatedOn?: Date | null;
}

export type UserResModel = {
    user: UserDto;
}

export type GetPagedUsersRequest = IPageRequest & {
}

export type UpdateUserRequest = {
    userId: string;
    fullName: string;
    gender: string;
    birthdate: Date | null;
    phoneNumber: string;
    avatarUrl: string;
    isBlocked: boolean;
    roleId: string;
    status: string;
}

export type CreateUserRequest = {
    fullName: string;
    gender: string;
    birthdate: Date | null;
    phoneNumber: string;
    avatarUrl: string;
    isBlocked: boolean;
    roleId: string;
    status: string;
}