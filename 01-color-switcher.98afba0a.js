const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let o;t.addEventListener("click",(function(){const e=document.querySelector("body");o=setInterval((()=>{e.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.disabled=!0})),e.addEventListener("click",(function(){clearInterval(o),t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.98afba0a.js.map