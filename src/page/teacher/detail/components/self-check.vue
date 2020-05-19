<template>
  <div class="self-check">
    <QuestionNum :num="list.length" />
    <ul class="question-list">
      <li v-for="item in list" :key="item.word_self_id" class="question-item">
        <div class="title">{{ item.name }}</div>
        <h4>你孩子的回答</h4>
        <div class="answer" :class="{ error: item.word_log.answer !== 1 }">{{ item.word_log.answer_first_url }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import QuestionNum from './question-num';
export default {
  name: 'self-check',
  components: { QuestionNum },
  data() {
    return {};
  },
  props: {
    list: Array,
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
.question-item {
  padding: 23px 30px 32px 30px;
  margin-top: 10px;
  background: $white;
  line-height: 1;
  .title {
    padding: 47px 20px;
    background: #f5fafc;
    font-size: 42px;
    text-align: center;
  }
  h4 {
    padding: 22px 0;
    font-size: 30px;
    line-height: 1;
  }
  .answer {
    padding: 50px 20px;
    box-shadow: 0 0 27px 8px rgba(216, 216, 216, 0.42);
    font-size: 36px;
    text-align: center;
    &.error {
      color: #ff2a00;
    }
  }
}
</style>
