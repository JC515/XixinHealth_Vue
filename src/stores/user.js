import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const token = ref('')
    const userId = ref('')
    const realName = ref('')
    const isLogin = ref(false)
    const isRemember = ref(true)
    const password = ref('')

    return {
        token,
        userId,
        realName,
        isLogin,
        isRemember,
        password
    }
}, {
    persist: true,
})
