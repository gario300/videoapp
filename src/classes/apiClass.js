import axios from "axios";
const api = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/' 
});

api.interceptors.request.use(
  (config) => {
    //config.headers.Authorization = `Bearer ${youtubeApiKey}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class ApiClass {
  get(url){
    return new Promise(async (resolve, reject) => {
      /*
       * Aquí se hace la consulta a la api, de igual forma catch gestiona errores
       * que SON DEL SERVIDOR
       */
      try {
        const result = await api.get(url);
        resolve(result.data);
      } catch (e) {
        console.log(e)
        reject(e) 
      }
    })
  }
}

const apiClass = new ApiClass();
export default apiClass;
