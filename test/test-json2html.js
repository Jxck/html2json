if (typeof window === 'undefined') {
  var assert = require('assert');
  var json2html = require('../src/html2json').json2html;
}

describe('json2html', function() {
  it('test of test', function() {
    assert.strictEqual(typeof json2html, 'function');
  });

  it('should parse div', function() {
    var json = { tag: 'div' };
    var html = '<div></div>';

    var actual = json2html(json);
    var expected = html;
    assert.strictEqual(actual, expected);
  });

  it('should parse div with text', function() {
    var json = { tag: 'div', text: 'this is div' };
    var html = '<div>this is div</div>';

    var actual = json2html(json);
    var expected = html;
    assert.strictEqual(actual, expected);
  });

  it('should parse div with id', function() {
    var json = { tag: 'div', attr: { id: 'foo'} };
    var html = '<div id="foo"></div>';

    var actual = json2html(json);
    var expected = html;
    assert.strictEqual(actual, expected);
  });

  it('should parse div with id and class', function() {
    var json = {
      tag: 'div',
      attr: { id: 'foo', class: ['bar', 'goo'] },
      text: 'this is div',
    };
    var html = '<div id="foo" class="bar goo">this is div</div>';

    var actual = json2html(json);
    var expected = html;
    assert.strictEqual(actual, expected);
  });

  it('should parse div with child', function() {
    var json = {
      tag: 'div',
      child: [
        { tag: 'p', text: 'child' }
      ]
    };
    var html = '<div><p>child</p></div>';

    var actual = json2html(json);
    var expected = html;
    assert.strictEqual(actual, expected);
  });

  it('should parse div with 2 child', function() {
    var json = {
      tag: 'div',
      child: [
        { tag: 'p', text: 'child1' },
        { tag: 'p', text: 'child2' },
      ]
    };
    var html = '<div><p>child1</p><p>child2</p></div>';

    var actual = json2html(json);
    var expected = html;
    assert.strictEqual(actual, expected);
  });

  it('should parse div with nested child', function() {
    var json = {
      tag: 'div',
      child: [
        {
          tag: 'p',
          child: [
            {
              tag: 'textarea',
              text: 'alert(1);',
            }
          ]
        }
      ]
    };
    var html = '<div><p><textarea>alert(1);</textarea></p></div>';

    var actual = json2html(json);
    var expected = html;
    assert.strictEqual(actual, expected);
  });

  it('should parse div with 2 nested child', function() {
    var json = {
      tag: 'div',
      child: [
        {
          tag: 'p',
          child: [
            {
              tag: 'textarea',
              text: 'alert(1);',
            }
          ]
        },
        {
          tag: 'p',
          text: 'child of div',
        }
      ]
    };
    var html = '<div><p><textarea>alert(1);</textarea></p><p>child of div</p></div>';

    var actual = json2html(json);
    var expected = html;
    assert.strictEqual(actual, expected);
  });

  it('should parse div with unary & ingored inline tag', function() {
    var json = {
      tag: 'div',
      attr: {
        id: '1',
        class: ['foo', 'bar'],
      },
      child: [
        {
          tag: 'h2',
          text: 'sample text',
        },
        {
          tag: 'input',
          attr: {
            id: 'execute',
            type: 'button',
            value: 'execute',
          }
        },
        {
          tag: 'img',
          attr: {
            src: 'photo.jpg',
            alt: 'photo',
          }
        }
      ]
    };

    var html = ''
      + '<div id="1" class="foo bar">'
      + '<h2>sample text</h2>'
      + '<input id="execute" type="button" value="execute"/>'
      + '<img src="photo.jpg" alt="photo"/>'
      + '</div>';

    var actual = json2html(json);
    var expected = html;
    assert.strictEqual(actual, expected);
  });

  it('should parse div with inline tag', function() {
    var json = {
      tag: 'div',
      attr: {
        id: '1',
        class: ['foo', 'bar'],
      },
      child: [
        {
          tag: 'p',
          text: 'sample text with tag <strong>like</strong> this'
        },
        {
          tag: 'p',
          text: '<strong>start</strong> with inline tag'
        }
      ]
    };

    var html = ''
      + '<div id="1" class="foo bar">'
      + '<p>sample text with tag <strong>like</strong> this</p>'
      + '<p><strong>start</strong> with inline tag</p>'
      + '</div>';

    var actual = json2html(json);
    var expected = html;
    assert.strictEqual(actual, expected);
  });

  it('should parse I want to :)', function() {
    var json = {
      tag: 'div',
      attr: {
        id: '1',
        class: ['foo']
      },
      child: [
        {
          tag: 'h2',
          text: 'sample text with <code>inline tag</code>'
        },
        {
          tag: 'pre',
          attr: {
            id: 'demo',
            class: ['foo', 'bar']
          }
        },
        {
          tag: 'pre',
          attr: {
            id: 'output',
            class: ['goo']
          }
        },
        {
          tag: 'input',
          attr: {
            id: 'execute',
            type: 'button',
            value: 'execute'
          }
        }
      ]
    };
    var html = ''
      + '<div id="1" class="foo">'
      + '<h2>sample text with <code>inline tag</code></h2>'
      + '<pre id="demo" class="foo bar"></pre>'
      + '<pre id="output" class="goo"></pre>'
      + '<input id="execute" type="button" value="execute"/>'
      + '</div>';

    var actual = json2html(json);
    var expected = html;
    assert.strictEqual(actual, expected);
  });
});
