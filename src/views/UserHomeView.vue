<template>
  <div style="padding: 20px; display: flex; justify-content: center; align-items: center;" v-show="!yesLogin">
    <el-card class="form-card">
      <template #header>
        <div class="form-header">
          <div>
            <h2>熙心健康体检</h2>
          </div>
          <el-button type="text" @click="setLogin(true)">登录</el-button>
          <el-button type="text" @click="setLogin(false)">注册</el-button>
        </div>
      </template>
      <el-form v-if="noLogin" :model="loginForm" @submit.prevent="handleLogin" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="loginForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="loginForm.remember">
            记住我
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" class="full-width-btn">登录</el-button>
        </el-form-item>
      </el-form>
      <el-form v-else :model="registerForm" @submit.prevent="handleRegister" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="registerForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="registerForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="registerForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="registerForm.identityCard"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="registerForm.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="registerForm.userType" placeholder="请选择用户类型">
            <el-option label="普通用户" value="1"></el-option>
            <el-option label="系统员工" value="2"></el-option>
            <el-option label="其他" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister" class="full-width-btn">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  <div class="personal-center" v-if="yesLogin">
    <el-card shadow="hover" class="user-card">
      <div class="user-info">
        <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            size="large"
            class="avatar"
        />
        <div>
          <h2>{{ loginForm.realName }}</h2>
          <p>账号：{{ loginForm.userId }}</p>
        </div>
      </div>
    </el-card>
    <el-menu class="menu">
      <el-menu-item>
        <el-button type="text" @click="$router.push('/user/reserve')">前往预约</el-button>
      </el-menu-item>
      <el-menu-item>
        <el-button type="text" @click="$router.push('/user/orderList')">预约列表</el-button>
      </el-menu-item>
      <el-menu-item>
        <el-button type="text" @click="yesLogin = false;user.yesLogin=false;">退出登录</el-button>
      </el-menu-item>
    </el-menu>
    <el-footer class="footer">
      <el-button type="text">首页</el-button>
      <el-button type="text">就医</el-button>
      <el-button type="text">消息</el-button>
      <el-button type="text">我的</el-button>
    </el-footer>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import axios from "axios";
import {useUserStore} from "@/stores/user.js";
import {onMounted} from 'vue'

const noLogin = ref(true)
const yesLogin = ref(false)

const user = useUserStore()

const loadLocalData = () => {
  loginForm.value.remember = user.rememberMe
  if (loginForm.value.remember) {
    loginForm.value.userId = user.userId
    loginForm.value.password = user.password
  }
  yesLogin.value = user.yesLogin
}

const loginForm = ref({
  userId: '',
  password: '',
  realName: '',
  remember: false
})

const registerForm = ref({
  userId: '',
  password: '',
  realName: '',
  sex: null,
  identityCard: '',
  birthday: '',
  userType: ''
})

const setLogin = (value) => {
  noLogin.value = value
}


const loginFormCheck = () => {
  if (loginForm.value.userId === '' || loginForm.value.password === '') {
    ElMessage.error('手机号或密码不能为空')
    return false
  }
  return true
}

const registerFormCheck = () => {
  if (registerForm.value.userId === '' || registerForm.value.password === '' || registerForm.value.realName === '' || registerForm.value.sex === '' || registerForm.value.identityCard === '' || registerForm.value.birthday === '' || registerForm.value.userType === '') {
    ElMessage.error('请填写完整信息')
    return false
  }
  return true
}

const handleRegister = async () => {
  if (!registerFormCheck()) {
    return
  }
  await axios.post('http://localhost:8080/users/saveUsers', registerForm.value).then(res => {
    if (res.data.code === 0) {
      ElMessage.success('注册成功')
      // 跳转到登录页面
      setLogin(true)
      // 将注册信息填充到登录表单中
      loginForm.value.userId = registerForm.value.userId
      loginForm.value.password = registerForm.value.password
    } else {
      ElMessage.error(res.data.message)
    }
  }).catch(err => {
    console.log(err)
    ElMessage.error('注册失败')
  })
}

const handleLogin = async () => {
  if (!loginFormCheck()) {
    return
  }
  await axios.get('http://localhost:8080/users/getUsersByUserIdByPass', {
    params: {
      userId: loginForm.value.userId,
      password: loginForm.value.password
    }
  }).then(res => {
    if (res.data.code === 0) {
      yesLogin.value = true
      // 保存登录信息到本地
      user.yesLogin = true
      if (loginForm.value.remember) {
        user.userId = loginForm.value.userId
        user.password = loginForm.value.password
        user.rememberMe = true
      }
      ElMessage.success('登录成功')
      // 获取用户姓名
      getRealName()
    } else {
      ElMessage.error('手机号或密码错误')
    }
  }).catch(err => {
    console.log(err)
    ElMessage.error('登录失败')
  })
}

const getRealName = async () => {
  await axios.get('http://localhost:8080/users/getUserNameByUserId', {
    params: {
      userId: loginForm.value.userId
    }
  }).then(res => {
    if (res.data.code === 0) {
      loginForm.value.realName = res.data.data
    }
  }).catch(err => {
    console.log(err)
  })
}

onMounted(() => {
  loadLocalData()
  getRealName()
})

</script>

<style scoped>
.personal-center {
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-width: 400px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #e0ffe0;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info div h2 {
  margin: 0;
  font-size: 16px;
}

.user-info div p {
  margin: 0;
  font-size: 12px;
  color: #888;
}

.menu {
  flex-grow: 1;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
}

.footer {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background-color: #f0f0f0;
  flex-shrink: 0;
}

.form-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 400px;
  width: 100%;
  margin-top: 20px;
}
</style>
