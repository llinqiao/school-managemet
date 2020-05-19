<template>
  <div class="evaluation-classroom" v-wechat-title="$route.meta.title=metaNmae">
    <div class="content">
      <div class="no-evaluation">
        <!-- <van-list @load="onLoad" class="list-wrapper" :immediate-check="false" :offset="50"> -->
        <LoadScroll :requestFunc="getList" v-model="studentList" @input="listChange">
          <div>
            <div class="item" v-for="(item,index) in studentList" :key="index">
              <span class="name">{{item.student}}</span>
              <div class="right" @click="()=>viewScore(item)">
                <span class="prompt">去评价</span>
                <img src="./img/right.png" class="img" />
              </div>
            </div>
          </div>
          <!-- </van-list> -->
        </LoadScroll>
        <van-popup v-model="show" position="bottom" class="popup">
          <div class="school-test-score">
            <div class="test-name-header">
              <div class="left">
                <div class="place"></div>
                <div class="name">{{studentName}}的评价</div>
              </div>
              <img src="./img/close.png" class="close" @click="show=false" />
            </div>
            <div class="score-list">
              <div class="school-score-list">
                <div v-for="item in  evalList" :key="item.id" class="eval-item">
                  <Evaluation :evaluationData="[{name:'星级平分',value:item.one}]" :isCanChange="true" />
                  <div class="evaluation-content">
                    <div class="text" v-if="item.remark">{{item.remark}}</div>
                    <div class="time">
                      <span>评价时间</span>
                      <!-- {{ item.time | moment('YYYY.MM.DD') }} -->
                      <span>{{item.created_at|moment('YYYY.MM.DD')}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="button-container">
              <button class="button" @click="()=>goEvaluation(item)">去评价</button>
            </div>
          </div>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import { getClassStudent, getStudentEvaluationList } from '@/api/teacher/evaluation';
import LoadScroll from '@/components/scroll/load';
import Evaluation from '@/components/evaluation';
import { PullRefresh, Toast, List, Popup } from 'vant';
export default {
  name: 'evaluationClassroom',
  components: {
    PullRefresh,
    Toast,
    List,
    Popup,
    Evaluation,
    LoadScroll,
  },

  data() {
    return {
      studentList: [],
      evalList: [],

      classroomId: 0,
      studentName: '',
      studentId: '',
      page: 0,
      num: 10,
      noMore: false,
      evalpage: 0,
      evalnum: 10,
      evalnoMore: false,
      loading: false,
      show: false,
      metaNmae: '',
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
    goEvaluation(item) {
      this.$router.push({
        path: `/teacher/evaluationstudent`,
        query: {
          studentName: this.studentName,
          id: this.studentId,
          classroomId: this.classroomId,
        },
      });
    },
    // async getList(isRefresh = false) {
    //   this.loading = false;
    //   // Toast.loading({
    //   //   duration: 0,
    //   //   message: '加载中...',
    //   //   forbidClick: true,
    //   //   loadingType: 'spinner',
    //   // });
    //   const { page, num, noMore } = this;
    //   let _noMore = noMore;
    //   let _page = page;
    //   if (isRefresh) {
    //     this.page = 0;
    //     this.noMore = false;
    //     _page = 0;
    //     _noMore = false;
    //   }
    //   if (_noMore) {
    //     Toast.clear();
    //     return;
    //   }
    //   const { data } = await getClassStudent(num, _page, this.classroomId);
    //   if (data.length < num) {
    //     _noMore = true;
    //   } else {
    //     _page++;
    //   }
    //   if (isRefresh) {
    //     this.noMore = _noMore;
    //     this.page = _page;
    //     this.studentList = [...data];
    //   } else {
    //     this.noMore = _noMore;
    //     this.page = _page;
    //     this.studentList = [...this.studentList, ...data];
    //   }
    // },

    async getList() {
      return getClassStudent(this.$route.query.id, ...arguments);
    },
    listChange(item) {
      this.studentList = item;
    },

    async getEvalList(isRefresh = false) {
      // this.loading = false;
      // Toast.loading({
      //   duration: 0,
      //   message: '加载中...',
      //   forbidClick: true,
      //   loadingType: 'spinner',
      // });
      const { evalpage, evalnum, evalnoMore } = this;
      let _noMore = evalnoMore;
      let _evalpage = evalpage;
      if (isRefresh) {
        this.evalpage = 0;
        this.noMore = false;
        _evalpage = 0;
        _noMore = false;
      }
      if (_noMore) {
        Toast.clear();
        return;
      }
      const { data } = await getStudentEvaluationList(
        this.classroomId,
        this.studentId,
        _evalpage,
        evalnum
      );
      if (data.length < evalnum) {
        _noMore = true;
      } else {
        _evalpage++;
      }
      if (isRefresh) {
        this.noMore = _noMore;
        this.evalpage = _evalpage;
        this.evalList = [...data];
      } else {
        this.noMore = _noMore;
        this.evalpage = _evalpage;
        this.evalList = [...this.evalList, ...data];
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
        // Toast.clear();
        this.getList();
      }, 1000);
    },
    // goEvalution() {
    //   this.$router.push('/parent/gostudentevaluation');
    // },
    // goEvalutionDetail() {
    //   this.$router.push('/parent/studentevaluationdetail');
    // },

    viewScore(item) {
      console.log(item);
      this.show = true;
      this.studentName = item.student;
      this.studentId = item.student_id;
      this.getEvalList(true);
    },
  },
  created() {},
  async mounted() {
    this.classroomId = this.$route.query.id;
    this.$route.meta.title = this.$route.query.name;
    this.metaNmae = this.$route.query.name;
    console.log(this.$route.query.name, 'this.$route.query.name', this.$route.meta.title);
    // this.getList(true);
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';

.evaluation-classroom {
  height: 100%;
  background-color: $bgColorNew;
  .content {
    .no-evaluation {
      padding: 20px 24px 0;
      .item {
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: $white;
        margin-bottom: 20px;
        padding: 0 24px;
        .name {
          font-size: 28px;
          font-weight: 400;
          letter-spacing: 1px;
          color: #000000;
        }
        .right {
          display: flex;
          align-items: center;
          .prompt {
            font-size: 28px;
            color: #999999;
            margin-right: 8px;
          }
          .img {
            width: 12px;
            height: 24px;
          }
        }
      }
    }
    .popup {
      height: 90%;
      .school-test-score {
        height: 100%;
        .test-name-header {
          height: 110px;
          padding-right: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left {
            display: flex;
            align-items: center;
            .place {
              width: 10px;
              height: 34px;
              background-color: #ffdd35;
              margin-right: 24px;
            }
            .name {
              font-size: 32px;
              line-height: 45px;
              color: #333333;
            }
          }
          .close {
            width: 28px;
            height: 28px;
          }
        }
        .test-name {
          height: 110px;
          display: flex;
          align-items: center;
        }
        .score-list {
          height: calc(100% - 250px);
          background: $bgColorNew;
          overflow: scroll;
          .school-score-list {
            padding-top: 20px;
            height: 100%;
          }
          .eval-item {
            // padding: 0 24px;
            background-color: $white;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            &:last-child {
              margin-bottom: 0;
            }
            // background-color: $bgColorNew;
            // padding-top: 20px;
            .evaluation-content {
              padding: 0 24px;
              background-color: $white;
              .text {
                background: rgba(245, 245, 245, 1);
                border-radius: 6px;
                padding: 26px 24px 38px;
              }
              .time {
                height: 78px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #999999;
              }
            }
          }
        }
        .button-container {
          height: 140px;
          padding: 20px 24px;
          .button {
            height: 100px;
            width: 100%;
            border-radius: 6px;
            font-size: 28px;
            background-color: $primary;
          }
        }
      }
    }
  }
}
</style>
