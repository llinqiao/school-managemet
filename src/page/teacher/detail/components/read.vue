<template>
  <div class="read">
    <QuestionNum :num="list.length" />
    <ul class="question-list">
      <li v-for="item in list" :key="item.word_self_id" class="question-item">
        <div class="title">
          <span class="cn">{{ item.name }}</span>
          <span class="syllable">{{ item.english_name }}</span>
          <SimpleAudio :src="item.audio" />
        </div>
        <h4>你孩子的回答</h4>
        <div class="answer">
          <div class="first">
            <SimpleAudio :src="item.word_log.answer_first_url" />
            <span>{{ item.word_log.answer_first_score }}分</span>
          </div>
          <div class="second" v-show="item.word_log.answer_secend_url">
            <SimpleAudio :src="item.word_log.answer_secend_url" />
            <span>{{ item.word_log.answer_secend_score }}分</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import QuestionNum from './question-num';
import SimpleAudio from '@/components/audio/simple';

export default {
  name: 'read',
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
    display: flex;
    height: 160px;
    align-items: center;
    justify-content: space-between;
    padding: 0 140px;
    box-shadow: 0 0 27px 8px rgba(216, 216, 216, 0.42);
    font-size: 36px;
    /deep/ .simple-audio {
      width: 46px;
      height: 46px;
    }
    .first,
    .second {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        margin-top: 23px;
        font-size: 24px;
      }
    }
    &.error {
      color: #ff2a00;
    }
  }
}
</style>
