<template>
  <div class="home-page">
    <div class="content">
      <router-link
        to="./myschedule"
        class="item"
        v-if="emplooyType===1||(!emplooyType&&emplooyType!==0)"
      >
        <img src="./img/study-schedule.png" class="item-img" />
        <span class="item-title">我的课表</span>
      </router-link>
      <router-link to="./evaluationarea" class="item">
        <img src="./img/evaluation-area.png" class="item-img" />
        <span class="item-title">评论专区</span>
      </router-link>
      <router-link to="./payrollrecords" class="item">
        <img src="./img/payroll-records.png" class="item-img" />
        <span class="item-title">工资记录</span>
      </router-link>
      <router-link
        to="./evaluationforme"
        class="item"
        v-if="emplooyType===1||(!emplooyType&&emplooyType!==0)"
      >
        <img src="./img/evaluation-for-me.png" class="item-img" />
        <span class="item-title">对我的评价</span>
      </router-link>

      <router-link
        to="./testscore"
        class="item"
        v-if="emplooyType===1||(!emplooyType&&emplooyType!==0)"
      >
        <img src="./img/test-score.png" class="item-img" />
        <span class="item-title">美柏测试成绩</span>
      </router-link>
      <router-link
        to="./schooltestscore"
        class="item"
        v-if="emplooyType===1||(!emplooyType&&emplooyType!==0)"
      >
        <img src="./img/school-test-score.png" class="item-img" />
        <span class="item-title">公立学校成绩</span>
      </router-link>
    </div>

    <div class="share" @click="teacherShare" :data-clipboard-text="copyText">
      <div class="share-left">
        <img src="./img/share.png" class="img" />
        <span class="title">教师分享</span>
      </div>
      <!-- <div class="share-right">
        <span class="title">意向客户推荐</span>
        <img src="./img/right.png" class="img" />
      </div>-->
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard';
import { Toast } from 'vant';
import storage from '../../../lib/storage';
export default {
  name: 'homePage',
  components: { Toast },
  // components: { LoadScroll },
  data() {
    return {
      copyText: 'http://xgj-share.meibo.seastart.cn/#/teacher/share?id=',
      id: '',
      emplooyType: '',
    };
  },
  props: {
    requestFunc: Function,
    type: String,
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    teacherShare() {
      var clipboard = new Clipboard('.share');
      clipboard.on('success', e => {
        Toast.success('复制链接成功');
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on('error', e => {
        // 不支持复制
        console.log('该浏览器不支持自动复制');
        // 释放内存
        clipboard.destroy();
      });
    },
  },
  created() {},
  mounted() {
    const emplooyId = storage.get('emplooyId');
    this.emplooyType = Number(storage.get('emplooyType'));
    console.log(this.emplooyType, 'this.emplooyType');
    this.copyText += emplooyId;
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.home-page {
  height: 100%;
  padding: 21px 24px 0;
  background-color: $bgColorNew;
  .content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 341px;
      height: 248px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: $white;
      margin-bottom: 20px;
      .item-img {
        width: 92px;
        height: 92px;
        margin-bottom: 17px;
      }
      .item-title {
        font-size: 32px;
        font-weight: 500;
        letter-spacing: 1px;
      }
    }
  }
  .share {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px 0 31px;
    background-color: $white;
    .share-left {
      display: flex;
      align-items: center;
      .img {
        width: 28px;
        height: 28px;
        margin-right: 17px;
      }
      .title {
        font-size: 28px;
        font-weight: 400;
      }
    }
    .share-right {
      display: flex;
      align-items: center;
      .title {
        font-weight: 400;
        font-size: 28px;
        color: #999999;
      }
      .img {
        margin-left: 8px;
        width: 12px;
        height: 24px;
      }
    }
  }
}
</style>
