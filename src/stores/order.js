import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useOrderStore = defineStore('user', () => {
    const mobile = ref('') // 手机号码
    const name = ref('') // 姓名
    const sex = ref('') // 性别
    const packageType = ref('') // 套餐类型
    const checkupDate = ref('') // 检查日期
    const isArchived = ref('') // 是否归档
    const nowOrderId = ref('') // 当前订单

    return {
        mobile,
        name,
        sex,
        packageType,
        checkupDate,
        isArchived,
        nowOrderId
    }
})
