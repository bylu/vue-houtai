<template>
<div>
   <el-form
      :model="form"
      :inline="true"
      :rules="rules"
      ref="form"
      label-width="90px"
      class="demo-ruleForm"
    >
    <el-form-item label="菜单id" style="display:none;">
        <el-input v-model.trim="form.id" size="small"></el-input>
      </el-form-item>
      <el-form-item label="菜单id" style="display:none;">
        <el-input v-model.trim="form.menuId" size="small"></el-input>
      </el-form-item>

      <el-form-item label="权限id" style="display:none;">
        <el-input v-model.trim="form.menuPermissionId" size="small"></el-input>
      </el-form-item>
      <el-form-item label="权限名:" prop="menuPermissionName">
        <el-input v-model.trim="form.menuPermissionName"  placeholder="" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="权限别名:" prop="alias">
        <el-input v-model.trim="form.alias" :readonly="status ? false : 'readonly'" :disabled="showdisabled ? false :'disabled'" placeholder="" size="small" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="权限地址:" prop="menuPermissionUrl">
        <el-input v-model.trim="form.menuPermissionUrl" placeholder="" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="权限标识:" prop="permissionType">
          <el-select v-model="form.permissionType" size="small" placeholder="请选择">
            <el-option v-for="list in selectList.permissionTypelist" :key="list.key" :value="list.key" :label="list.value"></el-option>
          </el-select>
      </el-form-item>
       <el-form-item label="状态:" prop="menuStatus">
        <el-radio-group v-model="form.menuStatus" size="small">
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
  props: ['add','childModuleId'],
  data() {
    return {
      loading: false,
      status:false,
      showdisabled:false,
      form: {
        id:'',
        menuId:this.childModuleId,
        menuPermissionId:'',
        menuPermissionName: "",
        alias:"",
        menuPermissionUrl:"",
        permissionType:'',
        menuStatus:0
      },
      rules: {
        menuPermissionName: [
          { required: true, message: "填写三级权限名", trigger: "blur" }
        ],
        alias:[
            { required: true, message: "填写别名", trigger: "blur" }
        ],
        menuPermissionUrl: [
          { required: true, message: "填写三级权限地址", trigger: "blur" }
        ],
        permissionType:[
           { required: true, message: "填写三级权限标识", trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      //初始化modal
      if(this.add){
          this.status=true;
          this.showdisabled=true;
        //添加
        this.resetForm();
      }else{
        //修改
        this.status=false; //不允许用户修改，保证数据的唯一性
        this.showdisabled=false;////不允许用户修改，保证数据的唯一性
        //moduleID，permissionTitle，nullity，uri，permissionValue
        let obj =JSON.parse(this.$store.getters.object);
            this.form.id=obj.id,
            this.form.menuId=obj.moduleID,
            this.form.menuPermissionName=obj.permissionTitle,
            this.form.alias=obj.alias;
            this.form.menuPermissionUrl=obj.uri,
            this.form.permissionType=obj.permissionType,
            this.form.menuStatus=parseInt(obj.nullity),
            this.form.menuPermissionId=parseInt(obj.parentID)
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
              id:this.form.id,
              moduleID:this.form.menuId,
              permissionTitle:this.form.menuPermissionName,
              alias:this.form.alias,
              nullity:this.form.menuStatus,
              uri:this.form.menuPermissionUrl,
              permissionValue: this.form.permissionType,
              permissionType: this.form.permissionType,
          }
          this.$api.saveMenuPermission(param).then(res =>{
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
              // this.resetForm();
              this.$message({
                message: res.message,
                type: "error"
              });
              // this.$emit('closedialog');
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
  width:90%;
  float: left;
  margin-left:10%;
}
.el-input{
  width:180%;
  margin-bottom:0px;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
