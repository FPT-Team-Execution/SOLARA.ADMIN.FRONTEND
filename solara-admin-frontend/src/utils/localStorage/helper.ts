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

export const removeLocalStorage = (key: string) => {
    window.localStorage.removeItem(key)
}

export const setJwtLocalStorage = (accessToken: string | null, refreshToken: string | null) => {
    if (accessToken && refreshToken) {
        setLocalStorage('accessToken', accessToken);
        setLocalStorage('refreshToken', refreshToken);

        axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
        removeLocalStorage('accessToken');
        removeLocalStorage('refreshToken');
        delete axiosClient.defaults.headers.common.Authorization;
    }
}

export const getJwtLocalStorage = () => {
    return {
        accessToken: getLocalStorage('accessToken'),
        refreshToken: getLocalStorage('refreshToken')
    };
}