<template>
	<div>
		<div class="row">
			<div id="fontEnd" class="col-md-12"></div>
		</div>
		<div class="row">
			<div id="tool" class="col-md-12"></div>
		</div>
		<div class="row">
			<div class="col-md-12 describe">
				<h3>补充</h3>
				<ol>
					<li>熟悉web语义化及w3c标准，熟练掌握DOM、BOM、AJAX、JSON。热衷研究原生js。</li>
					<li>曾阅读过jQuery的部分源码，能自己<strong>独立封装出</strong>jQuery的一些常用功能</li>
					<li>注重代码的规范性，和浏览器及手机端的兼容</li>
					<li>能够熟练使用git&github进行团队合作</li>
					<li>比较注重代码的<strong>整洁和复用性</strong>，追求<strong>高性能且简洁的代码</strong></li>
					<li>了解node和mongodb并且独立设计出一套基于node和mongodb的<a href="http://www.jayzangwill.cn/bank-card/index.html">系统</a></li>
					<li>有linux系统使用经验</li>
					<li>关注新技术，熟悉es6，并且有一颗勇于探索未知的心</li>
					<li>追求完美，代码出现bug会想各种办法解决</li>
					<li>有较强的学习能力做事认真，性格开朗</li>
				</ol>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	#fontEnd,
	#tool {
		height: 300px;
		@media screen and (max-width: 547px) {
			height: 600px;
		}
	}
	
	.describe {
		color: #fff;
		margin-bottom: 25px;
		li {
			list-style-type: circle;
			a {
				&:link,
				&:visited {
					color: #B4531E;
				}
				&:hover {
					color: lighten(#B4531E, 20%);
					text-decoration: none;
				}
			}
		}
	}
</style>
<script>
	export default {
		name: 'fontEnd',
		data() {
			return {
				links: [{
					href: "/introduct",
					info: "个人简介"
				}, {
					href: "/skills",
					info: "技能"
				}, {
					href: "/experience",
					info: "项目经验"
				}]
			}
		},
		mounted: function() {
				var fontEnd = echarts.init(document.getElementById('fontEnd')),
				tool = echarts.init(document.getElementById('tool')),
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
				}], [80, 80, 80], [80, 80, 65, 45, 70]),
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
			fontEnd.setOption(fontOption);
			tool.setOption(toolOption)

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
			window.addEventListener("resize", _delate(fontEnd.resize, 500));
			window.addEventListener("resize", _delate(tool.resize, 500));
		}
	}
</script>