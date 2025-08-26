/** @format */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "@/constants";
import { snackbar } from "@/helpers";
import { BaseVariant } from "notistack";
import { loader } from "react-global-loader";

interface RequestOptions {
    ajaxOptions?: AxiosRequestConfig;
    notify?: boolean;
}

interface SendOptions extends RequestOptions {
    method: string;
    url: string;
    data?: any;
}

interface NotifyOptions {
    message: string;
    type: string;
}

interface ApiResponse<T = any> {
    data: T;
    message: string;
    type: "success" | "error" | "warning" | "info";
    errors: string[];
}

export class CrudFactory {
    dateFormat: string = "MMMM Do YYYY hh:mm A";
    SERVER_API_VERSION: string = '';
    BASE_URL: string = `${BASE_URL}/api`;

    getUrl = async (...segments: string[]): Promise<string> => {
        return segments.reduce((url, segment) => url + segment);
    };

    async get<T = any>(
        url: string,
        data: any = {},
        requestOptions: RequestOptions = {}
    ): Promise<ApiResponse<T>> {
        return this.send({
            method: "GET",
            url: `${this.BASE_URL}/${url}`,
            data,
            ...requestOptions,
        });
    }

    async post<T = any>(
        url: string,
        data: any = {},
        requestOptions: RequestOptions = {}
    ): Promise<ApiResponse<T>> {
        return this.send({
            method: "POST",
            url: `${this.BASE_URL}/${url}`,
            data,
            ...requestOptions,
        });
    }

    async create<T = any>(
        url: string,
        data: any = {},
        requestOptions: RequestOptions = {}
    ): Promise<ApiResponse<T>> {
        return this.send({
            method: "POST",
            url: `${this.BASE_URL}/create/admin/${url}`,
            data,
            ...requestOptions,
        });
    }

    async retrieve<T = any>(
        url: string,
        data: any = {},
        requestOptions: RequestOptions = {}
    ): Promise<ApiResponse<T>> {
        return this.send({
            method: "GET",
            url: `${this.BASE_URL}/retrieve/admin/${url}`,
            data,
            ...requestOptions,
        });
    }

    async update<T = any>(
        url: string,
        data: any = {},
        requestOptions: RequestOptions = {}
    ): Promise<ApiResponse<T>> {
        return this.send({
            method: "PUT",
            url: `${this.BASE_URL}/update/admin/${url}`,
            data,
            ...requestOptions,
        });
    }
    async patch<T = any>(
        url: string,
        data: any = {},
        requestOptions: RequestOptions = {}
    ): Promise<ApiResponse<T>> {
        return this.send({
            method: "PATCH",
            url: `${this.BASE_URL}/patch/admin/${url}`,
            data,
            ...requestOptions,
        });
    }

    async delete<T = any>(
        url: string,
        data: any = {},
        requestOptions: RequestOptions = {}
    ): Promise<ApiResponse<T>> {
        return this.send({
            method: "DELETE",
            url: `${this.BASE_URL}/delete/admin/${url}`,
            data,
            ...requestOptions,
        });
    }

    async notify({ message, type }: NotifyOptions): Promise<void> {
        if (message) {
            console.log(message)
            snackbar(type as BaseVariant, message);
        }
    }

    async send<T = any>(requestOptions: SendOptions): Promise<ApiResponse<T>> {
        const { url, data, method, notify = true } = requestOptions;

        const options: AxiosRequestConfig = {
            ...requestOptions.ajaxOptions,
            method,
            data
        };

        const fullUrl: string = await this.getUrl(url);
        // let token = await getTokenAsync();
        const token: string = "";

        options.headers = {
            ...options.headers,
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        };

        let res: ApiResponse<T> = {
            data: [] as any,
            message: "",
            type: "error",
            errors: [],
        };

        const finalOptions: AxiosRequestConfig = {
            ...options,
            url: fullUrl,
            validateStatus: (status: number) => status === 200 || status === 201 || status === 401 || status === 400
        };

        try {
            loader.show();
            const response: AxiosResponse<ApiResponse<T>> = await axios(finalOptions);

            if (response.status === 200 || response.status === 201) {
                res = response.data;
                const { type, message } = res;
                // ok
                if (options.method !== "GET" && notify) {
                    this.notify({
                        message,
                        type,
                    });
                }
            }
            else if (response.status === 401) {
                res = response.data;
                const { type, message } = res;
                // unauthorize
                this.notify({
                    message: message,
                    type: "error",
                });
            }
            else if (response.status === 400) {
                res = response.data;
                const { type, message } = res;
                // incomplete data
                this.notify({
                    message: message,
                    type: "error",
                });
            }
            else {
                throw new Error(`${response.status} : ${response.statusText}`);
            }
        } catch (e) {
            this.notify({
                message: 'Something went wrong at our end.',
                type: "error",
            });
            throw e;
        }finally{
            loader.hide();
        }

        const { type } = res;

        if (type === "error") throw res;

        return res;
    }
}

export const $crud = new CrudFactory();