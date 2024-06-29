<script setup>
import {reactive} from 'vue'
import {doctorRegister} from "@/api/doctor.js";
import {useRouter} from "vue-router";

const router = useRouter()

const registerForm = reactive({
  docCode: '',
  realName: '',
  password: '',
  sex: '',
  deptNo: '',
  hospitalId: '',
})

const checkForm = () => {
  if (registerForm.docCode === '') {
    ElMessage.error('账号不能为空')
    return false
  }
  if (registerForm.password === '') {
    ElMessage.error('密码不能为空')
    return false
  }
  if (registerForm.password.length < 6 || registerForm.password.length > 20 || /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(registerForm.password)) {
    ElMessage.error('密码长度必须在6-20位之间,且不能包含空格和特殊字符')
    return false
  }
  if (registerForm.realName === '') {
    ElMessage.error('真实姓名不能为空')
    return false
  }
  if (registerForm.sex === '') {
    ElMessage.error('性别不能为空')
    return false
  }
  if (registerForm.deptNo === '') {
    ElMessage.error('部门不能为空')
    return false
  }
  return true;
}

const handleRegister = async () => {
  if (!checkForm()) {
    return
  }
  if (await doctorRegister(registerForm)) {
    ElMessage.success('注册成功，请登录')
    await router.push('/login')
  } else {
    ElMessage.error('注册失败，账号已存在')
  }
};

</script>

<template>
  <div class="register-view">
    <el-card style="max-width: 600px; min-width: 460px;">
      <template #header>
        <div class="card-header">
          <span>熙心健康体检系统用户注册</span>
        </div>
      </template>
      <div style="margin: 20px"/>
      <el-form
          label-width="auto"
          :model="registerForm"
          style="max-width: 600px"
      >
        <el-form-item label="账号">
          <el-input v-model="registerForm.docCode" placeholder="请输入账号"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="registerForm.password" type="password" placeholder="请输入密码(6-20位)"/>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="registerForm.realName" placeholder="请输入真实姓名"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="registerForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="registerForm.deptNo" placeholder="请选择部门">
            <el-option label="检验科" value="1"></el-option>
            <el-option label="内科" value="2"></el-option>
            <el-option label="外科" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院">
          <el-select v-model="registerForm.hospitalId" placeholder="请选择医院">
            <el-option label="光明市第一人民医院" value="1"></el-option>
            <el-option label="光明市仁爱医院" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-row justify="center">
          <el-button type="primary" @click="handleRegister">注册</el-button>
          <el-button type="primary" @click="$router.push('/login')">返回登录</el-button>
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
  /* global 94%+ browsers support */
  background: linear-gradient(90deg, #FFF1EB 0%, #ACE0F9 100%), linear-gradient(90deg, #FFF1EB 0%, #ACE0F9 100%);

  /* safari 5.1+,chrome 10+ */
  background: -webkit-linear-gradient(90deg, #FFF1EB 0%, #ACE0F9 100%), -webkit-linear-gradient(90deg, #FFF1EB 0%, #ACE0F9 100%);

  /* ff 3.6+ */
  background: -moz-linear-gradient(90deg, #FFF1EB 0%, #ACE0F9 100%), -moz-linear-gradient(90deg, #FFF1EB 0%, #ACE0F9 100%);

  /* opera 11.10+ */
  background: -o-linear-gradient(90deg, #FFF1EB 0%, #ACE0F9 100%), -o-linear-gradient(90deg, #FFF1EB 0%, #ACE0F9 100%);

  /* ie 10+ */
  background: -ms-linear-gradient(90deg, #FFF1EB 0%, #ACE0F9 100%), -ms-linear-gradient(90deg, #FFF1EB 0%, #ACE0F9 100%);
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