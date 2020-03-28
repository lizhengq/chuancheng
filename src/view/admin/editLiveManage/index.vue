<template>
    <div class="box top_border">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

        <!-- 编辑 -->
        <Panel title="编辑">
            <div class="">
                <el-form :inline="true" ref="liveManageForm" :model="liveManageForm" :rules="liveManageFormRules" label-width="80px">
                    <div class="rows">
                        <el-form-item label="直播名称" prop="liveName">
                            <el-input class="input_m" v-model="liveManageForm.liveName" placeholder="请输入版本号" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="直播时间" prop="liveTime">
                            <el-date-picker class="input_m" size="small"
                            v-model="liveManageForm.liveTime"
                            align="right"
                            type="date"
                            placeholder="直播结束"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="主持人" prop="host">
                            <el-select class="input_m" v-model="liveManageForm.host" placeholder="请选择主持人" size="small">
                                <el-option
                                    v-for="(item,index) in selects.host"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择班组" prop="classGroup">
                            <el-select class="input_m" multiple v-model="liveManageForm.classGroup" placeholder="请选择班组" size="small">
                                <el-option
                                    v-for="(item,index) in selects.classGroup"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="直播公告">
                            <el-input class=" otxt"
                            type="textarea"
                            :autosize="{ minRows: 6, maxRows: 20}"
                            placeholder="请输入内容"
                            v-model="liveManageForm.liveCon">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item>
                            <el-button type="primary" @click="sub('liveManageForm')">提交</el-button>
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
                {name:'直播管理'},
                {name:'直播编辑'}
            ],
            //角色管理表单
            liveManageForm:{
                liveName:'',
                liveTime:'',
                host:'',
                classGroup:'',
                liveCon:''
            },
            selects:{
                host:[
                    {id:1,title:'111'},
                    {id:2,title:'222'}
                ],
                classGroup:[
                    {id:1,title:'333'},
                    {id:2,title:'44'},
                    {id:3,title:'55'},
                    {id:4,title:'363'},
                    {id:5,title:'474'}
                ]
            },
            liveManageFormRules:{
                liveName:[
                    {required:true,message:'请输入直播名称',trigger:'blur'},
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                liveTime:[
                    {required:true,message:'请选择直播时间',trigger:'change'},
                ],
                host:[
                    {required:true,message:'请选择主持人',trigger:'change'},
                ],
                classGroup:[
                    {required:true,message:'请选择班组',trigger:'blur'},
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
<style scoped>
.otxt{width:70vw;}
</style>