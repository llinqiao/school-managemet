<template>
  <div class="student-evaluation">
    <div class="content">
      <div class="header">
        <div class="left">
          <div class="img"></div>
          <span class="title">待评价老师</span>
        </div>
        <span class="right">共{{noEvaluationList&&noEvaluationList.length}}位</span>
      </div>
      <div class="no-evaluation" @click="goEvalution">
        <div class="item" v-for="item in noEvaluationList" :key="item.rollcall_student_id">
          <span class="title">{{item.teacher.employee_name}}</span>
          <div class="right">
            <span class="prompt">去评价</span>
            <img src="./img/right.png" class="img" />
          </div>
        </div>
      </div>
      <div class="header">
        <div class="left">
          <div class="img"></div>
          <span class="title">已评价老师</span>
        </div>
        <span class="right">共{{evaluationList&&evaluationList.length}}位</span>
      </div>
      <div class="no-evaluation" @click="goEvalutionDetail">
        <div class="item" v-for="item in evaluationList" :key="item.rollcall_student_id">
          <span class="title">{{item.teacher.employee_name}}</span>
          <div class="right">
            <span class="prompt">查看</span>
            <img src="./img/right.png" class="img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEvaluation } from '@/api/parents/evaluation';
export default {
  name: 'StudentEvaluation',
  data() {
    return {
      noEvaluationList: [],
      evaluationList: [],
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
    goEvalution() {
      this.$router.push('/parent/gostudentevaluation');
    },
    goEvalutionDetail() {
      this.$router.push('/parent/studentevaluationdetail');
    },
  },
  created() {},
  async mounted() {
    this.noEvaluationList = (await getEvaluation(100, 0, 0, 0)).data || [];
    this.evaluationList = (await getEvaluation(10, 0, 0, 1).data) || [];
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';

.student-evaluation {
  // height: 100%;
  background-color: $bgColorNew;
  .content {
    .header {
      height: 100px;
      display: flex;
      padding-right: 24px;
      justify-content: space-between;
      align-items: center;
      background-color: $white;
      .left {
        display: flex;
        align-items: center;
        .img {
          width: 10px;
          height: 34px;
          background: $primary;
          border-radius: 0px 6px 6px 0px;
          margin-right: 24px;
        }
        .title {
          font-size: 32px;
          font-weight: 400;
          letter-spacing: 1px;
        }
      }
      .right {
        font-size: 28px;
        font-weight: 400;
      }
    }
    .no-evaluation {
      padding: 20px 24px 0;
      .item {
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $white;
        margin-bottom: 20px;
        padding: 0 24px;
        .name {
          font-size: 28px;
          font-weight: 400;
          letter-spacing: 1px;
        }
        .right {
          display: flex;
          align-items: center;
          .prompt {
            font-size: 28px;
            color: #999999;
            margin-right: 8px;
          }
          .img {
            width: 12px;
            height: 24px;
          }
        }
      }
    }
  }
}
</style>
