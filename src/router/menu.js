const menu=[
    {
        id:1,
        label:'系统管理',
        icon:'el-icon-setting',
        children:[
            {
                id:101,
                label:'角色管理',
                icon:'el-icon-user',
                url:'/roleManage'
            },
            {
                id:102,
                label:'系统用户',
                icon:'el-icon-user-solid',
                url:'/sysUser'
            }
        ]
    },
    {
        id:2,
        label:'班级管理',
        icon:'el-icon-s-grid',
        url:'/classManage'
    },
    {
        id:3,
        label:'任务管理',
        icon:'el-icon-s-flag',
        children:[
            {
                id:301,
                label:'任务类型',
                icon:'el-icon-share',
                url:'/taskType'
            },
            {
                id:302,
                label:'任务列表',
                icon:'el-icon-s-unfold',
                url:'/taskList'
            }
        ]
    },
    {
        id:4,
        label:'计划模板',
        icon:'el-icon-help',
        url:'/planTemp'
    },
    {
        id:5,
        label:'订单管理',
        icon:'el-icon-document',
        url:'/orderManage'
    },
    {
        id:6,
        label:'阶段管理',
        icon:'el-icon-paperclip',
        url:'/stageManage'
    },
    {
        id:7,
        label:'版本管理',
        icon:'el-icon-coin',
        children:[
            {
                id:701,
                label:'教练端版本',
                icon:'el-icon-aim',
                url:'/coachPort'
            },
            {
                id:702,
                label:'家长端版本',
                icon:'el-icon-aim',
                url:'/parentPort'
            }
        ]
    },
    {
        id:8,
        label:'群组管理',
        icon:'el-icon-basketball',
        url:'/groupManage'
    },
    {
        id:9,
        label:'直播管理',
        icon:'el-icon-video-camera-solid',
        url:'/liveManage'
    },
    {
        id:10,
        label:'通话记录',
        icon:'el-icon-s-promotion',
        url:'/callRecord'
    }
]


export default menu