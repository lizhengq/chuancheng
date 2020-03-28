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
                            <el-select class="input_m" v-model="searchForm.crewType" placeholder="请选择组员类型" size="small">
                                <el-option
                                    v-for="(item,index) in selects.crewType"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input class="inputs" v-model="searchForm.crewName" placeholder="请输入组员姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="">
                            <el-input class="inputs" v-model="searchForm.crewIphone" placeholder="请输入组员手机"></el-input>
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
            <TableTopBtn :addInstructor="true" :addBtnTxt="'新增班级组员'" @instructorHandle="instructorHandle" @tableTopAddHandle="tableTopAddHandle" @tableTopRightHandle="tableTopRightHandle"></TableTopBtn>
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

        <!-- 新增指导师督导弹框 -->
        <Dialog 
        :title="addInstructor.title" 
        :show.sync="addInstructor.show" 
        :width="addInstructor.width">
            <div class="" slot="d_body">
                <el-form ref="addInstructorForm" :rules="addInstructorFormRules" :model="addInstructorForm" label-width="80px">
                    <el-form-item label="指导师" prop="instructor">
                        <el-select class="input_m" v-model="addInstructorForm.instructor" multiple placeholder="请选择指导师" size="small">
                            <el-option
                                v-for="(item,index) in selects.instructor"
                                :key="index"
                                :label="item.title"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="督导" prop="councilor">
                        <el-select class="input_m" v-model="addInstructorForm.councilor" multiple placeholder="请选择督导" size="small">
                            <el-option
                                v-for="(item,index) in selects.councilor"
                                :key="index"
                                :label="item.title"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="总督导" prop="allCouncilor">
                        <el-select class="input_m" v-model="addInstructorForm.allCouncilor" multiple placeholder="请选择总督导" size="small">
                            <el-option
                                v-for="(item,index) in selects.allCouncilor"
                                :key="index"
                                :label="item.title"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="" slot="d_footer">
                <el-button @click="opendInstructor">取消</el-button>
                <el-button @click="addInstructorSub('addInstructorForm')" type="primary">保存</el-button>
            </div>
        </Dialog>

        <!-- 新增班级组员弹框 -->
        <Dialog 
        :title="addClassCrewDialog.title" 
        :show.sync="addClassCrewDialog.show" 
        :width="addClassCrewDialog.width">
            <div class="" slot="d_body">
                <el-form :inline="true" ref="addClassCrewForm" :rules="addClassCrewFormRules" :model="addClassCrewForm" label-width="80px">
                    <div class="rows">
                        <el-form-item label="阶段" prop="stage">
                            <el-select @change="stageChange" class="input_m" v-model="addClassCrewForm.stage" placeholder="请选择指导师" size="small">
                                <el-option
                                    v-for="(item,index) in selects.stage"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="选择班级" prop="class">
                            <el-select @change="classChange" class="input_m" v-model="addClassCrewForm.class" placeholder="请选择班级" size="small">
                                <el-option
                                    v-for="(item,index) in selects.class"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="选择群组" prop="group">
                            <el-select @change="groupChange" class="input_m" v-model="addClassCrewForm.group" placeholder="请选择群组" size="small">
                                <el-option
                                    v-for="(item,index) in selects.group"
                                    :key="index"
                                    :label="item.title"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="指导师">
                            <el-tree
                            :data="instructorData"
                            show-checkbox
                            default-expand-all
                            node-key="id"
                            ref="instructorTree"
                            highlight-current
                            :props="defaultProps">
                            </el-tree>
                        </el-form-item>
                        <el-form-item label="学员">
                            <el-tree
                            :data="studentData"
                            show-checkbox
                            default-expand-all
                            node-key="id"
                            ref="studentTree"
                            highlight-current
                            :props="defaultProps">
                            </el-tree>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="" slot="d_footer">
                <el-button @click="opendClassCrew">取消</el-button>
                <el-button @click="addClassCrewSub('addClassCrewForm')" type="primary">保存</el-button>
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
                {name:'群组管理'},
                {name:'组员管理'}
            ],
            // 头部查询
            searchForm:{
                crewType:'',
                crewName:'',
                crewIphone:''
            },
            instructorData:[
                {
                    id:1,
                    label:'一级1',
                    children:[
                        {
                            id:10,
                            label:'二级1-1'
                        }
                    ]
                }
            ],
            studentData:[
                {
                    id:1,
                    label:'一级1',
                    children:[
                        {
                            id:10,
                            label:'二级1-1'
                        }
                    ]
                }
            ],
            selects:{
                crewType:[
                    {id:1,title:'111'},
                    {id:2,title:'222'}
                ],
                instructor:[
                    {id:1,title:'李正强18317917696'},
                    {id:2,title:'曾旺18296363006'},
                    {id:3,title:'刘星强15545212121'},
                    {id:4,title:'姚丽君15263258569'}
                ],
                councilor:[
                    {id:1,title:'李正强18317917696'},
                    {id:2,title:'曾旺18296363006'},
                    {id:3,title:'刘星强15545212121'},
                    {id:4,title:'姚丽君15263258569'}
                ],
                allCouncilor:[
                    {id:1,title:'李正强18317917696'},
                    {id:2,title:'曾旺18296363006'},
                    {id:3,title:'刘星强15545212121'},
                    {id:4,title:'姚丽君15263258569'}
                ],
                stage:[
                    {id:1,title:'11'},
                    {id:2,title:'222'},
                    {id:3,title:'333'},
                    {id:4,title:'444'}
                ],
                class:[
                    {id:1,title:'11'},
                    {id:2,title:'222'},
                    {id:3,title:'333'},
                    {id:4,title:'444'}
                ],
                group:[
                    {id:1,title:'11'},
                    {id:2,title:'222'},
                    {id:3,title:'333'},
                    {id:4,title:'444'}
                ]
            },
            // 表格数据
            tableData:[
                {crewType:'头像1',crewName:'李少1',crewIphone:1},
                {crewType:'头像1',crewName:'李少1',crewIphone:1},
                {crewType:'头像1',crewName:'李少1',crewIphone:1},
                {crewType:'头像1',crewName:'李少1',crewIphone:1},
                {crewType:'头像1',crewName:'李少1',crewIphone:1},
                {crewType:'头像1',crewName:'李少1',crewIphone:1},
                {crewType:'头像1',crewName:'李少1',crewIphone:1},
                {crewType:'头像1',crewName:'李少1',crewIphone:1},
                {crewType:'头像1',crewName:'李少1',crewIphone:1},
            ],
            // 表结构
            tableFlat:[
                {prop:'crewType',label:'组员类型'},
                {prop:'crewName',label:'组员姓名'},
                {prop:'crewIphone',label:'组员手机'},
                {prop:'cz',label:'操作'}
            ],
            // 分页配置
            pageInfo:{
                pageIndex:Config.pageIndex,
                pageSizes:Config.pageSizes,
                pageSize:Config.pageSize,
                total:Config.total
            },

            addInstructor:{
                title:'新增指导师/督导/总督导',
                show:false,
                width:'35%'
            },
            addClassCrewDialog:{
                title:'新增班级组员',
                show:false,
                width:'55%'
            },
            addInstructorForm:{
                instructor:'',
                councilor:'',
                allCouncilor:''
            },
            addClassCrewForm:{
                stage:'',
                class:'',
                group:''
            },
            addInstructorFormRules:{
                instructor:[
                    {required:true,message:'请选择指导师',trigger:'blur'},
                ],
                councilor:[
                    {required:true,message:'请选择督导',trigger:'blur'},
                ],
                allCouncilor:[
                    {required:true,message:'请选择总督导',trigger:'blur'},
                ]
            },
            addClassCrewFormRules:{
                stage:[
                    {required:true,message:'请选择阶段',trigger:'change'},
                ],
                class:[
                    {required:true,message:'请选择班级',trigger:'change'},
                ],
                group:[
                    {required:true,message:'请选择群组',trigger:'change'},
                ]
            }
        }
    },
    methods:{
        stageChange(){
            let that=this
            console.log('stage出发了')
        },
        classChange(){
            let that=this
            console.log('class出发了')
        },
        groupChange(){
            let that=this
            console.log('group出发了')
        },
        opendInstructor(){
            let that=this
            that.addInstructor.show=!that.addInstructor.show
        },
        opendClassCrew(){
            let that=this
            that.addClassCrewDialog.show=!that.addClassCrewDialog.show
        },
        addInstructorSub(formName){
            let that=this;
            that.$refs[formName].validate((valid)=>{
                console.log('我是强哥')
                if(!valid){
                    return;
                }
                that.opendInstructor()
                that.$model.succ('开始提交')
            })
        },
        addClassCrewSub(formName){
            let that=this;
            that.$refs[formName].validate((valid)=>{
                if(!valid){
                    return;
                }
                that.opendClassCrew()
                that.$model.succ('开始提交')
            })
        },
        // 头部查询
        topSearch(){

        },
        // 头部重置
        topRest(){

        },
        deleRow(row){
            let that=this
            that.$model.confirm('确认提示','确定删除该管理员？',(res)=>{
                console.log(res)
            })
        },
        tableTopAddHandle(){
            let that=this
            that.opendClassCrew()
        },
        tableTopRightHandle(val){
            let that=this
            console.log(val)
        },
        instructorHandle(){//添加指导师
            let that=this
            that.opendInstructor()
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