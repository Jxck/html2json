if (!console || !console.time) {
  console.time = function() {};
  console.timeEnd = function() {};
}
var json = {
  tag: 'div',
  attr: {
    id: '1',
    class: ['foo']
  },
  child: [{
    tag: 'h2',
    text: 'sample text with <code>inline tag</code>'
  },{
    tag: 'pre',
    attr: {
      id: 'demo',
      class: ['foo', 'bar']
    }
  },{
    tag: 'pre',
    attr: {
      id: 'output',
      class: ['goo']
    }
  },{
    tag: 'input',
    attr: {
      id: 'execute',
      type: 'button',
      value: 'execute'
    }
  }]
};
console.time('json2html');
var json2html_start = (new Date()).getTime();
for (var i = 0; i < 1000; i++) {
  json2html(json);
}
var json2html_end = (new Date()).getTime();
console.timeEnd('json2html');

var html = ''
  + '<div id="1" class="foo">'
  + '<h2>sample text with <code>inline tag</code></h2>'
  + '<pre id="demo" class="foo bar"></pre>'
  + '<pre id="output" class="goo"></pre>'
  + '<input id="execute" type="button" value="execute"/>'
  + '</div>';

console.time('html2json');
var html2json_start = (new Date()).getTime();
for (var j = 0; j < 1000; j++) {
  html2json(html);
}
var html2json_end = (new Date()).getTime();
console.timeEnd('html2json');

$(function() {
  $('#json2html').text(json2html_end - json2html_start);
  $('#html2json').text(html2json_end - html2json_start);
});
