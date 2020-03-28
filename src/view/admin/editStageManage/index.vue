<template>
    <div class="box top_border">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

        <!-- 编辑 -->
        <Panel title="编辑">
            <div class="">
                <el-form :inline="true" ref="stageManageForm" :model="stageManageForm" :rules="stageManageFormRules" label-width="80px">
                    <div class="rows">
                        <el-form-item label="阶段值" prop="stage">
                            <el-input class="input_m" v-model="stageManageForm.stage" placeholder="请输入阶段值" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="阶段名称" prop="stageName">
                            <el-input class="input_m" v-model="stageManageForm.stageName" placeholder="请输入阶段名称" size="small" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="阶段图片">
                            <el-button type="primary" size="small">上传图片</el-button>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="直播图片">
                            <el-button type="primary" size="small">上传图片</el-button>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item>
                            <el-button type="primary" @click="sub('stageManageForm')">提交</el-button>
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
                {name:'阶段管理'},
                {name:'阶段编辑'}
            ],
            //角色管理表单
            stageManageForm:{
                stage:'',
                stageName:''
            },
            stageManageFormRules:{
                stage:[
                    {required:true,message:'请输入阶段值',trigger:'blur'},
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                stageName:[
                    {required:true,message:'请输入阶段名称',trigger:'blur'},
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