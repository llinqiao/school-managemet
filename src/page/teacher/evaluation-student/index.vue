<template>
  <div class="evaluation-student">
    <div class="header">
      <span class="start-name">星级评分</span>
      <div class="right">
        <van-rate v-model="form.one" />
        <span class="start-value">{{form.one}}星</span>
      </div>
    </div>
    <div class="content">
      <van-field
        v-model="form.remark"
        rows="8"
        type="textarea"
        :placeholder="getPlaceholder"
        class="textarea"
      />
      <div
        :class="{'can-select':form.remark?true:false,'can-not-select':true,'button':true}"
        @click="submitEvaluation"
      >确认评价</div>
    </div>
  </div>
</template>

<script>
import { Rate, Field, Toast } from 'vant';
import { evaluationStudent } from '@/api/teacher/evaluation';
export default {
  name: 'evaluationStudent',
  components: { Rate, Field, Toast },
  data() {
    return {
      studentName: '',
      form: {
        student_id: '',
        remark: '',
        classroom_id: '',
        one: 0,
      },
    };
  },
  filters: {},
  computed: {
    getPlaceholder: function() {
      return `说一说您对${this.studentName}的评语～`;
    },
  },
  watch: {},
  methods: {
    async submitEvaluation() {
      await evaluationStudent(this.form);
      Toast.success('评价成功');
      setTimeout(() => {
        Toast.clear();
        this.$router.go(-1);
      }, 1000);
    },
  },
  created() {},
  mounted() {
    this.form = {
      ...this.form,
      student_id: this.$route.query.id,
      classroom_id: this.$route.query.classroomId,
    };
    this.studentName = this.$route.query.studentName;
    this.$route.meta.title = this.$route.query.studentName;
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.evaluation-student {
  height: 100%;
  background-color: $bgColorNew;
  .header {
    height: 110px;
    background: $white;
    padding: 0 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .start-name {
      font-size: 32px;
      color: #666666;
    }
    .right {
      display: flex;
      flex-direction: flex;
      align-items: center;
      .van-rate {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
      .start-value {
        margin-left: 23px;
        font-size: 32px;
      }
    }
  }
  .content {
    .button {
      height: 100px;
      margin: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333333;
      border-radius: 6px;
      &:active {
        background: rgba(255, 221, 53, 0.7);
      }
    }
    .can-not-select {
      background: rgba(255, 221, 53, 0.3);
    }
    .can-select {
      background: $primary;
    }
  }
}
</style>
