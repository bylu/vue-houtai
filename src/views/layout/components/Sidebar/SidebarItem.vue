<template>
  <div class="menu-wrapper">
        <template v-for="item in menuItems">
          <el-submenu v-if="item.children.length > 0" :index="item.menuId">
            <template slot="title">
              <i :class="item.icon" class="svg-icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <menu-tree :menuData="item.children"></menu-tree>
          </el-submenu>
          <template v-else>
            <router-link :to="{path:'{{item.link}}'}" >
            <el-menu-item :index="item.menuId" >
            <!--active-class="is-active"-->
              <i :class="item.icon" class="svg-icon"></i>
              <span slot="title">{{item.title }}</span>
            
          </el-menu-item>
          </router-link>
          </template>
        </template>
  </div>
</template>

<script>
import menuTree from "./menuTree";
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
   data() {
    return {
      menuItems: [],
    };
  },
  components: {
    menuTree
  },
  mounted() {
    let menu = localStorage.getItem('userMenu');
    if ("" != menu && undefined != menu) {
      this.menuItems = JSON.parse(menu);
    } else {
      this.menuItems = [];
    }
  },
  methods: {
    // hasOneShowingChildren(children) {
    //   const showingChildren = children.filter(item => {
    //     return !item.hidden
    //   })
    //   if (showingChildren.length === 1) {
    //     return true
    //   }
    //   return false
    // }
  },
  created() {
    // for (const o in this.routes) {
    //   const obj = this.routes[o]
    //   if (obj.path.indexOf('myiframe') >= 0) {
    //     obj.children[0].path = 'urlPath?src=https://www.baidu.com'
    //   }
    // }
  }
}
</script>
