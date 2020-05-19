<template>
  <div class="detail" v-if="detail">

    <!-- 挑战自我 -->
    <Challenge v-if="type === homeworkType.challenge" :detail="detail" />

    <!-- 语法测试 -->
    <Grammar v-else-if="type === homeworkType.grammar" :list="detail.data" />

    <!-- 视频测试 -->
    <VideoTest
      v-else-if="type === homeworkType.grammarVideo || type === homeworkType.video"
      :list="detail.data" />

    <!-- 普通课程 -->
    <template v-else>
      <!-- 故事 -->
      <Story v-if="lessonType === lessonTypeList.story" :list="detail.data" />
      <!-- 自检 -->
      <!-- <SelfCheck v-else-if="lessonType === lessonTypeList.selfCheck" :list="detail.data" /> -->
      <!-- 多音节 -->
      <!-- <Syllable v-else-if="lessonType === lessonTypeList.syllablePractise" :list="detail.data" /> -->
      <!-- 写一写 -->
      <!-- <Write v-else-if="lessonType === lessonTypeList.write" :list="detail.data" /> -->
      <!-- 读 -->
      <!-- <Read v-else-if="lessonType === lessonTypeList.read" :list="detail.data" /> -->
      <!-- 说一说 -->
      <Production v-else-if="lessonType === lessonTypeList.production" :list="detail.data" />
      <!-- 翻转课堂 -->
      <!-- <Flip v-else-if="lessonType === lessonTypeList.flipClass" :list="detail.data" /> -->
      <!-- 单元测试 -->
      <Unit v-else-if="lessonType === lessonTypeList.unitQuiz" :list="detail.data" />
      <Word v-else :list="detail.data" />
    </template>
  </div>
</template>

<script>
import { getHomeWorkDetail } from '../../../api/homework';
import { HOME_WORK_TYPE, NORMAL_LESSON_TYPE } from '../../../constans';

import Challenge from './components/challenge';
import Grammar from './components/grammar';
import VideoTest from './components/video';
import Story from './components/story';
// import SelfCheck from './components/self-check';
// import Syllable from './components/syllable';
// import Write from './components/write';
// import Read from './components/read';
import Production from './components/production';
import Unit from './components/unit';
import Word from './components/word';

export default {
  name: 'detail',
  components: {
    Challenge,
    Grammar,
    VideoTest,
    Story,
    // SelfCheck,
    // Syllable,
    // Write,
    // Read,
    Production,
    Unit,
    Word,
  },
  data() {
    return {
      type: '',
      listId: '',
      detailId: '',
      detail: null,
      homeworkType: HOME_WORK_TYPE,
      lessonTypeList: NORMAL_LESSON_TYPE,
      lessonType: '',
    };
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  async mounted() {
    this.type = Number(this.$route.params.type);
    this.listId = this.$route.params.listId;
    this.detailId = this.$route.params.detailId;
    this.lessonType = this.$route.query.lesson_type;

    try {
      this.detail = await getHomeWorkDetail(this.type, this.listId, this.detailId);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.detail {
  min-height: 100%;
  background: #f8f8f8;
}
</style>
