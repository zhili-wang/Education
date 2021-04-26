import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login'),
      children:[
        {
          path:'',
          name:'login',
          meta:{title:'登录'},
          component: () => import('@/views/Login')
        }
      ]
    },
    {
      path: 'editPwd',
      name: 'editPwd',
      component: () => import('@/views/editPwd')
    },
    // 老师端
    {
      path: '/api',
      name: 'api',
      component: () => import('@/components/Layout'),
      children:[
        {
          path: 'student',
          name: 'student',
          component: () => import('@/views/teacher/student')
        },
        {//------------------学生管理-----------------
          path: 'student',
          name: 'student',
          component:resolve => require(['@/views/teacher/student'],resolve)
        },
        {//------------------成绩管理-----------------
          path: 'score',
          name: 'score',
          component:resolve => require(['@/views/teacher/score'],resolve)
        },
        {//------------------作业管理-----------------
          path: 'homework',
          name: 'homework',
          component:resolve => require(['@/views/teacher/homework'],resolve)
        },
        {//------------------教师信息----------------
          path: 'information',
          name: 'information',
          component:resolve => require(['@/views/teacher/information'],resolve)
        },
        {//------------------班级管理----------------
          path: 'class',
          name: 'class',
          component:resolve => require(['@/views/teacher/class'],resolve)
        },
        {//------------------校园公告----------------
          path: 'notice',
          name: 'notice',
          component:resolve => require(['@/views/teacher/notice'],resolve)
        },//------------------考试信息----------------
        {
          path: 'examMessage',
          name: 'examMessage',
          component: resolve => require(['@/views/teacher/examMessage'],resolve)
        },//------------------批改作业----------------
        {
          path: 'changWork',
          name: 'changWork',
          component: resolve => require(['@/views/teacher/changWork'],resolve)
        },
      ]
    },
    // ==== 学生端
    {
      path: '/stu',
      name: 'stu',
      component: () => import('@/components/stuLayout'),
      children:[
        {//------------------作业管理-----------------
          path: 'homework',
          name: 'homework',
          component: () => import('@/views/student/homework')
        },
        {//------------------学生管理-----------------
          path: 'score',
          name: 'score',
          component:resolve => require(['@/views/student/score'],resolve)
        },
        {//------------------学生信息----------------
          path: 'information',
          name: 'information',
          component:resolve => require(['@/views/student/information'],resolve)
        },
        {//------------------校园公告----------------
          path: 'notice',
          name: 'notice',
          component:resolve => require(['@/views/student/notice'],resolve)
        },
        {//------------------考试信息----------------
          path: 'exammessage',
          name: 'exammessage',
          component: resolve => require(['@/views/student/exammessage'],resolve)
        },
         {//------------------成绩分析表----------------
          path: 'reportList',
          name: 'reportList',
          component: resolve => require(['@/views/student/reportList'],resolve)
        },
        {//------------------已经批改的作业----------------
          path: 'alreadyHwk',
          name: 'alreadyHwk',
          component: resolve => require(['@/views/student/alreadyHwk'],resolve)
        },
      ]
    },
    // 管理员端
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/components/AdminLayout'),
      children:[
        {//------------------教学管理-----------------
          path: 'education',
          name: 'education',
          component: () => import('@/views/admin/education')
        },
        {
          path: 'notice',
          name: 'notice',
          component: () => import('@/views/admin/notice')
        },
        {
          path: 'acad',
          name: 'acad',
          component: () => import('@/views/admin/acad')
        },
        {
          path: 'grade',
          name: 'grade',
          component: () => import('@/views/admin/grade')
        },
        {
          path: 'clazz',
          name: 'clazz',
          component: () => import('@/views/admin/clazz')
        },
        {
          path: 'teacher',
          name: 'teacher',
          component: () => import('@/views/admin/teacher')
        },
        {
          path: 'student',
          name: 'student',
          component: () => import('@/views/admin/student')
        },
        {
          path: 'course',
          name: 'course',
          component: () => import('@/views/admin/course')
        },
        {
          path: 'exam',
          name: 'exam',
          component: () => import('@/views/admin/exam')
        },
        {
          path: 'editPwd',
          name: 'editPwd',
          component: () => import('@/views/editPwd')
        },
        {
          path: 'PeAnalysis',
          name: 'PeAnalysis',
          component: () => import('@/views/admin/PeAnalysis')
        },
        // {//------------------学生管理-----------------
        //   path: 'score',
        //   name: 'score',
        //   component:resolve => require(['@/views/student/score'],resolve)
        // },
        // {//------------------学生信息----------------
        //   path: 'information',
        //   name: 'information',
        //   component:resolve => require(['@/views/student/information'],resolve)
        // }
      ]
    },
    {
      path:'/register',
      name:'register',
      meta:{  title:'注册'},
      component: () => import('@/views/register')
    }
    
  ]
})
