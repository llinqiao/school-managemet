<template>
  <div class="story">
    <ul class="question-list">
      <li class="question-item" v-for="(item, index) in list" :key="item.id">
        <img :src="item.cover">
        <template v-if="index % 2">
          <p>{{ item.sentence }}</p>
          <h3>你孩子的回答</h3>
          <div class="student-answer">
            <p class="sentence" v-html="calcStudentAnswer(item.sentence, item.word_log.answer_first_lack)"></p>
            <SimpleAudio :src="item.word_log.answer_first_url" />
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { studentAnswerCov } from '../../../../lib/utils';
import SimpleAudio from '@/components/audio/simple';

export default {
  name: 'story',
  components: { SimpleAudio },
  data() {
    return {};
  },
  props: {
    list: Array,
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    calcStudentAnswer(words, lack) {
      return studentAnswerCov(words, lack);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.story {
  min-height: 100%;
  font-size: 36px;
  h3 {
    font-size: 30px;
  }
}
.question-list {
  .question-item {
    padding: 30px;
    background: $white;
    &:nth-child(2n) {
      padding-top: 0;
      margin-bottom: 10px;
    }
    &:nth-child(2n + 1) {
      padding-bottom: 0;
    }
    img {
      width: 100%;
      border-radius: 8px;
    }
    h3 {
      margin-top: 40px;
      font-size: 30px;
    }
    .student-answer {
      display: flex;
      align-items: center;
      padding: 25px 30px;
      margin-top: 20px;
      border-radius: 6px;
      box-shadow: 0 0 27px 8px rgba(216, 216, 216, 0.42);
      color: #2dd37f;
      /deep/ .error {
        color: #ff2a00;
      }
      .sentence {
        flex: 1;
      }
      /deep/ .simple-audio {
        width: 46px;
        height: 46px;
        margin-left: 36px;
      }
    }
  }
}
</style>
