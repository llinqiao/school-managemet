<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
    </div>
</template>

<script>
export default {
  name: 'app',
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

<style>
</style>
