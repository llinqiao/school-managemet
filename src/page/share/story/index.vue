<template>
  <div id="story">
    <ul class="content-list">
      <li v-for="(item, index) in contentArray" :key="index" class="content-item">
        <img v-if="item.type === 1" :src="item.cover" alt="" class="img">
        <div v-else class="sentence">
          <i class="active-line" v-show="nowPlayIndex === index"></i>
          <span v-html="item.sentence" @click="playRecordVoice(item.audio, true, index)"></span>
          <audio :src="item.audio" preload></audio>
          <audio :src="item.user_audio" preload></audio>
          <i class="play-btn" @click="playRecordVoice(item.user_audio, true, index)"></i>
        </div>
      </li>
    </ul>
    <div class="bottom-bar">
      <h3>{{ contentArray[0] && contentArray[0].username }}的朗读录音</h3>
      <button class="play-all-btn" @click="playAllAudio">
        <i :class="{ btn: true, play: isPlayingAll }"></i>
        <span>{{ isPlayingAll ? '暂停' : '播放' }}</span>
      </button>
    </div>
    <audio ref="audioPlayer" @ended="endPlay"></audio>
  </div>
</template>

<script>
import { getStory, getChildStory, getExpandStory } from '@/api/share';
import { studentAnswerCov } from '../../../lib/utils';

export default {
  name: 'index',
  components: {},
  data() {
    return {
      storyId: '',
      contentArray: [],
      playSrc: '',
      nowPlayIndex: null,
      isPlayAll: false,
      playIndex: 0,
      isPlayingAll: false,
    };
  },
  filters: {},
  computed: {
    audioPlayer() {
      return this.$refs.audioPlayer;
    },
    userAudioList() {
      if (this.contentArray.length) {
        return this.contentArray
          .filter(item => item.type === 0)
          .map(item => ({ index: item.index, src: item.user_audio }));
      }
      return [];
    },
  },
  watch: {},
  methods: {
    playRecordVoice(src, singlePlay = true, index) {
      this.nowPlayIndex = index;
      if (singlePlay) {
        this.isPlayAll = false;
        this.isPlayingAll = false;
      }
      this.audioPlayer.src = src;
      setTimeout(() => {
        this.audioPlayer.play();
      }, 20);
    },
    endPlay() {
      this.nowPlayIndex = null;
      if (this.isPlayAll) {
        this.playIndex++;
        if (this.playIndex === this.userAudioList.length) {
          this.isPlayAll = false;
          this.isPlayingAll = false;
          this.playIndex = 0;
          return;
        }
        let item = this.userAudioList[this.playIndex];
        this.playRecordVoice(item.src, false, item.index);
      }
    },
    playAllAudio() {
      if (this.isPlayAll) {
        if (this.isPlayingAll) {
          // 暂停
          this.audioPlayer.pause();
        } else {
          // 继续
          this.audioPlayer.play();
        }
        this.isPlayingAll = !this.isPlayingAll;
      } else {
        // 开始播放全部
        this.isPlayAll = true;
        this.isPlayingAll = true;
        let item = this.userAudioList[this.playIndex];
        this.playRecordVoice(item.src, false, item.index);
      }
    },
  },
  async created() {
    this.storyId = this.$route.query.id;
    let res;
    if (this.$route.name === 'expand_story') {
      res = await getExpandStory(this.storyId);
    } else if (this.$route.name === 'child_story') {
      res = await getChildStory(this.storyId);
    } else {
      res = await getStory(this.storyId);
    }
    this.contentArray = res.map((item, index) => {
      item.type = parseInt(item.type, 10);
      item.index = index;
      // 处理错误句子
      if (item.type === 0) {
        // 句子二维数组
        item.sentence = studentAnswerCov(item.sentence, item.user_lack);
      }
      return item;
    });
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
@import '@/css/var.scss';
#story {
  height: 100%;
  audio {
    width: 0;
    height: 0;
  }
}
.content-list {
  overflow: scroll;
  height: calc(100% - 140px);
  padding: 30px;
  color: #58cb68;
  font-size: 36px;
  -webkit-overflow-scrolling: touch;
  .content-item {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .sentence {
      position: relative;
      flex-wrap: wrap;
      line-height: 50px;
      .active-line {
        position: absolute;
        left: -9px;
        width: 4px;
        height: 100%;
        background: #fedc34;
        border-radius: 2px;
      }
      /deep/ .error {
        color: #ff2a00;
      }
      .play-btn {
        display: inline-block;
        width: 46px;
        height: 46px;
        background: url(./img/play-btn.png) no-repeat center center / cover;
        vertical-align: middle;
      }
    }
  }
  .img {
    width: 100%;
  }
}
.bottom-bar {
  position: absolute;
  display: flex;
  width: 100%;
  height: 140px;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0 -8px 12px 1px rgba(0, 0, 0, 0.11);
  h3 {
    color: #333;
    font-size: 30px;
  }
  .play-all-btn {
    display: flex;
    height: 98px;
    align-items: center;
    padding: 0 50px;
    margin-left: auto;
    background: #ebb43a;
    border-radius: 6px;
    box-shadow: 0 2px 20px 0 rgba(255, 203, 87, 0.2);
    color: #333;
    font-size: 30px;
    .btn {
      width: 45px;
      height: 45px;
      margin-right: 30px;
      background: url(./img/play-all-btn.png) no-repeat center center / contain;
      &.play {
        background: url(./img/pause-all-btn.png) no-repeat center center / contain;
      }
    }
  }
}
</style>
