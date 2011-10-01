function html2json() {
}

function json2html(json) {
  var html = '';
  var tag = json.tag;

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
  var buf = [];
  buf.push('<');
  buf.push(tag);
  json.attr ? buf.push(buildAttr(json.attr)) : null;
  buf.push('>');
  buf.push('</' + tag + '>');
  return buf.join('');
}
