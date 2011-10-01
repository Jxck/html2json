this.suite_html2json = {
  // 'test of test': function(test) {
  //   test.strictEqual(typeof html2json, 'function');
  //   test.done();
  // },
  // 'should parse div': function(test) {
  //   var div_html = '<div></div>';
  //   var expected = { 'tag' : 'div' };
  //   var parsedHtml = parseHtml(div_html);
  //   test.strictEqual(parsedHtml, div_html);
  //   var actual = html2json(div_html);
  //   test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
  //   test.done();
  // },
  // 'should parse div with text': function(test) {
  //   var expected = {
  //     tag: 'div',
  //     text: 'this is div'
  //   };
  //   var div_html = '<div>this is div</div>';
  //   var parsedHtml = parseHtml(div_html);
  //   test.strictEqual(parsedHtml, div_html);
  //   var actual = html2json(div_html);
  //   test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
  //   test.done();
  // },
  // 'should parse div with id': function(test) {
  //   var expected = { tag: 'div', attr: {id: 'foo'} };
  //   var div_html = '<div id="foo"></div>';
  //   var parsedHtml = parseHtml(div_html);
  //   test.strictEqual(parsedHtml, div_html);
  //   var actual = html2json(div_html);
  //   test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
  //   test.done();
  // },
  // 'should parse div with id and class': function(test) {
  //   var expected = {
  //     tag: 'div',
  //     attr: { id: 'foo', class: ['bar', 'goo'] },
  //     text: 'this is div'
  //   };
  //   var div_html = '<div id="foo" class="bar goo">this is div</div>';
  //   var parsedHtml = parseHtml(div_html);
  //   test.strictEqual(parsedHtml, div_html);
  //   var actual = html2json(div_html);
  //   test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
  //   test.done();
  // },
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
    log(JSON.stringify(expected));
    log(JSON.stringify(actual));
    test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
    test.done();
  }

//   'should parse div with child': function(test) {
//     var expected = {
//       tag: 'div',
//       child: [{
//         tag: 'p',
//         attr:{
//           id: '1'
//         },
//         child: [{
//           tag: 'textarea',
//           attr: {
//             id: '3'
//           }
//         }]
//       },{
//         tag: 'p',
//         attr: {
//           id: '2'
//         }
//       }]
//     };
//     var div_html = '<div><p id="1"><textarea id="3"></textarea></p><p id="2"></p></div>';
//     var parsedHtml = parseHtml(div_html);
//     test.strictEqual(parsedHtml, div_html);
//     var actual = html2json(div_html);
//     log(JSON.stringify(expected));
//     log(JSON.stringify(actual));
// //    test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
//     test.done();
//   }
// ,
//   'should parse I want to :)': function(test) {
//     var expected = {
//       tag: 'div',
//       attr: {
//         id: '#2',
//         class: ['slide']
//       },
//       child: [{
//         tag: 'h2',
//         text: 'just HTML elements with <code>slide</code>'
//       },{
//         tag: 'pre',
//         attr: {
//           id: 'demo',
//           class: ['sh_javascript']
//         }
//       },{
//         tag: 'pre',
//         attr: {
//           id: 'output',
//           class: ['sh_javascript']
//         }
//       },{
//         tag: 'input',
//         attr: {
//           id: 'execute',
//           type: 'button'
//         },
//         value: 'execute'
//       }]
//     };
//     var div_html = ''
//       + '<div id="#2" class="slide">'
//       + '<h2>just HTML elements with <code>slide</code></h2>'
//       + '<pre id="demo" class="sh_javascript"></pre>'
//       + '<pre id="output" class="sh_javascript"></pre>'
//       + '<input id="execute" type="button" value="execute"/>'
//       + '</div>';

//     var parsedHtml = parseHtml(div_html);
//     test.strictEqual(parsedHtml, div_html);

//     // var actual = html2json(div_html);
//     // log(JSON.stringify(expected));
//     // log(JSON.stringify(actual));
//     // test.strictEqual(JSON.stringify(expected), JSON.stringify(actual));
//     test.done();
//   }

};
