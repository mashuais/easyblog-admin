<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title">用户登录</div>
      <el-form :model="formData" :rules="rules" ref="formDataRef">
        <el-form-item prop="account">
          <el-input placeholder="请输入账号" v-model="formData.account" size="large">
            <template #prefix>
              <span class="iconfont icon-account"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="formData.password" size="large">
            <template #prefix>
              <span class="iconfont icon-password"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkCode">
          <div class="check-code-panel">
            <el-input placeholder="请输入验证码" v-model="formData.checkCode" class="input-panel" size="large"
              @keyup.enter.native="login" />
            <img :src="checkCodeUrl" class="check-code" @click="changeCheckCode">
          </div>

        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="formData.rememberMe" :true-label="1">记住我</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :style="{ width: '100%' }" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import md5 from 'js-md5'
import { getCurrentInstance, reactive, ref } from "vue"
import { useRouter } from 'vue-router'

const { proxy } = getCurrentInstance();
const router = useRouter();
const api = {
  checkCode: "api/checkCode",
  login: "/login"
}

const checkCodeUrl = ref(api.checkCode);
const changeCheckCode = () => {
  checkCodeUrl.value = api.checkCode + "?" + new Date().getTime();
}

//表单相关
const formDataRef = ref(null);
const formData = reactive({});

const rules = {
  account: [{
    required: true,
    message: "请输入用户名",
  }],
  password: [{
    required: true,
    message: "请输入密码",
  }],
  checkCode: [{
    required: true,
    message: "请输入验证码",
  }]

}

const init = () => {
  const loginInfo = proxy.VueCookies.get("loginInfo");
  if (!loginInfo) {
    return;
  }
  Object.assign(formData, loginInfo);
}
init();

const login = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    let cookieLoginInfo = proxy.VueCookies.get("loginInfo");
    let cookiePassword = cookieLoginInfo == null ? null : cookieLoginInfo.password;

    if (formData.password !== cookiePassword) {
      formData.password = md5(formData.password)
    }

    let params = {
      account: formData.account,
      password: formData.password,
      checkCode: formData.checkCode
    }

    let result = await proxy.Request({
      url: api.login,
      params: params,
      errorCallback: () => {
        changeCheckCode();
      }
    })
    if (!result) {
      return;
    }
    proxy.Message.success("登录成功");

    setTimeout(() => {
      router.push("/")
    }, 1500);
    const loginInfo = {
      account: params.account,
      password: params.password,
      rememberMe: formData.rememberMe
    }
    proxy.VueCookies.set("userInfo", result.data, 0);
    if (formData.rememberMe == 1) {
      proxy.VueCookies.set("loginInfo", loginInfo, "7d")
    }
  });
}

</script>

<style lang="scss">
.login-body {
  width: 100%;
  height: calc(100vh);
  background-size: cover;
  background-position: center;
  background-image: url(../assets/login-bg.jpg);

  .login-panel {
    margin-top: 150px;
    margin-right: 100px;
    width: 350px;
    float: right;

    padding: 20px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
    box-shadow: 2px 2px 10px #ddd;

    .login-title {
      font-size: 25px;
      text-align: center;
      margin-bottom: 10px;
    }

    .check-code-panel {
      width: 100%;
      display: flex;
      align-items: center;

      .input-panel {
        flex: 1;
        margin-right: 5px;
      }

      .check-code {
        cursor: pointer;
      }
    }
  }
}
</style>