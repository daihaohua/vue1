import Vue from 'vue'
import Vuex from "Vuex"
Vue.use(Vuex)

export default new Vuex.Store({
  //属性
  state:{
    userInfo:{},
    isImgs:true
  },
  //同步函数
  mutations:{
    loginDate(state,userInfo){
      state.userInfo = userInfo;
    },
    handelIsImg(state,isImgs){
      state.isImgs = isImgs;
    }
  },
  //放置异步函数
  actions:{

  },
  //计算属性
  getters:{

  }
})
