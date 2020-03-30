<template>
    <div class="box top_border">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

        <!-- 编辑 -->
        <Panel :title="panelObj.title">
            <div class="">
                <el-form :inline="true" ref="sysUserForm" :model="sysUserForm" :rules="sysUserFormRules" label-width="80px">
                    <div class="rows">
                        <el-form-item label="头像图片">
                            <el-upload 
                            ref="face-upload"
                            :action="faceObj.uploadUrl" 
                            limit="1" 
                            :file-list="fileList"
                            list-type="picture-card" 
                            :on-remove="onRemove" 
                            :on-success="onSuccess"
                            >
                                <el-button v-show="faceObj.uploadBtn" size="small" type="primary">头像上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="登录名" prop="loginName">
                            <el-input class="input_m" v-model="sysUserForm.loginName" size="small" placeholder="请输入登录名" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="登录密码" prop="password">
                            <el-input class="input_m" v-model="sysUserForm.password" size="small" placeholder="请输入登录密码" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="角色" prop="roleId">
                            <el-select class="input_m" v-model="sysUserForm.roleId" placeholder="请选择角色" size="small">
                                <el-option
                                    v-for="(item,index) in selects.roleId"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="姓名">
                            <el-input class="input_m" v-model="sysUserForm.username"  placeholder="请输入姓名" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex">
                            <el-select class="input_m" v-model="sysUserForm.sex" placeholder="请选择性别" size="small">
                                <el-option
                                    v-for="(item,index) in selects.sex"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item>
                            <el-button type="primary" @click="sub('sysUserForm')">提交</el-button>
                            <el-button @click="goBack">返回</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </Panel>
    </div>
</template>
<script>
import Config from '@/config'
import {getRoleList,addManage,manageDetail,editManage} from '@/api'
import BreadCrumb from 'comp/base/breadCrumb/index.vue'
import Panel from 'comp/base/panel/index.vue'
export default {
    data(){
        return{
            // 面包屑
            mbx:[
                {name:'系统管理'},
                {name:'系统用户'},
                {name:'编辑系统用户'}
            ],
            panelObj:{
                title:'新增'
            },
            sysUserForm:{
                face:'',
                username:'',
                sex:'',
                roleId:'',
                loginName:'',
                password:'',
            },
            sysUserFormRules:{
                loginName:[
                    {required:true,message:'请输入登录名',trigger:'blur'},
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    {required:true,message:'请输入登录密码',trigger:'blur'},
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                roleId:[
                    {required:true,message:'请选择角色',trigger:'blur'}
                ],
                sex:[
                    {required:true,message:'请选择性别',trigger:'blur'},
                ]
            },
            selects:{
                roleId:[
                    // {id:1,title:'超级管理员'},
                    // {id:2,title:'编辑管理员'},
                    // {id:3,title:'权限管理员'}
                ],
                sex:[
                    {id:1,title:'男'},
                    {id:2,title:'女'},
                ]
            },
            faceObj:{
                uploadUrl:Config['devUrl']+'/public/index.php/api/manage/uploadface',
                uploadBtn:true
            },
            fileList:[]
        }
    },
    created() {
        let that=this
        // 判断是新增还是修改
        if(that.$route.params.id){//修改
            that.panelObj.title='编辑'
            that.manageId=that.$route.params.id
            that._manageDetail({id:that.manageId})
        }else{//新增
            that.panelObj.title='新增'
        }
        that._roleList({})
    },
    methods:{
        async _manageDetail(param){
            let that=this
            let res=await manageDetail(param)
            if(res.code!=Config.ok){that.$model.err(res.msg);return}
            let forms=that.sysUserForm
            let ress=res.result
            forms['face']=ress.face
            forms['loginName']=ress.loginName
            forms['password']=ress.password
            forms['username']=ress.username
            forms['roleId']=ress.roleId
            forms['sex']=ress.sex
            if(ress.face){
                that.fileList.push({name:'face.png',url:Config.devUrl+'/public/'+ress.face})
                that.faceObj['uploadBtn']=false;
            }
        },
        async _roleList(){
            let that=this;
            let res=await getRoleList()
            if(res.code!=Config.ok){that.$model.err(res.msg);return}
            let tempRoleList=[]
            res.result.forEach((row,index)=>{
                tempRoleList[index]={id:row.id,title:row.name}
            })
            that.selects.roleId=tempRoleList
        },
        async _addManage(param){
            let that=this
            let res=await addManage(param)
            if(res.code!=Config.ok){that.$model.err(res.msg);return}
            that.$model.succ('新增成功')
            that.$router.push('/sysUser')
        },
        async _editManage(param){
            let that=this
            let res=await editManage(param)
            if(res.code!=Config.ok){that.$model.err(res.msg);return}
            that.$model.succ('编辑成功')
            that.$router.push('/sysUser')
        },
        onSuccess(res){
            let that=this
            if(res.code!=Config.ok) return;
            that.sysUserForm.face=res.result
            that.faceObj.uploadBtn=false
        },
        onRemove(){
            let that=this
            that.sysUserForm.face=''
            that.faceObj.uploadBtn=true
        },
        sub(formName){
            let that=this;
            that.$refs[formName].validate((valid)=>{
                if(!valid){return;}
                if(!that.manageId){//新增
                    that._addManage(that.sysUserForm)
                }else{//编辑
                    that.sysUserForm['id']=that.manageId
                    that._editManage(that.sysUserForm)
                }
                return
                
            })
        },
        goBack(){
            let that=this
            that.$router.go(-1)
        }
    },
    components:{
        BreadCrumb,
        Panel
    }
}
</script>
<style scoped>
/deep/ .el-upload--picture-card{border:none !important;width:98px;height:40px;line-height:1;}
/deep/ .el-upload-list__item{width:50px;height:50px;}
</style>