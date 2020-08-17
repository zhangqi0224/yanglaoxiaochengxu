//时间戳转换时间  
function toData(number) {
  var n = number * 1000;
  var date = new Date(n);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  var h = date.getHours();
  //分
  var m = date.getMinutes();
  //秒
  var s = date.getSeconds();

  return (Y + M + D + " " + h + ":" + m + ":" + s)
}
function toDay(number) {
  var n = number * 1000;
  var date = new Date(n);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

  var h = date.getHours();
  //分
  var m = date.getMinutes();
  //秒
  var s = date.getSeconds();

  return (Y + M + D)
}
function json2Form(json) {
  var str = [];
  for (var p in json) {
  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
  }
module.exports = {
  toData: toData,
  toDay:toDay,
  json2Form:json2Form
}