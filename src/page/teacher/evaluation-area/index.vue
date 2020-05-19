<template>
  <div class="evaluation-area">
    <!-- <van-list @load="onLoad" class="student-evaluation-load" :immediate-check="false" :offset="50"> -->
    <LoadScroll :requestFunc="getList" v-model="evaluationForColleague" @input="listChange">
      <div class="content">
        <div class="header">
          <div class="left">
            <div class="img"></div>
            <span class="title">对学生评价</span>
          </div>
          <span
            class="right"
          >共{{evaluationForStudent.count}}个班级,{{evaluationForStudent.count_student}} 人</span>
        </div>
        <div class="no-evaluation">
          <div class="item" v-for="(item,index) in evaluationForStudent.classRoom" :key="index">
            <span class="name">{{item.classroom_name}}</span>
            <div class="right" @click="()=>viewClassroom(item)">
              <span class="prompt">查看</span>
              <img src="./img/right.png" class="img" />
            </div>
          </div>
        </div>
        <div class="header">
          <div class="left">
            <div class="img"></div>
            <span class="title">对同事评价</span>
          </div>
          <span class="right">待评价{{evaluationForColleague.count}}人</span>
        </div>
        <div class="no-evaluation">
          <div class="item" v-for="(item,index) in evaluationForColleague.data" :key="index">
            <span class="name">{{item.target_teacher}}</span>
            <div class="right" @click="()=>goEvalution(item)">
              <span class="prompt">去评价</span>
              <img src="./img/right.png" class="img" />
            </div>
          </div>
        </div>
      </div>
    </LoadScroll>
    <!-- </van-list> -->
  </div>
</template>

<script>
import { getEvaluationTeacher, getEvaluationClass } from '@/api/teacher/evaluation';
import LoadScroll from '@/components/scroll/load';
import { PullRefresh, Toast, List } from 'vant';
export default {
  name: 'evaluationArea',
  components: {
    PullRefresh,
    Toast,
    List,
    LoadScroll,
  },
  data() {
    return {
      evaluationForStudent: {
        classRoom: [],
        count: '',
        count_student: '',
      },
      evaluationForColleague: {
        // data: [{ target_teacher: 'xxx', target_teacher_id: 1 }],
        // count: '',
      },
      page: 0,
      num: 10,
      noMore: false,
      loading: true,
    };
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    async getEvaluationList(isRefresh = false) {
      this.loading = false;
      // Toast.loading({
      //   duration: 0,
      //   message: '加载中...',
      //   forbidClick: true,
      //   loadingType: 'spinner',
      // });
      const { page, num, noMore } = this;
      let _noMore = noMore;
      let _page = page;
      if (isRefresh) {
        this.page = 0;
        this.noMore = false;
        _page = 0;
        _noMore = false;
      }
      if (_noMore) {
        Toast.clear();
        return;
      }
      const evaluationTeacherData = await getEvaluationTeacher(num, _page);
      const { count, data } = evaluationTeacherData;
      if (data.length < num) {
        _noMore = true;
      } else {
        _page++;
      }
      if (isRefresh) {
        this.noMore = _noMore;
        this.page = _page;
        this.evaluationForColleague = { data: [...data], count };
      } else {
        this.noMore = _noMore;
        this.page = _page;
        this.evaluationForColleague = { data: [...this.evaluationForColleague, ...data], count };
      }
    },
    viewClassroom(item) {
      this.$router.push({
        path: `/teacher/evaluationclassroom`,
        query: {
          id: item.classroom_id,
          name: item.classroom_name,
        },
      });
    },
    goEvalution(item) {
      this.$router.push({
        path: `/teacher/evaluationcolleague`,
        query: {
          name: item.target_teacher,
          // id: item.target_teacher_id,
          id: item.teacher_comment_id,
        },
      });
    },

    async getList() {
      return getEvaluationTeacher(...arguments);
    },
    listChange(item, count) {
      this.evaluationForColleague = { data: item, count };
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
        this.getEvaluationList();
      }, 1000);
    },
  },
  created() {},
  async mounted() {
    const { data, count_student, count } = await getEvaluationClass();
    this.evaluationForStudent = {
      classRoom: data,
      count_student: count_student,
      count: count,
    };
    // this.getEvaluationList(true);
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';

.evaluation-area {
  height: 100%;
  background-color: $bgColorNew;
  .student-evaluation-load {
    overflow: scroll;
    height: 100%;
    background-color: $bgColorNew;
  }
  .content {
    .header {
      height: 100px;
      display: flex;
      padding-right: 24px;
      justify-content: space-between;
      align-items: center;
      background-color: $white;
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
        .title {
          font-size: 32px;
          font-weight: 400;
          letter-spacing: 1px;
          color: #000000;
        }
      }
      .right {
        font-size: 28px;
        font-weight: 400;
      }
    }
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
  }
}
</style>
