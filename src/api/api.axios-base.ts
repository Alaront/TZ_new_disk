import axios from "axios";

const axiosBase = axios.create({
    baseURL: "https://dist.nd.ru/api",
    headers: {
        "Content-Type": "application/json;charset=utf8",
    },
});

axiosBase.interceptors.request.use(async function (request) {

    // токен лучше хранить сторе, но я не понял можно ли использовать стейтменеджеры
    let token = window.localStorage.getItem('token-disk');

    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
});

export default axiosBase;
