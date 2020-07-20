import axios from 'axios'
import Vue from 'vue';
import { Message } from 'element-ui'
import router from "../../router"
Vue.component(Message.name, Message)

if(process.env.NODE_ENV == 'development'){
  axios.defaults.baseURL = 'http://172.16.10.117:8093/';
}else if(process.env.NODE_ENV == 'debug'){

}else if(process.env.NODE_ENV == 'production'){
  axios.defaults.baseURL = 'http://73dba8582b8f5cd958b9d9134491a531.baiyibuyu.com/';
  //axios.defaults.baseURL = 'http://172.16.10.117:8093/';
}

// request拦截器
axios.interceptors.request.use(function(config){
  config.timeout = 60000 //超时时长
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    if(sessionStorage.getItem("token")){
      config.headers['token'] = sessionStorage.getItem("token")
    }
    return config;
  },function(error){
    //异常
    return Promise.reject(error)
  }
)
// response 拦截器
axios.interceptors.response.use(
  response => {
      let { data } = response;//解析参数
      if(data.status  == 400){
        Vue.prototype.$message({
          message: data.message || '请求参数异常',
          type: 'error'
        });
      }else if (data.status === 401) {
        // Vue.prototype.$message({
        //   message: data.message || 'token过期',
        //   type: 'warning'
        // });
        sessionStorage.removeItem('token');
        setTimeout(() => {
          router.replace({
              path: '/login',
          }).catch(err => err);
        }, 3000);
      }else if (data.status === 402){
        // Vue.prototype.$message({
        //   message:data.message || '用户不存在，请重新登录',
        //   type: 'warning'
        // });
        sessionStorage.removeItem('token');
        setTimeout(() => {
          router.replace({
              path: '/login',
          }).catch(err => err);
        }, 3000);
      }else if (data.status === 403) {//玩家请求地址有误或权限不足
        Vue.prototype.$message({
          message:data.message || '无访问权限，请联系管理员',
          type: 'warning'
        });
      }
     return data
  },
  error => {
    return Promise.reject(error)
  }
)


export default{
  Post(url,data){
    return axios({
      url:url,
      method:'post',
      data:data,
      headers: {
        "Content-Type": "application/json"
      }
    })
  },
  Upload(url,data){
    return axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },
  exportExcel(url,data){
    return axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        'Content-Type': 'application/vnd.ms-excel'
      }
    });
  },
  webExportExcel(url,data){
    return axios({
      method: "post",
      url: url,
      data: data,
      responseType: 'blob', // 表明返回服务器返回的数据类型
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    });
  }
}
