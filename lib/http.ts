import axios from 'axios';
import useStore from '@/store/useStore';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(
    (request) => {
        const token: string = useStore.getState().token;

        request.headers["Content"] = "application/json";
        request.headers["Authorization"] = `Bearer ${token}`;
        return request;
    }
);

const service = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVICE_BASE_URL,
});

service.interceptors.request.use(
    (request) => {
        request.headers["Content"] = "application/json";
        return request;
    }
);

export {api, service};
