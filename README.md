# html2json & json2html

## Requirements

[htmlparser.js](https://github.com/blowsie/Pure-JavaScript-HTML5-Parser)

repositry includes this at `lib/` as git subtree.


## How to use

### browser

include htmlparser.js & html2json.js scripts:

```html
<script src="https://cdn.rawgit.com/blowsie/Pure-JavaScript-HTML5-Parser/master/htmlparser.js"></script>
<script src="src/html2json.js"></script>
```

### node

```javascript
require('html2json').html2json;
require('html2json').json2html;
```


### result

json:

```javascript
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
```

html:

```html
<div id="1" class="foo">
  <h2>sample text with <code>inline tag</code></h2>
  <pre id="demo" class="foo bar"></pre>
  <pre id="output" class="goo"></pre>
  <input id="execute" type="button" value="execute"/>
</div>
```

```javascript
json === html2json(html);
html === json2html(json);
```

## Documentation

- Basically inline tag is melted into text this make *syntacs higligth* markup clean
- `Input`, `textarea`, `image` tags are act like block tag

## License

MIT
