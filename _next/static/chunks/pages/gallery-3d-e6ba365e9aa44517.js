(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[90],{7494:function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__values||function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")};Object.defineProperty(t,"__esModule",{value:!0}),t.ChangeFlexNode=void 0;var l=function(e){function t(t,n,r){var o=e.call(this,t,r)||this;return o.onChange=n,o}return o(t,e),t.prototype.calculateLayout=function(){e.prototype.calculateLayout.call(this),this.afterCalculation(void 0)},t.prototype.afterCalculation=function(e){this.onChange(this,e,this.processChildren.bind(this))},t.prototype.processChildren=function(){var e,n;try{for(var r=i(this.commitedChildren),o=r.next();!o.done;o=r.next()){var l=o.value;l instanceof t&&l.afterCalculation(this)}}catch(a){e={error:a}}finally{try{o&&!o.done&&(n=r.return)&&n.call(r)}finally{if(e)throw e.error}}},t}(n(2219).FlexNode);t.ChangeFlexNode=l},388:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t};Object.defineProperty(t,"__esModule",{value:!0}),t.useFlexNodeContext=t.FlexNodeContextProvider=void 0;var l=i(n(7378)),a=(0,l.createContext)(null);t.FlexNodeContextProvider=function(e){var t=e.children,n=e.context;return l.default.createElement(a.Provider,{value:n},t)},t.useFlexNodeContext=function(){var e=(0,l.useContext)(a);if(null==e)throw"unable to find flex context. Missing a FlexNodeContextProvider.";return e}},3349:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(7494),t),o(n(388),t),o(n(8955),t),o(n(7636),t),o(n(6377),t)},8955:function(e,t,n){"use strict";var r=this&&this.__values||function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")},o=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),l=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)l.push(r.value)}catch(a){o={error:a}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return l};Object.defineProperty(t,"__esModule",{value:!0}),t.useBindFlexNodeProperties=void 0;var i=n(7378),l=function(){return{}};t.useBindFlexNodeProperties=function(e,t,n){var a,u,s,c,d,f,h=(0,i.useMemo)(l,[]);if(h.node!==e||h.properties!==n||h.requestLayoutCalculation!==t){var p=!1,y=h.properties,x=Object.entries(n);if(null==y){p=!0;try{for(var v=r(x),g=v.next();!g.done;g=v.next()){var m=o(g.value,2),b=m[0],j=m[1];e.setProperty(b,j)}}catch(w){a={error:w}}finally{try{g&&!g.done&&(u=v.return)&&u.call(v)}finally{if(a)throw a.error}}}else{try{for(var _=r(Object.entries(n)),C=_.next();!C.done;C=_.next()){var O=o(C.value,2),b=O[0],j=O[1];j!=y[b]&&(e.setProperty(b,j),p=!0),delete y[b]}}catch(P){s={error:P}}finally{try{C&&!C.done&&(c=_.return)&&c.call(_)}finally{if(s)throw s.error}}try{for(var M=r(Object.entries(y)),S=M.next();!S.done;S=M.next()){var b=o(S.value,1)[0];e.setProperty(b,void 0),p=!0}}catch(N){d={error:N}}finally{try{S&&!S.done&&(f=M.return)&&f.call(M)}finally{if(d)throw d.error}}}h.properties=n,h.node=e,h.requestLayoutCalculation=t,p&&t()}}},7636:function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.useYogaNode=void 0;var o=n(7378),i=n(3349);t.useYogaNode=function(e,t,n,l){var a=(0,i.useFlexNodeContext)(),u=(0,o.useMemo)(function(){return new i.ChangeFlexNode(a.precision,n,l())},[a.precision,n,l]);return(0,i.useBindFlexNodeProperties)(u,a.requestLayoutCalculation,e),(0,o.useEffect)(function(){return a.node.insertChild(u),a.requestLayoutCalculation(),function(){a.node.removeChild(u),a.requestLayoutCalculation()}},[u,a]),(0,o.useEffect)(function(){u.index=t,a.requestLayoutCalculation()},[t,u,a]),(0,o.useEffect)(function(){return u.destroy.bind(u)},[u]),(0,o.useMemo)(function(){return r(r({},a),{node:u})},[u,a])}},6377:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.useYogaRootNode=void 0;var r=n(7378),o=n(3349);t.useYogaRootNode=function(e,t,n,i,l){void 0===i&&(i=10),void 0===l&&(l=.01);var a=(0,r.useMemo)(function(){return new o.ChangeFlexNode(l,t,n())},[l,t,n]),u=(0,r.useRef)(!1),s=(0,r.useCallback)(function(){return u.current=!0},[]);return(0,o.useBindFlexNodeProperties)(a,s,e),(0,r.useEffect)(function(){var e=function(){a.calculateLayout(),u.current=!1};e();var t=window.setInterval(function(){u.current&&e()},1e3/i);return function(){return window.clearInterval(t)}},[i,a]),(0,r.useMemo)(function(){return{node:a,precision:l,requestLayoutCalculation:s}},[a,l])}},7838:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/gallery-3d",function(){return n(1596)}])},1596:function(e,t,n){"use strict";n.r(t),n.d(t,{Container:function(){return z},ContainerRoot:function(){return F},VirtualizedContainer:function(){return L},default:function(){return m}});var r=n(4246),o=n(7378),i=n(1261),l=n(5449),a=n(3349),u=n(880),s=n(9719),c=n(9646),d=n(6625),f=n(8626),h=n(9477),p=n(9606),y=n(1964),x=n(8620),v=n(543);let g=["/co-flex/models/2CylinderEngine.glb","/co-flex/models/Avocado.glb","/co-flex/models/Buggy.glb"];function m(){let e=(0,u.useRouter)();return(0,r.jsx)(p.Xz,{style:{touchAction:"none",width:"100vw",height:"100vh"},gl:{antialias:!0},dpr:null==n.g.window?void 0:window.devicePixelRatio,children:(0,r.jsx)(j,{router:e})})}let b=1/Math.tan(10*Math.PI/180/2);function j(e){let{router:t}=e,n=(0,y.z)(e=>e.size.width/e.size.height);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.Suspense,{fallback:null,children:(0,r.jsx)(s.qA,{preset:"city"})}),(0,r.jsx)(c.c,{fov:10,near:.01,makeDefault:!0,position:[0,0,b]}),(0,r.jsx)("ambientLight",{intensity:.1}),(0,r.jsx)("group",{scale:2,position:[-n,1,0],children:(0,r.jsx)(i.VirtualBase,{children:(0,r.jsxs)(F,{width:n,height:1,flexDirection:"column",children:[(0,r.jsx)(o.Suspense,{fallback:null,children:(0,r.jsx)(C,{router:t,back:null!=t.query.url})}),null==t.query.url?(0,r.jsx)(w,{router:t}):(0,r.jsx)(o.Suspense,{fallback:null,children:(0,r.jsx)(k,{url:t.query.url})})]})})})]})}function w(e){let{router:t}=e;return(0,r.jsx)(z,{index:1,flexDirection:"row",flexWrap:"wrap",flexGrow:1,children:g.map((e,n)=>(0,r.jsx)(o.Suspense,{fallback:null,children:(0,r.jsx)(N,{index:n,router:t,url:e})},e))})}let _=new h.PlaneGeometry(1,1);function C(e){let{back:t,router:n}=e,i=function(e){let t=(0,y.D)(x.u,e);return(0,o.useMemo)(()=>{let e=t.paths.reduce((e,t)=>e.concat(function(e){var t,n,r,o,i,l;let a=[],u=null===(t=e.userData)||void 0===t?void 0:t.style.stroke;if(void 0!==u&&"none"!==u){let s=new h.MeshBasicMaterial({color:new h.Color().setStyle(u),opacity:null===(r=e.userData)||void 0===r?void 0:r.style.strokeOpacity,transparent:(null===(o=e.userData)||void 0===o?void 0:o.style.strokeOpacity)<1,side:h.DoubleSide,depthWrite:!1});a.push(...e.subPaths.map(t=>{var n;return{bufferGeometry:x.u.pointsToStroke(t.getPoints(),null===(n=e.userData)||void 0===n?void 0:n.style),material:s}}))}let c=null===(n=e.userData)||void 0===n?void 0:n.style.fill;if(void 0!==c&&"none"!==c){let d=new h.MeshBasicMaterial({color:new h.Color().setStyle(c),opacity:null===(i=e.userData)||void 0===i?void 0:i.style.fillOpacity,transparent:(null===(l=e.userData)||void 0===l?void 0:l.style.fillOpacity)<1,side:h.DoubleSide,depthWrite:!1});a.push(...e.toShapes(!0).map(e=>({bufferGeometry:new h.ShapeGeometry(e),material:d})))}return a}(t)),[]),n=new h.Group;for(let r of e)r.bufferGeometry.scale(1,-1,1),n.add(new h.Mesh(r.bufferGeometry,r.material));return n},[t.paths])}("/co-flex/back.svg");return(0,r.jsxs)(z,{index:0,height:.08,width:"100%",flexDirection:"row",alignItems:"center",children:[t&&(0,r.jsx)(z,{marginLeft:.03,index:0,width:.02,height:.03,content:e=>(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("mesh",{geometry:_,visible:!1,onClick(e){e.stopPropagation(),n.back()}}),(0,r.jsx)(P,{opacity:e,object:i})]})}),(0,r.jsx)(z,{marginLeft:.03,index:1,width:.038,height:.038,content:()=>(0,r.jsx)(d.x,{anchorX:"left",anchorY:"top",color:0,fontSize:1,children:"Gallery 3D"})})]})}_.translate(.5,-.5,0);let O=new h.EdgesGeometry(new h.BoxGeometry(1,1,1));function P(e){let{opacity:t,object:n,rotation:i}=e,[a,u]=(0,o.useMemo)(()=>{n.traverse(e=>{e instanceof h.Mesh&&(e.material.transparent=!0)}),M.setFromObject(n),M.getCenter(S);let e=[-S.x,-S.y,-S.z];M.getSize(S);let t=[1/S.x,1/S.y,0===S.z?1:1/S.z],r=[(-M.min.x-e[0])*t[0],(-M.max.y-e[1])*t[1],(-M.max.z-e[2])*t[2]];return[e,{position:r,scale:t}]},[n]);return(0,y.A)(()=>{n.traverse(e=>{e instanceof h.Mesh&&(e.material.opacity=t.get())})}),(0,r.jsx)("group",{...u,children:(0,r.jsx)(l.a.group,{rotation:i,children:(0,r.jsx)("group",{position:a,children:(0,r.jsx)("primitive",{object:n})})})})}O.translate(.5,-.5,-.5);let M=new h.Box3,S=new h.Vector3;function N(e){let{url:t,router:n,index:i}=e,l=(0,f.L)(t),a=(0,o.useMemo)(()=>l.scene.clone(!0),[l.scene]),[u,s]=(0,o.useMemo)(()=>(M.setFromObject(a),M.getSize(S),[S.x/S.y,S.x/S.z]),[a]);return(0,r.jsx)(z,{id:t,index:i,widthDepthRatio:s,content:(e,o)=>(0,r.jsx)("group",{onClick(e){e.stopPropagation(),n.push({query:{url:t}},void 0,{shallow:!0})},children:(0,r.jsx)(P,{rotation:o,opacity:e,object:a})}),marginBottom:.05,marginLeft:.05,marginRight:.05,marginTop:.05,maxWidth:.4*u,flexShrink:1,aspectRatio:u})}function k(e){let{url:t}=e,n=(0,f.L)(t),i=(0,o.useMemo)(()=>n.scene.clone(!0),[n.scene]),[l,a]=(0,o.useMemo)(()=>(M.setFromObject(i),M.getSize(S),[S.x/S.y,S.x/S.z]),[i]);return(0,r.jsx)(z,{index:1,marginBottom:.05,marginLeft:.05,marginRight:.05,marginTop:.05,flexDirection:"row",justifyContent:"center",flexGrow:1,children:(0,r.jsx)(z,{widthDepthRatio:a,flexShrink:1,id:t,rotate:!0,content:(e,t)=>(0,r.jsx)(P,{rotation:t,opacity:e,object:i}),aspectRatio:l})})}function D(){return{x:0,y:0,z:0}}function F(e){let{children:t,...n}=e,i=(0,a.useYogaRootNode)(n,(0,o.useCallback)((e,t,n)=>{e.data.x=e.getComputed("left"),e.data.y=-e.getComputed("top"),n()},[]),D,10,.001);return(0,r.jsx)(a.FlexNodeContextProvider,{context:i,children:t})}function z(e){let{id:t,children:n,index:l,content:u,widthDepthRatio:s,rotate:c,...d}=e,[f,h]=(0,o.useState)({}),p=(0,a.useYogaNode)(d,null!=l?l:0,(0,o.useCallback)((e,t,n)=>{let r=e.getComputed("width"),o=e.data;o.x=e.getComputed("left"),o.y=e.getComputed("top"),o.z=0,null!=t&&(o.x+=t.data.x,o.y+=t.data.y,o.z+=t.data.z),h&&h({position:[o.x,-o.y,o.z],scale:[r,e.getComputed("height"),null==s?1:r/s]}),n()},[s]),D),y=(0,o.useMemo)(()=>({...f,content:u,rotate:c}),[u,f,c]);return(0,i.useVirtual)(L,y,l,t),(0,r.jsx)(a.FlexNodeContextProvider,{context:p,children:n})}function L(e){let{destroy:t,controllerProps:n}=e,i=(0,o.useRef)({}),{content:a,rotate:u,...s}=(0,o.useMemo)(()=>(n.length>0&&null!=n[0].position&&(i.current={...n[0]}),i.current),[top,n]),[{position:c,opacity:d,scale:f,rotation:h}]=(0,l.useSpring)({rotation:[0,0,0],...s,opacity:null!=s.position&&n.length>0?1:0,onRest:{opacity(e){0===e.value&&t()}}},[s,n]);return((0,v.useDrag)(e=>{let{down:t,delta:[n,r]}=e;if(t&&u){let o=r/window.innerHeight*10,i=n/window.innerHeight*10,[l,a]=h.goal;h.start([l+o,a+i,0])}},{target:window}),null==a)?null:(0,r.jsx)(l.a.group,{position:c,scale:f,children:a(d,h)})}}},function(e){e.O(0,[13,737,531,928,261,683,790,774,888,179],function(){return e(e.s=7838)}),_N_E=e.O()}]);