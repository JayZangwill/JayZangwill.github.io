$(document).ready(function(){
	$("header h1").animate({
		left:"10%",
		opacity: "1",
	},1000);
	$("header h2").delay("1000").animate({
		left:"13%",
		 opacity: "1",
	},1000);
	$("header h3").delay("2000").animate({
		left:"15%",
		 opacity: "1",
	},1000);
	$("header p").delay("3000").animate({
		top:"70%",
		 opacity: "1",
	},500);
	var navGit=document.getElementById("github17");
	var navA=navGit.getElementsByTagName("a")[0];
	var navImg=navA.getElementsByTagName("img")[0];
	navA.onmouseenter=function()
	{
		navImg.src="img/github18.png";
	}
	navA.onmouseleave=function(){
		navImg.src="img/github17.png";
	}
});
