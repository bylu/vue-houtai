<template>
  <div class="app-container">
    <h3 class="showTit">游戏管理</h3>
    <el-row :gutter="32" style="margin-bottom:10px">
        <el-col>
            <el-button type="primary" size="small" v-has="'gameInfo_game'"  @click="gameServiceClick(1)">游戏管理</el-button>
            <el-button type="danger"  size="small" v-has="'gameInfo_type'"  @click="typeServiceClick(1)">类型管理</el-button>
            <el-button type="success" size="small" v-has="'gameInfo_model'"  @click="moduleServiceClick(1)">模块管理</el-button>
        </el-col>
    </el-row>
    <el-row  v-show="gameServicetable">
      <el-col :span="24">
        <el-button type="primary" size="small" plain="" v-has="'gameInfo_add'"  @click="formdata='',showgameServicedialog=true,isAdd=true" style="margin-bottom:10px;">增加游戏</el-button>
        <el-table class="maintable"  :data="gameServicetableData" tooltip-effect="dark" border style="width: 100%" >
          <el-table-column prop="kindID" label="游戏标识" width="100"></el-table-column>
          <el-table-column prop="kindName" label="游戏名称" width="120"></el-table-column>
          <el-table-column prop="typeID" label="游戏类型" width="50"></el-table-column>
          <el-table-column prop="joinID" label="父节点" width="50"></el-table-column>
          <el-table-column prop="sortID" label="排序" width="50"></el-table-column>
          <el-table-column prop="processName" label="进程名字" ></el-table-column>
          <el-table-column prop="gameRuleUrl" label="规则路径" ></el-table-column>
          <el-table-column prop="downLoadUrl" label="下载路径" ></el-table-column>
          <el-table-column prop="nullity" label="禁用状态" width="50">
             <template slot-scope="scope">
              {{scope.row.nullity | nullityCheck}}
            </template>
          </el-table-column>
          <el-table-column label="操作"  width="180">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" style="margin-bottom:0px;" v-has="'gameInfo_update'"  @click="formdata=scope.row,showgameServicedialog=true,isAdd=false">编辑</el-button>
                <el-popover :ref="scope.row.kindID" placement="top" width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="$refs[scope.row.kindID].doClose()">取消</el-button>
                        <el-button type="primary" size="mini" @click="subDeletegame(scope.row.kindID)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" style="margin-bottom:0px;" v-has="'gameInfo_delete'"  size="mini">删除</el-button>
                </el-popover>
            </template>
          </el-table-column>
        </el-table>
        
        <div class="showpaginationbody">
        <div class="currentTotal">
            {{currentTotal}}<span class="showtotal">/{{total}}</span>
        </div>
        <el-pagination
            @current-change="handleCurrentChangeGame"
            :current-page="currentPage"
            :page-sizes="[30]"
            :page-size="pagesize"
            layout="total,prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
        </div>
      </el-col>
    </el-row>

    <el-row  v-show="typeServicetable">
      <el-col :span="24">
        <el-button type="danger" size="small" plain v-has="'gameInfo_add'"  @click="formdata=' ',showtypeServicedialog=true,isAdd=true" style="margin-bottom:10px;">增加类型</el-button>
        <el-table class="maintable"  :data="typeServicetableData" tooltip-effect="dark" border style="width: 100%">
          <el-table-column prop="typeID" label="类型标识" ></el-table-column>
          <el-table-column prop="typeName" label="类型名称"></el-table-column>
          <el-table-column prop="joinID" label="挂接点"></el-table-column>
          <el-table-column prop="sortID" label="排序"></el-table-column>
          <el-table-column prop="nullity" label="禁用状态">
            <template slot-scope="scope">
              {{scope.row.nullity | nullityCheck}}
            </template>
          </el-table-column>
          <el-table-column label="操作"  width="180">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" style="margin-bottom:0px;" v-has="'gameInfo_update'"  @click="formdata=scope.row,showtypeServicedialog=true,isAdd=false">编辑</el-button>
                <el-popover :ref="scope.row.typeID" placement="top" width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="$refs[scope.row.typeID].doClose()">取消</el-button>
                        <el-button type="primary" size="mini" @click="subDeleteType(scope.row.typeID)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" style="margin-bottom:0px;" v-has="'gameInfo_delete'"  size="mini">删除</el-button>
                </el-popover>
            </template>
          </el-table-column>
        </el-table>
         
        <div class="showpaginationbody">
        <div class="currentTotal">
            {{currentTotal}}<span class="showtotal">/{{total}}</span>
        </div>
        <el-pagination
            @current-change="handleCurrentChangeType"
            :current-page="currentPage"
            :page-sizes="[30]"
            :page-size="pagesize"
            layout="total,prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
        </div>
      </el-col>
    </el-row>

    <el-row  v-show="moduleServicetable">
      <el-col :span="24">
        <el-button type="success" size="small" plain="" v-has="'gameInfo_add'"  @click="formdata=' ',showmoduleServicedialog=true,isAdd=true" style="margin-bottom:10px;">增加模块</el-button>
        <el-table class="maintable"  :data="moduleServicetableData" tooltip-effect="dark" border style="width: 100%">
          <el-table-column prop="gameID" label="模块标识"></el-table-column>
          <el-table-column prop="gameName" label="模块名称"></el-table-column>
          <el-table-column prop="serverVersion" label="服务器版本"></el-table-column>
          <el-table-column prop="clientVersion" label="客户端版本"></el-table-column>
          <el-table-column prop="dataBaseAddr" label="数据库地址"></el-table-column>
          <el-table-column prop="dataBaseName" label="数据库名称"></el-table-column>
          <el-table-column label="操作"  width="180">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" style="margin-bottom:0px;" v-has="'gameInfo_update'"  @click="formdata=scope.row,showmoduleServicedialog=true,isAdd=false">编辑</el-button>
                <el-popover :ref="scope.row.gameID" placement="top" width="180">
                    <p>确定删除本条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="$refs[scope.row.gameID].doClose()">取消</el-button>
                        <el-button type="primary" size="mini" @click="subDeletemodule(scope.row.gameID)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" style="margin-bottom:0px;" v-has="'gameInfo_delete'" size="mini">删除</el-button>
                </el-popover>
            </template>
          </el-table-column>
        </el-table>
        
        <div class="showpaginationbody">
        <div class="currentTotal">
            {{currentTotal}}<span class="showtotal">/{{total}}</span>
        </div>
        <el-pagination
            @current-change="handleCurrentChangeModule"
            :current-page="currentPage"
            :page-sizes="[30]"
            :page-size="pagesize"
            layout="total,prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
        </div>
      </el-col>
    </el-row>

    <!--新增游戏模块和编辑游戏 弹框-->
    <pcModal v-if="showgameServicedialog" :xs="8" :sm="8" :lg="2" :title="isAdd ? '新增游戏' : '编辑游戏'" @closeModal="showgameServicedialog = false">
        <addgameserviceModule :getdata="formdata" :isAdd="isAdd" @shuaxin="gameServiceClick(1)"  @closedialog="showgameServicedialog = false"></addgameserviceModule>
    </pcModal>

    <!--新增类型和编辑类型 弹框-->
    <pcModal v-if="showtypeServicedialog" :xs="8" :sm="8" :lg="2" :title="isAdd ? '新增类型' : '编辑类型'" @closeModal="showtypeServicedialog = false">
        <addtypeserviceModule :getdata="formdata" :isAdd="isAdd" @shuaxin="typeServiceClick(1)"  @closedialog="showtypeServicedialog = false"></addtypeserviceModule>
    </pcModal>

     <!--新增模块和编辑模块 弹框-->
    <pcModal v-if="showmoduleServicedialog" :xs="8" :sm="8" :lg="2" :title="isAdd ? '新增模块' : '编辑模块'" @closeModal="showmoduleServicedialog = false">
        <addmoduleserviceModule :getdata="formdata" :isAdd="isAdd" @shuaxin="moduleServiceClick(1)"  @closedialog="showmoduleServicedialog = false"></addmoduleserviceModule>
    </pcModal>


  </div>
