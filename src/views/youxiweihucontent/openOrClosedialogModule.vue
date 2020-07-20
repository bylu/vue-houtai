<template>
<div>
  <el-form  :model="form" :inline="true"  :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="房间ID"  prop="roomId">
          <el-input v-model.trim="form.roomId" size="small"  placeholder="多个ID 用;分开" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="cancel" size="small">取 消</el-button>
        <el-button  type="primary" size="small" @click="doSubmit">确 定</el-button>
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
        roomId:this.getdata,
        btnType:""
      },
      rules: {
        roomId: [
            { required: true, message: '请输入房间Id', trigger: 'blur' }
        ]
      }
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      if(this.isAdd){
        this.form.btnType="0"  //开启
      }else{
        this.form.btnType="1" //关闭
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
            roomId:this.form.roomId,
            btnType:this.form.btnType
          }
          this.$api.ServerRoomInfoManagecontrolServer(param).then(res =>{
            this.loading = false;
            if (res.success) {
              this.resetForm();
              this.$message({
                dangerouslyUseHTMLString: true,
                message: "<p>"+res.message+"</p>",
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
  margin-left:10%;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
