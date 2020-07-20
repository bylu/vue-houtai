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
      <el-form-item label="模块ID" prop="menuId" style="display:none;">
        <el-input v-model.trim="form.menuId" size="small" placeholder="" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="模块名称" prop="menuName">
        <el-input v-model.trim="form.menuName" size="small"  placeholder="填写模块名称" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="衔接地址" prop="menuUrl">
        <el-input v-model.trim="form.menuUrl" size="small" placeholder="填写衔接地址" autocomplete="off" clearable></el-input>
      </el-form-item>
       <el-form-item label="模块排序" prop="menuOrder">
        <el-input v-model.trim="form.menuOrder" size="small"  placeholder="填写模块排序" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="模块描述" prop="description">
        <el-input v-model.trim="form.description" size="small" placeholder="填写模块描述" autocomplete="off" clearable></el-input>
      </el-form-item>
       <el-form-item label="图标" prop="menuIcon">
        <el-input v-model.trim="form.menuIcon" size="small" placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>
       <el-form-item label="状态" prop="menuStatus">
        <el-radio-group v-model="form.menuStatus">
          <el-radio  :label="0">启用</el-radio>
          <el-radio  :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" size="small" @click="cancel">取消</el-button>
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
        menuId: "",
        menuName: "",
        menuUrl:"",
        menuOrder:1,
        description: "",
        menuIcon:"",
        menuStatus:"1"
      },
      rules: {
        menuName: [
          { required: true, message: "填写模块名称", trigger: "blur" }
        ],
        menuUrl: [
          { required: true, message: "填写衔接地址", trigger: "blur" }
        ],
        description: [
          { required: true, message: "填写模块描述", trigger: "blur" }
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

      }else{
        this.form.menuId=this.getdata.menuId;
        this.form.menuName=this.getdata.menuName;
        this.form.menuUrl=this.getdata.menuUrl;
        this.form.description=this.getdata.description;
        this.form.menuIcon=this.getdata.menuIcon;
        this.form.menuStatus=this.getdata.menuStatus;
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
          let url = this.paramUrl;
          this.$http({
            url:url.addMenu,
            method: "post",
            data: this.form,
            headers: { "Content-Type": "application/json;charset=UTF-8" }
          }).then(res => {
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
          });
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
  margin:5% 0;
}
.el-form-item{
  width:80%;
  float: left;
  margin-left:15%;
  margin-bottom:20px;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
