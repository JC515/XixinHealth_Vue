<template>
  <div class="container">
    <el-table :data="currentPageData" style="width: 100%">
      <el-table-column prop="orderId" label="预约编号" sortable/>
      <el-table-column prop="phone" label="手机号" sortable/>
      <el-table-column prop="realName" label="真实姓名" sortable/>
      <el-table-column prop="sex" label="性别" sortable/>
      <el-table-column prop="type" label="体检套餐类型" sortable/>
      <el-table-column prop="hospitalName" label="体检医院" sortable/>
      <el-table-column prop="orderDate" label="体检日期" sortable/>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :current-page="currentPage"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, watch} from 'vue'
import {useRouter} from 'vue-router'
import {useOrderStore} from '@/stores/order.js'
import axios from 'axios'
import eventBus from '@/utils/eventBus.js'

const order = useOrderStore()
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)
const router = useRouter()
const currentPageData = ref([])

const handlePageChange = async (page) => {
  currentPage.value = page
  setCurrPageData()
}

const handleSizeChange = async (size) => {
  pageSize.value = size
  currentPage.value = 1
  setCurrPageData()
}

const handleEdit = async (row) => {
  order.nowOrderId = row.orderId
  try {
    const res = await axios.get('http://localhost:8080/orders/getUserOrderByOrderId', {
      params: {orderId: row.orderId}
    })
    if (res.data.code === 0) {
      order.nowOrder = res.data.data
      await router.push({name: 'edit', params: {order_id: row.orderId}})
    } else {
      console.error(res.data.message)
    }
  } catch (err) {
    console.error(err)
  }
}

const fetchData = async () => {
  await getDataByCondition()
}

const onTableDataChange = async () => {
  await fetchData()
  setCurrPageData()
}

const getDataByCondition = async () => {
  try {
    const res = await axios.post('http://localhost:8080/orders/orderListByCondition', {
      phone: order.phone,
      realName: order.realName,
      sex: order.sex,
      type: order.type,
      orderDate: order.orderDate,
      isArchived: order.isArchived
    })
    if (res.data.code === 0) {
      order.tableData = res.data.data
      ElMessage.success('查询成功')
      setCurrPageData() // 确保在数据获取后立即更新分页数据
    }
  } catch (err) {
    console.error(err)
  }
}

const setCurrPageData = () => {
  total.value = order.tableData.length
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  currentPageData.value = order.tableData.slice(start, end).map(item => ({
    ...item,
    sex: item.sex === '1' ? '男' : '女',
    type: `${item.sex === '1' ? '男士-' : '女士-'}${item.type}`
  }))
}

onMounted(() => {
  eventBus.on('changeTableData', onTableDataChange)
  fetchData()
})

onBeforeUnmount(() => {
  eventBus.off('changeTableData', onTableDataChange)
})

watch([currentPage, pageSize], setCurrPageData)
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
