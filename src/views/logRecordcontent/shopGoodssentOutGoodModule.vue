<template>
  <div>
    <el-form :model="form" :inline="true" ref="form"   label-width="70px" class="demo-ruleForm">
        <el-form-item label="id:" prop="id" style="display:none" >
            <el-input v-model.trim="form.id" size="small" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="orderid:" prop="orderid" style="display:none" >
            <el-input v-model.trim="form.orderid" size="small" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="note1:" prop="note1">
            <el-input v-model.trim="form.note1" size="small" :readonly="readstatus ? false : 'readonly'" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="note2:" prop="note2" >
            <el-input v-model.trim="form.note2" size="small" :readonly="readstatus ? false : 'readonly'" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="userid:" prop="userid" style="display:none">
            <el-input v-model.trim="form.userid" size="small" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="shopid:" prop="shopid" style="display:none" >
            <el-input v-model.trim="form.shopid" size="small" autocomplete="off" ></el-input>
        </el-form-item>

        <el-form-item label="status:" prop="status" style="display:none">
            <el-input v-model.trim="form.status" size="small" autocomplete="off" ></el-input>
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
  props: ["getdata"],
  data() {
    return {
      loading: false,
      form: {
        id:"",
        orderid:"",
        note1:"",
        note2:"",
        userid:"",
        shopid:"",
        status:"2"
      },
      readstatus:false,
    };
  },
  mounted() {
      this.init();
  },
  methods: {
    init(){
        if(this.getdata.typeId == 1 || this.getdata.typeId == 4){
            this.form.id=this.getdata.id;
            this.form.orderid=this.getdata.orderid;
            this.form.note1=this.getdata.tel;
            this.form.note2=this.moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            this.form.userid=this.getdata.userid;
            this.form.shopid=this.getdata.shopid;
            this.readstatus = false;
        }else{
            this.form.id=this.getdata.id;
            this.form.orderid=this.getdata.orderid;
            this.form.note1="";
            this.form.note2="";
            this.form.userid=this.getdata.userid;
            this.form.shopid=this.getdata.shopid;
            this.readstatus = true;
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
          this.$api.shopGoodsRecordadd(this.form).then(res =>{
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
.dialog-footer {
  text-align: right;
  padding-right: 3%;
  margin-bottom: 2%;
}
</style>
