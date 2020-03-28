<template>
    <div class="mbx">
        <span v-for="(item,index) in mbx" :key="index"><i>{{item.name}}</i><i class="xx" v-if="index!=(mbx.length-1)">/</i></span>
    </div>
</template>
<script>
export default {
    props:{
        mbx:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    data(){
        return{

        }
    },
    methods:{

    }
}
</script>
<style scoped>
.mbx{border-bottom:1px solid #e6e6e6;font-size:14px;color:#333;padding:20px;}
.mbx *{display:inline-block;font-size:14px;color:#333;}
.mbx .xx{margin:0 4px 0 4px;}
</style>