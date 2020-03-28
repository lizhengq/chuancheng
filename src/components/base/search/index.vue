<template>
    <div class="osearch">
        <fieldset>
            <legend>查询条件</legend>
            <slot></slot>
        </fieldset>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    }
}
</script>
<style>
.osearch{padding:10px;}
.osearch fieldset{min-width: inherit;border:1px solid #e6e6e6;padding:10px;margin-top:15px;}
.osearch fieldset legend{font-size:18px;font-weight: 300;padding:0 10px;color:#444444;letter-spacing: 1px;}
.osearch /deep/ .el-form-item{margin-bottom:0;}
.inputs,.search-wrap .selects{width:140px;height:40px;}
.inputs /deep/ .el-input__inner{height:30px;line-height:30px;}
.osearch .selects /deep/ .el-input__inner{height:30px;line-height:30px;}
.osearch .rows{margin-bottom:10px;}
.osearch .rows:last-child{margin-bottom:0;}
</style>