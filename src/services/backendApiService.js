import { keys, storage } from "./storageService";

const backendUrl = import.meta.env.VITE_MEDIA_APP_URL;

const trimUrl = (url) => (url[0] === "/" ? url.slice(1) : url);

const getAuthHeaders = () => {
    const tokenData = storage.get(keys.TOKEN);
    const tokenType = tokenData ? JSON.parse(tokenData).token_type : null;
    const accessToken = tokenData ? JSON.parse(tokenData).access_token : null;

    return tokenType && accessToken
        ? { Authorization: `${tokenType} ${accessToken}` }
        : {};
};

export default {
    post: async ({ url, headers = {}, body }) => {
        const authHeaders = {
            ...getAuthHeaders(),
            ...headers,
        };

        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: "POST",
            headers: authHeaders,
            body,
        });
    },
};
