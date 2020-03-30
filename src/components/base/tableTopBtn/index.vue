<template>
    <div class="q_clearFloat btn-wrap">
        <el-button class="q_left" @click="clickAdd" icon="el-icon-circle-plus-outline" type="primary" size="mini">{{addBtnTxt}}</el-button>
        <el-button v-show="excelDown" class="q_left" icon="el-icon-circle-plus-outline" type="primary" size="mini">Excel模板下载</el-button>
        <el-button v-show="excelUp" class="q_left" icon="el-icon-circle-plus-outline" type="primary" size="mini">Excel导入</el-button>
        <el-button v-show="addInstructor" @click="clickInstructor" class="q_left" icon="el-icon-circle-plus-outline" type="primary" size="mini">新增指导师/督导/总督导</el-button>
        <!-- <el-button-group class="q_right">
            <el-button @click="clickRight(item.name)" v-for="(item,index) in btnRightList" :key="index" type="primary" :icon="item.icon" size="mini">{{item.name}}</el-button>
            <el-button type="primary" icon="el-icon-guide" size="mini">筛选</el-button>
            <el-button type="primary" icon="el-icon-printer" size="mini">导出</el-button>
            <el-button type="primary" icon="el-icon-mouse" size="mini">打印</el-button>
        </el-button-group> -->
        <el-button class="q_right" type="primary" icon="el-icon-mouse" size="mini">打印</el-button>
        <el-dropdown size="mini" class="q_right" @command="handleCommand">
            <el-button type="primary" size="mini">
                导出表格<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">导出到 Csv 文件</el-dropdown-item>
                <el-dropdown-item command="2">导出到 Excel 文件</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-button class="q_right" style="margin-right:10px;" type="primary" icon="el-icon-guide" size="mini">筛选</el-button>
    </div>
</template>
<script>
export default {
    props:{
        addBtnTxt:{
            type:String,
            default:'新增数据'
        },
        excelDown:{
            type:Boolean,
            default:false
        },
        excelUp:{
            type:Boolean,
            default:false
        },
        addInstructor:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            btnRightList:[
                {id:1,icon:'el-icon-guide',name:'筛选'},
                {id:2,icon:'el-icon-printer',name:'导出'},
                {id:3,icon:'el-icon-mouse',name:'打印'}
            ]
        }
    },
    methods:{
        clickAdd(){
            let that=this
            that.$emit('tableTopAddHandle')
        },
        handleCommand(idx){
            let that=this
            that.$emit('exportTable',idx)
        },
        // clickRight(val){
        //     let that=this
        //     that.$emit('tableTopRightHandle',val)
        // },
        clickInstructor(){
            let that=this
            that.$emit('instructorHandle')
        }
    }
}
</script>