import Config from '@/config'
import Qs from 'qs'

let baseUrl='';
    baseUrl=Config.proUrl;

// 请求地址
axios.defaults.baseURL = baseUrl;

// 请求超时
axios.defaults.timeout = Config.timeOut;

//设置请求头
//axios.defaults.header.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8'

// 响应拦截
axios.interceptors.response.use(response=>{
    if(response.status==200){
        if(response.data) return Promise.resolve(response.data);
        else return Promise.reject({})
    }else{
        return Promise.reject(response)
    }
},
error=>{
    return Promise.reject(error)
})


function get(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params
        }).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}


function post(url,params){
    return new Promise((resolve,reject)=>{
        axios.post(url,Qs.stringify(params)).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}


export default{
    get,
    post
}

