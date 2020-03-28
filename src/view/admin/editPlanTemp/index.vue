<template>
    <div class="box top_border">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

        <!-- 编辑 -->
        <Panel title="编辑">
            <div class="">
                <el-form :inline="true" ref="planTempForm" :model="planTempForm" :rules="planTempFormRules" label-width="80px">
                    <div class="rows">
                        <el-form-item label="模板名称" prop="tempName">
                            <el-input class="input_m" v-model="planTempForm.tempName" placeholder="请输入模板名称" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="阶段" prop="stage">
                            <el-select class="input_m" v-model="planTempForm.stage" placeholder="请选择阶段" size="small">
                                <el-option
                                    v-for="(item,index) in selects.stage"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="周数" prop="week">
                            <el-input class="input_m" v-model="planTempForm.week" placeholder="请输入周数" size="small" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item>
                            <el-button type="primary" @click="sub('planTempForm')">提交</el-button>
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
                {name:'计划模板'},
                {name:'编辑计划模板'}
            ],
            //角色管理表单
            planTempForm:{
                tempName:'',
                stage:'',
                week:''
            },
            planTempFormRules:{
                tempName:[
                    {required:true,message:'请输入模板名称',trigger:'blur'},
                    {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                stage:[{required:true,message:'请选择阶段',trigger:'change'}],
                week:[
                    {required:true,message:'请输入周数',trigger:'blur'},
                    {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ]
            },
            selects:{
                stage:[
                    {id:1,title:'第一阶段'},
                    {id:2,title:'第二阶段'},
                    {id:3,title:'第三阶段'}
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