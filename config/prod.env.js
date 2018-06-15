'use strict'

// 默认为生产环境
const ENV = process.env.NODE_ENV || 'production'

module.exports = {
  NODE_ENV: `"${ENV}"`
}
