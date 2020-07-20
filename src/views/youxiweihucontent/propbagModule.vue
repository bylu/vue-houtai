<template>
<div>
    <div style="width:80%;margin-left:10%">
      <el-row :gutter="32">
          <el-button type="success" @click="choosePropbag=true" size="small" style="margin:3% 0%">选择道具包</el-button>
      </el-row>
      <el-row :gutter="32">
          <el-table
                class="maintable"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%" size="small"
                border
            >
                <el-table-column label="礼包名字" prop="itemsStr" ></el-table-column>

                <el-table-column label="操作"  width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary"  @click="changeHandler(scope.row.items,scope.row.itemsStr)">选择</el-button>
                        <el-popover :ref="scope.row.id" placement="top" width="180">
                            <p>确定删除本条数据吗？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                                <el-button type="primary" size="mini" @click="subDelete(scope.row.items)">确定</el-button>
                            </div>
                            <el-button slot="reference" type="danger" size="mini">删除</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="warning" size="mini"  @click="cancel">取消</el-button>
    </div>

     <pcModal v-if="choosePropbag"  width="40%" title="道具包"  @closeModal="choosePropbag = false">
        <choosePropbagDialog @shuxin="init()"  @closedialog="choosePropbag = false" ></choosePropbagDialog>
    </pcModal>
</div>
</template>

<script>
export default {
  name: "",
  props: [''],
  components:{
      choosePropbagDialog:() => import('./choosePropbagDialogModule.vue')
  },
  data() {
    return {
        tableData:[],
        choosePropbag:false,
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      this.$api.pkMatchConfiginitItemsPackage().then(res =>{
        if (res.success) {
          this.tableData=res.data
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
    //删除操作
    subDelete(itemdata){
      let param={"items":itemdata}
      this.$api.pkMatchConfigdelPackage(param).then(res =>{
        if (res.success) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.init();
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
    changeHandler(value,value2){
        this.$emit('changeData',value+"&"+value2);
        this.$emit('closedialog');
    }
  }
};
</script>

<style scoped>
.el-form{
  width:100%;
  float: left;
}
.el-form-item{
    width:80%;
    float: left;
    margin-bottom:15px;
    margin-left:15%;
}
.el-radio{
    width:35%;
    margin:5px 0;
    margin-left:15px;
}
.el-table{
  margin-bottom:2%;
}
.dialog-footer{
    text-align: right;
    padding-right:3%;
    margin-bottom: 2%;
}
</style>
