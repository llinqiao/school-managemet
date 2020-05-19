<template>
  <div class="intended-customer">
    <div class="list">
      <ul class="school-test-list">
        <li v-for="item in list" :key="item.id" class="item">
          <div class="title">
            <span class="key">{{item.student_name}}({{ gradeConstans[item.grade]}})</span>
            <span class="value">{{item.mobile}}</span>
          </div>
          <div class="time">
            <span>推荐时间</span>
            <span>{{item.created_at|moment('YYYY.MM.DD')}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="button-container">
      <button class="button" @click="addIntended">新增推荐</button>
    </div>
  </div>
</template>

<script>
import { getIntendedList } from '@/api/parents/intended';
import { GRADE } from '@/constans';
export default {
  name: 'SchoolTestScore',
  components: {},
  data() {
    return {
      list: [],
      gradeConstans: GRADE,
    };
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    addIntended() {
      this.$router.push(`/parent/addIntended`);
    },
  },
  created() {},
  async mounted() {
    this.list = (await getIntendedList()).data;
    console.log(this.list, 'list');
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.intended-customer {
  height: 100%;
  .list {
    padding-top: 20px;
    height: calc(100% - 140px);
    background: $bgColorNew;
    .item {
      padding: 33px 24px 20px;
      background-color: $white;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 32px;
        .key {
          font-size: 32px;
          font-weight: 400;
          color: #333333;
        }
        .value {
          font-size: 32px;
          font-weight: 500;
        }
      }
      .time {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28px;
        margin-top: 11px;
        color: #999999;
      }
    }
  }
  .button-container {
    padding: 20px 24px;
    .button {
      height: 100px;
      width: 100%;
      border-radius: 6px;
      font-size: 28px;
      background-color: $primary;
    }
  }
}
</style>
