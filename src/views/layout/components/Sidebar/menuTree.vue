<template>
  <div>
    <template v-for="(child,index1) in menuData">
      <!-- <el-menu-item-group> -->
        <router-link :to="{path:child.link}" >
          <el-menu-item  :index="child.link">
            <template slot="title">
              <i :class="child.icon" class="svg-icon"></i>
              <span slot="title">{{child.title}}</span>
            </template>
          </el-menu-item>
        </router-link>
      <!-- </el-menu-item-group> -->
    </template>
  </div>
</template>

<script>
export default {
  name: "menuTree",
  props: ["menuData"]
};
</script>

<style scoped>
</style>
