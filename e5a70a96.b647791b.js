(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{87:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return l})),t.d(n,"toc",(function(){return c})),t.d(n,"default",(function(){return u}));var a=t(3),r=t(7),o=(t(0),t(92)),i={id:"how-to-use",title:"DevOopsJavaPlugin - How to Use",sidebar_label:"How to Use"},l={unversionedId:"java-plugin/how-to-use",id:"version-1.0.3/java-plugin/how-to-use",isDocsHomePage:!1,title:"DevOopsJavaPlugin - How to Use",description:"DevOopsJavaPlugin",source:"@site/versioned_docs/version-1.0.3/java-plugin/how-to-use.md",slug:"/java-plugin/how-to-use",permalink:"/docs/1.0.3/java-plugin/how-to-use",version:"1.0.3",sidebar_label:"How to Use",sidebar:"version-1.0.3/docs",previous:{title:"DevOopsScalaPlugin - How to Use",permalink:"/docs/1.0.3/scala-plugin/how-to-use"}},c=[{value:"DevOopsJavaPlugin",id:"devoopsjavaplugin",children:[]}],s={toc:c};function u(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"devoopsjavaplugin"},"DevOopsJavaPlugin"),Object(o.b)("p",null,"To use sbt-devoops for a Java project, add the following line to ",Object(o.b)("inlineCode",{parentName:"p"},"build.sbt")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-sbt"},"enablePlugins(DevOopsJavaPlugin)\n")),Object(o.b)("p",null,"It has"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"javaVersion")," setting"),Object(o.b)("li",{parentName:"ul"},"set ",Object(o.b)("inlineCode",{parentName:"li"},"crossPaths")," and ",Object(o.b)("inlineCode",{parentName:"li"},"autoScalaLibrary")," to false"),Object(o.b)("li",{parentName:"ul"},"default ",Object(o.b)("inlineCode",{parentName:"li"},"javacOptions"),": ",Object(o.b)("inlineCode",{parentName:"li"},"-source")," and ",Object(o.b)("inlineCode",{parentName:"li"},"-target")," set to the ",Object(o.b)("inlineCode",{parentName:"li"},"javaVersion")," above, ",Object(o.b)("inlineCode",{parentName:"li"},"-Xlint:unchecked"),", and set ",Object(o.b)("inlineCode",{parentName:"li"},"-encoding")," to ",Object(o.b)("inlineCode",{parentName:"li"},"UTF-8")," ")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-scala"},'  override lazy val projectSettings: Seq[Setting[_]] = Seq(\n    javaVersion := "1.8", // 1.8 is default if not specified otherwise.\n    crossPaths := false,\n    autoScalaLibrary := false,\n    javacOptions ++= Seq(\n      "-source", javaVersion.value,\n      "-target", javaVersion.value,\n      "-Xlint:unchecked",\n      "-encoding", "UTF-8"\n    )\n  )\n')))}u.isMDXComponent=!0},92:function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return v}));var a=t(0),r=t.n(a);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=r.a.createContext({}),u=function(e){var n=r.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},p=function(e){var n=u(e.components);return r.a.createElement(s.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},d=r.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),p=u(t),d=a,v=p["".concat(i,".").concat(d)]||p[d]||b[d]||o;return t?r.a.createElement(v,l(l({ref:n},s),{},{components:t})):r.a.createElement(v,l({ref:n},s))}));function v(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=d;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=t[s];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"}}]);