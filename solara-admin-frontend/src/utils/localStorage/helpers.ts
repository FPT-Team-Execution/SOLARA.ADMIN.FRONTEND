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