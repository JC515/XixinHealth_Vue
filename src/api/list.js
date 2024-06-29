import Http from "@/utils/axiosUtil.js";

const http = new Http('http://localhost:8080/orders');

export async function getOrders(pageNum, pageSize) {
    try {
        const response = await http.get('/orderList', {pageNum, pageSize});
        if (response.data.code === 0) {
            return response.data.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}