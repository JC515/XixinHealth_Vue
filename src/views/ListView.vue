<template>
  <div>
    <div>
      <el-table
          :data="currentPageData"
          style="width: 100%"
      >
        <el-table-column prop="orderId" label="预约编号"/>
        <el-table-column prop="phone" label="手机号"/>
        <el-table-column prop="realName" label="真实姓名"/>
        <el-table-column prop="sex" label="性别"/>
        <el-table-column prop="type" label="体检套餐类型"/>
        <el-table-column prop="hospitalName" label="体检医院"/>
        <el-table-column prop="orderDate" label="体检日期"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="pagination" class="pagination-container">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="tableData.length"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import {reactive, computed, ref} from 'vue'
import {useRouter} from "vue-router";
import {useOrderStore} from "@/stores/order.js";

const tableData = reactive([
  {
    orderId: 1,
    phone: '13800138000',
    realName: '张三',
    sex: '男',
    type: '套餐一',
    hospitalName: 'XX医院',
    orderDate: '2023-12-25',
  },
  {
    orderId: 2,
    phone: '13900139000',
    realName: '李四',
    sex: '女',
    type: '套餐二',
    hospitalName: 'YY医院',
    orderDate: '2023-12-26',
  },
])

const pageSize = 10
const currentPage = ref(1)
const router = useRouter()
const order = useOrderStore()

const handlePageChange = (page) => {
  currentPage.value = page
}

const currentPageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return tableData.slice(start, end)
})

const handleEdit = (row) => {
  order.nowOrderId = row.orderId
  router.push({name: 'edit', params: {order_id: row.orderId}})
}

</script>

<style scoped>
.pagination-container {
  position: fixed;
  bottom: 0;
}
</style>
