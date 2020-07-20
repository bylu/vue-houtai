<template>
  <!-- 添加用户信息页面 -->
  <div>
    <el-form :model="form" :inline="true" ref="form" :rules="rules"  label-width="120px" class="demo-ruleForm">
      <el-form-item label="渠道ID">
        <el-input v-model.trim="form.spreaderId" size="small" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="渠道类型" prop="classType">
        <el-select v-model="form.classType" placeholder="请选择"  size="small">
          <el-option  v-for="list in selectList.qudaoTypeList" :key="list.roleID" :label="list.value" :value="list.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单特征" prop="orderCharacter">
        <el-input v-model.trim="form.orderCharacter" placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>

      <el-form-item label="订单特征拓展" prop="orderExpandId" size="small">
        <el-input v-model.trim="form.orderExpandId" placeholder="" autocomplete="off" clearable></el-input>
      </el-form-item>

     <el-form-item label="手续费" prop="commission">
        <el-input v-model.trim="form.commission" placeholder="" autocomplete="off" size="small" clearable></el-input>
      </el-form-item>
      
      <el-form-item label="合成" prop="income">
        <el-input v-model.trim="form.income" placeholder="" autocomplete="off" size="small" clearable></el-input>
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
        spreaderId:"",
        classType:"",
        orderCharacter:"",
        orderExpandId:"",
        commission:"",
        income:""
      },
      rules: {
        spreaderId: [
            { required: true, message: '填写渠道ID', trigger: 'blur' }
        ],
        classType:[
            { required: true, message: '选择渠道类型', trigger: 'change' }
        ],
        orderCharacter: [
            { required: true, message: '填写订单特征', trigger: 'blur' }
        ],
        orderExpandId: [
            { required: true, message: '填写订单特征拓展', trigger: 'blur' }
        ],
        commission: [
            { required: true, message: '填写手续费', trigger: 'blur' }
        ],
        income: [
            { required: true, message: '填写合成', trigger: 'blur' }
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
        this.form.spreaderId=this.getdata.spreaderId;
        this.form.classType=(this.getdata.classType).toString();
        this.form.orderCharacter=this.getdata.orderCharacter;
        this.form.orderExpandId=this.getdata.orderExpandId;
        this.form.commission=this.getdata.commission;
        this.form.income=this.getdata.income;
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
          this.$api.spreaderOrderCharacterRatesaveOrUpdate(this.form).then(res =>{
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
  margin: 5% 0;
}
.el-form-item {
  width: 80%;
  float: left;
  margin-left: 10%;
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
