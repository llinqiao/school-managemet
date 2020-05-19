<template>
  <div class="student-evaluation-detail">
    <Evaluation :evaluationData="data" @change="dataChange" :isCanChange="true" />
    <div class="evaluation-content">
      <div
        class="text"
      >自从孩子上了您的课后，孩子的学习兴趣提高了很多回家做作业变主动了，脑瓜子也灵光了，身手也敏捷了，心情也舒畅了，每天的胃口也变好了，学习成绩也提高了，感谢老师，谢谢您的付出！</div>
      <div class="time">
        <span>评价时间</span>
        <!-- {{ item.time | moment('YYYY.MM.DD') }} -->
        <span>2020.01.02</span>
      </div>
    </div>
  </div>
</template>

<script>
import Evaluation from '@/components/evaluation';
import { Rate } from 'vant';
export default {
  name: 'studentEvaluationDetail',
  components: { Evaluation, Rate },
  data() {
    return {
      data: [
        { name: '今天课堂趣味性', value: 2 },
        { name: '今天课堂秩序', value: 3 },
        { name: '今天体验的成就感', value: 4 },
        { name: '喜欢今天课堂的程度', value: 5 },
      ],
      message: '',
    };
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    dataChange(index, value) {
      const copyData = JSON.parse(JSON.stringify(this.data));
      copyData[index][value] = value;
      this.data = copyData;
    },
    addEvaluation() {
      this.$router.go(-1);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.student-evaluation-detail {
  height: 100%;
  background-color: $bgColorNew;
  padding-top: 20px;
  .evaluation-content {
    padding: 0 24px;
    background-color: $white;
    .text {
      background: rgba(245, 245, 245, 1);
      border-radius: 6px;
      padding: 26px 24px 38px;
    }
    .time {
      height: 94px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #999999;
    }
  }
}
</style>
