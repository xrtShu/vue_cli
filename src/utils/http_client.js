'use strict'

import axios from 'axios'
import qs from 'qs'
import store from '../store'
import * as types from '../store/mutation-types'

// loading
let num = 0

const openLoading = () => {
  if (!num) {
    store.dispatch(types.OPEN_LOADING)
  }
  num++
}

const closeLoading = () => {
  num--
  if (!num) {
    store.dispatch(types.CLOSE_LOADING)
  }
}

// 直接返回结果的code码集合
const responseCode = [
  '0000',
  'APBIZ15003', // 商品库存为0
  'APBIZ15001', // 商品库存不足
  'APBIZ16001', // 商品下架
  'APBIZ14003', // 未登录
  'AAFAV20002', // 商品已收藏
  'EPSCS15003', // 商品加车超过库存但部分加入
  'APBIZ14002', // 商品下架
  'APBIZ14005' // 收藏商品下架
]

// 判断是否归属于返回结果的code码集合
const checkResCode = (code) => {
  return responseCode.indexOf(code) >= 0
}

// 添加请求拦截器
axios.interceptors.request.use(
  // 在发送请求之前做些什么
  (config) => {
    // 开启loading
    openLoading()
    return config
  },
  // 对请求错误做些什么
  (error) => {
    // 开启loading
    openLoading()
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  // 响应数据
  (response) => {
    // 关闭loading
    closeLoading()
    return response
  },
  // 响应错误
  (error) => {
    // 关闭loading
    closeLoading()
    return Promise.resolve(error.response)
  }
)

function checkStatus (response) {
  // checkStatus
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
  }
  // 异常状态下把错误信息返回去
  return false
}

function checkCode (res) {
  // code异常(包括网络错误，服务器错误，后端抛出的错误)
  if (res && (checkResCode(res.code) || res.code === undefined)) {
    return res
  }
  // 服务器错误，后端抛出的错误
  let msg = (res && res.msg) ? res.msg : '网络繁忙，请稍后尝试'
  window.alert(msg)
  return false
}

export default {
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then((response) => {
        return checkStatus(response)
      })
      .then((res) => {
        return checkCode(res)
      })
  },
  post (url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
      .then((response) => {
        return checkStatus(response)
      })
      .then((res) => {
        return checkCode(res)
      })
  },
  postJson (url, data) {
    return axios({
      method: 'post',
      url,
      data: data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  postForm (url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'multipart/form-data '
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
