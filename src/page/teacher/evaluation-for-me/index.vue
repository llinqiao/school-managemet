<template>
  <div class="evaluation-frome">
    <!-- <van-tabs color="#FFDD35">
      <van-tab title="家长评价">内容 1</van-tab>
      <van-tab title="学生评价">内容 2</van-tab>
    </van-tabs>-->
    <div class="tab-wrapper">
      <div :class="{'bor':0===index,'tab-wrapper__item':true} " @click="()=>tabChange(0)">学生评价</div>
      <div :class="{'bor':1===index,'tab-wrapper__item':true}" @click="()=>tabChange(1)">家长评价</div>
      
    </div>
    <!-- <van-list @load="onLoad" :immediate-check="false" :offset="50" class="student-evaluation-load">
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
      <Evaluation :evaluationData="index===1?studentAveData:teacherAveData" :isCanChange="true" />
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
    </van-list>-->
    <ListMe
      v-for="(item, key) in indexList"
      v-show="index === key"
      class="student-evaluation-load"
      :key="key"
      :type="key"
      :requestFunc="getList(key)"
    />
  </div>
</template>

<script>
import { evaluationForMe } from '@/api/teacher/evaluation';
import ListMe from './list';
import { PullRefresh, Toast, List, Tab, Tabs } from 'vant';
import Evaluation from '@/components/evaluation';
export default {
  name: 'evaluation-frome',
  components: {
    Tab,
    Tabs,
    Evaluation,
    PullRefresh,
    Toast,
    List,
    ListMe,
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

      indexList: [{}, {}],

      page: 0,
      num: 10,
      noMore: false,
      loading: true,
      index: 0,
    };
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    // 切换tab
    tabChange(value) {
      if (value === this.index) {
        return;
      } else {
        this.index = value;
        this.finished = false;
        this.noMore = false;
        // this.getEvaluationList(true);
      }
    },
    getList(index) {
      return function() {
        return evaluationForMe(index, ...arguments);
      };
    },

    async getEvaluationList(isRefresh = false) {
      this.loading = false;
      const { page, num, noMore } = this;
      let _noMore = noMore;
      let _page = page;
      if (isRefresh) {
        this.evaluationDetail = [
          {
            remark: '',
            rate: [],
            created_at: '',
          },
        ];
        this.page = 0;
        this.noMore = false;
        _page = 0;
        _noMore = false;
      }
      if (_noMore) {
        this.finished = true;
        return;
      }
      const listData = await evaluationForMe(num, _page, this.index);

      if (listData.data.length < num) {
        _noMore = true;
      } else {
        _page++;
      }
      let avgData = this.index === 0 ? { ...this.teacherAveData } : { ...this.studentAveData };
      avgData[0].value = listData.one;
      avgData[1].value = listData.two;
      avgData[2].value = listData.three;
      avgData[3].value = listData.four;
      this.allAve = listData.avg;
      this.allcount = listData.count;
      if (this.index === 0) {
        this.teacherAveData = avgData;
      } else {
        this.studentAveData = avgData;
      }
      const changeListData = listData.data.map(item => {
        const changeItem = {
          remark: item.remark,
          rate: [],
          created_at: item.created_at,
        };
        return this.index === 0
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
      if (isRefresh) {
        this.noMore = _noMore;
        this.page = _page;

        this.evaluationDetail = [...changeListData];
      } else {
        this.noMore = _noMore;
        this.page = _page;
        this.evaluationDetail = [...this.evaluationDetail, ...changeListData];
      }
    },
    async onLoad() {
      console.log('上拉');
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 加载状态结束
        // this.loading = false;
        // // 数据全部加载完成
        this.getEvaluationList();
      }, 1000);
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
.evaluation-frome {
  height: 100%;
  background-color: $bgColorNew;

  .tab-wrapper {
    padding: 0 24px;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    white-space: nowrap;
    // margin-bottom: 20px;
    background-color: white;
  }
  .tab-wrapper__item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    // margin-right: 55px;
    height: 100px;
    white-space: nowrap;
    box-sizing: border-box;
    font-size: 28px;
    color: #666666;
    &:last-child {
      margin-right: 0px;
    }
  }
  .student-evaluation-load {
    height: calc(100% - 100px);
    padding-top: 20px;
    overflow: scroll;
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
}
</style>
