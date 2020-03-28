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
                            <el-input class="inputs" v-model="searchForm.studentName" placeholder="请输入班级名称"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input class="inputs" v-model="searchForm.studentIphone" placeholder="请输入学员手机"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select class="inputs" v-model="searchForm.classGroup" placeholder="请选择班级群组">
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
                            </div>
                            <div class="" v-else>{{scope.row[cols.prop]}}</div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            
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
                {name:'班级管理'},
                {name:'班级学员信息'}
            ],
            // 头部查询
            searchForm:{
                studentName:'',
                studentIphone:'',
                classGroup:''
            },
            selects:{
                classGroup:[
                    {id:1,title:'明兴营'},
                    {id:2,title:'旗帜营'}
                ]
            },
            // 表格数据
            tableData:[
                {groupName:'头像1',username:'李少1',sex:1,iphone:'秀恩爱666',wechat:'我是787'},
                {groupName:'头像1',username:'李少1',sex:1,iphone:'秀恩爱666',wechat:'我是787'},
                {groupName:'头像1',username:'李少1',sex:1,iphone:'秀恩爱666',wechat:'我是787'},
                {groupName:'头像1',username:'李少1',sex:1,iphone:'秀恩爱666',wechat:'我是787'},
                {groupName:'头像1',username:'李少1',sex:1,iphone:'秀恩爱666',wechat:'我是787'},
            ],
            // 表结构
            tableFlat:[
                {prop:'groupName',label:'群组名称'},
                {prop:'username',label:'姓名'},
                {prop:'sex',label:'性别'},
                {prop:'iphone',label:'手机号码'},
                {prop:'wechat',label:'微信号码'}
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