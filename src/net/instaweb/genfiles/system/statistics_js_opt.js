(function(){var g=Object,aa=Function,h=document,l=Array,m=Error,ba=parseInt,q=String;function r(a,b){return a.display=b}function ca(a,b){return a.innerHTML=b}
var da="appendChild",s="shift",ea="exec",t="replace",fa="trim",u="createElement",ga="keyCode",ha="forEach",ia="handleEvent",ja="bind",ka="substr",w="toString",la="propertyIsEnumerable",x="split",ma="stack",y="message",na="hasOwnProperty",z="style",oa="console",B="apply",pa="fileName",C="push",D="show",E="slice",F="getElementById",qa="removed",G="indexOf",ra="addEventListener",sa="type",I="length",J="prototype",K="call",ta="addColumn",ua="splice",va="toLowerCase",wa=wa||{},L=this,xa=function(a){a=
a[x](".");for(var b=L,c;c=a[s]();)if(null!=b[c])b=b[c];else return null;return b},ya=function(){},za=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof l)return"array";if(a instanceof g)return b;var c=g[J][w][K](a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a[I]&&"undefined"!=typeof a[ua]&&"undefined"!=typeof a[la]&&!a[la]("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a[K]&&"undefined"!=typeof a[la]&&!a[la]("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a[K])return"object";return b},Aa=function(a){var b=za(a);return"array"==b||"object"==b&&"number"==typeof a[I]},M=function(a){return"string"==typeof a},Ba=function(a){return"function"==za(a)},Ca=function(a,b,c){return a[K][B](a[ja],arguments)},Da=function(a,b,c){if(!a)throw m();if(2<arguments[I]){var d=l[J][E][K](arguments,2);return function(){var c=l[J][E][K](arguments);l[J].unshift[B](c,d);return a[B](b,c)}}return function(){return a[B](b,arguments)}},N=
function(a,b,c){N=aa[J][ja]&&-1!=aa[J][ja][w]()[G]("native code")?Ca:Da;return N[B](null,arguments)},Ea=Date.now||function(){return+new Date},Fa=function(a,b){function c(){}c.prototype=b[J];a.K=b[J];a.prototype=new c;a.M=function(a,c,e){return b[J][c][B](a,l[J][E][K](arguments,2))}};aa[J].bind=aa[J][ja]||function(a,b){if(1<arguments[I]){var c=l[J][E][K](arguments,1);c.unshift(this,a);return N[B](null,c)}return N(this,a)};var Ga=function(a){if(m.captureStackTrace)m.captureStackTrace(this,Ga);else{var b=m()[ma];b&&(this.stack=b)}a&&(this.message=q(a))};Fa(Ga,m);Ga[J].name="CustomError";var Ha=function(a,b){for(var c=a[x]("%s"),d="",f=l[J][E][K](arguments,1);f[I]&&1<c[I];)d+=c[s]()+f[s]();return d+c.join("%s")},Pa=function(a){if(!Ia.test(a))return a;-1!=a[G]("&")&&(a=a[t](Ja,"&amp;"));-1!=a[G]("<")&&(a=a[t](Ka,"&lt;"));-1!=a[G](">")&&(a=a[t](La,"&gt;"));-1!=a[G]('"')&&(a=a[t](Ma,"&quot;"));-1!=a[G]("'")&&(a=a[t](Na,"&#39;"));-1!=a[G]("\x00")&&(a=a[t](Oa,"&#0;"));return a},Ja=/&/g,Ka=/</g,La=/>/g,Ma=/"/g,Na=/'/g,Oa=/\x00/g,Ia=/[\x00&<>"']/,Qa=function(a,b){return a<b?-1:a>b?1:0};var Ra=function(a,b){b.unshift(a);Ga[K](this,Ha[B](null,b));b[s]()};Fa(Ra,Ga);Ra[J].name="AssertionError";var O=function(a,b,c){if(!a){var d="Assertion failed";if(b)var d=d+(": "+b),f=l[J][E][K](arguments,2);throw new Ra(""+d,f||[]);}},Sa=function(a,b){throw new Ra("Failure"+(a?": "+a:""),l[J][E][K](arguments,1));};var Ta=function(a){Ta[" "](a);return a};Ta[" "]=ya;var Ua=l[J],Va=Ua[G]?function(a,b,c){O(null!=a[I]);return Ua[G][K](a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a[I]+c):c;if(M(a))return M(b)&&1==b[I]?a[G](b,c):-1;for(;c<a[I];c++)if(c in a&&a[c]===b)return c;return-1},Wa=Ua[ha]?function(a,b,c){O(null!=a[I]);Ua[ha][K](a,b,c)}:function(a,b,c){for(var d=a[I],f=M(a)?a[x](""):a,e=0;e<d;e++)e in f&&b[K](c,f[e],e,a)},Ya=function(a){var b;t:{b=Xa;for(var c=a[I],d=M(a)?a[x](""):a,f=0;f<c;f++)if(f in d&&b[K](void 0,d[f],f,a)){b=f;break t}b=-1}return 0>
b?null:M(a)?a.charAt(b):a[b]};var Za;t:{var $a=L.navigator;if($a){var ab=$a.userAgent;if(ab){Za=ab;break t}}Za=""}var P=function(a){return-1!=Za[G](a)};var bb=P("Opera")||P("OPR"),Q=P("Trident")||P("MSIE"),cb=P("Gecko")&&-1==Za[va]()[G]("webkit")&&!(P("Trident")||P("MSIE")),db=-1!=Za[va]()[G]("webkit"),eb=function(){var a=L.document;return a?a.documentMode:void 0},fb=function(){var a="",b;if(bb&&L.opera)return a=L.opera.version,Ba(a)?a():a;cb?b=/rv\:([^\);]+)(\)|;)/:Q?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:db&&(b=/WebKit\/(\S+)/);b&&(a=(a=b[ea](Za))?a[1]:"");return Q&&(b=eb(),b>parseFloat(a))?q(b):a}(),gb={},R=function(a){var b;if(!(b=gb[a])){b=0;
for(var c=q(fb)[t](/^[\s\xa0]+|[\s\xa0]+$/g,"")[x]("."),d=q(a)[t](/^[\s\xa0]+|[\s\xa0]+$/g,"")[x]("."),f=Math.max(c[I],d[I]),e=0;0==b&&e<f;e++){var k=c[e]||"",p=d[e]||"",A=RegExp("(\\d*)(\\D*)","g"),H=RegExp("(\\d*)(\\D*)","g");do{var n=A[ea](k)||["","",""],v=H[ea](p)||["","",""];if(0==n[0][I]&&0==v[0][I])break;b=Qa(0==n[1][I]?0:ba(n[1],10),0==v[1][I]?0:ba(v[1],10))||Qa(0==n[2][I],0==v[2][I])||Qa(n[2],v[2])}while(0==b)}b=gb[a]=0<=b}return b},hb=L.document,ib=hb&&Q?eb()||("CSS1Compat"==hb.compatMode?
ba(fb,10):5):void 0;var jb;(jb=!Q)||(jb=Q&&9<=ib);var kb=jb,mb=Q&&!R("9");!db||R("528");cb&&R("1.9b")||Q&&R("8")||bb&&R("9.5")||db&&R("528");cb&&!R("8")||Q&&R("9");var nb=function(){};var ob=function(a,b){this.type=a;this.a=this.b=b};ob[J].d=function(){};var pb=function(a,b){ob[K](this,a?a[sa]:"");this.e=this.a=this.b=null;if(a){this.type=a[sa];this.b=a.target||a.srcElement;this.a=b;var c=a.relatedTarget;if(c&&cb)try{Ta(c.nodeName)}catch(d){}this.e=a;a.defaultPrevented&&this.d()}};Fa(pb,ob);pb[J].d=function(){pb.K.d[K](this);var a=this.e;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,mb)try{if(a.ctrlKey||112<=a[ga]&&123>=a[ga])a.keyCode=-1}catch(b){}};var qb="closure_listenable_"+(1E6*Math.random()|0),rb=0;var sb=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b},tb=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b},ub="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),vb=function(a,b){for(var c,d,f=1;f<arguments[I];f++){d=arguments[f];for(c in d)a[c]=d[c];for(var e=0;e<ub[I];e++)c=ub[e],g[J][na][K](d,c)&&(a[c]=d[c])}};var wb=function(a,b,c,d,f){this.k=a;this.proxy=null;this.src=b;this.type=c;this.r=!!d;this.t=f;++rb;this.removed=this.s=!1},xb=function(a){a.removed=!0;a.k=null;a.proxy=null;a.src=null;a.t=null};var yb=function(a){this.src=a;this.a={};this.b=0},Ab=function(a,b,c,d,f){var e=b[w]();b=a.a[e];b||(b=a.a[e]=[],a.b++);var k=zb(b,c,d,f);-1<k?(a=b[k],a.s=!1):(a=new wb(c,a.src,e,!!d,f),a.s=!1,b[C](a));return a};yb[J].remove=function(a,b,c,d){a=a[w]();if(!(a in this.a))return!1;var f=this.a[a];b=zb(f,b,c,d);return-1<b?(xb(f[b]),O(null!=f[I]),Ua[ua][K](f,b,1),0==f[I]&&(delete this.a[a],this.b--),!0):!1};
var Bb=function(a,b){var c=b[sa];if(c in a.a){var d=a.a[c],f=Va(d,b),e;if(e=0<=f)O(null!=d[I]),Ua[ua][K](d,f,1);e&&(xb(b),0==a.a[c][I]&&(delete a.a[c],a.b--))}},zb=function(a,b,c,d){for(var f=0;f<a[I];++f){var e=a[f];if(!e[qa]&&e.k==b&&e.r==!!c&&e.t==d)return f}return-1};var Cb="closure_lm_"+(1E6*Math.random()|0),Db={},Eb=0,S=function(a,b,c,d,f){if("array"==za(b))for(var e=0;e<b[I];e++)S(a,b[e],c,d,f);else if(c=Fb(c),a&&a[qb])a.listen(b,c,d,f);else{if(!b)throw m("Invalid event type");var e=!!d,k=Gb(a);k||(a[Cb]=k=new yb(a));c=Ab(k,b,c,d,f);c.proxy||(d=Hb(),c.proxy=d,d.src=a,d.k=c,a[ra]?a[ra](b[w](),d,e):a.attachEvent(Ib(b[w]()),d),Eb++)}},Hb=function(){var a=Jb,b=kb?function(c){return a[K](b.src,b.k,c)}:function(c){c=a[K](b.src,b.k,c);if(!c)return c};return b},Kb=
function(a,b,c,d,f){if("array"==za(b))for(var e=0;e<b[I];e++)Kb(a,b[e],c,d,f);else(c=Fb(c),a&&a[qb])?a.n.remove(q(b),c,d,f):a&&(a=Gb(a))&&(b=a.a[b[w]()],a=-1,b&&(a=zb(b,c,!!d,f)),(c=-1<a?b[a]:null)&&Lb(c))},Lb=function(a){if("number"!=typeof a&&a&&!a[qa]){var b=a.src;if(b&&b[qb])Bb(b.n,a);else{var c=a[sa],d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.r):b.detachEvent&&b.detachEvent(Ib(c),d);Eb--;(c=Gb(b))?(Bb(c,a),0==c.b&&(c.src=null,b[Cb]=null)):xb(a)}}},Ib=function(a){return a in Db?
Db[a]:Db[a]="on"+a},Nb=function(a,b,c,d){var f=1;if(a=Gb(a))if(b=a.a[b[w]()])for(b=b.concat(),a=0;a<b[I];a++){var e=b[a];e&&e.r==c&&!e[qa]&&(f&=!1!==Mb(e,d))}return Boolean(f)},Mb=function(a,b){var c=a.k,d=a.t||a.src;a.s&&Lb(a);return c[K](d,b)},Jb=function(a,b){if(a[qa])return!0;if(!kb){var c=b||xa("window.event"),d=new pb(c,this),f=!0;if(!(0>c[ga]||void 0!=c.returnValue)){t:{var e=!1;if(0==c[ga])try{c.keyCode=-1;break t}catch(k){e=!0}if(e||void 0==c.returnValue)c.returnValue=!0}c=[];for(e=d.a;e;e=
e.parentNode)c[C](e);for(var e=a[sa],p=c[I]-1;0<=p;p--)d.a=c[p],f&=Nb(c[p],e,!0,d);for(p=0;p<c[I];p++)d.a=c[p],f&=Nb(c[p],e,!1,d)}return f}return Mb(a,new pb(b,this))},Gb=function(a){a=a[Cb];return a instanceof yb?a:null},Ob="__closure_events_fn_"+(1E9*Math.random()>>>0),Fb=function(a){O(a,"Listener can not be null.");if(Ba(a))return a;O(a[ia],"An object listener must have handleEvent method.");a[Ob]||(a[Ob]=function(b){return a[ia](b)});return a[Ob]};var Pb=function(){this.n=new yb(this);this.I=this};Fa(Pb,nb);Pb[J][qb]=!0;Pb[J].removeEventListener=function(a,b,c,d){Kb(this,a,b,c,d)};var T=function(a,b){Qb(a);var c=a.I,d=b,f=d[sa]||d;if(M(d))d=new ob(d,c);else if(d instanceof ob)d.b=d.b||c;else{var e=d,d=new ob(f,c);vb(d,e)}c=d.a=c;Rb(c,f,!0,d);Rb(c,f,!1,d)};Pb[J].listen=function(a,b,c,d){Qb(this);return Ab(this.n,q(a),b,c,d)};
var Rb=function(a,b,c,d){if(b=a.n.a[q(b)]){b=b.concat();for(var f=!0,e=0;e<b[I];++e){var k=b[e];if(k&&!k[qa]&&k.r==c){var p=k.k,A=k.t||k.src;k.s&&Bb(a.n,k);f=!1!==p[K](A,d)&&f}}}},Qb=function(a){O(a.n,"Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")};var Sb="StopIteration"in L?L.StopIteration:m("StopIteration"),Tb=function(){};Tb[J].a=function(){throw Sb;};Tb[J].g=function(){return this};var U=function(a,b){this.b={};this.a=[];this.e=this.d=0;var c=arguments[I];if(1<c){if(c%2)throw m("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a){a instanceof U?(c=a.o(),d=a.q()):(c=tb(a),d=sb(a));for(var f=0;f<c[I];f++)this.set(c[f],d[f])}};U[J].q=function(){Ub(this);for(var a=[],b=0;b<this.a[I];b++)a[C](this.b[this.a[b]]);return a};U[J].o=function(){Ub(this);return this.a.concat()};
U[J].remove=function(a){return g[J][na][K](this.b,a)?(delete this.b[a],this.d--,this.e++,this.a[I]>2*this.d&&Ub(this),!0):!1};var Ub=function(a){if(a.d!=a.a[I]){for(var b=0,c=0;b<a.a[I];){var d=a.a[b];g[J][na][K](a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.d!=a.a[I]){for(var f={},c=b=0;b<a.a[I];)d=a.a[b],g[J][na][K](f,d)||(a.a[c++]=d,f[d]=1),b++;a.a.length=c}};U[J].get=function(a,b){return g[J][na][K](this.b,a)?this.b[a]:b};
U[J].set=function(a,b){g[J][na][K](this.b,a)||(this.d++,this.a[C](a),this.e++);this.b[a]=b};U[J].forEach=function(a,b){for(var c=this.o(),d=0;d<c[I];d++){var f=c[d],e=this.get(f);a[K](b,e,f,this)}};U[J].clone=function(){return new U(this)};U[J].g=function(a){Ub(this);var b=0,c=this.a,d=this.b,f=this.e,e=this,k=new Tb;k.a=function(){for(;;){if(f!=e.e)throw m("The map has changed since the iterator was created");if(b>=c[I])throw Sb;var k=c[b++];return a?k:d[k]}};return k};var Vb=function(a){if("function"==typeof a.q)return a.q();if(M(a))return a[x]("");if(Aa(a)){for(var b=[],c=a[I],d=0;d<c;d++)b[C](a[d]);return b}return sb(a)},Wb=function(a,b){if("function"==typeof a[ha])a[ha](b,void 0);else if(Aa(a)||M(a))Wa(a,b,void 0);else{var c;if("function"==typeof a.o)c=a.o();else if("function"!=typeof a.q)if(Aa(a)||M(a)){c=[];for(var d=a[I],f=0;f<d;f++)c[C](f)}else c=tb(a);else c=void 0;for(var d=Vb(a),f=d[I],e=0;e<f;e++)b[K](void 0,d[e],c&&c[e],a)}};var Yb=function(a){var b;b||(b=Xb(a||arguments.callee.caller,[]));return b},Xb=function(a,b){var c=[];if(0<=Va(b,a))c[C]("[...circular reference...]");else if(a&&50>b[I]){c[C](Zb(a)+"(");for(var d=a.arguments,f=0;d&&f<d[I];f++){0<f&&c[C](", ");var e;e=d[f];switch(typeof e){case "object":e=e?"object":"null";break;case "string":break;case "number":e=q(e);break;case "boolean":e=e?"true":"false";break;case "function":e=(e=Zb(e))?e:"[fn]";break;default:e=typeof e}40<e[I]&&(e=e[ka](0,40)+"...");c[C](e)}b[C](a);
c[C](")\n");try{c[C](Xb(a.caller,b))}catch(k){c[C]("[exception trying to get caller]\n")}}else a?c[C]("[...long stack...]"):c[C]("[end]");return c.join("")},Zb=function(a){if($b[a])return $b[a];a=q(a);if(!$b[a]){var b=/function ([^\(]+)/[ea](a);$b[a]=b?b[1]:"[Anonymous]"}return $b[a]},$b={};var bc=function(a,b,c,d,f){"number"==typeof f||ac++;d||Ea();this.d=b;delete this.b;delete this.a};bc[J].b=null;bc[J].a=null;var ac=0;bc[J].getMessage=function(){return this.d};var V=function(){this.b=this.d=this.a=null},cc=function(a,b){this.name=a;this.value=b};cc[J].toString=function(){return this.name};var dc=new cc("SEVERE",1E3),ec=new cc("CONFIG",700),fc=new cc("FINE",500);V[J].getChildren=function(){this.b||(this.b={});return this.b};var gc=function(a){if(a.d)return a.d;if(a.a)return gc(a.a);Sa("Root logger has no level set.");return null};
V[J].log=function(a,b,c){if(a.value>=gc(this).value)for(Ba(b)&&(b=b()),a="log:"+this.e(0,b,c,V[J].log).getMessage(),L[oa]&&(L[oa].timeStamp?L[oa].timeStamp(a):L[oa].markTimeline&&L[oa].markTimeline(a)),L.msWriteProfilerMark&&L.msWriteProfilerMark(a),a=this;a;)a=a.a};
V[J].e=function(a,b,c,d){a=new bc(0,q(b));if(c){a.b=c;var f;d=d||V[J].e;try{var e;var k=xa("window.location.href");if(M(c))e={message:c,name:"Unknown error",lineNumber:"Not available",fileName:k,stack:"Not available"};else{var p,A;b=!1;try{p=c.lineNumber||c.L||"Not available"}catch(H){p="Not available",b=!0}try{A=c[pa]||c.filename||c.sourceURL||L.$googDebugFname||k}catch(n){A="Not available",b=!0}e=!b&&c.lineNumber&&c[pa]&&c[ma]&&c[y]&&c.name?c:{message:c[y]||"Not available",name:c.name||"UnknownError",
lineNumber:p,fileName:A,stack:c[ma]||"Not available"}}f="Message: "+Pa(e[y])+'\nUrl: <a href="view-source:'+e[pa]+'" target="_new">'+e[pa]+"</a>\nLine: "+e.lineNumber+"\n\nBrowser stack:\n"+Pa(e[ma]+"-> ")+"[end]\n\nJS stack traversal:\n"+Pa(Yb(d)+"-> ")}catch(v){f="Exception trying to expose exception! You win, we lose. "+v}a.a=f}return a};
var hc={},ic=null,jc=function(a){ic||(ic=new V,hc[""]=ic,ic.d=ec);var b;if(!(b=hc[a])){b=new V;var c=a.lastIndexOf("."),d=a[ka](c+1),c=jc(a[ka](0,c));c.getChildren()[d]=b;b.a=c;hc[a]=b}return b};var W=function(a,b){a&&a.log(fc,b,void 0)};var kc=function(a,b,c){if(Ba(a))c&&(a=N(a,c));else if(a&&"function"==typeof a[ia])a=N(a[ia],a);else throw m("Invalid listener argument");return 2147483647<b?-1:L.setTimeout(a,b||0)};var lc=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,mc=db,nc=function(a,b){if(mc){mc=!1;var c=L.location;if(c){var d=c.href;if(d&&(d=(d=nc(3,d))&&decodeURIComponent(d))&&d!=c.hostname)throw mc=!0,m();}}return b.match(lc)[a]||null};var oc=function(){};oc[J].a=null;var qc=function(a){var b;(b=a.a)||(b={},pc(a)&&(b[0]=!0,b[1]=!0),b=a.a=b);return b};var rc,sc=function(){};Fa(sc,oc);var tc=function(a){return(a=pc(a))?new ActiveXObject(a):new XMLHttpRequest},pc=function(a){if(!a.b&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b[I];c++){var d=b[c];try{return new ActiveXObject(d),a.b=d}catch(f){}}throw m("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.b};rc=new sc;var X=function(a){Pb[K](this);this.G=new U;this.p=a||null;this.a=!1;this.l=this.c=null;this.i=this.A=this.g="";this.b=this.u=this.e=this.v=!1;this.d=0;this.j=null;this.B="";this.m=this.H=!1};Fa(X,Pb);var uc=X[J],vc=jc("goog.net.XhrIo");uc.f=vc;var wc=/^https?$/i,xc=["POST","PUT"];
X[J].send=function(a,b,c,d){if(this.c)throw m("[goog.net.XhrIo] Object is active with another request="+this.g+"; newUri="+a);b=b?b.toUpperCase():"GET";this.g=a;this.i="";this.A=b;this.v=!1;this.a=!0;this.c=this.p?tc(this.p):tc(rc);this.l=this.p?qc(this.p):qc(rc);this.c.onreadystatechange=N(this.C,this);try{W(this.f,Y(this,"Opening Xhr")),this.u=!0,this.c.open(b,q(a),!0),this.u=!1}catch(f){W(this.f,Y(this,"Error opening Xhr: "+f[y]));yc(this,f);return}a=c||"";var e=this.G.clone();d&&Wb(d,function(a,
b){e.set(b,a)});d=Ya(e.o());c=L.FormData&&a instanceof L.FormData;!(0<=Va(xc,b))||d||c||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");e[ha](function(a,b){this.c.setRequestHeader(b,a)},this);this.B&&(this.c.responseType=this.B);"withCredentials"in this.c&&(this.c.withCredentials=this.H);try{zc(this),0<this.d&&(this.m=Ac(this.c),W(this.f,Y(this,"Will abort after "+this.d+"ms if incomplete, xhr2 "+this.m)),this.m?(this.c.timeout=this.d,this.c.ontimeout=N(this.D,this)):this.j=
kc(this.D,this.d,this)),W(this.f,Y(this,"Sending request")),this.e=!0,this.c.send(a),this.e=!1}catch(k){W(this.f,Y(this,"Send error: "+k[y])),yc(this,k)}};var Ac=function(a){return Q&&R(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout},Xa=function(a){return"content-type"==a[va]()};
X[J].D=function(){"undefined"!=typeof wa&&this.c&&(this.i="Timed out after "+this.d+"ms, aborting",W(this.f,Y(this,this.i)),T(this,"timeout"),this.c&&this.a&&(W(this.f,Y(this,"Aborting")),this.a=!1,this.b=!0,this.c.abort(),this.b=!1,T(this,"complete"),T(this,"abort"),Bc(this)))};var yc=function(a,b){a.a=!1;a.c&&(a.b=!0,a.c.abort(),a.b=!1);a.i=b;Cc(a);Bc(a)},Cc=function(a){a.v||(a.v=!0,T(a,"complete"),T(a,"error"))};X[J].C=function(){this.u||this.e||this.b?Dc(this):this.J()};X[J].J=function(){Dc(this)};
var Dc=function(a){if(a.a&&"undefined"!=typeof wa)if(a.l[1]&&4==Ec(a)&&2==Fc(a))W(a.f,Y(a,"Local request error detected and ignored"));else if(a.e&&4==Ec(a))kc(a.C,0,a);else if(T(a,"readystatechange"),4==Ec(a)){W(a.f,Y(a,"Request complete"));a.a=!1;try{if(Gc(a))T(a,"complete"),T(a,"success");else{var b;try{b=2<Ec(a)?a.c.statusText:""}catch(c){W(a.f,"Can not get status: "+c[y]),b=""}a.i=b+" ["+Fc(a)+"]";Cc(a)}}finally{Bc(a)}}},Bc=function(a){if(a.c){zc(a);var b=a.c,c=a.l[0]?ya:null;a.c=null;a.l=null;
T(a,"ready");try{b.onreadystatechange=c}catch(d){(a=a.f)&&a.log(dc,"Problem encountered resetting onreadystatechange: "+d[y],void 0)}}},zc=function(a){a.c&&a.m&&(a.c.ontimeout=null);"number"==typeof a.j&&(L.clearTimeout(a.j),a.j=null)},Gc=function(a){var b=Fc(a),c;t:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:c=!0;break t;default:c=!1}if(!c){if(b=0===b)a=nc(1,q(a.g)),!a&&self.location&&(a=self.location.protocol,a=a[ka](0,a[I]-1)),b=!wc.test(a?a[va]():"");c=b}return c},
Ec=function(a){return a.c?a.c.readyState:0},Fc=function(a){try{return 2<Ec(a)?a.c.status:-1}catch(b){return-1}},Y=function(a,b){return b+" ["+a.A+" "+a.g+" "+Fc(a)+"]"};var Hc=function(a){var b=window;if(b[ra])b[ra]("load",a,!1);else if(b.attachEvent)b.attachEvent("onload",a);else{var c=b.onload;b.onload=function(){a[K](this);c&&c[K](this)}}};google.load("visualization","1",{packages:["table","corechart"]});
var Z=function(a){this.e=a||new X;this.h=[];this.w=!1;this.d="";this.b=!0;this.j="raw";this.F=!1;a=h[u]("table");a.id="navBar";ca(a,'<tr><td><a id="raw_mode" href="javascript:void(0);">Raw</a> - </td><td><a id="cache_applied_mode" href="javascript:void(0);">Per application cache stats</a> - </td><td><a id="cache_type_mode" href="javascript:void(0);">Per type cache stats</a> - </td><td><a id="ipro_mode"href="javascript:void(0);">IPRO status</a> - </td><td><a id="image_rewriting_mode" href="javascript:void(0);">Image rewriting</a> - </td><td><a id="realtime_mode" href="javascript:void(0);">Realtime</a></td></tr>');var b=
h[u]("div");b.id="uiDiv";ca(b,"<table id='uiTable' border=1 style='border-collapse: collapse;border-color:silver;'><tr valign='center'><td>Auto refresh: <input type='checkbox' id='autoRefresh' "+(this.b?"checked":"")+"></td><td>&nbsp;&nbsp;&nbsp;&nbsp;Search: <input id='txtFilter' type='text'></td></tr></table>");h.body.insertBefore(b,h[F]("raw"));h.body.insertBefore(a,h[F]("uiDiv"))};
Z[J].show=function(a){r(h[F]("raw")[z],"none");r(h[F]("cache_applied")[z],"none");r(h[F]("cache_type")[z],"none");r(h[F]("ipro")[z],"none");r(h[F]("image_rewriting")[z],"none");r(h[F]("realtime")[z],"none");r(h[F](a)[z],"");r(h[F]("uiTable")[z],"raw"==a?"":"none");this.j=a};Z[J].m=function(){this.b=!this.b};Z[J].l=function(a){this.d=a.value;this.update()};
Z[J].update=function(){var a=this.h[this.h[I]-1][E](0);if(this.d)for(var b=a[I]-1;0<=b;--b)a[b]&&-1!=a[b][va]()[G](this.d[va]())||a[ua](b,1);b=h[F]("raw");ca(b,"");var c=h[u]("table");b[da](c);for(b=0;b<a[I];++b){var d=a[b][x](":");if(d[0]&&d[1]){var f=d[0][fa](),d=d[1][fa](),e=h[u]("tr");c[da](e);var k=h[u]("td");r(k[z],"text-align: left;");var p=h[u]("td");r(p[z],"text-align: left;");e[da](k);e[da](p);k.innerText=f;p.innerText=d}}a=[["pcache-cohorts-dom_","Property cache dom cohorts","PieChart",
"cache_applied"],["pcache-cohorts-beacon_","Property cache beacon cohorts","PieChart","cache_applied"],["rewrite_cached_output_","Rewrite cached output","PieChart","cache_applied"],["rewrite_","Rewrite","PieChart","cache_applied"],["url_input_","URL Input","PieChart","cache_applied"],["cache_","Cache","PieChart","cache_type"],["file_cache_","File Cache","PieChart","cache_type"],["memcached_","Memcached","PieChart","cache_type"],["lru_cache_","LRU","PieChart","cache_type"],["shm_cache_","Shared Memory",
"PieChart","cache_type"],["ipro_","In place resource optimization","PieChart","ipro"],["image_rewrite_","Image rewrite","PieChart","image_rewriting"],["image_rewrites_dropped_","Image rewrites dropped","PieChart","image_rewriting"],["http_","Http","LineChart","realtime",!0],["file_cache_","File Cache RT","LineChart","realtime",!0],["lru_cache_","LRU Cache RT","LineChart","realtime",!0],["serf_fetch_","Serf stats RT","LineChart","realtime",!0],["rewrite_","Rewrite stats RT","LineChart","realtime",
!0]];for(c=0;c<a[I];++c)this.a(a[c][0],a[c][1],a[c][2],h[F](a[c][3]),a[c][4]);this[D](this.j)};var Ic=function(a){var b=[],c=a[G]("<pre>"),d=a[G]("</pre>",c);if(0<=c&&0<=d)b=a.substring(c+5,d-1)[x]("\n"),b.a=new Date;else b[C]("<pre>Failed to write statistics to this page.</pre>\n");return b};
Z[J].g=function(){if(!this.F||this.b&&!this.w)this.w=!0,S(this.e,"complete",N(function(a){if(Gc(this)){var b;try{b=this.c?this.c.responseText:""}catch(c){W(this.f,"Can not get responseText: "+c[y]),b=""}a.h[C](Ic(b));17280<a.h[I]&&a.h[s]();a.update()}else console.log(M(this.i)?this.i:q(this.i)),ca(h[F]("pre")[0],"<pre>Sorry, failed to update the statistics. Please wait and try again later.</pre>\n");a.w=!1;a.F=!0},this.e,this)),this.e.send("/pagespeed_admin/statistics")};
Z[J].a=function(a,b,c,d,f){this.a.a=this.a.a?this.a.a:{};if(this.a.a[b])c=this.a.a[b];else{var e=h[u]("div");e.className="chart";d[da](e);c=new google.visualization[c](e);this.a.a[b]=c}d=[];e=new google.visualization.DataTable;if(f)for(e[ta]("datetime","Time"),f=!0,H=0;H<this.h[I];++H){var k=this.h[H],p=[];p[C](k.a);for(var A=0;A<k[I];++A)n=k[A][x](":"),n[0]&&n[1]&&(v=n[0][fa](),lb=Number(n[1][fa]()),0!=n[0][G](a)||"0"==n[1]||0<=v[G]("cache_flush_timestamp_ms")||0<=v[G]("cache_flush_count")||0<=v[G]("cache_time_us")||
(p[C](lb),f&&(n=v.substring(a[I]),n=n[t](/_/ig," "),e[ta]("number",n))));f=!1;d[C](p)}else{for(var k=this.h[this.h[I]-1][E](0),H=0;H<k[I];++H){var n=k[H][x](":");if(n[0]&&n[1]){var v=n[0][fa](),lb=n[1][fa]();0!=n[0][G](a)||"0"==n[1]||0<=v[G]("cache_flush_timestamp_ms")||0<=v[G]("cache_flush_count")||0<=v[G]("cache_time_us")||(n=v.substring(a[I]),n=n[t](/_/ig," "),d[C]([n,Number(lb)]))}}e[ta]("string","Name");e[ta]("number","Value")}a={width:1E3,height:300,chartArea:{left:100,top:50,width:700},title:b};
e.addRows(d);c.draw(e,a)};
var Jc=function(){Hc(function(){var a=new Z,b=h[F]("txtFilter");S(b,"keyup",N(a.l,a,b));S(h[F]("autoRefresh"),"change",N(a.m,a));S(h[F]("raw_mode"),"click",N(a[D],a,"raw"));S(h[F]("cache_applied_mode"),"click",N(a[D],a,"cache_applied"));S(h[F]("cache_type_mode"),"click",N(a[D],a,"cache_type"));S(h[F]("ipro_mode"),"click",N(a[D],a,"ipro"));S(h[F]("image_rewriting_mode"),"click",N(a[D],a,"image_rewriting"));S(h[F]("realtime_mode"),"click",N(a[D],a,"realtime"));setInterval(a.g[ja](a),5E3);a.g()})},Kc=
["pagespeed","Statistics","Start"],$=L;Kc[0]in $||!$.execScript||$.execScript("var "+Kc[0]);for(var Lc;Kc[I]&&(Lc=Kc[s]());)Kc[I]||void 0===Jc?$[Lc]?$=$[Lc]:$=$[Lc]={}:$[Lc]=Jc;})();