var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	http = require('http'),
	querystring = require('querystring'),
	fs = require("fs"),
	path = require("path"),
	mime = require("mime"), //根据文件扩展名得出mime类型
	cache = {}, //缓存文件的对象
	url = 'mongodb://localhost:27017/myproject', //数据库所在位置
	message, //返回给前台页面的一些信息
	userinfo; //用户的信息

//创建服务器
var server = http.createServer(function(req, res) {
	if(req.method.toLowerCase() === 'post') {
		res.writeHead(200, {
			"Content-Type": 'tapplication/json',
			'charset': 'utf-8',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
		});
		var alldata = '';
		req.on('data', function(chunk) {
			alldata += chunk;
		});
		//用户注册数据处理
		if(req.url === "/reg") {
			req.on('end', function() {
				var dataString = alldata.toString(), //将字符串转换位一个对象
					dataObj = querystring.parse(dataString); //将接收到的字符串转换位为json对象
				MongoClient.connect(url, function(err, db) {
					assert.equal(null, err);
					console.log("链接完毕");
					console.log("===============");
					findDocuments(db, function(doc) {
						for(var i = 0; i < doc.length; i++) {
							if(doc[i].idCard === dataObj.idCard) {
								db.close();
								message = JSON.stringify({
									"message": "repeat"
								});
								res.end(message);
								return;
							}
						}
						insertDocuments(db, dataObj, function() {
							db.close();
							userinfo = dataObj.idCard;
							message = JSON.stringify({
								"message": "success"
							});
							res.end(message);
						});
					});
				});
			});
		} else if(req.url === "/log") { //登录数据处理
			req.on('end', function() {
				var dataString = alldata.toString(), //将字符串转换位一个对象
					dataObj = querystring.parse(dataString); //将接收到的字符串转换位为json对象
				MongoClient.connect(url, function(err, db) {
					assert.equal(null, err);
					console.log("链接完毕");
					console.log("===============");
					findDocuments(db, function(doc) {
						for(var i = 0; i < doc.length; i++) {
							if(doc[i].idCard === dataObj.idCard) {
								if(doc[i].password === dataObj.password) {
									db.close();
									message = JSON.stringify({
										"message": "success"
									});
									userinfo = dataObj.idCard;
									res.end(message);
									console.log("查询完毕");
									console.log("===============");
									return;
								} else {
									db.close();
									message = JSON.stringify({
										"message": "password error"
									});
									console.log("密码错误");
									console.log("===============");
									res.end(message);
									return;
								}
							}
						}
						db.close();
						message = JSON.stringify({
							"message": "nofound"
						});
						res.end(message);
					}, {
						idCard: dataObj.idCard
					});
				});
			});
		} else if(req.url === "/deposit") { //存款处理
			req.on('end', function() {
				var dataString = alldata.toString(), //将字符串转换位一个对象
					dataObj = querystring.parse(dataString); //将接收到的字符串转换位为json对象
				MongoClient.connect(url, function(err, db) {
					assert.equal(null, err);
					console.log("链接完毕");
					console.log("===============");
					findDocuments(db, function(doc) {
						var totalMoney = +doc[0].money + (+dataObj.money);
						updateDocument(db, userinfo, totalMoney, function() {
							db.close();
							message = JSON.stringify({
								"message": +dataObj.money
							});
							res.end(message);
						});
					}, {
						idCard: userinfo
					});
				});
			});
		}else if(req.url === "/draw") { //取款处理
			req.on('end', function() {
				var dataString = alldata.toString(), //将字符串转换位一个对象
					dataObj = querystring.parse(dataString); //将接收到的字符串转换位为json对象
				MongoClient.connect(url, function(err, db) {
					assert.equal(null, err);
					console.log("链接完毕");
					console.log("===============");
					findDocuments(db, function(doc) {
						var totalMoney = +doc[0].money - (+dataObj.money);
						if(totalMoney<0){
							db.close();
							message = JSON.stringify({
								"message": "more"
							});
							res.end(message);
							return;
						}
						updateDocument(db, userinfo, totalMoney, function() {
							db.close();
							message = JSON.stringify({
								"message": +dataObj.money
							});
							res.end(message);
						});
					}, {
						idCard: userinfo
					});
				});
			});
		}
	} else if(req.method.toLowerCase() === 'get') {
		res.writeHead(200, {
			"Content-Type": 'tapplication/json',
			'charset': 'utf-8',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
		});
		//查询余额
		if(req.url === "/findmoney") {
			MongoClient.connect(url, function(err, db) {
				assert.equal(null, err);
				console.log("链接完毕");
				console.log("===============");
				findDocuments(db, function(doc) {
					db.close();
					message = JSON.stringify({
						"message": +doc[0].money
					});
					res.end(message);
				}, {
					idCard: userinfo
				});
			});
		}
	}
});
//设置监听端口
server.listen(1337, function() {
	console.log("127.0.0.1！");
});
/*创建静态文件服务器*/
var index = http.createServer(function(req, res) {
	var filePath = false;
	if(req.url == "/") {
		filePath = "index.html";
	} else {
		filePath = req.url; //将url转为相对路径
	}
	var absPath = './' + filePath;
	serverStatic(res, cache, absPath); //返回静态文件
});
index.listen(80, function() {
	console.log("http//:localhost");
});
//插入操作
function insertDocuments(db, data, callback) {
	var collection = db.collection('documents');
	collection.insertOne(data, function(err, result) {
		assert.equal(err, null);
		console.log("插入完毕");
		console.log("================");
		callback(result);
	});
}
//查找操作
function findDocuments(db, callback, search) {
	// Get the documents collection
	search = search || {};
	var collection = db.collection('documents');
	// Find some documents
	collection.find(search).toArray(function(err, docs) {
		assert.equal(err, null);
		callback(docs);
	});
}
//更新操作
function updateDocument(db, userinfo, money, callback) {
	// Get the documents collection
	var collection = db.collection('documents');
	// Update document where a is 2, set b equal to 1
	collection.updateOne({
		idCard: userinfo
	}, {
		$set: {
			money: money
		}
	}, function(err, result) {
		assert.equal(err, null);
		callback(result);
	});
}
/*文件没找到*/
function send404(res) {
	res.writeHead(404, {
		"Content-Type": "text/plain"
	});
	res.write("错误404:资源没找到。");
	res.end();
}
/*读取文件*/
function sendFile(res, filePath, fileContents) {
	res.writeHead(200, {
		"Content-Type": mime.lookup(path.basename(filePath))
	});
	res.end(fileContents);
}
/*静态文件服务*/
function serverStatic(res, cache, absPath) {
	if(cache[absPath]) //看文件是否在缓存在内存中
	{
		sendFile(res, absPath, cache[absPath]); //从内存返回文件
	} else {
		fs.exists(absPath, function(exists) { //检查文件是否存在
			if(exists) {
				fs.readFile(absPath, function(err, data) { //从硬盘读取
					if(err) {
						send404(res);
					} else {
						cache[absPath] = data;
						sendFile(res, absPath, data);
					}
				});
			} else {
				send404(res);
			}
		});
	}
}