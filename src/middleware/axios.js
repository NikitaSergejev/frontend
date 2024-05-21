import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
});
//middleware проверяет есть token или нет 
//для любого запроса проверяем, есть ли в localStorage что-то
instance.interceptors.request.use((confiq) => {
    confiq.headers.Authorization = window.localStorage.getItem('token');
    return confiq;
});
export default instance;