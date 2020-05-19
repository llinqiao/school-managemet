<template>
  <div class="school-test-score-detail">
    <!-- <van-list @load="onLoad" class="student-evaluation-load" :immediate-check="false" :offset="50"> -->
    <LoadScroll :requestFunc="getList" v-model="list" @input="listChange">
      <div class="list">
        <ul class="school-test-list">
          <li v-for="item in list" :key="item.student_id" class="item">
            <span class="name">{{item.student}}</span>
            <div class="right" @click="()=>viewScore(item)">
              <span class="prompt">查看成绩</span>
              <img src="./img/right.png" class="img" />
            </div>
          </li>
        </ul>
      </div>
    </LoadScroll>
    <!-- </van-list> -->
    <van-popup v-model="show" position="bottom" class="popup">
      <div class="school-test-score">
        <div class="test-name-header">
          <div class="left">
            <div class="place"></div>
            <div class="name">{{testName}}的公立学校成绩</div>
          </div>
          <img src="./img/close.png" class="close" @click="show=false" />
        </div>
        <div class="score-list">
          <div class="school-score-list">
            <div v-for="item in  scoreList" :key="item.id" class="item">
              <div class="title">
                <span class="key">{{nameType[item.type]}}</span>
                <span class="value">{{item.score}}分</span>
              </div>
              <div class="time">
                <span>记录时间</span>
                <span>{{item.created_at|moment('YYYY.MM.DD')}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="button-container">
          <button class="button" @click="addScore">添加成绩</button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getClassroomStudent, getStudentScore } from '@/api/teacher/test';
import LoadScroll from '@/components/scroll/load';
import { PullRefresh, Toast, List, Popup } from 'vant';
export default {
  name: 'SchoolTestScoreDetail',
  components: {
    PullRefresh,
    Toast,
    List,
    Popup,
    LoadScroll,
  },
  data() {
    return {
      list: [
        // { student: 'xxxx', student_id: 1 },
        // { student: 'xxxx', student_id: 2 },
        // { student: 'xxxx', student_id: 3 },
        // { student: 'xxxx', student_id: 4 },
      ],
      scoreList: [
        // { id: 1, course_type: 0, score: 100 },
        // { id: 2, course_type: 0, score: 100 },
        // { id: 3, course_type: 0, score: 100 },
        // { id: 4, course_type: 0, score: 100 },
        // { id: 5, course_type: 0, score: 100 },
        // { id: 6, course_type: 0, score: 100 },
      ],
      page: 0,
      num: 10,
      nameType: ['平时成绩', '期末成绩'],
      testName: '',
      noMore: false,
      id: '',
      studentId: '',
      loading: true,
      finished: false,
      show: false,
    };
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
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
    //     this.finished = true;
    //     Toast.clear();
    //     return;
    //   }
    //   const { data } = await getClassroomStudent(num, _page, this.id);
    //   if (data.length < num) {
    //     _noMore = true;
    //   } else {
    //     _page++;
    //   }
    //   if (isRefresh) {
    //     this.noMore = _noMore;
    //     this.page = _page;
    //     this.list = [...data];
    //   } else {
    //     this.noMore = _noMore;
    //     this.page = _page;
    //     this.list = [...this.list, ...data];
    //   }
    // },
    async onLoad() {
      console.log('上拉');
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 加载状态结束
        // this.loading = false;
        // // 数据全部加载完成
        this.getList();
      }, 1000);
    },
    async getList() {
      return getClassroomStudent(this.$route.query.id, ...arguments);
      // this.list = (await getTestScore()).data;
    },
    listChange(item) {
      this.list = item;
    },
    // 查看成绩
    async viewScore(item) {
      this.show = true;
      const { data } = await getStudentScore(this.id, item.student_id);
      this.studentId = item.student_id;
      this.scoreList = data;
      this.testName = item.student;
    },
    addScore() {
      this.$router.push({
        path: `/teacher/addscore`,
        query: {
          id: this.studentId,
        },
      });
    },
  },
  created() {},
  mounted() {
    this.id = this.$route.query.id;
    // this.evaluationName = this.$route.query.name;
    console.log(this.$route.meta.title, ' this.$route.meta.title');
    this.$route.meta.title = this.$route.query.name;
    // this.getList(true);
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.school-test-score-detail {
  padding: 20px 24px 0;
  background: $bgColorNew;
  height: 100%;
  .list {
    background: $bgColorNew;
    .item {
      padding: 0 24px;
      background-color: $white;
      height: 100px;
      margin-bottom: 20px;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:last-child {
        margin-bottom: 0;
      }
      .name {
        font-size: 28px;
        line-height: 40px;
        letter-spacing: 1px;
        color: #333333;
      }
      .right {
        height: 100px;
        display: flex;
        align-items: center;
        .prompt {
          font-size: 28px;
          line-height: 40px;
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
        .item {
          padding: 33px 24px 20px;
          background-color: $white;
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
          .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 32px;
            .key {
              font-size: 32px;
              font-weight: 400;
              color: #666666;
            }
            .value {
              font-size: 32px;
              font-weight: 500;
            }
          }
          .time {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 28px;
            margin-top: 11px;
            color: #999999;
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
</style>
