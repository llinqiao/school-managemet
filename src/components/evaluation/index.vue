<template>
  <div :class="{'evaluation-detail':isCanChange,'evaluation':!isCanChange}">
    <div class="evaluation-list" v-for="(item,index) in evaluationData" :key="index">
      <div class="item">
        <span :class="{ writeName: isCanChange, name:true }">{{item.name}}</span>
        <div class="rate-wrapper">
          <van-rate
            v-model="item.value"
            @change="(value)=>onChange(index,value)"
            :readonly="isCanChange"
          />
          <span :class="{ writeNum: isCanChange, num:true }">{{item.value}}星</span>
        </div>
      </div>
    </div>
    <!-- <van-rate  v-model="dali" /> -->
  </div>
</template>

<script>
import { Rate } from 'vant';
export default {
  name: 'evaluation',
  components: { Rate },
  data() {
    return {};
  },
  props: {
    evaluationData: Array,
    change: Function,
    isCanChange: Boolean,
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    onChange(index, value) {
      this.$emit('change', index, value);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.evaluation {
  .evaluation-list {
    padding: 0 24px;
    background-color: $white;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 110px;
      border-bottom: 1px solid $line;
      .rate-wrapper {
        display: flex;
        align-items: center;
      }
      .name {
        font-size: 28px;
      }
      .writeName {
        color: #666666;
        font-size: 28px;
      }
      .num {
        font-size: 32px;
        margin-left: 28px;
      }
      .writeNum {
        color: #666666;
        font-size: 28px;
        margin-left: 28px;
      }
      .van-rate {
        display: flex;
        align-items: center;
      }
      .van-rate__icon {
        font-size: 17px;
      }
    }
  }
}
.evaluation-detail {
  padding: 27px 0 24px;
  background-color: $white;
  .evaluation-list {
    padding: 0 24px 0 32px;
    margin-bottom: 21px;
    &:last-child {
      margin-bottom: 0px;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      line-height: 40px;
      // border-bottom: 1px solid $line;

      .rate-wrapper {
        display: flex;
        align-items: top;
        height: 40px;
      }
      .name {
        font-size: 28px;
      }
      .writeName {
        color: #666666;
        font-size: 28px;
      }
      .num {
        font-size: 28px;
        margin-left: 28px;
      }
      .writeNum {
        color: #666666;
        font-size: 28px;
        margin-left: 28px;
      }
      .van-rate {
        height: 20px;
        display: flex;
        align-items: flex-start;
      }
      .van-rate__icon {
        font-size: 17px;
      }
    }
  }

  &:last-child {
    .item {
      border-bottom: 0;
    }
  }
}
</style>
