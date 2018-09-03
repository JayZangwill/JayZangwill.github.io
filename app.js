const express = require('express'),
  assert = require('assert'),
  fs = require('fs'),
  https = require('https'),
  querystring = require('querystring'),
  MongoClient = require('mongodb').MongoClient,
  url = 'mongodb://localhost:27017/myproject', // 数据库所在位置
  compression = require('compression'),
  privateKey = fs.readFileSync('./certificate/www.jayzangwill.cn.key', 'utf8'),
  certificate = fs.readFileSync('./certificate/www.jayzangwill.cn.crt', 'utf8'),
  app = express();
let userinfo; // 用户的信息

app.all('/', function (req, res, next) {
  !req.secure ?
    res.redirect(301, 'https://www.jayzangwill.cn' + req.url) :
    next();
});

app.use(compression());
app.use(express.static(__dirname));

// 注册
app.post('/reg', (req, res) => {
  let alldata = '';
  req.on('data', function (chunk) {
    alldata += chunk;
  });
  req.on('end', () => {
    let dataString = alldata.toString(), // 将字符串转换为一个对象
      dataObj = querystring.parse(dataString); // 将接收到的字符串转换位为json对象
    MongoClient.connect(url, (err, db) => {
      assert.equal(null, err);
      console.log(getTime());
      console.log('connect completed!\n===============\n');
      findDocuments(db, doc => {
        for (let i = 0; i < doc.length; i++) {
          if (doc[i].idCard === dataObj.idCard) {
            db.close();
            res.json({
              message: 'repeat',
            });
            return;
          }
        }
        insertDocuments(db, dataObj, () => {
          db.close();
          userinfo = dataObj.idCard;
          res.json({
            message: 'success',
          });
          console.log(getTime());
          console.log('register completed!\n===============\n');
        });
      });
    });
  });
});

// 登陆
app.post('/log', (req, res) => {
  let alldata = '';
  req.on('data', function (chunk) {
    alldata += chunk;
  });
  req.on('end', () => {
    let dataString = alldata.toString(),
      dataObj = querystring.parse(dataString);
    MongoClient.connect(url, (err, db) => {
      assert.equal(null, err);
      console.log(getTime());
      console.log('connect completed!\n===============\n');
      findDocuments(
        db,
        doc => {
          for (let i = 0; i < doc.length; i++) {
            if (doc[i].idCard === dataObj.idCard) {
              // 如果用户输入身份证在数据库中存在
              if (doc[i].password === dataObj.password) {
                // 如果密码正确则登陆成功
                db.close();
                res.json({
                  message: 'success',
                });
                userinfo = dataObj.idCard;
                console.log(getTime());
                console.log('login success!\n===============\n');
                return;
              } else {
                // 密码错误的话返回错误信息
                db.close();
                res.json({
                  message: 'password error',
                });
                console.log(getTime());
                console.log('password error\n===============\n');
                return;
              }
            }
          }

          // 否则就是输入的身份证不存在
          db.close();
          res.json({
            message: 'nofound',
          });
          console.log(getTime());
          console.log('idCard nofound\n===============\n');
        }, {
          idCard: dataObj.idCard,
        }
      );
    });
  });
});

// 存款
app.post('/deposit', (req, res) => {
  let alldata = '';
  req.on('data', function (chunk) {
    alldata += chunk;
  });
  req.on('end', () => {
    // 如果用户未登录，让用户去登录
    if (!userinfo) {
      res.json({
        message: 'nologin',
      });
      return;
    }
    let dataString = alldata.toString(),
      dataObj = querystring.parse(dataString);
    MongoClient.connect(url, (err, db) => {
      assert.equal(null, err);
      console.log(getTime());
      console.log('connect completed!\n===============\n');
      findDocuments(
        db,
        doc => {
          let totalMoney = +doc[0].money + +dataObj.money;
          updateDocument(db, userinfo, totalMoney, () => {
            db.close();
            res.json({
              message: +dataObj.money,
            });
            console.log(getTime());
            console.log('Deposit completed!\n===============\n');
          });
        }, {
          idCard: userinfo,
        }
      );
    });
  });
});

// 取款
app.post('/draw', (req, res) => {
  let alldata = '';
  req.on('data', function (chunk) {
    alldata += chunk;
  });
  req.on('end', function () {
    if (!userinfo) {
      res.json({
        message: 'nologin',
      });
      return;
    }
    let dataString = alldata.toString(),
      dataObj = querystring.parse(dataString);
    MongoClient.connect(url, (err, db) => {
      assert.equal(null, err);
      console.log(getTime());
      console.log('connect completed!\n===============\n');
      findDocuments(
        db,
        function (doc) {
          let totalMoney = +doc[0].money - +dataObj.money;
          if (totalMoney < 0) {
            db.close();
            res.json({
              message: 'more',
            });
            return;
          }
          updateDocument(db, userinfo, totalMoney, () => {
            db.close();
            res.json({
              message: +dataObj.money,
            });
            console.log('withdrawal completed!\n===============\n');
          });
        }, {
          idCard: userinfo,
        }
      );
    });
  });
});

// 查询余额
app.get('/findmoney', (req, res) => {
  let alldata = '';
  req.on('data', function (chunk) {
    alldata += chunk;
  });
  if (!userinfo) {
    res.json({
      message: 'nologin',
    });
    return;
  }
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log(getTime());
    console.log('connect completed!\n===============\n');
    findDocuments(
      db,
      doc => {
        db.close();
        res.json({
          message: +doc[0].money,
        });
        console.log(getTime());
        console.log('found complete!\n===============\n');
      }, {
        idCard: userinfo,
      }
    );
  });
});

// 登出
app.get('/out', () => {
  userinfo = undefined;
});

// 创建服务器;
app.listen(80);
https
  .createServer({
      key: privateKey,
      cert: certificate,
    },
    app
  )
  .listen(443, () => {
    console.log('server is runing!');
  });

//插入操作
function insertDocuments(db, data, callback) {
  let collection = db.db('myproject').collection('documents');
  collection.insertOne(data, (err, result) => {
    assert.equal(err, null);
    console.log(getTime());
    console.log('insert complete!\n===============\n=');
    callback(result);
  });
}

//查找操作
function findDocuments(db, callback, search) {
  // Get the documents collection
  search = search || {};
  let collection = db.db('myproject').collection('documents');
  // Find some documents
  collection.find(search).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });
}

//更新操作
function updateDocument(db, userinfo, money, callback) {
  // Get the documents collection
  let collection = db.db('myproject').collection('documents');

  // Update document where a is 2, set b equal to 1
  collection.updateOne({
      idCard: userinfo,
    }, {
      $set: {
        money: money,
      },
    },
    (err, result) => {
      assert.equal(err, null);
      callback(result);
    }
  );
}

function getTime() {
  let d = new Date();
  let str = `${d.getFullYear ()}-${d.getMonth () + 1}-${d.getDate ()} ${d.getHours ()}:${d.getMinutes ()}:${d.getSeconds ()}`;
  return str;
}
