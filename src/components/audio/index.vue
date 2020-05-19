<template>
  <div class="audio">
    <div class="operate-btn" :class="isPlay ? 'pause' : 'play'" @click="operateAudio"></div>
    <div class="process-bar">
      <Slider
        bar-height="4px"
        active-color="#fedc34"
        :max="allDuration"
        v-model="current"
        @change="updatePlayTime">
        <div
          slot="button"
          class="custom-button"
        ></div>
      </Slider>
    </div>
    <div class="time">{{ current | formatTime }}</div>
    <audio
      :src="src"
      @durationchange="durationchangeCb"
      @timeupdate="timeupdateCb"
      @play="isPlay = true"
      @playing="isPlay = true"
      @pause="isPlay = false"
      @ended="isPlay = false"
      ref="audio"></audio>
  </div>
</template>

<script>
import { Slider } from 'vant';
export default {
  name: 'custom-audio',
  components: { Slider },
  data() {
    return {
      isPlay: false,
      current: 0,
      allDuration: 1,
    };
  },
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  filters: {
    formatTime(time) {
      let t;
      if (parseInt(time) > -1) {
        let hour = Math.floor(time / 3600);
        let min = Math.floor(time / 60) % 60;
        let sec = time % 60;
        t = hour === 0 ? '' : (hour < 10 ? '0' + hour : hour) + ':';
        t += (min < 10 ? '0' + min : min) + ':';
        t += sec < 10 ? '0' + parseInt(sec) : parseInt(sec);
      } else {
        t = 0;
      }
      return t;
    },
  },
  computed: {
    audioEle() {
      return this.$refs.audio;
    },
  },
  watch: {},
  methods: {
    operateAudio() {
      if (!this.isPlay) {
        this.audioEle.play();
      } else {
        this.audioEle.pause();
      }
      this.isPlay = !this.isPlay;
    },
    durationchangeCb() {
      this.allDuration = this.audioEle.duration;
    },
    timeupdateCb() {
      this.current = this.audioEle.currentTime;
    },
    updatePlayTime(val) {
      this.audioEle.pause();
      this.current = this.audioEle.currentTime = val;
      this.audioEle.play();
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.audio {
  display: flex;
  height: 109px;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background: $white;
  border-radius: 6px;
  font-size: 30px;
  .operate-btn {
    width: 59px;
    height: 59px;
    &.play {
      background: url(./img/play-btn.png) no-repeat center center / contain;
    }
    &.pause {
      background: url(./img/pause-btn.png) no-repeat center center / contain;
    }
  }
  .process-bar {
    width: 460px;
    .custom-button {
      width: 31px;
      height: 31px;
      border: 10px solid $primary;
      background: $white;
      border-radius: 50%;
    }
  }
}
</style>
