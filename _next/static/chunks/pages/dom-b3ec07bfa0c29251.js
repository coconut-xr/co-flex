(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[585],{7494:function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),a=this&&this.__values||function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(t,"__esModule",{value:!0}),t.ChangeFlexNode=void 0;var s=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o(t,e),t.prototype.calculateLayout=function(){e.prototype.calculateLayout.call(this),this.afterCalculation(void 0)},t.prototype.afterCalculation=function(e){this.onChange(this,e),this.processChildren()},t.prototype.processChildren=function(){var e,t;try{for(var n=a(this.children),r=n.next();!r.done;r=n.next())r.value.afterCalculation(this)}catch(o){e={error:o}}finally{try{r&&!r.done&&(t=n.return)&&t.call(n)}finally{if(e)throw e.error}}},t}(n(2219).FlexNode);t.ChangeFlexNode=s},388:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.useFlexNodeContext=t.FlexNodeContextProvider=void 0;var s=a(n(7378)),i=(0,s.createContext)(null);t.FlexNodeContextProvider=function(e){var t=e.children,n=e.context;return s.default.createElement(i.Provider,{value:n},t)},t.useFlexNodeContext=function(){var e=(0,s.useContext)(i);if(null==e)throw"unable to find flex context. Missing a FlexNodeContextProvider.";return e}},3349:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(388),t),o(n(8955),t),o(n(7636),t),o(n(6377),t),o(n(7494),t)},8955:function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__values||function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},a=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)s.push(r.value)}catch(i){o={error:i}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return s};Object.defineProperty(t,"__esModule",{value:!0}),t.useBindFlexNodeProperties=void 0;var s=n(7378),i=function(){return{}};t.useBindFlexNodeProperties=function(e,t,n){var l,c,u,d,p,h,f=(0,s.useMemo)(i,[]);if(f.node!==e||f.properties!==n||f.requestLayoutCalculation!==t){var x=!1,m=r({},f.properties),j=Object.entries(n);if(null==m){x=!0;try{for(var v=o(j),y=v.next();!y.done;y=v.next()){var N=a(y.value,2),k=N[0],b=N[1];e.setProperty(k,b)}}catch(g){l={error:g}}finally{try{y&&!y.done&&(c=v.return)&&c.call(v)}finally{if(l)throw l.error}}}else{try{for(var _=o(Object.entries(n)),w=_.next();!w.done;w=_.next()){var O=a(w.value,2),k=O[0],b=O[1];b!=m[k]&&(e.setProperty(k,b),x=!0),delete m[k]}}catch(C){u={error:C}}finally{try{w&&!w.done&&(d=_.return)&&d.call(_)}finally{if(u)throw u.error}}try{for(var P=o(Object.entries(m)),F=P.next();!F.done;F=P.next()){var k=a(F.value,1)[0];e.setProperty(k,void 0),x=!0}}catch(M){p={error:M}}finally{try{F&&!F.done&&(h=P.return)&&h.call(P)}finally{if(p)throw p.error}}}f.properties=n,f.node=e,f.requestLayoutCalculation=t,x&&t()}}},7636:function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.useYogaNode=void 0;var o=n(7378),a=n(3349);t.useYogaNode=function(e,t,n){var s=(0,a.useFlexNodeContext)();return(0,a.useBindFlexNodeProperties)(e,s.requestLayoutCalculation,t),(0,o.useEffect)(function(){return s.node.insertChild(e),s.requestLayoutCalculation(),function(){s.node.removeChild(e),s.requestLayoutCalculation()}},[e,s]),(0,o.useEffect)(function(){e.index=n,s.requestLayoutCalculation()},[n,e,s]),(0,o.useEffect)(function(){return e.destroy.bind(e)},[e]),(0,o.useMemo)(function(){return r(r({},s),{node:e})},[e,s])}},6377:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useYogaRootNode=void 0;var r=n(7378),o=n(3349);t.useYogaRootNode=function(e,t,n){void 0===n&&(n=10);var a=(0,r.useRef)(!1),s=(0,r.useCallback)(function(){return a.current=!0},[]);return(0,o.useBindFlexNodeProperties)(e,s,t),(0,r.useEffect)(function(){var t=function(){e.calculateLayout(),a.current=!1};t();var r=window.setInterval(function(){a.current&&t()},1e3/n);return function(){return window.clearInterval(r)}},[n,e]),(0,r.useMemo)(function(){return{node:e,requestLayoutCalculation:s}},[e])}},9220:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dom",function(){return n(3931)}])},1309:function(e,t,n){"use strict";n.d(t,{a:function(){return a}});var r=n(4246),o=n(7378);function a(e){let{children:t}=e,[n,a]=(0,o.useState)(1);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("input",{min:0,max:1,step:.1,value:n,onChange:e=>a(e.target.valueAsNumber),type:"range"}),t(n)]})}},3931:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return p}});var r=n(4246),o=n(1151),a=n(3349),s=n(7378);class i extends a.ChangeFlexNode{onChange(e,t){this.setLayout({width:e.getComputed("width"),height:e.getComputed("height"),left:e.getComputed("left"),top:e.getComputed("top")})}constructor(e,t){super(e),this.setLayout=t}}function l(e){let{children:t,index:n,...o}=e,[l,c]=(0,s.useState)({top:0,left:0,width:0,height:0}),u=(0,s.useMemo)(()=>new i(1,c),[c]),d=(0,a.useYogaNode)(u,o,null!=n?n:0);return(0,r.jsx)(a.FlexNodeContextProvider,{context:d,children:(0,r.jsx)("div",{style:{border:"1px solid #000",position:"absolute",...l},children:(0,r.jsx)("div",{style:{position:"relative"},children:t})})})}function c(e){let{children:t,...n}=e,[o,l]=(0,s.useState)({top:0,left:0,width:0,height:0}),c=(0,s.useMemo)(()=>new i(1,l),[l]),u=(0,a.useYogaRootNode)(c,n,10);return(0,r.jsx)("div",{style:{width:300,height:300,position:"relative"},children:(0,r.jsx)(a.FlexNodeContextProvider,{context:u,children:(0,r.jsx)("div",{style:{border:"1px solid #000",position:"absolute",...o},children:t})})})}var u=n(1309);function d(e){let t=Object.assign({h1:"h1",div:"div",pre:"pre",code:"code",span:"span"},(0,o.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:"Flex Dom"}),"\n","\n",(0,r.jsx)(u.a,{children:e=>(0,r.jsxs)(c,{width:300,height:300,flexDirection:"row",children:[(0,r.jsxs)(l,{flexDirection:"column",index:0,flexGrow:e,children:[(0,r.jsx)(l,{index:0,flexGrow:e}),(0,r.jsx)(l,{index:1,flexGrow:1})]}),(0,r.jsx)(l,{index:1,flexGrow:1})]})}),"\n",(0,r.jsx)(t.div,{className:"remark-highlight",children:(0,r.jsx)(t.pre,{className:"language-typescript",children:(0,r.jsxs)(t.code,{className:"language-typescript",children:[(0,r.jsx)(t.span,{className:"token operator",children:"<"}),"FlexDomRoot width",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),(0,r.jsx)(t.span,{className:"token number",children:"300"}),(0,r.jsx)(t.span,{className:"token punctuation",children:"}"})," height",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),(0,r.jsx)(t.span,{className:"token number",children:"300"}),(0,r.jsx)(t.span,{className:"token punctuation",children:"}"})," flexDirection",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token string",children:'"row"'}),(0,r.jsx)(t.span,{className:"token operator",children:">"}),"\n    ",(0,r.jsx)(t.span,{className:"token operator",children:"<"}),"FlexDom flexDirection",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token string",children:'"column"'})," index",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),(0,r.jsx)(t.span,{className:"token number",children:"0"}),(0,r.jsx)(t.span,{className:"token punctuation",children:"}"})," flexGrow",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),"value",(0,r.jsx)(t.span,{className:"token punctuation",children:"}"}),(0,r.jsx)(t.span,{className:"token operator",children:">"}),"\n        ",(0,r.jsx)(t.span,{className:"token operator",children:"<"}),"FlexDom index",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),(0,r.jsx)(t.span,{className:"token number",children:"0"}),(0,r.jsx)(t.span,{className:"token punctuation",children:"}"})," flexGrow",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),"value",(0,r.jsx)(t.span,{className:"token punctuation",children:"}"}),(0,r.jsx)(t.span,{className:"token operator",children:">"}),(0,r.jsx)(t.span,{className:"token operator",children:"<"}),(0,r.jsx)(t.span,{className:"token operator",children:"/"}),"FlexDom",(0,r.jsx)(t.span,{className:"token operator",children:">"}),"\n        ",(0,r.jsx)(t.span,{className:"token operator",children:"<"}),"FlexDom index",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),(0,r.jsx)(t.span,{className:"token number",children:"1"}),(0,r.jsx)(t.span,{className:"token punctuation",children:"}"})," flexGrow",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),(0,r.jsx)(t.span,{className:"token number",children:"1"}),(0,r.jsx)(t.span,{className:"token punctuation",children:"}"})," ",(0,r.jsx)(t.span,{className:"token operator",children:"/"}),(0,r.jsx)(t.span,{className:"token operator",children:">"}),"\n    ",(0,r.jsx)(t.span,{className:"token operator",children:"<"}),(0,r.jsx)(t.span,{className:"token operator",children:"/"}),"FlexDom",(0,r.jsx)(t.span,{className:"token operator",children:">"}),"\n    ",(0,r.jsx)(t.span,{className:"token operator",children:"<"}),"FlexDom index",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),(0,r.jsx)(t.span,{className:"token number",children:"1"}),(0,r.jsx)(t.span,{className:"token punctuation",children:"}"})," flexGrow",(0,r.jsx)(t.span,{className:"token operator",children:"="}),(0,r.jsx)(t.span,{className:"token punctuation",children:"{"}),(0,r.jsx)(t.span,{className:"token number",children:"1"}),(0,r.jsx)(t.span,{className:"token punctuation",children:"}"})," ",(0,r.jsx)(t.span,{className:"token operator",children:"/"}),(0,r.jsx)(t.span,{className:"token operator",children:">"}),"\n",(0,r.jsx)(t.span,{className:"token operator",children:"<"}),(0,r.jsx)(t.span,{className:"token operator",children:"/"}),"FlexDomRoot",(0,r.jsx)(t.span,{className:"token operator",children:">"}),"\n"]})})})]})}n(5896);var p=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{wrapper:t}=Object.assign({},(0,o.ah)(),e.components);return t?(0,r.jsx)(t,Object.assign({},e,{children:(0,r.jsx)(d,e)})):d(e)}},1151:function(e,t,n){"use strict";n.d(t,{ah:function(){return a}});var r=n(7378);let o=r.createContext({});function a(e){let t=r.useContext(o);return r.useMemo(()=>"function"==typeof e?e(t):{...t,...e},[t,e])}}},function(e){e.O(0,[13,531,774,888,179],function(){return e(e.s=9220)}),_N_E=e.O()}]);