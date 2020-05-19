<template>
  <div class="my-schedule">
    <div class="content">
      <div class="button-wrapper">
        <button
          :class="{'week-button':true,'week-select':index===selectWeek}"
          v-for="(item ,index) in week"
          :key="index"
          @click="()=>selectWeekChange(index)"
        >{{item}}</button>
      </div>
      <!-- <van-list @load="onLoad" class="list-wrapper" :immediate-check="false" :offset="50"> -->
      <div class="list-wrapper">
        <div class="list-item" v-for="(item,index) in list" :key="index">
          <span>{{item.class_time[1]}}</span>
          <span>{{item.campus}}{{item.classroom}}</span>
        </div>
        <!-- </van-list> -->
      </div>
    </div>
    <div class="botton-select">
      <span class="select-text">{{selectValue}}</span>
      <button class="select-button" @click="()=>{this.show=true}">切换学期</button>
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @cancel="onCancel"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { ActionSheet, Toast, List } from 'vant';
import { getScheduleList, getSemesterList } from '@/api/teacher/schedule';
export default {
  name: 'my-schedule',
  components: { ActionSheet, Toast, List },
  data() {
    return {
      selectValue: '',
      selectValueId: '',
      week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      selectWeek: 0,
      list: [],
      actions: [],
      show: false,
      semesterList: [],
      page: 0,
      num: 10,
      noMore: false,
      loading: false,
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
    //     Toast.clear();
    //     return;
    //   }
    //   const { data } = await getScheduleList(num, _page, this.selectValueId, this.selectWeek + 1);
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
      const { data } = await getScheduleList(20, 0, this.selectValueId, this.selectWeek + 1);
      this.list = [...data];
    },
    selectWeekChange(value) {
      this.selectWeek = value;
      this.getList(true);
    },
    onCancel() {
      this.show = false;
    },
    onSelect(item) {
      this.selectValue = item.name;
      this.selectValueId = item.id;
      this.show = false;
      this.getList(true);
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
  },
  created() {},
  async mounted() {
    const semesterList = await getSemesterList();
    this.semesterList = semesterList;
    this.selectValue = semesterList.data[0].semester_name ? semesterList.data[0].semester_name : '';
    this.selectValueId = semesterList.data[0].semester_id ? semesterList.data[0].semester_id : '';
    this.actions = [...semesterList.data].map(item => {
      return { name: item.semester_name, id: item.semester_id };
    });
    this.getList(true);
    // const { data } = await getScheduleList(this.selectWeek + 1, this.selectValueId);
    // this.list = data;
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';

.my-schedule {
  height: 100%;
  .content {
    height: calc(100% - 120px);
    .list-wrapper {
      height: calc(100% - 191px);
      overflow: scroll;
      padding: 20px 24px;
      background-color: $bgColorNew;
    }
    .list-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 100px;
      background: $white;
      padding: 24px 30px;
      color: #333333;
      font-size: 28px;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .button-wrapper {
      height: 191px;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      padding: 19px 24px 20px;
      background: $white;
      .week-button {
        height: 64px;
        font-size: 24px;
        padding: 16px 42px 15px 43px;
        background: #f5f5f5;
        border-radius: 6px;
        color: #666666;
        margin-bottom: 20px;
        margin-right: 20px;
      }
      :nth-child(4) {
        margin-right: 0;
      }
      .week-select {
        background: #fedc34;
        color: #333333;
      }
    }
  }
  .botton-select {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px 0 40px;
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
