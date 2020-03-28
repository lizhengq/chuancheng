<template>
    <div class="box border-top">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

        <!-- 编辑 -->
        <Panel title="编辑">
            <div class="">
                <el-form :inline="true" ref="taskTypeForm" :model="taskTypeForm" :rules="taskTypeFormRules" label-width="80px">
                    <div class="rows">
                        <el-form-item label="类别名称" prop="taskName">
                            <el-input class="input_m" v-model="taskTypeForm.taskName" size="small" placeholder="请输入登录名" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item>
                            <el-button type="primary" @click="sub('taskTypeForm')">提交</el-button>
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
                {name:'任务管理'},
                {name:'编辑任务类型'}
            ],
            taskTypeForm:{
                taskName:'',
            },
            taskTypeFormRules:{
                taskName:[
                    {required:true,message:'请输入登录名',trigger:'blur'},
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ]
            },
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