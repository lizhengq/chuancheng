<template>
    <div class="">
        <el-button size="medium" :class="index==searchIndex ? 'active' : ''" @click="clickBtn(index)" v-for="(item,index) in btnArr" :key="index">{{item.name}}</el-button>
    </div>
</template>
<script>
export default {
    props:{
        btnArr:{
            type:Array,
            default:function(){
                return []
            }
        },
        searchIndex:{
            type:Number,
            default:0
        }
    },
    data(){
        return{
            
        }
    },
    methods:{
        clickBtn(idx){
            let that=this
            that.$emit('btnHandle',idx)
        }
    }
}
</script>
<style scoped>
.active{background:#409eff;color:#fff;border:1px solid #409eff;}
</style>