<template>
    <div>
       <script :id="randomId" type="text/plain"></script>
    </div>
</template>
<script>
import 'static/ueditor/ueditor.config.js'
import 'static/ueditor/ueditor.all.js'
import 'static/ueditor/lang/zh-cn/zh-cn.js'
import 'static/ueditor/ueditor.parse.min.js'
// import 'static/ueditor/themes/default/css/ueditor.css'
export default {
    props:{
        value:{
            default:function(){
                return ''
            }
        },
        ueditorConfig:{
            type:Object,
            default:function(){
                return {

                }
            }
        },
        idx:{
            type:String,
            defualt:0
        }
    },
    data(){
        return{
            // editor:null
            // editor:{}
            randomId:'editor_'+Math.random()*100000000000000000,
            instance:null,
            ready:false
        }
    },
    watch: {
        value: function(val, oldVal) {
            if (val != null && this.ready) {
                this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
                this.instance.setContent(val);
            }
        }
    },
    mounted(){
        this.initEditor();
    },
    beforeDestroy() {
        // 组件销毁的时候，要销毁 UEditor 实例
        if (this.instance !== null && this.instance.destroy) {
            this.instance.destroy();
        }
    },
    methods:{
        initEditor() {
            const _this = this;
            //dom元素已经挂载上去了
            this.$nextTick(() => {
                this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
                // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
                this.instance.addListener("ready", () => {
                    this.ready = true;
                    this.$emit("ready", this.instance,this.idx);
                });
            });
        },
        getUEContent() { // 获取内容方法
            return this.instance.getContent()
        },
        setText(con) {
            this.instance = UE.getEditor(this.randomId, this.ueditorConfig);
            this.instance.setContent(con);
        }
    }
}
</script>