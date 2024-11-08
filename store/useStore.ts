import {create} from "zustand";
import {AxiosResponse} from "axios";
import {api, service} from "@/lib/http";
import {BlacklistValueItem, ForecastValueItem, PostBlacklistResponseData} from "@/types/response.interface";
import {FetchBlacklistPayload, FetchForecastPayload, PostBlacklistPayload} from "@/types/payload.interface";

interface storeProps {
    loading: boolean;

    token: string;

    email: string;

    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;

    forecasts: ForecastValueItem[];
    fetchForecast: (payload: FetchForecastPayload) => Promise<void>;

    fetchBlacklist: (payload: FetchBlacklistPayload) => Promise<void>;
    blacklists: BlacklistValueItem[];
    postBlacklist: (payload: PostBlacklistPayload) => Promise<AxiosResponse<PostBlacklistResponseData>>;
}

const useStore = create<storeProps>((set) => ({
    loading: false,

    token: typeof window !== 'undefined' ? localStorage.getItem('token') || "" : "",

    email: typeof window !== 'undefined' ? localStorage.getItem('email') || "" : "",

    login: async (username, password) => {
        const response = await service.post("/security/createToken", {
            userName: username,
            password: password,
        });
        set({token: response.data, email: username});
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.data);
            localStorage.setItem('email', username);
        }
    },

    logout: async () => {
        set({token: "", email: ""});
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', "");
            localStorage.setItem('email', "");
        }
    },

    forecasts: [],

    fetchForecast: async (payload) => {
        set({loading: true});
        try {
            const response = await api.post("/Procedure/StpRmforKlasik_2", payload);
            set({forecasts: response.data.value});
        } catch (error) {
            console.error("Data fetch error:", error);
        } finally {
            set({loading: false});
        }
    },

    blacklists: [],

    fetchBlacklist: async (payload) => {
        set({loading: true});
        try {
            const response = await api.post("/Kara/Getir_Kod", payload);
            set({blacklists: response.data.value});
        } catch (error) {
            throw error;
        } finally {
            set({loading: false});
        }
    },

    postBlacklist: async (payload) => {
        set({loading: true});
        const data = api.post("/Kara/Ekle", payload);
        set({loading: false});
        return data;
    },
}));

export default useStore;
