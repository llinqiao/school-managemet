<template>
  <div class="complete-question">
    <div class="schedule">进度：{{ currentIndex + 1 }}/{{ questionContent.length }}</div>
    <div
      id="say"
      v-for="(question, index) in questionContent"
      :key="question.id"
      :detail="question"
      v-show="currentIndex === index"
    >
      <div class="question-msg">
        <h1>{{ question.title }}</h1>
        <img :src="question.cover" alt="cover" />
        <div class="answer-msg-item">
          <h3>此题有{{ question.count }}个参考答案</h3>
          <button @click="isShowAnswer = !isShowAnswer">{{ isShowAnswer ? '隐藏' : '查看' }}答案</button>
          <div class="answer-modal" v-show="isShowAnswer">
            <ul class="answer-list">
              <li
                v-for="(item, index) in question.count"
                :key="index"
                class="answer-item"
              >{{ question[`answer_${indexDict[index]}`] || '暂无' }}</li>
            </ul>
          </div>
        </div>
      </div>
      <ul class="user-anser-list">
        <li class="user-answer-item">
          <div class="user">
            <p
              :class="{ error: question[`user_answer_first`] !== 1 }"
            >{{ question[`answer_first_trans`] || '暂无' }}</p>
            <audio :src="question[`answer_first_url`]" preload></audio>
            <i
              v-if="type === 0 && question[`answer_first_url`] && question[`answer_first_url`].includes('http')"
              class="play-btn"
              @click="playRecordAudio(question[`answer_first_url`])"
            ></i>
          </div>
          <div class="standard">
            对比标准答案：
            <span
              v-html="calcStudentAnswer(question.user_answer, question.answer_weight)"
            ></span>
          </div>
        </li>
      </ul>
    </div>
    <div class="bottom-btns">
      <button class="prev" :class="{ disable: currentIndex === 0 }" @click="prevQuestion">上一题</button>
      <button
        :class="{ disable: currentIndex === questionContent.length - 1 }"
        @click="nextQuestion"
      >下一题</button>
    </div>
    <audio ref="audioPlayer"></audio>
  </div>
</template>

<script>
import { getNormalSayOrWrite, getExpandSayOrWrite, getChildSayOrWrite } from '@/api/share';
import { covSayOrWrite } from '../../../lib/utils';
export default {
  name: 'index',
  components: {},
  data() {
    return {
      currentIndex: 0,
      testId: '',
      type: 0,
      content: {},
      indexDict: {
        0: 'first',
        1: 'secend',
        2: 'third',
        3: 'fourth',
        4: 'fifth',
      },
      isShowAnswer: false,
    };
  },
  props: {
    detail: {
      type: Object,
      default: null,
    },
  },
  filters: {},
  computed: {
    audioPlayer() {
      return this.$refs.audioPlayer;
    },
    questionContent() {
      return this.detail || this.content;
    },
  },
  watch: {},
  methods: {
    prevQuestion() {
      if (this.currentIndex === 0) return;
      this.currentIndex--;
    },
    nextQuestion() {
      if (this.currentIndex === this.questionContent.length - 1) return;
      this.currentIndex++;
    },
    playRecordAudio(src) {
      if (!src) {
        this.$toast('暂无录音');
        return;
      }
      this.audioPlayer.src = src;
      this.audioPlayer.play();
    },
    calcStudentAnswer(words, lack) {
      return covSayOrWrite(words, lack);
    },
  },
  async created() {
    // this.testId = this.$route.query.froduction_test_word_id;
    // this.type = parseInt(this.$route.query.type, 10) || 0;
    // this.content = await getSayOrWrite(this.testId, this.type);
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      vm.testId = to.query.id;
      vm.type = parseInt(to.query.type, 10);
      if (to.name === 'sayorwrite_expand') {
        // 拓展课程
        vm.content = await getExpandSayOrWrite(vm.testId, vm.type);
      } else if (to.name === 'sayorwrite_child') {
        // 幼儿英语
        vm.content = await getChildSayOrWrite(vm.testId);
      } else {
        // 普通课程
        vm.content = await getNormalSayOrWrite(vm.testId, vm.type);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.complete-question {
  padding-bottom: 120px;
}
.schedule {
  padding: 30px;
  padding-bottom: 0;
  font-size: 26px;
}
.bottom-btns {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 140px;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  background: $white;
  box-shadow: 0 0 16px 2px rgba(226, 226, 226, 0.42);
  button {
    width: 335px;
    height: 100px;
    background: $primary;
    border-radius: 6px;
    font-size: 30px;
    &.prev {
      background: #feca61;
    }
    &.disable {
      background: $bgColor;
    }
  }
}
</style>

<style lang='scss' scoped>
@import '@/css/var.scss';
#say {
  padding: 30px;
  audio {
    width: 0;
    height: 0;
  }
  .question-msg {
    padding: 26px 27px 22px 27px;
    background: #f5fafc;
    border-radius: 10px;
    h1 {
      margin-bottom: 20px;
      color: #323333;
      font-size: 26px;
    }
    img {
      width: 100%;
    }
    .answer-msg-item {
      position: relative;
      display: flex;
      height: 42px;
      align-items: center;
      margin-top: 20px;
      h3 {
        color: #323333;
        font-size: 26px;
      }
      button {
        height: 42px;
        padding: 0 10px;
        margin-left: auto;
        background: #fedc34;
        border-radius: 4px;
        font-size: 24px;
      }
      .answer-modal {
        position: absolute;
        bottom: 72px;
        left: -30px;
        width: 690px;
        padding: 30px 38px;
        background: $white;
        border-radius: 6px;
        box-shadow: 0 0 27px 8px rgba(216, 216, 216, 0.42);
        color: #323333;
        font-size: 36px;
        .answer-item {
          padding: 10px 0;
          border-bottom: 1px solid #e5e5e5;
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
  .user-anser-list {
    .user-answer-item {
      padding: 26px 27px;
      margin-top: 25px;
      background: $white;
      border-radius: 6px;
      box-shadow: 0 0 27px 8px rgba(216, 216, 216, 0.42);
      color: #323333;
      font-size: 36px;
      .user {
        display: flex;
        align-items: center;
        p {
          flex: 1;
          // text-align: center;
          word-break: break-all;
          &.error {
            color: #ff2a00;
          }
        }
        i {
          width: 46px;
          height: 46px;
          margin-left: 39px;
          background: url(./img/play-btn.png) no-repeat center center / cover;
        }
      }
      .standard {
        margin-top: 30px;
        /deep/ .error {
          color: #ff2a00;
        }
      }
    }
  }
}
</style>
