import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useUserStore = defineStore('user', () => {
    const userId = ref('')
    const password = ref('')
    const rememberMe = ref(false)
    const yesLogin = ref(false)

    return {
        userId,
        password,
        rememberMe,
        yesLogin
    }
}, {
    persist: true,
})
