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
      <el-form-item label="类型标识" prop="menuId" >
        <el-input v-model.trim="form.menuId" :readonly="status ? false : 'readonly'" size="small" placeholder="填写类型标识" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型名称" prop="menuName">
        <el-input v-model.trim="form.menuName" size="small"  placeholder="填写模块名称" autocomplete="off" clearable></el-input>
      </el-form-item>
      
      <el-form-item label="挂节点" prop="menuUrl">
        <el-input v-model.trim="form.menuUrl" size="small" placeholder="填写衔接地址" autocomplete="off" clearable></el-input>
      </el-form-item>
       <el-form-item label="排序" prop="menuOrder">
        <el-input v-model.trim="form.menuOrder" size="small"  placeholder="填写模块排序" autocomplete="off" clearable></el-input>
      </el-form-item>
       <el-form-item label="禁用状态" prop="menuStatus">
        <el-radio-group v-model="form.menuStatus">
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
      form: {
        menuId: "",
        menuName: "",
        menuUrl:"",
        menuOrder:"",
        menuStatus:0
      },
      rules: {
        menuId: [
          { required: true, message: "填写类型标识", trigger: "blur" }
        ],
        menuName: [
          { required: true, message: "填写类型名称", trigger: "blur" }
        ],
        menuUrl:[
          { required: true, message: "填写挂接点", trigger: "blur" }
        ],
        menuOrder:[
          { required: true, message: "填写排序", trigger: "blur" }
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
        this.form.menuId=this.getdata.typeID;
        this.form.menuName=this.getdata.typeName;
        this.form.menuUrl=this.getdata.joinID;
        this.form.menuOrder=this.getdata.sortID;
        this.form.menuStatus=this.getdata.nullity;
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
          let param={
            typeID: this.form.menuId,
            typeName:this.form.menuName,
            joinID:this.form.menuUrl,
            sortID:this.form.menuOrder,
            nullity:this.form.menuStatus
          };
          this.$api.gameInfoaddGameType(param).then(res =>{
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
