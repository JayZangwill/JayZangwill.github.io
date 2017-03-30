<template>
	<div>
		<div class="row">
			<div id="feSkills" class="col-md-12"></div>
		</div>
		<div class="row">
			<div id="toolSkills" class="col-md-12"></div>
		</div>
		<div class="row">
			<div class="col-md-12 describe">
				<h3>补充</h3>
				<ol>
					<li>熟练HTML、DIV+CSS的页面布局，能够根据设计图完成页面制作。</li>
					<li>熟悉CSS2.1规范，了解外边距折叠等特性。</li>
					<li>熟悉ES5/ES6，对原型、闭包、继承等有自己的理解。</li>
					<li>熟练使用原生javascript以及常用javascript库，如：jQuery、Vue等。</li>
					<li>熟练掌握jQuery、bootstrap，并阅读过jQuery部分源码，能独立封装出jQuery一些常用功能。</li>
					<li>能够熟练使用git&github进行团队合作。</li>
					<li>熟练使用scss预编译css代码。</li>
					<li>熟练运用ajax实现异步数据传递，熟悉JSON等数据交换格式。</li>
					<li>了解Angular、Zepto，如有需要可快速上手。</li>
					<li>了解node、mongodb。</li>
					<li>了解http、tcp/ip协议。</li>
					<li>有linux系统使用经验</li>
					<li>快速的学习能力，吃苦耐劳，有强烈的敬业精神和团队协作精神，能够承受一定的压力，能迅速的适应各环境，并融合其中。有积极进取的工作精神和实际动手能力比较注重代码的整洁和复用性、规范性，追求高性能且简洁的代码。
</li>
					<li>关注新技术，熟悉es6，并且有一颗勇于探索未知的心。</li>
					<li>具有良好的审美能力。</li>
				</ol>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	#feSkills,
	#toolSkills {
		height: 300px;
		@media screen and (max-width: 547px) {
			height: 600px;
		}
	}
	
	.describe {
		margin-bottom: 25px;
		
		color: #fff;
		li {
			list-style-type: circle;
			
			font-size: 16px;
			a {
				&:link,
				&:visited {
					color: #B4531E;
				}
				&:hover {
					text-decoration: none;
					
					color: lighten(#B4531E, 20%);
				}
			}
		}
	}
</style>
<script>
	export default {
		name: 'feSkills',
		data() {
			return {
				links: [{
					href: "/introduct",
					info: "个人简介"
				}, {
					href: "/feSkills",
					info: "技能"
				}, {
					href: "/experience",
					info: "项目经验"
				}]
			}
		},
		mounted: function() {
			var feSkills = echarts.init(document.getElementById('feSkills')),
				toolSkills = echarts.init(document.getElementById('toolSkills')),
				fontOption = _createOption("前端技能", [{
					text: 'html',
					max: 90
				}, {
					text: 'css',
					max: 90
				}, {
					text: 'javscript',
					max: 90
				}], [{
					text: 'jquery',
					max: 90
				}, {
					text: 'bootstrap',
					max: 90
				}, {
					text: 'vue',
					max: 90
				}, {
					text: 'angular',
					max: 90
				}, {
					text: 'scss',
					max: 100
				}], [80, 80, 85], [80, 80, 65, 45, 70]),
				toolOption = _createOption("工具和IDE", [{
					text: 'git&github',
					max: 100
				}, {
					text: 'ps(切图)',
					max: 100
				}, {
					text: 'grunt&gulp',
					max: 100
				}], [{
					text: 'HBulider',
					max: 100
				}, {
					text: 'brackets',
					max: 100
				}, {
					text: 'sublime',
					max: 100
				}], [80, 80, 80], [90, 90, 70]);
			feSkills.setOption(fontOption);
			toolSkills.setOption(toolOption)

			function _createOption(title, items1, items2, value1, value2) {
				return {
					baseOption: {
						title: {
							text: title,
							x: "center",
							textStyle: {
								color: "#fff"
							}
						},
						radar: [{
							indicator: items1,
							shape: 'circle',
							splitNumber: 4,
							name: {
								textStyle: {
									color: '#fff',
									fontSize: 16
								}
							},
							splitArea: {
								areaStyle: {
									color: ['#e6976b', '#df783f', '#db682a', '#ca5d22']
								}
							},
							axisLine: {
								lineStyle: {
									color: 'rgba(255, 255, 255, 0.8)'
								}
							},
							splitLine: {
								lineStyle: {
									color: 'rgba(255, 255, 255, 0.8)'
								}
							}
						}, {
							indicator: items2,
							shape: 'circle',
							splitNumber: 4,
							name: {
								textStyle: {
									color: '#fff',
									fontSize: 16
								}
							},
							splitArea: {
								areaStyle: {
									color: ['#e6976b', '#df783f', '#db682a', '#ca5d22']
								}
							},
							axisLine: {
								lineStyle: {
									color: 'rgba(255, 255, 255, 0.8)'
								}
							},
							splitLine: {
								lineStyle: {
									color: 'rgba(255, 255, 255, 0.8)'
								}
							}
						}],
						series: [{
							type: 'radar',
							data: [{
								value: value1,
								label: {
									normal: {
										show: true,
										formatter: function(params) {
											return params.value;
										},
										textStyle: {
											color: "#fff",
											fontSize: 14
										}
									},
								},
								areaStyle: {
									normal: {
										opacity: 0.9,
										color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
											color: '#e6976b',
											offset: 0
										}, {
											color: '#db682a',
											offset: 1
										}])
									}
								}
							}]
						}, {
							type: 'radar',
							radarIndex: 1,
							data: [{
								value: value2,
								label: {
									normal: {
										show: true,
										formatter: function(params) {
											return params.value;
										},
										textStyle: {
											color: "#fff",
											fontSize: 14
										}
									},
								},
								areaStyle: {
									normal: {
										opacity: 0.9,
										color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [{
											color: '#e6976b',
											offset: 0
										}, {
											color: '#db682a',
											offset: 1
										}])
									}
								}
							}]
						}]
					},
					media: [{
						option: {
							radar: [{
								radius: 70,
								center: ['20%', '60%']
							}, {
								radius: 70,
								center: ['70%', '60%']
							}]
						}
					}, {
						query: {
							maxWidth: 500
						},
						option: {
							legend: {
								right: 10,
								top: '15%',
								orient: 'vertical'
							},
							radar: [{
								radius: 90,
								center: ['50%', '30%']
							}, {
								radius: 90,
								center: ['50%', '70%']
							}]
						}
					}]
				}
			}

			function _delate(fn, delate) {
				var time = null;
				return function() {
					var context = this;
					clearTimeout(time);
					time = setTimeout(function() {
						fn.call(context);
					}, 500);
				}
			}
			window.addEventListener("resize", _delate(feSkills.resize, 500));
			window.addEventListener("resize", _delate(toolSkills.resize, 500));
		}
	}
</script>