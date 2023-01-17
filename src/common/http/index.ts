import axios, { AxiosRequestConfig } from 'axios';
import { handleGeneralError, handleNetworkError } from './status';
import { BaseFn } from './type';
import { getAliveValue } from '/@/common/cache';
import { message } from 'ant-design-vue/es';
import { CacheKey } from '/@/common/cache/key';

axios.defaults.timeout = 60000;
axios.defaults.withCredentials = false;

/**
 * 构造出接口baseUrl
 */
const genAPIHost = () => {
  if (import.meta.env.VITE_OPEN_MOCK) {
    return import.meta.env.VITE_API_HOST + '/mock/api';
  } else {
    return import.meta.env.VITE_API_HOST;
  }
};
const options: AxiosRequestConfig = {
  baseURL: genAPIHost(),
};

const axiosInstance = axios.create(options);

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config) => {
    const entity = getAliveValue<string>(CacheKey.ACCESS_TOKEN);
    if (entity?.value) {
      config.headers['Authorization'] = entity.value;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data);
    const { message, code } = response.data;
    handleGeneralError(code, message);
    return response;
  },
  // 请求失败
  (err) => {
    handleNetworkError(err.response.status);
    return Promise.reject(err.response);
  },
);

const get = <T = any>(url: string, params?: object, resHandler?: BaseFn, config?: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(url, { params, ...config })
      .then((res) => {
        console.log(res);
        const {
          data: { data },
        } = res;
        if (resHandler) {
          resolve(resHandler(data) as T);
        } else {
          resolve(data as T);
        }
      })
      .catch((error) => {
        console.error(`请求错误: ${error}`);
        message.error('服务器错误');
        reject(error);
      });
  });
};

const post = <T = any>(
  url: string,
  data?: object,
  params?: object,
  config?: AxiosRequestConfig,
  resHandler?: BaseFn,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(url, data, { params, ...config })
      .then((res) => {
        const {
          data: { data },
        } = res;
        if (resHandler) {
          resolve(resHandler(data) as T);
        } else {
          resolve(data as T);
        }
      })
      .catch((error) => {
        console.error(`请求错误: ${error}`);
        message.error('服务器错误');
        reject(error);
      });
  });
};

export { get, post };
