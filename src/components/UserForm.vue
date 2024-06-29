<template>
  <div>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="手机号码">
        <el-input v-model="form.phone"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.realName"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio value="1">男</el-radio>
          <el-radio value="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="套餐类型">
        <el-select v-model="form.type" placeholder="套餐类型">
          <el-option label="基础套餐" value="基础套餐"/>
          <el-option label="高级套餐" value="高级套餐"/>
        </el-select>
      </el-form-item>
      <el-form-item label="体检日期">
        <el-date-picker
            v-model="form.orderDate"
            type="date"
            placeholder="体检日期"
            style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="是否归档">
        <el-radio-group v-model="form.isArchived">
          <el-radio value="1">未归档</el-radio>
          <el-radio value="2">已归档</el-radio>
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

<script setup>
import {reactive} from 'vue'
import {useOrderStore} from "@/stores/order.js";
import axios from "axios";
import eventBus from "@/utils/eventBus.js";

const order = useOrderStore()

const form = reactive({
  phone: order.phone,
  realName: order.realName,
  sex: order.sex,
  type: order.type,
  orderDate: order.orderDate,
  isArchived: order.isArchived
})

const onSubmit = async () => {
  try {
    const res = await axios.post('http://localhost:8080/orders/orderListByCondition', form);
    if (res.data.code === 0) {
      order.tableData = res.data.data
      eventBus.emit('changeTableData')
      ElMessage.success('查询成功')
    }
  } catch (err) {
    console.error(err)
  }
}

const resetForm = () => {
  Object.assign(form, {
    phone: '',
    realName: '',
    sex: '',
    type: '',
    orderDate: '',
    isArchived: ''
  });
}
</script>
