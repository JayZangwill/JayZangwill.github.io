$(function() {
	var
		pc = isPC(),
		cX,
		cY,
		mX = $(".loading .eyes").offset().left + $(".loading .eyes").width() / 2,
		mY = $(".loading .eyes").offset().top + $(".loading .eyes").height() / 2, //眼睛中心位置
		$loadP = $(".loading p"),
		loadPText,
		time,
		n = 0,
		myAudio,
		first=true,
		readyFlag = 0,
		myImg = new Image();
	if(pc) { //如果是移动端就不请求音乐
		myAudio=new Audio();
		myAudio.src = "hp.ogg";
		$(myAudio).attr({
			loop: "true",
			autoplay: "true"
		});
		myAudio.oncanplaythrough = function() {
			readyFlag++;
			if(first){
			myAudio.pause();
			first=false;
			}
			if(readyFlag === 2) {
				completeLoading(time, myAudio);
			}
		}
	}
	myImg.src = "bulid/img/home.png";
	myImg.onload = function() {
		readyFlag++;
		if(readyFlag === 2||(!pc&&readyFlag===1)) {
			completeLoading(time, myAudio);
		}
	}
	$(document).on("mousemove", function(e) {
		cX = e.pageX;
		cY = e.pageY;
		$(".loading .eyes,.loading .hilites").css({
			top: mY - 40 + (cY - mY) * 0.044 + "px",
			left: mX - 45 + (cX - mX) * 0.011 + "px"
		});
	});
	/*省略号*/
	time = setInterval(function() {
		if(n <= 5) {
			loadPText = $loadP.html();
			$loadP.html(loadPText + ".");
			n++;
		} else {
			$loadP.html("加载中，请稍后");
			n = 0;
		}
	}, 500);
	//判断是不是电脑
	function isPC() {
		var userAgentInfo = navigator.userAgent; /*返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)*/
		var Agents = ["Android", "iPhone",
			"SymbianOS", "Windows Phone",
			"iPad", "iPod"
		];
		var flag = 1;
		for(var v = 0; v < Agents.length; v++) {
			if(userAgentInfo.indexOf(Agents[v]) > 0) { /*如果返回的信息里有上面的字符串*/
				flag = 0;
				break;
			}
		}
		return flag;
	}
});

