import apiServiceConfig from '@/core/config/apiService'
import {post} from '@/core/models/axios'

export default class home {
  // 登录
  static async login(data) {
    return post(apiServiceConfig.login, data)
  }
}
