<template>
    <div class="showcontent">
        <h4 class="showTit">版本分布用户:</h4>
        <el-row :gutter="24">
            <el-form ref="form" :model="form">
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-date-picker v-model="form.beginTime" clearable size="small" align="right" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
                </el-col>
                <el-col :xs="24" :sm="6" :lg="3">
                    <el-date-picker v-model="form.endTime" clearable size="small" align="right" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
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
            onSubmit(){
                this.loading=true;
                this.$api.excelversionDistributionData(this.form).then(res =>{
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
</style>
