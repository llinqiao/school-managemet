<template>
  <div class="evaluation-colleague">
    <Evaluation :evaluationData="data" @change="dataChange" :isCanChange="false" />
    <div class="content">
      <div class="can-select button" @click="submitEvaluation">匿名评价</div>
    </div>
  </div>
</template>

<script>
import { Rate, Field, Toast } from 'vant';
import { evaluationTeacher } from '@/api/teacher/evaluation';
import Evaluation from '@/components/evaluation';
export default {
  name: 'evaluationColleague',
  components: { Rate, Field, Evaluation, Toast },
  data() {
    return {
      data: [
        { name: '德', value: 0 },
        { name: '勤', value: 0 },
        { name: '劳', value: 0 },
        { name: '积极性', value: 0 },
        { name: '主动性', value: 0 },
      ],

      // evaluationName: '',
      evaluationId: '',
      message: '',
    };
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    dataChange(index, value) {
      console.log(index, value, 'sdasd');
      const copyData = JSON.parse(JSON.stringify(this.data));
      copyData[index][value] = value;
      this.data = copyData;
    },
    async submitEvaluation() {
      await evaluationTeacher({
        teacher_comment_id: this.evaluationId,
        one: this.data[0].value,
        two: this.data[1].value,
        three: this.data[2].value,
        four: this.data[3].value,
        five: this.data[4].value,
      });
      Toast.success('评价成功');
      setTimeout(() => {
        Toast.clear();
        this.$router.go(-1);
      }, 1000);
    },
  },
  created() {},
  mounted() {
    this.evaluationId = this.$route.query.id;
    // this.evaluationName = this.$route.query.name;
    this.$route.meta.title = this.$route.query.name + '老师';
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.evaluation-colleague {
  height: 100%;
  background-color: $bgColorNew;

  .content {
    .button {
      height: 100px;
      margin: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333333;
      border-radius: 6px;
      &:active {
        background: rgba(255, 221, 53, 0.7);
      }
    }
    .can-not-select {
      background: rgba(255, 221, 53, 0.3);
    }
    .can-select {
      background: $primary;
    }
  }
}
</style>
