import http from '../utils/http_client'
import api from '../config/api_path'

// code 列表：http://www.cnblogs.com/wf225/p/4090737.html
const getWeatherInfo = (code) => {
  code = code || '101280101' // 默认广州
  return http.get(`${api.weather.cityInfo}${code}.html`, {})
}

export {
  getWeatherInfo
}
