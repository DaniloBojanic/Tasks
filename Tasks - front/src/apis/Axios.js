import axios from 'axios';

var Axios = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const getCompanies = async () => {
  try {
    let response = await Axios.get('/companies');
    return response.data;

   }
    catch (err) {
      console.log(err);
      return [];
  }
}

Axios.interceptors.request.use(
    function success(config){
      const token = window.localStorage['jwt'];
      if (token){
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    }
  );

export default Axios;