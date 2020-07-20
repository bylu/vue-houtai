<template>
  <div class="app-container">
    <h3 class="showTit">比赛记录</h3>
    <el-row :gutter="32">
      <el-col :span="24">
        <el-select v-model="selectID" placeholder="选择功能" size="small" v-has="'gameRecord_search'" @change="watchSelect(selectID)" style="margin-left:1%;">
          <el-option
            v-for="(list,index) in selectList.gameRecordSelect"
            :key="index"
            :label="list.value"
            :value="list.key"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <gameRecordModule v-show="gamerecord"></gameRecordModule>
    <baomingModule v-show="baoming"></baomingModule>

  </div>
</template>

<script>
    export default {
        name: "gameRecord",
        components: {
          gameRecordModule: () => import("./gameRecord1"),
          baomingModule: () => import("./baomingRecord.vue")
        },
        data(){
          return{
            selectID:"-1",
            gamerecord:false,
            baoming:false
          }
        },
        methods:{
          watchSelect(val){
             if(val == 1){
                this.gamerecord=true;
                this.baoming=  false;
             }else if(val == 2){
                this.gamerecord=false;
                this.baoming=  true;
             }else{
                this.gamerecord=false;
                this.baoming=  false;
             }
           }
        }
    }
</script>

<style scoped>
</style>
