<template>
<div>
   <el-form  :model="form" :inline="true" ref="form" class="demo-ruleForm">
        <el-form-item label="房间标识:"  prop="roomid">
          <el-input v-model.trim="form.serverid" size="small"  placeholder="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="游戏服务器列表:">
            <el-radio-group v-model="form.nodeserversid">
              <template v-for="(item,index) in getList" >
                  <el-radio :label="item.id">{{item.serversName}}</el-radio>
              </template>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" size="small"  @click="cancel">取消</el-button>
      <el-button  size="small" type="primary" @click="btnSubmit">保存</el-button>
    </div>
</div>
</template>

<script>
export default {
  name: "",
  props: ['getdata'],
  data() {
    return {
        loading: false,
        form: {
            serverid: this.getdata.serverID,
            nodeserversid:""
        },
        getList:""
    };
  },
  mounted(){
    this.init();
    this.searchserverRoomInfoManageserversname();
  },
  methods: {
    init(){
      this.form.nodeserversid=this.getdata.serversid;
    },
    searchserverRoomInfoManageserversname(){
      this.$api.serverRoomInfoManageserversnameSelect().then(res =>{
        this.loading = false;
        if (res.success) {
          this.getList = res.data.records;
          // this.$store.commit('setObject', JSON.stringify(res.data.records));//保存值
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
        this.resetForm();
        this.$emit('closedialog');
    },
    //保存
    btnSubmit(){
      this.$api.serverMappersave(this.form).then(res =>{
        this.loading = false;
        if (res.success) {
            this.resetForm();
            this.$message({
              dangerouslyUseHTMLString: true,
              message: "<p>"+res.message+"</p>",
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
  margin:2% 0;
}
.el-form-item{
    width:80%;
    float: left;
    margin-bottom:15px;
    margin-left:15%;
}
.el-input{
  margin-bottom: 0px;
}
.el-radio{
    margin:5px 0;
    margin-left:15px;
    width:150px;
}

.dialog-footer{
    text-align: right;
    padding-right:3%;
    margin-bottom: 2%;
}
</style>