function completeLoading(time, myAudio) {
	var $canvas = $('<canvas id="canvas" width="300" height="300"></canvas>'),
		$bgImg = $('<img src="bulid/img/home.png" alt="主页图片">'),
		$soundPlay = $('<a href="javascript:;" title="音乐暂停"><i class="iconfont music-disable">&#xe638;</i></a>'),
		$soundPause = $('<a href="javascript:;" title="音乐播放"><i class="iconfont music">&#xe612;</i></a>'),
		$name = $('<h1>Jay Zangwill</h1>'),
		$bank = $('<a href="bank-card/index.html">bank-card(temp)</a>'),
		$home = $('<li><a href="home.html" title="进入主页">my home</a></li>'),
		$blog = $('<li><a href="https://JayZangwill.github.io/blog" title="我的博客">my blog</a></li>'),
		$github = $('<li><a href="https://github.com/JayZangwill" title="github">my github</a></li>');

	/*加载完毕*/
	$("#loading").remove();
	clearInterval(time);
	$(document).unbind("mousemove");
	$(".canvas-wrap").append($canvas);
	$(".bg-img").append($bgImg);
	$(".links").append($bank).append($home).append($blog).append($github);
	$(".name-wrap").append($name);
	if(myAudio) {
		var $viedo = $('<video loop autoplay><source src="home.mp4" type="video/mp4"></video>');
		$(".video").append($viedo);
		$(".sound-switch").append($soundPlay).append($soundPause);
	}
	myAudio.play();
	//canvas部分
	if(document.getElementById("canvas").getContext) {
		var canvas = document.getElementById("canvas"),
			context = canvas.getContext("2d"),
			height = 10 * Math.sin(Math.PI / 3), //等边三角的高,14是边长
			houer,
			minute,
			date,
			second = new Date().getSeconds() * 360 / 60;
		drawClock(second);
		setInterval(function() {
			second = second === 360 ? new Date().getSeconds() * 360 / 60 : ++second; //让时钟走得更准
			drawClock(second);
		}, 60000 / 360);

		function drawClock(s) {
			date = new Date();
			houer = date.getHours();
			minute = date.getMinutes();
			context.clearRect(0, 0, 300, 300);
			//刻度
			for(var i = 0; i < 360; i++) {
				context.save();
				context.strokeStyle = "#b4531e";
				context.beginPath();
				context.translate(150, 150);
				context.rotate(i * Math.PI / 180);
				context.moveTo(0, -140);
				context.lineTo(0, -120);
				context.stroke();
				context.closePath();
				context.restore();
			}
			//时针
			context.save();
			context.strokeStyle = "#ffdc35";
			context.lineWidth = 4;
			context.beginPath();
			context.translate(150, 150);
			context.rotate(houer * 30 * Math.PI / 180);
			context.moveTo(0, 0);
			context.lineTo(0, -50);
			context.stroke();
			context.closePath();
			context.restore();
			//分针
			context.save();
			context.strokeStyle = "#ffe153";
			context.lineWidth = 2;
			context.beginPath();
			context.translate(150, 150);
			context.rotate(minute * 6 * Math.PI / 180);
			context.moveTo(0, 0);
			context.lineTo(0, -70);
			context.stroke();
			context.closePath();
			context.restore();
			//秒针
			context.save();
			context.fillStyle = "#f9f937";
			context.beginPath();
			context.translate(150, 150);
			context.rotate(s * Math.PI / 180);
			context.moveTo(0, -105 - height);
			context.lineTo(-7, -105);
			context.lineTo(7, -105);
			context.fill();
			context.closePath();
			context.restore();
			//大圆
			context.save();
			context.beginPath();
			context.strokeStyle = "#fff";
			context.arc(150, 150, 100, 0, 2 * Math.PI);
			context.stroke();
			context.closePath();
			context.restore();
			//中心
			context.beginPath();
			context.arc(150, 150, 8, 0, 2 * Math.PI);
			context.fill();
			context.stroke();
			context.closePath();

			context.save();
			context.fillStyle = "#b4531e";
			context.beginPath();
			context.arc(150, 150, 7, 0, 2 * Math.PI);
			context.fill();
			context.stroke();
			context.closePath();
			context.restore();
			//渐变
			for(var i = 0; i < 100; i++) {
				context.save();
				context.lineWidth = 0.5;
				context.strokeStyle = "rgba(255,255,255," + (100 - i) / 100 + ")";
				context.beginPath();
				context.translate(150, 150); //将开始点放到画布中心
				context.rotate((s - i) * Math.PI / 180);
				context.moveTo(0, -140);
				context.lineTo(0, -120);
				context.closePath();
				context.stroke();
				context.restore();
			}
		}
	}
	//音乐控制部分
	var isPlay = true,
		startOffset = 0,
		startTime = 0,
		soundSwitch = $(".sound-switch a i"),
		sound = document.getElementById("bgSound");
	soundSwitch.on("click", function() {
		if(isPlay) {
			$(soundSwitch[0]).css({
				zIndex: "-2",
				opacity: "0"
			});
			$(soundSwitch[1]).css({
				zIndex: "0",
				opacity: "1"
			});
				myAudio.pause();
			isPlay = false;
		} else {
			$(soundSwitch[0]).css({
				zIndex: "0",
				opacity: "1"
			});
			$(soundSwitch[1]).css({
				zIndex: "-2",
				opacity: "0"
			});
				myAudio.play();
			isPlay = true;
		}
	});
}