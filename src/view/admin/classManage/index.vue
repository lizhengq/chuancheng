<template>
    <div class="box top_border">
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

       <!-- 搜索 -->
        <Search>
            <div class="">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline">
                    <div class="rows">
                        <el-form-item label="">
                            <el-input class="inputs" v-model="searchForm.className" placeholder="请输入班级名称"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select class="inputs" v-model="searchForm.stage" placeholder="请选择阶段" size="small">
                                <el-option
                                    v-for="(item,index) in selects.stage"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
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
                                <el-button @click="refreshRow(scope.row)" size="mini" icon="el-icon-refresh-left" type="primary">刷新</el-button>
                                <el-button @click="editRow(scope.row)" size="mini" icon="el-icon-edit" type="primary">修改</el-button>
                                <el-button @click="classStudentRow(scope.row)" size="mini" icon="el-icon-edit" type="primary">班级学员</el-button>
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
                {name:'班级管理'}
            ],
            // 头部查询
            searchForm:{
                className:'',
                stage:''
            },
            selects:{
                stage:[
                    {id:1,title:'明兴营'},
                    {id:2,title:'旗帜营'},
                ]
            },
            // 表格数据
            tableData:[
                {className:'头像1',stage:'李少1',allCouncilor:1,councilor:'秀恩爱666',classNum:'我是787',addTime:'2019-04-01'},
                {className:'头像1',stage:'李少1',allCouncilor:1,councilor:'秀恩爱666',classNum:'我是787',addTime:'2019-04-01'},
                {className:'头像1',stage:'李少1',allCouncilor:1,councilor:'秀恩爱666',classNum:'我是787',addTime:'2019-04-01'},
                {className:'头像1',stage:'李少1',allCouncilor:1,councilor:'秀恩爱666',classNum:'我是787',addTime:'2019-04-01'},
                {className:'头像1',stage:'李少1',allCouncilor:1,councilor:'秀恩爱666',classNum:'我是787',addTime:'2019-04-01'},
                {className:'头像1',stage:'李少1',allCouncilor:1,councilor:'秀恩爱666',classNum:'我是787',addTime:'2019-04-01'}
            ],
            // 表结构
            tableFlat:[
                {prop:'className',label:'班级名称'},
                {prop:'stage',label:'阶段'},
                {prop:'allCouncilor',label:'总督导'},
                {prop:'councilor',label:'督导'},
                {prop:'classNum',label:'班级人数'},
                {prop:'addTime',label:'创建时间'},
                {prop:'cz',label:'操作',width:380}
            ],
            // 分页配置
            pageInfo:{
                pageIndex:Config.pageIndex,
                pageSizes:Config.pageSizes,
                pageSize:Config.pageSize,
                total:Config.total
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
        add(){
            let that=this
            that.$router.push('/editClassManage')
        },
        refreshRow(row){
            let that=this
            that.$model.confirm('确认提示','确认刷新班级任务吗？',(res)=>{
                console.log(res)
            })
        },
        editRow(row){

        },
        classStudentRow(row){
            let that=this
            that.$router.push('/classStudent')
        },
        deleRow(row){
            let that=this
            that.$model.confirm('确认提示','确认删除该班级吗？',(res)=>{
                console.log(res)
            })
            
        },
        tableTopAddHandle(){
            let that=this
            that.$router.push('/editClassManage')
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