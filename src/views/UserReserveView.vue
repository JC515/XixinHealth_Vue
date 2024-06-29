<template>
  <div class="reserve-view">
    <el-header class="header">
      <h1>熙心健康体检预约</h1>
    </el-header>
    <el-main id="main">
      <el-steps class="steps" :active="active" finish-status="success">
        <el-step title="登录/注册"/>
        <el-step title="填写预约信息"/>
        <el-step title="支付"/>
      </el-steps>

      <div v-if="active === 0">
        <el-card class="form-card">
          <template #header>
            <div class="form-header">
              <el-button type="text" @click="setLogin(true)">登录</el-button>
              <el-button type="text" @click="setLogin(false)">注册</el-button>
            </div>
          </template>
          <el-form v-if="isLogin" :model="loginForm" @submit.prevent="handleLogin" label-width="80px">
            <el-form-item label="手机号">
              <el-input v-model="loginForm.userId"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="loginForm.password"></el-input>
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
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="0"></el-option>
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
                <el-option label="普通用户" :value="1"></el-option>
                <el-option label="系统员工" :value="2"></el-option>
                <el-option label="其他" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleRegister" class="full-width-btn">注册</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>

      <div v-else-if="active === 1">
        <el-card class="form-card">
          <el-form :model="orderForm" @submit.prevent="handleOrder" label-width="100px">
            <el-form-item label="预约日期">
              <el-date-picker v-model="orderForm.orderDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="客户编号">
              <el-input v-model="orderForm.userId"></el-input>
            </el-form-item>
            <el-form-item label="医院编号">
              <el-input v-model="orderForm.hpId"></el-input>
            </el-form-item>
            <el-form-item label="套餐编号">
              <el-input v-model="orderForm.smId"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="orderForm.state" placeholder="请选择订单状态">
                <el-option label="未归档" :value="1"></el-option>
                <el-option label="已归档" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleOrder" class="full-width-btn">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>

      <el-button class="next-button" @click="next" type="primary">下一步</el-button>
    </el-main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)
const isLogin = ref(true)

const loginForm = ref({
  userId: '',
  password: ''
})

const registerForm = ref({
  userId: '',
  password: '',
  realName: '',
  sex: null,
  identityCard: '',
  birthday: null,
  userType: null
})

const orderForm = ref({
  orderId: null,
  orderDate: null,
  userId: '',
  hpId: null,
  smId: null,
  state: 1
})

const setLogin = (login: boolean) => {
  isLogin.value = login
}

const handleLogin = () => {
  console.log('登录信息:', loginForm.value)
  // 在这里添加你的登录逻辑
}

const handleRegister = () => {
  console.log('注册信息:', registerForm.value)
  // 在这里添加你的注册逻辑
}

const handleOrder = () => {
  console.log('预约信息:', orderForm.value)
  // 在这里添加你的预约逻辑
}

const next = () => {
  if (active.value < 2) {
    active.value++
  }
}
</script>

<style scoped>
.reserve-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(-225deg, #E3FDF5, #FFE6FA 100%);
  height: 100vh;
}

.header {
  margin: 20px;
}

.steps {
  max-width: 600px;
  min-width: 300px;
  margin-top: 20px;
}

.form-card {
  max-width: 400px;
  width: 100%;
  margin-top: 20px;
}

.form-header {
  display: flex;
  justify-content: space-around;
}

.full-width-btn {
  width: 100%;
}

.next-button {
  margin-top: 12px;
  width: 100%;
}
</style>
