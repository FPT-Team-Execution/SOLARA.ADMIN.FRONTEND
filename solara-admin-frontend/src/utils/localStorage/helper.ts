import axiosClient from "../axios/axiosClient.ts";

export const setLocalStorage = (key: string, value: unknown) => {
    if (!value) return
    if (typeof value === 'object') {
        window.localStorage.setItem(key, JSON.stringify(value))
    } else window.localStorage.setItem(key, value as string)
}

export const getLocalStorage = (key: string) => {
    try {
        const data = JSON.parse(window.localStorage.getItem(key) ?? '')
        if (data) return data
    } catch (error) {
        console.log(error)
        return window.localStorage.getItem(key)
    }
}

export const removeLocalStorage = (key: string): void => {
    window.localStorage.removeItem(key)
}

export const setJwtLocalStorage = (accessToken: string | null): void => {
    if (accessToken) {
        setLocalStorage('accessToken', accessToken);
        axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        removeLocalStorage('accessToken');
        delete axiosClient.defaults.headers.common.Authorization;
    }
}

export const getJwtLocalStorage = (): string => {
    return getLocalStorage('accessToken');
}