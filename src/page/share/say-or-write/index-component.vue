<template>
  <div id="say">
    <div class="question-msg">
      <h1>{{ questionContent.title }}</h1>
      <img :src="questionContent.cover" alt="cover">
      <div class="answer-msg-item">
        <h3>此题有{{ questionContent.count }}个参考答案</h3>
        <button @click="isShowAnswer = !isShowAnswer">{{ isShowAnswer ? '隐藏' : '查看' }}答案</button>
        <div class="answer-modal" v-show="isShowAnswer">
          <ul class="answer-list">
            <li v-for="(item, index) in questionContent.count" :key="index" class="answer-item">
              {{ questionContent[`answer_${indexDict[index]}`] || '暂无' }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ul class="user-anser-list">
      <li class="user-answer-item">
        <div class="user">
          <p :class="{ error: questionContent[`user_answer_first`] !== 1 }">{{ questionContent[`answer_first_trans`] || '暂无' }}</p>
          <audio :src="questionContent[`answer_first_url`]" preload></audio>
          <i
            v-if="compoentType === 0 && questionContent[`answer_first_url`] && questionContent[`answer_first_url`].includes('http')"
            class="play-btn"
            @click="playRecordAudio(questionContent[`answer_first_url`])"
          >
          </i>
        </div>
        <div class="standard">
          对比标准答案：
          <span v-html="calcStudentAnswer(questionContent.user_answer, questionContent.answer_weight)"></span>
        </div>
      </li>
      <!-- <li v-for="(item, index) in questionContent.count" :key="index" class="user-answer-item">
        <p :class="{ error: content[`user_answer_${indexDict[index]}`] !== 1 }">{{ content[`answer_${indexDict[index]}_trans`] || '暂无' }}</p>
        <audio :src="content[`answer_${indexDict[index]}_url`]" preload></audio>
        <i v-if="type === 0" class="play-btn" @click="playRecordAudio(content[`answer_${indexDict[index]}_url`])"></i>
      </li> -->
    </ul>
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
    compoentType: {
      type: Number,
      default: 0,
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
      // vm.type = parseInt(to.query.type, 10);
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
