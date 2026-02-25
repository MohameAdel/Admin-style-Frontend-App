import axios from "axios";

export const api = axios.create({
    baseURL: "https://fakestoreapi.com",
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: add interceptors for auth if needed later
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        return Promise.reject(error);
    }
);
