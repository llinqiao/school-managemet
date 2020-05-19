<template>
  <div class="production">
    <QuestionNum :num="list.length" />
    <ul class="question-list">
      <li v-for="(item, index) in list" :key="item.froduction_id" class="question-item">
        <div class="title-area">
          <h3 class="title">
            <span class="index">No.{{ index + 1 }}</span>
            &nbsp;
            <span>{{ item.title }}</span>
          </h3>
          <img :src="item.cover" class="cover">
        </div>
        <h4>参考答案</h4>
        <ul class="answer-list">
          <template v-for="(xh, xhIndex) in answerXh">
            <li :key="xh" v-if="item[`answer_${xh}`]">
              {{ xhIndex + 1 }}.{{ item[`answer_${xh}`] }}
            </li>
          </template>
        </ul>
        <template v-if="item.word_log">
          <h4>你孩子的回答</h4>
          <div class="child-answer">
            <p>
              {{ item.word_log.answer_first_trans }}
            </p>
            <SimpleAudio :src="item.word_log.answer_first_url" />
          </div>
          <h4>对比标准答案</h4>
          <div class="diff-answer">
            <p v-html="calcStudentAnswer(item.word_log.user_answer, item.word_log.answer_weight)"></p>
            <!-- <SimpleAudio :src="item.audio" /> -->
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import QuestionNum from './question-num';
import SimpleAudio from '@/components/audio/simple';
import { studentAnswerCov } from '../../../../lib/utils';
export default {
  name: 'production',
  components: { QuestionNum, SimpleAudio },
  data() {
    return {
      answerXh: ['first', 'secend', 'third', 'fourth', 'fifth'],
    };
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
.question-list {
  padding: 30px;
  margin-top: 10px;
  background: $white;
  .question-item {
    .title-area {
      padding: 27px;
      background: #f5fafc;
      border-radius: 10px;
      .title {
        font-size: 26px;
        .index {
          color: #3d9dff;
        }
      }
      .cover {
        width: 100%;
        margin-top: 25px;
        border-radius: 8px;
      }
    }
    h4 {
      padding: 22px 0;
      font-size: 30px;
      line-height: 1;
    }
    .answer-list {
      li {
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .answer-list,
    .child-answer,
    .diff-answer {
      padding: 30px 40px;
      border-radius: 6px;
      box-shadow: 0 0 27px 8px rgba(216, 216, 216, 0.42);
      font-size: 36px;
    }
    .child-answer,
    .diff-answer {
      display: flex;
      align-items: center;
      p {
        width: 550px;
        margin-right: auto;
        /deep/ .error {
          color: #ff2a00;
        }
      }
      /deep/ .simple-audio {
        width: 46px;
        height: 46px;
      }
    }
  }
}
</style>
