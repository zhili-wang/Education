export default{
    //人性化时间显示
    describeTime(timespan){
      timespan = timespan * 1000
      var dateTime = new Date(timespan);
      var year = dateTime.getFullYear();
      var month = dateTime.getMonth() + 1;
      var day = dateTime.getDate();
      var hour = dateTime.getHours();
      var minute = dateTime.getMinutes();
      var now = new Date();
      var now_new = Date.parse(now.toDateString());  //typescript转换写法

      var milliseconds = 0;
      var timeSpanStr;

      milliseconds = now_new - timespan;

      if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = 'Just now';
      }
      else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + ' Mins ago';
      }
      else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + ' Hours ago';
      }
      else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + ' Days ago';
      }
      else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
        timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
      } else {
        timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      }
      return timeSpanStr;
    },
    //格式化时间戳
    formatTime(timespan) {
        var date = new Date(timespan * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        if(D < 10){
        D = "0" + D;
        }
        return Y + M + D + h + m + s
    }
}