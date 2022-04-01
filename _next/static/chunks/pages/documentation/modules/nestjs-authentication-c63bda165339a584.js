(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[612],{197:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/documentation/modules/nestjs-authentication",function(){return n(6053)}])},250:function(e,t,n){"use strict";var s=n(5893),o={github:"https://github.com/conceptadev/rockets",docsRepositoryBase:"https://github.com/conceptadev/rockets/blob/main",search:!0,titleSuffix:" \u2013 Rockets",floatTOC:!0,logo:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("img",{className:"md:inline object-contain hidden",height:16,width:16,alt:"Rockets Logo",src:"/assets/rockets-icon.svg"}),(0,s.jsx)("span",{className:"mr-2 font-extrabold mx-2 hidden md:inline",children:"Rockets"})]}),head:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("meta",{name:"msapplication-TileColor",content:"#ffffff"}),(0,s.jsx)("meta",{name:"theme-color",content:"#ffffff"}),(0,s.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,s.jsx)("meta",{httpEquiv:"Content-Language",content:"en"}),(0,s.jsx)("meta",{name:"description",content:"Rockets: Rapid Enterprise Development Toolkit"}),(0,s.jsx)("meta",{name:"og:description",content:"Rockets: Rapid Enterprise Development Toolkit"}),(0,s.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,s.jsx)("meta",{name:"twitter:image",content:"https://www.rockets.tools/og.png"}),(0,s.jsx)("meta",{name:"twitter:site:domain",content:"rockets.tools"}),(0,s.jsx)("meta",{name:"twitter:url",content:"https://www.rockets.tools"}),(0,s.jsx)("meta",{name:"og:title",content:"Rockets: Rapid Enterprise Development Toolkit"}),(0,s.jsx)("meta",{name:"og:image",content:"https://www.rockets.tools/og.png"}),(0,s.jsx)("meta",{name:"apple-mobile-web-app-title",content:"Rockets"}),(0,s.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/apple-icon-180x180.png"}),(0,s.jsx)("link",{rel:"icon",type:"image/png",sizes:"192x192",href:"/android-icon-192x192.png"}),(0,s.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon-32x32.png"}),(0,s.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/favicon-16x16.png"}),(0,s.jsx)("link",{rel:"manifest",href:"/site.webmanifest"}),(0,s.jsx)("meta",{name:"msapplication-TileImage",content:"/ms-icon-150x150.png"})]}),prevLinks:!0,nextLinks:!0,footer:!0,footerEditLink:"Edit this page on GitHub",footerText:(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("span",{children:["2022 \xa9 ",(0,s.jsx)("a",{href:"https://conceptatech.com",target:"_blank",rel:"noreferrer",children:" Concepta"})]})}),unstable_faviconGlyph:"\ud83d\udc4b"};t.Z=o},6053:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var s=n(5893),o=n(7479),a=n(3805),i=n(250),c=n(1151);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},s=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(s=s.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),s.forEach((function(t){r(e,t,n[t])}))}return e}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=function(){var t=Object.assign({p:"p",a:"a",img:"img",h1:"h1",h2:"h2",code:"code"},(0,c.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://www.npmjs.com/package/@concepta/nestjs-authentication",children:(0,s.jsx)(t.img,{src:"https://img.shields.io/npm/v/@concepta/nestjs-authentication",alt:"NPM Latest"})}),"\n",(0,s.jsx)(t.a,{href:"https://www.npmjs.com/package/@concepta/nestjs-nestjscontrol",children:(0,s.jsx)(t.img,{src:"https://img.shields.io/npm/v/@concepta/nestjs-authentication/alpha",alt:"NPM Alpha"})}),"\n",(0,s.jsx)(t.a,{href:"https://www.npmjs.com/package/@concepta/nestjs-authentication",children:(0,s.jsx)(t.img,{src:"https://img.shields.io/npm/dw/@conceptadev/nestjs-authentication",alt:"NPM Downloads"})})]}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:"https://github.com/conceptadev/rockets/labels/nestjs-authentication",children:(0,s.jsx)(t.img,{src:"https://img.shields.io/github/issues/conceptadev/rockets/nestjs-authentication",alt:"GitHub Open Issues"})}),"\n",(0,s.jsx)(t.a,{href:"https://github.com/conceptadev/rockets/labels/nestjs-authentication",children:(0,s.jsx)(t.img,{src:"https://img.shields.io/github/issues-closed/conceptadev/rockets/nestjs-authentication",alt:"GitHub Closed Issues"})}),"\n",(0,s.jsx)(t.a,{href:"https://github.com/conceptadev/rockets/labels/nestjs-authentication",children:(0,s.jsx)(t.img,{src:"https://img.shields.io/github/issues-pr/conceptadev/rockets/nestjs-authentication",alt:"GitHub Open PRs"})}),"\n",(0,s.jsx)(t.a,{href:"https://github.com/conceptadev/rockets/labels/nestjs-authentication",children:(0,s.jsx)(t.img,{src:"https://img.shields.io/github/issues-pr-closed/conceptadev/rockets/nestjs-authentication",alt:"GitHub Closed PRs"})})]}),"\n",(0,s.jsx)(t.h1,{children:"Rockets NestJS Authentication"}),"\n",(0,s.jsx)(t.p,{children:"Authenticate requests using one or more strategies (local, jwt, etc)."}),"\n",(0,s.jsx)(t.p,{children:"All of the strategies require that this module be registered by the app, as it provides a set of shared services\nthey use to validate users as well as issue and verify tokens."}),"\n",(0,s.jsx)(t.h2,{children:"Installation"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.code,{children:"yarn add @concepta/nestjs-authentication"})})]})},n=Object.assign({},(0,c.ah)(),e.components),o=n.wrapper;return o?(0,s.jsx)(o,m({},e,{children:(0,s.jsx)(t,{})})):t()}var l=(0,s.jsx)(u,{});function d(e){return(0,a.withSSG)((0,o.Z)({filename:"nestjs-authentication.md",route:"/documentation/modules/nestjs-authentication",meta:{},pageMap:[{name:"documentation",children:[{name:"getting-started",route:"/documentation/getting-started",frontMatter:{title:"Getting Started"}},{name:"meta.json",meta:{"getting-started":"Getting Started",modules:{title:"Modules"}}},{name:"modules",children:[{name:"nestjs-access-control",route:"/documentation/modules/nestjs-access-control"},{name:"nestjs-auth-github",route:"/documentation/modules/nestjs-auth-github"},{name:"nestjs-auth-jwt",route:"/documentation/modules/nestjs-auth-jwt"},{name:"nestjs-auth-local",route:"/documentation/modules/nestjs-auth-local"},{name:"nestjs-auth-refresh",route:"/documentation/modules/nestjs-auth-refresh"},{name:"nestjs-authentication",route:"/documentation/modules/nestjs-authentication"},{name:"nestjs-common",route:"/documentation/modules/nestjs-common"},{name:"nestjs-crud",route:"/documentation/modules/nestjs-crud"},{name:"nestjs-email",route:"/documentation/modules/nestjs-email"},{name:"nestjs-event",route:"/documentation/modules/nestjs-event"},{name:"nestjs-exception",route:"/documentation/modules/nestjs-exception"},{name:"nestjs-jwt",route:"/documentation/modules/nestjs-jwt"},{name:"nestjs-logger",route:"/documentation/modules/nestjs-logger"},{name:"nestjs-password",route:"/documentation/modules/nestjs-password"},{name:"nestjs-swagger-ui",route:"/documentation/modules/nestjs-swagger-ui"},{name:"nestjs-typeorm-ext",route:"/documentation/modules/nestjs-typeorm-ext"},{name:"nestjs-user",route:"/documentation/modules/nestjs-user"}],route:"/documentation/modules"}],route:"/documentation"},{name:"index",route:"/",frontMatter:{title:"Rockets - Rapid Enterprise Development Toolkit"}},{name:"meta.json",meta:{index:{title:"Introduction",type:"nav",hidden:!0},documentation:{title:"Documentation",type:"nav"}}}]},i.Z))(m({},e,{children:l}))}}},function(e){e.O(0,[872,774,888,179],(function(){return t=197,e(e.s=t);var t}));var t=e.O();_N_E=t}]);