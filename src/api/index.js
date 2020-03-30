import http from '@/http'


export const roleList = (param) => http.post('/api/role/lst',param)                     //角色列表
export const getRoleList = () => http.post('/api/role/getRoleList',{})                     //角色列表
export const roleDetail = (param) => http.post('/api/role/detail',param)                     //角色详情
export const roleEdit = (param) => http.post('/api/role/edit',param)            //角色编辑
export const roleAuthList = () => http.post('/api/auth/lst2',{})                //角色权限列表
export const manageList = (param) => http.post('/api/manage/lst',param)                //管理员列表
export const addManage = (param) => http.post('/api/manage/add',param)                //新增管理员
export const editManage = (param) => http.post('/api/manage/edit',param)                //管理员编辑
export const manageDetail = (param) => http.post('/api/manage/detail',param)                //管理员详情
export const manageDele = (param) => http.post('/api/manage/dele',param)                //管理员删除