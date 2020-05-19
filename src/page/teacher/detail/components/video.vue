<template>
  <div class="video">
    <QuestionNum :num="list.length" />
    <div class="container">
      <QuestionList :list="questionList" />
    </div>
  </div>
</template>

<script>
import QuestionNum from './question-num';
import QuestionList from './question-list';

export default {
  name: 'videoTest',
  components: { QuestionNum, QuestionList },
  data() {
    return {};
  },
  props: {
    list: Array,
  },
  filters: {},
  computed: {
    questionList() {
      return this.list.map(item => ({
        ...item.word_log,
        // 0是未做 1是正确 2是不正确
        answer: item.type === 0 ? item.answer : item.answer,
        user_answer: item.word_log && item.word_log.user_answer,
        questionType: item.type,
      }));
    },
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.container {
  padding: 20px;
}
</style>
