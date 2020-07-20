<template>
<div>
   <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="模块标识" prop="gameID" >
        <el-input v-model.trim="form.gameID" :readonly="status ? false : 'readonly'" size="small" placeholder="填写类型标识" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="模块名称" prop="gameName">
        <el-input v-model.trim="form.gameName" size="small"  placeholder="填写模块名称" autocomplete="off"></el-input>
      </el-form-item>
      
      <el-form-item label="支持类型" prop="suporType">
        <el-input v-model.trim="form.suporType" size="small" placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="数据库地址" prop="dataBaseAddr">
        <el-input v-model.trim="form.dataBaseAddr" size="small"  placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="数据库名字" prop="dataBaseName">
        <el-input v-model.trim="form.dataBaseName" size="small"  placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="服务器版本" prop="serverVersion">
        <el-input v-model.trim="form.serverVersion" size="small"  placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户端版本" prop="clientVersion">
        <el-input v-model.trim="form.clientVersion" size="small"  placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="服务器名字" prop="serverDLLName">
        <el-input v-model.trim="form.serverDLLName" size="small"  placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="客户端名字" prop="clientExeName">
        <el-input v-model.trim="form.clientExeName" size="small"  placeholder="" autocomplete="off" clearable></el-input>
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
      status:false,
      form: {
        gameID: "",
        gameName: "",
        suporType:"",
        dataBaseAddr:"",
        dataBaseName: "",
        serverVersion:"",
        clientVersion:"",
        serverDLLName:"",
        clientExeName:""
      },
      rules: {
        gameID: [
          { required: true, message: "填写模块标识", trigger: "blur" }
        ],
        gameName: [
          { required: true, message: "填写模块名称", trigger: "blur" }
        ],
        suporType: [
          { required: true, message: "填写支持类型", trigger: "blur" }
        ],
        dataBaseAddr: [
          { required: true, message: "填写数据库地址", trigger: "blur" }
        ],
        dataBaseName: [
          { required: true, message: "填写数据库名字", trigger: "blur" }
        ],
        serverVersion: [
          { required: true, message: "填写服务器版本", trigger: "blur" }
        ],
        clientVersion: [
          { required: true, message: "填写客户端版本", trigger: "blur" }
        ],
        serverDLLName: [
          { required: true, message: "填写服务器名字", trigger: "blur" }
        ],
        clientExeName: [
          { required: true, message: "填写客户端名字", trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){
      if(this.isAdd){
        this.status = true;
      }else{
        this.form.gameID=this.getdata.gameID;
        this.form.gameName=this.getdata.gameName;
        this.form.suporType=this.getdata.suporType;
        this.form.dataBaseAddr=this.getdata.dataBaseAddr;
        this.form.dataBaseName=this.getdata.dataBaseName;
        this.form.serverVersion=this.getdata.serverVersion;
        this.form.clientVersion=this.getdata.clientVersion;
        this.form.serverDLLName=this.getdata.serverDLLName;
        this.form.clientExeName=this.getdata.clientExeName;
        this.status = false;
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
          this.$api.gameInfoaddGameModel(this.form).then(res =>{
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
    width:80%;
    float: left;
    margin-bottom:15px;
    margin-left:10%;
  }
.el-input{
  margin-bottom: 0px;
}
  .el-select{
     width:200px;
  }
  .dialog-footer{
    text-align: right;
    padding-right:3%;
    margin-bottom: 2%;
  }
</style>
