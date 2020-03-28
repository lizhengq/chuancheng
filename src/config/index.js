const config={}

config['ok']=200
//请求时间
config['timeOut']=1000*15
//开发环境和生产环境
config['prodBaseUrl']='http://www.baidu.com/public/index.php'
config['devBaseUrl']='http://www.qiangshao.com/public/index.php'
config['baseRoot']='http://www.qiangshao.com'

//分页信息
config['pageIndex']=1
config['pageSizes']=[10,20,30,40,50]
config['pageSize']=10
config['total']=10



export default config