const express = require('express'),
  fs = require('fs'),
  https = require('https'),
  compression = require('compression'),
  privateKey = fs.readFileSync('./certificate/www.jayzangwill.cn.key', 'utf8'),
  certificate = fs.readFileSync(
    './certificate/www.jayzangwill.cn.crt',
    'utf8'
  ),
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
    let result = {
      href: [],
      title: [],
      time: [],
      description: [],
    };
    $('.article-title').each((_, element) => {
      let $element = $(element);
      result.href.push(
        'https://jayzangwill.github.io' + $element.attr('href')
      );
      result.title.push($element.text());
    });
    $('time').each((_, element) => {
      let $element = $(element);
      result.time.push($element.text());
    });
    $('.article-entry').each((_, element) => {
      let $element = $(element);
      result.description.push($element.text());
    });
    res.json({
      message: 'success',
      result,
    });
  });
});

card(app);

app.get('/download', function (req, res) {
  res.download('./resume.pdf', 'resume.pdf', err => {
    console.log(err)
  })
});

// 创建服务器;
app.listen(80);
https.createServer({
  key: privateKey,
  cert: certificate,
}, app).listen(443, () => {
  console.log('server is runing!');
});