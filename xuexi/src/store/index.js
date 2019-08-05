import Vue from 'vue'
import Vuex from "Vuex"
 Vue.use(Vuex)
export default new Vuex.Store({
  //存放所有的属性
  state:{
    //获取到后台列表所有数据
    listData: [],
    //列表分页过滤列表数据
    listDates:[],
    //获取到后台标题所有数据
    topicDate:[],
    //获取到标题所有分页数据
    topicDates:[],
    //获取到后台文章所有数据
    articleDate:[],
    //获取到后台文章分页数据
    articleDates:[],

    //前台数据的展示
    getListData:[],


    //列表分页器
    pageOne:0,
    pagess:0
  },
  //触发的同步函数
  mutations:{
    listClick(state,listData){
      state.listData = listData
    },
    topicClick(state,data){
      state.topicDate = data
    },
    articleClick(state,data){
      state.articleDate = data
    },
    //右边分页
    pageClickRigh(state,con){
      let {zData,page,dDates} = con
      //把数组存起来
      let  Arraydate = state[zData]
      //当前页数
      let pagea = page
      //总页数
      let listDatae = Math.ceil((Arraydate.length/5))
      let pagezong = listDatae -1;
      pagea =  pagezong<=pagea?pagezong:pagea;
      //初始页
      let pagee = pagea * 5
      let date = []
      for(let i=pagee;i<pagee+5;i++){
        if(Arraydate[i]){
          let listDataOne = Arraydate[i];
          date.push(listDataOne)
        }
      }
      state.pageOne = pagea
      state.pagess = listDatae
      state[dDates] = date;
    },
    //左边分页
    pageClickLeft(state,con){
      let {zData,page,dDates} = con
      let Arraydate = state[zData];
      //当前页数
      let pagea = page -1
      //总页数
      let listDatae = Math.ceil((Arraydate.length/5))
      //初始页数
      let pagechu = 0;
      pagea =  pagechu>=pagea?pagechu:pagea;
      //初始页
      let pagee = pagea * 5
      let date = []
      for(let i=pagee;i<pagee+5;i++){
        if(Arraydate[i]){
          let listDataOne = Arraydate[i];
          date.push(listDataOne)
        }
      }
      state.pageOne = pagea
      state.pagess = listDatae
      state[dDates] = date;
    },

    //首页标题数据
    getListData(state,topicData){
      state.getListData = topicData
    }
  },
})
