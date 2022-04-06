(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[623],{8498:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/documentation/modules/util/nestjs-logger",function(){return n(4782)}])},250:function(e,t,n){"use strict";var o=n(5893),s={github:"https://github.com/conceptadev/rockets",docsRepositoryBase:"https://github.com/conceptadev/rockets/blob/main",search:!0,titleSuffix:" \u2013 Rockets",floatTOC:!0,logo:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("img",{className:"md:inline object-contain hidden",height:16,width:16,alt:"Rockets Logo",src:"/assets/rockets-icon.svg"}),(0,o.jsx)("span",{className:"mr-2 font-extrabold mx-2 hidden md:inline",children:"Rockets"})]}),head:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("meta",{name:"msapplication-TileColor",content:"#ffffff"}),(0,o.jsx)("meta",{name:"theme-color",content:"#ffffff"}),(0,o.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,o.jsx)("meta",{httpEquiv:"Content-Language",content:"en"}),(0,o.jsx)("meta",{name:"description",content:"Rockets: Rapid Enterprise Development Toolkit"}),(0,o.jsx)("meta",{name:"og:description",content:"Rockets: Rapid Enterprise Development Toolkit"}),(0,o.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,o.jsx)("meta",{name:"twitter:image",content:"https://www.rockets.tools/og.png"}),(0,o.jsx)("meta",{name:"twitter:site:domain",content:"rockets.tools"}),(0,o.jsx)("meta",{name:"twitter:url",content:"https://www.rockets.tools"}),(0,o.jsx)("meta",{name:"og:title",content:"Rockets: Rapid Enterprise Development Toolkit"}),(0,o.jsx)("meta",{name:"og:image",content:"https://www.rockets.tools/og.png"}),(0,o.jsx)("meta",{name:"apple-mobile-web-app-title",content:"Rockets"}),(0,o.jsx)("link",{rel:"apple-touch-icon",sizes:"180x180",href:"/apple-icon-180x180.png"}),(0,o.jsx)("link",{rel:"icon",type:"image/png",sizes:"192x192",href:"/android-icon-192x192.png"}),(0,o.jsx)("link",{rel:"icon",type:"image/png",sizes:"32x32",href:"/favicon-32x32.png"}),(0,o.jsx)("link",{rel:"icon",type:"image/png",sizes:"16x16",href:"/favicon-16x16.png"}),(0,o.jsx)("link",{rel:"manifest",href:"/site.webmanifest"}),(0,o.jsx)("meta",{name:"msapplication-TileImage",content:"/ms-icon-150x150.png"})]}),prevLinks:!0,nextLinks:!0,footer:!0,footerEditLink:"Edit this page on GitHub",footerText:(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("span",{children:["2022 \xa9 ",(0,o.jsx)("a",{href:"https://conceptatech.com",target:"_blank",rel:"noreferrer",children:" Concepta"})]})}),unstable_faviconGlyph:"\ud83d\udc4b"};t.Z=s},4782:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var o=n(5893),s=n(7479),r=n(3805),i=n(250),a=n(1151);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),o.forEach((function(t){c(e,t,n[t])}))}return e}function m(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=function(){var t=Object.assign({h1:"h1",p:"p",h2:"h2",code:"code",blockquote:"blockquote",a:"a",h3:"h3",pre:"pre"},(0,a.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{children:"Rockets NestJS Logger"}),"\n",(0,o.jsx)(t.p,{children:"This module is a drop-in replacement for the core NestJS logger that provides additonal support for pushing log data\nto one or multiple external log consumption providers."}),"\n",(0,o.jsx)(t.h2,{children:"Overview"}),"\n",(0,o.jsxs)(t.p,{children:["This module wraps/extends the core NestJS ",(0,o.jsx)(t.code,{children:"Logger"})," and adds a powerful external transports plugin interface."]}),"\n",(0,o.jsxs)(t.blockquote,{children:["\n",(0,o.jsxs)(t.p,{children:["See the NestJS ",(0,o.jsx)(t.a,{href:"https://docs.nestjs.com/techniques/logger",children:"Logger"})," documentation\nfor more details on how logging is implemented in NestJS."]}),"\n"]}),"\n",(0,o.jsx)(t.h2,{children:"Installation"}),"\n",(0,o.jsx)(t.p,{children:(0,o.jsx)(t.code,{children:"yarn add @concepta/nestjs-logger"})}),"\n",(0,o.jsx)(t.h2,{children:"Registering"}),"\n",(0,o.jsx)(t.p,{children:"To start using the Logger Module, import the LoggerModule into your app."}),"\n",(0,o.jsx)(t.h3,{children:"Defaults (.env)"}),"\n",(0,o.jsx)(t.p,{children:"To register using the default configuration:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"@Module({\n  imports: [\n    LoggerModule.register()\n  ]\n});\nexport class App {}\n"})}),"\n",(0,o.jsxs)(t.p,{children:["To use the default configuration, you need todefine the environments variables.\nOne of the ways you can do that is using ",(0,o.jsx)(t.code,{children:".env"})," file"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-zsh",children:'// .env file\n\nLOG_LEVEL="log,error"\nTRANSPORT_LOG_LEVEL="error,warn"\nSENTRY_DSN="{your_sentry_dsn}"\n'})}),"\n",(0,o.jsx)(t.h3,{children:"Synchronous Registration"}),"\n",(0,o.jsx)(t.p,{children:"To register by direct configuration:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// ...\nimport { LoggerModule } from '@concepta/nestjs-logger';\n\n@Module({\n  imports: [\n    LoggerModule.register({\n      // ...\n    })\n  ]\n});\nexport class App {}\n"})}),"\n",(0,o.jsx)(t.h3,{children:"Aynchronous Registration"}),"\n",(0,o.jsx)(t.p,{children:"To register by direct configuration:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// ...\nimport { LoggerModule } from '@concepta/nestjs-logger';\n\n@Module({\n  imports: [\n    LoggerModule.registerAsync({\n      imports: [ConfigModule.forFeature(myConfig)],\n      inject: [myConfig.KEY],\n      useFactory: async (\n        appConfig: MyAppOptionsInterface,\n      ): Promise<LoggerOptionsInterface> => appConfig.logger\n  ]\n});\nexport class App {}\n"})}),"\n",(0,o.jsx)(t.h3,{children:"Transports"}),"\n",(0,o.jsxs)(t.p,{children:["If you define the transport to be used, it means that any method that you call from ",(0,o.jsx)(t.code,{children:"LoggerService"}),"\nwill also send the details of the log to the transport defined\n(at the moment we are only working with Sentry as external transport)."]}),"\n",(0,o.jsx)(t.p,{children:"You can easily create your own custom transports by developing a class that meets the interface."}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// ...\nimport { LoggerModule, LoggerSentryTransport } from '@concepta/nestjs-logger';\n\n@Module({\n  imports: [\n    LoggerModule.register({\n      transports: [LoggerSentryTransport],\n    })\n  ]\n});\nexport class App {}\n"})}),"\n",(0,o.jsx)(t.h2,{children:"Using LoggerService"}),"\n",(0,o.jsxs)(t.p,{children:["After importing the module with the proper configurations, you are all set to start using the ",(0,o.jsx)(t.code,{children:"LoggerService"})," as an injected service."]}),"\n",(0,o.jsx)(t.h3,{children:"Setup Globally"}),"\n",(0,o.jsx)(t.p,{children:"It is a good practice to also inform nest to use the new Logger internally overwrite the default Logger in your bootstrap."}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"// ...\nimport { LoggerService } from '@concepta/nestjs-logger';\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n\n  // get reference of LoggerService From LoggerModule\n  const customLoggerService = app.get(LoggerService);\n\n  // this is to inform that this logger will be used globally\n  // and it will be used once you create a new Logger()\n  app.useLogger(customLoggerService);\n\n  await app.listen(3000);\n}\nbootstrap();\n"})}),"\n",(0,o.jsxs)(t.p,{children:["Now any time you call a method from ",(0,o.jsx)(t.code,{children:"Logger"})," class from ",(0,o.jsx)(t.code,{children:"@nestjs/common"})," will be calling the same\nmethod from ",(0,o.jsx)(t.code,{children:"LoggerService"})," from ",(0,o.jsx)(t.code,{children:"@concepta/nestjs-logger"})]}),"\n",(0,o.jsx)(t.h3,{children:"Injection"}),"\n",(0,o.jsxs)(t.p,{children:["You should be able to use the ",(0,o.jsx)(t.code,{children:"LoggerService"})," by injecting the class, or creating a new instance of Logger."]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"import { Logger, Injectable, Inject } from '@nestjs/common';\nimport { LoggerService } from '@concepta/nestjs-logger';\n\n@Injectable()\nclass MyService {\n  constructor(@Inject(LoggerService) private loggerService: LoggerService) {}\n\n  doSomething() {\n    this.loggerService.log('Doing something...');\n  }\n}\n"})}),"\n",(0,o.jsx)(t.h3,{children:"Manual Instantiation"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:"import { Logger, Injectable } from '@nestjs/common';\n\n@Injectable()\nclass MyService {\n  private readonly logger = new Logger(MyService.name);\n\n  doSomething() {\n    this.logger.log('Doing something...');\n  }\n}\n"})})]})},n=Object.assign({},(0,a.ah)(),e.components),s=n.wrapper;return s?(0,o.jsx)(s,l({},e,{children:(0,o.jsx)(t,{})})):t()}var d=(0,o.jsx)(m,{});function u(e){return(0,r.withSSG)((0,s.Z)({filename:"nestjs-logger.md",route:"/documentation/modules/util/nestjs-logger",meta:{},pageMap:[{name:"documentation",children:[{name:"getting-started",route:"/documentation/getting-started",frontMatter:{title:"Getting Started"}},{name:"meta.json",meta:{"getting-started":"Getting Started",modules:{title:"Modules"}}},{name:"modules",children:[{name:"authentication",children:[{name:"meta.json",meta:{"nestjs-auth-github":{title:"GitHub Login"},"nestjs-auth-local":{title:"Local Login"},"nestjs-auth-refresh":{title:"Refresh Token"},"nestjs-authentication":{title:"Authentication"}}},{name:"nestjs-auth-github",route:"/documentation/modules/authentication/nestjs-auth-github"},{name:"nestjs-auth-local",route:"/documentation/modules/authentication/nestjs-auth-local"},{name:"nestjs-auth-refresh",route:"/documentation/modules/authentication/nestjs-auth-refresh"},{name:"nestjs-authentication",route:"/documentation/modules/authentication/nestjs-authentication"}],route:"/documentation/modules/authentication"},{name:"authorization",children:[{name:"meta.json",meta:{"nestjs-access-control":{title:"Access Control"},"nestjs-auth-jwt":{title:"Access Token"}}},{name:"nestjs-access-control",route:"/documentation/modules/authorization/nestjs-access-control"},{name:"nestjs-auth-jwt",route:"/documentation/modules/authorization/nestjs-auth-jwt"}],route:"/documentation/modules/authorization"},{name:"controller",children:[{name:"meta.json",meta:{"nestjs-crud":{title:"CRUD"},"nestjs-swagger-ui":{title:"Swagger UI"}}},{name:"nestjs-crud",route:"/documentation/modules/controller/nestjs-crud"},{name:"nestjs-swagger-ui",route:"/documentation/modules/controller/nestjs-swagger-ui"}],route:"/documentation/modules/controller"},{name:"core",children:[{name:"meta.json",meta:{"nestjs-common":{title:"Common"},"nestjs-event":{title:"Events"},"nestjs-exception":{title:"Exceptions"},"nestjs-typeorm-ext":{title:"TypeORM Ext"}}},{name:"nestjs-common",route:"/documentation/modules/core/nestjs-common"},{name:"nestjs-event",route:"/documentation/modules/core/nestjs-event"},{name:"nestjs-exception",route:"/documentation/modules/core/nestjs-exception"},{name:"nestjs-typeorm-ext",route:"/documentation/modules/core/nestjs-typeorm-ext"}],route:"/documentation/modules/core"},{name:"meta.json",meta:{core:"Core",authentication:"Authentication",authorization:"Authorization",model:"Model",controller:"Controller",notification:"Notification",util:"Utilities"}},{name:"model",children:[{name:"meta.json",meta:{"nestjs-user":{title:"User"}}},{name:"nestjs-user",route:"/documentation/modules/model/nestjs-user"}],route:"/documentation/modules/model"},{name:"notification",children:[{name:"meta.json",meta:{"nestjs-email":{title:"Email"}}},{name:"nestjs-email",route:"/documentation/modules/notification/nestjs-email"}],route:"/documentation/modules/notification"},{name:"util",children:[{name:"meta.json",meta:{"nestjs-jwt":{title:"JWT"},"nestjs-logger":{title:"Logger"},"nestjs-password":{title:"Password"}}},{name:"nestjs-jwt",route:"/documentation/modules/util/nestjs-jwt"},{name:"nestjs-logger",route:"/documentation/modules/util/nestjs-logger"},{name:"nestjs-password",route:"/documentation/modules/util/nestjs-password"}],route:"/documentation/modules/util"}],route:"/documentation/modules"}],route:"/documentation"},{name:"index",route:"/",frontMatter:{title:"Rockets - Rapid Enterprise Development Toolkit"}},{name:"meta.json",meta:{index:{title:"Introduction",type:"nav",hidden:!0},documentation:{title:"Documentation",type:"nav"}}}]},i.Z))(l({},e,{children:d}))}}},function(e){e.O(0,[872,774,888,179],(function(){return t=8498,e(e.s=t);var t}));var t=e.O();_N_E=t}]);