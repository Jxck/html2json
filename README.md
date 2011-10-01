html2json & json2html
============================================

## Requirements

[htmlparser.js](http://ejohn.org/files/htmlparser.js)

## How to use

include htmlparser.js & html2json.js scripts:

  <script src="http://ejohn.org/files/htmlparser.js"></script>
  <script src="lib/html2json.js"></script>

json:

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

html:

  <div id="1" class="foo">
    <h2>sample text with <code>inline tag</code></h2>
    <pre id="demo" class="foo bar"></pre>
    <pre id="output" class="goo"></pre>
    <input id="execute" type="button" value="execute"/>
  </div>

result:

   json === html2json(html);
   html === json2html(json);


## Documentation

- Basically inline tag is melted into text this make *syntacs higligth* markup clean
- `Input`, `textarea`, `image` tags are act like block tag

## License

???

