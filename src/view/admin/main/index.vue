<template>
    <div class="admin">
        <div class="slider">
            <div class="user-info">
                <img src="static/img/normal-face.png" alt="">
                <p class="p1">李少</p>
                <p class="p2">超级管理员</p>
            </div>
            <div class="list">
                <el-menu
                    class="list-wrap" 
                    :default-active="defaultActive" 
                    unique-opened
                    background-color="#2f4050"
                    text-color="#d1d1d1"
                    active-text-color="#ffffff"
                >
                    <template v-for="(item,index) in menu" v-if="item.icon && item.label">
                        <el-submenu :index="item.id" v-if="item.children && item.icon && item.label">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span>{{item.label}}</span>
                            </template>
                            <el-menu-item-group v-for="(row,idx) in item.children" :key="idx" v-if="item.children && row.icon && row.url && row.label">
                                <el-menu-item :index="row.id" @click="switchMenu(row)">
                                    <template slot="title">
                                        <i :class="row.icon"></i>
                                        <span>{{row.label}}</span>
                                    </template>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item :index="item.id" v-else @click="switchMenu(item)">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span>{{item.label}}</span>
                            </template>
                        </el-menu-item>
                    </template>
                </el-menu>
            </div>
        </div>
        <div class="content">
            <div class="navTop" v-if="navTopList.length>0">
                <ul>
                    <li :class="{actived:item.id==defaultActive}" @click="switchNav(index,item)" v-for="(item,index) in navTopList" :key="index">{{item.label}}<i @click.stop="removeNav(index,item)" class="el-icon-circle-close"></i></li>
                </ul>
                <div class="go_out" @click="goOut">
                    <i class="el-icon-switch-button"></i>
                    <span>安全退出</span>
                </div>
            </div>
            <div class="content-wrap">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import Menu from '@/router/menu'
export default {
    data(){
        return{
            defaultActive:'welcome',
            navTopList:[],
            menu:Menu
        }
    },
    created() {
        // console.log(Menu)
    },
    methods:{
        goOut(){//退出
            let that=this
            that.$model.succ('退出成功')
            that.$router.push('/login')
        },
        switchMenu(row){//左侧菜单栏切换
            let that=this;
            if(that.navTopList.length>=8){that.navTopList.shift()}
            console.log(row)
            let res=that.navTopList.find((item,index)=>{return item.label==row.label})
            if(res!=undefined){//找到
                that.defaultActive=row.id
            }else{//没有找到
                that.defaultActive=row.id
                that.navTopList.push({id:row.id,label:row.label,url:row.url})
            }
            that.$router.push(row.url)
        },
        switchNav(idx,row){//切换头部导航
            let that=this
            that.defaultActive=row.id
            that.$router.push(that.navTopList[idx].url)
        },
        removeNav(index,row){
            let that=this
            if(that.navTopList.length<=1) return;
            if(that.defaultActive!=row.id){
                that.navTopList.splice(index,1)
                return
            }else if(that.defaultActive==row.id){
                that.navTopList.splice(index,1)
                if(index==0) that.defaultActive=that.navTopList[0].id;
                else that.defaultActive=that.navTopList[index-1].id;
            }
            let tempUrl=index-1 > 0 ? that.navTopList[index-1].url : that.navTopList[0].url;
            that.$router.push(tempUrl)
        }
    }
    
}
</script>
<style scoped>
.admin{width:100%;height:100%;position: relative;}
.admin .slider{position: absolute;left:0;top:0;bottom:0;width:160px;background:#263949;overflow: hidden;}
.admin .content{width:100%;height:100%;overflow: hidden;padding:0 0 0 160px;background:#f3f3f4;}
.user-info{padding:24px 0 0 0;position: absolute;z-index: 99;width:97%;background:#263949;}
.user-info *{display: block;margin:0 auto;text-align: center;font-size:14px;font-weight: 600;}
.user-info img{width:64px;height:64px;border-radius: 50%;}
.user-info .p1{color:#fff;margin-top:10px;}
.user-info .p2{color:#8095a8;margin-top:10px;}
.slider .list{position: absolute;left:0;bottom:0;right:0px;top:0;overflow-y: scroll;overflow-x: hidden;padding:156px 0 0 0;}
.slider .list-wrap{width:160px;}
.slider /deep/ .el-menu-item-group__title{padding: 0px 0 0px 20px;}
.slider /deep/ .el-menu-item,.slider /deep/ .el-submenu__title{height:48px;line-height:48px;}
.slider /deep/ .is-opened .is-active{background:#424350 !important;}
.navTop{width:100%;height:42px;border-bottom:solid 2px #2f4050;margin-bottom:16px;background:#fff;position: relative;}
.go_out{position: absolute;width:120px;height:42px;right:0;top:0;cursor: pointer;text-align: center;}
.go_out *{display: inline-block;line-height:42px;font-size:14px;color:#666;}
.navTop ul{overflow: hidden;}
.navTop ul li{float:left;height:40px;text-align: center;font-size:14px;color:#999999;line-height:40px;padding:0 24px;cursor: pointer;transition:all 0.25s;border-right:1px solid #efefef;}
.navTop ul li:hover{background:#f3f3f4;}
.navTop ul li i{margin-left:14px;}
.navTop ul li.actived{background:#424350;color:#a7b1c2;}
.content-wrap{width:100%;height:92.6%;overflow-x: hidden;overflow-y: scroll;padding:0 14px 0 14px;}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/ 
::-webkit-scrollbar{width: 4px;height: 4px;background-color: #F5F5F5;} 
/*定义滚动条轨道 内阴影+圆角*/ 
::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,0.3);border-radius: 5px;background-color: #F5F5F5; } 
/*定义滑块 内阴影+圆角*/ 
::-webkit-scrollbar-thumb{border-radius: 5px;-webkit-box-shadow: inset 0 0 3px rgba(0,0,0,.3);background-color: #555;}
</style>