function html2json(html) {
  var buf = [];
  var tagBuf = '';
  var i = 0;
  for (i; i < html.length; i++) {
    if (html[i] === '<') {
      for (++i; i < html.length; i++) {
        if (html[i] === '>') break;
        tagBuf += html[i];
      }
      buf.push(tagBuf);
      tagBuf = '';
    }
  }
  return { tag: buf.shift() };
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
