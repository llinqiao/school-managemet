<template>
  <div class="status" :class="status">
  </div>
</template>

<script>
export default {
  name: 'list',
  components: {},
  data() {
    return {};
  },
  props: {
    status: {
      type: String,
      default: 'normal',
    },
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.status {
  width: 37px;
  height: 37px;
  $list: success, fail, normal;
  @each $item in $list {
    &.#{$item} {
      background: url(./img/#{$item}.png) no-repeat center center / contain;
    }
  }
}
</style>
