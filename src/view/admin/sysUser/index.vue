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
                            <el-input class="inputs" v-model="searchForm.username" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input class="inputs" v-model="searchForm.loginName" placeholder="请输入登录名"></el-input>
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
                {name:'系统管理'},
                {name:'系统用户'}
            ],
            // 头部查询
            searchForm:{
                username:'',
                loginName:''
            },
            // 表格数据
            tableData:[
                {face:'头像1',trueName:'李少1',sex:1,roleName:'秀恩爱666',loginName:'我是787',pass:'5736869qiang',addTime:'2019-04-01'},
                {face:'头像2',trueName:'李少2',sex:0,roleName:'秀恩爱666',loginName:'我是787',pass:'5736869qiang',addTime:'2019-04-01'},
                {face:'头像3',trueName:'李少3',sex:1,roleName:'秀恩爱666',loginName:'我是787',pass:'5736869qiang',addTime:'2019-04-01'},
                {face:'头像4',trueName:'李少4',sex:1,roleName:'秀恩爱666',loginName:'我是787',pass:'5736869qiang',addTime:'2019-04-01'},
                {face:'头像5',trueName:'李少5',sex:0,roleName:'秀恩爱666',loginName:'我是787',pass:'5736869qiang',addTime:'2019-04-01'},
                {face:'头像6',trueName:'李少6',sex:1,roleName:'秀恩爱666',loginName:'我是787',pass:'5736869qiang',addTime:'2019-04-01'},
                {face:'头像7',trueName:'李少7',sex:0,roleName:'秀恩爱666',loginName:'我是787',pass:'5736869qiang',addTime:'2019-04-01'},
            ],
            // 表结构
            tableFlat:[
                {prop:'face',label:'用户头像'},
                {prop:'trueName',label:'真实姓名'},
                {prop:'sex',label:'性别'},
                {prop:'roleName',label:'角色名称'},
                {prop:'loginName',label:'登录名'},
                {prop:'pass',label:'密码'},
                {prop:'addTime',label:'创建时间'},
                {prop:'cz',label:'操作',width:280}
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
            that.$router.push('/editSysUser')
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