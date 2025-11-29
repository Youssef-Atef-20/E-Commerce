import axios from "axios";
import env from "./env";

const baseURL =
    import.meta.env.MODE === "development"
        ? env.BACKEND_URL + "/api"
        : "/api";

const api = axios.create({
    baseURL,
    withCredentials: true,
});

export default api;
