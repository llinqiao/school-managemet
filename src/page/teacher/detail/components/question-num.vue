<template>
  <div class="question-num">
    <span>题目数</span>
    <span>{{ num }}</span>
  </div>
</template>

<script>
export default {
  name: 'list',
  components: {},
  data() {
    return {};
  },
  props: {
    num: Number,
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import '@/css/var.scss';
.question-num {
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  background: $white;
  font-size: 30px;
}
</style>
