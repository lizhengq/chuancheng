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
                        <el-form-item label="角色管理" prop="name">
                            <el-input class="input_m" v-model="roleManageForm.name" placeholder="请输入角色名称" size="small" clearable></el-input>
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
                            <el-button @click="goBack">返回</el-button>
                        </el-form-item>
                    </div>    
                </el-form>
            </div>
        </Panel>
    </div>
</template>
<script>
import Config from '@/config'
import {roleAuthList,roleEdit,roleDetail} from '@/api'
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
                name:'',
                remark:'',
                auths:''
            },
            roleManageFormRules:{
                name:[
                    {required:true,message:'请输入角色名',trigger:'blur'},
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ]
            },
            limitData:[],
            defaultProps: {
                children: 'children',
                label: 'title'
            }
        }
    },
    created() {
        let that=this
        if(!that.$route.params.id){that.$router.go(-1);that.$model.err('id参数有误');return}
        that.roleId=that.$route.params.id
        that._roleAuthList()
        that._roleDetail({id:that.roleId})
    },
    methods:{
        async _roleAuthList(){
            let that=this
            let res=await roleAuthList()
            if(res.code!=Config.ok){that.$model.err(res.msg);return}
            that.limitData=res.result
        },
        async _roleDetail(param){
            let that=this
            let res=await roleDetail(param)
            if(res.code!=Config.ok){that.$model.err(res.msg);return}
            that.roleManageForm['name']=res.result.name
            that.roleManageForm['remark']=res.result.remark
            if(!res.result.auths) return;
            that.roleManageForm['auths']=res.result.auths
            that.setCheckedKeys(JSON.parse(res.result.auths))
        },
        async _roleEdit(param){
            let that=this
            let res=await roleEdit(param)
            if(res.code!=Config.ok){that.$model.err(res.msg);return}
            that.$model.succ('编辑成功');
            that.$router.push('/roleManage')
        },
        goBack(){
            let that=this
            that.$router.go(-1)
        },
        sub(formName){
            let that=this;
            that.$refs[formName].validate((valid)=>{
                if(!valid) return;
                let tempAuth=that.getCheckedKeys()
                if(tempAuth.length==0){that.$model.err('请勾选权限');return}
                that.roleManageForm['auths']=JSON.stringify(tempAuth)
                that.roleManageForm['id']=that.roleId
                that._roleEdit(that.roleManageForm)
            })
        },
        getCheckedKeys(){
            let that=this
            return that.$refs['limitTree'].getCheckedKeys()
        },
        setCheckedKeys(objs){//设置权限列表数据
            let that=this
            that.$refs['limitTree'].setCheckedKeys(objs)
        }
    },
    components:{
        BreadCrumb,
        Panel
    }
}
</script>
