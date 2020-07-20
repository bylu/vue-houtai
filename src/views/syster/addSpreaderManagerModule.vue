<template>
  <!-- 添加用户信息页面 -->
  <div>
    <el-form :model="form" :inline="true" ref="form" :rules="rules"  label-width="100px" class="demo-ruleForm">


      <el-form-item label="渠道账号" prop="accounts">
        <el-input v-model.trim="form.accounts" placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>

      <el-form-item label="渠道名称" prop="nickName">
        <el-input v-model.trim="form.nickName" size="small" placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>

      <el-form-item label="公司名称" prop="company">
        <el-input v-model.trim="form.company" size="small" placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>



      <el-form-item label="平台类型" prop="platform">
        <el-select v-model="form.platform" placeholder="请选择"  size="small">
          <el-option  v-for="list in selectList.platFormList" :key="list.roleID" :label="list.value" :value="list.key"></el-option>
        </el-select>
      </el-form-item>



      <el-form-item label="渠道类型" prop="classType">
        <el-select v-model="form.classType" placeholder="请选择"  size="small">
          <el-option  v-for="list in selectList.qudaoTypeList" :key="list.roleID" :label="list.value" :value="list.key"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="手续费" prop="commission">
        <el-input v-model.trim="form.commission" placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>

      <el-form-item label="区域" prop="area">
        <el-select v-model="form.area" placeholder="请选择"  size="small">
          <el-option  v-for="list in selectList.arealist" :key="list.roleID" :label="list.value" :value="list.key"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分成" prop="rewardRate">
        <el-input v-model.trim="form.rewardRate" placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>

      <el-form-item label="parentID" prop="parentID">
        <el-input v-model.trim="form.parentID" placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>

      <el-form-item label="parentRate" prop="parentRate">
        <el-input v-model.trim="form.parentRate" placeholder="" autocomplete="off" size="small" clearable></el-input>
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
  props: ["getdata",'isAdd'],
  data() {
    return {
      loading: false,
      form: {
        accounts:"",
        nickName:"",
        company:"",
        password:"111111",
        platform:'',
        classType:'',
        area:'',
        commission:"",
        rewardRate:"",
        parentID:"0",
        parentRate:"10"
      },
      rules: {
        accounts: [
            { required: true, message: '填写渠道账号', trigger: 'blur' }
        ],
        nickName: [
            { required: true, message: '填写渠道名称', trigger: 'blur' }
        ],
        company: [
            { required: true, message: '填写公司名称', trigger: 'blur' }
        ],
        platform: [
            { required: true, message: '请选择', trigger: 'change' }
        ],
        classType: [
            { required: true, message: '请选择', trigger: 'change' }
        ],
        area: [
            { required: true, message: '请选择', trigger: 'change' }
        ],
        commission: [
            { required: true, message: '填写手续费', trigger: 'blur' }
        ],
        rewardRate: [
            { required: true, message: '填写分成', trigger: 'blur' }
        ],
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init() {
      if (this.isAdd) {
        //添加用户
      }else {
        //修改
        this.form.userId=this.getdata.userId;
        this.form.accounts=this.getdata.accounts;
        this.form.nickName=this.getdata.nickName;
        this.form.company=this.getdata.company;
       // this.form.password=this.getdata.password;
        this.form.platform=(this.getdata.platform).toString();
        this.form.classType=(this.getdata.classType).toString();
        this.form.area=(this.getdata.area).toString();
        this.form.accountsType=this.getdata.accountsType;
        this.form.commission=this.getdata.commission;
        this.form.rewardRate=this.getdata.rewardRate;
        this.form.parentID=this.getdata.parentID;
        this.form.parentRate=this.getdata.parentRate;
      }
    },
    //取消按钮操作
    cancel() {
      this.$refs["form"].resetFields(); //清空表单
      this.$emit("closedialog");
    },
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api.spreaderManagesaveOrUpdate(this.form).then(res =>{
            this.loading = false;
            if (res.success) {
              this.$emit("closedialog");
              this.$emit("shuaxin");
            } else {
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
        }
      })
    }
  }
};
</script>

<style scoped>
.el-form {
  width: 100%;
  float: left;
  margin: 2% 0;
}
.el-form-item {
  width: auto;
  margin-left: 2%;
}
.el-select,.el-input{
  margin-bottom:0px;
}
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
