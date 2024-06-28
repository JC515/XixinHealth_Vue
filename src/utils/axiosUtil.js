import axios from 'axios';
import {useUserStore} from "@/stores/user.js";

const user = useUserStore()
export default class Http {
    constructor(baseURL) {
        this.instance = axios.create({
            baseURL,
        });
        //
        // // 添加请求拦截器
        // this.instance.interceptors.request.use(
        //     (config) => {
        //         // 在发送请求前做些什么
        //         const token = user.token
        //         if (token) {
        //             config.headers.Authorization = `Bearer ${token}`;
        //         }
        //         return config;
        //     },
        //     (error) => {
        //         // 对请求错误做些什么
        //         return Promise.reject(error);
        //     },
        // );
        //
        // // 添加响应拦截器
        // this.instance.interceptors.response.use(
        //     (response) => {
        //         return response.data;
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
