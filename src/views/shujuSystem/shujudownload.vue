<template>
  <div class="app-container">
    <h3 class="showTit">数据下载</h3>
    <el-row :gutter="32" v-has="'excel_searchFile'">
        <el-card class="box-card">
            <div v-for="(o,index) in filedata" :key="index" class="text item">
                <div  @click="downloadFile(o.url,o.name)" class="itemcontent">{{ o.name}}</div>
                <el-button type="primary" size="small" class="button" @click="delFile(o.url)">删除文件</el-button>
            </div>
        </el-card>
    </el-row>
  </div>
</template>

<script>

    export default {
        name: "",
        data(){
            return{
                filedata:[]
            }
        },
        mounted(){
            this.getFileInfo();
        },
        methods:{
            getFileInfo(){
                this.$api.getdownloadFile().then(res =>{
                    if(res.success){
                        this.filedata=res.data;
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
            downloadFile(attrUrl, attrname){
                this.$api.downloadFile({url: attrUrl}).then(res =>{
                    this.commonJs.downloadXls1(res,attrname)
                }).catch(err =>{
                    this.$message({
                    message: '请求失败!',
                    type: "error"
                    });
                })
            },
          delFile (data) {
            this.$confirm('是否要删除该文件？', '删除操作', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(({ value }) => {
              let param={
                fileurl:data
              }
              this.$api.fileDelete(param).then(res =>{
                this.tableloading=false;
                if (res.success) {
                  this.$message({
                    message: res.message,
                    type: "success"
                  });
                  this.getFileInfo();
                } else {
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
            }).catch(e=>e);
          }
        }
    }
</script>

<style scoped>
 .itemcontent{
     width:30%;
     float: left;
     color: rgb(24, 144, 255);
     cursor: pointer;
     margin-bottom:8px;
 }
</style>
