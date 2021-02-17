(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{86:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return u}));var r=n(3),o=n(7),a=(n(0),n(92)),i=(n(94),{id:"getting-started",title:"Getting Started",sidebar_label:"Getting Started",slug:"/"}),s={unversionedId:"getting-started",id:"getting-started",isDocsHomePage:!1,title:"Getting Started",description:"sbt DevOops",source:"@site/docs/getting-started.md",slug:"/",permalink:"/docs/",version:"current",sidebar_label:"Getting Started",sidebar:"docs",next:{title:"DevOopsGitHubReleasePlugin - Config and Run",permalink:"/docs/gh-release-plugin/config-and-run"}},l=[{value:"<img src='/img/sbt-devoops-logo-64x64.png' /> sbt DevOops",id:"sbt-devoops",children:[]},{value:"Get sbt-devoops",id:"get-sbt-devoops",children:[{value:"DevOopsGitHubReleasePlugin",id:"devoopsgithubreleaseplugin",children:[]}]}],c={toc:l};function u(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h3",{id:"sbt-devoops"},Object(a.b)("img",{src:"/img/sbt-devoops-logo-64x64.png"})," sbt DevOops"),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"https://github.com/Kevin-Lee/sbt-devoops/actions?workflow=Build+All"},Object(a.b)("img",{parentName:"a",src:"https://github.com/Kevin-Lee/sbt-devoops/workflows/Build%20All/badge.svg",alt:"Build Status"})),"\n",Object(a.b)("a",{parentName:"p",href:"https://github.com/Kevin-Lee/sbt-devoops/actions?workflow=Release"},Object(a.b)("img",{parentName:"a",src:"https://github.com/Kevin-Lee/sbt-devoops/workflows/Release/badge.svg",alt:"Release Status"})),"\n",Object(a.b)("a",{parentName:"p",href:"https://bintray.com/kevinlee/sbt-plugins/sbt-devoops/_latestVersion"}," ",Object(a.b)("img",{parentName:"a",src:"https://api.bintray.com/packages/kevinlee/sbt-plugins/sbt-devoops/images/download.svg",alt:"Download"})," "),"\n",Object(a.b)("a",{parentName:"p",href:"https://index.scala-lang.org/kevin-lee/sbt-devoops/sbt-devoops"},Object(a.b)("img",{parentName:"a",src:"https://index.scala-lang.org/kevin-lee/sbt-devoops/sbt-devoops/latest.svg",alt:"Latest version"}))),Object(a.b)("p",null,"SBT Plugin to help release artifacts and changelogs"),Object(a.b)("h2",{id:"get-sbt-devoops"},"Get sbt-devoops"),Object(a.b)("p",null,"In the ",Object(a.b)("inlineCode",{parentName:"p"},"project/plugins.sbt"),", add the following line,"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-scala"},'addSbtPlugin("io.kevinlee" % "sbt-devoops" % "2.0.0")\n')),Object(a.b)("h3",{id:"devoopsgithubreleaseplugin"},"DevOopsGitHubReleasePlugin"),Object(a.b)("p",null,"To use ",Object(a.b)("inlineCode",{parentName:"p"},"DevOopsGitHubReleasePlugin"),", add the following line to ",Object(a.b)("inlineCode",{parentName:"p"},"build.sbt"),"."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-scala"},"enablePlugins(DevOopsGitHubReleasePlugin)\n")),Object(a.b)("p",null,"For more about how to set up and use, please check out the next pages ",Object(a.b)("a",{parentName:"p",href:"gh-release-plugin/config-and-run"},"DevOopsGitHubReleasePlugin - Config and Run"),"."))}u.isMDXComponent=!0},92:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return g}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=o.a.createContext({}),u=function(e){var t=o.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=u(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(n),d=r,g=p["".concat(i,".").concat(d)]||p[d]||b[d]||a;return n?o.a.createElement(g,s(s({ref:t},c),{},{components:n})):o.a.createElement(g,s({ref:t},c))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},94:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return i}));var r=n(21),o=n(95);function a(){var e=Object(r.default)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,n=void 0===t?"/":t,a=e.url;return{withBaseUrl:function(e,t){return function(e,t,n,r){var a=void 0===r?{}:r,i=a.forcePrependBaseUrl,s=void 0!==i&&i,l=a.absolute,c=void 0!==l&&l;if(!n)return n;if(n.startsWith("#"))return n;if(Object(o.b)(n))return n;if(s)return t+n;var u=n.startsWith(t)?n:t+n.replace(/^\//,"");return c?e+u:u}(a,n,e,t)}}}function i(e,t){return void 0===t&&(t={}),(0,a().withBaseUrl)(e,t)}},95:function(e,t,n){"use strict";function r(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!r(e)}n.d(t,"b",(function(){return r})),n.d(t,"a",(function(){return o}))}}]);