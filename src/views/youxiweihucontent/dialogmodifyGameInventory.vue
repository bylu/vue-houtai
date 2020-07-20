<template>
<div>
  <el-form  :model="form" :inline="true"  :rules="rules" ref="form" label-width="200px" class="demo-ruleForm">
        <el-form-item style="margin-bottom:0px;">
          <span>房间ID:</span><label v-html="roomid" style="color:red"></label>
          <span style="margin-left:15px">房间名称：</span><label v-html="roomname" style="color:red"></label>
        </el-form-item>
        <div v-for="(item,i) in getjson" :key="i">
          <el-form-item :label="item.key" style="margin-bottom:0px;">
            <el-input v-model="item.value"   :readonly="userReadonly ? false : 'readonly'" size="small" class="shownoBorder"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="区间"  prop="canno">
          <el-input v-model.trim="form.canno" size="small"  placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="行为"  prop="isadd" style="margin-bottom:0px;">
          <el-radio-group v-model="form.isadd" size="small">
            <el-radio label="1">加</el-radio>
            <el-radio label="2">减</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="修改数量"  prop="stock">
          <el-input v-model.trim="form.stock" size="small"  placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="cancel" size="small">取 消</el-button>
        <el-button  :loading="loading" type="primary" size="small" @click="doSubmit">确 定</el-button>
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
      getjson:[],
      form: {
        serverid:this.getdata.serverID,
        serversid:this.getdata.serversid,
        canno:'',
        isadd:'1',
        stock:''
      },
      userReadonly:false,
      roomid:'',
      roomname:'',
      rules: {
        canno: [
            { required: true, message: '请输入区间', trigger: 'blur' }
        ],
        stock: [
            { required: true, message: '请输入修改的数量', trigger: 'change' }
        ]
      }
    };
  },
  mounted(){
    this.initSearch();
  },
  methods: {
    initSearch(){
      let param={
        serverid:this.getdata.serverID,
        serversid:this.getdata.serversid
      }
      this.roomid=this.getdata.serverID;
      this.roomname=this.getdata.serverName;
      this.$api.serverRoomInfoManagegetStock(param).then(res =>{
        this.loading = false;
        if (res.success) {
          this.getjson = res.data.records;
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
          this.$api.serverRoomInfoManageupdateStock(this.form).then(res =>{
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
  margin:1% 0;
}
.el-form-item{
  width:97%;
  float: left;
  margin-left:2%;
  margin-bottom:10px;
}
.el-input{
  margin-bottom: 0px;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
