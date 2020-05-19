<template>
  <div class="teacher-detail">
    <div class="teacher-detail-content">
      <div class="detail">
        <div class="detail-content">
          <div class="item detail-header">基本工资</div>
          <div class="item detail-header">一类课程工资</div>
          <div class="item detail-header">二类课程工资</div>
          <div class="item detail-header">三类课程工资</div>
        </div>

        <div class="detail-content">
          <div class="item detail-value">{{detail.salary}}</div>
          <div class="item detail-value">{{detail.one_salary}}</div>
          <div class="item detail-value">{{detail.two_salary}}</div>
          <div class="item detail-value">{{detail.three_salary}}</div>
        </div>

        <div class="detail-content">
          <div class="item detail-header">月考核奖</div>
          <div class="item detail-header">续班奖</div>
          <div class="item detail-header">邀约奖</div>
          <div class="item detail-header">介绍奖</div>
        </div>

        <div class="detail-content">
          <div class="item detail-value">{{detail.month_salary}}</div>
          <div class="item detail-value">{{detail.reward}}</div>
          <div class="item detail-value">{{detail.recommend_reward}}</div>
          <div class="item detail-value">{{detail.introduce_reward}}</div>
        </div>
        <div class="detail-content">
          <div class="item detail-header">五险一金</div>
          <div class="item detail-header">总项目工资</div>
          <div class="item detail-header">星级评</div>
          <div class="item detail-header">总工资</div>
        </div>

        <div class="detail-content">
          <div class="item detail-value">{{detail.other_salary}}</div>
          <div class="item detail-value">{{detail.all_proj_salary}}</div>
          <div class="item detail-value">{{detail.star}}</div>
          <div class="item detail-value">{{Number(detail.all_salary).toFixed(2)}}</div>
        </div>
      </div>
      <div class="rate" v-if="monthRate.length>0">
        <div class="rate-header">
          <div class="left">
            <div class="place"></div>
            <div class="name">本月星级评定</div>
          </div>
          <div class="score">{{monthallRate}}分</div>
        </div>
        <div class="detail-content">
          <div class="item detail-header">项目</div>
          <!-- <div class="item detail-header">达成目标结果</div> -->
          <div class="item detail-header">权重</div>
          <div class="item detail-header">单项得分</div>
        </div>
        <div v-for="(item,index) in monthRate" :key="item.id">
          <div class="detail-content">
            <div :class="{'item':true,'detail-value':index%2===0}">{{item.content}}</div>
            <!-- <div :class="{'item':true,'detail-value':index%2===0}">达成目标结果</div> -->
            <div :class="{'item':true,'detail-value':index%2===0}">{{item.weight}}</div>
            <div :class="{'item':true,'detail-value':index%2===0}">{{item.score}}</div>
          </div>
        </div>
      </div>

      <div class="rate" v-if="semsterRate.length>0">
        <div class="rate-header">
          <div class="left">
            <div class="place"></div>
            <div class="name">本学期星级评定</div>
          </div>
          <div class="score">{{semsterallRate}}分</div>
        </div>
        <div class="detail-content">
          <div class="item detail-header">项目</div>
          <!-- <div class="item detail-header">达成目标结果</div> -->
          <div class="item detail-header">权重</div>
          <div class="item detail-header">单项得分</div>
        </div>
        <div v-for="(item,index) in semsterRate" :key="index">
          <div class="detail-content">
            <div :class="{'item':true,'detail-value':index%2===0}">{{item.content}}</div>
            <!-- <div :class="{'item':true,'detail-value':index%2===0}">达成目标结果</div> -->
            <div :class="{'item':true,'detail-value':index%2===0}">{{item.weight}}</div>
            <div :class="{'item':true,'detail-value':index%2===0}">{{item.score}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSalaryDetail } from '@/api/teacher/salary';
export default {
  name: 'teacher-detail',
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
      monthallRate: '',
      semsterallRate: '',
      monthRate: [],
      semsterRate: [{}, {}],
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
    const detailData = await getSalaryDetail(this.id, 1);
    this.detail = detailData.salary;
    this.semsterRate = detailData.quarter_star.slice(0, -1);
    this.semsterallRate = detailData.quarter_star[detailData.quarter_star.length - 1].score;
    this.monthRate = detailData.star.slice(0, -1);
    this.monthallRate = detailData.star[detailData.star.length - 1].score;
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.teacher-detail {
  height: 100%;
  padding-top: 22px;
  background-color: $bgColorNew;
  .teacher-detail-content {
    background-color: $bgColorNew;
  }
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
    text-align: center;
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

    .detail-content {
      // justify-content: space-between;
    }
    .item {
      flex: 1;
      &:nth-child(2) {
        margin: 0 1px;
      }
    }
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
  }
}
</style>
