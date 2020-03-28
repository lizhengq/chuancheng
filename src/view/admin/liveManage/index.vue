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
                            <el-select class="input_m" v-model="searchForm.host" placeholder="请选择主持人" size="small">
                                <el-option
                                    v-for="(item,index) in selects.host"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item label="">
                            <el-input class="input_m" v-model="searchForm.liveName" placeholder="请输入直播名称" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-date-picker class="input_m" size="small"
                            v-model="searchForm.liveStart"
                            align="right"
                            type="date"
                            placeholder="直播开始"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="">
                            <el-date-picker class="input_m" size="small"
                            v-model="searchForm.liveEnd"
                            align="right"
                            type="date"
                            placeholder="直播结束"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="row">
                        <el-form-item label="">
                            <el-select class="input_m" v-model="searchForm.liveState" placeholder="请选择直播状态" size="small">
                                <el-option
                                    v-for="(item,index) in selects.liveState"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-select class="input_m" v-model="searchForm.stage" placeholder="请选择阶段" size="small">
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
                                <el-button @click="editRow(scope.row)" size="mini" icon="el-icon-edit" type="primary">修改</el-button>
                                <el-button @click="deleRow(scope.row)" size="mini" icon="el-icon-delete" type="danger">关闭</el-button>
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
                {name:'直播管理'}
            ],
            // 头部查询
            searchForm:{
                host:'',
                liveName:'',
                liveStart:'',
                liveEnd:'',
                liveState:'',
                stage:''
            },
            // 表格数据
            tableData:[
                {liveName:'头像1',host:'李少1',stage:1,liveState:'秀恩爱666',liveTime:'我是787'},
                {liveName:'头像1',host:'李少1',stage:1,liveState:'秀恩爱666',liveTime:'我是787'},
                {liveName:'头像1',host:'李少1',stage:1,liveState:'秀恩爱666',liveTime:'我是787'},
                {liveName:'头像1',host:'李少1',stage:1,liveState:'秀恩爱666',liveTime:'我是787'},
                {liveName:'头像1',host:'李少1',stage:1,liveState:'秀恩爱666',liveTime:'我是787'},
                {liveName:'头像1',host:'李少1',stage:1,liveState:'秀恩爱666',liveTime:'我是787'},
                {liveName:'头像1',host:'李少1',stage:1,liveState:'秀恩爱666',liveTime:'我是787'},
                {liveName:'头像1',host:'李少1',stage:1,liveState:'秀恩爱666',liveTime:'我是787'},
                {liveName:'头像1',host:'李少1',stage:1,liveState:'秀恩爱666',liveTime:'我是787'}
            ],
            // 表结构
            tableFlat:[
                {prop:'liveName',label:'直播室名称'},
                {prop:'host',label:'主持人'},
                {prop:'stage',label:'阶段'},
                {prop:'liveState',label:'直播状态'},
                {prop:'liveTime',label:'直播时间'},
                {prop:'cz',label:'操作',width:200}
            ],
            selects:{
                host:[
                    {id:1,name:'江西'},
                    {id:2,name:'浙江'},
                    {id:3,name:'上海'}
                ],
                liveState:[
                    {id:1,name:'我是一个'},
                    {id:2,name:'我是二个'},
                    {id:3,name:'我是三个'}
                ],
                stage:[
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
            that.$router.push('/editLiveManage')
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