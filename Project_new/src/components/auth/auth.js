// auth.js
export function getAccessToken(origin) {
    const localStorageKey = `${origin}_access_token`;
    return localStorage.getItem(localStorageKey);
}

export function getUser(origin) {
    const localUserKey = `${origin}_user`;
    return localStorage.getItem(localUserKey);
}