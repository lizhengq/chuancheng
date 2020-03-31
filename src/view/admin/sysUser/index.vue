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
            <TableTopBtn @filterHandle="filterHandle" @tableTopAddHandle="tableTopAddHandle" @printHandle="printHandle" @exportTable="exportTable"></TableTopBtn>
            <div class="otable">
                <el-table 
                    :data="tableData" 
                    border 
                    stripe 
                    style="width:100%;" 
                    id="out-table" 
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
                            <div class="" v-else-if="cols.prop=='face'">
                                <img v-if="scope.row[cols.prop]" class="avatar" :src="scope.row[cols.prop]" alt="">
                                <img v-else class="avatar" src="static/img/normal-face.png" alt="">
                            </div>
                            <div class="" v-else-if="cols.prop=='sex'">
                                <span class="success" v-if="scope.row[cols.prop]==1">男</span>
                                <span class="danger" v-else>女</span>
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

        <!-- 筛选弹框 -->
        <Dialog 
        :title="filterDialog.title" 
        :show.sync="filterDialog.show" 
        :width="filterDialog.width">
            <div class="q_filter" slot="d_body">
                <el-row :gutter="4">
                    <el-col v-if="tableFilterFlat.length" :span="8" v-for="(item,index) in tableFilterFlat" :key="index">
                        <div class="taskList" @click="clickFilterField(index)" :class="item['flag'] == true ? 'taskListActive' : ''">{{item.label}}</div>
                    </el-col>
                </el-row>
            </div>
        </Dialog>
    </div>
</template>
<script>
import Config from '@/config'
import {manageList} from '@/api'
import BreadCrumb from 'comp/base/breadCrumb/index.vue'
import Search from 'comp/base/search/index.vue'
import Panel from 'comp/base/panel/index.vue'
import Page from 'comp/base/page/index.vue'
import TableTopBtn from 'comp/base/tableTopBtn/index.vue'
import Dialog from 'comp/base/dialog/index.vue'
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
            tableData:[],
            // 表结构
            tableFlat:[
                {prop:'face',label:'用户头像'},
                {prop:'username',label:'真实姓名'},
                {prop:'sex',label:'性别'},
                {prop:'name',label:'角色名称'},
                {prop:'loginName',label:'登录名'},
                {prop:'password',label:'密码'},
                {prop:'addTime',label:'创建时间'},
                {prop:'cz',label:'操作',width:280}
            ],
            
            // 分页配置
            pageInfo:{
                pageIndex:Config.pageIndex,
                pageSizes:Config.pageSizes,
                pageSize:Config.pageSize,
                total:Config.total
            },
            tableFilterFlat:[],
            filterDialog:{
                title:'条件筛选',
                show:false,
                width:'35%'
            }
        }
    },
    created() {
        let that=this
        that._tableSearch()
    },
    mounted() {
        let that=this
        that.tableFlat.forEach((row,index)=>{
            that.tableFilterFlat.push({prop:row.prop,label:row.label,flag:false})
        })
        
    },
    methods:{
        async _tableSearch(){//表格查询
            let that=this
            let tempParam=that.searchForm
            tempParam['pageSize']=that.pageInfo.pageSize
            tempParam['pageIndex']=that.pageInfo.pageIndex
            let res=await manageList(tempParam)
            if(res.code!=Config.ok){that.$model.err(res.msg);return}
            let tempManageList=res.result.data
            tempManageList.forEach((row,index)=>{
                row['addTime']=that.$tool.dealTime(row['addTime'])
                if(row['face']!='') row['face']=Config.devUrl+'/public/'+row['face'];
            })
            that.tableData=tempManageList
            that.pageInfo['total']=res.result.total
        },
        clickFilterField(idx){//点击筛选字段
            let that=this
            let tempField=that.tableFilterFlat
            if(!tempField[idx].flag) tempField[idx]['flag']=true;
            else tempField[idx]['flag']=false;
            
            that.tableFlat=[]
            that.tableFilterFlat.forEach((row,index)=>{
                if(row.flag==false){
                    that.tableFlat.push({prop:row.prop,label:row.label})
                }
            })
            
        },
        // 打开条件筛选
        openFileterDialog(){
            let that=this
            that.filterDialog.show=!that.filterDialog.show
        },
        // 头部查询
        topSearch(){
            let that=this
            that._tableSearch()
        },
        // 头部重置
        topRest(){
            let that=this
            that.tableSearchReset()
        },
        tableSearchReset(){//表格查询重置
            let that=this
            that.searchForm={
                username:'',
                loginName:''
            }
            that.pageInfo={
                pageIndex:Config.pageIndex,
                pageSizes:Config.pageSizes,
                pageSize:Config.pageSize,
                total:Config.total
            }
            that._tableSearch()
        },
        editRow(row){
            let that=this
            if(!row.id){that.$model.err('id不存在');return}
            that.$router.push('/editSysUser/'+row.id)
        },
        deleRow(row){
            let that=this
            that.$model.confirm('确认提示','确定删除-'+row.loginName+'-管理员？',(res)=>{
                console.log(res)
            })
        },
        tableTopAddHandle(){
            let that=this
            that.$router.push('/editSysUser')
        },
        printHandle(){//表格打印
            let that=this
            that.$tool.printHTML('out-table')
        },
        filterHandle(){//表格筛选
            let that=this
            that.openFileterDialog()
        },
        exportTable(idx){//表格导出
            let that=this
            if(idx==1){
                let tempHeader=[],
                    tempFilter=[],
                    tempData=that.tableData;
                that.tableFlat.forEach((row,index)=>{
                    if(row.prop=='cz') return;
                    tempHeader.push(row.label)
                    tempFilter.push(row.prop)
                })
                let jsonData={//csv
                    trade:{
                        tHeader: tempHeader,
                        filterVal: tempFilter,
                        list: tempData
                    }
                }
                that.$tool.exportCsv(jsonData)
            }else{
                that.$tool.exportExcel('#out-table')
            }
        },
        handleCurrent(page){
            let that=this
            that._tableSearch()
        },
        handleSize(page){
            let that=this
            that._tableSearch()
        }
    },
    components:{
        BreadCrumb,
        Search,
        Panel,
        Page,
        TableTopBtn,
        Dialog
    }
}
</script>