this.suite_html2json = {
  'test of test': function(test) {
    test.strictEqual(typeof html2json, 'function');
    test.done();
  },
  'should parse div': function(test) {
    var div_html = '<div></div>';
    var expected = { 'tag' : 'div' };
    var parsedHtml = parseHtml(div_html);
    test.strictEqual(parsedHtml, div_html);
    var actual = html2json(div_html);
    test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
    test.done();
  },
  'should parse div with text': function(test) {
    var expected = {
      tag: 'div',
      text: 'this is div'
    };
    var div_html = '<div>this is div</div>';
    var parsedHtml = parseHtml(div_html);
    test.strictEqual(parsedHtml, div_html);
    var actual = html2json(div_html);
    test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
    test.done();
  },
  'should parse div with id': function(test) {
    var expected = { tag: 'div', attr: {id: 'foo'} };
    var div_html = '<div id="foo"></div>';
    var parsedHtml = parseHtml(div_html);
    test.strictEqual(parsedHtml, div_html);
    var actual = html2json(div_html);
    test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
    test.done();
  },
  'should parse div with id and class': function(test) {
    var expected = {
      tag: 'div',
      attr: { id: 'foo', class: ['bar', 'goo'] },
      text: 'this is div'
    };
    var div_html = '<div id="foo" class="bar goo">this is div</div>';
    var parsedHtml = parseHtml(div_html);
    test.strictEqual(parsedHtml, div_html);
    var actual = html2json(div_html);
    test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
    test.done();
  },
  'should parse div with child': function(test) {
    var expected = {
      tag: 'div',
      child: [{
        tag: 'p'
      }]
    };
    var div_html = '<div><p></p></div>';
    var parsedHtml = parseHtml(div_html);
    test.strictEqual(parsedHtml, div_html);
    var actual = html2json(div_html);
    test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
    test.done();
  },
  'should parse div with 2 child': function(test) {
    var expected = {
      tag: 'div',
      child: [{
        tag: 'p'
      },{
        tag: 'p'
      }]
    };
    var div_html = '<div><p></p><p></p></div>';
    var parsedHtml = parseHtml(div_html);
    test.strictEqual(parsedHtml, div_html);
    var actual = html2json(div_html);
    test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
    test.done();
  },
  'should parse div with nested child': function(test) {
    var expected = {
      tag: 'div',
      child: [{
        tag: 'p',
        child: [{
          tag: 'textarea'
        }]
      }]
    };
    var div_html = '<div><p><textarea></textarea></p></div>';
    var parsedHtml = parseHtml(div_html);
    test.strictEqual(parsedHtml, div_html);
    var actual = html2json(div_html);
    test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
    test.done();
  },
  'should parse div with 2 nested child': function(test) {
    var expected = {
      tag: 'div',
      child: [{
        tag: 'p',
        child: [{
          tag: 'textarea'
        }]
      },{
        tag: 'p'
      }]
    };
    var div_html = '<div><p><textarea></textarea></p><p></p></div>';
    var parsedHtml = parseHtml(div_html);
    test.strictEqual(parsedHtml, div_html);
    var actual = html2json(div_html);
    test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
    test.done();
  },
  'should parse div with unary & ingored inline tag': function(test) {
    var expected = {
      tag: 'div',
      attr: {
        id: '1',
        class: ['foo', 'bar']
      },
      child: [{
        tag: 'h2',
        text: 'sample text'
      },{
        tag: 'input',
        attr: {
          id: 'execute',
          type: 'button',
          value: 'execute'
        }
      },{
        tag: 'img',
        attr: {
          src: 'photo.jpg',
          alt: 'photo'
        }
      }]
    };

    var div_html = ''
      + '<div id="1" class="foo bar">'
      + '<h2>sample text</h2>'
      + '<input id="execute" type="button" value="execute"/>'
      + '<img src="photo.jpg" alt="photo"/>'
      + '</div>';

    var parsedHtml = parseHtml(div_html);
    test.strictEqual(parsedHtml, div_html);
    var actual = html2json(div_html);
    test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
    test.done();
  },
  'should parse div with inline tag': function(test) {
    var expected = {
      tag: 'div',
      attr: {
        id: '1',
        class: ['foo', 'bar']
      },
      child: [{
        tag: 'p',
        text: 'sample text with tag <strong>like</strong> this'
      }]
    };

    var div_html = ''
      + '<div id="1" class="foo bar">'
      + '<p>sample text with tag <strong>like</strong> this</p>'
      + '</div>';

    var parsedHtml = parseHtml(div_html);
    test.strictEqual(parsedHtml, div_html);
    var actual = html2json(div_html);
    test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
    test.done();
  }

  // 'should parse I want to :)': function(test) {
  //   var expected = {
  //     tag: 'div',
  //     attr: {
  //       id: '#2',
  //       class: ['slide']
  //     },
  //     child: [{
  //       tag: 'h2',
  //       text: 'just HTML elements with <code>slide</code>'
  //     },{
  //       tag: 'pre',
  //       attr: {
  //         id: 'demo',
  //         class: ['sh_javascript']
  //       }
  //     },{
  //       tag: 'pre',
  //       attr: {
  //         id: 'output',
  //         class: ['sh_javascript']
  //       }
  //     },{
  //       tag: 'input',
  //       attr: {
  //         id: 'execute',
  //         type: 'button'
  //       },
  //       value: 'execute'
  //     }]
  //   };
  //   var div_html = ''
  //     + '<div id="#2" class="slide">'
  //     + '<h2>just HTML elements with <code>slide</code></h2>'
  //     + '<pre id="demo" class="sh_javascript"></pre>'
  //     + '<pre id="output" class="sh_javascript"></pre>'
  //     + '<input id="execute" type="button" value="execute"/>'
  //     + '</div>';

  //   var parsedHtml = parseHtml(div_html);
  //   test.strictEqual(parsedHtml, div_html);
  //   var actual = html2json(div_html);
  //   log('actual  ', JSON.stringify(actual));
  //   log('expected', JSON.stringify(expected));
  //   test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
  //   test.done();
  // }
};
