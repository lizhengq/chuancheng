<template>
    <div class="box top_border">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

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
import Panel from 'comp/base/panel/index.vue'
import Page from 'comp/base/page/index.vue'
import TableTopBtn from 'comp/base/tableTopBtn/index.vue'
export default {
    data(){
        return{
            // 面包屑
            mbx:[
                {name:'任务管理'},
                {name:'任务类型'}
            ],
            // 表格数据
            tableData:[
                {typeImg:'头像1',typeName:'李少1'},
                {typeImg:'头像1',typeName:'李少1'},
                {typeImg:'头像1',typeName:'李少1'},
                {typeImg:'头像1',typeName:'李少1'},
                {typeImg:'头像1',typeName:'李少1'},
                {typeImg:'头像1',typeName:'李少1'}
            ],
            // 表结构
            tableFlat:[
                {prop:'typeImg',label:'类型图片'},
                {prop:'typeName',label:'类型名称'},
                {prop:'cz',label:'操作'},
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
        editRow(row){

        },
        tableTopAddHandle(){
            let that=this
            that.$router.push('/editTaskType')
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
        Panel,
        Page,
        TableTopBtn
    }
}
</script>