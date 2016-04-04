var html2json = require('../src/html2json').html2json;
var json2html = require('../src/html2json').json2html;

var https = require('https');
https.get('https://blog.jxck.io/feeds/atom.xml', function(res) {
  res.setEncoding('utf8');
  var html = '';
  res.on('data', function(data) {
    html += data;
  });
  res.on('end', function(data) {
    var json = html2json(html);
    var feed = json.child[0];
    var entries = feed.child.filter((e) => {
      return e.tag === 'entry';
    }).map((e) => {
      return e.child.filter((e) => e.tag === 'link').map((e) => e.attr.href)[0];
    });
    console.log(entries);
  });
});
