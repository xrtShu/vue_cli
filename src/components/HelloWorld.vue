<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links - ♣</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import * as R from 'ramda'
import $ from 'jquery'
import axios from 'axios'

const getWeatherInfo = () => {
  return axios.get('data/cityinfo/101280101.html', {})
}

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    /**
     * axios await 应用实例
     */
    // 方式1：then
    thenAxios () {
      getWeatherInfo().then(({ data }) => {
        console.log(data.weatherinfo) // 天气信息
      })
    },
    // 方式2：await
    async awaitAxios () {
      let { data } = await getWeatherInfo()
      console.log(data.weatherinfo)
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
    this.awaitAxios()
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
