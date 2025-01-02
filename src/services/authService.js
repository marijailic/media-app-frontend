import { keys, storage } from "./storageService";
const backendUrl = import.meta.env.VITE_MEDIA_APP_URL;

const saveAuthToken = (tokenData) => {
    storage.set(keys.TOKEN, JSON.stringify(tokenData));
};

const deleteAuthToken = () => storage.delete(keys.TOKEN);

export const getAuthToken = () => JSON.parse(storage.get(keys.TOKEN));

export const login = async ({ email, password }) => {
    const res = await fetch(`${backendUrl}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        return false;
    }

    const resObj = await res.json();
    saveAuthToken(resObj);

    return true;
};

export const logout = () => {
    deleteAuthToken(keys.TOKEN);
    return true;
};
