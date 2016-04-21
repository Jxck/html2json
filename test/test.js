if (typeof window === 'undefined') {
  var assert = require('assert');
  var html2json = require('../src/html2json').html2json;
  var json2html = require('../src/html2json').json2html;
}

describe('html2json', function() {
  it('test of test', function() {
    assert.strictEqual(typeof html2json, 'function');
  });

  it('should parse div', function() {
    var json = {
      node: 'root',
      child: [
        { node: 'element', tag : 'div' }
      ]
    };
    var html = '<div></div>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });

  it('should parse hr', function() {
    var json = {
      node: 'root',
      child: [
        { node: 'element', tag : 'hr' }
      ]
    };
    var html = '<hr/>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });


  it('should parse multi div', function() {
    var json = {
      node: 'root',
      child: [
        { node: 'element', tag : 'div' },
        { node: 'element', tag : 'div' },
      ]
    };
    var html = '<div></div><div></div>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });


  it('should parse div with text', function() {
    var json = {
      node: 'root',
      child: [
        {
          node: 'element',
          tag: 'div',
          child: [
            {
              node: 'text',
              text: 'this is div'
            }
          ]
        }
      ]
    };
    var html = '<div>this is div</div>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });

  it('should parse div with comment', function() {
    var json = {
      node: 'root',
      child: [
        {
          node: 'element',
          tag : 'div',
          child: [
            { node: 'comment', text: ' foo ' }
          ]
        }
      ]
    };
    var html = '<div><!-- foo --></div>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });

  it('should parse div with id', function() {
    var json = {
      node: 'root',
      child: [
        {
          node: 'element',
          tag: 'div',
          attr: {
            id: 'foo'
          }
        }
      ]
    };
    var html = '<div id="foo"></div>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });

  it('should parse div with id and class', function() {
    var json = {
      node: 'root',
      child: [
        {
          node: 'element',
          tag: 'div',
          attr: {
            id: 'foo',
            class: ['bar', 'goo']
          },
          child: [
            {
              node: 'text',
              text: 'this is div',
            }
          ]
        }
      ]
    };
    var html = '<div id="foo" class="bar goo">this is div</div>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });

  it('should parse div with child', function() {
    var json = {
      node: 'root',
      child: [
        {
          node: 'element',
          tag: 'div',
          child: [
            {
              node: 'element',
              tag: 'p',
              child: [
                {
                  node: 'text',
                  text: 'child'
                }
              ]
            }
          ]
        }
      ]
    };
    var html = '<div><p>child</p></div>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });

  it('should parse div with 2 child', function() {
    var json = {
      node: 'root',
      child: [
        {
          node: 'element',
          tag: 'div',
          child: [
            {
              node: 'element',
              tag: 'p',
              child: [{ node: 'text', text: 'child1' }]
            },
            {
              node: 'element',
              tag: 'p',
              child: [{ node: 'text', text: 'child2' }]
            }
          ]
        }
      ]
    };
    var html = '<div><p>child1</p><p>child2</p></div>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });

  it('should parse div with nested child', function() {
    var json = {
      node: 'root',
      child: [
        {
          node: 'element',
          tag: 'div',
          child: [
            {
              node: 'element',
              tag: 'p',
              child: [
                {
                  node: 'element',
                  tag: 'textarea',
                  child: [
                    { node: 'text', text: 'alert(1);' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
    var html = '<div><p><textarea>alert(1);</textarea></p></div>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });

  it('should parse div with 2 nested child', function() {
    var json = {
      node: 'root',
      child: [
        {
          node: 'element',
          tag: 'div',
          child: [
            {
              node: 'element',
              tag: 'p',
              child: [
                {
                  node: 'element',
                  tag: 'textarea',
                  child: [
                    { node: 'text', text: 'alert(1);' }
                  ]
                }
              ]
            },
            {
              node: 'element',
              tag: 'p',
              child: [
                { node: 'text', text: 'child of div' }
              ]
            }
          ]
        }
      ]
    };
    var html = '<div><p><textarea>alert(1);</textarea></p><p>child of div</p></div>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });

  it('should parse div with unary & ingored inline tag', function() {
    var json = {
      node: 'root',
      child: [
        {
          node: 'element',
          tag: 'div',
          attr: { id: '1', class: ['foo', 'bar'] },
          child: [
            {
              node: 'element',
              tag: 'h2',
              child: [ { node: 'text', text: 'sample text' } ]
            },
            {
              node: 'element',
              tag: 'input',
              attr: { id: 'execute', type: 'button', value: 'execute' }
            },
            {
              node: 'element',
              tag: 'img',
              attr: { src: 'photo.jpg', alt: 'photo' }
            }
          ]
        }
      ]
    };

    var html = ''
      + '<div id="1" class="foo bar">'
      + '<h2>sample text</h2>'
      + '<input id="execute" type="button" value="execute"/>'
      + '<img src="photo.jpg" alt="photo"/>'
      + '</div>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });

  it('should parse div with inline tag', function() {
    var json = {
      node: 'root',
      child: [
        {
          node: 'element',
          tag: 'div',
          attr: { id: '1', class: ['foo', 'bar'] },
          child: [
            {
              node: 'element',
              tag: 'p',
              child: [
                {
                  node: 'text',
                  text: 'text with ',
                },
                {
                  node: 'element',
                  tag: 'strong',
                  child: [
                    { node: 'text', text: 'strong' }
                  ]
                },
                {
                  node: 'text',
                  text: ' tag'
                },
              ]
            },
            {
              node: 'element',
              tag: 'p',
              child: [
                {
                  node: 'element',
                  tag: 'strong',
                  child: [
                    { node: 'text', text: 'start' }
                  ]
                },
                {
                  node: 'text',
                  text: ' with inline tag',
                },
              ]
            }
          ]
        }
      ]
    };

    var html = ''
      + '<div id="1" class="foo bar">'
      + '<p>text with <strong>strong</strong> tag</p>'
      + '<p><strong>start</strong> with inline tag</p>'
      + '</div>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });

  it('should parse I want to :)', function() {
    var json = {
      node: 'root',
      child: [
        {
          node: 'element',
          tag: 'div',
          attr: { id: '1', class: 'foo' },
          child: [
            {
              node: 'element',
              tag: 'h2',
              child: [
                { node: 'text', text: 'sample text with ' },
                { node: 'element', tag: 'code', child: [{ node: 'text', text: 'inline tag' }] }
              ]
            },
            {
              node: 'element',
              tag: 'pre',
              attr: { id: 'demo', class: ['foo', 'bar'] },
              child: [{ node: 'text', text: 'foo' }]
            },
            {
              node: 'element',
              tag: 'pre',
              attr: { id: 'output', class: 'goo' },
              child: [{ node: 'text', text: 'goo' }]
            },
            {
              node: 'element',
              tag: 'input',
              attr: { id: 'execute', type: 'button', value: 'execute' }
            }
          ]
        },
        {
          node: 'element',
          tag: 'hr',
        }
      ]
    };
    var html = ''
      + '<div id="1" class="foo">'
      + '<h2>sample text with <code>inline tag</code></h2>'
      + '<pre id="demo" class="foo bar">foo</pre>'
      + '<pre id="output" class="goo">goo</pre>'
      + '<input id="execute" type="button" value="execute"/>'
      + '</div>'
      + '<hr/>';

    assert.deepEqual(json, html2json(html));
    assert.deepEqual(html, json2html(json));
  });
});
