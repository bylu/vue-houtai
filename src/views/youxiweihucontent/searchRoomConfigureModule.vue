<template>
    <div style="width:100%;float:left;height:540px;margin-top:-20px;max-height:1000px">
        <div style="width:49%;float:left;border-right:1px solid #CDCDCD">
          <el-form label-width="100px"  class="demo-ruleForm">
            <el-form-item lable=" "></el-form-item>
            <el-form-item lable=" "></el-form-item>
            <el-form-item lable=" "></el-form-item>
            <el-form-item lable=" "></el-form-item>
            <el-form-item label="当前配置信息"  prop="desc">
                <div class="showtextarea" id="currentConfig" ></div>
            </el-form-item>
          </el-form>
        </div>
        <div style="width:50%;float:left;">
          <el-form label-width="100px"  class="demo-ruleForm">
              <el-form-item label="请选择时间"  prop="editdate" style="width:350px; float:left;margin-left:0">
                  <el-select v-model="form.editdata" @change="selectTrigger(form.editdata)" size="small" placeholder="请选择">
                      <el-option  v-for="(list2,i) in listdate" :key="i" :label="list2.operateTime" :value="list2.id"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="操作人"  prop="people" style="width:150px;float:left;margin-left:0">
                <el-input v-model="form.people" size="small" readonly="" autocomplete="off" style="width:150px;"></el-input>
              </el-form-item>
              <el-form-item label="配置信息"  prop="historydesc">
                 <div class="showtextarea" id="historyConfig" ></div>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button type="danger" size="small"  @click="cancel">取消</el-button>
              <el-button  size="small" type="warning" @click="btnhistoryConfiguration">恢复历史配置</el-button>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "",
  props: ['getdata'],
  data() {
    return {
        loading: false,
        desc:'',
        getdesc:'',
        form: {
            editdata:'',
            people:'',
            historydesc: '',
        },
        listdate:'',
        getserverid:'',
        serversid:this.getdata.serversid,
    };
  },
  mounted(){
    this.initSearch();
    this.initDate();
  },
  methods: {
    /**
     * 查询左侧的数据
     */
    initSearch(){
      let param={
        serverid:this.getdata.serverID,
        configType:"serverConfig"
      }
      this.$api.serverRoomInfoManagegetConfig(param).then(res =>{
        this.loading = false;
        if (res.success) {
          if(res.data == null){
            this.desc="";
          }else{
           this.getserverid=res.data.serverid;
           this.getdesc=res.data.configInfo;
            let currentConfigArry=(res.data.configInfo).trim().split("\n");
            let objdata=$("#currentConfig");
             $.each(currentConfigArry,function(key,data){
               var trObj = $("<div/>");
                trObj.append(data);
                trObj.appendTo("#currentConfig");
            });
          }
        }else{
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
    /**
     * 查询右侧的时间
     */
    initDate(){
      let param={
        serverId:this.getdata.serverID,
      }
      this.$api.serverRoomInfoManagegetOperateTime(param).then(res =>{
        this.loading = false;
        if (res.success) {
          this.listdate=res.data;
        }else{
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
    //取消按钮操作
    cancel() {
        this.$emit('closedialog');
    },
    /**
     * 时间选择触发
     */
    selectTrigger(val){
      let param={
        logId:val
      }
      this.$api.serverRoomInfoManagegetHistoryConfig(param).then(res =>{
        this.loading = false;
        if (res.success) {
          if(res.data == null){
            this.form.historydesc="";
          }else{
            this.form.people=res.data.operator;
            this.form.historydesc=res.data.serverConfigInfo;
            this.logId=res.data.id;
            let serverConfig = res.data.serverConfigInfo;
            let historylineArry = serverConfig.trim().split("\n");
            let currentlineArry= (this.getdesc).trim().split("\n");
            $("#historyConfig").html(" ");
            for(var i = 0; i < historylineArry.length; i++){
                if(typeof(currentlineArry[i]) == 'undefined'){
                    $("#historyConfig").append("<div style='background-color:yellow'>" + historylineArry[i].trim() + "</div>");
                }else if(currentlineArry[i].trim() != historylineArry[i].trim()){
                    $("#historyConfig").append("<div style='background-color:yellow'>" + historylineArry[i].trim() + "</div>");
                }else{
                    $("#historyConfig").append("<div>" + historylineArry[i].trim() + "</div>");
                }
            }
          }
        }else{
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
    //恢复历史配置
    btnhistoryConfiguration(){
       let param={
        serverid:this.getserverid,
        serversid:this.serversid,
        configType:"serverConfig",
        configInfo:this.form.historydesc,
        logId:this.logId,
        opType:"1"
      }
      this.$api.serverRoomInfoManageupdateConfig(param).then(res =>{
        this.loading = false;
        if (res.success) {
          this.$message({
            dangerouslyUseHTMLString: true,
            message: "<p>"+res.message+"</p>",
            type: "success"
          });
          this.$emit('shuaxin');
          this.$emit('closedialog');
        }else{
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
  }
};
</script>

<style scoped>
.el-form{
  width:100%;
  float: left;
  margin:5% 0;
}
.el-form-item{
  width:80%;
  float: left;
  margin-left:8%;
  margin-bottom:20px;
}
.showtextarea{
  width:100%;
  float: left;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
