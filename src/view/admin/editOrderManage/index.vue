<template>
    <div class="box top_border">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

        <!-- 编辑 -->
        <Panel title="编辑">
            <div class="">
                <el-form :inline='true' ref="orderManageForm" :model="orderManageForm" :rules="orderManageFormRules" label-width="80px">
                    <div class="rows">
                        <el-form-item label="手机号码" prop="iphone">
                            <el-input class="input_m" v-model="orderManageForm.iphone" placeholder="请输入手机号码" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="学员名称" prop="studentName">
                            <el-input class="input_m" v-model="orderManageForm.studentName" placeholder="请输入学员名称" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="学号" prop="studentNum">
                            <el-input class="input_m" v-model="orderManageForm.studentNum" placeholder="请输入学号" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="登录密码">
                            <el-input class="input_m" v-model="orderManageForm.pass" placeholder="请输入班级名称" size="small" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="年龄" prop="age">
                            <el-input class="input_m" v-model="orderManageForm.age" placeholder="请输入班级名称" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="性别" prop="sex">
                            <el-select class="input_m" v-model="orderManageForm.sex" placeholder="请选择性别" size="small">
                                <el-option
                                    v-for="(item,index) in selects.sex"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="规划来源" prop="planFrom">
                            <el-select class="input_m" v-model="orderManageForm.planFrom" placeholder="请选择规划来源" size="small">
                                <el-option
                                    v-for="(item,index) in selects.planFrom"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="规划师">
                            <el-input class="input_m" v-model="orderManageForm.planTeacher" placeholder="请输入规划师" size="small" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="购课类型" prop="payCourseType">
                            <el-select class="input_m" v-model="orderManageForm.payCourseType" placeholder="请选择购课类型" size="small">
                                <el-option
                                    v-for="(item,index) in selects.payCourseType"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="省份">
                            <el-select class="input_m" v-model="orderManageForm.province" placeholder="请选择省份" size="small">
                                <el-option
                                    v-for="(item,index) in selects.province"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="城市">
                            <el-select class="input_m" v-model="orderManageForm.city" placeholder="请选择城市" size="small">
                                <el-option
                                    v-for="(item,index) in selects.city"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="微信号码">
                            <el-input class="input_m" v-model="orderManageForm.age" placeholder="请输入班级名称" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="qq号码">
                            <el-input class="input_m" v-model="orderManageForm.qq" placeholder="请输入qq" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱地址">
                            <el-input class="input_m" v-model="orderManageForm.email" placeholder="请输入邮箱地址" size="small" clearable></el-input>
                        </el-form-item>
                    </div>
                    <Panel title="班组信息" v-for="(item,index) in orderManageForm.classGroupInfo" :key="index">
                        <div class="rows">
                            <el-form-item label="所在阶段" :rules="[{ required: true, message: '请选择所在阶段', trigger:'change' }]" :prop="'classGroupInfo[' + index + '].stage'">
                                <el-select class="input_m" v-model="item.stage" placeholder="请选择所在阶段" size="small">
                                    <el-option
                                        v-for="(item,index) in selects.stage"
                                        :key="index"
                                        :label="item.title"
                                        :value="item.id"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="购买价格" :rules="[{ required: true, message: '请输入购买价格', trigger:'blur' }]" :prop="'classGroupInfo[' + index + '].payPrice'">
                                <el-input class="input_m" v-model="item.payPrice" placeholder="请输入购买价格" size="small" clearable></el-input>
                            </el-form-item>
                        </div>
                        <div class="rows">
                            <el-form-item label="所在班级" :rules="[{ required: true, message: '请选择所在班级', trigger:'change' }]" :prop="'classGroupInfo[' + index + '].class'">
                                <el-select class="input_m" v-model="item.class" placeholder="请选择所在班级" size="small">
                                    <el-option
                                        v-for="(item,index) in selects.class"
                                        :key="index"
                                        :label="item.title"
                                        :value="item.id"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所在群组" :rules="[{ required: true, message: '请选择所在群组', trigger:'change' }]" :prop="'classGroupInfo[' + index + '].group'">
                                <el-select class="input_m" v-model="item.group" placeholder="请选择所在群组" size="small">
                                    <el-option
                                        v-for="(item,index) in selects.group"
                                        :key="index"
                                        :label="item.title"
                                        :value="item.id"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="开营时间" :rules="[{ required: true, message: '请选择开营时间', trigger:'change' }]" :prop="'classGroupInfo[' + index + '].openCamp'">
                                <el-date-picker class="input_m" size="small"
                                v-model="item.openCamp"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
                                </el-date-picker>
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
                            <el-button type="primary" @click="sub('orderManageForm')">提交</el-button>
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
                {name:'订单管理'},
                {name:'编辑订单'}
            ],
            //角色管理表单
            orderManageForm:{
                iphone:'',
                studentName:'',
                studentNum:'',
                pass:'',
                age:'',
                sex:'',
                planFrom:'',
                planTeacher:'',
                payCourseType:'',
                province:'',
                city:'',
                wechat:'',
                qq:'',
                email:'',
                classGroupInfo:[
                    {stage:'',payPrice:'',class:'',group:'',openCamp:''}
                ]
            },
            orderManageFormRules:{
                iphone:[
                    {required:true,message:'请输入手机号',trigger:'blur'},
                    {min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
                ],
                studentName:[
                    {required:true,message:'请输入学员名称',trigger:'blur'},
                    {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                studentNum:[
                    {required:true,message:'请输入学号',trigger:'blur'},
                    {min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
                ],
                age:[
                    {required:true,message:'请输入年龄',trigger:'blur'},
                    {min: 1, max: 2, message: '长度在 1 到 2 个字符', trigger: 'blur' }
                ],
                sex:[
                    {required:true,message:'请选择性别',trigger:'change'}
                ],
                planFrom:[
                    {required:true,message:'请选择规划来源',trigger:'change'}
                ],
                payCourseType:[
                    {required:true,message:'请选择购课来源',trigger:'change'}
                ]
            },
            selects:{
                sex:[
                    {id:1,title:'男'},
                    {id:2,title:'女'}
                ],
                planFrom:[
                    {id:1,title:'超级管理员'},
                    {id:2,title:'编辑管理员'},
                    {id:3,title:'权限管理员'}
                ],
                payCourseType:[
                    {id:1,title:'11'},
                    {id:2,title:'22'}
                ],
                province:[
                    {id:1,title:'江西'},
                    {id:2,title:'浙江'},
                    {id:4,title:'安徽'},
                ],
                city:[
                    {id:1,title:'南昌'},
                    {id:2,title:'上饶'},
                    {id:3,title:'九江'}
                ],
                stage:[
                    {id:1,title:'第一阶段'},
                    {id:2,title:'第一阶段'},
                    {id:3,title:'第一阶段'}
                ],
                class:[
                    {id:1,title:'我是一班'},
                    {id:2,title:'我是一班'},
                    {id:3,title:'我是一班'}
                ],
                group:[
                    {id:1,title:'我是一群'},
                    {id:2,title:'我是一群'},
                    {id:3,title:'我是一群'}
                ],
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
    methods:{
        editAdd(idx){
            let that=this
            that.orderManageForm.classGroupInfo.push({stage:'',payPrice:'',class:'',group:'',openCamp:''})
        },
        editDele(idx){
            let that=this
            let classGroupInfo=that.orderManageForm.classGroupInfo
            if(classGroupInfo.length<=1){
                that.$model.err('数量必须大于等于1个')
                return;
            }
            classGroupInfo.splice(idx,1)
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