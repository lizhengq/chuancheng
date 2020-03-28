<template>
    <div class="opanel">
        <fieldset>
            <legend>{{title}}</legend>
            <slot></slot>
        </fieldset>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        }
    },
    data(){
        return{

        }
    }
}
</script>
<style>
.opanel{padding:10px;}
.opanel fieldset{position:relative;min-width: inherit;width:100%;box-sizing: border-box;border:1px solid #e6e6e6;padding:20px 20px;margin-top:15px;}
.opanel fieldset legend{font-size:18px;font-weight: 300;padding:0 10px;color:#444444;letter-spacing: 1px;}
</style>