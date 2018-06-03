/**
 * 这里'/data', 代表了domainUrl，在config/index.js 做了设置
 */

const API_DOMAIN = {
  app: '/data'
}

export default {
  weather: {
    // 此处命名请求地址，并赋值. 以'/' 开头
    cityInfo: API_DOMAIN.app + '/cityinfo/'
  }
}
