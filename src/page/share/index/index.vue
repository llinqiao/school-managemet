<template>
  <div id="index">
    <h1>美柏</h1>

    <router-link to="/normal?id=3&type=0">普通课程_说一说_整套</router-link>
    <router-link to="/normal?id=3&type=1">普通课程_写一写_整套</router-link>

    <router-link to="/normal-story?id=23">普通课程_故事分享</router-link>
    <router-link to="/normal-complete?id=9&type=0">普通课程_说一说_难词库_整套</router-link>
    <router-link to="/normal-complete?id=9&type=1">普通课程_写一写_难词库_整套</router-link>

    <router-link to="/expand?id=8&type=0">拓展课程_说一说_整套</router-link>
    <router-link to="/expand?id=8&type=1">拓展课程_写一写_整套</router-link>

    <router-link to="/expand-story?id=23">拓展课程_故事分享</router-link>
    <router-link to="/expand-complete?id=9&type=0">拓展课程_说一说_难词库_整套</router-link>
    <router-link to="/expand-complete?id=9&type=1">拓展课程_写一写_难词库_整套</router-link>


    <router-link to="/child?id=8&type=0">幼儿英语_说一说_整套</router-link>

    <router-link to="/child-story?id=23">幼儿英语_故事分享</router-link>
    <!-- <router-link to="/child-complete?id=9">幼儿英语_难词库_整套</router-link> -->
  </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data() {
    return {};
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
#index {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    margin-bottom: 100px;
    font-size: 90px;
    font-weight: bold;
  }
  a {
    font-size: 48px;
    font-weight: bold;
  }
}
</style>
