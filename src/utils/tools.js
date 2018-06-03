/**
 * 转为数组的方法
 */
const toArray = (() =>
  Array.from ? Array.from : obj => [].slice.call(obj)
)()

/**
 * 合并数组，求并集
 */
const concatArray = (arr1, arr2) => {
  return toArray(new Set([...arr1, ...arr2]))
}

/**
 * 垂直滑动相对距离
 */
const pcScrollBy = (eleTarget, positionY) => {
  if (eleTarget.scrollBy) {
    eleTarget.scrollBy(0, positionY)
  } else {
    eleTarget.scrollTop += positionY // 兼容搜狗
  }
}

/**
 * 返回顶部
 */
const pcScrollTo = (eleTarget, positionY) => {
  if (eleTarget.scrollTo) {
    eleTarget.scrollTo(0, positionY)
  } else {
    eleTarget.scrollTop = positionY // 兼容搜狗
  }
}

/**
 * 获取uri 的指定参数
 */
const getQueryString = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let path = window.location.hash.slice(1)
  let search = path.slice(path.indexOf('?'))
  let r = search.substr(1).match(reg)
  if (r !== null) {
    return unescape(r[2])
  }
  return null
}

/**
 * 更新uri 的指定参数
 */
const updateQueryStringParam = (uri, key, value) => {
  let re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
  let separator = uri.indexOf('?') !== -1 ? '&' : '?'
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2')
  } else {
    return uri + separator + key + '=' + value
  }
}

/**
 * 批量更新uri 的指定参数
 */
const batchUpdateQueryStringParam = (uri, map) => {
  let nUri = uri
  for (let [key, value] of map.entries()) {
    nUri = updateQueryStringParam(nUri, key, value)
  }
  return nUri
}

/**
 * 删除uri 的指定参数
 */
const deleteQueryStringParam = (url, ref) => {
  let str = ''
  if (url.indexOf('?') !== -1) {
    str = url.substr(url.indexOf('?') + 1)
  } else {
    return url
  }
  let arr = ''
  let returnUrl = ''
  if (str.indexOf('&') !== -1) {
    arr = str.split('&')
    for (let i in arr) {
      if (arr[i].split('=')[0] !== ref) {
        returnUrl = returnUrl + arr[i].split('=')[0] + '=' + arr[i].split('=')[1] + '&'
      }
    }
    return url.substr(0, url.indexOf('?')) + '?' + returnUrl.substr(0, returnUrl.length - 1)
  } else {
    arr = str.split('=')
    if (arr[0] === ref) {
      return url.substr(0, url.indexOf('?'))
    } else {
      return url
    }
  }
}

/**
 * 批量删除uri 的指定参数
 */
const batchDeleteQueryStringParam = (uri, map) => {
  let nUri = uri
  for (let key of map.keys()) {
    nUri = deleteQueryStringParam(nUri, key)
  }
  return nUri
}

export {
  toArray,
  concatArray,
  pcScrollBy,
  pcScrollTo,
  getQueryString,
  updateQueryStringParam,
  batchUpdateQueryStringParam,
  deleteQueryStringParam,
  batchDeleteQueryStringParam
}
