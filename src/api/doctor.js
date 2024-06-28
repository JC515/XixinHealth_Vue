import Http from "@/utils/axiosUtil.js";

const http = new Http('http://localhost:8080/doctor');

export async function doctorLogin(code, password) {
    try {
        const response = await http.get('/login', {code, password});
        console.log(response.data);
        console.log(response.data.code);
        return response.data.code === 0;
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
