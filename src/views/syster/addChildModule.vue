<template>
<div>
   <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="180px"
      class="demo-ruleForm"
    >
      <el-form-item label="二级菜单名称" prop="childrenMenuName">
        <el-input v-model.trim="form.childrenMenuName"  placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item label="二级菜单路径" prop="childrenMenuUrl">
        <el-input v-model.trim="form.childrenMenuUrl" placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item label="二级菜单图标" prop="childrenMenuIcon">
        <el-input v-model.trim="form.childrenMenuIcon" placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item label="二级菜单排序" prop="orderNo">
        <el-input v-model.trim="form.orderNo" placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item label="二级菜单描述" prop="description">
        <el-input v-model.trim="form.description" placeholder="填写模块描述" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>

       <el-form-item label="状态" prop="menuStatus">
        <el-radio-group v-model="form.menuStatus" size="small">
          <el-radio  :label="0">启用</el-radio>
          <el-radio  :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="cancel" size="small">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit" size="small">确认</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['id'],
  data() {
    return {
      loading: false,
      form: {
        menuId:this.id,
        childrenMenuName: "",
        childrenMenuUrl:"",
        childrenMenuIcon: "",
        orderNo:"",
        description:"",
        menuStatus:0
      },
      rules: {
        childrenMenuName: [
          { required: true, message: "填写二级菜单名称", trigger: "blur" }
        ],
        childrenMenuUrl: [
          { required: true, message: "填写二级菜单地址", trigger: "blur" }
        ],
        childrenMenuIcon: [
          { required: true, message: "填写二级菜单图标", trigger: "blur" }
        ],
        orderNo: [
          { required: true, message: "填写二级菜单排序", trigger: "blur" }
        ],
        description: [
          { required: true, message: "填写二级菜单描述", trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
  },
  methods: {
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
          let paramdata={
            parentID:this.form.menuId,
            description:this.form.description,
            title:this.form.childrenMenuName,
            orderNo:this.form.orderNo,
            nullity:this.form.menuStatus,
            link:this.form.childrenMenuUrl,
            icon:this.form.childrenMenuIcon,
            permissiontitle:"添加_add_2"
          }
          this.$api.saveChildrenMenu(paramdata).then(res =>{
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
  margin:3% 0;
}
.el-form-item{
  width:80%;
  float: left;
  /* margin-left:15%; */
}
.el-input{
  margin-bottom:0px;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
