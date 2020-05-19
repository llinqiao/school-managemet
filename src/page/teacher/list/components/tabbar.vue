<template>
  <div class="tab-bar">
    <ul class="type-list">
      <li
        v-for="(item, key) in typeList"
        :key="key"
        :class="{ active: activeType === key.split('_')[1] }"
        @click="switchType(key.split('_')[1])">{{ item }}</li>
      <div class="placeholder">1</div>
    </ul>
  </div>
</template>

<script>
import { HOME_WORK_TYPE_CN } from '@/constans';
export default {
  name: 'list',
  components: {},
  data() {
    return {
      typeList: HOME_WORK_TYPE_CN,
      activeType: null,
    };
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  filters: {},
  computed: {},
  watch: {
    activeType(val) {
      this.$emit('input', this.activeType);
    },
    value(val) {
      this.activeType = val;
    },
  },
  methods: {
    switchType(key) {
      this.activeType = key;
      this.$router.push(`?type=${key}`);
    },
  },
  created() {},
  mounted() {
    // if (this.value) {
    //   this.activeType = this.value;
    // } else {
    //   this.activeType = Object.keys(HOME_WORK_TYPE_CN)[0];
    //   this.$emit('input', this.activeType);
    // }
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.tab-bar {
  background: $white;
  overflow-x: auto;
  .type-list {
    display: flex;
    height: 80px;
    align-items: center;
    padding: 0 37px;
    color: rgba(50, 51, 51, 0.8);
    font-size: 28px;
    li {
      height: 100%;
      margin-right: 49px;
      line-height: 80px;
      white-space: nowrap;
      &:last-child {
        margin-right: 30px;
      }
      &.active {
        position: relative;
        color: $mainFontColor;
        font-weight: bold;
        &:before {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: $primary;
          content: '';
        }
      }
    }
    .placeholder {
      color: transparent;
    }
  }
}
</style>
