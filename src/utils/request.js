import axios from 'axios';

const service = axios.create({
  timeout: 5000,
});

/* 请求拦截器 */
service.interceptors.request.use(
  (config) => {
    //  请求成功处理
    return config;
  },
  (error) => {
    // 请求失败处理
    return Promise.reject(error);
  },
);

/* 响应拦截器 */
service.interceptors.response.use(
  (response) => {
    // 响应成功处理
    return response;
  },
  (error) => {
    // 响应失败处理
    return Promise.reject(error);
  },
);

/* 导出常用函数 */
export class Http {
  static send(config, loading) {
    if (loading); // 这里可以做全局loading
    return service(config)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw new Error(error);
      })
      .finally(() => {
        // 如果做了loading，这里可以做清除
      });
  }

  static get(url, params = {}, loading = false) {
    const config = {
      method: 'get',
      url,
      params,
    };
    return Http.send(config, loading);
  }

  static post(url, data = {}, loading = false) {
    const config = {
      method: 'post',
      url,
      data,
    };
    return Http.send(config, loading);
  }

  static put(url, data = {}, params = {}, loading = false) {
    const config = {
      method: 'put',
      url,
      data,
      params,
    };
    return Http.send(config, loading);
  }

  static _delete(url, data = {}, loading = false) {
    const config = {
      method: 'delete',
      url,
      data,
    };
    return Http.send(config, loading);
  }
}

export default service;
