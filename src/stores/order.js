import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useOrderStore = defineStore('order', () => {
    const phone = ref('') // 手机号码
    const realName = ref('') // 姓名
    const sex = ref('') // 性别
    const type = ref('') // 套餐类型
    const orderDate = ref('') // 检查日期
    const isArchived = ref('') // 是否归档
    const nowOrder = ref('') // 当前用户订单
    const tableData = ref([]) // 订单列表数据

    return {
        phone,
        realName,
        sex,
        type,
        orderDate,
        isArchived,
        nowOrder,
        tableData,
    }
})
