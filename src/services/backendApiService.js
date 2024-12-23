import { getAuthToken } from "./authService";

const backendUrl = import.meta.env.VITE_MEDIA_APP_URL;

const trimUrl = (url) => (url[0] === "/" ? url.slice(1) : url);

const getAuthHeaders = () => {
    const tokenData = getAuthToken();
    const tokenType = tokenData ? tokenData.token_type : null;
    const accessToken = tokenData ? tokenData.access_token : null;

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
    get: async ({ url, headers = {} }) => {
        const authHeaders = {
            ...getAuthHeaders(),
            ...headers,
        };

        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: "GET",
            headers: authHeaders,
        });
    },
};
