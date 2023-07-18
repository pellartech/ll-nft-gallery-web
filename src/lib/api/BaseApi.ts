import axios from 'axios';

class BaseAPI {
    protected _instance;

    constructor() {
        this._instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL_ROOT || 'https://gallery-federation.lightlinksys.com',
            headers: {
                post: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            },
        });

        this._instance.interceptors.request.use(
            config => {
                if (typeof window !== "undefined") {
                    const token = window.localStorage.getItem("lightlink-web-token");
                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }

    protected async get(path: string, params?: any) {
        const resp = await this._instance.get(path, { params });
        return resp.data;
    }

    protected async post(path: string, payload?: any) {
        const resp = await this._instance.post(path, payload);
        return resp.data;
    }

    protected async put(path: string, payload?: any) {
        const resp = await this._instance.put(path, payload);
        return resp.data;
    }

    protected buildParams(filter: any) {
        const params = []
        for (const [key, value] of Object.entries(filter)) {
            params.push(`${key}=${value}`)
        }
        return '?' + params.join('&')
    }
}

export default BaseAPI;
