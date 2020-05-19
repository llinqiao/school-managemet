<template>
  <div class="add-intended">
    <div class="img-wrapper">
      <img src="./img/bac.png" class="img" />
    </div>
    <div class="input-container">
      <span class="name">姓名</span>
      <input v-model="name" class="input" dir="rtl" placeholder="请输入" />
    </div>

    <div class="input-container">
      <span class="name">手机号码</span>
      <input v-model="mobile" class="input" dir="rtl" placeholder="请输入" type="number" />
    </div>

    <div class="input-container" @click="selectGrade">
      <span class="name">年级</span>
      <div class="right">
        <span class="test-name">{{grade}}</span>
        <img src="./img/right.png" class="img" />
      </div>
    </div>
    <div class="subject-container">
      <div class="subject-title">意向学科</div>
      <div class="subject-item-container">
        <div
          v-for="(item,index) in subjectName"
          :key="index"
          v-bind:class="{'subject-item':true,'active-item':(index===currentIndex)}"
          @click="()=>{currentIndex=index}"
        >
          {{item}}
          <img
            v-if="typeof currentIndex ==='number'&&index===currentIndex"
            src="./img/select-icon.png"
            class="select-img"
          />
        </div>
      </div>
    </div>
    <div class="button-container" v-if="canSubmit">
      <button class="button" @click="addIntendedSubmit">报名</button>
    </div>

    <div class="button-container" v-else>
      <button class="not-button">报名</button>
    </div>
    <van-action-sheet v-model="show" :actions="gradeArr" @select="onSelect"></van-action-sheet>
  </div>
</template>

<script>
import { Switch, ActionSheet, Toast } from 'vant';
import { GRADE } from '@/constans';
import { report } from '@/api/teacher/intended';
import { isPhoneNumber } from '@/lib/utils';
export default {
  name: 'addIntended',
  components: { Switch, ActionSheet, Toast },
  data() {
    return {
      name: '',
      mobile: '',
      grade: '请选择',
      gradeNumber: 0,
      currentIndex: '',
      gradeObj: GRADE,
      subjectName: ['英语', '数学'],
      show: false,
      id: '',
    };
  },
  filters: {},
  computed: {
    canSubmit() {
      return (
        isPhoneNumber(this.mobile) &&
        this.name &&
        (this.currentIndex || this.currentIndex === 0) &&
        this.grade !== '请选择'
      );
    },
    gradeArr: function() {
      return Object.keys(this.gradeObj).map(item => {
        return { name: this.gradeObj[item], value: item };
      });
    },
  },
  watch: {},
  methods: {
    async addIntendedSubmit() {
      try {
        await report(this.name, this.mobile, this.gradeNumber, this.currentIndex, this.id);
        Toast.success('报名成功');
        setTimeout(() => {
          Toast.clear();
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
    selectGrade() {
      this.show = true;
    },
    onSelect(item) {
      this.show = false;
      this.grade = item.name;
      this.gradeNumber = item.value;
    },
    getParamValue(key) {
      var regex = new RegExp(key + '=([^&]*)', 'i');
      var res = location.href.match(regex);
      return res && res[1];
    },
  },
  created() {},
  mounted() {
    const teacherId = this.getParamValue('id');
    this.id = teacherId;
    console.log(teacherId, 'getParamValues');
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.add-intended {
  height: 100%;
  // padding-top: 20px;
  background-color: $bgColorNew;
  .img-wrapper {
    width: 100%;
    height: 431px;
    .img {
      width: 100%;
      height: 100%;
    }
  }
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
    border-bottom: 1px solid $line;
    &:last-child {
      border-bottom: 0;
    }
    .name {
      font-size: 32px;
      color: #666666;
    }
    .input {
      height: 110px;
      font-size: 28px;
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
  .subject-container {
    padding: 24px;
    background-color: $white;
    margin-top: 20px;
    .subject-title {
      font-size: 28px;
      font-weight: 400;
      margin-bottom: 20px;
    }
    .subject-item-container {
      display: flex;
      .subject-item {
        height: 64px;
        padding: 0 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(245, 245, 245, 1);
        color: #666666;
        margin-right: 20px;
        border-radius: 6px;
      }
      .active-item {
        background-color: $primary;
        position: relative;
        color: #333333;
        border: 1px solid rgba(255, 221, 53, 1);
        .select-img {
          width: 24px;
          height: 24px;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
  .van-action-sheet {
    height: 30%;
  }
}
</style>
