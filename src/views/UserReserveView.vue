<template>
  <div class="reserve-view">
    <el-header class="header">
      <h1>熙心健康体检预约</h1>
    </el-header>
    <el-main id="main">
      <el-button type="text" @click="prev" style="display: flex;" v-if="active !== 0">上一步</el-button>
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
            <el-button type="text" @click="showDialog">已经预约，点击查看预约信息</el-button>
            <el-dialog v-model="dialogTableVisible" title="预约信息" width="800">
              <el-form label-position="left" label-width="100px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="手机号">
                      <el-input v-model="loginForm.userId"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="primary" @click="findOrderByUserId">点击查询</el-button>
                  </el-col>
                </el-row>
                <el-form-item label="订单 ID">
                  <el-input v-model="userOrder.orderId" disabled/>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input v-model="userOrder.phone" disabled/>
                </el-form-item>
                <el-form-item label="姓名">
                  <el-input v-model="userOrder.realName" disabled/>
                </el-form-item>
                <el-form-item label="性别">
                  <el-input v-model="userOrder.sex" disabled/>
                </el-form-item>
                <el-form-item label="检查类型">
                  <el-input v-model="userOrder.type" disabled/>
                </el-form-item>
                <el-form-item label="医院名称">
                  <el-input v-model="userOrder.hospitalName" disabled/>
                </el-form-item>
                <el-form-item label="预约日期">
                  <el-input v-model="userOrder.orderDate" disabled/>
                </el-form-item>
              </el-form>
            </el-dialog>
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

      <div v-else-if="active === 1">
        <el-card class="form-card">
          <el-form :model="orderForm" @submit.prevent="handleOrder" label-width="100px">
            <el-form-item label="预约日期">
              <el-date-picker v-model="orderForm.orderDate" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="医院">
              <el-select v-model="orderForm.hpId" placeholder="请选择医院">
                <el-tooltip class="box-item" effect="dark" content="地址：光明市人民路999号；电话：97600xxx"
                            placement="right">
                  <el-option label="光明市第一人民医院" value="1"></el-option>
                </el-tooltip>
                <el-tooltip class="box-item" effect="dark" content="地址：光明市解放路666号；电话：97602xxxx"
                            placement="right">
                  <el-option label="光明市仁爱医院" value="2"></el-option>
                </el-tooltip>
              </el-select>
            </el-form-item>
            <el-form-item label="套餐">
              <el-select v-model="orderForm.smId" placeholder="请选择套餐">
                <el-option label="基础套餐" value="1"></el-option>
                <el-option label="高级套餐" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="orderForm.sex" placeholder="请选择性别" disabled>
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleOrder" class="full-width-btn">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>

      <div v-else-if="active === 2">
        <el-card class="form-card">
          <template #header>
            <div class="form-header">
              <h2>请确认预约订单信息</h2>
            </div>
          </template>
          <el-form :model="orderContent" label-width="100px">
            <el-form-item label="手机号">
              <el-input v-model="orderContent.userId" disabled></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-input v-model="orderContent.sex" disabled></el-input>
            </el-form-item>
            <el-form-item label="套餐类型">
              <el-input v-model="orderContent.smId" disabled></el-input>
            </el-form-item>
            <el-form-item label="医院">
              <el-input v-model="orderContent.hpId" disabled></el-input>
            </el-form-item>
            <el-form-item label="预约日期">
              <el-input v-model="orderContent.orderDate" disabled></el-input>
            </el-form-item>
            <p>应当支付金额：{{ orderContent.totalPrice }}元</p>
            <el-button type="primary" @click="submitOrder" style="width: 100%">确认支付</el-button>
          </el-form>
        </el-card>
      </div>
    </el-main>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import axios from "axios";

const active = ref(0)
const isLogin = ref(true)

const loginForm = ref({
  userId: '',
  password: ''
})

const userOrder = ref({});

const dialogTableVisible = ref(false)

const showDialog = () => {
  dialogTableVisible.value = true
}

