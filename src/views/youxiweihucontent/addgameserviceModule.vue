<template>
<div>
   <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="游戏标识" prop="kindID" >
        <el-input v-model.trim="form.kindID" :readonly="status ? false : 'readonly'" size="small" placeholder="" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="游戏名称" prop="kindName">
         <el-input v-model.trim="form.kindName" size="small"  placeholder="" autocomplete="off" clearable></el-input>
       </el-form-item>
       <el-form-item label="游戏类型" prop="typeID">
         <el-select v-model="form.typeID" placeholder="请选择游戏" size="small">
           <el-option  v-for="list in allgamelist" :key="list.key" :label="list.typeName" :value="list.typeID"></el-option>
         </el-select>
      </el-form-item>
      <el-form-item label="父节点" prop="joinID">
        <el-input v-model.trim="form.joinID" size="small" placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>
       <el-form-item label="排序" prop="sortID">
        <el-input v-model.trim="form.sortID" size="small"  placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="进程名字" prop="processName">
        <el-input v-model.trim="form.processName" size="small" placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>

      <el-form-item label="规则路径" prop="gameRuleUrl">
        <el-input v-model.trim="form.gameRuleUrl" size="small" placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>

     <el-form-item label="下载路径" prop="downLoadUrl">
        <el-input v-model.trim="form.downLoadUrl" size="small" placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>

       <el-form-item label="禁用状态" prop="nullity">
        <el-radio-group v-model="form.nullity">
          <el-radio  :label="0">启用</el-radio>
          <el-radio  :label="1">禁用</el-radio>
        </el-radio-group>
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
      allgamelist:[],
      form: {
        type: "",
        kindID: "",
        kindName:"",
        typeID: "",
        joinID:"",
        sortID: "",
        processName:"",
        gameRuleUrl:"",
        downLoadUrl:"",
        nullity:0
      },
      rules: {
        kindID: [
          { required: true, message: "填写游戏标识", trigger: "blur" }
        ],
        kindName: [
          { required: true, message: "选择游戏名称", trigger: "change" }
        ],
        typeID: [
          { required: true, message: "填写游戏类型", trigger: "blur" }
        ],
        joinID: [
          { required: true, message: "填写父节点", trigger: "blur" }
        ],
        sortID: [
          { required: true, message: "填写排序", trigger: "blur" }
        ],
        processName: [
          { required: true, message: "填写进程名字", trigger: "blur" }
        ],
        gameRuleUrl: [
          { required: true, message: "填写规则路径", trigger: "blur" }
        ],
         downLoadUrl: [
          { required: true, message: "填写下载路径", trigger: "blur" }
        ],
      }
    };
  },
  mounted(){
   this.allgamelist = JSON.parse(this.$store.getters.object);
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){
      if(this.isAdd){
          this.status = true;
          this.form.type = 1;
      }else{
        this.form.type = 2;
        this.form.kindID=this.getdata.kindID;
        this.form.kindName=this.getdata.kindName;
        this.form.typeID=this.getdata.typeID;
        this.form.joinID=this.getdata.joinID;
        this.form.sortID=this.getdata.sortID;
        this.form.processName=this.getdata.processName;
        this.form.gameRuleUrl=this.getdata.gameRuleUrl;
        this.form.downLoadUrl=this.getdata.downLoadUrl;
        this.form.nullity=this.getdata.nullity;
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
          this.$api.gameInfoaddGameGame(this.form).then(res =>{
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
    margin-left:15%;
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
