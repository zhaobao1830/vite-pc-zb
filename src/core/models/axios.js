import axios from 'axios'
import Config from '@/core/config'
import {decryptWithAes, encryptBase64, encryptWithAes, generateAesKey} from '@/core/utils/crypto.js'
import { encrypt } from '@/core/utils/jsencrypt.js'
import { tansParams } from '@/core/utils/ruoyi'

const config = {
  baseURL: Config.baseUrl,
  timeout: 5 * 10000, // 请求超时时间设置
  // 跨域时允许携带凭证
  widthCredentials: true
}

// 创建请求实例
const _axios = axios.create(config)
_axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'
axios.defaults.headers.clientid = import.meta.env.VITE_APP_CLIENT_ID

const encryptHeader = 'encrypt-key'

let cancel
// 对axios的request配置
_axios.interceptors.request.use(async (config) => {
  // 发起请求的时候，如果之前的请求没有完成，就将之前的请求取消
  if (typeof (cancel) === 'function' && config.isCancel === true) {
    cancel('强制取消了请求')
  }
  config.cancelToken = new axios.CancelToken(function(c) {
    cancel = c
  })

  // 是否需要加密
  const isEncrypt = 'true'

  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  }

  if (import.meta.env.VITE_APP_ENCRYPT === 'true') {
    // 当开启参数加密
    if (isEncrypt && (config.method === 'post' || config.method === 'put')) {
      // 生成一个 AES 密钥
      const aesKey = generateAesKey()
      config.headers[encryptHeader] = encrypt(encryptBase64(aesKey))
      config.data = typeof config.data === 'object' ? encryptWithAes(JSON.stringify(config.data), aesKey) : encryptWithAes(config.data, aesKey)
      console.log(config.data)
      console.log(decryptWithAes(config.data, aesKey))
    }
  }

  return config
}, error => {
  return Promise.reject(error)
})

// 对axios的response配置
_axios.interceptors.response.use((response) => {
  cancel = null
  const res = response.data
  if (res.code === 501) {
    // 501是和后端商定的错误码
    return Promise.reject(response)
  } else {
    return Promise.resolve(res)
  }
}, err => {
  console.log(err)
  cancel = null
  if (axios.isCancel(err)) {
    // 中断promise链接
    return new Promise(() => {})
  } else {
    console.log('请求错误，请重新发起请求！')
    // 把错误继续向下传递
    return Promise.reject(err)
  }
})

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 * @param isCancel 是否触发取消
 */
export function post(url, data = {}, params = {}, isCancel = false) {
  return _axios({
    method: 'post',
    url,
    data,
    params,
    isCancel
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * @param {string} url
 * @param {object} params
 * @param isCancel 是否触发取消
 */
export function get(url, params = {}, isCancel = false) {
  return _axios({
    method: 'get',
    url,
    params,
    isCancel
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function put(url, data = {}, params = {}) {
  return _axios({
    method: 'put',
    url,
    params,
    data
  }).catch((err) => {
    console.log(err)
  })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function _delete(url, params = {}) {
  return _axios({
    method: 'delete',
    url,
    params
  }).catch((err) => {
    console.log(err)
  })
}

export default _axios
