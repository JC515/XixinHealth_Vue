<script setup>

import UserForm from "@/components/UserForm.vue";
import ListView from "@/views/ListView.vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el-header">
        <div class="header-content">
          <h1 class="title">熙心健康体检报告管理系统</h1>
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