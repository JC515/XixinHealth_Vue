<template>
  <div>
    <el-form :model="form" label-width="120px" style="max-width: 600px; margin: auto;">
      <el-form-item label="手机号码">
        <el-input v-model="form.phone" disabled />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.realName" disabled />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex" disabled>
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="套餐类型">
        <el-select v-model="form.type" disabled>
          <el-option label="基础套餐" :value="1" />
          <el-option label="高级套餐" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="体检日期">
        <el-date-picker
            v-model="form.orderDate"
            type="date"
            placeholder="体检日期"
            style="width: 100%"
            disabled
        />
      </el-form-item>
      <el-form-item label="是否归档">
        <el-radio-group v-model="form.isArchived" disabled>
          <el-radio :label="1">未归档</el-radio>
          <el-radio :label="2">已归档</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useOrderStore } from "@/stores/order.js";

const order = useOrderStore();

const form = reactive({
  phone: order.nowOrder.phone,
  realName: order.nowOrder.realName,
  sex: order.nowOrder.sex,
  type: order.nowOrder.type,
  orderDate: order.nowOrder.orderDate,
  isArchived: order.nowOrder.isArchived
});
</script>

<style scoped>
.el-form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}
</style>
