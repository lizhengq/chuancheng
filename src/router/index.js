// 登录
const Login=()=>import('view/login/index.vue')
// 后台-首页
const Admin=()=>import('view/admin/main/index.vue')
// 后台-欢迎页
const Welcome=()=>import('view/admin/welcome/index.vue')
// 后台-角色管理
const RoleManage=()=>import('view/admin/roleManage/index.vue')
// 后台-系统用户
const SysUser=()=>import('view/admin/sysUser/index.vue')
// 后台-班级管理
const ClassManage=()=>import('view/admin/classManage/index.vue')
// 后台-任务类型
const TaskType=()=>import('view/admin/taskType/index.vue')
// 后台-任务列表
const TaskList=()=>import('view/admin/taskList/index.vue')
// 后台-计划模板
const PlanTemp=()=>import('view/admin/planTemp/index.vue')
// 后台-订单管理
const OrderManage=()=>import('view/admin/orderManage/index.vue')
// 后台-阶段管理
const StageManage=()=>import('view/admin/stageManage/index.vue')
// 后台-教练端
const CoachPort=()=>import('view/admin/coachPort/index.vue')
// 后台-家长端
const ParentPort=()=>import('view/admin/parentPort/index.vue')
// 后台-群组管理
const GroupManage=()=>import('view/admin/groupManage/index.vue')
// 后台-直播管理
const LiveManage=()=>import('view/admin/liveManage/index.vue')
// 后台-通话记录
const CallRecord=()=>import('view/admin/callRecord/index.vue')
// 后台-角色管理编辑
const EditRoleManage=()=>import('view/admin/editRoleManage/index.vue')
// 后台-系统用户编辑
const EditSysUser=()=>import('view/admin/editSysUser/index.vue')
// 后台-班级管理编辑
const EditClassManage=()=>import('view/admin/editClassManage/index.vue')
// 后台-班级学员信息
const ClassStudent=()=>import('view/admin/classStudent/index.vue')
// 后台-编辑任务类型
const EditTaskType=()=>import('view/admin/editTaskType/index.vue')
// 后台-编辑任务类型
const EditTaskList=()=>import('view/admin/editTaskList/index.vue')
// 后台-编辑计划模板
const EditPlanTemp=()=>import('view/admin/editPlanTemp/index.vue')
// 后台-周管理任务
const WeekManage=()=>import('view/admin/weekManage/index.vue')
// 后台-订单编辑
const EditOrderManage=()=>import('view/admin/editOrderManage/index.vue')
// 后台-阶段编辑
const EditStageManage=()=>import('view/admin/editStageManage/index.vue')
// 后台-两端编辑
const EditTwoPort=()=>import('view/admin/editTwoPort/index.vue')
// 后台-管理组员
const GroupMember=()=>import('view/admin/groupMember/index.vue')
// 后台-直播编辑
const EditLiveManage=()=>import('view/admin/editLiveManage/index.vue')

const routes=[
    {
        path:'/login',
        name:'login',
        component:Login,
        meta:{title:'兴智传承-后台登录'}
    },
    {
        path:'/admin',
        name:'admin',
        component:Admin,
        meta:{title:'兴智传承-后台系统'},
        redirect:'/welcome',
        children:[
            {
                path:'/welcome',
                name:'welcome',
                component:Welcome,
                meta:{title:'兴智传承-首页'}
            },
            {
                path:'/roleManage',
                name:'roleManage',
                component:RoleManage,
                meta:{title:'兴智传承-角色管理'}
            },
            {
                path:'/sysUser',
                name:'sysUser',
                component:SysUser,
                meta:{title:'兴智传承-系统用户'}
            },
            {
                path:'/classManage',
                name:'classManage',
                component:ClassManage,
                meta:{title:'兴智传承-班级管理'}
            },
            {
                path:'/taskType',
                name:'taskType',
                component:TaskType,
                meta:{title:'兴智传承-任务类型'}
            },
            {
                path:'/taskList',
                name:'taskList',
                component:TaskList,
                meta:{title:'兴智传承-任务列表'}
            },
            {
                path:'/planTemp',
                name:'planTemp',
                component:PlanTemp,
                meta:{title:'兴智传承-计划管理'}
            },
            {
                path:'/orderManage',
                name:'orderManage',
                component:OrderManage,
                meta:{title:'兴智传承-订单管理'}
            },
            {
                path:'/stageManage',
                name:'stageManage',
                component:StageManage,
                meta:{title:'兴智传承-阶段管理'}
            },
            {
                path:'/coachPort',
                name:'coachPort',
                component:CoachPort,
                meta:{title:'兴智传承-教练端版本'}
            },
            {
                path:'/parentPort',
                name:'parentPort',
                component:ParentPort,
                meta:{title:'兴智传承-家长端版本'}
            },
            {
                path:'/groupManage',
                name:'groupManage',
                component:GroupManage,
                meta:{title:'兴智传承-群组管理'}
            },
            {
                path:'/liveManage',
                name:'liveManage',
                component:LiveManage,
                meta:{title:'兴智传承-直播管理'}
            },
            {
                path:'/callRecord',
                name:'callRecord',
                component:CallRecord,
                meta:{title:'兴智传承-通话记录'}
            },
            {
                path:'/editRoleManage',
                name:'editRoleManage',
                component:EditRoleManage,
                meta:{title:'兴智传承-编辑角色管理'}
            },
            {
                path:'/editSysUser',
                name:'editSysUser',
                component:EditSysUser,
                meta:{title:'兴智传承-编辑系统用户'}
            },
            {
                path:'/editClassManage',
                name:'editClassManage',
                component:EditClassManage,
                meta:{title:'兴智传承-编辑班级管理'}
            },
            {
                path:'/classStudent',
                name:'classStudent',
                component:ClassStudent,
                meta:{title:'兴智传承-查看班级学员'}
            },
            {
                path:'/editTaskType',
                name:'editTaskType',
                component:EditTaskType,
                meta:{title:'兴智传承-编辑任务类型'}
            },
            {
                path:'/editTaskList',
                name:'editTaskList',
                component:EditTaskList,
                meta:{title:'兴智传承-编辑任务类型'}
            },
            {
                path:'/editPlanTemp',
                name:'editPlanTemp',
                component:EditPlanTemp,
                meta:{title:'兴智传承-编辑计划模板'}
            },
            {
                path:'/weekManage',
                name:'weekManage',
                component:WeekManage,
                meta:{title:'兴智传承-周管理任务'}
            },
            {
                path:'/editOrderManage',
                name:'editOrderManage',
                component:EditOrderManage,
                meta:{title:'兴智传承-订单编辑'}
            },
            {
                path:'/editStageManage',
                name:'editStageManage',
                component:EditStageManage,
                meta:{title:'兴智传承-阶段编辑'}
            },
            {
                path:'/editTwoPort',
                name:'editTwoPort',
                component:EditTwoPort,
                meta:{title:'兴智传承-版本编辑'}
            },
            {
                path:'/groupMember',
                name:'groupMember',
                component:GroupMember,
                meta:{title:'兴智传承-管理组员'}
            },
            {
                path:'/editLiveManage',
                name:'editLiveManage',
                component:EditLiveManage,
                meta:{title:'兴智传承-直播编辑'}
            }
        ]
    },
    {
        path:'/*',
        redirect:'/login'
    }
]


const router=new VueRouter({
    routes
})

router.beforeEach((to,from,next)=>{
    if(to.meta.title) document.title=to.meta.title;
    next()
})


export default router