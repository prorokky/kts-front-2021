import qs from "qs";
import {ApiResponse, HTTPMethod, IApiStore, RequestParams, StatusHTTP} from "./types";

export default class ApiStore implements IApiStore {
    readonly baseUrl: string

    constructor(baseUrl: string) {
        // TODO: Примите из параметров конструктора baseUrl
        // и присвойте его в this.baseUrl
        this.baseUrl = baseUrl
    }

    async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        // TODO: Напишите здесь код, который с помощью fetch будет делать запрос
        let url = `${this.baseUrl}${params.endpoint}`
        const req: RequestInit = {}

        if (params.method === HTTPMethod.GET) {
            url = `${url}?${qs.stringify(params.data)}`
        } else {
            req.body = JSON.stringify(params.data)
            req.headers = {...params.headers}
            req.headers['Content-Type'] = 'text/plain;charset=UTF-8'
        }

        try {
            const response = await fetch(url, req)

            if (response.ok) {
                return {
                    success: true,
                    data: await response.json(),
                    status: StatusHTTP.OK
                }
            }

            return {
                success: false,
                data: await response.json(),
                status: response.status
            }

        } catch (e) {
            return {
                success: false,
                data: e,
                status: StatusHTTP.UNEXPECTED_ERROR
            }
        }

    }
}