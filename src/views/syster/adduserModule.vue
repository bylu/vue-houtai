<template>
  <!-- 添加用户信息页面 -->
  <div>
    <el-form :model="form" :inline="true" ref="form" :rules="rules"  label-width="120px" class="demo-ruleForm">
      <el-form-item label="用户id" style="display:none;">
        <el-input v-model.trim="form.userid" size="small" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="用户名称" prop="username">
        <el-input v-model.trim="form.username" placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="password" size="small">
        <el-input v-model.trim="form.password" placeholder="如需修改密码，请填写新密码" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="修改秘钥" prop="secret" size="small">
        <el-input v-model.trim="form.secret" placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleId">
        <el-select v-model="form.roles" placeholder="请选择"  size="small">
          <el-option  v-for="list in this.allpermisssionlist" :key="list.roleID" :label="list.roleName" :value="list.roleID"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="绑定手机" prop="mobile">
        <el-input v-model.trim="form.mobile" placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户类型" prop="isSpreader">
        <el-select v-model="form.isSpreader" placeholder="请选择" size="small">
              <el-option
                v-for="(list,index) in selectList.isSpreaderList"
                :key="index"
                :label="list.value"
                :value="list.key"
              ></el-option>
            </el-select>
      </el-form-item>


      <el-form-item label="状态" prop="state">
        <el-select v-model="form.state" placeholder="全部" size="small">
          <el-option v-for="list in statuelist" :key="list.key" :label="list.name" :value="list.id"></el-option>
        </el-select>
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
    var validatePhone = (rule, value, callback) => {
      let regEn =/^1[345789]\d{9}$/
      if (value === '') {
          callback(new Error('请收入手机号码'));
      } else if (!regEn.test(value)) {
          callback(new Error('请输入正确手机号码!'));
      } else {
          callback();
      }
    };
    return {
      loading: false,
      statuelist: [{ id: 0, name: "正常" }, { id: 1, name: "冻结" }],
      allpermisssionlist: [],
      form: {
        userid: "",
        username:"",
        password: "",
        secret:"",
        roles: "",
        mobile: "",
        isSpreader: "",
        state: 0,
      },
      rules: {
        username: [
            { required: true, message: '填写用户名称', trigger: 'blur' }
        ],
        roles:[
            { required: true, message: '选择角色名', trigger: 'change' }
        ],
        mobile:[
          { required: true, message: '填写手机号码', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        isSpreader:[
          { required: true, message: '选择用户类型', trigger: 'change' }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init() {
      let roles = JSON.parse(this.$store.getters.object);
      let rs = [];
      for (let a = 0; a < roles.length; a++) {
        rs[a] = roles[a];
      }
      this.allpermisssionlist = rs;

      if (this.isAdd) {
        //添加用户
      }else {
        //修改
        this.form.userid = this.getdata.userID;
        this.form.username = this.getdata.username;
       // this.form.password = param.password;
        this.form.secret=this.getdata.secret;
        this.form.roles = this.getdata.roleid;
        this.form.mobile = this.getdata.mobile;
        this.form.isSpreader = (this.getdata.isSpreader).toString();
        this.form.state =parseInt( this.getdata.nullity);
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
          let sentPwd="";
           if (this.isAdd) {
             if(this.form.password == "" || this.form.password == null){
                this.$message({
                  message: '密码不能为空',
                  type: "error"
                });
                return ;
             }else{
               sentPwd=this.$md5(this.form.password);
             }
           }else{
              if(this.form.password == "" || this.form.password == null){
                sentPwd=""
              }else{
                sentPwd=this.$md5((this.form.password).trim())
              }
           }
            let user = {
              username: (this.form.username).trim(),
              password:sentPwd,
              roleid: this.form.roles,
              mobile: (this.form.mobile).trim(),
              isSpreader: this.form.isSpreader,
              nullity: this.form.state,
              userID: this.form.userid
            };
            this.$api.userssaveOrUpdate(user).then(res =>{
              this.loading = false;
              if (res.success) {
                this.$message({
                  message: res.message,
                  type: "success"
                });
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
  margin: 3% 0;
}
.el-form-item {
  width: 80%;
  float: left;
  margin-left: 5%;
}
.el-input{
  margin-bottom:0px;
}
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
