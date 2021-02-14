(this["webpackJsonpone-management"]=this["webpackJsonpone-management"]||[]).push([[7],{130:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(41),c=n.n(r),o=n(67),i=n(66),s=n(0),u=n(227),l=n(170),j=n(258),d=n(235),b=n(257),h=n(52),p=n(255),m=Object(u.a)((function(e){return{root:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"},paper:{width:"70%",height:"70%",background:"linear-gradient( #e6e6e6 90%, teal 10%)"}}})),f={macAddress:"",location:"",vlan:""};t.default=function(){var e=m(),t=Object(s.useState)([]),n=Object(i.a)(t,2),r=n[0],u=n[1];Object(s.useEffect)(Object(o.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.getLocationOptions();case 2:t=e.sent,u(t);case 4:case"end":return e.stop()}}),e)}))),[]);var O=Object(b.b)(f),g=O.values,v=O.handleInputChange,x=O.resetForm,w=function(){var e=Object(o.a)(c.a.mark((function e(t){var n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,p.a.updateVlan(g.macAddress,g.location,g.vlan);case 3:n=e.sent,window.alert(n.data.message),x();case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(a.jsx)("div",{className:e.root,children:Object(a.jsxs)(l.a,{elevation:20,classes:{root:e.paper},children:[Object(a.jsx)("h1",{children:"\u05d4\u05db\u05e0\u05e1\u05d4 \u05d5\u05e9\u05d9\u05e0\u05d5\u05d9 Vlan"}),Object(a.jsx)(b.a,{onSubmit:w,style:{backgroundColor:""},children:Object(a.jsx)(d.a,{container:!0,style:{backgroundColor:""},spacing:0,direction:"column",alignItems:"center",justify:"center",children:Object(a.jsxs)(d.a,{item:!0,xs:6,style:{backgroundColor:""},children:[Object(a.jsx)(j.a.Input,{name:"macAddress",label:"\u05db\u05ea\u05d5\u05d1\u05ea Mac",value:g.macAddress,onChange:v}),Object(a.jsx)(j.a.Select,{name:"location",label:"\u05de\u05d9\u05e7\u05d5\u05dd",value:g.location,onChange:v,options:r}),Object(a.jsx)(j.a.Select,{name:"vlan",label:"Vlan",value:g.vlan,onChange:v,options:h.vlanOptions}),Object(a.jsxs)("div",{children:[Object(a.jsx)(j.a.Button,{type:"submit",text:"Submit"}),Object(a.jsx)(j.a.Button,{text:"Reset",onClick:x})]})]})})})]})})}},255:function(e,t,n){"use strict";var a=n(84),r=n.n(a),c=(n(0),{getBitLockerPassword:function(e,t){return new Promise((function(n,a){r.a.get("/api/BitLocker",{params:{type:e,input:t}}).then((function(e){n(e)})).catch((function(e){return a(e)}))}))},getLapsPassword:function(e){return new Promise((function(t,n){r.a.get("/api/Laps",{params:{computerName:e}}).then((function(e){t(e)})).catch((function(e){return n(e)}))}))},updateVlan:function(e,t,n){return new Promise((function(a,c){r.a.post("/api/Vlan",{mac:e,location:t,vlan:n}).then((function(e){a(e)})).catch((function(e){return c(e)}))}))},getLocationOptions:function(){return new Promise((function(e,t){r.a.get("/api/vlan/locationOptions").then((function(t){e(t.data)})).catch((function(e){return t(e)}))}))},searchUsers:function(e){return new Promise((function(t,n){r.a.get("/api/userManagement/search",{params:{userPrefix:e}}).then((function(e){t(e.data)})).catch((function(e){return n(e)}))}))},getUserStatus:function(e){return new Promise((function(t,n){r.a.get("/api/userManagement/userStatus",{params:{samAccountName:e}}).then((function(e){t(e.data)})).catch((function(e){return n(e)}))}))},resetPassword:function(e){return console.log("userId=",e),new Promise((function(t,n){r.a.get("/api/userManagement/resetPassword",{params:{userId:e}}).then((function(e){t(e.data)})).catch((function(e){return n(e)}))}))}});t.a=c},257:function(e,t,n){"use strict";n.d(t,"b",(function(){return l})),n.d(t,"a",(function(){return d}));var a=n(2),r=n(256),c=n(34),o=n(65),i=n(66),s=n(0),u=n(227);function l(e){var t=Object(s.useState)(e),n=Object(i.a)(t,2),a=n[0],r=n[1];return{values:a,handleInputChange:function(e){var t=e.target,n=t.name,i=t.value;r(Object(o.a)(Object(o.a)({},a),{},Object(c.a)({},n,i)))},resetForm:function(){r(e)}}}var j=Object(u.a)((function(e){return{root:{backgroundColor:"",height:"50%",width:"50%",marginTop:"5%",display:"inline-block",position:"relative"}}}));function d(e){var t=j(),n=(e.children,Object(r.a)(e,["children"]));return console.log("props: ",e),Object(a.jsx)("form",Object(o.a)(Object(o.a)({className:t.root,autoComplete:"off"},n),{},{children:e.children}))}},258:function(e,t,n){"use strict";var a=n(2),r=(n(0),n(253)),c=n(240),o=n(117),i=n(227),s=n(241),u=Object(o.a)({palette:{primary:c.a},direction:"rtl"}),l=Object(i.a)((function(e){return{root:{margin:e.spacing(.5),backgroundColor:"white"}}}));var j=n(65),d=n(297),b=n(245),h=n(172),p=n(300),m=n(287),f=n(5),O=Object(f.a)({root:{color:c.a[400],"&$checked":{color:c.a[600]}},checked:{}})((function(e){return Object(a.jsx)(d.a,Object(j.a)({color:"default",required:!0},e))}));var g=n(246),v=n(248),x=n(288),w=Object(i.a)((function(e){return{root:{margin:e.spacing(2.5),backgroundColor:"white"}}})),C=Object(o.a)({palette:{primary:c.a},direction:"rtl"});var k=n(256),y=n(289),P=Object(i.a)((function(e){return{root:{margin:e.spacing(2.5),backgroundColor:"white"},label:{textTransform:"none"}}})),S=Object(o.a)({palette:{primary:c.a}});var I={Input:function(e){var t=l(),n=e.name,c=e.label,o=e.value,i=e.onChange;return Object(a.jsx)(s.a,{theme:u,children:Object(a.jsx)(r.a,{required:!0,label:c,id:"mui-theme-provider-outlined-input",value:o,onChange:i,variant:"outlined",classes:{root:t.root},name:n})})},RadioGroup:function(e){var t=e.name,n=e.label,r=e.value,c=e.onChange,o=e.items;return console.log("items: ",o),Object(a.jsxs)(b.a,{children:[Object(a.jsx)(h.a,{children:n}),Object(a.jsx)(p.a,{row:!0,required:!0,name:t,value:r,onChange:c,children:o.map((function(e){return Object(a.jsx)(m.a,{value:e.id,control:Object(a.jsx)(O,{}),label:e.title},e.id)}))})]})},Select:function(e){var t=w(),n=e.name,r=e.label,c=e.value,o=e.onChange,i=e.options;return console.log("options",i),Object(a.jsx)(s.a,{theme:C,children:Object(a.jsxs)(b.a,{variant:"outlined",style:{minWidth:120},classes:{root:t.root},children:[Object(a.jsx)(g.a,{children:r}),Object(a.jsxs)(v.a,{label:r,name:n,value:c,onChange:o,children:[Object(a.jsx)(x.a,{value:""}),i.map((function(e){return Object(a.jsx)(x.a,{value:e,children:e},e)}))]})]})})},Button:function(e){var t=P(),n=e.text,r=e.size,c=e.color,o=(e.variant,e.onClick),i=Object(k.a)(e,["text","size","color","variant","onClick"]);return Object(a.jsx)(s.a,{theme:S,children:Object(a.jsx)(y.a,Object(j.a)(Object(j.a)({variant:"outlined",size:r||"large",color:c||"primary",onClick:o},i),{},{classes:{root:t.root,label:t.label},children:n}))})}};t.a=I}}]);
//# sourceMappingURL=7.d2eb6b45.chunk.js.map