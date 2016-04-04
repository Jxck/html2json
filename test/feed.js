var html2json = require('../src/html2json').html2json;
var json2html = require('../src/html2json').json2html;

var xml = require('fs').readFileSync('atom.xml').toString().trim();
xml = xml.replace(/<?.*?>\n/, '');

var json = html2json(xml);
var feed = json.child[0];
var entries = feed.child.filter((e) => {
  return e.tag === 'entry';
}).map((e) => {
  return e.child.filter((e) => e.tag === 'link').map((e) => e.attr.href)[0];
});
console.log(entries);

