<template>
  <div class="syllable">
    <QuestionNum :num="list.length" />
    <ul class="question-list">
      <li v-for="item in list" :key="item.word_self_id" class="question-item">
        <div class="title">
          <span class="cn">{{ item.name }}</span>
          <span class="syllable">{{ item.english_name_syllable.join('-') }}</span>
          <SimpleAudio :src="item.audio" />
        </div>
        <h4>你孩子的回答</h4>
        <div class="answer" :class="{ error: item.word_log.answer !== 1 }">{{ item.word_log.answer_first_url.split('|').join('-') }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import QuestionNum from './question-num';
import SimpleAudio from '@/components/audio/simple';

export default {
  name: 'syllable',
  components: { QuestionNum, SimpleAudio },
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
    display: flex;
    height: 134px;
    align-items: center;
    padding: 0 25px;
    background: #f5fafc;
    font-size: 42px;
    .cn {
      margin-right: 40px;
    }
    .syllable {
      margin-right: auto;
      font-size: 46px;
    }
  }
  h4 {
    padding: 22px 0;
    font-size: 30px;
    line-height: 1;
  }
  .answer {
    height: 134px;
    padding: 0 25px;
    box-shadow: 0 0 27px 8px rgba(216, 216, 216, 0.42);
    font-size: 36px;
    line-height: 134px;
    &.error {
      color: #ff2a00;
    }
  }
}
</style>
