
 export default{
     //下载elx根据数据流处理数据
    downloadXls1(data, name) {
      if (data) {
        if('msSaveOrOpenBlob' in window.navigator){
            // window.URL.createObjectURL Blob URL无法在Microsoft IE和Edge中打开
            window.navigator.msSaveOrOpenBlob(new Blob([data]), name);
        } else {
            let url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' }))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', name)

            document.body.appendChild(link)
            link.click()
        }
      }
    },
    downloadXls(param,name){ //下载elx 只需要提示在下载 不进行处理
      if(param.success){
        if(param.data > 0){
          MessageBox({
            title:'消息提示',
            message: "共有"+ param.data +"条数据，此下载任务已在后台进行下载，查看请到指定页面刷新查看!",
            type: "success"
          });
        }else{
          MessageBox({
          title:'消息提示',
            message: "共有 0 条数据，不进行处理!",
            type: "success"
          });
        }
      }else{
      MessageBox({
        title:'消息提示',
        message: param.message,
        type: "error"
      });
      }
     },
    //获取当前日期
    getCurDate(days){
      let curDateTime = new Date().getTime() + 1000*60*60*24*(+days || 0); // days 前(-)或后(+)的天数
      let curDate = new Date(curDateTime);
      let year = curDate.getFullYear();
      let month = curDate.getMonth() + 1;
      let day = curDate.getDate();
      return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`
    },
    //数字保留两位小数
    numToFixed2(num) {
      if (isNaN(num)) return num;
      return (num).toFixed(2);
    },
    //数字保留两位小数并且百分比
    format100rate(num){
      if (isNaN(+num)) return num;
      return +((+num)* 100).toFixed(2) +"%";
    },
    //添加万分位分隔符
    numTenthousand(num){
      if(num != null){
        return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
          return n.replace(/(\d)(?=(\d{4})+$)/g, function ($1) { // 对整数部分添加分隔符
          return $1 + ",";
          });
        });
      }else{
        return 0;
      }
    },
     //字段显示正负颜色 带字段数字格式化
    col(num){
      const formatNum=this.numTenthousand(num);
      if(null != num || '' !=num){
        if(0<num){
          return "<span style='color:red'>"+formatNum+"</span>";
        }else if(0>num){
          return "<span style='color:green'>"+formatNum+"</span>";
        }else{
          return "<span style='color:black'>"+formatNum+"</span>";
        }
      }else{
          return;
      }
    },
    //字段显示颜色
    addcol(num){
      if(null != num || '' !=num){
        return "<span style='color:blue'>"+num+"</span>";
      }else{
        return;
      }
    },
    //时间毫秒数格式化为天小时分钟秒 方法一
    showDuration(msd){
      var str = "";
      if(msd == null || msd == '') return "0"+"秒";
      else
      var time = parseFloat(msd) / 1000;
      if (null != time && "" != time) {
          if (time > 60 && time < 60 * 60) {
              //var a = parseInt(time / 60.0) < 10 ? ('0' + parseInt(time / 60.0)) : parseInt(time / 60.0);
              var a =  parseInt(time / 60.0);
              var ms = parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60);
              //var b = (ms < 10) ? ('0' + ms) : ms;
              var b = ms;
              time =  a + '分钟' + b+"秒";
          }
          else if (time >= 60 * 60 && time < 60 * 60 * 24) {
              var H = parseInt(time / 3600.0) < 10 ? ('0' + parseInt(time / 3600.0)) : parseInt(time / 3600.0);
              var ms = parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60);
              //var M = (ms < 10) ? ('0' + ms) : ms;
              var M = ms;
              var ss = parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                  parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60);
              // var S = (ss < 10) ? ('0' + ss) : ss;
              var S = ss;
              // time = H + ':' + M + ':' + S;
              time=H + '小时' + M + '分钟' + S+"秒";
          }
          else {
              var d = parseInt(time) < 10 ? ('0' + parseInt(time)) : parseInt(time);
              // time = '00:00:' + d;
              time=d+"秒";
          }
      }
      return time;
    },
    //arg0 被除数,arg1 除数,len 保留小数位数.允许除数为0
    division(arg0, arg1, len) {
      if (arg0 == 0 || arg0 == null) {
        return 0;
      }
      if (arg1 == 0 || arg1 == null) {
        return 0;
      }
      return (arg0 / arg1).toFixed(len);
  },
    accountState(data){
      if(data == null){
          return "";
      }
      else{
          if (data ==1 ) {
            return "<span style='color:red'>禁用</span>";
          }else{
            return "<span style='color:green'>启用</span>";
          }
      }
    },
    //时间毫秒数格式化为天小时分钟秒 方法二
    showDuration1(secondNum){
      var str = "";
      if(secondNum == null || secondNum == '') return "0"+"秒";
      else secondNum = Math.round(secondNum / 1000);
      var temp = this.div( secondNum , 60*60*24 );
      if(temp>0){
          str = str + temp +"天";
          secondNum = secondNum % (60*60*24);
      }
      temp = this.div( secondNum , 60*60 );
      if(temp>0){
          str = str + temp +"时";
          secondNum = secondNum % (60*60);
      }
      temp = this.div( secondNum , 60 );
      if(temp>0){
          str = str + temp +"分";
          secondNum = secondNum % (60);
      }
      if(str.length == 0 || secondNum != 0) {
          str = str +  secondNum  +"秒";
      }
      return str;
    },
    div(exp1, exp2){
      var n1 = Math.round(exp1); //四舍五入
      var n2 = Math.round(exp2); //四舍五入
      var rslt = n1/n2; //除
      if (rslt >= 0){
          rslt = Math.floor(rslt); //返回小于等于原rslt的最大整数。
      }else{
          rslt = Math.ceil(rslt); //返回大于等于原rslt的最小整数。
      }
      return rslt;
    },
    formatStrInfo(str){ //日志记录---技能统计  数据展示的优化
      if (str == null || str == '') {
        return "无";
      } else {
        return str.replace(/,/g,",<br/>");
      }
    },
    splitChart(value){
      if(value == null){
        return value
      }else{
        if(value.length > 6 ){
           return value.substring(0,6)+"....."
        }else{
          return value
        }
      }
     }
 }
 import { Notification, MessageBox,Loading } from 'element-ui'
