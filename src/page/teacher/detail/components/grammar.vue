<template>
  <!-- 语法测试 -->
  <div class="grammar">
    <!-- tab bar -->
    <ul class="tab-bar">
      <a
        v-for="item in typeList"
        :key="item"
        :class="{ active: activeType === item }"
        :href="'#' + item"
        @click="selectType(item)">
        {{ questionTypeName[item] }}
      </a>
    </ul>
    <!-- 题目数量 -->
    <QuestionNum :num="questionNum" />

    <div class="container">
      <!-- 题目列表 -->
      <div class="question-type" v-for="item in list" :key="item.type" :id="item.type" ref="questionTypeEleList">
        <div class="question-group" v-for="(group, groupIndex) in item.list" :key="groupIndex">
          <h2 class="group-title">{{ group.tag }}</h2>
          <p class="group-desc">{{ group.desc }}</p>
          <!-- 语音题 -->
          <CustomAudio v-if="item.type === questionType.audio" :src="group.audio" />
          <!-- 阅读题 -->
          <div v-if="item.type === questionType.read" v-html="group.content" class="read-question-title"></div>

          <QuestionList v-if="item.type !== questionType.write" :list="group.subject" />

          <!-- 填空题 -->
          <div v-else class="write">
            <div v-for="(question, questionIndex) in group.subject" :key="question.id" class="write-item">
              <h3>{{ questionIndex + 1 }}. {{ question.title }}</h3>
              <p>你孩子答案：<span>{{ question.user_answer }}</span></p>
              <p>正确答案：<span>{{ question.answer }}</span></p>
            </div>
          </div>
        </div>
      </div>
      <!-- <QuestionList :list="list" /> -->
    </div>
  </div>
</template>

<script>
import QuestionNum from './question-num';
import QuestionList from './question-list';
import { QUESTION_TYPE_CN, QUESTION_TYPE } from '../../../../constans';
import CustomAudio from '@/components/audio/index';

export default {
  name: 'list',
  components: { QuestionNum, QuestionList, CustomAudio },
  data() {
    return {
      questionTypeName: QUESTION_TYPE_CN,
      activeType: 0,
      questionType: QUESTION_TYPE,
    };
  },
  props: {
    list: Array,
  },
  filters: {},
  computed: {
    typeList() {
      return this.list.map(item => item.type);
    },
    questionEleList() {
      return this.$refs.questionTypeEleList;
    },
    questionNum() {
      let counter = 0;
      this.list.forEach(item => {
        counter += item.list.reduce((prev, cur) => prev + cur.subject.length, 0);
      });
      return counter;
    },
  },
  watch: {
    list: {
      handler() {
        this.activeType = this.list[0].type;
        this.activeType = Number(location.hash.split('#')[1]);
      },
      deep: true,
    },
  },
  methods: {
    selectType(item) {
      // this.activeType = Number(item);
      // magic code
      location.href = `#${item}`;
      location.href = `#${item}`;
    },
    calcNowActive() {
      for (let i = 0; i < this.questionEleList.length; i++) {
        const nowEle = this.questionEleList[i];
        if (nowEle.offsetTop - document.body.scrollTop > -80) {
          this.activeType = Number(nowEle.id);
          break;
        }
      }
    },
  },
  created() {},
  mounted() {
    console.log(location.hash);
    this.activeType = Number(location.hash.split('#')[1]);
    window.addEventListener('scroll', this.calcNowActive);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.calcNowActive);
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.grammar {
  padding-top: 80px;
}
.container {
  padding: 20px;
}
.tab-bar {
  position: fixed;
  z-index: 1;
  top: 0;
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: space-between;
  padding: 0 40px;
  background: $white;
  color: rgba(50, 51, 51, 0.8);
  font-size: 28px;
  line-height: 80px;
  a {
    &.active {
      position: relative;
      color: $mainFontColor;
      font-weight: bold;
      &:before {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 6px;
        background: $primary;
        content: '';
      }
    }
  }
}
.question-group {
  line-height: 1;
  .group-title {
    font-size: 30px;
  }
  .group-desc {
    margin-top: 9px;
    margin-bottom: 17px;
    color: rgba(50, 51, 51, 0.8);
    font-size: 24px;
  }
  /deep/ .question-list {
    margin-top: 1px;
    margin-bottom: 20px;
  }
  .read-question-title {
    padding: 20px;
    background: $white;
    border-radius: 6px;
    font-size: 30px;
    white-space: wrap;
    word-break: break-all;
  }
  .write {
    margin-bottom: 20px;
    .write-item {
      padding: 20px 30px;
      margin-top: 20px;
      background: $white;
      border-radius: 6px;
      font-size: 30px;
      p {
        margin-top: 20px;
        font-size: 28px;
        span {
          color: $primary;
        }
      }
    }
  }
}
</style>
