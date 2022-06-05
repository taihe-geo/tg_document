import axios from 'axios'
export const instance = axios.create({
    baseURL: "http://localhost:9000",
})
instance.defaults['retry'] = 2
instance.defaults['retryDelay'] = 1000
instance.interceptors.request.use(
    function (config) {
        //防止模型跨域
        return config
    },
    function (error: any) {
        return Promise.reject(error)
    }
)
instance.interceptors.response.use(
    function (response: { data: any; config: any }) {
        let data = response.data.code ? response.data : response
        return data
    },
    function (err: any) {
        // 对响应错误做点什么
        // console.log('请求失败', err.config)
        let config = err.config
        // 如果config不存在或没有设置重试选项，则拒绝
        if (!config || !config.retry) return Promise.reject(err)
        // 超过重试次数报错
        if (config?.__retryCount >= config.retry) {
            // Reject with the error
            return Promise.reject(err)
        }

        //设置用于跟踪重新链接计数的变量
        config.__retryCount = config?.__retryCount || 0

        // 超过重试次数报错
        if (config?.__retryCount >= config.retry) {
            // Reject with the error
            return Promise.reject(err)
        }
        config.__retryCount++
        let backoff = new Promise(function (resolve) {
            setTimeout(function () {
                resolve(1)
            }, config.retryDelay || 1)
        })
        // 重新请求
        return backoff.then(function () {
            return instance(config)
        })
    }
)
export * from './doc'