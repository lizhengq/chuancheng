<template>
    <div class="box top_border">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

        <!-- 编辑 -->
        <Panel title="编辑">
            <div class="">
                <el-form :inline="true" ref="versionManageForm" :model="versionManageForm" :rules="versionManageFormRules" label-width="80px">
                    <div class="rows">
                        <el-form-item label="版本号" prop="version">
                            <el-input class="input_m" v-model="versionManageForm.version" placeholder="请输入版本号" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="手机类型" prop="iphoneModel">
                            <el-select class="input_m" v-model="versionManageForm.iphoneModel" placeholder="请选择手机类型" size="small">
                                <el-option
                                    v-for="(item,index) in selects.iphoneModel"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="更新状态" prop="updateState">
                            <el-select class="input_m" v-model="versionManageForm.updateState" placeholder="请选择阶段" size="small">
                                <el-option
                                    v-for="(item,index) in selects.updateState"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="更新内容">
                            <el-input class=" otxt"
                            type="textarea"
                            :autosize="{ minRows: 6, maxRows: 20}"
                            placeholder="请输入内容"
                            v-model="versionManageForm.updateCon">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item>
                            <el-button type="primary" @click="sub('versionManageForm')">提交</el-button>
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
                {name:'版本管理'},
                {name:'版本编辑'}
            ],
            //角色管理表单
            versionManageForm:{
                version:'',
                iphoneModel:'',
                updateState:'',
                updateCon:''
            },
            selects:{
                iphoneModel:[
                    {id:1,title:'111'},
                    {id:2,title:'222'}
                ],
                updateState:[
                    {id:1,title:'333'},
                    {id:2,title:'444'}
                ]
            },
            versionManageFormRules:{
                version:[
                    {required:true,message:'请输入版本号',trigger:'blur'},
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                iphoneModel:[
                    {required:true,message:'请选择手机型号',trigger:'change'},
                ],
                updateState:[
                    {required:true,message:'请选择更新状态',trigger:'change'},
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
<style scoped>
.otxt{width:70vw;}
</style>