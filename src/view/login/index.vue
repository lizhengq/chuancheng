<template>
    <div class="login">
        <div class="title">
            <p>兴智传承<span>欢迎登录</span></p>
        </div>
        <div class="main">
            <h3>兴智传承后台系统</h3>
            <div class="forms">
                <el-form ref="loginForm" :rules="loginFormRules" :model="loginForm" label-width="0px">
                    <el-form-item label="" prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input type="password" v-model="loginForm.password" placeholder="密码" clearable></el-input>
                    </el-form-item>
                    <el-form-item class="sub">
                        <el-button class=" sub-btn" type="primary" @click="sub('loginForm')">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import Model from 'com/li-model'
export default {
    data(){
        return{
            //登录表单
            loginForm:{
                username:'',
                password:''
            },
            loginFormRules:{
                username:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'},
                    { min: 6, max:15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
                ]
            }
        }
    },
    created() {
        
    },
    methods:{
        sub(formName){//登录
            let that=this;
            that.$refs[formName].validate((valid)=>{
                if(!valid){
                    return;
                }
                that._login()
            })
        },
        async _login(){
            let that=this;
            that.$model.succ('登录成功')
            setTimeout(() => {
                that.$router.push('/admin')
            }, 1000);
            
        }
    }
}
</script>
<style scoped>
.login{width:100%;height:100%;background:url('../../../static/img/login_bg.png') no-repeat;background-size:cover;}
.title{border-bottom:1px solid #c1c1c1;padding:30px 0 30px 0;}
.title p{font-size:35px;color:#fff;max-width:1000px;margin:0 auto;}
.title p span{display: inline-block;font-size:20px;padding:0 0 0 30px;}
.main{width:380px;background:#fff;border-radius: 6px;position: absolute;top:240px;right:200px;padding:20px 40px 20px 40px;}
.main h3{font-size:22px;color:#666;text-align: center;padding:30px 0;}
.main .codes{width:140px;}
.rows{position: relative}
.main .code-img{position: absolute;top:0;right:45px;border-radius: 2px;cursor: pointer;}
.main .sub-btn{width:100%;}
</style>