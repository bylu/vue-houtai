<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="id" prop="id" style="display:none">
          <el-input v-model="form.id"  size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
       <el-form-item label="消息范围" prop="messageType" >
          <el-select v-model="form.messageType" size="small" placeholder="全部">
            <el-option  v-for="(list,index) in selectList.messageinfolist" :key="'message'+ index" :label="list.value" :value="list.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间频率" prop="timeRate">
          <el-input v-model.trim="form.timeRate" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker v-model="form.startTime" align="right" size="small" clearable type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="请输入开始时间" ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="concludeTime" style="margin-left:-10px;">
          <el-date-picker v-model="form.concludeTime" align="right" size="small" clearable type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="请输入结束时间"></el-date-picker>
        </el-form-item>
        <div class="addSpecialcss">
          <el-form-item label="版本限制" prop="changeversion" style="margin-bottom:0px;">
              <el-select v-model="form.changeversion" size="small" placeholder="请选择" style="width:100px;">
                <el-option v-for="(list2,i) in selectList.banbeninfolist" :key="'banben'+i" :label="list2.value" :value="list2.key"></el-option>
              </el-select>
              <el-input placeholder="请输入内容" size="small" v-model.trim="form.version" style="width:428px" >
            </el-input>
          </el-form-item>
        </div>

        <div class="addSpecialcss">
          <el-form-item label="渠道限制" prop="changespreader" style="margin-bottom:0px;">
            <el-select v-model="form.changespreader" size="small" placeholder="请选择" style="width:100px;">
              <el-option v-for="(list3,o) in selectList.qudaoxianzhiinfolist" :key="'channel'+o" :label="list3.value" :value="list3.key"></el-option>
            </el-select>
            <el-input v-model.trim="form.spreader" size="small" style="width:428px;" placeholder="多渠道以:拼接" autocomplete="off"></el-input>

          </el-form-item>
        </div>
        <div class="addSpecialcss">
          <el-form-item label="消息内容" prop="messageString">
            <el-input v-model="form.messageString" type="textarea" style="width:330%;float:left;" :autosize="{ minRows: 12, maxRows: 12}" size="small" placeholder="" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="addSpecialcss">
          <el-form-item label="备注" prop="collectNote">
            <el-input v-model="form.collectNote" type="textarea" style="width:330%;float:left;" :autosize="{ minRows: 2, maxRows: 2}" size="small" placeholder="" autocomplete="off"></el-input>
          </el-form-item>
        </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button  size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
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
           id:"",
           messageType:"3",
           messageString:"",
           startTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD HH:mm:ss"),
           concludeTime:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD HH:mm:ss"),
           timeRate:"",
           changeversion:"0#",
           version:"",
           changespreader:"0#",
           spreader:"",
           collectNote:"",
           createDate:""
        },
        rules: {
            messageString: [
                {required:true,message:'请输入消息内容',trigger:'blur'}
            ],
            startTime:[
                 { required: true, message: '填写开始时间', trigger: 'blur' }
            ],
            concludeTime: [
                { required: true, message: '填写结束时间', trigger: 'blur' }
            ],
            timeRate: [
                { required: true, message: '填写时间频率', trigger: 'blur' }
            ],
            collectNote: [
              { required: true, message: '填写备注', trigger: 'blur' }
            ],
        }
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){
      if(this.isAdd){
        let getdata=sessionStorage.getItem("systemMessageTime");
        if( getdata== null || getdata == ""){
        }else{
          let systemMessageTimeInfo=JSON.parse(sessionStorage.getItem("systemMessageTime"));
          this.form.startTime= systemMessageTimeInfo.startTime;
          this.form.concludeTime=systemMessageTimeInfo.concludeTime;
        }
      }else{
           this.form.id=this.getdata.id;
           this.form.messageType=(this.getdata.messageType).toString();
           this.form.messageString=this.getdata.messageString;
           this.form.startTime= this.moment(this.getdata.startTime).format("YYYY-MM-DD HH:mm:ss");
           this.form.concludeTime=this.moment(this.getdata.concludeTime).format("YYYY-MM-DD HH:mm:ss");
           this.form.timeRate=this.getdata.timeRate;
           this.form.changeversion=this.getdata.changeversion;
           this.form.version=this.getdata.version;
           this.form.changespreader=this.getdata.changespreader;
           this.form.spreader=this.getdata.spreader;
           this.form.collectNote=this.getdata.collectNote;
           this.form.createDate=this.getdata.createDate;
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
          this.loading=true;

          let setversion;
          let setChannel;
          if(this.form.changeversion  == '0#' || this.form.changeversion == ""){
            setversion='';
          }else{
            setversion=this.form.changeversion+this.form.version;
          }

          if(this.form.changespreader == '0#' || this.form.changespreader == "" ){
            setChannel=''
          }else{
            setChannel=this.form.changespreader+this.form.spreader;
          }
          let param={
            id:this.form.id,
            messageType:this.form.messageType,
            messageString:this.form.messageString,
            startTime:this.form.startTime,
            concludeTime:this.form.concludeTime,
            timeRate:this.form.timeRate,
            version:setversion,
            spreader:setChannel,
            collectNote:this.form.collectNote,
            createDate:this.form.createDate
          }
          this.$api.systemMessageadd(param).then(res =>{
            this.loading = false;
            if (res.success) {
              sessionStorage.setItem("systemMessageTime",JSON.stringify(param));
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
              message: '请求失败AAAAA!',
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
  margin:1% 0 ;
}
.el-form-item{
  width:auto;
  margin-bottom:20px;
}
.el-input{
  margin-bottom:0px;
}
.el-select .el-input {
    width: 130px;
}
.el-input{
  margin-bottom:0px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.addSpecialcss{
  width:100%;
  float: left;
}
.dialog-footer{
text-align: right;
padding-right:3%;
margin-bottom: 2%;
}
</style>
