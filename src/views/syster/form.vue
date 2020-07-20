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
      <el-form-item label="角色id" prop="roleID" style="display:none;">
        <el-input v-model.trim="form.roleID"  placeholder="填写名称" size="small" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model.trim="form.roleName" placeholder="填写名称" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model.trim="form.description" placeholder="填写角色描述" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="departmentId">
          <el-select v-model="form.departmentId" placeholder="全部" size="small">
           <el-option  v-for="list in departmentlist" :key="list.id" :label="list.name" :value="list.id"></el-option>
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
  props: ['getdata'],
  data() {
    return {
      loading: false,
      form: {
        roleID: "",
        roleName: "",
        description: "",
        departmentId:1
      },
      rules: {
        roleName: [
          { required: true, message: "填写商品名称", trigger: "blur" }
        ],
        description: [
          { required: true, message: "填写角色描述", trigger: "blur" }
        ]
      },
      departmentlist:[],
    };
  },
  mounted(){
    this.searchDepartment();
    this.init();
  },
  methods: {
    //查询所有部门
    searchDepartment(){
      this.$api.searchDepartment().then(res =>{
        this.loading = false;
        if (res.success) {
          this.departmentlist = res.data;
        }
      }).catch(err =>{
        this.$message({
          message: '请求失败!',
          type: "error"
        });
      })
    },

    //新增和编辑今日入页面初始化
    init(){
        this.form.roleID=this.getdata.roleID;
        this.form.roleName=this.getdata.roleName;
        this.form.description=this.getdata.description;
        this.form.departmentId=this.getdata.departmentId;
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
          this.$api.saverole(this.form).then(res =>{
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
  margin:5% 0;
}
.el-form-item{
  width:80%;
  float: left;
  margin-left:15%;
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
