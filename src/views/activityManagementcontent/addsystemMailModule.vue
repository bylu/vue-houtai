<template>
<div>
   <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="120px" class="demo-ruleForm">
        <el-form-item label="邮件标题"  prop="sTitle">
          <el-input v-model.trim="form.sTitle" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="抬头"  prop="sHeader">
          <el-input v-model="form.sHeader" :readonly="status ? false : 'readonly'" size="small" placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="正文"  prop="sContent" style="width:88%;">
           <el-input v-model="form.sContent" clearable type="textarea" style="width:280%" :autosize="{ minRows: 9, maxRows: 9}" size="small" placeholder="填写正文" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="定时发送"  prop="starttime" style="width:48%;">
          <el-date-picker v-model.trim="form.starttime" clearable align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"  format="yyyy-MM-dd HH:mm:ss" placeholder="不填写默认及时发送" ></el-date-picker>
        </el-form-item>
        <el-form-item label="领取时限"  prop="endDate" style="width:48%;margin-bottom:0px;margin-left:-50px;">
          <el-date-picker v-model.trim="form.endDate" clearable align="right" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"  format="yyyy-MM-dd HH:mm:ss" placeholder="不填写默认及时发送" ></el-date-picker>
        </el-form-item>
        <el-form-item label="物品"  prop="sItems"  style="width:88%;margin-bottom:0px;">
          <el-input v-model.trim="form.sItems" clearable size="small"  style="width:270%" placeholder='JSON格式:{"100001":1,"100002":2}' autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="渠道控制"  prop="channel" style="width:88%;margin-bottom:0px;">
           <el-input v-model.trim="form.channel" clearable size="small" style="width:270%" placeholder="仅限某些渠道，用:分割，例如1:2;排除某些渠道，用ex#1:2语法。空则不控制渠道" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="可领取版本"  prop="version" style="margin-bottom:0px;">
          <el-input v-model.trim="form.version" clearable size="small" placeholder="多版本用;分割（不填默认全部）" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型"  prop="type" style="margin-bottom:0px;">
            <el-select v-model="form.type" size="small" placeholder="请选择">
              <el-option v-for="list in selectList.emailTypelist" :key="list.key" :label="list.value" :value="list.key"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="VIP限制"  prop="vipList" style="margin-bottom:0;">
          <el-input v-model.trim="form.vipList" clearable  size="small" placeholder="VIP等级用逗号隔开" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="有效期注册可见"  prop="registerUserVisible" style="margin-bottom:0;">
           <el-select v-model="form.registerUserVisible" size="small" placeholder="请选择">
              <el-option v-for="list in selectList.registertimeisshowlist" :key="list.key" :label="list.value" :value="list.key"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="指定活动排除"  prop="excludeActType" >
          <el-input v-model.trim="form.excludeActType" clearable size="small" placeholder="活动类型ID用逗号隔开" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="测试用户ID"  prop="userid" >
          <el-input v-model.trim="form.userid" clearable size="small" placeholder="不填写或者-表示发送全部" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="指定用户" style="width:88%;margin-bottom:0px;">
           <el-input v-model="form.importUserIds"  size="small" placeholder="" autocomplete="off"></el-input>
            <a href="javascript:;" class="a-upload">
                <input type="file" id="fileM1" name="file" @change="uploadFile" style="font-size:14px">点击这里上传文件
            </a>
            <div class="showFileName"></div>
        </el-form-item>
        <em class="usertip">*上传的文件内容中玩家id用逗号隔开</em>
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
  props: ['getdata','isAdd'],
  data() {
    return {
        loading: false,
        status:false,

        form: {
           sTitle:"",
           sHeader:"亲爱的玩家",
           sContent:"",
           sFooter:"百易科技",
           sItems:"",
           starttime:"",
           endDate:"",
           version:"",
           type:"-1",
           channel:"",
           registerUserVisible:"-1",
           vipList:"",
           excludeActType:"",
           userid:"",
           importUserIds:""
        },
        rules: {
            sTitle: [
                { required: true, message: '填写邮件标题', trigger: 'blur' }
            ],
            sContent: [
                { required: true, message: '填写邮件正文', trigger: 'blur' }
            ],
            endDate: [
                { required: true, message: '填写领取时限', trigger: 'blur' }
            ]
        },
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    //新增和编辑今日入页面初始化
     init(){
       if(this.isAdd){
        let getdata=sessionStorage.getItem("systemMailInfo");
        if( getdata== null || getdata == ""){
        }else{
          let systemMailInfoMsg=JSON.parse(sessionStorage.getItem("systemMailInfo"));
          this.form.sTitle=systemMailInfoMsg.sTitle;
          this.form.sContent=systemMailInfoMsg.sContent;
          this.form.sItems=systemMailInfoMsg.sItems;
          this.form.starttime=systemMailInfoMsg.starttime;
          this.form.endDate=systemMailInfoMsg.endDate;

          this.form.version=systemMailInfoMsg.version;
          this.form.type=(systemMailInfoMsg.type).toString();
          this.form.channel=systemMailInfoMsg.channel
          //this.form.xxx=systemMailInfoMsg.xxx;

          this.form.registerUserVisible=(systemMailInfoMsg.registerUserVisible).toString();
          this.form.vipList=systemMailInfoMsg.vipList;
          this.form.excludeActType=systemMailInfoMsg.excludeActType;
          this.form.userid=systemMailInfoMsg.userid;
        }
       }else{
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
          if(this.form.userid != "" && this.form.importUserIds != ""){
               this.$message({
                message: '指定用户或者测试用户ID只能填写一个',
                type: "error"
              });
              return ;
          }
          // if(this.form.userid == "" || this.form.userid == null){
          //     this.form.userid="-1";
          // }
          let param={
            sTitle:this.form.sTitle,
            sHeader:this.form.sHeader,
            sContent:this.form.sContent,
            sFooter:this.form.sFooter,
            sItems:this.form.sItems,
            starttime:this.form.starttime,
            endDate:this.form.endDate,
            version:this.form.version,
            type:this.form.type,
            channel:this.form.channel,
            registerUserVisible:this.form.registerUserVisible,
            vipList:this.form.vipList,
            excludeActType:this.form.excludeActType,
            userid:this.form.userid,
            importUserIds:this.form.importUserIds
          }
          this.$api.systemMailadd(param).then(res =>{
            this.loading = false;
            if (res.success) {
              sessionStorage.setItem("systemMailInfo",JSON.stringify(param));
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
    uploadFile(event){
       if(event==null){
         this.$message.error("请上传文件!");
         return;
      }
        let file = event.target.files[0];
        let extension = file.name.split('.')[1] === 'txt';
        if(!extension ){
            this.$message.warning("输入的文件格式不正确");
            return false ;
        }
        $(".showFileName").html(file.name);
        let param = new FormData(); // 创建form对象
        param.append("file", file);
        this.$api.systemMailimport(param).then(res =>{
          if (res.success) {
              this.form.importUserIds=res.data;
              this.$message.success(res.message);
              $(".showFileName").html(file.name);
          } else {
              this.$message.warning(res.message);
              $(".showFileName").html("");
          }
        }).catch(err =>{
          this.$message.error(res.message);
        })
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
  width:auto;
  margin-bottom:20px;
}
.el-input,.el-select{
    width:100%;
    margin-bottom:0px;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width:100%;
}
.a-upload {
    padding: 4px 10px;
    height: 30px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1;
    float: left;
}
input[type=file] {
    display: block;
}
.a-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
}
.showFileName, .fileerrorTip {
    float: left;
    padding: 4px 10px;
    height: 30px;
    line-height: 20px;
}
.usertip{
  width:62%;
  float: left;
  margin-left:120px;
  color:#1355e8f7
}
.dialog-footer{
  text-align: right;
  padding-right:3%;
  margin-bottom: 2%;
}
</style>
