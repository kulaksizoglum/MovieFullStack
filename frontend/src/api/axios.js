import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3000/api",
});
api.interceptors.request.use(
    (config) => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const user = JSON.parse(storedUser);

            if (user?.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api