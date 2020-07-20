<template>
<div>
   <el-form label-width="110px" class="demo-ruleForm">
    <el-form-item label="幸运豆余量：" prop="item1">
      <el-input v-model="item1" size="small" :readonly="status ? false : 'readonly'" placeholder="" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="人数：" prop="item2">
      <el-input v-model="item2" size="small" :readonly="status ? false : 'readonly'" placeholder="" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="幸运豆余量：" prop="item3">
      <el-input v-model="item3" size="small" :readonly="status ? false : 'readonly'" placeholder="" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="人数：" prop="item4">
      <el-input v-model="item4" size="small" :readonly="status ? false : 'readonly'" placeholder="" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="幸运豆余量：" prop="item5">
      <el-input v-model="item5" size="small" :readonly="status ? false : 'readonly'" placeholder="" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="人数：" prop="item6">
      <el-input v-model="item6" size="small" :readonly="status ? false : 'readonly'" placeholder="" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="幸运豆余量：" prop="item7">
      <el-input v-model="item7" size="small" :readonly="status ? false : 'readonly'" placeholder="" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="人数：" prop="item8">
      <el-input v-model="item8" size="small" :readonly="status ? false : 'readonly'" placeholder="" autocomplete="off"></el-input>
    </el-form-item>
   </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel" type="primary">OK</el-button>
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
      status:false,
      type:'',
      spreaderID:'',
      beginTime:'',
      endTime:'',
      item1:'',
      item2:'',
      item3:'',
      item4:'',
      item5:'',
      item6:'',
      item7:'',
      item8:'',
    };
  },
  mounted(){
    this.doSubmit();
  },
  methods: {
    //取消按钮操作
    cancel() {
      this.$emit('closedialog');
    },
    //确认按钮 提交事件
    doSubmit() {
      this.type = this.getdata.type;
      this.spreaderID = this.getdata.spreaderID;
      this.beginTime = this.getdata.beginTime;
      this.endTime = this.getdata.endTime;
      //spreaderID, beginTime，endTime
      let param;
      if(this.type == 2){  //周期
        param = {
          type:this.type,
          spreaderID:this.spreaderID,
          beginTime:this.beginTime,
          endTime:this.endTime,
        };
      }else{   //每天
        param = {
          type:this.type,
          spreaderID:this.spreaderID,
          beginTime:this.moment(this.beginTime).format("YYYY-MM-DD"),
        };
      }
      this.$api.accountsInfocountAccount(param).then(res =>{
        this.loading = false;
        if (res.success) {
          for(let i=0;i<res.data.records.length;i++){
            this.item1=res.data.records[i].item1;
            this.item2=res.data.records[i].item2;    
            this.item3=res.data.records[i].item3;
            this.item4=res.data.records[i].item4;
            this.item5=res.data.records[i].item5;
            this.item6=res.data.records[i].item6;
            this.item7=res.data.records[i].item7;
            this.item8=res.data.records[i].item8;
          }
        }else{
          this.$message({
            message: res.message,
            type: "error"
          });
          this.$emit('closedialog');
        }
      }).catch(err =>{
        this.$message({
          message: '请求失败!',
          type: "error"
        });
      })
    }
  }
}
</script>

<style scoped>
.el-form{
  width:96%;
  float: left;
  margin:2%;
}
.el-form-item{
  width:50%;
  float: left;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
