import { keys, storage } from "./storageService";
const backendUrl = import.meta.env.VITE_MEDIA_APP_URL;

const saveAuthData = (tokenData) => {
    storage.set(keys.TOKEN, JSON.stringify(tokenData));
};

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
    saveAuthData(resObj);

    return true;
};
