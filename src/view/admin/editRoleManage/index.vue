<template>
    <div class="box top_border">
        <!-- 面包屑 -->
        <BreadCrumb 
        :mbx="mbx">
        </BreadCrumb>

        <!-- 编辑 -->
        <Panel title="编辑">
            <div class="">
                <el-form :inline="true" ref="roleManageForm" :model="roleManageForm" :rules="roleManageFormRules" label-width="80px">
                    <div class="rows">
                        <el-form-item label="角色管理" prop="roleName">
                            <el-input class="input_m" v-model="roleManageForm.roleName" placeholder="请输入角色名称" size="small" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input class="input_m" v-model="roleManageForm.remark" placeholder="请输入备注" size="small" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item label="权限设置">
                            <el-tree
                            :data="limitData"
                            show-checkbox
                            default-expand-all
                            node-key="id"
                            ref="limitTree"
                            highlight-current
                            :props="defaultProps">
                            </el-tree>
                        </el-form-item>
                    </div>
                    <div class="rows">
                        <el-form-item>
                            <el-button type="primary" @click="sub('roleManageForm')">提交</el-button>
                            <el-button>返回</el-button>
                        </el-form-item>
                    </div>    
                    
                </el-form>
            </div>
        </Panel>
    </div>
</template>
<script>
import BreadCrumb from 'comp/base/breadCrumb/index.vue'
import Panel from 'comp/base/panel/index.vue'
export default {
    data(){
        return{
            // 面包屑
            mbx:[
                {name:'系统管理'},
                {name:'角色管理'},
                {name:'编辑角色管理'}
            ],
            //角色管理表单
            roleManageForm:{
                roleName:'',
                remark:''
            },
            roleManageFormRules:{
                roleName:[
                    {required:true,message:'请输入角色名',trigger:'blur'},
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ]
            },
            limitData:[
                {
                    id:1,
                    label:'一级1',
                    children:[
                        {
                            id:11,
                            label:'二级1-1'
                        },
                        {
                            id:12,
                            label:'二级1-2'
                        }
                    ]
                },
                {
                    id:2,
                    label:'二级2',
                    children:[
                        {
                            id:21,
                            label:'二级2-1'
                        }
                    ]
                }
            ]
        }
    },
    methods:{
        sub(formName){
            let that=this;
            that.$refs[formName].validate((valid)=>{
                if(!valid){
                    return;
                }
                that.$model.succ('开始提交')
            })
        }
    },
    components:{
        BreadCrumb,
        Panel
    }
}
</script>
