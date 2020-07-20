<template>
  <div>
    <el-form
      label-width="100px"
      label-position="right">
      <el-form-item label="上传文件:"  prop="fileName">
        <a href="javascript:;" class="a-upload">
          <input type="file" id="fileM1" name="file" enctype="multipart/form-data" @change="uploadFile" style="font-size:14px">点击这里上传文件
        </a>
        <div class="showFileName">{{showthisFileName}}</div>
        <div class="uploadTip">*只能上传.xls, .xlsx文件</div>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button  size="small" @click="cancel">取消</el-button>
      <el-button  size="small" type="primary" :loading="submitfileloading" @click="btnSubmit" :disabled="isDisable">提交数据</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    props: [],
    data() {
      return {
        fileName:"",
        showthisFileName:"",
        submitfileloading:false,
        isDisable:false,
      }
    },
    mounted(){

    },
    methods: {
      //取消按钮操作
      cancel() {
        this.$emit('closedialog');
      },
      uploadFile(event) {
        if(event==null){
          this.$message.error("请上传文件!");
          return;
        }
        let file = event.target.files[0]; //获取input的图片file值
        let extension = file.name.split('.')[1] === 'xls';
        let extension2 = file.name.split('.')[1] === 'xlsx'
        if(!extension && !extension2){
          this.$message.warning("输入的文件格式不正确");
          return false ;
        }
        this.showthisFileName="文件上传中。。。";
        let param = new FormData(); // 创建form对象
        param.append("file", file);
        this.$api.systemMailimportList(param).then(res =>{
          if (res.success) {
            this.$message.success(res.message);
            this.showthisFileName=event.target.files[0].name
          } else {
            this.$message.warning(res.message);
            this.showthisFileName=""
          }
        }).catch(err =>{
          this.$message.error(res.message);
        })
      },
      btnSubmit(){
        this.submitfileloading=true;
        this.isDisable = true ;
        setTimeout(() => {
          this.isDisable = false
        }, 5000)
        this.$api.systemMailimportListbegin().then(res =>{
          this.submitfileloading=false;
          if (res.success) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.$emit("shuaxin");
            this.$emit("closedialog");
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
    width:auto;
    float: left;
    margin-bottom:20px;
  }
  .el-select{
    width:90%;
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
    text-align: center;
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
  .uploadTip{
    width:100%;
    float: left;
  }
  .dialog-footer{
    text-align: right;
    padding-right:3%;
    margin-bottom: 2%;
  }
</style>