const findOrderByUserId = async () => {
  if (loginForm.value.userId === '') {
    ElMessage.error('请输入手机号')
    return
  }
  await axios.get('http://localhost:8080/orders/getUserOrderByUserId', {
    params: {
      userId: loginForm.value.userId
    }
  }).then(res => {
        if (res.data.code === 0) {
          userOrder.value = res.data.data
          ElMessage.success('查询成功')
          userOrder.value.sex = userOrder.value.sex === '1' ? '男' : '女'
        } else {
          ElMessage.error('查询失败')
        }
      }
  ).catch(err => {
    console.log(err)
    ElMessage.error('查询失败')
  });
}

const loginFormCheck = () => {
  if (loginForm.value.userId === '' || loginForm.value.password === '') {
    ElMessage.error('手机号或密码不能为空')
    return false
  }
  return true
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
      ElMessage.success('登录成功')
      // 跳转到预约页面
      active.value = 1
      setUserSex()
    } else {
      ElMessage.error('手机号或密码错误')
    }
  }).catch(err => {
    console.log(err)
    ElMessage.error('登录失败')
  })
}

const setUserSex = async () => {
  await axios.get('http://localhost:8080/users/getUserSexById', {
    params: {
      userId: loginForm.value.userId
    }
  }).then(res => {
    if (res.data.code === 0) {
      orderForm.value.sex = res.data.data === 1 ? '男' : '女'
    } else {
      ElMessage.error('获取性别失败')
    }
  }).catch(err => {
    console.log(err)
    ElMessage.error('获取性别失败')
  })
}

const registerForm = ref({
  userId: '',
  password: '',
  realName: '',
  sex: null,
  identityCard: '',
  birthday: '',
  userType: ''
})

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
      loginForm.value.userId = registerForm.value.userId
      loginForm.value.password = registerForm.value.password
      active.value = 0
    } else {
      ElMessage.error(res.data.message)
    }
  }).catch(err => {
    console.log(err)
    ElMessage.error('注册失败')
  })
}

const orderForm = ref({
  orderDate: null,
  hpId: null,
  smId: null,
  userId: null,
  sex: null,
})

const orderContent = ref({
  orderDate: null,
  hpId: null,
  smId: null,
  userId: null,
  sex: null,
  totalPrice: 0
})

const orderFormCheck = () => {
  if (orderForm.value.orderDate === null || orderForm.value.hpId === null || orderForm.value.smId === null) {
    ElMessage.error('请填写完整信息')
    return false
  }
  orderForm.value.userId = loginForm.value.userId

  //对 orderContent 进行赋值
  orderContent.value.orderDate = orderForm.value.orderDate.getFullYear() + '-' + (orderForm.value.orderDate.getMonth() + 1) + '-' + orderForm.value.orderDate.getDate()
  orderContent.value.hpId = orderForm.value.hpId === '1' ? '光明市第一人民医院' : '光明市仁爱医院'
  orderContent.value.smId = orderForm.value.smId === '1' ? '基础套餐' : '高级套餐'
  orderContent.value.userId = orderForm.value.userId
  orderContent.value.sex = orderForm.value.sex
  orderContent.value.totalPrice = orderContent.value.smId === '基础套餐' ? 100 : 300
  return true
}

const resetOrderForm = () => {
  orderForm.value.orderDate = null
  orderForm.value.hpId = null
  orderForm.value.smId = null
  orderForm.value.userId = null
  orderForm.value.sex = null
}

const handleOrder = () => {
  if (!orderFormCheck()) {
    return
  }
  // 跳转到支付页面
  active.value = 2
}

const submitOrder = async () => {
  if (orderForm.value.sex === 0) {
    orderForm.value.smId += 1
  }
  orderForm.value.sex = orderForm.value.sex === '男' ? 1 : 0
  await axios.post('http://localhost:8080/orders/saveOrders', orderForm.value).then(res => {
    if (res.data.code === 0) {
      ElMessage.success('预约成功')
      resetOrderForm()
      active.value = 0
    } else {
      ElMessage.error(res.data.message)
    }
  }).catch(err => {
    console.log(err)
    ElMessage.error('预约失败')
  })
}
ref(0);
const setLogin = (login) => {
  isLogin.value = login
}

const prev = () => {
  if (active.value > 0) {
    active.value--
  }
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
