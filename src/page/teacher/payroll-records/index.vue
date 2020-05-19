<template>
  <div class="payroll-records">
    <!-- <van-list @load="onLoad" class="list-wrapper" :immediate-check="false" :offset="50"> -->

    <div class="list-wrapper">
      <div class="item" v-for="(item,index) in list" :key="index">
        <span class="name">{{caleMonth(item.start_time)}}月工资</span>
        <div class="right" @click="()=>goDetail(item)">
          <span class="prompt">{{Number(item.all_salary).toFixed(2)}}</span>
          <img src="./img/right.png" class="img" />
        </div>
      </div>
    </div>
    <!-- </van-list> -->

    <div class="botton-select">
      <span class="select-text">{{selectValue}}年度</span>
      <button class="select-button" @click="()=>{this.show=true}">切换年度</button>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker
        :default-index="defaultValue"
        show-toolbar
        :columns="columns"
        @cancel="show= false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" @cancel="onCancel" /> -->
  </div>
</template>

<script>
import momentTime from 'moment';
import { ActionSheet, Picker, Popup, List } from 'vant';
import { getSalaryList } from '@/api/teacher/salary';
export default {
  name: 'payroll-records',
  components: { ActionSheet, Picker, Popup, List },
  data() {
    return {
      selectValue: '2020',
      defaultValue: 0,
      list: [],
      columns: [],
      show: false,
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
    // async getList(isRefresh = false) {
    //   this.loading = false;
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
    //     return;
    //   }
    //   const evaluationTeacherData = await getSalaryList(num, _page, this.selectValue);
    //   const { data } = evaluationTeacherData;
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
    async getList() {
      const evaluationTeacherData = await getSalaryList(20, 0, this.selectValue);
      const { data } = evaluationTeacherData;
      this.list = [...data];
    },

    cacluTime() {
      let currenttime = new Date().getFullYear() - 20;
      let timeArr = [];
      for (var i = currenttime + 40; i > currenttime; i--) {
        timeArr.push(i + '年');
      }
      this.columns = timeArr;
      this.selectValue = new Date().getFullYear();
      this.defaultValue = timeArr.indexOf(this.selectValue + '年');
    },

    onConfirm(value) {
      this.selectValue = value.slice(0, -1);
      this.getList(true);
      this.show = false;
      this.finished = false;
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
    caleMonth(item) {
      return momentTime(item * 1000).get('month');
    },
    goDetail(item) {
      this.$router.push({
        path: item.type === 1 ? `/teacher/teacherpayrolldetail` : `/teacher/emplooyeepayrolldetail`,
        query: {
          month: this.caleMonth(item.start_time),
          id: item.salary_id,
          // name: item.name,
        },
      });
    },
  },
  created() {},
  async mounted() {
    // const { data } = await etList(this.selectWeek + 1, this.selectValue);
    // this.list = data;
    this.cacluTime();
    this.getList(true);
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';

.payroll-records {
  height: 100%;
  background-color: $bgColorNew;
  .list-wrapper {
    padding: 20px 24px;
    height: calc(100%-120px);
    overflow: scroll;
    // background-color: $bgColorNew;
  }
  .item {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $white;
    margin-bottom: 20px;
    padding: 0 24px;
    border-radius: 6px;
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
        color: #000000;
        margin-right: 7px;
      }
      .img {
        width: 14px;
        height: 26px;
      }
    }
  }
  .botton-select {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px 0 40px;
    background-color: white;
    .select-text {
      font-size: 28px;
    }
    .select-button {
      padding: 12px 24px;
      border-radius: 6px;
      border: 1px solid rgba(153, 153, 153, 1);
      font-size: 28px;
      color: $minorFontColor;
      background: $white;
    }
  }
}
</style>
