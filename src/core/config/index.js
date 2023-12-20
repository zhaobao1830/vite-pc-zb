// 全局配置
const config = {
  baseUrl: import.meta.env.VITE_APP_API_URL || '/api/',
  wsUrl: import.meta.env.VITE_APP_WS_URL,
  logoUrl: import.meta.env.VITE_APP_LOGO_URL
}

export default config
