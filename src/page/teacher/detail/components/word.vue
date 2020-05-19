<template>
  <div class="write">
    <!-- <QuestionNum :num="list.length" /> -->
    <div class="question-num">
      <span>题目数</span>
      <span>{{ list.length }}</span>
    </div>
    <ul class="question-list">
      <li v-for="(item, index) in list" :key="item.word_self_id" class="question-item">
        <div class="title">
          <span class="cn">{{ index + 1 }}</span>
          <span
            class="syllable"
            :class="{ active: item.nameIndex === index1}"
            v-for="(word, index1) in item.name"
            :key="index1"
          >{{ word }} </span>
          <div class="chinese">{{ item.title }}</div>
        </div>
        <div class="answer">
          <span class="left">您孩子的回答</span>
          <span class="right">{{ item.word_log && item.word_log.user_answer }}</span>
        </div>
        <div class="word-audio">
          <div class="left">
            <img src="../../../../../static/icon_answer.png" />
            <i
              v-for="(word, index) in item.syllable"
              :key="index"
              :style="{color: index % 2 !== 0 ? '#EE3E00' : '#1B190F'}"
            >{{word}}</i>
          </div>
          <div class="right" @click="operateAudio(item, index)">
            <img v-if="isPlay && index === activeIndex" src="../../../../../static/icon_playing.png" />
            <img v-else src="../../../../../static/icon_voice.png" />
            <span>播放</span>
          </div>
        </div>
        <div class="word-explanation">
          <img src="../../../../../static/icon_n.png" />
          <span>{{ item.speech }}</span>
        </div>
      </li>
    </ul>
    <audio style="display: none;" :src="src" ref="audio" @ended="isPlay = false" />
  </div>
</template>

<script>
// import QuestionNum from './question-num';
// import SimpleAudio from '@/components/audio/simple';

export default {
  name: 'write',
  components: {
    // QuestionNum,
    // SimpleAudio,
  },
  data() {
    return {
      isPlay: false,
      src: '',
      activeIndex: 0,
    };
  },
  props: {
    list: Array,
  },
  filters: {},
  computed: {
    audioEle() {
      return this.$refs.audio;
    },
  },
  watch: {},
  methods: {
    operateAudio(item, index) {
      this.activeIndex = index;
      if (this.src !== item.audio) {
        this.src = item.audio;
        this.$nextTick(() => {
          this.isPlay = true;
          this.audioEle.play();
        });
      } else {
        if (this.isPlay) {
          this.isPlay = false;
          this.audioEle.pause();
        } else {
          this.isPlay = true;
          this.audioEle.play();
        }
      }
    },
  },
  created() {},
  mounted() {
    this.list.forEach(item => {
      // 发音红黑处理
      if (item.syllable) {
        item.syllable = item.syllable.split('-');
      }
      // 正确答案
      let tempArr = item.name.split(' ');
      tempArr.forEach((temp, index) => {
        if (temp.indexOf('_') >= 0) {
          tempArr[index] = item.answer;
          item.nameIndex = index;
        }
      });
      item.name = tempArr;
    });
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.question-num {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 0 35px 0 23px;
  background-color: #fff;
  color: #88877f;
  font-size: 28px;
}
.question-item {
  margin-top: 20px;
  background: #f2f2f2;
  line-height: 1;
  .title {
    padding: 30px 30px 66px;
    background: #fff;
    color: #1b190f;
    font-size: 36px;
    text-align: center;
    .cn {
      margin-bottom: 30px;
    }
    .syllable {
      font-size: 30px;
      &.active {
        color: #277c39;
        text-decoration: underline;
      }
    }
    .chinese {
      margin-top: 32px;
      color: #88877f;
      font-size: 30px;
    }
  }
  .answer {
    display: flex;
    width: 710px;
    height: 100px;
    align-items: center;
    justify-content: space-between;
    padding: 0 21px 0 23px;
    margin: 20px auto;
    background: #fff;
    border-radius: 8px;
    color: #88877f;
    font-size: 30px;
    .right {
      color: #1b190f;
    }
  }
  .word-audio,
  .word-explanation {
    position: relative;
    display: flex;
    width: 710px;
    height: 100px;
    align-items: center;
    justify-content: space-between;
    padding: 0 21px 0 20px;
    margin: 20px auto;
    background: #fff;
    border-radius: 8px;
  }
  .word-audio {
    .left {
      display: flex;
      align-items: center;
      color: rgba(27, 25, 15, 1);
      font-family: DINPro-Medium, DINPro;
      font-size: 48px;
      font-weight: 500;
      img {
        width: 40px;
        height: 40px;
        margin-right: 15px;
      }
    }
    .right {
      display: flex;
      width: 152px;
      height: 64px;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px 0 27px;
      border: 1px solid rgba(27, 25, 15, 1);
      border-radius: 8px;
      color: rgba(27, 25, 15, 1);
      font-family: PingFangSC-Regular, PingFang SC;
      font-size: 30px;
      font-weight: 400;
      img {
        width: 24px;
        height: 34px;
      }
    }
  }
  .word-explanation {
    justify-content: flex-start;
    color: rgba(27, 25, 15, 1);
    font-family: PingFangSC-Regular, PingFang SC;
    font-size: 30px;
    img {
      width: 32px;
      height: 40px;
      margin-right: 15px;
      margin-left: 4px;
    }
  }
}
</style>
