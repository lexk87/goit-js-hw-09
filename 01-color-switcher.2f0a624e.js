!function(){var t={bodyEl:document.querySelector("body"),startBtnEl:document.querySelector("[data-start]"),stopBtnEl:document.querySelector("[data-stop]")},e=t.bodyEl,n=t.startBtnEl,o=t.stopBtnEl,r=null;n.addEventListener("click",(function(){r=setInterval((function(){e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),n.setAttribute("disabled","disabled")})),o.addEventListener("click",(function(){n.removeAttribute("disabled"),clearInterval(r)}))}();
//# sourceMappingURL=01-color-switcher.2f0a624e.js.map