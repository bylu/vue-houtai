<template>
<div>
   <el-form  :model="form" :inline="true" ref="form" class="demo-ruleForm">
        <el-form-item label="房间标识:"  prop="serverID">
          <el-input v-model.trim="form.serverID" size="small"  placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>

       <el-form-item label="渠道列表:">
         <el-radio-group v-model="form.nodeID">
           <template v-for="(item,index) in qudaolist" >
             <el-radio :label="item.userID">{{item.accounts}}</el-radio>
           </template>
         </el-radio-group>
       </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" size="small"  @click="cancel">取消</el-button>
      <el-button  size="small" type="primary" @click="btnSubmit">保存</el-button>
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
            serverID:this.getdata.serverID,
            nodeID:this.getdata.spreaderId
        },
        qudaolist:""
    };
  },
  mounted(){
    this.searchFindAllSpread();
  },
  methods: {
    /**
     * 查询渠道
     */
    searchFindAllSpread() {
      this.$api.onlineOrderfindAllSpread().then(res =>{
        if (res.success) {
          this.qudaolist = res.data;
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
    //保存
    btnSubmit(){
      this.$api.serverRoomInfoManageupdateServerInfoByOne(this.form).then(res =>{
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
  margin:2% 0;
}
.el-form-item{
    width:90%;
    float: left;
    margin-bottom:15px;
    margin-left:5%;
}
.el-input{
  margin-bottom: 0px;
}
.el-radio{
  margin:5px 0;
  margin-left:15px;
  width:120px;
}

.dialog-footer{
    text-align: right;
    padding-right:3%;
    margin-bottom: 2%;
}
</style>
