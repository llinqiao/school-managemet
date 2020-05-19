<template>
    <div id='hello'>
        <h1>Hello, world!</h1>
        <button @click='openLoadToast'>toast 弹一下</button>
        <button @click='openLoadToastDelay3s'>toast 3s 后关闭</button>
        <scroll :probeType='2' @scroll='scroll' @pullup='pullup' @pulldown='pulldown' @scrollStop='scrollStop' class='scroll-wrapper'
            ref='scroll'>
            <ul>
                <li v-for='(item, index) in 100' :key='index' :class='"item-" + index'>{{ item }}</li>
            </ul>
        </scroll>
        <button @click='scrollTo'>滚动到某个位置</button>
        <button @click='scrollToEle'>滚动到88</button>
    </div>
</template>

<script>
// import { mapMutations, mapActions } from 'vuex';
import Scroll from '../scroll/index';

export default {
  name: 'app',
  components: {
    Scroll,
  },
  data() {
    return {};
  },
  filters: {},
  computed: {
    scrollEle() {
      return this.$refs.scroll;
    },
  },
  watch: {},
  methods: {
    openLoadToast() {
      this.$toast('弹toast');
    },
    openLoadToastDelay3s() {
      this.$toast('delay 3s toast', 3000, {
        color: 'red',
        backgroundColor: 'rgba(125, 43, 86, .4)',
      });
    },
    scroll(pos) {
      console.log(pos);
    },
    pullup() {
      console.log('上拉事件');
    },
    pulldown() {
      console.log('下拉事件');
    },
    scrollStop() {
      console.log('滚动停止了');
    },
    scrollTo() {
      this.scrollEle.scrollTo(0, 1000);
    },
    scrollToEle() {
      this.scrollEle.scrollToElement(document.querySelector('.item-88'));
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang='scss'>
@import './index.scss';
</style>
