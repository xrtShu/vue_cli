<template>
  <div class="hello">
    <h2>♣ - ^ - ♣</h2>
    <span @click="complicateInfo" style="cursor: pointer">点我</span>
  </div>
</template>

<script>
import * as R from 'ramda'
import $ from 'jquery'
import http from '../utils/http_client'

// code 列表：http://www.cnblogs.com/wf225/p/4090737.html
const getWeatherInfo = (code) => {
  code = code || '101280101' // 默认广州
  return http.get(`data/cityinfo/${code}.html`, {})
}

export default {
  name: 'HelloWorld',
  data () {
    return {
      isLoading: false,
      weather: []
    }
  },
  methods: {
    /**
     * axios await 应用实例
     */
    // 方式1：then
    thenAxios (code) {
      getWeatherInfo(code).then(({ weatherinfo }) => {
        console.log(weatherinfo) // 天气信息
      })
    },
    // 方式2：await
    async awaitAxios (code) {
      let { weatherinfo } = await getWeatherInfo(code)
      console.log(weatherinfo)
    },
    // 并发：
    async complicateInfo () {
      let beiJing = () => {
        return getWeatherInfo('101010100')
      }
      let shangHai = () => {
        return getWeatherInfo('101020100')
      }
      let tianJin = () => {
        return getWeatherInfo('101030100')
      }
      let chongQing = () => {
        return getWeatherInfo('101040100')
      }
      let shenZhen = () => {
        return getWeatherInfo('101280601')
      }
      [...this.weather] = await Promise.all([beiJing(), shangHai(), tianJin(), chongQing(), shenZhen()])
      console.log(this.weather, 'weather')
    }
  },
  mounted () {
    // 使用jquery
    console.log($)

    // R.__ 柯里化函数的参数占位符
    let greet = R.replace('{name}', R.__, 'Hello, {name}!')
    console.log(greet('Alice')) // => 'Hello, Alice!'

    // add
    console.log(R.add(6, 2)) // 8

    // adjust: 将数组中指定索引处的值替换为经函数变换的值
    console.log(R.adjust(R.toUpper, 1, ['x', 'r', 't']))

    // all: 如果列表中的所有元素都满足 predicate，则返回 true；否则，返回 false。
    // 若第二个参数自身存在 all 方法，则调用自身的 all 方法。
    let equals3 = R.equals(3)
    let isAll = R.all(equals3)([3, 3])
    console.log(isAll, '♣') // => true

    // axios 的使用
    this.thenAxios()
    this.awaitAxios('101281301')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
