import { getAuthToken } from "./authService";

const backendUrl = import.meta.env.VITE_MEDIA_APP_URL;

const trimUrl = (url) => (url[0] === "/" ? url.slice(1) : url);

const createAuthHeaders = () => {
    const tokenData = getAuthToken();
    const tokenType = tokenData ? tokenData.token_type : null;
    const accessToken = tokenData ? tokenData.access_token : null;

    return tokenType && accessToken
        ? { Authorization: `${tokenType} ${accessToken}` }
        : {};
};

const createRequestHeaders = (customHeaders = {}) => {
    return {
        ...createAuthHeaders(),
        ...customHeaders,
    };
};

export default {
    post: async ({ url, headers = {}, body }) => {
        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: "POST",
            headers: createRequestHeaders(headers),
            body,
        });
    },
    get: async ({ url, headers = {} }) => {
        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: "GET",
            headers: createRequestHeaders(headers),
        });
    },
    delete: async ({ url, headers = {} }) => {
        return await fetch(`${backendUrl}/${trimUrl(url)}`, {
            method: "DELETE",
            headers: createRequestHeaders(headers),
        });
    },
};
