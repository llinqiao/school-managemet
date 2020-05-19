<template>
  <div class="login">
    <div class="header">
      <div class="logo"></div>
      <div class="title">
        <h1>美柏教育</h1>
        <p>人人可以轻松学,成绩能力双丰收</p>
      </div>
    </div>
    <div class="form">
      <h2>密码登录</h2>
      <InputWrapper label="手机号码" inputType="text" v-model="phone">
        <div slot="prefix" class="prefix">+86</div>
      </InputWrapper>
      <InputWrapper label="密码" inputType="password" v-model="password" />
      <button :disabled="!canSubmit" :class="{ active: canSubmit }" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import InputWrapper from './components/input-wrapper';
import { isPhoneNumber } from '@/lib/utils';
import { login } from '@/api/auth';
import storage from '../../../lib/storage';

export default {
  name: 'parent-login',
  components: { InputWrapper },
  data() {
    return {
      phone: '',
      password: '',
    };
  },
  filters: {},
  computed: {
    canSubmit() {
      return isPhoneNumber(this.phone) && this.password;
    },
  },
  watch: {},
  methods: {
    async login() {
      try {
        const res = await login(this.phone, this.password);
        storage.set('token', res.token);
        storage.set('emplooyId', res.employee_id);
        storage.set('emplooyType', res.type);

        if (res.token) {
          console.log(res.token, 'token');
          this.$router.replace('homepage');
        }
        // this.$router.replace('list');
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {},
  mounted() {
    // if (storage.get('token')) {
    //   console.log(typeof storage.get('token'), 'token');
    //   // this.$router.replace('/parent/list');
    //   this.$router.replace('/teacher/homepage');
    // }
  },
};
</script>
<style lang='scss' scoped>
@import '@/css/var.scss';
.login {
  height: 100%;
  background: $white;
}
.prefix {
  padding: 14px 17px;
  margin-right: 32px;
  background: #f1f1f1;
  border-radius: 6px;
  font-size: 26px;
  line-height: 1;
}
.header {
  display: flex;
  height: 292px;
  align-items: center;
  padding: 0 40px;
  background: url(./img/login-bg.png) no-repeat center center / cover;
  .logo {
    width: 143px;
    height: 143px;
    margin-right: 20px;
    background: url(./img/logo.png) no-repeat center center / cover;
  }
  .title {
    h1 {
      font-size: 40px;
    }
    p {
      color: rgba(50, 51, 51, 0.8);
      font-size: 30px;
    }
  }
}
.form {
  position: relative;
  padding: 0 40px;
  margin-top: 57px;
  h2 {
    font-size: 46px;
    line-height: 1;
  }
  button {
    position: absolute;
    right: 40px;
    width: 258px;
    height: 90px;
    margin-top: 48px;
    border-radius: 45px;
    color: $mainFontColor;
    font-size: 30px;
    &.active {
      background: $primary;
    }
  }
}
</style>
