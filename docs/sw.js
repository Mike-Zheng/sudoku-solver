if(!self.define){let e,i={};const n=(n,c)=>(n=new URL(n+".js",c).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,o)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let r={};const a=e=>n(e,s),f={module:{uri:s},exports:r,require:a};i[s]=Promise.all(c.map((e=>f[e]||a(e)))).then((e=>(o(...e),r)))}}define(["./workbox-b3e22772"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.3f577f81.js",revision:null},{url:"assets/index.b0afd144.css",revision:null},{url:"index.html",revision:"10b2803ac761981dc8bfde6b8c3c79f6"},{url:"registerSW.js",revision:"cb4b45619bb5110af6a792576cad6c28"},{url:"icons/android-chrome-192x192.png",revision:"1e9575f1e2bd71b138cea200ab0d09fe"},{url:"icons/android-chrome-maskable-192x192.png",revision:"1e9575f1e2bd71b138cea200ab0d09fe"},{url:"icons/android-chrome-maskable-512x512.png",revision:"1e015f2a54243879179f355e1a810906"},{url:"icons/apple-touch-icon-60x60.png",revision:"cbad095dc0371e1a3dad46c99c881670"},{url:"icons/apple-touch-icon-76x76.png",revision:"5f952ed3f1c343942330ddf716771bc9"},{url:"icons/apple-touch-icon-120x120.png",revision:"83e517699a87b16693e16c9cbd78b88c"},{url:"icons/apple-touch-icon-152x152.png",revision:"eb3f4b7f761553e407116293177db590"},{url:"icons/apple-touch-icon-180x180.png",revision:"e3eaa30cf03da2ca47fa12a45987acff"},{url:"icons/apple-touch-icon.png",revision:"e3eaa30cf03da2ca47fa12a45987acff"},{url:"icons/favicon-16x16.png",revision:"5ee8dffddd4569bd9b67af0f949bfbd2"},{url:"icons/favicon-32x32.png",revision:"f7d9af8467a9a6f9806606195f92e734"},{url:"icons/msapplication-icon-144x144.png",revision:"bb31656994f97e11baf8c8a8383e0ba7"},{url:"icons/mstile-150x150.png",revision:"c11c8f531e15e16525a57a9058244bd5"},{url:"manifest.webmanifest",revision:"3d8a9096e6e3f0c8761e0729cab4ce20"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
