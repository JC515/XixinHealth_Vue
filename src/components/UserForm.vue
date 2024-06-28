<script setup>
import {reactive} from 'vue'
import {useOrderStore} from "@/stores/order.js";

const order = useOrderStore()

const form = reactive({
  mobile: order.mobile,
  name: order.name,
  sex: order.sex,
  packageType: order.packageType,
  checkupDate: order.checkupDate,
  isArchived: order.isArchived
})

const onSubmit = () => {

}

const resetForm = () => {
  Object.assign(form, {
    mobile: '',
    name: '',
    sex: '',
    packageType: '',
    checkupDate: '',
    isArchived: '',
  });
}
</script>

<template>
  <div>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="手机号码">
        <el-input v-model="form.mobile"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio value="男">男</el-radio>
          <el-radio value="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="套餐类型">
        <el-select v-model="form.packageType" placeholder="套餐类型">
          <el-option label="套餐一" value="1"/>
          <el-option label="套餐二" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="体检日期">
        <el-date-picker
            v-model="form.checkupDate"
            type="date"
            placeholder="体检日期"
            style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="是否归档">
        <el-radio-group v-model="form.isArchived">
          <el-radio value="未归档">未归档</el-radio>
          <el-radio value="已归档">已归档</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-row justify="space-between">
          <el-col :span="6">
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-col>
          <el-col :span="6">
            <el-button @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>