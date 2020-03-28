<template>
    <div class="box top_border">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

        <!-- 编辑 -->
        <Panel title="编辑">
            <div class="">
                <el-form :inline="true" ref="sysUserForm" :model="sysUserForm" :rules="sysUserFormRules" label-width="80px">
                    <div class="rows">
                        <el-form-item label="头像图片">
                            <el-button type="primary" size="small">主要按钮</el-button>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="登录名" prop="loginName">
                            <el-input class="input_m" v-model="sysUserForm.loginName" size="small" placeholder="请输入登录名" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="登录密码" prop="pass">
                            <el-input class="input_m" v-model="sysUserForm.pass" size="small" placeholder="请输入登录密码" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="角色" prop="role">
                            <el-select class="input_m" v-model="sysUserForm.role" placeholder="请选择角色" size="small">
                                <el-option
                                    v-for="(item,index) in selects.role"
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
                            <el-button>返回</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </Panel>
    </div>
</template>
<script>
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
            sysUserForm:{
                loginName:'',
                pass:'',
                role:'',
                username:'',
                sex:''
            },
            sysUserFormRules:{
                loginName:[
                    {required:true,message:'请输入登录名',trigger:'blur'},
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                pass:[
                    {required:true,message:'请输入登录密码',trigger:'blur'},
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                role:[
                    {required:true,message:'请选择角色',trigger:'blur'}
                ],
                sex:[
                    {required:true,message:'请选择性别',trigger:'blur'},
                ]
            },
            selects:{
                role:[
                    {id:1,title:'超级管理员'},
                    {id:2,title:'编辑管理员'},
                    {id:3,title:'权限管理员'}
                ],
                sex:[
                    {id:1,title:'男'},
                    {id:2,title:'女'},
                ]
            }
        }
    },
    methods:{
        sub(formName){
            let that=this;
            that.$refs[formName].validate((valid)=>{
                if(!valid){
                    return;
                }
                that.$model.succ('开始提交')
            })
        }
    },
    components:{
        BreadCrumb,
        Panel
    }
}
</script>