export const messageHelper = {
    loginSuccess: (): string => {
        return "Login into system successfully!"
    },
    noPermission: (): string => {
        return "You have no permission!"
    },
    deleteSucess: (objectName: string): string => {
        return `Delete ${objectName} successfully!`
    },
    updateSucess: (objectName: string): string => {
        return `Update ${objectName} successfully!`
    }
}