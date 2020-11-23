<template>
  <div class="m-content">
    <h3>欢迎来到Kandoka的博客</h3>
<!--头像和用户名-->
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"></el-avatar>
      <div>{{ user.username }}</div>
    </div>
<!--按钮-->
    <div class="m-action">
      <span><el-link href="/blogs">主页</el-link></span>
      <el-divider direction="vertical"></el-divider>
      <span><el-link type="success" href="/blog/add">发表博客</el-link></span>
      <el-divider direction="vertical"></el-divider>
<!--已登录时显示登出按钮，否则显示登录按钮-->
      <span v-show="!hasLogin"><el-link type="primary" href="/login">登录</el-link></span>
      <span v-show="hasLogin"><el-link type="danger" @click="logout">退出</el-link></span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        user: {
          username: '请先登录',
          avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        },
        hasLogin: false
      }
    },
    methods: {
      /**
       * 登出
       */
      logout() {
        const _this = this
        _this.$axios.get("/logout", {
          headers: {//因为后端的登出需要认证，所以这里添加认证信息到请求头
            "Authorization": localStorage.getItem("token")
          }
        }).then(res => {//退出后清除用户信息，并且重定向到登录界面
          _this.$store.commit("REMOVE_INFO")
          _this.$router.push("/login")
        })
      }
    },
    created() {
      if(this.$store.getters.getUser.username) {//不为空时用户信息回显
        this.user.username = this.$store.getters.getUser.username
        this.user.avatar = this.$store.getters.getUser.avatar
        this.hasLogin = true
      }
    }
  }
</script>

<style scoped>
  .m-content {
    max-width: 960px;
    margin: 0 auto;
    text-align: center;
  }
  .m-action {
    margin: 10px 0;
  }
</style>