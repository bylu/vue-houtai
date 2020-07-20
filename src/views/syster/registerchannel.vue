<template>
<div>
   <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="渠道名称" prop="channelName">
        <el-input v-model.trim="form.channelName"  placeholder="" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="登录密码" prop="loginpwd">
        <el-input v-model.trim="form.loginpwd"  placeholder="" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色"  prop="rolename">
          <el-select v-model="form.rolename" placeholder="全部" size="small">
           <el-option  v-for="list in this.allpermisssionlist" :key="list.roleID" :label="list.roleName" :value="list.roleID"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="绑定ip" prop="bindip">
        <el-input v-model.trim="form.bindip" placeholder="填写衔接地址" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="是否渠道用户" prop="isChanneluser">
        <el-radio-group v-model="form.isChanneluser" size="small">
          <el-radio  :label="0">否</el-radio>
          <el-radio  :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态"  prop="statue" >
          <el-select v-model="form.statue" placeholder="全部" size="small">
            <el-option v-for="list in selectList.userStatusList" :key="list.key" :label="list.value" :value="list.key"></el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: [''],
  data() {
    return {
      loading: false,
      form: {
        channelName: "",
        loginpwd: "",
        rolename:"",
        bindip:"",
        isChanneluser:1,
        statue:"0"
      },
      allpermisssionlist:[],
      rules: {
        channelName: [
          { required: true, message: "填写渠道名称", trigger: "blur" }
        ],
        loginpwd: [
          { required: true, message: "填写登录密码", trigger: "blur" }
        ],
        bindip: [
          { required: true, message: "填写绑定ip", trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
      let roles = JSON.parse(this.$store.getters.object);
      let rs = [];
      for (let a = 0; a < roles.length; a++) {
        rs[a] = roles[a];
      }
      this.allpermisssionlist = rs;
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
      //     let url = this.paramUrl;
      //     this.$http({
      //       url:url.addMenu,
      //       method: "post",
      //       data: this.form,
      //       headers: { "Content-Type": "application/json;charset=UTF-8" }
      //     }).then(res => {
      //       this.loading = false;
      //       if (res.data.success) {
      //         this.resetForm();
      //         this.$message({
      //           message: res.data.message,
      //           type: "success"
      //         });
      //         this.$emit('shuaxin');
      //         this.$emit('closedialog');
      //       }else{
      //         this.resetForm();
      //         this.$message({
      //           message: res.data.message,
      //           type: "error"
      //         });
      //         this.$emit('closedialog');
      //       }
      //     });
      //   } else {
      //     return false;
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
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
