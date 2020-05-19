<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <div :class="{ wrapper: true, focus: isFocus }">
      <slot name="prefix"></slot>
      <input
        :type="inputType"
        v-model="inputVal"
        @input="$emit('input', inputVal)"
        @focus="isFocus = true"
        @blur="isFocus = false" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  data() {
    return {
      inputVal: '',
      isFocus: false,
    };
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    defaultVal: {
      type: String,
      default: '',
    },
  },
  filters: {},
  computed: {},
  watch: {
    defaultVal(val) {
      if (val) this.inputVal = val;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang='scss' scoped>
@import '@/css/var.scss';
.input-wrapper {
  margin-top: 54px;
  label {
    font-size: 26px;
  }
  .wrapper {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
    &.focus {
      border-bottom: 1px solid $primary;
    }
    input {
      height: 84px;
      flex: 1;
      border: none;
      background: none;
    }
  }
}
</style>
