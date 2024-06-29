import Http from "@/utils/axiosUtil.js";
import {useUserStore} from "@/stores/user.js";

const http = new Http('http://localhost:8080/doctor');
const user = useUserStore();

export async function doctorLogin(code, password) {
    try {
        const response = await http.get('/login', {code, password});
        if (response.data.code === 0) {
            user.token = response.data.data;
            return true;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function doctorRegister(registerForm) {
    try {
        const response = await http.post('/register', registerForm);
        return response.data.code === 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}
