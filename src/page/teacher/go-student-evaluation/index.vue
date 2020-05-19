<template>
  <div class="go-student-evaluation">
    <Evaluation :evaluationData="data" @change="dataChange" :isCanChange="false" />
    <van-field
      v-model="message"
      rows="6"
      type="textarea"
      placeholder="你对老师说的悄悄话～"
      class="textarea"
    />
    <div class="button-container">
      <button class="button" @click="addEvaluation">匿名评价</button>
    </div>
  </div>
</template>

<script>
import Evaluation from '@/components/evaluation';
import { Rate, Field } from 'vant';
export default {
  name: 'goStudentEvaluation',
  components: { Evaluation, Rate, Field },
  data() {
    return {
      data: [
        { name: '今天课堂趣味性', value: 0 },
        { name: '今天课堂秩序', value: 0 },
        { name: '今天体验的成就感', value: 0 },
        { name: '喜欢今天课堂的程度', value: 0 },
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
.go-student-evaluation {
  height: 100%;
  background-color: $bgColorNew;
  padding-top: 20px;
  .textarea {
    margin-top: 20px;
    padding-top: 27px;
  }
  .button-container {
    height: 100px;
    margin: 24px 24px 0;
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
