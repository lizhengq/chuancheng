<template>
    <div class="box top_border">
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
            <TableTopBtn :addBtnTxt="'新增任务'" @tableTopAddHandle="tableTopAddHandle" @tableTopRightHandle="tableTopRightHandle"></TableTopBtn>
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
                                <el-button @click="editUpRow(scope.row)" size="mini" icon="el-icon-edit" type="primary">上移</el-button>
                                <el-button @click="editDownRow(scope.row)" size="mini" icon="el-icon-edit" type="primary">下移</el-button>
                                <el-button @click="deleRow(scope.row)" size="mini" icon="el-icon-delete" type="danger">删除</el-button>
                                <el-button @click="editContentRow(scope.row)" size="mini" icon="el-icon-edit" type="primary">任务内容</el-button></el-button>
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
        
        <!-- 任务内容弹框 -->
        <Dialog 
        :title="dialogObj1.title" 
        :show.sync="dialogObj1.show">
            <div class="" slot="d_body">
                <el-form ref="taskForm" :model="taskForm" label-width="80px">
                    <Panel title="音频信息" v-if="taskForm.audioArr.length" v-for="(item,index) in taskForm.audioArr" :key="index">
                        <el-form-item label="序号" :rules="[{ required: true, message: '请输入序号', trigger:'blur'}]" :prop="'audioArr[' + index + '].id'">
                            <el-input class="input_m" v-model="item.id" size="small" placeholder="请输入序号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="音频名称"  :rules="[{ required: true, message: '请输入音频名称', trigger:'blur'}]" :prop="'audioArr[' + index + '].audioName'">
                            <el-input class="input_m" v-model="item.audioName" size="small" placeholder="音频名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="音频内容">
                            <el-button type="primary" size="small">上传音频</el-button>
                        </el-form-item>
                    </Panel>

                    <Panel title="视频信息" v-if="taskForm.videoArr.length" v-for="(item,index) in taskForm.videoArr" :key="index">
                        <el-form-item label="序号" :rules="[{ required: true, message: '请输入序号', trigger:'blur'}]" :prop="'videoArr[' + index + '].id'">
                            <el-input class="input_m" v-model="item.id" size="small" placeholder="请输入序号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="视频内容">
                            <el-button type="primary" size="small">上传视频</el-button>
                        </el-form-item>
                    </Panel>

                    <Panel title="文本信息" v-if="taskForm.txtArr.length" v-for="(item,index) in taskForm.txtArr" :key="index">
                        <el-form-item label="序号" :rules="[{ required: true, message: '请输入序号', trigger:'blur'}]" :prop="'txtArr[' + index + '].id'">
                            <el-input class="input_m" v-model="item.id" size="small" placeholder="请输入序号" clearable></el-input>
                        </el-form-item>
                        <UEditor :idx="index" @ready="editorReady" ref="'ue" :value="defaultMSG" :ueditorConfig="ueConfig" style="width:100%;"></UEditor>
                    </Panel>

                    <Panel title="图片信息" v-if="taskForm.imgArr.length" v-for="(item,index) in taskForm.imgArr" :key="index">
                        <el-form-item label="序号" :rules="[{ required: true, message: '请输入序号', trigger:'blur'}]" :prop="'imgArr[' + index + '].id'">
                            <el-input class="input_m" v-model="item.id" size="small" placeholder="请输入序号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="图片内容">
                            <el-button type="primary" size="small">上传图片</el-button>
                        </el-form-item>
                    </Panel>
                </el-form>
            </div>
        </Dialog>


        <!-- 新增任务弹框 -->
        <Dialog 
        :title="dialogObj2.title" 
        :show.sync="dialogObj2.show">
            <div class="" slot="d_body">
                <SearchBtnList @btnHandle="btnHandle2" :searchIndex="searchIndex2" :btnArr="searchForm2"></SearchBtnList>
                <div class="osearch">
                    <el-form ref="taskSearchForm" :inline="true" :model="taskSearchForm" label-width="80px">
                        <el-form-item label="名称过滤">
                            <el-input class="inputs" v-model="taskSearchForm.taskName" placeholder="任务名称过滤" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-button size="mini" type="primary" @click="taskSearchSub">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <Panel title="列表">
                    <el-row :gutter="4">
                        <el-col v-if="taskArr.length" :span="8" v-for="(item,index) in taskArr" :key="index">
                            <div class="taskList" @click="clickTaskList(index)" :class="item['flag'] == true ? 'taskListActive' : ''">{{item.name}}</div>
                        </el-col>
                    </el-row>
                </Panel>
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
import SearchBtnList from 'comp/base/searchBtnList/index.vue'
import TableTopBtn from 'comp/base/tableTopBtn/index.vue'
import Dialog from 'comp/base/dialog/index.vue'
import UEditor from 'comp/base/ueditor/index.vue'
export default {
    data(){
        return{
            // 面包屑
            mbx:[
                {name:'计划模板'},
                {name:'周管理任务'}
            ],
            searchIndex:0,
            searchIndex2:0,
            searchForm:[
                {id:1,name:'第1周'},
                {id:2,name:'第2周'},
                {id:3,name:'第3周'},
                {id:4,name:'第4周'},
                {id:5,name:'第5周'},
                {id:6,name:'第6周'},
                {id:7,name:'第7周'},
                {id:8,name:'第8周'}
            ],
            searchForm2:[
                {id:1,name:'每日功课'},
                {id:2,name:'读书功课'},
                {id:3,name:'音频课学习'},
                {id:4,name:'视频课'},
                {id:5,name:'案例会学习'}
            ],
            // 表格数据
            tableData:[
                {typeImg:'1',typeName:'图片',taskName:'李少'},
                {typeImg:'1',typeName:'图片',taskName:'李少'},
                {typeImg:'1',typeName:'图片',taskName:'李少'},
                {typeImg:'1',typeName:'图片',taskName:'李少'},
                {typeImg:'1',typeName:'图片',taskName:'李少'},
                {typeImg:'1',typeName:'图片',taskName:'李少'},
                {typeImg:'1',typeName:'图片',taskName:'李少'},
                {typeImg:'1',typeName:'图片',taskName:'李少'},
                {typeImg:'1',typeName:'图片',taskName:'李少'},
                {typeImg:'1',typeName:'图片',taskName:'李少'},
                {typeImg:'1',typeName:'图片',taskName:'李少'},
                {typeImg:'1',typeName:'图片',taskName:'李少'}
            ],
            // 表结构
            tableFlat:[
                {prop:'typeImg',label:'模板名称'},
                {prop:'typeName',label:'阶段'},
                {prop:'taskName',label:'周期'},
                {prop:'cz',label:'操作',width:380}
            ],
            // 分页配置
            pageInfo:{
                pageIndex:Config.pageIndex,
                pageSizes:Config.pageSizes,
                pageSize:Config.pageSize,
                total:Config.total
            },
            dialogObj1:{
                title:'任务内容',
                show:false,
            },
            dialogObj2:{
                title:'选择任务',
                show:false,
            },
            taskForm:{
                audioArr:[{id:1,audioName:'李少'}],
                videoArr:[{id:1}],
                txtArr:[{id:1}],
                imgArr:[]
            },
            taskSearchForm:{
                taskName:''
            },
            taskArr:[
                {id:1,name:'指导师体系案例会1',flag:false},
                {id:2,name:'观影《冈仁波齐》',flag:false},
                {id:3,name:'观影《奇异博士》',flag:false},
                {id:4,name:'观影《传奇的诞生》',flag:false},
                {id:5,name:'2020.02.17明心营案例会',flag:false},
                {id:6,name:'2020.03.23明心营案例会',flag:false},
                {id:7,name:'2020.03.11启智营案例会',flag:false},
                {id:8,name:'指导师体系案例会5',flag:false},
                {id:9,name:'八段锦-辅助锻炼视频',flag:false},
                {id:10,name:'2020.01.14明心营案例会',flag:false},
                {id:11,name:'终身学习体系案例会5',flag:false},
                {id:12,name:'观影《奇迹男孩》并分享',flag:false},
                {id:13,name:'指导师体系案例会3',flag:false},
                {id:14,name:'观影《十二公民》',flag:false}
            ],
            ueConfig:{
                initialFrameHeight: 400,
            }
        }
    },
    methods:{
        clickTaskList(idx){
            let that=this
            let taskArr=that.taskArr
            if(!taskArr[idx].flag) taskArr[idx]['flag']=true;
            else taskArr[idx]['flag']=false;
        },
        taskSearchSub(){
            let that=this
        },
        openDialog1(){//打开弹框
            let that=this
            that.dialogObj1.show=true
        },
        openDialog2(){//打开弹框
            let that=this
            that.dialogObj2.show=true
        },
        btnHandle(idx){
            let that=this
            that.searchIndex=idx
        },
        btnHandle2(idx){
            let that=this
            that.searchIndex2=idx
        },
        deleRow(row){
            let that=this
            that.$model.confirm('确认提示','确定删除该管理员？',(res)=>{
                console.log(res)
            })
        },
        editUpRow(row){

        },
        editDownRow(row){

        },
        editContentRow(row){
            let that=this
            that.openDialog1()
        },
        tableTopAddHandle(){
            let that=this
            // that.$router.push('/editPlanTemp')
            that.openDialog2()
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
        TableTopBtn,
        Dialog,
        UEditor
    }
}
</script>
<style scoped>
.osearch{padding:18px 0 20px 0;}
.taskList{text-align: center;line-height:52px;background: #c1c1c1;cursor:pointer;color:#fff;}
.taskListActive{background:#67C23A;}
.el-col{margin-bottom:4px !important;}
</style>