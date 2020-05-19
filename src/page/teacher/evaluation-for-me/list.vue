<template>
  <!-- <van-list @load="onLoad" :immediate-check="false" :offset="50" class="student-evaluation-load"> -->
  <div class="evaluation-frome-list">
    <LoadScroll
      :requestFunc="requestFunc"
      v-model="evaluationDetail"
      @input="listChange"
      :special="true"
    >
      <div>
        <div class="header">
          <div class="left">
            <div class="img"></div>
            <span class="title-name">综合评分：</span>
            <span class="title-value">{{allAve}}</span>
          </div>
          <span class="right">共{{allcount}}个评价</span>
        </div>
        <div class="line-wrapper">
          <div class="line"></div>
        </div>
        <Evaluation :evaluationData="type===0?studentAveData:teacherAveData" :isCanChange="true" />
        <div class="place"></div>
        <div v-for="(item,index) in evaluationDetail" :key="index" class="evaluation-item">
          <Evaluation :evaluationData="item.rate" :isCanChange="true" />
          <div class="evaluation-content">
            <div class="text">{{item.remark}}</div>
            <div class="time">
              <span>评价时间</span>
              <span>{{item.created_at|moment('YYYY.MM.DD')}}</span>
            </div>
          </div>
        </div>
      </div>
    </LoadScroll>
  </div>
  <!-- </van-list> -->
</template>

<script>
import { PullRefresh, Toast, List, Tab, Tabs } from 'vant';
import Evaluation from '@/components/evaluation';
import LoadScroll from '@/components/scroll/load';
export default {
  name: 'evaluation-frome-list',
  components: {
    LoadScroll,
    Tab,
    Tabs,
    Evaluation,
    PullRefresh,
    Toast,
    List,
  },
  data() {
    return {
      allAve: '',
      allcount: '',
      studentAveData: [
        { name: '课堂趣味性平均分', value: 0 },
        { name: '课堂秩序平均分', value: 0 },
        { name: '体验的成就感平均分', value: 0 },
        { name: '喜欢课堂的程度平均分', value: 0 },
      ],
      teacherAveData: [
        { name: '作业反馈的满意度平均分', value: 0 },
        { name: '与您沟通的满意度平均分', value: 0 },
        { name: '你的责任心满意度平均分', value: 0 },
        { name: '您的亲和力满意度分均分', value: 0 },
      ],
      evaluationDetail: [
        {
          remark: '',
          rate: [],
          created_at: '',
        },
      ],
      page: 0,
      num: 10,
      noMore: false,
      loading: true,
      index: 0,
    };
  },
  props: {
    requestFunc: Function,
    type: Number,
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    listChange(listData, res) {
      let avgData = this.type === 0 ? [...this.studentAveData] : [...this.teacherAveData];
      avgData[0].value = res.one;
      avgData[1].value = res.two;
      avgData[2].value = res.three;
      avgData[3].value = res.four;
      this.allAve = res.avg;
      this.allcount = res.count;
      console.log(avgData, 'avgData');
      if (this.type === 1) {
        this.teacherAveData = avgData;
      } else {
        this.studentAveData = avgData;
      }
      const changeListData = listData.map(item => {
        const changeItem = {
          remark: item.remark,
          rate: [],
          created_at: item.created_at,
        };
        return this.type === 1
          ? {
              ...changeItem,
              rate: [
                { name: '作业反馈的满意度', value: item.one },
                { name: '与您沟通的满意度', value: item.two },
                { name: '你的责任心满意度', value: item.three },
                { name: '您的亲和力满意度', value: item.four },
              ],
            }
          : {
              ...changeItem,
              rate: [
                { name: '今天课堂趣味性', value: item.one },
                { name: '今天课堂秩序', value: item.two },
                { name: '今天的体验成就感', value: item.three },
                { name: '今天喜欢课堂程度', value: item.four },
              ],
            };
      });
      this.evaluationDetail = [...changeListData];
      console.log(this.evaluationDetail, 'this.evaluationDetail');
    },
  },
  created() {},
  mounted() {
    // this.getEvaluation();
    // this.getEvaluationList(true);
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.evaluation-frome-list {
  height: 100%;
}
.bor {
  font-weight: 500;
  color: #333333;
  border-bottom: 6px solid #ffdd35;
}
.header {
  height: 100px;
  display: flex;
  padding-right: 24px;
  justify-content: space-between;
  align-items: center;
  background-color: $white;
  .header-content {
    border-bottom: 1px solid #666666;
  }
  .left {
    display: flex;
    align-items: center;
    .img {
      width: 10px;
      height: 34px;
      background: $primary;
      border-radius: 0px 6px 6px 0px;
      margin-right: 24px;
    }
    .title-name {
      font-size: 32px;
      font-weight: 400;
      letter-spacing: 1px;
      color: #666666;
    }
    .title-value {
      font-size: 32px;
      font-weight: 400;
      letter-spacing: 1px;
      color: #000000;
    }
  }
  .right {
    font-size: 28px;
    font-weight: 400;
    color: #999999;
  }
}
.line-wrapper {
  height: 1px;
  background: white;
  .line {
    margin: 0 24px 0 32px;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
  }
}

.place {
  height: 19px;
  background: white;
}
.evaluation-item {
  margin-top: 20px;
}
.evaluation-content {
  padding: 0 24px;
  background-color: $white;
  .text {
    background: rgba(245, 245, 245, 1);
    border-radius: 6px;
    padding: 26px 24px 38px;
  }
  .time {
    height: 94px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #999999;
  }
}
</style>
