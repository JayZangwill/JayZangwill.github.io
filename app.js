const express = require('express'),
  fs = require('fs'),
  https = require('https'),
  compression = require('compression'),
  privateKey = fs.readFileSync('./certificate/www.jayzangwill.cn.key', 'utf8'),
  certificate = fs.readFileSync('./certificate/www.jayzangwill.cn.crt', 'utf8'),
  app = express(),
  cheerio = require('cheerio'),
  superagent = require('superagent'),
  card = require('./bank-card/server');

app.all('*', function (req, res, next) {
  !req.secure && /(\.html)|(#.*)|\/$/.test(req.originalUrl) ?
    res.redirect(301, 'https://www.jayzangwill.cn' + req.url) :
    next();
});

app.use(compression());
app.use(express.static(__dirname));

app.get('/article', (req, res, next) => {
  superagent.get('https://jayzangwill.github.io/blog/').end((err, main) => {
    if (err) {
      console.error(err);
      res.json({
        message: 'err',
      });
      next();
    }
    let $ = cheerio.load(main.text);
    let result = [];
    $('.article-title').each((_, element) => {
      let $element = $(element);
      result.push({
        href: 'https://jayzangwill.github.io' + $element.attr('href'),
        title: $element.text()
      });
    });
    $('time').each((i, element) => {
      let $element = $(element);
      result[i].time = $element.text()
    });
    res.json({
      status: 200,
      message: 'success',
      result,
    });
  });
});

card(app);

// 创建服务器;
app.listen(80);
https.createServer({
  key: privateKey,
  cert: certificate,
}, app).listen(443, () => {
  console.log('server is runing!');
});
