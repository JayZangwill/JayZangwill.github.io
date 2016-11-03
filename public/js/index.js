document.onreadystatechange = completeLoading;

function completeLoading() {
	//页面初始化部分
	if(document.readyState === "complete") {
		$("#loading").remove();
		var bufferSource,
			aContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
		getSound();
		$(function() {
			var as = audiojs.createAll();
			var $canvas = $('<canvas id="canvas" width="300" height="300"></canvas>'),
				$bgImg=$('<img src="public/img/home.png" alt="主页图片">'),
				$soundPlay = $('<a href="javascript:;" title="音乐暂停"><i class="iconfont music-disable">&#xe638;</i></a>'),
				$soundPause = $('<a href="javascript:;" title="音乐播放"><i class="iconfont music">&#xe612;</i></a>'),
				$viedo = $('<video src="home.mp4" loop autoplay><source src="home.mp4" type="video/mp4"></video>');
				$name = $('<h1>Jay Zangwill</h1>'),
				$home = $('<li><a href="home.html" title="进入主页">my home</a></li>'),
				$blog = $('<li><a href="https://github.com/JayZangwill/blog" title="我的博客">my blog</a></li>'),
				$github = $('<li><a href="https://github.com/JayZangwill" title="github">my github</a></li>');
			$(".canvas-wrap").append($canvas);
			$(".bg-img").append($bgImg);
			$(".sound-switch").append($soundPlay).append($soundPause);
			$(".links").append($home).append($blog).append($github);
			$(".name-wrap").append($name);
			$(".video").append($viedo);
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
					drawClock(second);
					second = second === 360 ? new Date().getSeconds() * 360 / 60 : ++second;
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
					if(aContext) {
						bufferSource[bufferSource.stop ? "stop" : "noteOff"](0);
					}
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
					if(aContext) {
						getSound();
					}
					isPlay = true;
				}
			});
		});

		function getSound() {
			var xmlhttp = new XMLHttpRequest();
			if(aContext) {
				aContext = new(window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
			} else {
				return;
			}
			xmlhttp.open("GET", "hp.ogg", true);
			xmlhttp.responseType = "arraybuffer";
			xmlhttp.send();
			xmlhttp.onload = function() {
				aContext.decodeAudioData(xmlhttp.response, function(buffer) {
					bufferSource = aContext.createBufferSource();
					bufferSource.buffer = buffer;
					bufferSource.loop = true;
					bufferSource.connect(aContext.destination);
					bufferSource[bufferSource.start ? "start" : "noteOn"](0);
				}, function(err) {
					alert(err);
				});
			}
		}
	}
}