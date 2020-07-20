<template>
<div>
   <el-form  ref="form" label-width="80px" class="demo-ruleForm">
        <el-form-item label="参数描述"  prop="value4">
            <el-input v-model="desc" type="textarea" style="width:98%;" :autosize="{ minRows: 16, maxRows: 16}" size="small" placeholder="" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
</div>
</template>
<script>
export default {
    name: "",
    props:['getdata'],
    data(){
        return{
            desc:''
        }
    },
    mounted(){
        this.desc=this.getdata;
    }
}
</script>
<style scoped>
.el-form {
  width: 100%;
  float: left;
  margin: 3% 0;
}
.el-form-item {
  width: 100%;

}
</style>