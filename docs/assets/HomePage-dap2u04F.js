import{_ as i,r as c,s as p,A as d,o as n,c as l,a as e,F as _,b as f,n as r,p as u,d as m}from"./index-T3_bnUR5.js";const b={setup(){const s=c(0),t=c(0);return{ballCount:s,sprinkles:p,gravity:t,mine(){d.power++}}}},g=s=>(u("data-v-b1fef6ab"),s=s(),m(),s),v={class:"center"},h={class:"pong-wrapper"},k=["src"],S={class:"rotating"},y=g(()=>e("section",null,null,-1));function I(s,t,w,o,x,z){return n(),l("div",v,[e("div",null,[e("section",h,[e("img",{onClick:t[0]||(t[0]=(...a)=>o.mine&&o.mine(...a)),src:o.sprinkles,class:"mine-image bouncy-click",alt:"Sprinkles the Ape"},null,8,k),e("div",S,[(n(!0),l(_,null,f(o.ballCount,a=>(n(),l("div",{style:r(`--offset: ${a*11}deg`),class:"rotation-offset"},[e("div",{class:"pong-ball",style:r(`--ball-offset: .${a}s; --ball-size: ${s.ballSize||11}px`)},null,4)],4))),256))])]),y])])}const B=i(b,[["render",I],["__scopeId","data-v-b1fef6ab"]]);export{B as default};
