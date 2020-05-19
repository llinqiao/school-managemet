<template>
  <div class="container">
    <TypeBar v-model="homeWorkType" />
    <div class="scroll-wrapper">
      <List
        v-for="(item, key) in typeList"
        v-show="homeWorkType === key.split('_')[1]"
        :type="key.split('_')[1]"
        :key="key"
        :requestFunc="getList(key.split('_')[1])"
        />
    </div>
  </div>
</template>

<script>
import TypeBar from './components/tabbar';
import List from './components/list';
import { HOME_WORK_TYPE_CN } from '@/constans';
import { getHomeWorkList } from '@/api/homework';
export default {
  name: 'list',
  components: { TypeBar, List },
  data() {
    return {
      homeWorkType: null,
      typeList: HOME_WORK_TYPE_CN,
    };
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    getList(type) {
      return function() {
        return getHomeWorkList(type, ...arguments);
      };
    },
  },
  created() {},
  mounted() {
    if (this.$route.query.type) {
      this.homeWorkType = this.$route.query.type;
    } else {
      this.homeWorkType = Object.keys(HOME_WORK_TYPE_CN)[0].split('_')[1];
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.container {
  height: 100%;
  background: #f8f8f8;
}
.scroll-wrapper {
  height: calc(100% - 104px);
  margin-top: 24px;
}
</style>
