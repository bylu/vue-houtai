<template>
  <!-- <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb> -->
  <el-breadcrumb class="el-breadcrumb el-breadcrumb app-breadcrumb breadcrumb-container" id="breadcrumb-container" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="index==levelList.length-1" class="no-redirect">{{ item.name }}</span>
        <span v-else >{{ item.name }}</span><!--@click.prevent="handleLink(item)"-->
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
 import * as pathToRegexp from 'path-to-regexp'
export default {
  name: 'nxBreadcrumb',
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    // getBreadcrumb() {
    //   let matched = this.$route.matched.filter(item => item.name)
    //   const first = matched[0]
    //   if (first && first.name !== 'dashboard') {
    //     matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
    //   }
    //   this.levelList = matched
    // }
     getBreadcrumb(){
        let matched = this.$route.matched.filter(item => item.path && item.name)
        const first = matched[0]
        if (!this.isDashboard(first)) {
          matched = [{ path: '', name:'首页'}].concat(matched)
        }
        this.levelList = matched;
      },
      isDashboard(route) {
        const name = route && route.name
        if (!name) {
          return false
        }
        return name.trim() === '首页'
      },
      pathCompile(path) {
        // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
        const { params } = this.$route
        var toPath = pathToRegexp.compile(path)
        return toPath(params)
      },
      handleLink(item) {
        const { redirect, path } = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(item.path))
      }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
