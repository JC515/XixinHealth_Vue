<template>
  <div>
    <el-table :data="currentPageData" style="width: 100%">
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
    <div id="pagination" class="pagination-container">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
      />
      total: {{ total }}
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'
import {useRouter} from "vue-router";
import {useOrderStore} from "@/stores/order.js";
import {getOrders} from "@/api/list.js";
import axios from "axios";
import eventBus from "@/utils/eventBus.js";

const order = useOrderStore()
const total = ref(0)
const pageSize = 10
const currentPage = ref(1)
const router = useRouter()
const currentPageData = ref([])

const handlePageChange = (page) => {
  currentPage.value = page
  setCurrentPageData()
}

const handleEdit = async (row) => {
  order.nowOrderId = row.orderId
  await axios.get('http://localhost:8080/orders/getUserOrderByOrderId', {
    params: {
      orderId: row.orderId
    }
  }).then(res => {
    if (res.data.code === 0) {
      order.nowOrder = res.data.data
      console.log(order.nowOrder)
      router.push({name: 'edit', params: {order_id: row.orderId}})
    } else {
      console.error(res.data.message)
    }
  }).catch(err => {
    console.error(err)
  })
}

const fetchData = async () => {
  order.tableData = await getOrders();
  dataChange()
  setCurrentPageData()
  try {
    const res = await axios.get('http://localhost:8080/orders/totalOrderCount');
    total.value = res.data.data
  } catch (err) {
    console.error(err)
  }
}

const setCurrentPageData = () => {
  currentPageData.value = order.tableData.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
}

const dataChange = () => {
  order.tableData.forEach(item => {
    item.sex = item.sex === '1' ? '男' : '女';
    item.type = (item.sex === '男' ? '男士-' : '女士-') + item.type;
  });
}

const onTableDataChange = () => {
  dataChange()
  setCurrentPageData()
  total.value = order.tableData.length
}

onMounted(() => {
  eventBus.on('changeTableData', onTableDataChange)
})

onBeforeUnmount(() => {
  eventBus.off('changeTableData', onTableDataChange)
})

fetchData()
</script>

<style scoped>
.pagination-container {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
}
</style>
