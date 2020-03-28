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
                            <el-input class="inputs" v-model="searchForm.roleName" placeholder="请输入角色名称"></el-input>
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
        title="数据列表">
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
export default {
    data(){
        return{
            // 面包屑
            mbx:[
                {name:'系统管理'},
                {name:'角色管理'},
            ],
            // 头部查询
            searchForm:{
                roleName:''
            },
            // 表格数据
            tableData:[
                {roleName:'管理员',addTime:'2019-04-01 07:58:26'},
                {roleName:'建构管理员',addTime:'2020-03-05 09:54:45'},
                {roleName:'总督导',addTime:'2019-04-01 07:58:46'},
                {roleName:'指导师',addTime:'2019-04-01 07:59:07'}
            ],
            // 表结构
            tableFlat:[
                {prop:'roleName',label:'角色名称'},
                {prop:'addTime',label:'创建时间'},
                {prop:'cz',label:'操作'}
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
        // 表格每行数据的编辑
        editRow(row){
            let that=this
            console.log(row)
            that.$router.push('/editRoleManage')

        },
        // 分页切换
        handleCurrent(objs){
            console.log('current',objs)
        },
        // 分页选择一页多少条数据
        handleSize(objs){
            console.log('size',objs)
        }
    },
    components:{
        BreadCrumb,
        Search,
        Panel,
        Page
    }
}
</script>