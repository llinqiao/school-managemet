<template>
  <Scroll :data="list" @pullup="loadMore" @pulldown="refresh">
    <slot></slot>
  </Scroll>
</template>

<script>
import Scroll from './index';
export default {
  name: 'list',
  components: { Scroll },
  data() {
    return {
      list: [],
      page: 0,
      number: 10,
      noMore: false,
    };
  },
  props: {
    requestFunc: Function,
    refreshGetList: Function,
    special: Boolean,
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    loadMore() {
      this.getList();
    },
    refresh() {},
    async getList(isRefresh = false) {
      if (isRefresh) {
        this.noMore = false;
        this.page = 0;
        this.list = [];
      }
      if (this.noMore) {
        this.$toast('没有更多数据了');
        return;
      }
      const res = await this.requestFunc(this.page, this.number);
      this.list = [...this.list, ...res.data];

      if (this.special) {
        this.$emit('input', this.list, res);
      } else {
        this.$emit('input', this.list, res.count ? res.count : 0);
      }
      if (res.data.length !== this.number) {
        this.noMore = true;
      } else {
        this.page++;
      }
    },
  },
  created() {},
  mounted() {
    if (!this.requestFunc) {
      console.error('Props requestFunc is required');
    } else {
      this.getList();
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
