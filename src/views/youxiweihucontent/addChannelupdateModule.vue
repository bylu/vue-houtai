<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
        <el-form-item label="id"  prop="id" style="display:none">
          <el-input v-model.trim="form.id" size="small" placeholder="" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="渠道ID"  prop="spreadid">
          <el-input v-model.trim="form.spreadid" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="渠道标识"  prop="channelName">
          <el-input v-model.trim="form.channelName" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="游戏ID"  prop="gameid">
          <el-input v-model.trim="form.gameid" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
       <el-form-item label="平台" prop="platform" >
          <el-select v-model.trim="form.platform" size="small" placeholder="请选择">
            <el-option  v-for="list in selectList.downloadType" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户端版本号"  prop="clientVersion">
          <el-input v-model.trim="form.clientVersion"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="更新方式"  prop="isupdate" >
          <el-select v-model="form.isupdate" size="small" placeholder="请选择" >
            <el-option  v-for="list in selectList.updatechannelType" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务端版本号"  prop="serverVersion">
          <el-input v-model.trim="form.serverVersion" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="自动or手动"  prop="updateType" >
          <el-select v-model="form.updateType" size="small" placeholder="请选择" >
            <el-option  v-for="list in selectList.updateaddChannelType" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="安装包下载地址"  prop="downurl">
          <el-input v-model.trim="form.downurl"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="自定义参数"  prop="userDefined">
          <el-input v-model="form.userDefined"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="说明"  prop="note">
          <el-input v-model.trim="form.note"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

          <el-form-item label="类型"  prop="type" >
          <el-select v-model="form.type" size="small" placeholder="请选择" >
            <el-option  v-for="list in selectList.editionType" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata','isAdd'],
  data() {
    return {
        loading: false,
        form: {
            id:"",
            spreadid:"",
            channelName:"",
            gameid:"",
            platform:"",
            clientVersion:"",
            serverVersion:"",
            isupdate:"",
            updateType:"",
            downurl:"",
            userDefined:"",
            note:"",
            type:""
        },
        rules: {
            spreadid: [
                { required: true, message: '填写渠道ID', trigger: 'blur' }
            ],
            gameid: [
                { required: true, message: '填写游戏ID', trigger: 'blur' }
            ],
            platform: [
                { required: true, message: '选择平台', trigger: 'blur' }
            ],
            clientVersion: [
                { required: true, message: '填写客户端版本号', trigger: 'blur' }
            ],
            serverVersion: [
                { required: true, message: '填写服务端版本号', trigger: 'blur' }
            ],
            isupdate: [
                { required: true, message: '选择更新方式', trigger: 'change' }
            ],
            updateType:[
               { required: true, message: '请选择', trigger: 'change' }
            ],
            downurl: [
                { required: true, message: '请输入安装包下载地址', trigger: 'blur' }
            ],
            note: [
                { required: true, message: '请输入说明', trigger: 'blur' }
            ],
            type: [
                { required: true, message: '选择类型', trigger: 'change' }
            ],
        }
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){
      if(this.isAdd){
        this.form.isupdate= "0";
        this.form.updateType="0";
        this.form.type="0";
        this.form.platform="ios";
      }else{
        this.form.id=this.getdata.id;
        this.form.spreadid=this.getdata.spreadid;
        this.form.channelName=this.getdata.channelName;
        this.form.gameid=this.getdata.gameid;
        this.form.platform=this.getdata.platform;
        this.form.clientVersion=this.getdata.clientVersion;
        this.form.serverVersion=this.getdata.serverVersion;
        this.form.isupdate=(this.getdata.isupdate).toString();
        this.form.updateType=(this.getdata.updateType).toString();
        this.form.downurl=this.getdata.downurl;
        this.form.userDefined=this.getdata.userDefined;
        this.form.note=this.getdata.note;
        this.form.type=(this.getdata.type).toString();
      }
    },
    //取消按钮操作
    cancel() {
      this.resetForm();
      this.$emit('closedialog');
    },
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api.channelUpdateadd(this.form).then(res =>{
            this.loading = false;
            if (res.success) {
              this.resetForm();
              this.$message({
                message: res.message,
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
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["form"].resetFields();
    }
  }
};
</script>

<style scoped>
.el-form{
  width:100%;
  float: left;
  margin:1% 0;
}
.el-form-item{
  width:auto;
  float: left;
  margin-bottom:16px;
}
.el-input{
  margin-bottom: 0px;
}
.el-select{
    width:90%;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
