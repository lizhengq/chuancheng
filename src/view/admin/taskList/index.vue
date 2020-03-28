<template>
    <div class="box border_top">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

        <!-- 搜索 -->
        <Search>
            <SearchBtnList @btnHandle="btnHandle" :searchIndex="searchIndex" :btnArr="searchForm"></SearchBtnList>
        </Search>

        <!-- 表格 -->
        <Panel 
        title="数据列表">
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
import SearchBtnList from 'comp/base/searchBtnList/index.vue'
import TableTopBtn from 'comp/base/tableTopBtn/index.vue'
export default {
    data(){
        return{
            // 面包屑
            mbx:[
                {name:'任务管理'},
                {name:'任务列表'}
            ],
            searchIndex:0,
            searchForm:[
                {id:1,name:'每日功课'},
                {id:2,name:'读书功课'},
                {id:3,name:'音频微课学习'},
                {id:4,name:'视频课'},
                {id:5,name:'案例会学习'}
            ],
            // 表格数据
            tableData:[
                {id:'1',taskImg:'图片',taskName:'李少',temp:'我是模板',addTime:'2019-04-01 07:58:26'},
                {id:'1',taskImg:'图片',taskName:'李少',temp:'我是模板',addTime:'2019-04-01 07:58:26'},
                {id:'1',taskImg:'图片',taskName:'李少',temp:'我是模板',addTime:'2019-04-01 07:58:26'},
                {id:'1',taskImg:'图片',taskName:'李少',temp:'我是模板',addTime:'2019-04-01 07:58:26'},
                {id:'1',taskImg:'图片',taskName:'李少',temp:'我是模板',addTime:'2019-04-01 07:58:26'},
                {id:'1',taskImg:'图片',taskName:'李少',temp:'我是模板',addTime:'2019-04-01 07:58:26'},
                {id:'1',taskImg:'图片',taskName:'李少',temp:'我是模板',addTime:'2019-04-01 07:58:26'},
                {id:'1',taskImg:'图片',taskName:'李少',temp:'我是模板',addTime:'2019-04-01 07:58:26'}
            ],
            // 表结构
            tableFlat:[
                {prop:'id',label:'序号'},
                {prop:'taskImg',label:'类型图片'},
                {prop:'taskName',label:'任务名称'},
                {prop:'temp',label:'所在模板'},
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
        // headerSearch(idx){
        //     let that=this
        //     console.log(idx)
        //     that.searchIndex=idx
        // },
        editRow(row){

        },
        deleRow(row){
            let that=this
            that.$model.confirm('确认提示','确定删除该管理员？',(res)=>{
                console.log(res)
            })
        },
        btnHandle(idx){
            let that=this
            that.searchIndex=idx
        },
        tableTopAddHandle(){
            let that=this
            that.$router.push('/editTaskList')
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
        SearchBtnList,
        TableTopBtn
    }
}
</script>