<template>
    <div class="box top_border">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

        <!-- 编辑 -->
        <Panel title="编辑">
            <div class="">
                <el-form :inline="true" ref="classManageForm" :model="classManageForm" :rules="classManageFormRules" label-width="80px">
                    <div class="rows">
                        <el-form-item label="班级名称" prop="className">
                            <el-input class="input_m" v-model="classManageForm.className" placeholder="请输入班级名称" size="small" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="阶段" prop="stage">
                            <el-select class="input_m" v-model="classManageForm.stage" placeholder="请选择阶段" size="small">
                                <el-option
                                    v-for="(item,index) in selects.stage"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="总督导" prop="allCouncilor">
                            <el-select class="input_m" v-model="classManageForm.allCouncilor" placeholder="请选择总督导" size="small">
                                <el-option
                                    v-for="(item,index) in selects.allCouncilor"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="督导">
                            <el-select class="input_m" v-model="classManageForm.councilor" placeholder="请选择督导" size="small">
                                <el-option
                                    v-for="(item,index) in selects.councilor"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    
                    <Panel title="群组信息" v-for="(item,index) in classManageForm.groupInfo" :key="index">
                        <div class="rows">
                            <el-form-item label="群组名称" :rules="[{ required: true, message: '请输入群组名称', trigger:'blur' }]" :prop="'groupInfo[' + index + '].groupName'">
                                <el-input class="input_m" v-model="item.groupName" placeholder="请输入群组名称" size="small" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="计划模板" :rules="[{ required: true, message: '请选择计划模板', trigger:'change' }]" :prop="'groupInfo[' + index + '].planTemp'">
                                <el-select class="input_m" v-model="item.planTemp" placeholder="请选择计划模板" size="small">
                                    <el-option
                                        v-for="(item,index) in selects.planTemp"
                                        :key="index"
                                        :label="item.title"
                                        :value="item.id"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="rows">
                            <el-form-item label="开始时间" :rules="[{ required: true, message: '请输入开始时间', trigger:'blur' }]" :prop="'groupInfo[' + index + '].startTime'">
                                <el-date-picker class="input_m" size="small"
                                v-model="item.startTime"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="指导师" :rules="[{ required: true, message: '请选择指导师', trigger:'change' }]" :prop="'groupInfo[' + index + '].instructor'">
                                <el-select class="input_m" v-model="item.instructor" placeholder="请选择指导师" size="small">
                                    <el-option
                                        v-for="(item,index) in selects.instructor"
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
                                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="editAdd(index)" size="mini">新增</el-button>
                                <el-button type="danger" icon="el-icon-delete" @click="editDele(index)" size="mini">删除</el-button>
                            </el-form-item>
                        </div>
                    </Panel>
                    <div class="rows">
                        <el-form-item>
                            <el-button type="primary" @click="sub('classManageForm')">提交</el-button>
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
                {name:'班级管理'},
                {name:'班级编辑'}
            ],
            //角色管理表单
            classManageForm:{
                className:'',
                stage:'',
                allCouncilor:'',
                councilor:'',
                groupInfo:[
                    {groupName:'',planTemp:'',startTime:'',instructor:''}
                ],
            },
            classManageFormRules:{
                className:[
                    {required:true,message:'请输入班级名称',trigger:'blur'},
                    {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                stage:[{required:true,message:'请选择阶段',trigger:'change'}],
                allCouncilor:[{required:true,message:'请选择总督导',trigger:'change'}]
            },
            selects:{
                stage:[
                    {id:1,title:'第一阶段'},
                    {id:2,title:'第二阶段'},
                    {id:3,title:'第三阶段'}
                ],
                allCouncilor:[
                    {id:1,title:'超级管理员'},
                    {id:2,title:'编辑管理员'},
                    {id:3,title:'权限管理员'}
                ],
                councilor:[
                    {id:1,title:'超级管理员'},
                    {id:2,title:'编辑管理员'},
                    {id:3,title:'女'},
                ],
                planTemp:[
                    {id:1,title:'模板一'},
                    {id:2,title:'模板二'},
                    {id:4,title:'模板三'},
                ],
                instructor:[
                    {id:1,title:'指导师1'},
                    {id:2,title:'指导师2'},
                    {id:3,title:'指导师3'},
                ]
            },
            pickerOptions: {
                // disabledDate(time) {
                //     return time.getTime() > Date.now();
                // },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            }
        }
    },
    created() {
        // console.log(this.$model)
        
    },
    methods:{
        editAdd(idx){
            let that=this
            that.classManageForm.groupInfo.push({groupName:'',planTemp:'',startTime:'',instructor:''})
        },
        editDele(idx){
            let that=this
            let groupInfo=that.classManageForm.groupInfo
            if(groupInfo.length<=1){
                that.$model.err('数量必须大于等于1个')
                return;
            }
            groupInfo.splice(idx,1)
            that.$model.succ('移除成功')
        },
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
    
</style>