<template>
    <div class="pages">
        <el-pagination 
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageIndex"
        :page-sizes="pageInfo.pageSizes"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
        </el-pagination>
    </div>
</template>
<script>
import Config from '@/config'
export default {
    props:{
        pageInfo:{
            type:Object,
            default:function(){
                return{
                    pageIndex:Config.pageIndex,
                    pageSizes:Config.pageSizes,
                    pageSize:Config.pageSize,
                    total:Config.total
                }
            }
        }
    },
    methods:{
        handleSizeChange(size){
            let that=this
            that.pageInfo.pageSize=size
            that.$emit('handleSize',that.pageInfo)
        },
        handleCurrentChange(current){
            let that=this
            that.pageInfo.pageIndex=current
            that.$emit('handleCurrent',that.pageInfo)
        },
    }
}
</script>
<style scoped>
.pages{text-align: right;padding:30px 20px 20px 0;}
</style>