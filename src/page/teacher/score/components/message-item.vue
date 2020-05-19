<template>
  <div class="message-item">
    <div class="left">
      <label>{{ lLabel }}</label>
      <span class="val">{{ lVal }}</span>
    </div>
    <div class="right">
      <label>{{ rLabel }}</label>
      <span class="val">{{ rVal }}</span>
    </div>
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
    lLabel: String,
    lVal: String,
    rLabel: String,
    rVal: String,
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
.message-item {
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  label {
    margin-right: 10px;
    color: #9094a3;
  }
  .val {
    color: #323333;
  }
}
</style>
