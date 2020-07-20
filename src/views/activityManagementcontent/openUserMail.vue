<template>
<div>
   <el-form   ref="form"  class="demo-ruleForm" style="margin:2% 0">
    <el-form-item  style="width:100%;margin-bottom:10px;">
      <el-input v-model="showuserid" type="textarea" style="width:98%;margin-left:1%" :autosize="{ minRows:10, maxRows: 10}" size="small" placeholder="" autocomplete="off"></el-input>
    </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata'],
  data() {
    return {
      showuserid:''
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      let param = {
          group:this.getdata
      };
      this.$api.systemMailshowUsers(param).then(res =>{
        if (res.success) {
          this.showuserid=res.data;
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
    doSubmit() {
      this.$emit('closedialog');
    },

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
  width:auto;
  margin-bottom:20px;
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
