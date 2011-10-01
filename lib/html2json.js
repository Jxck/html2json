function html2json() {
}

function json2html(json) {
  var html = '';
  var tag = json.tag;
  var attr = json.attr;
  if (json.attr) {
    var attr = json.attr;
    var id = attr.id;
    var classes = attr.class;
  }
  var buf = [];
  buf.push('<');
  buf.push(tag);
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
  buf.push('>');
  buf.push('</' + tag + '>');
  return buf.join('');
}
