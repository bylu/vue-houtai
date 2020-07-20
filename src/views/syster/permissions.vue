<template>
  <div class="modal-body">
    <table id="showtable" >
      <tr>
        <td class="column01">一级菜单</td>
        <td style="width:90%">
          <tr style="width:100%">
            <td class="column02">二级菜单</td>
            <td class="column03">权限
              <input type="checkbox"  class="setcheckAll" @click="checkAll" />全选
              <input type="checkbox"  class="setuncheckAll" @click="uncheckAll" />取消全选
            </td>
          </tr>
        </td>
      </tr>
      <tr v-for="(item , index) in getdatas" :key="index">
        <td class="column01">{{item.title}}</td>
          <td style="width:90%">
            <template v-for="(child,index1) in item.children" >
            <tr style="width:100%" :key="index1">
              <td class="column02">{{child.title}}</td>
              <td class="column03">
                <div class="useroption" v-for="(child2,index2) in child.children" :key="index2">
                  <input type="checkbox" name="list" :checked="child2.cheked"  :value="child2.parentId+'_'+child2.permission" :disabled="child2.disabled" class="set-checkbox" />{{child2.title}}
                </div>
              </td>
            </tr>
            </template>
          </td>
         
      </tr>
    </table>
    <div class="dialog-footer">
      <el-button  size="small" @click="cancel">取消</el-button>
      <el-button :loading="loading" size="small" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["id"],
  data() {
    return {
      loading: false,
      checkedList: [],
      roleId: null,
      getdatas: null
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    //根据id 请求数据
    initData() {
      let roleid = JSON.parse(this.$store.getters.object).roleID;
      let params = { roleId: roleid};
      this.$api.searchrolepermisssion(params).then(res =>{
          if (res.success) {
            this.getdatas = res.data;
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
      }).catch(err =>{
        console.log(err)
      })
    },

    // 取消操作按钮
    cancel() {
      this.$emit("closedialog");
    },
    //确认按钮 点击提交
    doSubmit() {
      this.loading = true;
      let url = this.paramUrl;
      let role=JSON.parse(this.$store.getters.object).roleID;
      let _this=this;
      _this.checkedList = [];
      var objs = $(".useroption").find("input[type='checkbox']");
      for(var   i=0;i<objs.length;i++){
        if (objs[i].type == "checkbox" && objs[i].checked == true  && objs[i].disabled==false){
            var getcheckboxvalue = objs[i].value;
             _this.checkedList.push(getcheckboxvalue);
        }
      }
      let params = { targetRoleId: role, permissions: (_this.checkedList) };
      this.$api.editrolepermisssion(params).then(res =>{
          this.loading = false;
          if (res.success) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.$emit("shuaxin");
            this.$emit("closedialog");
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
      }).catch(err =>{
                 console.log(err)
              })
    },
    checkAll(){
      var objs = $(".useroption").find("input[type='checkbox']");
      for(var   i=0;i<objs.length;i++){
        if (objs[i].type == "checkbox" && objs[i].disabled==false){
          objs[i].checked = true;
        }
        $(".setuncheckAll").prop('checked',false)
      }
    },
    uncheckAll(){
      var objs = $(".useroption").find("input[type='checkbox']");
      for(var   i=0;i<objs.length;i++){
        if (objs[i].type == "checkbox" && objs[i].disabled==false ){
          objs[i].checked = false;
        }
      }
      $(".setcheckAll").prop('checked',false)
    }
  }
};
</script>

<style scoped>
.modal-body {
    height: 600px;
    float: left;
    width: 100%;
    position: relative;
    padding-bottom: 40px;
    overflow-y:scroll;
    font-size: 13px;
    color:#606266
}
  #showtable{
    width:98%;
    height:100%;
    float:left;
    position: relative;
    overflow-y:scroll;
    margin-bottom: 20px;
    border:1px solid #dfe6ec;
    border-bottom:1px solid transparent;
    border-collapse:collapse;
  }
  .dialog-footer{
    width:100%;
    float: left;
    text-align: right;
  }
  .column01{
    width:100px;
    text-align: center;
    border-top:1px solid transparent;
    border-bottom:1px solid #dfe6ec
  }
  .column02{
    width:250px;
    text-align: center;
    border:1px solid #dfe6ec;
    border-top:1px solid transparent;
    padding:5px 0;
  }
  .column03{
    width:93%;
    border-bottom:1px solid #dfe6ec
  }
  .useroption{
    width:auto;
    float: left;
    margin:5px 10px;
  }
</style>
