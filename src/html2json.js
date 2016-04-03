(function(global) {

  if (typeof window === 'undefined') {
    require('../lib/Pure-JavaScript-HTML5-Parser/htmlparser.js');
  }

  function q(v) {
    return '"' + v + '"';
  }

  global.parseHtml = function parseHtml(html) {
    var results = '';
    HTMLParser(html, {
      start: function(tag, attrs, unary) {
        results += '<' + tag;

        var attributes = '';
        if (attrs.length > 0) {
          attributes = ' ' + attrs.map(function(attr) {
            return attr.name + '=' + q(attr.escaped);
          }).join(' ');
        }
        results += attributes;
        results += (unary ? '/' : '') + '>';
      },
      end: function(tag) {
        results += '</' + tag + '>';
      },
      chars: function(text) {
        results += text;
      },
      comment: function(text) {
        results += '<!--' + text + '-->';
      }
    });
    return results;
  };

  global.html2json = function html2json(html) {
    html = html.replace(/<!DOCTYPE[\s\S]+?>/, '');

    var bufArray = [];
    var results = {};
    var inlineBuf = [];
    HTMLParser(html, {
      start: function(tag, attrs, unary) {
        var buf = {}; // buffer for single tag
        buf.tag = tag;
        if (attrs.length !== 0) {
          buf.attr = attrs.reduce(function(pre, attr) {
            var name  = attr.name;
            var value = attr.value;

            if (name === 'class') {
              value = value.split(' ');
            }

            pre[name] = value;
            return pre;
          }, {});
        }
        if (unary) {
          // if this tag dosen't have end tag
          // like <img src="hoge.png"/>
          // add to parents
          var parent = bufArray[0];
          if (!(Array.isArray(parent.child))) {
            parent.child = [];
          }
          parent.child.push(buf);
        } else {
          bufArray.unshift(buf);
        }
      },
      end: function(tag) {
        // merge into parent tag
        var buf = bufArray.shift();
        if (bufArray.length === 0) {
          return results = buf;
        }
        var parent = bufArray[0];
        if (!(Array.isArray(parent.child))) {
          parent.child = [];
        }
        parent.child.push(buf);
      },
      chars: function(text) {
        var parent = bufArray[0];
        if (parent) {
          if (!parent.text) {
            parent.text = '';
          }
          parent.text += text;
        }
      },
      comment: function(text) {
        // results += "<!--" + text + "-->";
      }
    });
    return results;
  };

  console.log(global.html2json(`<div><p>bar</p></div>`));


  global.json2html = function json2html(json) {
    // Empty Elements - HTML 4.01
    var empty = ['area', 'base', 'basefont', 'br', 'col', 'frame', 'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param', 'embed'];

    var child = '';
    if (json.child) {
      child = json.child.map(function(c) {
        return json2html(c);
      }).join('');
    }

    var attr = '';
    if (json.attr) {
      attr = Object.keys(json.attr).map(function(key) {
        var value = json.attr[key];
        if (Array.isArray(value)) value = value.join(' ');
        return key + '=' + q(value);
      }).join(' ');
      if (attr !== '') attr = ' ' + attr;
    }

    var tag = json.tag;
    if (empty.indexOf(tag) > -1) {
      // empty element
      return '<' + json.tag + attr + '/>';
    } else {
      // non empty element
      var open = '<' + json.tag + attr + '>';
      var close = '</' + json.tag + '>';
      var text = json.text || '';
      return [open, text, child, close].join('');
    }
  };

})(this);
