<template>
  <div class="list-container">
    <h2>我的预约</h2>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="orderDate" label="预约日期"/>
      <el-table-column fixed="right" label="操作">
        <template #default="{ row }">
          <el-button link type="primary" size="small" @click="handleClick(row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="预约详情">
      <el-form :model="orderDetails">
        <el-form-item label="预约日期">
          <span>{{ orderDetails.orderDate }}</span>
        </el-form-item>
        <el-form-item label="姓名">
          <span>{{ orderDetails.realName }}</span>
        </el-form-item>
        <el-form-item label="性别">
          <span>{{ orderDetails.sex }}</span>
        </el-form-item>
        <el-form-item label="检查类型">
          <span>{{ orderDetails.type }}</span>
        </el-form-item>
        <el-form-item label="医院名称">
          <span>{{ orderDetails.hospitalName }}</span>
        </el-form-item>
        <el-form-item label="手机号">
          <span>{{ orderDetails.phone }}</span>
        </el-form-item>
        <el-form-item label="是否归档">
          <span>{{ orderDetails.isArchived }}</span>
        </el-form-item>
        <el-form-item label="检查结果">
          <el-table :data="overAllResultList" style="width: 100%">
            <el-table-column prop="title" label="标题"/>
            <el-table-column prop="content" label="内容"/>
          </el-table>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import {useUserStore} from "@/stores/user.js";
import {ref} from "vue";

const dialogVisible = ref(false);
const orderDetails = ref({});
const overAllResultList = ref([]);

const handleClick = async (row) => {
  console.log('Button clicked, row:', row);
  orderDetails.value = row;
  orderDetails.value.sex = orderDetails.value.sex === '1' ? '男' : '女';
  orderDetails.value.isArchived = orderDetails.value.isArchived === '1' ? '未归档' : '已归档';
  dialogVisible.value = true;

  try {
    const res = await axios.get('http://localhost:8080/overAllResult/getOverAllResultList', {
      params: {
        orderId: orderDetails.value.orderId
      }
    });
    if (res.data.code === 0) {
      overAllResultList.value = res.data.data;
    }
  } catch (err) {
    console.log(err);
  }
}

const tableData = ref([]);
const user = useUserStore();

const fetchData = async () => {
  try {
    const res = await axios.get('http://localhost:8080/orders/getUserOrderListByUserId', {
      params: {
        userId: user.userId
      }
    });
    if (res.data.code === 0) {
      tableData.value = res.data.data;
      console.log('Fetched data:', tableData.value);
    }
  } catch (err) {
    console.log(err);
  }
}

fetchData();
</script>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-width: 400px;
  margin: 0 auto;
  min-height: 100vh;
}
</style>
