<template>
  <div class="complete-question">
    <div class="schedule">
      进度：{{ currentIndex + 1 }}/{{ questionList.length }}
    </div>
    <QuestionItem
      v-for="(question, index) in questionList"
      :key="question.id"
      :detail="question"
      :compoentType="type"
      v-show="currentIndex === index" />
    <div class="bottom-btns">
      <button class="prev" :class="{ disable: currentIndex === 0 }" @click="prevQuestion">上一题</button>
      <button :class="{ disable: currentIndex === questionList.length - 1 }" @click="nextQuestion">下一题</button>
    </div>
  </div>
</template>

<script>
import {
  getNormalCompleteQuestion,
  getExpandCompleteQuestion,
  getChildCompleteQuestion,
} from '../../../api/share';
import QuestionItem from '../say-or-write/index-component';
export default {
  name: 'complete-question',
  components: { QuestionItem },
  data() {
    return {
      id: '',
      questionList: [],
      currentIndex: 0,
    };
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    prevQuestion() {
      if (this.currentIndex === 0) return;
      this.currentIndex--;
    },
    nextQuestion() {
      if (this.currentIndex === this.questionList.length - 1) return;
      this.currentIndex++;
    },
  },
  created() {},
  async mounted() {
    this.id = this.$route.query.id;
    this.type = parseInt(this.$route.query.type, 10);
    const name = this.$route.name;
    if (name === 'complete_expand') {
      // 拓展
      this.questionList = await getExpandCompleteQuestion(this.id);
    } else if (name === 'complete_child') {
      // 幼儿
      this.questionList = await getChildCompleteQuestion(this.id);
    } else {
      // 普通
      this.questionList = await getNormalCompleteQuestion(this.id);
    }
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
