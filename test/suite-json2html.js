this.suite_json2html = {
  'test of test': function(test) {
    test.strictEqual(typeof json2html, 'function');
    test.done();
  },
  'should parse div': function(test) {
    var json = { tag: 'div' };
    var html = '<div></div>';

    var actual = json2html(json);
    var expected = html;
    test.strictEqual(actual, expected);
    test.done();
  },
  'should parse div with text': function(test) {
    var json = {
      tag: 'div',
      text: 'this is div'
    };
    var html = '<div>this is div</div>';

    var actual = json2html(json);
    var expected = html;
    test.strictEqual(actual, expected);
    test.done();
  },
  'should parse div with id': function(test) {
    var json = { tag: 'div', attr: { id: 'foo'} };
    var html = '<div id="foo"></div>';

    var actual = json2html(json);
    var expected = html;
    test.strictEqual(actual, expected);
    test.done();
  },
  'should parse div with id and class': function(test) {
    var json = {
      tag: 'div',
      attr: { id: 'foo', class: ['bar', 'goo'] },
      text: 'this is div'
    };
    var html = '<div id="foo" class="bar goo">this is div</div>';

    var actual = json2html(json);
    var expected = html;
    test.strictEqual(actual, expected);
    test.done();
  },
  'should parse div with child': function(test) {
    var json = {
      tag: 'div',
      child: [{
        tag: 'p'
      }]
    };
    var html = '<div><p></p></div>';

    var actual = json2html(json);
    var expected = html;
    test.strictEqual(actual, expected);
    test.done();
  },
  'should parse div with 2 child': function(test) {
    var json = {
      tag: 'div',
      child: [{
        tag: 'p'
      },
      {
        tag: 'p'
      }]
    };
    var html = '<div><p></p><p></p></div>';

    var actual = json2html(json);
    var expected = html;
    test.strictEqual(actual, expected);
    test.done();
  }
};
