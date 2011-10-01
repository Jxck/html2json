function log() {
  console.log.apply(console, arguments);
}

var fixture = {
  tag: 'div',
  attr: {
    id: '#2',
    class: ['slide']
  },
  child: [{
    tag: 'h2',
    value: 'Slides are just HTML elements with a class of <code>slide</code>'
  },{
    tag: 'pre',
    attr: {
      id: 'demo',
      class: 'sh_javascript'
    },
    value: ''
  },{
    tag: 'pre',
    attr: {
      id: 'output',
      class: 'sh_javascript'
    },
    value: ''
  },{
    tag: 'input',
    attr: {
      id: 'execute',
      type: 'button'
    },
    value: 'execute'
  }]
};

this.suite_json2html = {
  'test of test': function(test) {
    test.ok(fixture);
    test.strictEqual(typeof json2html, 'function');
    test.done();
  },
  'should parse div': function(test) {
    var div_json = {
      tag: 'div',
      attr: {
        id: 'test',
        class: ['testClass']
      },
      value: 'this is div'
    };
    var div_html = '<div id="test" class="testClass">this is div</div>';
    test.strictEqual(json2html(div_json), div_html);
    test.done();
  }
};
