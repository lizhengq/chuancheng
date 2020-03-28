<template>
    <div class="odialog">
        <el-dialog 
        :title="title" 
        custom-class="li_dialog" 
        :visible.sync="visible" 
        @close="$emit('update:show',false)" 
        :show="show" 
        :close-on-click-modal="clickModal" 
        :width="width" 
        :show-close="showClose">
            <slot name="d_body"></slot>
            <div slot="footer" class="dialog-footer">
                <slot name="d_footer"></slot>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:'标题'
        },
        show:{
            type:Boolean,
            default:false
        },
        width:{
            type:String,
            default:'62.5%'
        },
        showClose:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{
            visible:this.show,
            clickModal:false
        }
    },
    watch:{
        show(){
            this.visible=this.show
        }
    }
}
</script>
<style scoped>
.odialog /deep/ .el-dialog__body{max-height: 60vh;overflow: auto;}
</style>