import axios from 'axios';
import { message } from 'antd';
import Authenticate from './Authenticate';


//Config common
//console.log("hau",configApi.BASE_URL)
const apiDefault = axios.create({
    baseURL: 'https://fd9671f6-4baa-4d13-89f2-5fe29ea0dc38.mock.pstmn.io'
    // baseURL: "/api"
    // baseURL: "http://localhost:9733/api"
});

const methodConst = {
    get: "get",
    post: "post",
    put: "put",
    delete: "delete",
}


export default class ApiCaller {
    static state = ApiCaller.getDefaultState();

    static getDefaultState() {
        return {
            transition: "bounce",
            type: "error",
            disableAutoClose: false,
            closeOnClick: false,
        };
    }

    static async get(url, params = null, customConfig = null) {
        return ApiCaller.callApi(url, methodConst.get, null, params, customConfig)
    }
    static async post(url, data, customConfig = null) {
        return await ApiCaller.callApi(url, methodConst.post, data, null, customConfig);
    }
    static async put(url, data, customConfig = null) {
        return await ApiCaller.callApi(url, methodConst.put, data, null, customConfig);
    }
    static async delete(url, data, customConfig = null) {
        return await ApiCaller.callApi(url, methodConst.delete, data, null, customConfig);
    }

    static async download(url, data, customConfig = null) {
        if (customConfig === null) {

        }
        customConfig.responseType = 'blob';

        return await ApiCaller.callApi(url, methodConst.get, null, data, customConfig, true);
    }

    static async callApi(url, method, data = null, params = null, customConfig = null, isDownloadFile = false) {
        /// Check user nếu có thay đổi token 

        //handle config common
        let config = {};
        if (customConfig !== null && customConfig !== undefined) {
            config = customConfig;
        }
        config.url = url;
        config.method = method;

        if (params != null) {
            config.params = params;
        }
        if (method === methodConst.post || method === methodConst.put || method === methodConst.delete) {
            config.data = data;
        }
        if (localStorage.getItem('Athtoken') != null) {
            config.headers = { Authorization: `Bearer ${localStorage.getItem('Athtoken')}` };
        }

        //Call api
        // return await apiDefault.request(config)
        //     .then(response => {

        //         if (!response.data.isSuccess) {
        //             ApiCaller.handleApiUnsuccessful(response.data.err);
        //         }
        //         return response;
        //     })
        //     .catch(error => {
        //         ApiCaller.handleErrorApi(error);
        //         return Promise.reject(error);
        //     });
        if (isDownloadFile !== true) {
            try {
                let res = await apiDefault(config);
                message.info(res.data.messenger);
                return res;
            } catch (error) {
                console.log("Lỗi", apiDefault.defaults);
                message.error('Lỗi kết nối: ' + apiDefault.defaults.baseURL);
                return Promise.reject(error);
            }
        }
        else {
            try {
                let res = await apiDefault(config);
                console.log("ApiCaller - res", res);
                return res;
            } catch (error) {
                message.error(error);
                return Promise.reject(error);
            }
        }

    }

    //function ultis


}
