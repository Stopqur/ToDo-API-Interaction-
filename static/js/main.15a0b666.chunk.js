(this["webpackJsonptodo-app"]=this["webpackJsonptodo-app"]||[]).push([[0],{119:function(t,e,n){"use strict";n.r(e);var c=n(0),a=n(10),r=n.n(a),o=(n(92),n(20)),i=n.n(o),s=n(42),u=n(16),l=n(11),j=n(160),d=n(153),b=n(157),f=n(164),p=n(161),h=n(147),O=n(12),x=n(165),m=n(150),v=n(151),g=n(152),y=n(4),k=Object(h.a)((function(){return{title:{color:"white"},dateText:{color:"orange"}}}));function w(t){var e=t.addTodo,n=k(),a=Object(c.useState)(""),r=Object(l.a)(a,2),o=r[0],i=r[1];return Object(y.jsxs)(j.a,{mt:3,pb:5,children:[Object(y.jsx)(x.a,{}),Object(y.jsx)(m.a,{component:"form",style:{display:"flex"},onSubmit:function(t){return n=t,""!==o&&(n.preventDefault(),e(o,i)),void n.preventDefault();var n},children:Object(y.jsxs)(j.a,{display:"flex",justifyContent:"space-around",children:[Object(y.jsx)(v.a,Object(O.a)({style:{width:"70%"},type:"text",value:o,onChange:function(t){i(t.target.value)},placeholder:"Write a goal...",className:n.title},"style",{minWidth:"100px"})),Object(y.jsx)(g.a,{variant:"contained",color:"primary",style:{width:"20%",marginLeft:"90px"},type:"submit",children:"Create"})]})})]})}function C(t){var e=t.filterMethod;return Object(y.jsxs)(j.a,{mr:1,children:[Object(y.jsx)(g.a,{onClick:function(){return e("")},variant:"contained",style:{marginLeft:"20px",marginBottom:"20px",width:"96px"},type:"button",children:"All"}),Object(y.jsx)(g.a,{onClick:function(){return e("done")},variant:"contained",style:{marginLeft:"20px",marginBottom:"20px",width:"96px"},type:"button",children:"Done"}),Object(y.jsx)(g.a,{onClick:function(){return e("undone")},variant:"contained",style:{marginLeft:"20px",marginBottom:"20px",width:"96px"},type:"button",children:"Undone"})]})}var S=n(75),T=n.n(S),B=n(76),P=n.n(B);function D(t){var e=t.sortBtn,n=Object(c.useState)("secondary"),a=Object(l.a)(n,2),r=a[0],o=a[1],i=Object(c.useState)(""),s=Object(l.a)(i,2),u=s[0],b=s[1];return Object(y.jsxs)(j.a,{display:"flex",alignItems:"center",children:[Object(y.jsx)(d.a,{children:"Sort by date:"}),Object(y.jsx)(j.a,{ml:1,children:Object(y.jsx)(g.a,{size:"small",onClick:function(){e("asc"),o("secondary"),b("")},color:r,type:"button",children:Object(y.jsx)(T.a,{})})}),Object(y.jsx)(j.a,{ml:1,children:Object(y.jsx)(g.a,{size:"small",onClick:function(){e("desc"),b("secondary"),o("")},color:u,type:"button",children:Object(y.jsx)(P.a,{})})})]})}function E(t){var e=t.sortTodos,n=t.filterMethod;return Object(y.jsxs)(j.a,{display:"flex",justifyContent:"space-between",children:[Object(y.jsx)(C,{filterMethod:n}),Object(y.jsx)(D,{sortBtn:e})]})}var F=n(154),L=n(162),I=n(159),N=n(77),A=n.n(N),M=Object(h.a)((function(t){return{title:{color:"white"},dateText:{color:"orange"},root:{"& > *":{margin:t.spacing(1),maxWidth:"25ch"}}}}));function W(t){var e=t.todo,n=(t.todoComplete,t.todoDelete),a=(t.changeText,t.currentText),r=t.editTodo,o=M(),i=Object(c.useState)(e.name),s=Object(l.a)(i,2),u=s[0],b=s[1],f=Object(c.useState)(!0),p=Object(l.a)(f,2),h=p[0],O=p[1];return Object(y.jsxs)(F.a,{children:[Object(y.jsxs)(j.a,{htmlFor:e.uuid,style:{display:"flex",alignItems:"center"},children:[Object(y.jsx)(L.a,{id:e.uuid,value:"checkedA",inputProps:{"aria-label":"Checkbox A"},onChange:function(){return r(e,e.name,!e.done)},checked:e.done}),Object(y.jsx)("form",{className:o.root,onDoubleClick:function(t){O(!1),console.log(e)},onKeyDown:function(t){"Escape"===t.key&&(a(t,e,b),O(!0))},children:Object(y.jsx)(j.a,{width:"608px",p:2,children:h?Object(y.jsx)(d.a,{className:o.title,children:u}):Object(y.jsx)(I.a,{className:o.input,onBlur:function(){return O(!0)},onKeyPress:function(t){!1===h&&"Enter"===t.key&&(r(e,u,e.done),O(!0))},onChange:function(t){return function(t){b(t.target.value)}(t)},value:u,label:"Outlined",variant:"outlined",InputProps:{style:{color:"#f50057"}},autoFocus:!0})})}),Object(y.jsx)(d.a,{className:o.dateText,children:"".concat(e.createdAt.slice(0,10),", time: ").concat(e.createdAt.slice(11,19))})]}),Object(y.jsx)(g.a,{startIcon:Object(y.jsx)(A.a,{}),onClick:function(){return n(e.uuid)},type:"button"})]})}var z=function(t){var e=t.number,n=t.btnSwitchPage,a=Object(c.useState)("outlined"),r=Object(l.a)(a,2),o=r[0],i=r[1],s=Object(c.useState)(e),u=Object(l.a)(s,2);return u[0],u[1],console.log("status",o,e),Object(c.useEffect)((function(){i("outlined")}),[e]),Object(y.jsx)(j.a,{mr:1,children:Object(y.jsx)(g.a,{variant:o,color:"secondary",onClick:function(t){n(e),console.log(e)},children:e})})};var H=function(t){for(var e=t.btnSwitchPage,n=t.countTodoOnPage,c=t.countFilterTodo,a=[],r=1;r<=Math.ceil(c/n);r++)a.push(r);return Object(y.jsx)(j.a,{display:"flex",justifyContent:"center",children:a.map((function(t,n){return Object(y.jsx)(z,{number:t,btnSwitchPage:e},n)}))})},J=n(47),K=n.n(J),U=Object(h.a)((function(){return{title:{color:"white"},input:{color:"white"}}}));var V=function(){var t=U(),e=Object(c.useState)([]),n=Object(l.a)(e,2),a=n[0],r=n[1],o=Object(c.useState)(Object(u.a)(a)),h=Object(l.a)(o,2),O=h[0],x=h[1],m=Object(c.useState)(1),v=Object(l.a)(m,2),g=v[0],k=v[1],C=Object(c.useState)(""),S=Object(l.a)(C,2),T=S[0],B=S[1],P=Object(c.useState)(!1),D=Object(l.a)(P,2),F=D[0],L=D[1],I=Object(c.useState)(""),N=Object(l.a)(I,2),A=N[0],M=N[1],z=Object(c.useState)("asc"),J=Object(l.a)(z,2),V=J[0],q=J[1];function G(t){var e=3*g,n=e-3;x(t.slice(n,e))}function Q(t){L(!0),B("".concat("".concat(t).slice(0,6)+" "+"".concat(t).slice(39,42)))}var R=function(){var t=Object(s.a)(i.a.mark((function t(e){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,K.a.post("https://todo-api-learning.herokuapp.com/v1/task/2",e);case 3:n=t.sent,r([].concat(Object(u.a)(a),[n.data])),G([].concat(Object(u.a)(O),[n.data])),console.log("Very pretty code!!!",n),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),Q(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}(),X=function(){var t=Object(s.a)(i.a.mark((function t(e){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,K.a.delete("https://todo-api-learning.herokuapp.com/v1/task/2/".concat(e));case 3:r(Object(u.a)(a.filter((function(t){return t.uuid!==e})))),x(Object(u.a)(O.filter((function(t){return t.uuid!==e})))),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),Q(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}(),Y=function(){var t=Object(s.a)(i.a.mark((function t(e){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,K.a.get("https://todo-api-learning.herokuapp.com/v1/tasks/2",{params:{filterBy:A,order:V}});case 3:n=t.sent,"",r(n.data),G(n.data),console.log(""),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),Q(t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}(),Z=function(){var t=Object(s.a)(i.a.mark((function t(e,n,c){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,K.a.patch("https://todo-api-learning.herokuapp.com/v1/task/2/".concat(e),{done:c,name:n});case 3:Y("asc"),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),Q(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e,n,c){return t.apply(this,arguments)}}();function $(t,e,n){Z(t.uuid,e,n)}Object(c.useEffect)((function(){G(a)}),[g]),Object(c.useEffect)((function(){O.length<1&&0!==a.length&&1!==g?(k(g-1),G(a)):O.length<1&&0!==a.length&&1===g&&G(a)}),[O.length]),Object(c.useEffect)((function(){Y()}),[A,V]);var _=function(){var t=Object(s.a)(i.a.mark((function t(e){return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,X(e);case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();function tt(t,e,n){"Escape"===t.key&&x(Object(u.a)(O.map((function(t){return n(e.name),t}))))}var et=function(t){"clickaway"!==t&&L(!1)};return Object(y.jsxs)(j.a,{bgcolor:"text.secondary",p:10,children:[Object(y.jsx)(d.a,{className:t.title,variant:"h3",children:"toDo List"}),Object(y.jsx)(w,{addTodo:function(t,e){R({name:t,done:!1}),e(""),O.length>2&&G(a)}}),Object(y.jsx)(E,{sortTodos:function(t){q(t)},filterMethod:function(t){M(t)}}),Object(y.jsx)(j.a,{minHeight:"280px",children:Object(y.jsx)(b.a,{children:O.map((function(t){return Object(y.jsx)(W,{todoDelete:_,todo:t,currentText:tt,editTodo:$},t.uuid)}))})}),a.length>3&&Object(y.jsx)(H,{classes:t,btnSwitchPage:function(t){k(t)},countTodoOnPage:3,countFilterTodo:a.length}),Object(y.jsx)(f.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:F,autoHideDuration:6e3,onClose:et,children:Object(y.jsx)(p.a,{onClose:et,severity:"error",children:T})})]})},q=n(158);var G=function(t){return Object(y.jsx)(q.a,{maxWidth:"md",children:Object(y.jsx)(V,{createBlock:t.createBlock})})};function Q(){return Object(y.jsx)(G,{createBlock:function(){return console.log("asdkfsa;ldfkn")}})}var R=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,167)).then((function(e){var n=e.getCLS,c=e.getFID,a=e.getFCP,r=e.getLCP,o=e.getTTFB;n(t),c(t),a(t),r(t),o(t)}))};r.a.render(Object(y.jsx)(Q,{}),document.getElementById("root")),R()},92:function(t,e,n){}},[[119,1,2]]]);
//# sourceMappingURL=main.15a0b666.chunk.js.map