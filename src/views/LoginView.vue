<script setup>
import {reactive} from 'vue'
import {useRouter} from "vue-router";
import {doctorLogin} from "@/api/doctor.js";
import {useUserStore} from "@/stores/user.js";

const router = useRouter()
const user = useUserStore();

const loginForm = reactive({
  username: user.userId,
  password: user.password,
})

const checkIsRemember = () => {
  if (user.isRemember) {
    loginForm.username = user.userId
    loginForm.password = user.password
  } else {
    loginForm.username = ''
    loginForm.password = ''
  }
}

const handleLogin = async () => {
  if (!checkLogin()) {
    return;
  }
  if (await doctorLogin(loginForm.username, loginForm.password)) {
    ElMessage.success('登录成功')
    user.isLogin = true
    await router.push({
      name: 'home'
    })
    checkIsRemember()
  } else {
    ElMessage.error('用户名或密码错误')
  }
}

const checkLogin = () => {
  if (loginForm.username === '' || loginForm.password === '') {
    ElMessage.error('用户名或密码不能为空')
    return false;
  }
//   检测密码中是否包含特殊字符
  const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
  if (!pattern.test(loginForm.password)) {
    ElMessage.error('密码中必须包含数字和字母，长度6-20位')
    return false;
  }
  return true;
}

checkIsRemember();

</script>

<template>
  <div class="register-view">
    <el-card style="max-width: 600px; min-width: 460px;">
      <template #header>
        <div class="card-header">
          <span>熙心健康体检系统用户登录</span>
        </div>
      </template>

      <div style="margin: 20px"/>
      <el-form
          label-width="auto"
          :model="loginForm"
          style="max-width: 600px"
      >
        <el-form-item label="Username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"/>
        </el-form-item>
        <el-row>
          <el-checkbox v-model="user.isRemember">记住我</el-checkbox>
        </el-row>
        <el-row justify="center">
          <el-button type="primary" @click="handleLogin">登录</el-button>
          <el-button type="primary" @click="$router.push('/register')">注册</el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.register-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(135deg, #81FFEF 10%, #F067B4 100%)
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
}

</style>