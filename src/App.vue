<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// import 'vue-transition.css'
export default {
  name: 'app',
}

</script>
<style>
*{
	padding:0;
	margin:0;
}
.app .app-router-view {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	overflow: hidden;
	backface-visibility: hidden;
	transform: translate3d(0, 0, 0);
	transform-style: preserve-3d;
	visibility: visible;
}
.svg-icon{
	width:14px;
	height:14px;
}
.el-table{
   width:99.9%!important;
}
.el-table th.gutter{
    display: table-cell!important;
}
.el-row{
	/* padding:0 10px; */
	box-sizing: border-box;
}
.showTit{
	font-size:18px;
	font-weight: normal;
  	margin-bottom:10px;
	/* margin-left:15px; */
}
.head-container{
	margin-bottom: 10px;
	padding: 10px 20px  0 20px;
}
.el-pagination{
    margin-top:15px;
	float: right;
}
.currentTotal{
	width:auto;
	float:right;
	margin-top: 23px; 
	margin-right:20px;
	margin-left:10px;
	color: #337ab7;
	font-size: 15px;
}
/* .currentTotal .showtotal{
	color:#606266
} */
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width:100%;
}
.el-input,.el-button,.el-select{
    margin-bottom: 10px;
}
.el-select > .el-input {
    margin-bottom: 0px;
}
.el-button{
	margin:0 5px 10px 5px;
}
.el-button+.el-button{
	margin:0 5px 10px 5px;
}
.el-popover p{
	margin-bottom:15px;
}
.userOperaTitlecss{
	margin-bottom:10px;
}
.showcontent{
	width:96%;
    margin-left:2%;
}
.showbuttonclass{
	display: inline-block;
}
.otherdesc{
	width:100%;
	margin-bottom:10px;
	display:flex;
	color:red;
	font-size:14px;
}
</style>
<style lang="scss">

</style>
