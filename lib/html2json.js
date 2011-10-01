function parseHtml(html) {
  var results = '';
  HTMLParser(html, {
    start: function(tag, attrs, unary ) {
      results += '<' + tag;
      for (var i = 0; i < attrs.length; i++) {
        results += ' ' + attrs[i].name + '="' + attrs[i].escaped + '"';
      }
      results += (unary ? '/' : '') + '>';
    },
    end: function(tag ) {
      results += '</' + tag + '>';
    },
    chars: function(text ) {
      results += text;
    },
    comment: function(text ) {
      results += '<!--' + text + '-->';
    }
  });
  return results;
}

function html2json(html) {
  var results = {};
  HTMLParser(html, {
    start: function(tag, attrs, unary ) {
      results.tag = tag;
      if (attrs.length !== 0) {
        var attr = {};
        for (var i = 0; i < attrs.length; i++) {
          attr[attrs[i].name] = attrs[i].value;
        }
        results['attr'] = attr;
      }
    },
    // end: function( tag ) {
    //   log(tag);
    //   results += "</" + tag + ">";
    // },
    chars: function(text ) {
      results.text = text;
    }
    // comment: function( text ) {
    //   log(text);
    //   results += "<!--" + text + "-->";
    // }
  });
  return results;
}

function json2html(json) {
  var html = '';
  var tag = json.tag;
  var text = json.text;
  var children = json.child;
  var buf = [];

  var buildAttr = function(attr) {
    var id = attr.id;
    var classes = attr.class;
    if (id) buf.push(' id="' + id + '"');
    if (classes) {
      buf.push(' class="');
      var class_buf = [];
      for (var i = 0; i < classes.length; i++) {
        class_buf.push(classes[i]);
      }
      buf.push(class_buf.join(' '));
      buf.push('"');
    }
  }

  buf.push('<');
  buf.push(tag);
  json.attr ? buf.push(buildAttr(json.attr)) : null;
  buf.push('>');
  text ? buf.push(text) : null;

  if (children) {
    for (var j = 0; j < children.length; j++) {
      buf.push(json2html(children[j]));
    }
  }

  buf.push('</' + tag + '>');
  return buf.join('');
}
