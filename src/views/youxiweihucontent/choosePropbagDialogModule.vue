<template>
<div>
   <el-form  class="demo-ruleForm">
       <div class="showItem" v-for="(item,i) in getjsondata" :key="i">
           <label>{{item.fullname}}*</label>
           <input :data-attr="item.id" class="items" type="text" />
       </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" size="small"  @click="cancel">取消</el-button>
      <el-button  size="small" type="success" @click="btnSubmit()">保存配置</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: [''],
  data() {
    return {
       getjsondata:''
    };
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
        this.$api.pkMatchConfigpropBag().then(res =>{
            this.loading = false;
            if (res.success) {
                this.getjsondata=res.data
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
    btnSubmit(){
        var obj={};
        var objStr="";
        $(".items").each(function(){
            if(this.value != ""){
                let propId=$(this).attr("data-attr");
                let propCount=parseInt($(this).val());
                obj[propId]=propCount;
                objStr+=$(this).parent().find("label").html() + parseInt($(this).val())+";";
            }
        });
        let param={
                items:JSON.stringify(obj),
                itemsStr:objStr,
                type:1
            }
        this.$api.pkMatchConfigsavePropBag(param).then(res =>{
            this.loading = false;
            if (res.success) {
            this.$message({
                    message: res.message,
                    type: "success"
                });
                this.$emit('shuxin');
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
    }
  }
};
</script>

<style scoped>
.el-form{
  width:98%;
  float: left;
  margin-left:2%;
}
.showItem{
    width:28%;
    display: inline-block;
    float: left;
    margin-bottom:15px;
}
.showItem label{
    width:70%;
    float: left;
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 12px;
    color: #606266;
    line-height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.showItem input{
    width:20%;
    text-align: center;
    margin:8px 0 0 5px;
    height: 30px;
    line-height: 30px;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    outline: none;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)
}

.dialog-footer{
    text-align: right;
    padding-right:3%;
    margin-bottom: 2%;
}
</style>
