this.suite_html2json = {
  'test of test': function(test) {
    test.strictEqual(typeof html2json, 'function');
    test.done();
  },
  'should parse div': function(test) {
    var div_html = '<div></div>';
    var expected = { "tag" : 'div' };
    var actual = html2json(div_html);
    test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
    test.done();
  }
}