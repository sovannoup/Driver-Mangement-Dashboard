import axios from 'axios';
import useNotyf from "../../composable/useNotyf";
import router from "@/router";
import store from "../../store/index";



const notyf = useNotyf();
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = store.getters['auth/accessToken'];
    if (accessToken) {
      config.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    config.baseURL = `${process.env.VUE_APP_API_DOMAIN}/api/web/v1/delivery_partner`;
    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const data = error.response?.data
  let msg = data?.message;
  let title = ''
  const code = error.response.status;
  switch (code) {
    case 400:
    case 422:
      title = 'Bad Request';
      if (data.data) {
        msg = ''
        var msgArr = Object.keys(data.data).map(function (key) { returndata.data[key]; });
        msgArr.forEach(r => {
          msg = msg + '<br/>' + r
        });
      }
      break;
    case 401:
      title = 'Unauthorized';
      msg = 're-login is required';
      store.dispatch('auth/clearAuth')
      router.push('/login')
      break;
  
    case 404:
      title = 'Route is not found';
       msg = 're-login is required'; 
      break;

    
   
    case 500:
      title = 'Internal Server Error';
      msg =
        'There is an error on our server, please contact admin or try again later!';
      break;
  }
  notyf.error(msg);  
  return Promise.reject(error);
});

export default axiosInstance;