!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){(function(e){var n=/^\s+|\s+$/g,i=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,r=/^0o[0-7]+$/i,a=parseInt,c="object"==typeof e&&e&&e.Object===Object&&e,s="object"==typeof self&&self&&self.Object===Object&&self,l=c||s||Function("return this")(),u=Object.prototype.toString,f=Math.max,h=Math.min,p=function(){return l.Date.now()};function d(t,e,n){var i,o,r,a,c,s,l=0,u=!1,d=!1,_=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function m(e){var n=i,r=o;return i=o=void 0,l=e,a=t.apply(r,n)}function g(t){return l=t,c=setTimeout(w,e),u?m(t):a}function b(t){var n=t-s;return void 0===s||n>=e||n<0||d&&t-l>=r}function w(){var t=p();if(b(t))return x(t);c=setTimeout(w,function(t){var n=e-(t-s);return d?h(n,r-(t-l)):n}(t))}function x(t){return c=void 0,_&&i?m(t):(i=o=void 0,a)}function O(){var t=p(),n=b(t);if(i=arguments,o=this,s=t,n){if(void 0===c)return g(s);if(d)return c=setTimeout(w,e),m(s)}return void 0===c&&(c=setTimeout(w,e)),a}return e=y(e)||0,v(n)&&(u=!!n.leading,r=(d="maxWait"in n)?f(y(n.maxWait)||0,e):r,_="trailing"in n?!!n.trailing:_),O.cancel=function(){void 0!==c&&clearTimeout(c),l=0,i=s=o=c=void 0},O.flush=function(){return void 0===c?a:x(p())},O}function v(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function y(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==u.call(t)}(t))return NaN;if(v(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=v(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(n,"");var c=o.test(t);return c||r.test(t)?a(t.slice(2),c?2:8):i.test(t)?NaN:+t}t.exports=function(t,e,n){var i=!0,o=!0;if("function"!=typeof t)throw new TypeError("Expected a function");return v(n)&&(i="leading"in n?!!n.leading:i,o="trailing"in n?!!n.trailing:o),d(t,e,{leading:i,maxWait:e,trailing:o})}}).call(this,n(1))},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}n.r(e);var r=0,a=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};i(this,t),this._canvas=this._createCanvas(e,n),this._context=this._canvas.getContext("2d")}var e,n,a;return e=t,(n=[{key:"_iterator",value:function(){return r++}},{key:"_createCanvas",value:function(t,e){var n=e.width,i=void 0===n?400:n,o=e.height,a=void 0===o?400:o,c=e.padding,s=void 0===c?40:c,l=e.insertPosition,u=void 0===l?"afterBegin":l,f=document.createElement("canvas");return f.id="chart_area_".concat(r),f.width=i,this._width=i,f.height=a,this._height=a,t.insertAdjacentElement(u,f),f.style.backgroundColor="white",this._iterator(),this._initAngles(s),f}},{key:"_initAngles",value:function(t){var e=t,n=t,i=t,o=t;this.angles={topLeft:[e,n],bottomRight:[this._width-i,this._height-o]}}},{key:"clearChartArea",value:function(){this.ctx.clearRect(this.angles.topLeft[0],this.angles.topLeft[1],this.chartArea.width,this.chartArea.height)}},{key:"destroy",value:function(){this._canvas.remove()}},{key:"canvas",get:function(){return this._canvas}},{key:"ctx",get:function(){return this._context}},{key:"sizes",get:function(){return{width:this._width,height:this._height}}},{key:"chartArea",get:function(){return{width:this.angles.bottomRight[0]-this.angles.topLeft[0],height:this.angles.bottomRight[1]-this.angles.topLeft[1]}}}])&&o(e.prototype,n),a&&o(e,a),t}();function c(){return(c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}).apply(this,arguments)}function s(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var l=function(){function t(e){var n=c({},e);!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._ctx=n.ctx,this.name=n.name||"",this.color=n.color||"gray",this._coords=n.coords,this._isVertical=n.coords[0][0]===n.coords[1][0],this._gap=6,this._widthSerif=4,this._defaultSerifs=this._isVertical?[this._coords[0][1],Math.round((this._coords[1][1]-this._coords[0][1])/2)+this._coords[0][1],this._coords[1][1]]:[this._coords[0][0],Math.round((this._coords[1][0]-this._coords[0][0])/2)+this._coords[0][0],this._coords[1][0]]}var e,n,i;return e=t,(n=[{key:"drawAxe",value:function(){this._ctx.beginPath(),this._ctx.lineWidth="1",this._ctx.strokeStyle=this.color,this._ctx.moveTo(this._coords[0][0],this._coords[0][1]),this._ctx.lineTo(this._coords[1][0],this._coords[1][1]),this._ctx.stroke(),this.drawSerifs(),this._labelAxe()}},{key:"drawSerifs",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this._defaultSerifs,n=this._coords[0][0],i=n-this._widthSerif,o=this._coords[0][1],r=o+this._widthSerif;this._ctx.strokeStyle=this.color,this._ctx.beginPath(),e.map((function(e){return t._isVertical?[i,e]:[e,o]})).forEach((function(e){t._ctx.moveTo(e[0],e[1]),t._isVertical?t._ctx.lineTo(n,e[1]):t._ctx.lineTo(e[0],r)})),this._ctx.stroke()}},{key:"_labelAxe",value:function(){var t,e;this.name.length&&(this._isVertical?(t=this._gap,e=this._coords[0][1]-this._gap-10):(t=this._coords[1][0]+this._gap,e=this._coords[1][1]+this._gap),this._ctx.fillText(this.name,t,e))}}])&&s(e.prototype,n),i&&s(e,i),t}();function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],i=!0,o=!1,r=void 0;try{for(var a,c=t[Symbol.iterator]();!(i=(a=c.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){o=!0,r=t}finally{try{i||null==c.return||c.return()}finally{if(o)throw r}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function h(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var p=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._ctx=e.ctx,this._points=e.points,this.label=e.label,this.color=e.color,this._pointRadius=e.pointRadius||1,this._lineWeight=e.lineWeight}var e,n,i;return e=t,(n=[{key:"mathPointsOneGraph",value:function(){this.sortPoints=this._points.map((function(t){return t})).sort((function(t,e){return t[0]-e[0]})),this.minX=this.sortPoints[0][0],this.maxX=this.sortPoints[this.sortPoints.length-1][0];var t=this._points.map((function(t){return t[1]})).sort((function(t,e){return t-e}));this.minY=t[0],this.maxY=t[t.length-1]}},{key:"drawLine",value:function(){var t=this._sortPointsOnView;this._ctx.lineWidth=this._lineWeight,this._ctx.strokeStyle=this.color,this._ctx.beginPath(),this._ctx.moveTo(t[0][0],t[0][1]);for(var e=1;e<t.length;e++)this._ctx.lineTo(t[e][0],t[e][1]);this._ctx.stroke()}},{key:"drawPoints",value:function(){var t=this;this._ctx.fillStyle=this.color,this._ctx.strokeStyle=this.color,this._sortPointsOnView.forEach((function(e){var n=u(e,2),i=n[0],o=n[1];t._ctx.beginPath(),t._ctx.arc(i,o,t._pointRadius,0,2*Math.PI,!1),t._ctx.fill(),t._ctx.stroke()}))}},{key:"getPointsOnScaleView",value:function(t){var e=this;return this.sortPoints.filter((function(n,i){var o=e._sortPointsOnView[i];return o[0]>=t.topLeft[0]&&o[0]<=t.topLeft[0]+t.bottomRight[0]&&o[1]>=t.topLeft[1]&&o[1]<=t.topLeft[1]+t.bottomRight[1]}))}},{key:"getPointByIndex",value:function(t){return this.sortPoints[t]}},{key:"sortPointsOnView",get:function(){var t=this._lineWeight+this._pointRadius;return this._sortPointsOnView.map((function(e){return[[e[0]-t,e[0]+t],[e[1]-t,e[1]+t]]}))},set:function(t){var e=t.getCoord;this._sortPointsOnView=this.sortPoints.map((function(t){return e(t)}))}}])&&h(e.prototype,n),i&&h(e,i),t}();function d(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var v=function(){function t(e){var n,i,o;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),o=void 0,(i="_element")in(n=this)?Object.defineProperty(n,i,{value:o,enumerable:!0,configurable:!0,writable:!0}):n[i]=o,this._create(e)}var e,n,i;return e=t,(n=[{key:"_create",value:function(t){var e=document.createElement("div");e.className="appear ".concat("appear--hidden"),t.insertAdjacentElement("afterBegin",e),this._element=e}},{key:"show",value:function(t){if(t&&"top"in t&&"left"in t){var e=t.top,n=t.left;this._element.style.top="".concat(e,"px"),this._element.style.left="".concat(n,"px")}this._element.classList.remove("appear--hidden")}},{key:"hide",value:function(){this._element.classList.add("appear--hidden")}}])&&d(e.prototype,n),i&&d(e,i),t}();function y(t){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function m(t,e,n){return(m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var i=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=x(t)););return t}(t,e);if(i){var o=Object.getOwnPropertyDescriptor(i,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function g(t,e){return(g=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function b(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,i=x(t);if(e){var o=x(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return w(this,n)}}function w(t,e){return!e||"object"!==y(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function x(t){return(x=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var O=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&g(t,e)}(r,t);var e,n,i,o=b(r);function r(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),(e=o.call(this,t))._init(),e._content=function(t){return 0===t.length?"":t.map((function(t){var e=t.color?' style="color: '.concat(t.color,'"'):"",n=t.points.join(", ");return'\n                    <div class="infoPopup-label" '.concat(e,">").concat(t.label,'</div>\n                    <div class="infoPopup-text">').concat(n,"</div>\n            ")})).join("")},e}return e=r,(n=[{key:"_init",value:function(){this._element.classList.add("infoPopup")}},{key:"show",value:function(t,e){this._element.innerHTML=this._content(e),m(x(r.prototype),"show",this).call(this,t)}}])&&_(e.prototype,n),i&&_(e,i),r}(v),k=n(0),P=n.n(k);function S(t){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function j(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function E(t,e,n){return(E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var i=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=C(t)););return t}(t,e);if(i){var o=Object.getOwnPropertyDescriptor(i,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function R(t,e){return(R=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function A(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,i=C(t);if(e){var o=C(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return T(this,n)}}function T(t,e){return!e||"object"!==S(e)&&"function"!=typeof e?L(t):e}function L(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function C(t){return(C=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var M=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&R(t,e)}(r,t);var e,n,i,o=A(r);function r(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),(e=o.call(this,t))._container=t,e._init(),e._watchMouseEvent=e._watchMouseEvent.bind(L(e)),e._unwatchMouseEvent=e._unwatchMouseEvent.bind(L(e)),e._handlerMouseMove=P()(e._handlerMouseMove.bind(L(e)),100),e}return e=r,(n=[{key:"_init",value:function(){this._element.classList.add("overflowPopup")}},{key:"_watchMouseEvent",value:function(){this._container.addEventListener("mousemove",this._handlerMouseMove)}},{key:"_unwatchMouseEvent",value:function(){this._container.removeEventListener("mousemove",this._handlerMouseMove)}},{key:"_handlerMouseMove",value:function(t){t.preventDefault();var e={x:t.clientX-this._shift.shiftX,y:t.clientY-this._shift.shiftY};this._leftTopAngle.x<e.x?(this._element.style.left="".concat(this._leftTopAngle.x,"px"),this._element.style.width="".concat(e.x-this._leftTopAngle.x,"px")):(this._element.style.left="".concat(e.x,"px"),this._element.style.width="".concat(this._leftTopAngle.x-e.x,"px")),this._leftTopAngle.y<e.y?(this._element.style.top="".concat(this._leftTopAngle.y,"px"),this._element.style.height="".concat(e.y-this._leftTopAngle.y,"px")):(this._element.style.top="".concat(e.y,"px"),this._element.style.height="".concat(this._leftTopAngle.y-e.y,"px"))}},{key:"show",value:function(t,e,n){var i=e.shiftX,o=e.shiftY;this._leftTopAngle={x:t.left-i,y:t.top-o},this._shift={shiftX:i,shiftY:o},this._watchMouseEvent(),this._element.classList.remove("appear--hidden")}},{key:"hide",value:function(t){"function"==typeof t&&t({topLeft:[parseInt(this._element.style.left),parseInt(this._element.style.top)],bottomRight:[parseInt(this._element.style.width),parseInt(this._element.style.height)]}),this._element.style.width="0px",this._element.style.height="0px",this._unwatchMouseEvent(),E(C(r.prototype),"hide",this).call(this)}}])&&j(e.prototype,n),i&&j(e,i),r}(v);function X(t){return(X="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function Y(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function D(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function I(t,e){return(I=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function V(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,i=W(t);if(e){var o=W(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return B(this,n)}}function B(t,e){return!e||"object"!==X(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function W(t){return(W=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var N=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&I(t,e)}(r,t);var e,n,i,o=V(r);function r(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Y(this,r),(e=o.call(this,t))._init(n),e}return e=r,(n=[{key:"_init",value:function(t){var e=this,n=t.handlerClick,i=t.top,o=t.right;this._element.classList.add("resetScale"),this._element.style.top="".concat(i,"px"),this._element.style.right="".concat(o,"px"),this._element.innerHTML="<div data-name=".concat("reset",' class="button resetScale-button">Сбросить<br/>масштаб</div>'),this._element.onclick=function(){n(),e.hide()}}}])&&D(e.prototype,n),i&&D(e,i),r}(v);function H(t){return(H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function G(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function U(t,e){return(U=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function F(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,i=z(t);if(e){var o=z(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return $(this,n)}}function $(t,e){return!e||"object"!==H(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function z(t){return(z=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var q=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&U(t,e)}(r,t);var e,n,i,o=F(r);function r(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),(n=o.call(this,t))._init(e),n}return e=r,(n=[{key:"_init",value:function(t){var e=t.position;this._element.classList.add("legend"),this.show(e)}},{key:"content",value:function(t){this._element.innerHTML=t.map((function(t){var e=t.color?' style="border-color:'.concat(t.color,'"'):"";return'\n            <div class="legend-item">\n                <div class="legend-item-line" '.concat(e,'></div>\n                <div class="legend-item-label">').concat(t.label,"</div>\n            </div>")})).join("")}}])&&G(e.prototype,n),i&&G(e,i),r}(v);function J(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],i=!0,o=!1,r=void 0;try{for(var a,c=t[Symbol.iterator]();!(i=(a=c.next()).done)&&(n.push(a.value),!e||n.length!==e);i=!0);}catch(t){o=!0,r=t}finally{try{i||null==c.return||c.return()}finally{if(o)throw r}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return K(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return K(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function K(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function Q(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var Z=["#397dcc","orangered","#ac54cc","#00cc3b","black","yellow","#A30E00","#67cc95"],tt=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.data=n.data,this._ctx=n.canvas||null,this._scale=!1,this._lineWeight=1,this._pointR=3,this._pointD=2*this._pointR,this._padding=40,this._init(e,n),this._drawAxis(n),this.render(),this.watchEvents(),this.reScale=this.reScale.bind(this)}var e,n,i;return e=t,(n=[{key:"_init",value:function(t,e){var n=this,i=e.width,o=e.height;t.innerHTML="";var r=document.createElement("div");t.insertAdjacentElement("afterBegin",r);var c=new a(r,{width:i,height:o,padding:this._padding});this._ctx=c.ctx,this._area=c,this._chartArea=c.chartArea,this._angles=c.angles;var s=c.sizes;r.style.width="".concat(s.width,"px"),r.style.height="".concat(s.height,"px"),this._legend=new q(r,{position:{left:c.angles.topLeft[0],top:c.angles.bottomRight[1]}}),this._popup=new O(r),this._overflow=new M(r),this._resetScale=new N(r,{top:this._padding+10,right:this._padding+10,handlerClick:function(){n._scale=!1,n._area.clearChartArea(),n.render()}}),this._container=r}},{key:"_getContainerPosition",value:function(t){var e=t.getBoundingClientRect();return{shiftX:e.left,shiftY:e.top}}},{key:"watchEvents",value:function(){var t=this,e=this._container;e.addEventListener("mousemove",(function(n){var i=t._getContainerPosition(e),o=i.shiftX,r=i.shiftY;if(!1===t._scale&&t.checkEventOnView(n,{shiftX:o,shiftY:r})){var a=t.checkCursorOnPoint({x:n.clientX-o,y:n.clientY-r});if(a){var c=a.index.map((function(e,n){var i=t.graphs[a.indexGraph[n]].graph;return{label:i.label,color:i.color,points:i.getPointByIndex(e)}}));t._popup.show({top:n.clientY-r+10,left:n.clientX-o+10},c)}else t._popup.hide()}})),e.onmouseleave=function(){t._popup.hide()};var n=function(t){return"reset"!==t.dataset.name};e.onmousedown=function(i){var o=t._getContainerPosition(e),r=o.shiftX,a=o.shiftY;i.preventDefault(),t._timestamp||(t._timestamp=Date.now()),t._timestampUp=null,t._mousedownCoords||(t._mousedownCoords={clientX:i.clientX,clientY:i.clientY}),setTimeout((function(){null===t._timestampUp&&n(i.target)&&t.checkEventOnView(i,{shiftX:r,shiftY:a})&&t._overflow.show({top:i.clientY,left:i.clientX},{shiftX:r,shiftY:a},t._area.sizes)}),200)},e.onmouseup=function(e){t._timestampUp=Date.now(),null!==t._timestamp&&t._timestampUp-t._timestamp>500&&Math.abs(e.clientY-t._mousedownCoords.clientY)>0&&Math.abs(e.clientX-t._mousedownCoords.clientX)>0&&n(e.target)&&(t._mousedownCoords=null,t._overflow.hide(t.reScale)),t._timestamp=null}}},{key:"checkEventOnView",value:function(t,e){var n=t.clientX,i=t.clientY,o=e.shiftX,r=e.shiftY,a=this._angles;return n>a.topLeft[0]+o&&n<a.bottomRight[0]+o&&i>a.topLeft[1]+r&&i<a.bottomRight[1]+r}},{key:"checkCursorOnPoint",value:function(t){var e=t.x,n=t.y,i={indexGraph:[],index:[]};return this.setSortedPointsOnView.forEach((function(t,o){t.map((function(t,r){e>=t[0][0]&&e<=t[0][1]&&n>=t[1][0]&&n<=t[1][1]&&(i.index.push(r),i.indexGraph.push(o))}))})),i.indexGraph.length>0?i:null}},{key:"render",value:function(){this._mathPoints(),this.drawLegend(),this.drawGraph()}},{key:"reScale",value:function(t){this._scale=!0,this._resetScale.show();var e=t.topLeft[0];e<=this._angles.topLeft[0]&&(e+=this._angles.topLeft[0]+1);var n=t.topLeft[1],i=t.bottomRight[0];i+e>this._angles.bottomRight[0]&&(i-=i+e-this._angles.bottomRight[0]);var o=t.bottomRight[1];o+n>=this._angles.bottomRight[1]&&(o-=o+n-this._angles.bottomRight[1]+1),this._legend.content(this._getPointsOnScaleView(t));var r=this._chartArea,c=r.width,s=r.height,l=new a(document.getElementById("root"),{width:c,height:s,padding:0,position:"beforeEnd"});l.ctx.drawImage(this._area.canvas,e,n,i,o,0,0,c,s),this._area.clearChartArea(),this._ctx.drawImage(l.canvas,this._angles.topLeft[0],this._angles.topLeft[1],c,s),l.destroy()}},{key:"_getPointsOnScaleView",value:function(t){return this.graphs.map((function(e){var n=e.graph;return{label:n.label,color:n.color,points:e.graph.getPointsOnScaleView(t)}})).filter((function(t){return t.points.length>0}))}},{key:"_drawAxis",value:function(t){var e=t.axis,n=J(void 0===e?["",""]:e,2),i=n[0],o=void 0===i?"":i,r=n[1],a=void 0===r?"":r,c=new l({name:o,color:"#091720",coords:[[this._angles.topLeft[0],this._angles.bottomRight[1]],[this._angles.bottomRight[0],this._angles.bottomRight[1]]],ctx:this._ctx}),s=new l({name:a,color:"#091720",coords:[[this._angles.topLeft[0],this._angles.topLeft[1]],[this._angles.topLeft[0],this._angles.bottomRight[1]]],ctx:this._ctx});c.drawAxe(),s.drawAxe(),this._axis={axeX:c,axeY:s}}},{key:"drawLegend",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.graphs;this._legend.content(t.map((function(t){var e=t.graph;return{label:e.label,color:e.color}})))}},{key:"drawGraph",value:function(){this.graphs.forEach((function(t){t.graph.drawLine(),t.graph.drawPoints()}))}},{key:"_mathPoints",value:function(){var t,e,n,i,o=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.data;this.graphs=[],r.forEach((function(r,a){if(r){var c=r.color||o._chartColor(a),s=o._checkCoords(r.points[0])?r.points:r.points.map((function(t,e){return[e,t]})),l=new p({label:r.label,points:s,color:c,ctx:o._ctx,pointRadius:o._pointR,lineWeight:o._lineWeight});l.mathPointsOneGraph(),(l.minX<t||void 0===t)&&(t=l.minX),(l.minY<n||void 0===n)&&(n=l.minY),(l.maxX>e||void 0===e)&&(e=l.maxX),(l.maxY>i||void 0===i)&&(i=l.maxY),o.graphs.push({graph:l})}})),this._anglesCoords={minX:t,maxX:e,minY:n,maxY:i},this._getStepOnAxis(),this.setSortedPointsOnView=this.graphs.map((function(t){return t.graph.sortPointsOnView={getCoord:o._getCoord.bind(o)},t.graph.sortPointsOnView}))}},{key:"_getCoord",value:function(t){var e=J(t,2),n=e[0],i=e[1],o=this._steps,r=o.stepX,a=o.stepY,c=this._lineWeight,s=this._anglesCoords,l=s.minX,u=s.maxY;return[this._angles.topLeft[0]+Math.floor((n-l)*r)+this._pointR+c,this._angles.topLeft[1]+Math.floor((u-i)*a)+this._pointR+c]}},{key:"_checkCoords",value:function(t){return t instanceof Array}},{key:"_getStepOnAxis",value:function(){var t=this._anglesCoords,e=t.minX,n=t.minY,i=t.maxX,o=t.maxY;this._steps={stepX:(this._chartArea.width-this._pointD-this._lineWeight)/(i-e),stepY:(this._chartArea.height-this._pointD-this._lineWeight)/(o-n)}}},{key:"_chartColor",value:function(t){return Z[t%Z.length]}},{key:"destroy",value:function(){this._container.remove()}}])&&Q(e.prototype,n),i&&Q(e,i),t}();function et(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var nt="<p>Невозможно отобразить данные</p>",it=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._form=e,this._container=n,this._create()}var e,n,i;return e=t,(n=[{key:"_create",value:function(){var t=this;this._form.innerHTML='\n        <div class="option-field">\n            <label>Размер холста:</label>\n            <input type="number" name="width" value="600" class="option-field-input" max="1000" min="200"/>\n            <input type="number" name="height" value="400" class="option-field-input" max="1000" min="200"/>\n        </div>\n        <div class="option-field">\n            <label>Наименования осей:</label>\n            <input type="text" name="nameAxeX" placeholder="Горизонталь" class="option-field-input"/>\n            <input type="text" name="nameAxeY" placeholder="Вертикаль" class="option-field-input"/>\n        </div>',this._btnDraw=this._createButton({value:"Нарисовать",handlerClick:function(){var e=t._prepareData(t._form);if(e[0]&&1!==e[0].points.length)try{t._chart=new tt(t._container,{width:+t._form.width.value,height:+t._form.height.value,axis:[t._form.nameAxeX.value,t._form.nameAxeY.value],data:e})}catch(e){t._chart&&t._chart.destroy(),t._container.innerHTML=nt,console.log(e)}else t._container.innerHTML=nt},className:"button--indented"}),this._btnAdd=this._createButton({value:"Добавить данные",handlerClick:function(){t.createFieldSet(!0)}}),this.createFieldSet()}},{key:"_createButton",value:function(t){var e=t.handlerClick,n=t.value,i=t.insertPosition,o=void 0===i?"beforeEnd":i,r=t.className,a=void 0===r?"":r,c=document.createElement("div");return c.className="button "+a,c.innerHTML=n,c.onclick=e,o&&this._form.insertAdjacentElement(o,c),c}},{key:"createFieldSet",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this._makeId(),n='\n        <div class="option-field">\n            <label for="label-'.concat(e,'">Наименование параметра:</label>\n            <input id="label-').concat(e,'" name="label" type="text" class="option-field-input">\n        </div>\n        <div class="option-field">\n            <label for="points-').concat(e,'">Массив точек:</label>\n            <input id="points-').concat(e,'" name="points" type="text" placeholder="(x1,y1), (x2,y2) или [x1,y1], [x2,y2]" class="option-field-input">\n        </div>\n        ');if(this._btnDraw.insertAdjacentHTML("beforeBegin",n),t){var i=document.getElementById("label-".concat(e)).parentNode,o=this._createButton({value:"&times;",insertPosition:null,className:"button-remove",handlerClick:function(){i.nextElementSibling.remove(),i.remove()}});i.insertAdjacentElement("afterBegin",o)}}},{key:"_makeId",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3,e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n="",i="0123456789".concat(e?"":"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"),o=i.length,r=0;r<t;r++)n+=i.charAt(Math.floor(Math.random()*o));return e?+n:n}},{key:"_prepareData",value:function(t){var e=function(t){return(+t.value>+t.max||+t.value<+t.min)&&(t.value=400),t.value};return e(t.width),e(t.height),Array.from(t.querySelectorAll("[name^=points]")).map((function(t,e){var n=t.id.substr(7),i=document.getElementById("label-".concat(n)).value;0===i.trim().length&&(i="Param ".concat(e+1));var o={"(":"[",")":"]"},r=t.value.replace(/[\(\)\s]/g,(function(t){return o[t]||""})).match(/(\-?\d+(\.\d+)?,\-?\d+(\.\d+)?)(?=\])/g);return r?{label:i,points:r.map((function(t){var e=t.split(",");return[+e[0],+e[1]]}))}:null}))}}])&&et(e.prototype,n),i&&et(e,i),t}();window.onload=function(){new it(document.forms.options,document.getElementById("root"))}}]);