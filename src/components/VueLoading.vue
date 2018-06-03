<template>
  <div v-if="visible" class="loading-mask">
    <div class="vue-loading"
         :class="customerClass"
         :style="loadingStyle"
         v-html="svg"></div>
  </div>

</template>

<script>
import * as svgLoading from '../assets/svg'

export default {
  name: 'vue-loading',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'spiningDubbles'
    },
    color: {
      type: String,
      default: 'rgb(90, 190, 220)'
    },
    width: {
      type: Number,
      default: 48
    },
    height: {
      type: Number,
      default: 48
    },
    customerClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    svg () {
      return svgLoading[this.type]
    },
    loadingStyle () {
      return { fill: this.color, width: `${this.width}px`, height: `${this.height}px` }
    }
  }
}
</script>

<style lang="less">
  .loading-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
    height: auto;
    background-color: hsla(0, 0%, 100%, .0);
    z-index: 9999;
  }

  .vue-loading {
    position: absolute;
    margin: 50%;
    top: -24px;
    left: -24px;
    z-index: 10000;
  }
</style>
