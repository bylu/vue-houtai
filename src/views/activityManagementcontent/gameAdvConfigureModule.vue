<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="130px" class="demo-ruleForm">
       <el-form-item label="id" prop="id" style="display:none;">
          <el-input v-model.trim="form.id"  placeholder="" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="渠道ID" prop="value1">
          <el-input v-model.trim="form.value1" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="value2">
          <el-date-picker v-model="form.value2" align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="" clearable></el-date-picker>
        </el-form-item>

        <el-form-item label="指定不显示渠道" prop="value5">
          <el-input v-model.trim="form.value5"  size="small" placeholder="多版本用;隔开" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="value3">
          <el-date-picker v-model="form.value3" align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="新增弹框次数" prop="value6" style="margin-bottom:0px;">
          <el-input v-model.trim="form.value6"  size="small" placeholder="正整数，默认0" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="注册N天可见"  prop="value8" style="margin-bottom:0px;">
          <el-input v-model.trim="form.value8"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="vip等级可见"  prop="value9" style="margin-bottom:0px;">
          <el-input v-model.trim="form.value9"  size="small" placeholder="-1不限,多等级用,隔开。如1,2,3" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="总充值限制"  prop="value10" style="margin-bottom:0px;">
          <el-input v-model.trim="form.value10"  size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="活动期间注册可见" prop="value7" style="margin-bottom:0px;">
          <el-radio-group v-model="form.value7" size="small">
            <el-radio label="0">不限</el-radio>
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传小图片" prop="value4" style="width:100%">
          <el-input v-model="form.value4" size="small" class="showpic" type="textarea" style="width:320%"  :autosize="{ minRows:4, maxRows: 4}" :readonly="true" placeholder="文件名"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:80px">
          <el-button size="mini" class="chooseAllPic" @click="openAllpicDialog=true"  type="primary">从现有图片库选择</el-button>
          <el-button size="mini" type="danger">上传图片</el-button>
          <input class="file" type="file" @change="uploadFile1" multiple="multiple"/>
        </el-form-item>
        <el-form-item label="已选择的图片:" v-show="choosehide">
            <el-button v-for="(item,index) in choosepic" :key="index" size="medium" type="text" class="choosebtn" @click="openchoosePic(item)">图片{{index + 1}}</el-button>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>

    <!--添加和编辑 弹框-->
    <pcModal v-if="openAllpicDialog" width="40%" :title="isAdd ? '添加' : '编辑'" @closeModal="openAllpicDialog = false">
        <openAllpicDialogModule  @changeData="updataData"   @closedialog="openAllpicDialog = false"></openAllpicDialogModule>
    </pcModal>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata','isAdd'],
  components:{
    openAllpicDialogModule:()=>import('./openAllpicModule.vue')
  },
  data() {
    return {
        openAllpicDialog: false,
        form: {
          id:'',
          value1:'',
          value2:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD HH:mm:ss"),
          value3:this.moment(new Date(new Date().setHours(0, 0, 0, 0))).format("YYYY-MM-DD HH:mm:ss"),
          value4:'',
          value5:'',
          value6:'',
          value7:'0',
          value8:'0',
          value9:'-1',
          value10:'0'
        },
        rules: {
            value1: [
                { required: true, message: '填写渠道ID', trigger: 'blur' }
            ],
            value2: [
                { required:true,message:'填写开始日期',trigger:'blur'}
            ],
            value3: [
                { required:true,message:'填写结束日期',trigger:'blur'}
            ],
            value4: [
                { required: true, message: '请选择文件', trigger: 'blur' }
            ],
            value5: [
                { required: false, message: '填写指定不显示渠道', trigger: 'blur' }
            ],
        },
        choosepic:[],
        choosehide:false,
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
    init(){
      if(this.isAdd){
        let getdata=sessionStorage.getItem("gameAdvTime");
        if( getdata== null || getdata == ""){
        }else{
          let gameAdvTimeInfo=JSON.parse(sessionStorage.getItem("gameAdvTime"));
          this.form.value2=gameAdvTimeInfo.beginTime;
          this.form.value3=gameAdvTimeInfo.endTime;
        }  
      }else{
        this.form.id=this.getdata.id;
        this.form.value1=this.getdata.channelId;
        this.form.value2=this.moment(this.getdata.beginTime).format("YYYY-MM-DD HH:mm:ss");
        this.form.value3=this.moment(this.getdata.endTime).format("YYYY-MM-DD HH:mm:ss");
        this.form.value4=this.getdata.advImgList;
        this.form.value5=this.getdata.noPopVersionList;
        this.form.value6=this.getdata.alonePopGroupid;
        this.form.value7=(this.getdata.limitActivityTimeUser).toString();
        this.form.value8=(this.getdata.limitRegisterTimeUser).toString();
        this.form.value9=(this.getdata.allowVipShow).toString();
        this.form.value10=(this.getdata.limitPaycount).toString();
      }
    },
    uploadFile1(event) {
      if(event==null){
         this.$message.error("图片格式有误!");
         return;
      }
        let file = event.target.files[0]; //获取input的图片file值
        const isJPG = file.type === "image/jpeg";
        const isGIF = file.type === "image/gif";
        const isPNG = file.type === "image/png";
        const isBMP = file.type === "image/bmp";

        if (!isJPG && !isGIF && !isPNG && !isBMP) {
          this.$message.warning("上传图片必须是JPG/GIF/PNG/BMP 格式!");
          return;
        }
        let param = new FormData(); // 创建form对象
        param.append("file", file);
        this.$api.gameAdvConfigsaveImg(param).then(res =>{
          if (res.success) {
              this.form.value4=res.data;
              this.$message.success(res.message);
          } else {
              this.$message.warning(res.message);
          }
        }).catch(err =>{
          this.$message.error(res.message);
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
          let param={
            id:this.form.id,
            channelId:this.form.value1,
            beginTime:this.moment(this.form.value2).format("YYYY-MM-DD HH:mm:ss"),
            endTime:this.moment(this.form.value3).format("YYYY-MM-DD HH:mm:ss"),
            advImgList:this.form.value4,
            noPopVersionList:this.form.value5,
            alonePopGroupid:this.form.value6,
            limitActivityTimeUser:this.form.value7,
            limitRegisterTimeUser:this.form.value8,
            allowVipShow:this.form.value9,
            limitPaycount:this.form.value10,
          }
          let paramsinfo={
            beginTime:this.moment(this.form.value2).format("YYYY-MM-DD HH:mm:ss"),
            endTime:this.moment(this.form.value3).format("YYYY-MM-DD HH:mm:ss"),
          }
          this.$api.gameAdvConfigadd(param).then(res =>{
            this.loading = false;
            if (res.success) {
              sessionStorage.setItem("gameAdvTime",JSON.stringify(paramsinfo));
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
    },
    updataData(data){
      this.form.value4=data;
      this.choosepic = data.split(";")
      this.choosehide=true;
    },
    openchoosePic(data){
      window.open("https://"+data, '_blank')
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
  width:auto;
  float: left;
  margin-bottom:20px;
}
.file{
  opacity: 0.01;
  margin-left: -83px;
}
.choosebtn {
  width: 40px;
  margin-left: 5%;
}
.chooseAllPic{
  margin-left:60px;
}
.el-input{
  margin-bottom:0px;
}
.el-select{
    width:90%;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
  }
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
