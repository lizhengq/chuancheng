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
                            <el-input class="inputs" v-model="searchForm.groupName" placeholder="请输入群组名称"></el-input>
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
                                <el-button @click="editManageRow(scope.row)" size="mini" icon="el-icon-edit" type="primary">管理组员</el-button>
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

        <!-- 新增群组弹框 -->
        <Dialog :title="addGroupDialog.title" :show.sync="addGroupDialog.show" :width="addGroupDialog.width">
            <div class="" slot="d_body">
                <el-form ref="groupForm" :model="groupForm">
                    <el-form-item label="">
                        <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 4, maxRows: 8}" v-model="groupForm.con"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="" slot="d_footer">
                <el-button @click="openAddGroupDialog()" size="small">取消</el-button>
                <el-button @click="addGroupDialogSub()" type="primary" size="small">确定</el-button>
            </div>
        </Dialog>
    </div>
</template>
<script>
import Config from '@/config'
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
                {name:'群组管理'}
            ],
            // 头部查询
            searchForm:{
                groupName:''
            },
            // 表格数据
            tableData:[
                {groupName:'头像1',groupPeopleNum:'李少1',create:1,addTime:'我是787'},
                {groupName:'头像1',groupPeopleNum:'李少1',create:1,addTime:'我是787'},
                {groupName:'头像1',groupPeopleNum:'李少1',create:1,addTime:'我是787'},
                {groupName:'头像1',groupPeopleNum:'李少1',create:1,addTime:'我是787'},
                {groupName:'头像1',groupPeopleNum:'李少1',create:1,addTime:'我是787'},
                {groupName:'头像1',groupPeopleNum:'李少1',create:1,addTime:'我是787'},
                {groupName:'头像1',groupPeopleNum:'李少1',create:1,addTime:'我是787'},
                {groupName:'头像1',groupPeopleNum:'李少1',create:1,addTime:'我是787'},
                {groupName:'头像1',groupPeopleNum:'李少1',create:1,addTime:'我是787'},
                {groupName:'头像1',groupPeopleNum:'李少1',create:1,addTime:'我是787'},
            ],
            // 表结构
            tableFlat:[
                {prop:'groupName',label:'群组名称'},
                {prop:'groupPeopleNum',label:'群组人数'},
                {prop:'create',label:'创建者'},
                {prop:'addTime',label:'创建时间'},
                {prop:'cz',label:'操作',width:320}
            ],
            // 分页配置
            pageInfo:{
                pageIndex:Config.pageIndex,
                pageSizes:Config.pageSizes,
                pageSize:Config.pageSize,
                total:Config.total
            },
            addGroupDialog:{
                title:'新增群组',
                show:false,
                width:'26%'
            },
            groupForm:{
                con:''
            }
        }
    },
    methods:{
        openAddGroupDialog(){
            let that=this
            that.addGroupDialog.show=!that.addGroupDialog.show
        },
        // closeAddGroupDialog(){
        //     let that=this
        //     that.addGroupDialog.show=true
        // },
        addGroupDialogSub(){
            let that=this
            if(that.groupForm.con==''){
                that.$model.err('请输入内容')
                return
            }
            that.openAddGroupDialog()
        },
        // 头部查询
        topSearch(){

        },
        // 头部重置
        topRest(){

        },
        editRow(row){
            let that=this
            that.addGroupDialog.title='修改名称'
            that.groupForm.con='孩子,我是你爸爸'
            that.openAddGroupDialog()
        },
        editManageRow(row){
            let that=this
            that.$router.push('./groupMember')
        },
        deleRow(row){
            let that=this
            that.$model.confirm('确认提示','确定删除该管理员？',(res)=>{
                console.log(res)
            })
        },
        tableTopAddHandle(){
            let that=this
            that.addGroupDialog.title='新增群组'
            that.groupForm.con=''
            that.openAddGroupDialog()
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
        TableTopBtn,
        Dialog
    }
}
</script>