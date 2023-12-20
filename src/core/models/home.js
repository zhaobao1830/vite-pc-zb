import apiServiceConfig from '@/core/config/apiService'
import { get } from '@/core/models/axios'

export default class home {
  // 获取ip
  static async getIp() {
    return get(apiServiceConfig.getIp)
  }


  // 通过ip获取大屏的详情信息
  static async getScreenByIp(ip) {
    return get(apiServiceConfig.getScreenByIp, {
      ip
    })
  }
}