</template>

<script>
    import { MessageBox } from 'element-ui'
    export default {
        name: "gameInfo",
        components: {
            addgameserviceModule:() => import('./addgameserviceModule.vue'),
            addtypeserviceModule:() => import('./addtypeserviceModule.vue'),
            addmoduleserviceModule:() => import('./addmoduleserviceModule.vue')
        },
        data(){
            return{
                currentPage: 1, //初始页
                pagesize: 30, //    每页的数据
                total: 0,
                currentTotal:0,
                gameServicetable:true,
                typeServicetable:false,
                moduleServicetable:false,
                gameServicetableData: [],
                typeServicetableData:[],
                moduleServicetableData:[],
                showgameServicedialog:false,
                showtypeServicedialog:false,
                showmoduleServicedialog:false,
            }
        },
        mounted(){
          this.typeServiceClick(1);
          this.gameServiceClick(1);
        },
        methods:{
            gameServiceClick(pageNum){
                this.gameServicetable=true;
                this.typeServicetable=false;
                this.moduleServicetable=false;
                this.loading = true;

                let params = {
                    currentPage: pageNum,
                    limit: this.pagesize
                };
                this.$api.gameInfosearchGameGame(params).then(res =>{
                  this.loading = false;
                  if (res.success) {
                    this.gameServicetableData = res.data.records;
                    this.total = res.data.total; //size
                    this.pagesize=res.data.size;
                    this.currentPage = res.data.current;
                    this.currentTotal=(this.currentPage) * (this.pagesize)
                    if(this.currentTotal > this.total){
                      this.currentTotal = this.total
                    }else{
                      this.currentTotal=(this.currentPage) * (this.pagesize)
                    }
                  } else {
                    this.$message({
                      message: res.message,
                      type: "error"
                    });
                  }
                }).catch(err =>{
                  this.$message({
                    message: '请求失败!',
                    type: "error"
                  });
                })
            },
            handleCurrentChangeGame: function(currentPage) {
                this.currentPage = currentPage;
                this.gameServiceClick(currentPage);
            },
            subDeletegame: function(id) {
              let param= { kindID: id }
              this.$api.gameInfodelGameGame(param).then(res =>{
                if (res.success) {
                  this.gameServiceClick(1);
                    this.$notify({
                        title: res.message,
                        type: "success",
                        duration: 2500
                    });
                } else {
                    this.$notify({
                        title: res.message,
                        type: "error",
                        duration: 2500
                    });
                }
              }).catch(err =>{
                this.$message({
                  message: '请求失败!',
                  type: "error"
                });
              })
            },
            typeServiceClick(pageNum){
                this.gameServicetable=false;
                this.typeServicetable=true;
                this.moduleServicetable=false;
                this.loading = true;

                let params = {
                    currentPage: pageNum,
                    limit: this.pagesize
                };
                this.$api.gameInfosearchGameType(params).then(res =>{
                  this.loading = false;
                  if (res.success) {
                    this.typeServicetableData = res.data.records;
                    this.$store.commit('setObject',JSON.stringify(res.data.records));
                    this.total = res.data.total; //size
                    this.pagesize=res.data.size;
                    this.currentPage = res.data.current;
                    this.currentTotal=(this.currentPage) * (this.pagesize)
                    if(this.currentTotal > this.total){
                      this.currentTotal = this.total
                    }else{
                      this.currentTotal=(this.currentPage) * (this.pagesize)
                    }
                  } else {
                    this.$message({
                      message: res.message,
                      type: "error"
                    });
                  }
                }).catch(err =>{
                  this.$message({
                    message: '请求失败!',
                    type: "error"
                  });
                })
            },
            subDeleteType: function(id) {
              let param={ typeID: id };
              this.$api.gameInfodelGameType(param).then(res =>{
                if (res.success) {
                  this.typeServiceClick(1);
                  this.$notify({
                    title: res.message,
                    type: "success",
                    duration: 2500
                  });
                } else {
                  this.$notify({
                    title: res.message,
                    type: "error",
                    duration: 2500
                  });
                }
              }).catch(err =>{
                this.$message({
                  message: '请求失败!',
                  type: "error"
                });
              })
            },
            handleCurrentChangeType: function(currentPage) {
                this.currentPage = currentPage;
                this.typeServiceClick(currentPage);
            },
            moduleServiceClick(pageNum){
                this.gameServicetable=false;
                this.typeServicetable=false;
                this.moduleServicetable=true;

                let params = {
                    currentPage: pageNum,
                    limit: this.pagesize
                };
                this.$api.gameInfosearchGameModel(params).then(res =>{
                  this.loading = false;
                  if (res.success) {
                    this.moduleServicetableData = res.data.records;
                    this.total = res.data.total; //size
                    this.pagesize=res.data.size;
                    this.currentPage = res.data.current;
                    this.currentTotal=(this.currentPage) * (this.pagesize)
                    if(this.currentTotal > this.total){
                      this.currentTotal = this.total
                    }else{
                      this.currentTotal=(this.currentPage) * (this.pagesize)
                    }
                  } else {
                    this.$message({
                      message: res.message,
                      type: "error"
                    });
                  }
                }).catch(err =>{
                  this.$message({
                    message: '请求失败!',
                    type: "error"
                  });
                })
            },
            subDeletemodule: function(id) {
              let param={ gameID: id }
              this.$api.gameInfodelGameModel(param).then(res =>{
                if (res.success) {
                  this.moduleServiceClick(1);
                    this.$notify({
                        title: res.message,
                        type: "success",
                        duration: 2500
                    });
                } else {
                    this.$notify({
                        title: res.message,
                        type: "error",
                        duration: 2500
                    });
                }
              }).catch(err =>{
                this.$message({
                  message: '请求失败!',
                  type: "error"
                });
              })
            },
            handleCurrentChangeModule: function(currentPage) {
                this.currentPage = currentPage;
                this.moduleServiceClick(currentPage);
            },
        }
    }
</script>

<style scoped>
  .maintable{
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
  }
</style>
