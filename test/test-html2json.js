if (typeof window === 'undefined') {
  var assert = require('assert');
  var parseHtml = require('../src/html2json').parseHtml;
  var html2json = require('../src/html2json').html2json;
}

describe('html2json', () => {
  it('test of test', () => {
    assert.strictEqual(typeof html2json, 'function');
  });

  it('should parse div', () => {
    var json = { 'tag' : 'div' };
    var html = '<div></div>';

    var parsedHtml = parseHtml(html);
    assert.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    assert.deepEqual(actual, expected);
  });

  it('should parse div with text', () => {
    var json = {
      tag: 'div',
      text: 'this is div'
    };
    var html = '<div>this is div</div>';

    var parsedHtml = parseHtml(html);
    assert.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    assert.deepEqual(actual, expected);
  });

  it('should parse div with id', () => {
    var json = { tag: 'div', attr: { id: 'foo'} };
    var html = '<div id="foo"></div>';

    var parsedHtml = parseHtml(html);
    assert.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    assert.deepEqual(actual, expected);
  });

  it('should parse div with id and class', () => {
    var json = {
      tag: 'div',
      attr: { id: 'foo', class: ['bar', 'goo'] },
      text: 'this is div'
    };
    var html = '<div id="foo" class="bar goo">this is div</div>';

    var parsedHtml = parseHtml(html);
    assert.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    assert.deepEqual(actual, expected);
  });

  it('should parse div with child', () => {
    var json = {
      tag: 'div',
      child: [{
        tag: 'p'
      }]
    };
    var html = '<div><p></p></div>';

    var parsedHtml = parseHtml(html);
    assert.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    assert.deepEqual(actual, expected);
  });

  it('should parse div with 2 child', () => {
    var json = {
      tag: 'div',
      child: [{
        tag: 'p'
      },{
        tag: 'p'
      }]
    };
    var html = '<div><p></p><p></p></div>';

    var parsedHtml = parseHtml(html);
    assert.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    assert.deepEqual(actual, expected);
  });

  it('should parse div with nested child', () => {
    var json = {
      tag: 'div',
      child: [{
        tag: 'p',
        child: [{
          tag: 'textarea'
        }]
      }]
    };
    var html = '<div><p><textarea></textarea></p></div>';

    var parsedHtml = parseHtml(html);
    assert.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    assert.deepEqual(actual, expected);
  });

  it('should parse div with 2 nested child', () => {
    var json = {
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
    var html = '<div><p><textarea></textarea></p><p></p></div>';

    var parsedHtml = parseHtml(html);
    assert.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    assert.deepEqual(actual, expected);
  });

  it('should parse div with unary & ingored inline tag', () => {
    var json = {
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

    var html = ''
      + '<div id="1" class="foo bar">'
      + '<h2>sample text</h2>'
      + '<input id="execute" type="button" value="execute"/>'
      + '<img src="photo.jpg" alt="photo"/>'
      + '</div>';

    var parsedHtml = parseHtml(html);
    assert.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    assert.deepEqual(actual, expected);
  });

  it('should parse div with inline tag', () => {
    var json = {
      tag: 'div',
      attr: {
        id: '1',
        class: ['foo', 'bar']
      },
      child: [{
        tag: 'p',
        text: 'sample text with tag <strong>like</strong> this'
      },{
        tag: 'p',
        text: '<strong>start</strong> with inline tag'
      }]
    };

    var html = ''
      + '<div id="1" class="foo bar">'
      + '<p>sample text with tag <strong>like</strong> this</p>'
      + '<p><strong>start</strong> with inline tag</p>'
      + '</div>';

    var parsedHtml = parseHtml(html);
    assert.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    assert.deepEqual(actual, expected);
  });

  it('should parse I want to :)', () => {
    var json = {
      tag: 'div',
      attr: {
        id: '1',
        class: ['foo']
      },
      child: [{
        tag: 'h2',
        text: 'sample text with <code>inline tag</code>'
      },{
        tag: 'pre',
        attr: {
          id: 'demo',
          class: ['foo', 'bar']
        }
      },{
        tag: 'pre',
        attr: {
          id: 'output',
          class: ['goo']
        }
      },{
        tag: 'input',
        attr: {
          id: 'execute',
          type: 'button',
          value: 'execute'
        }
      }]
    };
    var html = ''
      + '<div id="1" class="foo">'
      + '<h2>sample text with <code>inline tag</code></h2>'
      + '<pre id="demo" class="foo bar"></pre>'
      + '<pre id="output" class="goo"></pre>'
      + '<input id="execute" type="button" value="execute"/>'
      + '</div>';

    var parsedHtml = parseHtml(html);
    assert.strictEqual(parsedHtml, html);
    var actual = html2json(html);
    var expected = json;
    assert.deepEqual(actual, expected);
  });
});
