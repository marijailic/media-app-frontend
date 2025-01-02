export const keys = {
    TOKEN: "token",
};

export const storage = {
    set: (key, data) => localStorage.setItem(key, data),
    get: (key) => localStorage.getItem(key),
    delete: (key) => localStorage.removeItem(key),
};
