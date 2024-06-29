import axios from 'axios';
import {useUserStore} from "@/stores/user.js";

export default class Http {
    constructor(baseURL) {
        const user = useUserStore();

        this.instance = axios.create({
            baseURL,
        });

        // 添加请求拦截器
        this.instance.interceptors.request.use(
            (config) => {
                const token = user.token;
                config.headers.Authorization = `${token}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );
        //
        // // 添加响应拦截器
        // this.instance.interceptors.response.use(
        //     (response) => {
        //         return response;
        //     },
        //     (error) => {
        //         return Promise.reject(error);
        //     },
        // );
    }

    async get(url, params) {
        return await this.instance.get(url, {params});
    }

    async post(url, data) {
        return await this.instance.post(url, data);
    }

    async put(url, data) {
        return await this.instance.put(url, data);
    }

    async delete(url) {
        return await this.instance.delete(url);
    }
}
