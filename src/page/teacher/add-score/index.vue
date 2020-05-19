<template>
  <div class="add-score">
    <div class="input-container" @click="()=>{show=true}">
      <span class="name">考试名称</span>
      <div class="right">
        <span class="test-name">{{testName}}</span>
        <img src="./img/right.png" class="img" />
      </div>
    </div>
    <div class="input-container" @click="()=>{subjectShow=true}">
      <span class="name">考试科目</span>
      <div class="right">
        <span class="test-name">{{subjectName}}</span>
        <img src="./img/right.png" class="img" />
      </div>
    </div>
    <div class="input-container">
      <span class="name">考试分数</span>
      <input v-model="score" class="input" dir="rtl" placeholder="请输入" />
    </div>
    <div class="button-container" v-if="score&&testName!=='请选择'&&subjectName!=='请选择'">
      <button class="button" @click="addScoreSubmit">确认添加</button>
    </div>

    <div class="button-container" v-else>
      <button class="not-button">确认添加</button>
    </div>

    <van-action-sheet v-model="show" :actions="actions" @select="onSelect"></van-action-sheet>
    <van-action-sheet v-model="subjectShow" :actions="subjectActions" @select="onSubjectSelect"></van-action-sheet>
  </div>
</template>

<script>
import { ActionSheet, Toast } from 'vant';
import { createSchoolTest } from '@/api/teacher/test';
export default {
  name: 'addScore',
  components: { ActionSheet, Toast },
  data() {
    return {
      id: '',
      score: '',
      testName: '请选择',
      testNumber: '',
      subjectName: '请选择',
      subjectNumber: '',
      actions: [{ name: '平时成绩', value: 0 }, { name: '期末成绩', value: 1 }],
      subjectActions: [{ name: '英语', value: 0 }, { name: '数学', value: 1 }],
      show: false,
      subjectShow: false,
    };
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    async addScoreSubmit() {
      await createSchoolTest(this.testNumber, this.score, this.subjectNumber, this.id);
      Toast.success('创建成功');
      setTimeout(() => {
        Toast.clear();
        this.$router.go(-1);
      }, 1000);
    },
    onSelect(item) {
      this.show = false;
      this.testName = item.name;
      this.testNumber = item.value;
    },
    onSubjectSelect(item) {
      this.subjectShow = false;
      this.subjectName = item.name;
      this.subjectNumber = item.value;
    },
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.add-score {
  height: 100%;
  background-color: $bgColorNew;
  ::-webkit-input-placeholder {
    font-size: 28px;
    font-weight: 400;
  } /* 使用webkit内核的浏览器 */
  :-moz-placeholder {
    font-size: 28px;
    font-weight: 400;
  } /* Firefox版本4-18 */
  ::-moz-placeholder {
    font-size: 28px;
    font-weight: 400;
  } /* Firefox版本19+ */
  :-ms-input-placeholder {
    font-size: 28px;
    font-weight: 400;
  } /* IE浏览器 */
  .input-container {
    height: 110px;
    background-color: $white;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .name {
      font-size: 32px;
      color: #666666;
    }
    .input {
      height: 110px;
      font-size: 36px;
      font-weight: 500;
    }
    .right {
      display: flex;
      align-items: center;
      .test-name {
        font-size: 28px;
        margin-right: 8px;
      }
      .img {
        width: 12px;
        height: 24;
      }
    }
  }
  .button-container {
    height: 100px;
    margin: 24px 24px 0;
    .button {
      height: 100px;
      width: 100%;
      border-radius: 6px;
      font-size: 28px;
      background-color: $primary;
    }
    .not-button {
      height: 100px;
      width: 100%;
      border-radius: 6px;
      font-size: 28px;
      background-color: $notVisiblePrimary;
    }
  }
}
</style>
