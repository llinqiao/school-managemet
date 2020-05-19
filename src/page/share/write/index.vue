<template>
    <div id="index">
        <hello></hello>
    </div>
</template>

<script>
import Hello from '../../components/hello/index';
export default {
  name: 'index',
  components: {
    Hello,
  },
  data() {
    return {};
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
@import './index.scss';
.app {
  position: relative;
  top: 10px;
}
</style>
