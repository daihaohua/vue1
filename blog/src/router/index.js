import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/mian/Index'
import Details from '@/components/mian/base/Details'
import All from '@/components/mian/base/All'
import ClassIfy from '@/components/mian/base/ClassIfy'
import Login from '@/components/mian/base/Login'
import Reg from '@/components/mian/base/Reg'
import Admin from '@/components/admin/Admin'
import User from '@/components/admin/base/User'
import ClassifiCation from '@/components/admin/base/ClassifiCation'
import Artecle from '@/components/admin/base/Artecle'
import Prevent from '@/components/Prevent'
import AddClass from '@/components/admin/base/AddClass'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Index,
      redirect: '/mian/classify/all',
      children:[
        {
          path:"/mian/details/:id",
          name: 'details',
          component: Details,
        },
        {
          path: '/mian/classify/:id',
          name: 'classify',
          component: ClassIfy,
        }
      ]
    },
    {
      path: '/index/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/index/reg',
      name: 'reg',
      component: Reg,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: '/admin/user',
          name: 'user',
          component: User,
        },
        {
          path: '/admin/classification',
          name: 'classification',
          component: ClassifiCation,
        },
        {
          path: '/admin/artecle',
          name: 'all',
          component: Artecle,
        },
      ]
    },
    {
      path:"/prevent",
      name:"prevent",
      component:Prevent,
    },
    {
      path:"/admin/addClass",
      name:"addClass",
      component:AddClass,
    }
  ]
})
