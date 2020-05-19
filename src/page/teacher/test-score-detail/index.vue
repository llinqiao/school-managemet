<template>
  <div class="test-score-detail">
    <div class="detail-content">
      <ul class="item-wrapper">
        <li v-for="(item,index) in list" :key="item.id" class="item">
          <div class="left">
            <div class="img-content">
              <img v-if="index===0" src="./img/one.png" class="img" />
              <img v-else-if="index===1" src="./img/two.png" class="img" />
              <img v-else-if="index===2" src="./img/three.png" class="img" />
              <img v-else src="./img/common.png" class="img" />
              <div class="sort">{{index+1}}</div>
            </div>
            <!-- <img :src="item.avata" class="avate-img" /> -->
            <div
              :class="{'one-color':index===0,'two-color':index===1,'three-color':index===2,'common-color':true}"
            >{{item.student_name}}</div>
          </div>
          <div
            :class="{'one-color':index===0,'two-color':index===1,'three-color':index===2,'common-color':true}"
          >{{item.score}}分</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTestDetail } from '@/api/teacher/test';
export default {
  name: 'testscoredetail',
  components: {},
  data() {
    return {
      list: [
        // { name: 'xxx1', score: '2', avata: '' },
        // { name: 'xxx1', score: '2', avata: '' },
        // { name: 'xxx1', score: '2', avata: '' },
        // { name: 'xxx1', score: '2', avata: '' },
        // { name: 'xxx1', score: '2', avata: '' },
      ],
    };
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  async mounted() {
    this.Id = this.$route.query.id;
    // this.evaluationName = this.$route.query.name;
    this.$route.meta.title = this.$route.query.name + '成绩';
    const { data } = await getTestDetail(this.$route.query.id);
    this.list = data;
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.test-score-detail {
  height: 100%;
  background-color: $bgColorNew;
  .detail-content {
    background-color: $bgColorNew;
    padding: 20px 24px;
    border-radius: 6px;
  }
  .item-wrapper {
    .left {
      display: flex;
      align-items: center;
    }
    .item {
      height: 110px;
      background-color: white;
      display: flex;
      padding: 0 24px;
      align-items: center;
      display: flex;
      justify-content: space-between;
    }
    .img-content {
      position: relative;
      justify-content: center;
      align-items: center;
      .img {
        width: 44px;
        height: 44px;
      }
      .sort {
        font-size: 26px;
        color: #333333;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .avate-img {
      width: 70px;
      height: 70px;
      margin: 0 16px 0 24px;
    }
    .common-color {
      color: black;
      font-size: 28px;
      margin-left: 24px;
    }
    .one-color {
      color: #ff6216;
    }
    .two-color {
      color: #ffc516;
    }
    .three-color {
      color: #708fff;
    }
  }
}
</style>
