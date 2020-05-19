<template>
  <ul class="question-list">
    <li v-for="(item, index) in list" :key="item.challenge_test_id">
      <h3>{{ index + 1 }}.{{ item.title }}</h3>
      <!-- 语音题 -->
      <div v-if="item.questionType === 1" class="audio-result">
        <h4>你的回答</h4>
        <div class="answer-card">
          <p>
            {{ item.answer_first_trans }}
          </p>
          <SimpleAudio :src="item.answer_first_url" />
        </div>
        <h4>对比标准答案</h4>
        <div class="answer-card" >
          <p v-html="calcStudentAnswer(item.answer, item.answer_weight)"></p>
          <!-- <SimpleAudio :src="item.answer_total" /> -->
        </div>
      </div>
      <!-- 选择题 -->
      <div v-else class="select-result">
        <div class="answer-item" v-for="(num, en) in questionXh" :key="en">
          <status :status="item[`answer_${num}`] | answerStatusFilter(item.answer, item.user_answer, item)" />
          <div class="question-content">{{ item[`answer_${num}`] }}</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { QUESTION_XH, QUESTION_TYPE } from '../../../../constans';
import { studentAnswerCov } from '../../../../lib/utils';
import SimpleAudio from '@/components/audio/simple';
export default {
  name: 'QuestionList',
  components: { SimpleAudio },
  data() {
    return {
      questionXh: QUESTION_XH,
      questionType: QUESTION_TYPE,
    };
  },
  props: {
    list: Array,
    type: Number,
  },
  filters: {
    answerStatusFilter(en, answer, userAnswer, item) {
      const temp = ['first', 'second', 'third', 'fourth'];
      const answerArr = ['A', 'B', 'C', 'D'];
      let index = answerArr.indexOf(answer);
      if (index !== -1) {
        answer = item[`answer_${temp[index]}`];
      }
      index = answerArr.indexOf(userAnswer);
      if (index !== -1) {
        userAnswer = item[`answer_${temp[index]}`];
      }
      // en = en.toUpperCase();
      console.log(answer, userAnswer, en);
      if (answer === en) return 'success';
      if (userAnswer === en && userAnswer !== answer) return 'fail';
      return 'normal';
    },
  },
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
.question-list {
  li {
    margin-top: 20px;
    background: $white;
    border-radius: 6px;
    &:first-child {
      margin-top: 0;
    }
    h3 {
      padding: 20px 32px;
      font-size: 30px;
    }

    .audio-result {
      padding: 0 25px;
      padding-bottom: 35px;
    }
    .select-result {
      border-top: 1px solid #e5e5e5;
    }
    .answer-item {
      display: flex;
      align-items: center;
      padding-left: 30px;
      .question-content {
        flex: 1;
        padding: 30px 0;
        border-bottom: 1px solid rgba(149, 169, 246, 0.3);
        margin-left: 28px;
        font-size: 30px;
      }
      &:last-child {
        .question-content {
          border-bottom: none;
        }
      }
    }
    h4 {
      padding-left: 34px;
      margin-top: 20px;
      font-size: 30px;
    }
    .answer-card {
      display: flex;
      align-items: center;
      padding: 23px 29px 33px 35px;
      margin-top: 22px;
      border-radius: 6px;
      box-shadow: 0 0 27px 8px rgba(216, 216, 216, 0.42);
      font-size: 36px;
      p {
        flex: 1;
        white-space: wrap;
        word-break: break-all;
      }
      /deep/ .error {
        color: #ff2a00;
      }
    }
  }
}
</style>
