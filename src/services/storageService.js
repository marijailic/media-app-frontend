export const keys = {
    TOKEN: "token",
};

export const storage = {
    set: (key, data) => localStorage.setItem(key, data),
    delete: (key) => localStorage.removeItem(key),
    get: (key) => localStorage.getItem(key),
};
