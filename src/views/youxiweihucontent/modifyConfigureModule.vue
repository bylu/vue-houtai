<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" class="demo-ruleForm">
        <div style="margin-bottom:10px;">
          <span>房间ID:</span><label v-html="roomid" style="color:red"></label>
          <span style="margin-left:15px">房间名称：</span><label v-html="roomname" style="color:red"></label>
        </div>
        <el-form-item  prop="configInfo" style="margin-bottom:0px;">
          <el-input v-model="form.configInfo" :readonly="status ? false : 'readonly'" type="textarea" style="width:430%;float:left;" :autosize="{ minRows: 28, maxRows: 28}" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" size="small"  @click="cancel">取消</el-button>
      <el-button  size="small" type="primary" :disabled="btnChangeEnable" @click="sameChannelConfiguration">配置同渠道</el-button>
      <el-button  size="small" type="success" :disabled="btnChangeEnable" @click="btnConfigurationAll">配置全部</el-button>
      <el-button  size="small" type="warning" @click="btnConfiguration">保存配置</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata','typeid'],
  data() {
    return {
        loading: false,
        form: {
          configInfo: ''
        },
        rules: {
            configInfo: [
                { required: true, message: '填写配置', trigger: 'blur' }
            ]
        },
        roomid:'',
        roomname:'',
        btnChangeEnable:true,
        status:true
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      let configTypeParams="";
       if(this.typeid == 1){ //修改房间配置
            configTypeParams="serverConfig"
        }
        if(this.typeid == 2){ //修改机器人配置
            configTypeParams="androidConfig"
        }
        if(this.typeid == 3){  //道具掉落配置
            configTypeParams="propDrop"
        }
      this.roomid=this.getdata.serverID;
      this.roomname=this.getdata.serverName;
      let param={
        serverid:this.getdata.serverID,
        configType:configTypeParams
      }
      this.$api.serverRoomInfoManagegetConfig(param).then(res =>{
        this.loading = false;
        if (res.success) {
          if(res.data.configInfo == null){
            this.form.configInfo="";
          }else{
            if(res.data.configType == "propDrop"){
              this.form.configInfo=this.formatJson(res.data.configInfo).trim();
            }else{
              this.form.configInfo=(res.data.configInfo).trim();
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
    //取消按钮操作
    cancel() {
        this.resetForm();
        this.$emit('closedialog');
    },
    //保存配置
    btnConfiguration(){
     this.$refs["form"].validate(valid => {
        if (valid) {
          let configTypeParams="";
          if(this.typeid == 1){ //修改房间配置
                configTypeParams="serverConfig"
            }
            if(this.typeid == 2){ //修改机器人配置
                configTypeParams="androidConfig"
            }
            if(this.typeid == 3){  //道具掉落配置
                configTypeParams="propDrop"
            }

          let param={
            serverid:this.getdata.serverID,
            serversid:this.getdata.serversid,
            configType:configTypeParams,
            configInfo:this.form.configInfo
          }
          this.$api.serverRoomInfoManageupdateConfig(param).then(res =>{
            this.loading = false;
            if (res.success) {
              this.resetForm();
              this.$message({
                dangerouslyUseHTMLString: true,
                message: "<p>"+res.message+"</p>",
                type: "success"
              });
              this.$emit('shuaxin');
              //this.$emit('closedialog');
              this.btnChangeEnable=false;
              this.form.configInfo=(res.data).trim();
              if(res.params =="androidConfig"){
                this.btnChangeEnable = true
              }
                this.status=true;
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
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["form"].resetFields();
    },
    //配置同渠道
    sameChannelConfiguration(){
      this.$confirm('此操作将当前配置应用于所有同渠道房间，确认执行？', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        let configTypeParams="";
        if(this.typeid == 1){ //修改房间配置
          configTypeParams="serverConfig"
        }
        if(this.typeid == 2){ //修改机器人配置
          configTypeParams="androidConfig"
        }
        if(this.typeid == 3){  //道具掉落配置
          configTypeParams="propDrop"
        }
        let param={
          type:'1',
          configInfo:this.form.configInfo,
          serverid:this.getdata.serverID,
          serversid:this.getdata.serversid,
          configType: configTypeParams
        }
        this.$api.serverRoomInfoManageupdateConfigForAll(param).then(res =>{
          this.loading = false;
          if (res.success) {
            this.$message({
              dangerouslyUseHTMLString: true,
              showClose: true,
              message: "<p>"+res.message+"</p>",
              type: 'success'
            });
            this.$emit('shuaxin');
            this.$emit('closedialog');
          }else{
            this.$message({
              showClose: true,
              message: res.message,
              type: 'error'
            });
            this.$emit('closedialog');
          }
        }).catch(err =>{
          this.$message({
            message: '请求失败!',
            type: "error"
          });
        })
      }).catch(e=>e);
    },
    //配置全部
    btnConfigurationAll(){
      this.$confirm('此操作将当前配置应用于所有房间，确认执行？', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        let configTypeParams="";
        if(this.typeid == 1){ //修改房间配置
          configTypeParams="serverConfig"
        }
        if(this.typeid == 2){ //修改机器人配置
          configTypeParams="androidConfig"
        }
        if(this.typeid == 3){  //道具掉落配置
          configTypeParams="propDrop"
        }
        let param={
          type:'0',
          configInfo:this.form.configInfo,
          serverid:this.getdata.serverID,
          serversid:this.getdata.serversid,
          configType: configTypeParams
        }
        this.$api.serverRoomInfoManageupdateConfigForAll(param).then(res =>{
           this.loading = false;
          if (res.success) {
            this.$message({
              dangerouslyUseHTMLString: true,
              showClose: true,
              message: "<p>"+res.message+"</p>",
              type: 'success'
            });
            this.$emit('shuaxin');
            this.$emit('closedialog');
          }else{
            this.$message({
              showClose: true,
              message: res.message,
              type: 'error'
            });
            this.$emit('closedialog');
          }
        }).catch(err =>{
          this.$message({
            message: '请求失败!',
            type: "error"
          });
        })
      }).catch(e=>e);
    },
    //格式化Json
    formatJson(json, options) {
      var reg = null,
          formatted = '',
          pad = 0,
          PADDING = '    '; // one can also use '\t' or a different number of spaces

      // optional settings
      options = options || {};
      // remove newline where '{' or '[' follows ':'
      options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
      // use a space after a colon
      options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

      // begin formatting...
      if (typeof json !== 'string') {
          // make sure we start with the JSON as a string
          json = JSON.stringify(json);
      } else {
          // is already a string, so parse and re-stringify in order to remove extra whitespace
          json = JSON.parse(json);
          json = JSON.stringify(json);
      }

      // add newline before and after curly braces
      reg = /([\{\}])/g;
      json = json.replace(reg, '\r\n$1\r\n');

      // add newline before and after square brackets
      reg = /([\[\]])/g;
      json = json.replace(reg, '\r\n$1\r\n');

      // add newline after comma
      reg = /(\,)/g;
      json = json.replace(reg, '$1\r\n');

      // remove multiple newlines
      reg = /(\r\n\r\n)/g;
      json = json.replace(reg, '\r\n');

      // remove newlines before commas
      reg = /\r\n\,/g;
      json = json.replace(reg, ',');

      // optional formatting...
      if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
          reg = /\:\r\n\{/g;
          json = json.replace(reg, ':{');
          reg = /\:\r\n\[/g;
          json = json.replace(reg, ':[');
      }
      if (options.spaceAfterColon) {
          reg = /\:/g;
          json = json.replace(reg, ': ');
      }

      $.each(json.split('\r\n'), function(index, node) {
          var i = 0,
              indent = 0,
              padding = '';

          if (node.match(/\{$/) || node.match(/\[$/)) {
              indent = 1;
          } else if (node.match(/\}/) || node.match(/\]/)) {
              if (pad !== 0) {
                  pad -= 1;
              }
          } else {
              indent = 0;
          }

          for (i = 0; i < pad; i++) {
              padding += PADDING;
          }

          formatted += padding + node + '\r\n';
          pad += indent;
      });

      return formatted;
    }
  }
};
</script>

<style scoped>
.el-form{
  width:98%;
  float: left;
  margin:1% 0 1% 2%;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
