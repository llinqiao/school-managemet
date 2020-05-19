<template>
  <div class="score" v-if="detail">
    <div class="score-card" v-if="!isWord">
      <!-- 作业等 -->
      <template v-if="!isTest">
        <MessageItem
          lLabel="班级最高分"
          :lVal="detail.high_score + '分'"
          rLabel="班级平均分"
          :rVal="fixed2(detail.average_score) + '分'"
        />
        <MessageItem
          lLabel="同级别最高分"
          :lVal="detail.high_score_grade + '分'"
          rLabel="同级别平均分"
          :rVal="fixed2(detail.average_score_grade) + '分'"
        />
      </template>

      <!-- 随堂测验 -->
      <template v-else>
        <MessageItem
          lLabel="共答题"
          :lVal="detail.total_test + '题'"
          rLabel="答对"
          :rVal="detail.true_test + '题'"
        />
      </template>

      <div class="score-wrapper">
        <span class="num">{{ detail.score }}</span>
        <span class="units">评测分</span>
      </div>

      <!-- 作业等 -->
      <template v-if="!isTest">
        <div class="integral" v-if="!isVideo">
          <span class="desc">积分</span>
          &nbsp;&nbsp;
          <span class="num">+{{ detail.coin }}</span>
        </div>
        <MessageItem
          v-if="!isVideo"
          lLabel="效率分"
          :lVal="detail.efficiency_score + '分'"
          rLabel="用时分"
          :rVal="detail.time_score + '分'"
        />
        <MessageItem
          lLabel="共答题"
          :lVal="detail.total_test + '题'"
          rLabel="花时"
          :rVal="detail.time + '秒'"
        />
        <MessageItem
          lLabel="答对"
          :lVal="detail.true_test + '题'"
          :rLabel="`${detail.finish_count}人已完成 平均花时`"
          :rVal="fixed2(detail.average_time) + '秒'"
        />
      </template>

      <!-- 随堂测试 -->
      <template v-else>
        <MessageItem
          lLabel="班级最高分"
          :lVal="detail.high_score + '分'"
          rLabel="班级平均分"
          :rVal="fixed2(detail.average_score) + '分'"
        />
        <MessageItem
          lLabel="同级别最高分"
          :lVal="detail.high_score_grade + '分'"
          rLabel="同级别平均分"
          :rVal="fixed2(detail.average_score_grade) + '分'"
        />
      </template>
    </div>
    <button v-if="!isWord && !isTest" @click="goDetail" class="watch-detail-btn">查看作业详情</button>

    <div class="score-word" v-if="isWord">
      <div class="top">
        <div class="item">
          <span class="num">{{ detail.total_test }}</span>
          <span class="text">总难词数</span>
        </div>
        <div class="border"></div>
        <div class="item">
          <span class="num">{{ detail.true_test }}</span>
          <span class="text">完成难词数</span>
        </div>
      </div>
      <div class="bottom">
        <div class="remain-test">未攻克难词数[{{detail.mistake_count}}]</div>
        <div class="mistake">{{detail.mistake}}</div>
      </div>
      <p class="time">完成时间: {{detail.time}}</p>
    </div>
  </div>
</template>

<script>
import { getHomeWorkScore } from '../../../api/homework';
import MessageItem from './components/message-item';
import { timeFormat } from '../../../lib/utils';
export default {
  name: 'score',
  components: { MessageItem },
  data() {
    return {
      type: '',
      id: '',
      detail: null,
    };
  },
  filters: {},
  computed: {
    isTest() {
      return this.type === '5';
    },
    isVideo() {
      return this.type === '4';
    },
    isWord() {
      return this.type === '6';
    },
  },
  watch: {},
  methods: {
    goDetail() {
      let type = this.$route.query.lesson_type;
      this.$router.push(
        `/parent/detail/${this.type}/${this.id}/${this.detail.detail_id}${
          type ? `?lesson_type=${type}` : ''
        }`
      );
    },
    fixed2(val) {
      if (!val) return val;
      return Number(val).toFixed(2);
    },
  },
  created() {},
  async mounted() {
    this.type = this.$route.params.type;
    this.id = this.$route.params.id;
    try {
      this.detail = await getHomeWorkScore(this.type, this.id);
      if (Number(this.type) === 6) {
        this.detail.time = timeFormat(new Date(this.detail.time * 1000), 'MM-dd hh:mm');
      }
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.score {
  min-height: 100%;
  padding: 20px;
  background: #f1f2f4;
  .score-card {
    padding: 35px 20px;
    background: $white;
    border-radius: 6px;
    .score-wrapper {
      display: flex;
      width: 439px;
      height: 439px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      margin-top: 16px;
      background: url(./img/score-bg.png) no-repeat center center / cover;
      line-height: 1;
      .num {
        font-family: 'RTWSYueGoTrial-Regular';
        font-size: 120px;
      }
      .units {
        margin-top: 27px;
        color: rgba(50, 51, 51, 0.6);
        font-size: 26px;
      }
    }
    .integral {
      margin: 16px 0 30px 0;
      font-size: 30px;
      text-align: center;
      .desc {
        color: #9094a3;
      }
    }
  }
  .watch-detail-btn {
    width: 100%;
    height: 100px;
    margin-top: 20px;
    background: $primary;
    border-radius: 6px;
    font-size: 30px;
  }
}

.score-word {
  width: 100%;
  .top {
    display: flex;
    width: 100%;
    height: 205px;
    align-items: center;
    padding: 54px 0;
    border-bottom: 1px solid rgba(242, 242, 242, 1);
    background-color: #fff;

    .border {
      width: 1px;
      height: 80px;
      background-color: rgba(209, 209, 209, 1);
    }

    .item {
      display: flex;
      width: 50%;
      flex-direction: column;
      align-items: center;

      .num {
        margin-bottom: 20px;
        color: rgba(51, 51, 51, 1);
        font-family: DINPro-Medium, DINPro;
        font-size: 36px;
        font-weight: 500;
      }

      .text {
        color: rgba(144, 147, 153, 1);
        font-family: PingFangSC-Regular, PingFang SC;
        font-size: 24px;
      }
    }
  }

  .bottom {
    padding: 24px 30px 35px;
    background-color: #fff;
    .remain-test {
      margin-bottom: 5px;
      color: rgba(144, 147, 153, 1);
      font-family: PingFangSC-Regular, PingFang SC;
      font-size: 24px;
    }

    .mistake {
      color: rgba(48, 49, 51, 1);
      font-family: DINPro-Medium, DINPro;
      font-size: 28px;
      font-weight: 500;
      white-space: wrap;
      word-break: break-word;
    }
  }

  .time {
    margin-top: 15px;
    color: rgba(192, 196, 204, 1);
    font-family: PingFangSC-Regular, PingFang SC;
    font-size: 22px;
  }
}
</style>
