this.suite_json2html = {
  'test of test': function(test) {
    test.strictEqual(typeof json2html, 'function');
    test.done();
  },
  'should parse div': function(test) {
    var div_json = { tag: 'div' };
    var expected = '<div></div>';
    var actual = json2html(div_json);
    test.strictEqual(expected, actual);
    test.done();
  },
  'should parse div with text': function(test) {
    var div_json = {
      tag: 'div',
      text: 'this is div'
    };
    var expected = '<div>this is div</div>';
    var actual = json2html(div_json);
    test.strictEqual(expected, actual);
    test.done();
  },
  'should parse div with id': function(test) {
    var div_json = { tag: 'div', attr: {id: 'foo'} };
    var expected = '<div id="foo"></div>';
    var actual = json2html(div_json);
    test.strictEqual(expected, actual);
    test.done();
  },
  'should parse div with class': function(test) {
    var div_json = { tag: 'div', attr: {class: ['bar', 'goo'] }};
    var expected = '<div class="bar goo"></div>';
    var actual = json2html(div_json);
    test.strictEqual(expected, actual);
    test.done();
  },
  'should parse div with id and class': function(test) {
    var div_json = {
      tag: 'div',
      attr: { id: 'foo', class: ['bar', 'goo'] },
      text: 'this is div'
    };
    var expected = '<div id="foo" class="bar goo">this is div</div>';
    var actual = json2html(div_json);
    test.strictEqual(expected, actual);
    test.done();
  },
  'should parse div with child': function(test) {
    var div_json = {
      tag: 'div',
      child: [{
        tag: 'p'
      }]
    };
    var expected = '<div><p></p></div>';
    var actual = json2html(div_json);
    test.strictEqual(expected, actual);
    test.done();
  },
  'should parse div with child': function(test) {
    var div_json = {
      tag: 'div',
      child: [{
        tag: 'p'
      },
      {
        tag: 'textarea'
      }]
    };
    var expected = '<div><p></p><textarea></textarea></div>';
    var actual = json2html(div_json);
    test.strictEqual(expected, actual);
    test.done();
  },
  'should parse I want :)' : function(test) {
    var div_json = {
      tag: 'div',
      attr: {
        id: '#2',
        class: ['slide']
      },
      child: [{
        tag: 'h2',
        text: 'just HTML elements with <code>slide</code>'
      },{
        tag: 'pre',
        attr: {
          id: 'demo',
          class: ['sh_javascript']
        }
      },{
        tag: 'pre',
        attr: {
          id: 'output',
          class: ['sh_javascript']
        }
      },{
        tag: 'input',
        attr: {
          id: 'execute',
          type: 'button'
        },
        value: 'execute'
      }]
    };
    var expected = ''
      + '<div id="#2" class="slide">'
      + '<h2>just HTML elements with <code>slide</code></h2>'
      + '<pre id="demo" class="sh_javascript"></pre>'
      + '<pre id="output" class="sh_javascript"></pre>'
      + '<input id="execute"></input>'
      + '</div>';
    var actual = json2html(div_json);
    test.strictEqual(expected, actual);
    test.done();
  }
};
