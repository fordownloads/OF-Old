(this["webpackJsonpd-site"]=this["webpackJsonpd-site"]||[]).push([[5],{390:function(e,t){},391:function(e,t){},392:function(e,t){},393:function(e,t){},394:function(e,t,a){"use strict";var n;a.d(t,"a",(function(){return n})),function(e){e.beta="beta",e.stable="stable"}(n||(n={}))},395:function(e,t){},397:function(e,t,a){"use strict";var n=a(390);a.o(n,"EReleaseType")&&a.d(t,"EReleaseType",(function(){return n.EReleaseType}));var l=a(391);a.o(l,"EReleaseType")&&a.d(t,"EReleaseType",(function(){return l.EReleaseType}));var r=a(392);a.o(r,"EReleaseType")&&a.d(t,"EReleaseType",(function(){return r.EReleaseType}));var c=a(393);a.o(c,"EReleaseType")&&a.d(t,"EReleaseType",(function(){return c.EReleaseType}));var o=a(394);a.d(t,"EReleaseType",(function(){return o.a}));a(395)},406:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(51),c=a(33),o=a(12),s=a(374),i=a(67),u=a(397),d=a(396),p=a(8),f=a(128),v=Object(r.I)((function(e){return Object(r.H)({root:{width:"100%",backgroundColor:"#2a2a2a"},icon:{color:"#ddd"},iconM5:{color:"#ddd",marginRight:"5px"},details:{display:"flex",padding:"5px 10px 10px",flexDirection:"column"}})})),E=function(e){var t=e.code,a=e.expanded,n=e.data,c=e.type,s=e.version,i=e.releaseLabel,u=v(),E=Object(d.sortBy)(n,(function(e){return e.actualDate})).reverse(),b=l.a.useState(0),m=Object(o.a)(b,2),y=m[0],R=m[1],T=Object(f.a)(e);return T&&(null===T||void 0===T?void 0:T.code)&&t&&!Object(d.isEqual)(Object(d.sortBy)((null===T||void 0===T?void 0:T.data)||[],(function(e){return e.actualDate})),Object(d.sortBy)(n||[],(function(e){return e.actualDate})))&&setTimeout((function(){return R(0)}),0),l.a.createElement(l.a.Fragment,null,l.a.createElement(r.a,{className:u.root,defaultExpanded:a},l.a.createElement(r.c,{id:"release-".concat(c,"-header"),expandIcon:l.a.createElement(p.g,{className:u.icon}),"aria-controls":"release-".concat(c,"-content")},l.a.createElement(r.E,{className:"flexd v-center"},l.a.createElement(p.t,{className:u.iconM5,fontSize:"small"}),i)),l.a.createElement(r.b,{className:u.details},E.map((function(e,a){return l.a.createElement(r.y,{key:e.version,version:e.version,code:t,type:c,onClick:function(){var e;R(y===(e=a)?-1:e)},expanded:s?e.version===s:y===a})})))))},b=function(e){var t,a,d,p=e.code,f=e.type,v=e.version,b=Object(n.useState)({}),m=Object(o.a)(b,2),y=m[0],R=m[1];Object(n.useEffect)((function(){p&&Object(i.c)(p).then((function(e){return R(e)})).catch((function(){return R(void 0)}))}),[p]);var T=p&&y,g=f?f===u.EReleaseType.stable:!!(null===y||void 0===y||null===(t=y.stable)||void 0===t?void 0:t.length);function x(e){return e?e.map((function(e){return Object(c.a)(Object(c.a)({},e),{},{actualDate:new Date(e.date)})})):e}return l.a.createElement(l.a.Fragment,null,T&&l.a.createElement(l.a.Fragment,null,!!(null===(a=y.stable)||void 0===a?void 0:a.length)&&l.a.createElement(E,{code:p,version:v,type:u.EReleaseType.stable,expanded:g,data:x(null===y||void 0===y?void 0:y.stable),releaseLabel:l.a.createElement(s.a,{id:"release.type.stable",defaultMessage:"Stable Releases"})}),!!(null===(d=y.beta)||void 0===d?void 0:d.length)&&l.a.createElement(E,{code:p,version:v,type:u.EReleaseType.beta,expanded:!g,data:x(null===y||void 0===y?void 0:y.beta),releaseLabel:l.a.createElement(s.a,{id:"release.type.beta",defaultMessage:"Beta Releases"})})),!T&&l.a.createElement(r.e,{elevation:3,style:{marginTop:"10px"}},l.a.createElement(r.f,{style:{padding:"20px",textAlign:"center"}},l.a.createElement(s.a,{id:"release.notFound",defaultMessage:"There are no releases for this device yet!"}))))};t.default=function(e){var t=e.code,a=e.type,n=e.version;return l.a.createElement(l.a.Fragment,null,l.a.createElement(r.h,{code:t}),l.a.createElement(b,{code:t||"",type:a,version:n}))}}}]);