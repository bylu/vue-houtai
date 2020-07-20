<template>
    <div class="showcontent">
        <h4 class="showTit">指定用户信息:</h4>
        <el-row :gutter="24">
            <el-form ref="form" :model="form">
                <el-col :xs="12" :sm="6" :lg="5">
                    <a href="javascript:;" class="a-upload">
                        <input type="file" id="fileM1" name="file" @change="uploadFile" style="font-size:14px">点击这里上传文件
                    </a>
                    <div class="showFileName"></div>
                    <label style="width:100%;float:left;margin-top:15px; font-weight:normal">导入一批用户id(格式txt,多个用户以,隔开)</label>
                </el-col>

                <el-col :xs="12" :sm="6" :lg="3">
                    <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
                </el-col>
                <el-col :xs="12" :sm="6" :lg="3">
                    <el-date-picker v-model="form.endTime"  clearable size="small" align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="2">
                    <el-button :loading="loading" type="primary" size="small" @click="onSubmit()">查询</el-button>
                </el-col>
            </el-form>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: "",
        data(){
            return{
                form: {
                    beginTime:this.moment(new Date()).format("YYYY-MM-DD"),
                    endTime:this.moment(new Date()).format("YYYY-MM-DD")
                },
                loading:false
            }
        },
        methods:{
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
                    this.$api.excelspecifyUserInformationimport(param).then(res =>{
                        if (res.success) {
                          this.$message.success(res.message);
                          $(".showFileName").html(file.name);
                        } else {
                            this.$message.warning(res.message);
                            $(".showFileName").html("");
                        }
                    }).catch(err =>{
                        this.$message({
                        message: '请求失败!',
                        type: "error"
                        });
                    })
                },
            onSubmit(){
                this.loading=true;
                this.$api.excelspecifyUserInformation(this.form).then(res =>{
                    this.loading=false;
                    this.commonJs.downloadXls(res,'新建文件'+'.xlsx')
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
  width:50%;
  float: left;
  margin-left:220px;
  margin-bottom:15px;
  color:#1355e8f7
}
</style>
