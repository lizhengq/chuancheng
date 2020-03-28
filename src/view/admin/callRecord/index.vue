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
                            <el-select class="input_m" v-model="searchForm.coachName" placeholder="请选择教练名称" size="small">
                                <el-option
                                    v-for="(item,index) in selects.coachName"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-date-picker class="input_m" size="small"
                            v-model="searchForm.taleStart"
                            align="right"
                            type="date"
                            placeholder="通话开始"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="">
                            <el-date-picker class="input_m" size="small"
                            v-model="searchForm.taleEnd"
                            align="right"
                            type="date"
                            placeholder="通话结束"
                            :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input class="input_m" v-model="searchForm.username" placeholder="请输入用户姓名" size="small" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="row">
                        <el-form-item label="">
                            <el-select class="input_m" v-model="searchForm.callState" placeholder="请选择呼叫状态" size="small">
                                <el-option
                                    v-for="(item,index) in selects.callState"
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
            <!-- <TableTopBtn @tableTopAddHandle="tableTopAddHandle" @tableTopRightHandle="tableTopRightHandle"></TableTopBtn> -->
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
                                <el-button @click="editPlayRow(scope.row)" size="mini" icon="el-icon-edit" type="primary">播放录音</el-button>
                                <el-button @click="editDownRow(scope.row)" size="mini" icon="el-icon-edit" type="primary">下载录音</el-button>
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

        <!-- 录音播放弹框 -->
        <Dialog :title="recoDialog.title" :show.sync="recoDialog.show" :width="recoDialog.width" :showClose="false">
            <div slot="d_body"></div>
            <div slot="d_footer">
                <el-button type="primary" @click="closeDialog" size="small">关闭</el-button>
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
import Dialog from 'comp/base/dialog/index.vue'
export default {
    data(){
        return{
            // 面包屑
            mbx:[
                {name:'通话记录'}
            ],
            // 头部查询
            searchForm:{
                coachName:'',
                taleStart:'',
                taleEnd:'',
                username:'',
                callState:''
            },
            // 表格数据
            tableData:[
                {coachName:'头像1',callUser:'李少1',classGroup:1,callState:'秀恩爱666',startTime:'我是787',endTime:'我是787',callLong:'我是787'},
                {coachName:'头像1',callUser:'李少1',classGroup:1,callState:'秀恩爱666',startTime:'我是787',endTime:'我是787',callLong:'我是787'},
                {coachName:'头像1',callUser:'李少1',classGroup:1,callState:'秀恩爱666',startTime:'我是787',endTime:'我是787',callLong:'我是787'},
                {coachName:'头像1',callUser:'李少1',classGroup:1,callState:'秀恩爱666',startTime:'我是787',endTime:'我是787',callLong:'我是787'},
                {coachName:'头像1',callUser:'李少1',classGroup:1,callState:'秀恩爱666',startTime:'我是787',endTime:'我是787',callLong:'我是787'},
                {coachName:'头像1',callUser:'李少1',classGroup:1,callState:'秀恩爱666',startTime:'我是787',endTime:'我是787',callLong:'我是787'},
                {coachName:'头像1',callUser:'李少1',classGroup:1,callState:'秀恩爱666',startTime:'我是787',endTime:'我是787',callLong:'我是787'},
                {coachName:'头像1',callUser:'李少1',classGroup:1,callState:'秀恩爱666',startTime:'我是787',endTime:'我是787',callLong:'我是787'},
                {coachName:'头像1',callUser:'李少1',classGroup:1,callState:'秀恩爱666',startTime:'我是787',endTime:'我是787',callLong:'我是787'},
                {coachName:'头像1',callUser:'李少1',classGroup:1,callState:'秀恩爱666',startTime:'我是787',endTime:'我是787',callLong:'我是787'},
                {coachName:'头像1',callUser:'李少1',classGroup:1,callState:'秀恩爱666',startTime:'我是787',endTime:'我是787',callLong:'我是787'}
            ],
            // 表结构
            tableFlat:[
                {prop:'coachName',label:'教练名称'},
                {prop:'callUser',label:'呼叫用户'},
                {prop:'classGroup',label:'所在班组'},
                {prop:'callState',label:'呼叫状态'},
                {prop:'startTime',label:'开始时间'},
                {prop:'endTime',label:'结束时间'},
                {prop:'callLong',label:'通话时长'},
                {prop:'cz',label:'操作',width:240}
            ],
            selects:{
                coachName:[
                    {id:1,name:'江西'},
                    {id:2,name:'浙江'},
                    {id:3,name:'上海'}
                ],
                callState:[
                    {id:1,name:'江西'},
                    {id:2,name:'浙江'},
                    {id:3,name:'上海'}
                ]
            },
            // 分页配置
            pageInfo:{
                pageIndex:Config.pageIndex,
                pageSizes:Config.pageSizes,
                pageSize:Config.pageSize,
                total:Config.total
            },
            recoDialog:{//录音弹框
                title:'录音弹框',
                show:false,
                width:'35%'
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
        openDialog(){
            let that=this
            that.recoDialog.show=!that.recoDialog.show
        },
        closeDialog(){
            let that=this
            that.openDialog()
        },
        // 头部查询
        topSearch(){

        },
        // 头部重置
        topRest(){

        },
        editPlayRow(row){
            let that=this
            that.openDialog()
        },
        editDownRow(row){
            let that=this
            that.$model.confirm('确认提示','确定删除该管理员？',(res)=>{
                console.log(res)
            })
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
        Dialog
    }
}
</script>