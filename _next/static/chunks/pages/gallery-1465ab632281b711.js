(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[214],{4080:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/gallery",function(){return n(4346)}])},4346:function(e,t,n){"use strict";n.r(t),n.d(t,{Container:function(){return j},ContainerRoot:function(){return v},VirtualizedContainer:function(){return C},default:function(){return h}});var i=n(4246),o=n(7378),r=n(1261),l=n(1472),u=n(3349),s=n(880);let d=(0,o.createContext)(null),a=["https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg","https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500","https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9jdXN8ZW58MHx8MHx8&w=1000&q=80"],c=null==n.g.document?new Map:new Map(a.map(e=>{let t=document.createElement("img");return t.src=e,[e,t]}));function h(){let e=(0,s.useRouter)(),[t,l]=function(){let[e,t]=(0,o.useState)(null==n.g.window?[0,0]:[window.innerWidth,window.innerHeight]);return(0,o.useEffect)(()=>{let e=()=>t([window.innerWidth,window.innerHeight]);return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),e}();return(0,i.jsx)("div",{style:{background:"#fff",overflow:"hidden",top:0,right:0,left:0,bottom:0,position:"absolute"},children:(0,i.jsx)(r.VirtualBase,{children:(0,i.jsxs)(v,{width:t,height:l,flexDirection:"column",children:[(0,i.jsx)(g,{back:null!=e.query.url}),null==e.query.url?(0,i.jsx)(p,{}):(0,i.jsx)(x,{url:e.query.url})]})})})}function p(){return(0,i.jsx)(j,{flexDirection:"row",flexWrap:"wrap",flexGrow:1,children:a.map(e=>(0,i.jsx)(f,{url:e},e))})}function g(e){let{back:t}=e,n=(0,s.useRouter)();return(0,i.jsxs)(j,{height:60,width:"100%",flexDirection:"row",alignItems:"center",children:[t&&(0,i.jsx)(j,{marginLeft:20,index:0,width:24,height:24,content:(0,i.jsx)("img",{alt:"back btn",width:"100%",height:"100%",onClick:()=>n.back(),className:"pointer",src:"/co-flex/back.svg"})}),(0,i.jsx)(j,{marginLeft:20,index:1,width:200,height:38,content:(0,i.jsx)("span",{style:{fontSize:26},className:"mb-1",children:"Gallery"})})]})}function f(e){let{url:t}=e,n=m(t),o=(0,s.useRouter)();return(0,i.jsx)(j,{id:t,content:(0,i.jsx)("img",{alt:t,width:"100%",height:"100%",className:"pointer",onClick:()=>o.push({query:{url:t}},void 0,{shallow:!0}),src:t}),marginBottom:20,marginLeft:20,marginRight:20,marginTop:20,width:Math.round(150*n),aspectRatio:n})}function x(e){let{url:t}=e,n=m(t);return(0,i.jsx)(j,{marginBottom:20,marginLeft:20,marginRight:20,marginTop:20,flexDirection:"row",justifyContent:"center",flexGrow:1,children:(0,i.jsx)(j,{flexShrink:1,id:t,content:(0,i.jsx)("img",{alt:t,width:"100%",height:"100%",src:t}),aspectRatio:n})})}function m(e){let t=c.get(e),[n,i]=(0,o.useState)((null==t?void 0:t.complete)?(null==t?void 0:t.naturalWidth)/(null==t?void 0:t.naturalHeight):1);return(0,o.useEffect)(()=>{if(null==t||t.complete)return;let e=()=>i(t.naturalWidth/t.naturalHeight);return t.addEventListener("load",e),()=>t.removeEventListener("load",e)},[]),n}let w=()=>void 0;function v(e){let{children:t,...n}=e,[r,l]=(0,o.useState)({}),s=(0,u.useYogaRootNode)(n,(0,o.useCallback)((e,t)=>{l({width:e.getComputed("width"),height:e.getComputed("height"),left:e.getComputed("left"),top:e.getComputed("top")}),e.processChildren()},[]),w,10,1);return(0,i.jsx)(u.FlexNodeContextProvider,{context:s,children:(0,i.jsx)(d.Provider,{value:r,children:t})})}function j(e){var t,n,l,s,a;let{id:c,children:h,index:p,content:g,...f}=e,[x,m]=(0,o.useState)({}),v=(0,o.useContext)(d),j=(0,u.useYogaNode)(f,null!=p?p:0,(0,o.useCallback)((e,t)=>{m({width:e.getComputed("width"),height:e.getComputed("height"),left:e.getComputed("left"),top:e.getComputed("top")}),e.processChildren()},[]),w),b=(0,o.useMemo)(()=>({...x,zIndex:(null!==(t=v.zIndex)&&void 0!==t?t:0)+1,top:(null!==(n=v.top)&&void 0!==n?n:0)+(null!==(l=x.top)&&void 0!==l?l:0),left:(null!==(s=v.left)&&void 0!==s?s:0)+(null!==(a=x.left)&&void 0!==a?a:0),content:g}),[v,x,g]);return(0,r.useVirtual)(C,b,p,c),(0,i.jsx)(u.FlexNodeContextProvider,{context:j,children:(0,i.jsx)(d.Provider,{value:b,children:h})})}function C(e){let{destroy:t,controllerProps:n}=e,r=(0,o.useRef)({}),{zIndex:u,content:s,...d}=(0,o.useMemo)(()=>(n.length>0&&null!=n[0].width&&(r.current={...n[0]}),r.current),[n]),[a]=(0,l.useSpring)({...d,opacity:null!=d.width&&n.length>0?1:0,onRest:{opacity(e){0===e.value&&t()}}},[d,n]);return null==s?null:(0,i.jsx)(l.a.div,{style:{position:"absolute",zIndex:u,...a},children:s})}}},function(e){e.O(0,[13,531,928,261,664,774,888,179],function(){return e(e.s=4080)}),_N_E=e.O()}]);