<template>
  <!-- 每日挑战 -->
  <div class="challenge">
    <!-- 题目数量 -->
    <QuestionNum :num="detail.list.length" />

    <div class="container">
      <!-- 读 -->
      <div v-if="detail.type === 1" class="question-title" v-html="detail.content"></div>
      <!-- 听 -->
      <div v-else>
        <CustomAudio :src="detail.content" />
      </div>
      <!-- 题目列表 -->
      <QuestionList :list="detail.list" />
    </div>

  </div>
</template>

<script>
import QuestionNum from './question-num';
import CustomAudio from '@/components/audio/index';
import QuestionList from './question-list';

export default {
  name: 'challenge',
  components: { QuestionNum, CustomAudio, QuestionList },
  data() {
    return {};
  },
  props: {
    detail: Object,
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
.challenge {
  .container {
    padding: 20px;
  }
}
.question-title {
  padding: 20px;
  background: $white;
  border-radius: 6px;
  white-space: wrap;
  word-break: break-all;
}
/deep/ .question-list {
  margin-top: 1px;
}
</style>
