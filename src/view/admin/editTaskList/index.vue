<template>
    <div class="box top_border">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

        <!-- 编辑 -->
        <Panel title="编辑">
            <div class="">
                <el-form ref="taskListForm" :model="taskListForm" :rules="taskListFormRules" label-width="80px">
                    <el-form-item label="任务名称" prop="taskName">
                        <el-input class="input_m" v-model="taskListForm.taskName" size="small" placeholder="请输入任务名称" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="任务类别" prop="taskType">
                        <el-select class="input_m" v-model="taskListForm.taskType" placeholder="请选择任务类别" size="small">
                            <el-option
                                v-for="(item,index) in selects.taskType"
                                :key="index"
                                :label="item.title"
                                :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div style="margin-bottom:20px;">
                        <el-button-group>
                            <el-button @click="add(index)" v-for="(item,index) in btnArr" :key="index" size="small" icon="el-icon-circle-plus-outline">{{item.name}}</el-button>
                        </el-button-group>
                    </div>
                    <Panel title="音频信息" v-if="taskListForm.audioArr.length" v-for="(item,index) in taskListForm.audioArr" :key="index">
                        <i class="el-icon-delete icon_close" title="点击关闭" @click="remove('audio',index)"></i>
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

                    <Panel title="视频信息" v-if="taskListForm.videoArr.length" v-for="(item,index) in taskListForm.videoArr" :key="index">
                        <i class="el-icon-delete icon_close" title="点击关闭"  @click="remove('video',index)"></i>
                        <el-form-item label="序号" :rules="[{ required: true, message: '请输入序号', trigger:'blur'}]" :prop="'videoArr[' + index + '].id'">
                            <el-input class="input_m" v-model="item.id" size="small" placeholder="请输入序号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="视频内容">
                            <el-button type="primary" size="small">上传视频</el-button>
                        </el-form-item>
                    </Panel>

                    <Panel title="文本信息" v-if="taskListForm.txtArr.length" v-for="(item,index) in taskListForm.txtArr" :key="index">
                        <i class="el-icon-delete icon_close" title="点击关闭" @click="remove('txt',index)"></i>
                        <el-form-item label="序号" :rules="[{ required: true, message: '请输入序号', trigger:'blur'}]" :prop="'txtArr[' + index + '].id'">
                            <el-input class="input_m" v-model="item.id" size="small" placeholder="请输入序号" clearable></el-input>
                        </el-form-item>
                        <UEditor :idx="index" @ready="editorReady" ref="'ue" :value="defaultMSG" :ueditorConfig="ueConfig" style="width:100%;"></UEditor>
                    </Panel>

                    <Panel title="图片信息" v-if="taskListForm.imgArr.length" v-for="(item,index) in taskListForm.imgArr" :key="index">
                        <i class="el-icon-delete icon_close" title="点击关闭" @click="remove('img',index)"></i>
                        <el-form-item label="序号" :rules="[{ required: true, message: '请输入序号', trigger:'blur'}]" :prop="'imgArr[' + index + '].id'">
                            <el-input class="input_m" v-model="item.id" size="small" placeholder="请输入序号" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="图片内容">
                            <el-button type="primary" size="small">上传图片</el-button>
                        </el-form-item>
                    </Panel>
                    <el-form-item>
                        <el-button type="primary" @click="sub('taskListForm')">提交</el-button>
                        <el-button>返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </Panel>
    </div>
</template>
<script>
import BreadCrumb from 'comp/base/breadCrumb/index.vue'
import Panel from 'comp/base/panel/index.vue'
import UEditor from 'comp/base/ueditor/index.vue'
export default {
    data(){
        return{
            // 面包屑
            mbx:[
                {name:'任务管理'},
                {name:'编辑任务列表'}
            ],
            btnArr:[
                {id:1,name:'新增音频'},
                {id:2,name:'新增视频'},
                {id:3,name:'新增文本'},
                {id:4,name:'新增图片'}
            ],
            taskListForm:{
                taskName:'',
                taskType:'',
                audioArr:[],
                videoArr:[],
                txtArr:[],
                imgArr:[]
            },
            taskListFormRules:{
                taskName:[
                    {required:true,message:'请输入任务名称',trigger:'blur'},
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                taskType:[
                    {required:true,message:'请选择任务类别',trigger:'change'}
                ]
            },
            selects:{
                taskType:[
                    {id:1,title:'超级管理员'},
                    {id:2,title:'编辑管理员'},
                    {id:3,title:'权限管理员'}
                ]
            },
            defaultMSG:null,
            ueConfig:{
                initialFrameHeight: 400,
            }
        }
    },
    methods:{
        add(idx){
            let that=this
            if(idx==0){//音频
                that.taskListForm.audioArr.push({id:'',audioName:'',audioUrl:''})
            }else if(idx==1){//视频
                that.taskListForm.videoArr.push({id:'',videoUrl:''})
            }else if(idx==2){//文本
                that.taskListForm.txtArr.push({id:'',content:''})
            }else if(idx==3){//图片
                that.taskListForm.imgArr.push({id:'',imgSrc:''})
            }
        },
        remove(target,index){
            let that=this;
            let arrs=that.taskListForm;
            if(target=='audio'){
                arrs.audioArr.splice(index,1)
            }else if(target=='video'){
                arrs.videoArr.splice(index,1)
            }else if(target=='txt'){
                arrs.txtArr.splice(index,1)
                that.$model.succ('移除成功')
                let textArea=document.querySelectorAll('textarea')
                if(textArea.length<=0) return;
                for(let i=0;i<textArea.length;i++){textArea[i].remove()}
            }else if(target=='img'){
                arrs.imgArr.splice(index,1)
            }
            that.$model.succ('移除成功')
        },
        sub(formName){
            let that=this;
            that.$refs[formName].validate((valid)=>{
                if(!valid){
                    return;
                }
                that.$model.succ('开始提交')
            })
        },
        editorReady(instance,idx) {
            instance.addListener('contentChange', () => {
                console.log('look',idx,instance.getContent())
            });
        }
    },
    components:{
        BreadCrumb,
        Panel,
        UEditor
    }
}
</script>
<style>
.icon_close{position: absolute;right:20px;top:20px;cursor: pointer;z-index: 10;color:#666;font-size:30px;color:#FF5722;}
</style>