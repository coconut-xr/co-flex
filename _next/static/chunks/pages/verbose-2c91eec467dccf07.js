(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[550],{7494:function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0}),t.ChangeFlexNode=void 0;var a=function(e){function t(t,n){var r=e.call(this,t)||this;return r.onChange=n,r}return o(t,e),t.prototype.calculateLayout=function(){e.prototype.calculateLayout.call(this),this.afterCalculation(void 0)},t.prototype.afterCalculation=function(e){var n=this.onChange(this,e);this.commitedChildren.forEach(function(e){e instanceof t&&e.afterCalculation(n)})},t}(n(2219).FlexNode);t.ChangeFlexNode=a},388:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.useFlexNodeContext=t.FlexNodeContextProvider=void 0;var i=a(n(7378)),s=(0,i.createContext)(null);t.FlexNodeContextProvider=function(e){var t=e.children,n=e.context;return i.default.createElement(s.Provider,{value:n},t)},t.useFlexNodeContext=function(){var e=(0,i.useContext)(s);if(null==e)throw"unable to find flex context. Missing a FlexNodeContextProvider.";return e}},3349:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(7494),t),o(n(388),t),o(n(8955),t),o(n(7636),t),o(n(6377),t)},8955:function(e,t,n){"use strict";var r=this&&this.__values||function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},o=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(s){o={error:s}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i};Object.defineProperty(t,"__esModule",{value:!0}),t.useBindFlexNodeProperties=void 0;var a=n(7378),i=function(){return{}};t.useBindFlexNodeProperties=function(e,t,n){var s,c,u,l,d,f,p=(0,a.useMemo)(i,[]);if(p.node!==e||p.properties!==n||p.requestLayoutCalculation!==t){var h=!1,x=p.properties,v=Object.entries(n);if(null==x){h=!0;try{for(var y=r(v),j=y.next();!j.done;j=y.next()){var m=o(j.value,2),b=m[0],g=m[1];e.setProperty(b,g)}}catch(N){s={error:N}}finally{try{j&&!j.done&&(c=y.return)&&c.call(y)}finally{if(s)throw s.error}}}else{try{for(var _=r(Object.entries(n)),C=_.next();!C.done;C=_.next()){var w=o(C.value,2),b=w[0],g=w[1];g!=x[b]&&(e.setProperty(b,g),h=!0),delete x[b]}}catch(O){u={error:O}}finally{try{C&&!C.done&&(l=_.return)&&l.call(_)}finally{if(u)throw u.error}}try{for(var k=r(Object.entries(x)),P=k.next();!P.done;P=k.next()){var b=o(P.value,1)[0];e.setProperty(b,void 0),h=!0}}catch(F){d={error:F}}finally{try{P&&!P.done&&(f=k.return)&&f.call(k)}finally{if(d)throw d.error}}}p.properties=n,p.node=e,p.requestLayoutCalculation=t,h&&t()}}},7636:function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.useYogaNode=void 0;var o=n(7378),a=n(3349);t.useYogaNode=function(e,t,n){var i=(0,a.useFlexNodeContext)(),s=(0,o.useMemo)(function(){return new a.ChangeFlexNode(i.precision,n)},[i.precision,n]);return(0,a.useBindFlexNodeProperties)(s,i.requestLayoutCalculation,e),(0,o.useEffect)(function(){return i.node.insertChild(s),i.requestLayoutCalculation(),function(){i.node.removeChild(s),i.requestLayoutCalculation()}},[s,i]),(0,o.useEffect)(function(){s.index=t,i.requestLayoutCalculation()},[t,s,i]),(0,o.useEffect)(function(){return s.destroy.bind(s)},[s]),(0,o.useMemo)(function(){return r(r({},i),{node:s})},[s,i])}},6377:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useYogaRootNode=void 0;var r=n(7378),o=n(3349);t.useYogaRootNode=function(e,t,n,a){void 0===n&&(n=10),void 0===a&&(a=.01);var i=(0,r.useMemo)(function(){return new o.ChangeFlexNode(a,t)},[a,t]),s=(0,r.useRef)(!1),c=(0,r.useCallback)(function(){return s.current=!0},[]);return(0,o.useBindFlexNodeProperties)(i,c,e),(0,r.useEffect)(function(){var e=function(){i.calculateLayout(),s.current=!1};e();var t=window.setInterval(function(){s.current&&e()},1e3/n);return function(){return window.clearInterval(t)}},[n,i]),(0,r.useMemo)(function(){return{node:i,precision:a,requestLayoutCalculation:c}},[i,a])}},5315:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/verbose",function(){return n(5713)}])},1309:function(e,t,n){"use strict";n.d(t,{a:function(){return a}});var r=n(4246),o=n(7378);function a(e){let{children:t}=e,[n,a]=(0,o.useState)(1);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("input",{min:0,max:1,step:.1,value:n,onChange:e=>a(e.target.valueAsNumber),type:"range"}),t(n)]})}},5713:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(4246),o=n(1151),a=n(3349),i=n(7378);function s(e){let{children:t,...n}=e,[{width:o,height:s},c]=(0,i.useState)({width:0,height:0}),u=(0,a.useYogaNode)(n,0,(0,i.useCallback)(e=>c({width:e.getComputed("width"),height:e.getComputed("height")}),[c]));return(0,r.jsxs)(a.FlexNodeContextProvider,{context:u,children:[(0,r.jsxs)("p",{children:[o," x ",s]}),(0,r.jsx)("div",{style:{marginLeft:10},children:t})]})}function c(e){let{children:t,...n}=e,[{width:o,height:s},c]=(0,i.useState)({width:0,height:0}),u=(0,a.useYogaRootNode)(n,(0,i.useCallback)(e=>c({width:e.getComputed("width"),height:e.getComputed("height")}),[c]));return(0,r.jsxs)(a.FlexNodeContextProvider,{context:u,children:[(0,r.jsxs)("p",{children:[o," x ",s]}),(0,r.jsx)("div",{style:{marginLeft:10},children:t})]})}var u=n(1309);function l(e){let t=Object.assign({h1:"h1",div:"div",pre:"pre",code:"code",span:"span"},(0,o.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:"Flex Verbose"}),"\n","\n",(0,r.jsx)(u.a,{children:e=>(0,r.jsxs)(c,{width:1,height:1,children:[(0,r.jsx)(s,{flexGrow:e}),(0,r.jsx)(s,{flexGrow:1})]})}),"\n",(0,r.jsx)(t.div,{className:"remark-highlight",children:(0,r.jsx)(t.pre,{className:"language-typescript",children:(0,r.jsxs)(t.code,{className:"language-typescript",children:[(0,r.jsx)(t.span,{className:"token operator",children:"<"}),"FlexVerboseRoot width",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),(0,r.jsx)(t.span,{className:"token number",children:"1"}),(0,r.jsx)(t.span,{className:"token punctuation",children:"}"})," height",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),(0,r.jsx)(t.span,{className:"token number",children:"1"}),(0,r.jsx)(t.span,{className:"token punctuation",children:"}"}),(0,r.jsx)(t.span,{className:"token operator",children:">"}),"\n    ",(0,r.jsx)(t.span,{className:"token operator",children:"<"}),"FlexVerbose flexGrow",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),"value",(0,r.jsx)(t.span,{className:"token punctuation",children:"}"})," ",(0,r.jsx)(t.span,{className:"token operator",children:"/"}),(0,r.jsx)(t.span,{className:"token operator",children:">"}),"\n    ",(0,r.jsx)(t.span,{className:"token operator",children:"<"}),"FlexVerbose flexGrow",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),(0,r.jsx)(t.span,{className:"token number",children:"1"}),(0,r.jsx)(t.span,{className:"token punctuation",children:"}"})," ",(0,r.jsx)(t.span,{className:"token operator",children:"/"}),(0,r.jsx)(t.span,{className:"token operator",children:">"}),"\n",(0,r.jsx)(t.span,{className:"token operator",children:"<"}),(0,r.jsx)(t.span,{className:"token operator",children:"/"}),"FlexVerboseRoot",(0,r.jsx)(t.span,{className:"token operator",children:">"}),"\n"]})})})]})}var d=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:t}=Object.assign({},(0,o.ah)(),e.components);return t?(0,r.jsx)(t,Object.assign({},e,{children:(0,r.jsx)(l,e)})):l(e)}},1151:function(e,t,n){"use strict";n.d(t,{ah:function(){return a}});var r=n(7378);let o=r.createContext({});function a(e){let t=r.useContext(o);return r.useMemo(()=>"function"==typeof e?e(t):{...t,...e},[t,e])}}},function(e){e.O(0,[13,531,774,888,179],function(){return e(e.s=5315)}),_N_E=e.O()}]);