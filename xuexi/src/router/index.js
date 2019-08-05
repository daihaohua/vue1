import Vue from 'vue'
import Router from 'vue-router'
import Mian from "@/components/mian/Mian"
import NavLeft from "@/components/mian/sidebar/NavLeft"
import Admin from "@/components/admin/Admin"
import List from "@/components/admin/Close/List"
import ClassIfy from "@/components/admin/Close/classify/ClassIfy"
import Article from "@/components/admin/Close/article/Article"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mian',
      component: Mian,
      children:[
        {
          path:"/mian/:id",
          name: 'NavLeft',
          component:NavLeft,
        },
        // {
        //   path:"/mian/:type/:types",
        //   name: 'NavLeft',
        //   component:NavLeft,
        // }
      ]
    },
    {
      path:"/admin",
      name:"admin",
      component: Admin,
      children:[
        {
          path:"/admin/",
          name: 'List',
          component:List,
        },
        {
          path:"/admin/classify",
          name: 'classify',
          component:ClassIfy,
        },
        {
          path:"/admin/article",
          name: 'Article',
          component:Article,
        },
      ]
    }
  ]
})
