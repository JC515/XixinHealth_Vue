<script setup>

import UserForm from "@/components/UserForm.vue";
import ListView from "@/views/ListView.vue";
import {useDoctorStore} from "@/stores/doctor.js";
import axios from "axios";
import {useRouter} from "vue-router";

const user = useDoctorStore()
const router = useRouter()

const getName = async () => {
  await axios.get('http://localhost:8080/doctor/getName', {
    params: {
      docCode: user.userId
    }
  }).then(res => {
    user.realName = res.data.data
  }).catch(err => {
        console.log(err)
      }
  )
}

const logout = () => {
  router.push('/login');
  user.isLogin = false;
  ElMessage.success('退出成功')
}

getName()
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el-header">
        <div class="header-content">
          <h1 class="title">熙心健康体检报告管理系统</h1>
          <p style="position: absolute; right: 20px; top: 20px; font-size: 16px; color: #333;">
            医生：{{ user.realName }}
          </p>
          <p style="position: absolute; right: 20px; top: 40px; font-size: 16px; color: #333;">
            <el-button type="text" @click="logout()">
              退出登录
            </el-button>
          </p>
        </div>
      </el-header>
      <el-container>
        <el-aside width="360px" id="side_container">
          <p style="font-size: 18px; margin-left: 20px;">体检客户查询</p>
          <UserForm id="sideUserForm"></UserForm>
        </el-aside>
        <el-main style="height: 100vh;padding: 40px; background-color: #F5FFFA;">
          <ListView></ListView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>
#side_container {
  background-color: #B0C4DE;
}

#sideUserForm {
  margin-top: 70px;
  margin-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30vh;
}

.el-header {
  height: 100px;
  background-color: #87CEFA;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-shadow: 2px 2px 4px #ddd; /* 添加阴影效果 */
}
</style>