<template>
  <div>
    <Header></Header>

    <div class="m-blog">
      <h2> {{ blog.title }}</h2>
<!--博客编辑跳转-->
      <el-link icon="el-icon-edit" v-if="isOwnBlog">
        <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}" >
          编辑
        </router-link>
      </el-link>
      <el-divider></el-divider>
<!--博客内容-->
      <div class="markdown-body" v-html="blog.content"></div>

    </div>

  </div>
</template>

<script>
  import 'github-markdown-css'
  import Header from "../components/Header";
  export default {
    name: "BlogDetail.vue",
    components: {Header},
    data() {
      return {
        blog: {
          id: "",
          title: "",
          content: ""
        },
        isOwnBlog: false
      }
    },
    created() {
      const blogId = this.$route.params.blogId
      console.log(blogId)
      const _this = this
      this.$axios.get('/blog/' + blogId).then(res => {
        const blog = res.data.data
        _this.blog.id = blog.id
        _this.blog.title = blog.title

        //导入markdown-it工具，渲染markdown格式的内容
        var MardownIt = require("markdown-it")
        var md = new MardownIt()
        var result = md.render(blog.content)
        _this.blog.content = result

        _this.isOwnBlog = (blog.userId === _this.$store.getters.getUser.id)
      })
    }
  }
</script>

<style scoped>
  .m-blog {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 700px;
    padding: 20px 15px;
  }
</style>