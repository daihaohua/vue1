<template id="">
    <div
      v-loading="loading">
        <div id="details">
          <h1>{{artecleDate.title}}</h1>
          <p>
            <span class="author">作者：</span>{{username}}
            <span class="author date">时间:</span>{{artecleDate.updatedAt}}
            <span  class="author date">评论数:</span>{{commentss.length}}
            <span  class="author date">阅读量:</span>{{artecleDate.hits}}
          </p>
          <div id="content">
              {{artecleDate.content}}
          </div>
        </div>
        <div id="comment">
          <div id="comment-top">
            <el-input
              type="textarea"
              id="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="comment">
            </el-input>
            <el-button type="primary" @click="comments">提交评论</el-button>
          </div>
          <el-alert
            v-for="(item,index) in commentss"
            :key="index"
            :title="item.userInfo"
            type="success"
            :description="item.comment"
            show-icon>
          </el-alert>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Details",
        data(){
            return{
              artecleDate:{},
              username:"",
              comment:'',
              commentss:[],
              hits:0,
              loading:true
            }
        },
        async activated(){
          this.loading = true;
          let key = this.$route.path;
          let {data} = await this.$axios.get("/api"+key);
          this.artecleDate = data;
          this.commentss = data.comment;
          setTimeout(()=>{
            this.loading = false;
          },400)

        },
        methods:{
          getDate(){},
          async comments(){
            if(this.comment === ""){
              this.$message.info('评论不能为空');
              return;
            }
            if(!this.$store.state.userInfo.username){//登录了，可以评论
              this.$message.error('你还没有登录不可以评论哦');
              this.$router.push("/index/login");
              return;
            }
            let {data} = await this.$axios.post("/api/mian/details/comment",
              {comment:this.comment,_id:this.artecleDate._id});
            this.commentss = data.comment;
          }
        }
    }
</script>

<style scoped>
#details{
  width:1100px;
  background-color: rgb(84, 92, 100);
  color: azure;
}
#details>h1{
  text-align:center;
}
#details>p{
  width:700px;
  margin: auto;
}
#details>#content{
  width:900px;
  margin: auto;
}
#comment-top{
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
}
.date{
    margin-left: 30px;
  }
.author{
    font-size: 20px;
  }
#comment{
    padding: 20px;
  }
</style>
