$(document).ready(function(){
	$(".text").hide();
	$(".yeRen img").mouseenter(function(){
		$(".text").fadeIn("slow");
		$(".text").html("Jay Zangwill偷懒了，我正想找他来K一顿呢！");
	});
	$(".yeRen img").mouseleave(function(){
		$(".text").fadeOut("slow");
	});
	$(".yeRen img").click(function(){
		$(".text").html("点什么点，本大爷是你能点的吗？快把你的臭手拿开！");
	});
});
