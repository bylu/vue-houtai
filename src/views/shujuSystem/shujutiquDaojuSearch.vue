<template>
    <div class="showcontent">
        <h4 class="showTit">当前道具余量:</h4>
        <el-row :gutter="24">
            <el-form ref="form" :model="form">
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-input v-model.trim="form.itemId" size="small" placeholder="道具ID" clearable></el-input>
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
                   itemId:""
                },
                loading:false
            }
        },
        methods:{
            onSubmit(){
                if(this.form.itemId =="" || this.form.itemId == null || typeof(this.form.itemId) == undefined){
                    this.$message({
                      message: '请输入道具id',
                      type: "error"
                    });
                return
                }
                this.loading=true;
                let param={
                    itemId:parseInt(this.form.itemId)
                }
                this.$api.exceluserItemAllowance(param).then(res =>{
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
</style>
