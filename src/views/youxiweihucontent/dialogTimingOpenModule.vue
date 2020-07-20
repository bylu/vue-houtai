<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
       <el-form-item label="房间ID"  prop="serveridServersidArray:">
          <el-input v-model.trim="form.serveridServersidArray" size="small" readonly="" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
       
        <el-form-item label="开启时间"  prop="startupTime">
          <el-date-picker v-model="form.startupTime"
            align="right"
            size="small"
            type="datetime"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            placeholder="" clearable
          ></el-date-picker>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: [],
  data() {
    return {
        loading: false,
        form: {
            serveridServersidArray:'',
            startupTime: this.moment(new Date()).format("YYYY-MM-DD")
        },
        rules: {
            value3: [
                {required:true,message:'输入开启时间',trigger:'blur',}
            ]
        },
    }
  },
  mounted(){
    this.init();
  },
  methods: {
  init(){
    let param={
        "kindID": '-1',
        "serverID":'-1',
        "serversid": '-2',
        "nodeID": '-1',
        "coordinationServersId":'-2',
        "serverType": '2'
      }
    this.$api.pkMatchConfigsearchPkServerid(param).then(res =>{
      if (res.success) {
        let paramdata="";
          for(let i=0;i<res.data.records.length;i++){
            paramdata += res.data.records[i].serverID+"m"+ res.data.records[i].serversid+";"
          }
          this.form.serveridServersidArray=paramdata;
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
      this.$emit('closedialog');
    },
    //确认按钮 提交事件
    doSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api.pkMatchConfigtimeStartup(this.form).then(res =>{
            if (res.success) {
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
  width:100%;
  float: left;
  margin-bottom:20px;
}
.el-input{
  width:140%;
}

.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
