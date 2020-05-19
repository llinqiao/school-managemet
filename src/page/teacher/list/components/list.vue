<template>
  <LoadScroll :requestFunc="requestFunc" v-model="list">
    <ul class="work-list">
      <li v-for="item in list" :key="item.id" class="work-card">
        <div class="left">
          <h2>{{ item.title }}</h2>
          <span class="time">
            {{ item.time | moment('YYYY-MM-DD HH:mm') }}
            {{ item.status != statucDict.complete ? '前需完成' : '已完成' }}
          </span>
        </div>
        <div class="right">
          <button
            :class="{ active: item.status === statucDict.complete }"
            :disabled="item.status !== statucDict.complete"
            @click="watchScore(item)">
            {{ statusDictCN[item.status] }}
          </button>
        </div>
      </li>
    </ul>
  </LoadScroll>
</template>

<script>
import LoadScroll from '@/components/scroll/load';
import { HOME_WORK_STATUS_CN, HOME_WORK_STATUS } from '@/constans';
export default {
  name: 'list',
  components: { LoadScroll },
  data() {
    return {
      list: [],
      statucDict: HOME_WORK_STATUS,
      statusDictCN: HOME_WORK_STATUS_CN,
    };
  },
  props: {
    requestFunc: Function,
    type: String,
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    watchScore(item) {
      let type = '';
      if (item.unit_module_id === 1) {
        type = `1_${item.word_module_id}`;
      } else {
        type = item.unit_module_id;
      }
      this.$router.push(`score/${this.type}/${item.id}${type ? `?lesson_type=${type}` : ''}`);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.work-list {
  padding: 0 24px;
  .work-card {
    display: flex;
    align-items: center;
    padding: 28px 20px;
    margin-bottom: 20px;
    background: $white;
    border-radius: 6px;
    &:last-child {
      margin-bottom: 0;
    }
    .left {
      width: 480px;
      margin-right: 50px;
      h2 {
        font-size: 30px;
      }
      .time {
        color: #999;
      }
    }
    .right {
      button {
        width: 120px;
        height: 55px;
        background: #dcdcdc;
        border-radius: 6px;
        color: #999;
        font-size: 24px;
        &.active {
          background: $primary;
          color: $mainFontColor;
        }
      }
    }
  }
}
</style>
