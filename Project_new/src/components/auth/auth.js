// auth.js
export function getAccessToken(origin) {
    const localStorageKey = `${origin}_access_token`;
    return sessionStorage.getItem(localStorageKey);
}

export function getUser(origin) {
    const localUserKey = `${origin}_user`;
    return sessionStorage.getItem(localUserKey);
}