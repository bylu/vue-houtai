<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <logo :isCollapse="isCollapse"></logo> <!-- :default-active="$route.path"-->
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="defaultActive"
      :collapse="isCollapse"
      background-color="rgb(48, 65, 86)"
      text-color="#fff"
      active-text-color="rgb(64, 158, 255)"
      :unique-opened="$store.getters.uniquerouter"
      :collapse-transition="true"
    >
      <sidebar-item></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import logo from './logo'
export default {
  components: { SidebarItem, logo },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routers'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    defaultActive(){
      return '/'+this.$route.path.split('/').reverse()[0];
    }
  },
  data(){
    return{
      activeNav:'1'
    }
  },
}
</script>
