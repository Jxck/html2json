# Pure JavaScript HTML5 Parser #


A working demo can be seen [here](http://htmlpreview.github.io/?https://github.com/blowsie/Pure-JavaScript-HTML-Parser/blob/master/demo.html).

_Credit goes to John Resig for his [code](http://ejohn.org/blog/pure-javascript-html-parser/) written back in 2008 and Erik Arvidsson for his [code](http://erik.eae.net/simplehtmlparser/simplehtmlparser.js) written prior to that._

This code has been updated to work with HTML 5 to fix several problems.




## 4 Libraries in One! ##

### A SAX-style API ###

Handles tag, text, and comments with callbacks. For example, let’s say you wanted to implement a simple HTML to XML serialization scheme – you could do so using the following:

    var results = "";
 
    HTMLParser("<p id=test>hello <i>world", {
      start: function( tag, attrs, unary ) {
        results += "<" + tag;
     
        for ( var i = 0; i < attrs.length; i++ )
          results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';
     
        results += ">";
      },
      end: function( tag ) {
        results += "</" + tag + ">";
      },
      chars: function( text ) {
        results += text;
      },
      comment: function( text ) {
        results += "<!--" + text + "-->";
      }
    });
 
    results == '<p id="test">hello <i>world</i></p>"

### XML Serializer ###

Now, there’s no need to worry about implementing the above, since it’s included directly in the library, as well. Just feed in HTML and it spits back an XML string.

    var results = HTMLtoXML("<p>Data: <input disabled>")
    results == '<p>Data: <input disabled="disabled"></p>'


### DOM Builder ###

If you’re using the HTML parser to inject into an existing DOM document (or within an existing DOM element) then htmlparser.js provides a simple method for handling that:

    // The following is appended into the document body
    HTMLtoDOM("<p>Hello <b>World", document)
     
    // The follow is appended into the specified element
    HTMLtoDOM("<p>Hello <b>World", document.getElementById("test"))


### DOM Document Creator ###

This is a more-advanced version of the DOM builder – it includes logic for handling the overall structure of a web page, returning a new DOM document.

A couple points are enforced by this method:

 - There will always be a html, head, body, and title element.
 - There will only be one html, head, body, and title element (if the user specifies more, then will be moved to the appropriate locations and merged).
link and base elements are forced into the head.

You would use the method like so:

    var dom = HTMLtoDOM("<p>Data: <input disabled>");
    dom.getElementsByTagName("body").length == 1
    dom.getElementsByTagName("p").length == 1


While this library doesn’t cover the full gamut of possible weirdness that HTML provides, it does handle a lot of the most obvious stuff. All of the following are accounted for:

**Unclosed Tags:**

    HTMLtoXML("<p><b>Hello") == '<p><b>Hello</b></p>'
**Empty Elements:**

    HTMLtoXML("<img src=test.jpg>") == '<img src="test.jpg">'

**Block vs. Inline Elements:**

    HTMLtoXML("<b>Hello <p>John") == '<b>Hello </b><p>John</p>'
**Self-closing Elements:**

    HTMLtoXML("<p>Hello<p>World") == '<p>Hello</p><p>World</p>'
**Attributes Without Values:**

    HTMLtoXML("<input disabled>") == '<input disabled="disabled">'
