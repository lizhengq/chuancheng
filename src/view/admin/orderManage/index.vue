<template>
    <div class="box top_border">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

        <!-- 搜索 -->
        <Search>
            <div class="">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                    <div class="rows">
                        <el-form-item label="">
                            <el-date-picker class="input_m" size="small"
                            v-model="searchForm.orderStart"
                            align="right"
                            type="date"
                            placeholder="订单开始时间"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="">
                            <el-date-picker class="input_m" size="small"
                            v-model="searchForm.orderEnd"
                            align="right"
                            type="date"
                            placeholder="订单结束时间"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select class="input_m" v-model="searchForm.planFrom" placeholder="请选择规划来源" size="small">
                                <el-option
                                    v-for="(item,index) in selects.planFrom"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                       
                    </div>
                    <div class="row">
                        <el-form-item label="">
                            <el-select class="input_m" v-model="searchForm.payCourseType" placeholder="请选择购课类型" size="small">
                                <el-option
                                    v-for="(item,index) in selects.payCourseType"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input class="input_m" v-model="searchForm.studentName" placeholder="请输入学员姓名" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input class="input_m" v-model="searchForm.iphone" placeholder="请输入手机号码" size="small" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="">
                            <el-button @click="topSearch" size="mini" type="primary" icon="el-icon-search">搜索</el-button>
                            <el-button @click="topRest" size="mini" type="danger" icon="el-icon-delete">重置</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </Search>

        <!-- 表格 -->
        <Panel 
        title="数据列表"
        >
            <TableTopBtn @tableTopAddHandle="tableTopAddHandle" @tableTopRightHandle="tableTopRightHandle"></TableTopBtn>
            <div class="otable">
                <el-table 
                    :data="tableData" 
                    border 
                    stripe 
                    style="width:100%;"
                >
                    <el-table-column 
                        align="center" 
                        v-for="(cols,index) in tableFlat" 
                        :key="index" 
                        :prop="cols.prop" 
                        :label="cols.label" 
                        :width="cols.width"
                    >
                        <template slot-scope="scope">
                            <div class="" v-if="cols.prop=='cz'">
                                <el-button @click="editRow(scope.row)" size="mini" icon="el-icon-edit" type="primary">编辑</el-button>
                                <el-button @click="deleRow(scope.row)" size="mini" icon="el-icon-delete" type="danger">删除</el-button>
                            </div>
                            <div class="" v-else>{{scope.row[cols.prop]}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            
            <!-- 分页 -->
            <Page 
            v-if="tableData.length" 
            :pageInfo="pageInfo" 
            @handleCurrent="handleCurrent" 
            @handleSize="handleSize">
            </Page>
        </Panel>
    </div>
</template>
<script>
import Config from '@/config'
import BreadCrumb from 'comp/base/breadCrumb/index.vue'
import Search from 'comp/base/search/index.vue'
import Panel from 'comp/base/panel/index.vue'
import Page from 'comp/base/page/index.vue'
import TableTopBtn from 'comp/base/tableTopBtn/index.vue'
export default {
    data(){
        return{
            // 面包屑
            mbx:[
                {name:'订单管理'}
            ],
            // 头部查询
            searchForm:{
                orderStart:'',
                orderEnd:'',
                planFrom:'',
                payCourseType:'',
                studentName:'',
                iphone:''
            },
            // 表格数据
            tableData:[
                {studentNum:'头像1',studentName:'李少1',sex:1,age:'秀恩爱666',iphone:'我是787',wechat:'5736869qiang',planFrom:'2019-04-01',planTeacher:'111',payCourseType:'222',addTime:'2020-03-26'},
                {studentNum:'头像1',studentName:'李少1',sex:1,age:'秀恩爱666',iphone:'我是787',wechat:'5736869qiang',planFrom:'2019-04-01',planTeacher:'111',payCourseType:'222',addTime:'2020-03-26'},
                {studentNum:'头像1',studentName:'李少1',sex:1,age:'秀恩爱666',iphone:'我是787',wechat:'5736869qiang',planFrom:'2019-04-01',planTeacher:'111',payCourseType:'222',addTime:'2020-03-26'},
                {studentNum:'头像1',studentName:'李少1',sex:1,age:'秀恩爱666',iphone:'我是787',wechat:'5736869qiang',planFrom:'2019-04-01',planTeacher:'111',payCourseType:'222',addTime:'2020-03-26'},
                {studentNum:'头像1',studentName:'李少1',sex:1,age:'秀恩爱666',iphone:'我是787',wechat:'5736869qiang',planFrom:'2019-04-01',planTeacher:'111',payCourseType:'222',addTime:'2020-03-26'},
                {studentNum:'头像1',studentName:'李少1',sex:1,age:'秀恩爱666',iphone:'我是787',wechat:'5736869qiang',planFrom:'2019-04-01',planTeacher:'111',payCourseType:'222',addTime:'2020-03-26'},
                {studentNum:'头像1',studentName:'李少1',sex:1,age:'秀恩爱666',iphone:'我是787',wechat:'5736869qiang',planFrom:'2019-04-01',planTeacher:'111',payCourseType:'222',addTime:'2020-03-26'},
                {studentNum:'头像1',studentName:'李少1',sex:1,age:'秀恩爱666',iphone:'我是787',wechat:'5736869qiang',planFrom:'2019-04-01',planTeacher:'111',payCourseType:'222',addTime:'2020-03-26'},
                {studentNum:'头像1',studentName:'李少1',sex:1,age:'秀恩爱666',iphone:'我是787',wechat:'5736869qiang',planFrom:'2019-04-01',planTeacher:'111',payCourseType:'222',addTime:'2020-03-26'},
                {studentNum:'头像1',studentName:'李少1',sex:1,age:'秀恩爱666',iphone:'我是787',wechat:'5736869qiang',planFrom:'2019-04-01',planTeacher:'111',payCourseType:'222',addTime:'2020-03-26'}
            ],
            // 表结构
            tableFlat:[
                {prop:'studentNum',label:'用户头像'},
                {prop:'studentName',label:'真实姓名'},
                {prop:'sex',label:'性别'},
                {prop:'age',label:'角色名称'},
                {prop:'iphone',label:'登录名'},
                {prop:'wechat',label:'密码'},
                {prop:'planFrom',label:'创建时间'},
                {prop:'planTeacher',label:'创建时间'},
                {prop:'payCourseType',label:'创建时间'},
                {prop:'addTime',label:'创建时间'},
                {prop:'cz',label:'操作',width:200}
            ],
            selects:{
                planFrom:[
                    {id:1,name:'江西'},
                    {id:2,name:'浙江'},
                    {id:3,name:'上海'}
                ],
                payCourseType:[
                    {id:1,name:'我是一个'},
                    {id:2,name:'我是二个'},
                    {id:3,name:'我是三个'}
                ]
            },
            // 分页配置
            pageInfo:{
                pageIndex:Config.pageIndex,
                pageSizes:Config.pageSizes,
                pageSize:Config.pageSize,
                total:Config.total
            },
            pickerOptions: {//时间选择器配置
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
         // 头部查询
        topSearch(){

        },
        // 头部重置
        topRest(){

        },
        editRow(row){

        },
        deleRow(row){
            let that=this
            that.$model.confirm('确认提示','确定删除该管理员？',(res)=>{
                console.log(res)
            })
        },
        tableTopAddHandle(){
            let that=this
            that.$router.push('/editOrderManage')
        },
        tableTopRightHandle(val){
            let that=this
            console.log(val)
        },
        handleCurrent(param){

        },
        handleSize(param){
            
        }
    },
    components:{
        BreadCrumb,
        Search,
        Panel,
        Page,
        TableTopBtn
    }
}
</script>