<template>
  <div class="emplooyee-detail">
    <div class="detail">
      <div class="detail-content">
        <div class="item detail-header">姓名</div>
        <div class="item detail-header">职位</div>
        <div class="item detail-header">基本工资</div>
        <div class="item detail-header">月考核奖</div>
      </div>

      <div class="detail-content">
        <div class="item detail-value">{{detail.employee}}</div>
        <div class="item detail-value">{{emplooyeeType[detail.type]}}</div>
        <div class="item detail-value">{{detail.salary}}</div>
        <div class="item detail-value">{{detail.month_salary}}</div>
      </div>

      <div class="detail-content">
        <div class="item detail-header">项目总奖金</div>
        <div class="item detail-header">五险一金</div>
        <div class="last-item item detail-header">总工资</div>
      </div>

      <div class="detail-content">
        <div class="item detail-value">{{detail.all_proj_salary}}</div>
        <div class="item detail-value">{{detail.other_salary}}</div>
        <div class="last-item item detail-value">{{Number(detail.all_salary).toFixed(2)}}</div>
      </div>
    </div>
    <div class="emplooyee-project" v-if="projectDetail.length>0">
      <div v-for="(item,index) in projectDetail" :key="item.project_id">
        <div class="rate">
          <div class="rate-header">
            <div class="left">
              <div class="place"></div>
              <div class="name">项目详情</div>
            </div>
          </div>
          <div class="detail-content">
            <div class="item detail-header">项目名称</div>
            <div class="item detail-header">权重；得分</div>
            <div class="item detail-header">项目奖金基数</div>
            <div class="item detail-header">项目收获奖金</div>
          </div>

          <div class="detail-content">
            <div :class="{'item':true,'detail-value':index%2===0}">{{item.name}}</div>
            <div :class="{'item':true,'detail-value':index%2===0}">{{item.weight}};{{item.score}}</div>
            <div :class="{'item':true,'detail-value':index%2===0}">{{item.base}}</div>
            <div :class="{'item':true,'detail-value':index%2===0}">{{item.reward}}</div>
          </div>
        </div>
        <div class="rate">
          <div class="rate-header">
            <div class="left">
              <div class="place"></div>
              <div class="name">项目细则</div>
            </div>
          </div>
          <div class="project-detail">
            <table class="form-table" cellpadding="0" cellspacing="0">
              <thead class="fixed-thead" id="head">
                <tr>
                  <th class="first-fixed fixed">项目一细则</th>
                  <th class="empty"></th>
                  <th>截止日期</th>
                  <th>完成与否</th>
                  <th>分值权重</th>
                  <th>预定目标数据</th>
                  <th>到期目标数据</th>
                  <th>完成/效果评定</th>
                  <th>总计</th>
                </tr>
              </thead>

              <tr
                v-for="(detailItem) in item.detail"
                :key="detailItem.project_detail_id"
                :class="{'item-white':index%2===1}"
              >
                <td :class="{fixed:true,'fixed-white':index%2===1}">{{detailItem.name}}</td>
                <td class="enpty"></td>
                <td>{{detailItem.date|moment('YYYY.MM.DD')}}</td>
                <td>{{detailItem.finish}}</td>
                <td>{{detailItem.weight}}</td>
                <td>{{detailItem.expect_data}}</td>
                <td>{{detailItem.finish_data}}</td>
                <td>{{detailItem.effect}}</td>
                <td>{{detailItem.reward}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSalaryDetail } from '@/api/teacher/salary';
export default {
  name: 'emplooyee-detail',
  components: {},
  data() {
    return {
      detail: {
        salary: '',
        class: '',
        class_two: '',
        class_three: '',
        month_salary: '',
        reward: '',
        student_introduce_reward: '',
        recommend_reward: '',
        other_salary: '',
        all_proj_salary: '',
        all_salary: '',
      },
      emplooyeeType: { 0: '前台', 1: '教师', 2: '销售' },

      projectDetail: [],
      id: '',
    };
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  async mounted() {
    this.id = this.$route.query.id;
    // this.evaluationName = this.$route.query.name;
    this.$route.meta.title = this.$route.query.month + '月工资记录';
    const detailData = await getSalaryDetail(this.id, 0);
    this.detail = detailData.salary;
    this.projectDetail = detailData.project;
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.emplooyee-detail {
  height: 100%;
  padding-top: 22px;
  background-color: $bgColorNew;

  .detail {
    padding-bottom: 20px;
    background-color: white;
  }
  .detail-content {
    display: flex;
    justify-content: space-between;
  }
  .item {
    width: 186px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    line-height: 33px;
    color: #333333;
  }
  .last-item {
    width: 373px;
  }
  .detail-header {
    background: #ffdd35;
  }
  .detail-value {
    background-color: $bgColorNew;
  }
  .rate {
    // padding-bottom: 20px;
    margin-top: 20px;
    background-color: white;
    .rate-header {
      display: flex;
      justify-content: space-between;
      height: 100px;
      align-items: center;
      padding-right: 24px;
      .left {
        display: flex;
      }
      .place {
        width: 10px;
        height: 34px;
        background: rgba(255, 221, 53, 1);
        border-radius: 0px 6px 6px 0px;
        margin-right: 24px;
      }
      .score {
        font-size: 28px;
        line-height: 36px;
      }
    }
    .project-detail {
      width: 100%;
      overflow: scroll;
      .form-table {
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
        table-layout: fixed;
        background-color: $bgColorNew;
      }
      .item-white {
        background-color: white;
      }
      tr {
        display: flex;
        position: relative;
        .fixed {
          position: fixed;
          min-width: 170px;
          background-color: $bgColorNew;
          // height: 30px;
          // line-height: 30px;
        }
        .fixed-white {
          background-color: white;
        }
        .first-fixed {
          background: rgba(255, 221, 53, 1);
        }
        th {
          background: rgba(255, 221, 53, 1);
        }
      }
      th,
      td {
        min-width: 170px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: none;
        border-top: none;
        border-right: 1px #ccc solid;
        border-bottom: 1px #ccc solid;
        // background: #f3f3f3;
      }
    }
  }
}
</style>
