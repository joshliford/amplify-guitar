// handles token operations for authentication

export const getTokenFromStorage = () => {
    return sessionStorage.getItem('token');
}

export const setTokenInStorage = token => {
    sessionStorage.setItem('token', token);
}

export const removeTokenFromStorage = () => {
    sessionStorage.removeItem('token');
}