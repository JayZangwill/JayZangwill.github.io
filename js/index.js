//function isPC()
//{
//	var userAgentInfo=navigator.userAgent;/*返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)*/
//   var Agents = ["Android", "iPhone",
//              "SymbianOS", "Windows Phone",
//              "iPad", "iPod"];
//  var flag = 1;
//  for (var v = 0; v < Agents.length; v++) {
//      if (userAgentInfo.indexOf(Agents[v]) > 0) {/*如果返回的信息里有上面的字符串*/
//          flag = 2;
//          break;
//      }
//  }
//  return flag;
//}
$(document).ready(function(){
	$(".name").animate({
		marginTop:'0px',
		opacity: "1",
	},2000);
	$(".back p").delay(2000).animate({
		marginTop:"0px",
		opacity: "1",
	},2000);
	$("#blog").delay(4000).animate({
		opacity:"1",
	},1000);
	$("#chengz").delay(5000).animate({
		marginLeft:"0px",
		opacity:"1",
	},500);
	$("#say").delay(5500).animate({
		marginLeft:"0px",
		opacity:"1",
	},500);
	$("#about").delay(6000).animate({
		marginLeft:"0px",
		opacity:"1",
	},500);
});
