(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[894],{8048:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/grank",function(){return n(5143)}])},5143:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return u},default:function(){return x}});var i=n(5893),l=n(4805),r=n(1904),s=n(8007),a=n(7107),d=n(8662),o=n(118),c=n(7294),h=n(9055),u=!0;function x(e){let{langs:t,rawRecords:n}=e,[u]=l.Z.useForm(),[x,p]=(0,c.useState)(n),m=(0,c.useRef)(null),g=()=>{var e;let t=null==m?void 0:null===(e=m.current)||void 0===e?void 0:e.getElementsByClassName("anticon-left");t[0].click()},j=()=>{var e;let t=null==m?void 0:null===(e=m.current)||void 0===e?void 0:e.getElementsByClassName("anticon-right");t[0].click()};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("div",{style:{marginTop:"20px"},children:"快捷键: 下一页 Shift + Right, 上一页 Shift + Left"}),(0,i.jsxs)("div",{style:{marginTop:"20px",position:"relative"},children:[(0,i.jsx)("div",{children:(0,i.jsxs)(l.Z,{form:u,name:"query",layout:"inline",children:[(0,i.jsx)(l.Z.Item,{name:"lang",style:{width:"100px"},children:(0,i.jsx)(s.Z,{options:t})}),(0,i.jsx)(l.Z.Item,{name:"name",children:(0,i.jsx)(a.Z,{placeholder:"项目"})}),(0,i.jsx)(l.Z.Item,{shouldUpdate:!0,children:()=>(0,i.jsx)(d.ZP,{type:"primary",onClick:()=>{let e=u.getFieldsValue();console.log(e);let t=n.filter(t=>{let n=!0;return void 0!==e.lang&&t.lang!==e.lang&&(n=!1),void 0!==e.name&&0>t.name.indexOf(e.name)&&(n=!1),n});p(t)},disabled:!!u.getFieldsError().filter(e=>{let{errors:t}=e;return t.length}).length,children:"查询"})})]})}),(0,i.jsxs)("div",{style:{position:"absolute",top:"55px"},children:["查询结果 ",x.length," 条"]}),(0,i.jsx)(h.Z,{events:{onShiftLeft:g,onShiftRight:j},children:(0,i.jsx)(o.Z,{className:"github-rank",ref:m,pagination:{position:["topRight"]},dataSource:x,columns:[{title:"项目",dataIndex:"name",key:"name",width:100,render:(e,t)=>{let{name:n}=t;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{children:(0,i.jsx)("a",{href:"https://github.com/"+n,target:"_blank",children:n})})})}},{title:"Stars",dataIndex:"stars",key:"stars",width:20},{title:"描述",dataIndex:"desc",key:"desc",render:(e,t)=>{let{desc:n}=t;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{style:{maxWidth:"500px"},children:n})})}},{title:"话题",dataIndex:"topics",key:"topics",render:(e,t)=>{let{topics:n}=t;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"topics-hover",style:{maxWidth:"400px",whiteSpace:"nowrap",overflow:"scroll",paddingBottom:"5px"},children:null==n?void 0:n.map(e=>(0,i.jsx)(r.Z,{color:"geekblue",style:{cursor:"pointer"},onClick:()=>{open("https://github.com/topics/"+e,"_blank")},children:e},e))})})}},{title:"语言",dataIndex:"lang",width:60,key:"lang",render:(e,t)=>{let{lang:n}=t;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{style:{maxWidth:"60px"},children:n})})}}]})})]})]})}}},function(e){e.O(0,[104,774,888,179],function(){return e(e.s=8048)}),_N_E=e.O()}]);