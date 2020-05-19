<template>
  <div class="simple-audio" @click="operateAudio">
    <audio
      :src="src"
      @play="isPlay = true"
      @playing="isPlay = true"
      @pause="isPlay = false"
      @ended="isPlay = false"
      ref="audio"></audio>
  </div>
</template>

<script>
export default {
  name: 'simpleAudio',
  components: {},
  data() {
    return {
      isPlay: false,
    };
  },
  props: {
    src: String,
  },
  filters: {},
  computed: {
    audioEle() {
      return this.$refs.audio;
    },
  },
  watch: {},
  methods: {
    operateAudio() {
      if (this.isPlay) {
        this.audioEle.pause();
      } else {
        document.querySelectorAll('audio').forEach(item => {
          item.pause();
        });
        this.audioEle.play();
      }
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.simple-audio {
  display: inline-block;
  width: 80px;
  height: 80px;
  background: url(./img/voice.png) no-repeat center center / contain;
}
</style>
