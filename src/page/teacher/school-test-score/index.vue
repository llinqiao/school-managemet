<template>
  <div class="school-test-score">
    <!-- <van-list @load="onLoad" class="student-evaluation-load"> -->
    <LoadScroll :requestFunc="getList" v-model="list" @input="listChange">
      <div class="list">
        <ul class="school-test-list">
          <li v-for="item in list" :key="item.classroom_id" class="item">
            <span class="name">{{item.campus}}{{item.classroom_name}}</span>
            <div class="right" @click="()=>goDetail(item)">
              <span class="prompt">查看</span>
              <img src="./img/right.png" class="img" />
            </div>
          </li>
        </ul>
      </div>
    </LoadScroll>
    <!-- </van-list> -->
  </div>
</template>

<script>
import { getSchoolTestList } from '@/api/teacher/test';
import LoadScroll from '@/components/scroll/load';
import { PullRefresh, Toast, List } from 'vant';
export default {
  name: 'SchoolTestScore',
  components: {
    PullRefresh,
    Toast,
    List,
    LoadScroll,
  },
  data() {
    return {
      list: [],
      page: 0,
      num: 10,
      noMore: false,
      loading: true,
      finished: false,
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
    //   const { data } = await getSchoolTestList(num, _page);
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
    goDetail(item) {
      this.$router.push({
        path: `/teacher/schooltestscoredetail`,
        query: {
          id: item.classroom_id,
          name: item.classroom_name,
        },
      });
    },
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
      return getSchoolTestList(...arguments);
    },
    listChange(item) {
      this.list = item;
    },
  },
  created() {},
  mounted() {
    // this.getList(true);
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.school-test-score {
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
}
</style>
