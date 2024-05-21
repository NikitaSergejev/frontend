import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://backender-baedc14d3753.herokuapp.com',
});
//middleware проверяет есть token или нет 
//для любого запроса проверяем, есть ли в localStorage что-то
instance.interceptors.request.use((confiq) => {
    confiq.headers.Authorization = window.localStorage.getItem('token');
    return confiq;
});
export default instance;