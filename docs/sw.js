if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const c=e=>i(e,t),f={module:{uri:t},exports:o,require:c};s[t]=Promise.all(n.map((e=>f[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-b3e22772"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.3f577f81.js",revision:null},{url:"assets/index.b0afd144.css",revision:null},{url:"index.html",revision:"5bfe08388bba35dcdff1896abb256ca9"},{url:"registerSW.js",revision:"cb4b45619bb5110af6a792576cad6c28"},{url:"manifest.webmanifest",revision:"bbf8cedca71c6c05bcecfb1f5f720864"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
