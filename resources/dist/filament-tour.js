var z={};function O(e={}){z={animate:!0,allowClose:!0,overlayOpacity:.7,smoothScroll:!1,disableActiveInteraction:!1,showProgress:!1,stagePadding:10,stageRadius:5,popoverOffset:10,showButtons:["next","previous","close"],disableButtons:[],overlayColor:"#000",...e}}function d(e){return e?z[e]:z}function D(e,o,n,i){return(e/=i/2)<1?n/2*e*e+o:-n/2*(--e*(e-2)-1)+o}function X(e){let o='a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';return e.flatMap(n=>{let i=n.matches(o),t=Array.from(n.querySelectorAll(o));return[...i?[n]:[],...t]}).filter(n=>getComputedStyle(n).pointerEvents!=="none"&&le(n))}function V(e){if(!e||se(e))return;let o=d("smoothScroll");e.scrollIntoView({behavior:!o||re(e)?"auto":"smooth",inline:"center",block:"center"})}function re(e){if(!e||!e.parentElement)return;let o=e.parentElement;return o.scrollHeight>o.clientHeight}function se(e){let o=e.getBoundingClientRect();return o.top>=0&&o.left>=0&&o.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&o.right<=(window.innerWidth||document.documentElement.clientWidth)}function le(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}var R={};function C(e,o){R[e]=o}function c(e){return e?R[e]:R}function q(){R={}}var W={};function I(e,o){W[e]=o}function N(e){var o;(o=W[e])==null||o.call(W)}function ae(){W={}}function de(e,o,n,i){let t=c("__activeStagePosition"),r=t||n.getBoundingClientRect(),a=i.getBoundingClientRect(),m=D(e,r.x,a.x-r.x,o),s=D(e,r.y,a.y-r.y,o),h=D(e,r.width,a.width-r.width,o),l=D(e,r.height,a.height-r.height,o);t={x:m,y:s,width:h,height:l},G(t),C("__activeStagePosition",t)}function Z(e){if(!e)return;let o=e.getBoundingClientRect(),n={x:o.x,y:o.y,width:o.width,height:o.height};C("__activeStagePosition",n),G(n)}function ce(){let e=c("__activeStagePosition"),o=c("__overlaySvg");if(!e)return;if(!o){console.warn("No stage svg found.");return}let n=window.innerWidth,i=window.innerHeight;o.setAttribute("viewBox",`0 0 ${n} ${i}`)}function pe(e){let o=ue(e);document.body.appendChild(o),ee(o,n=>{n.target.tagName==="path"&&N("overlayClick")}),C("__overlaySvg",o)}function G(e){let o=c("__overlaySvg");if(!o){pe(e);return}let n=o.firstElementChild;if(n?.tagName!=="path")throw new Error("no path element found in stage svg");n.setAttribute("d",Q(e))}function ue(e){let o=window.innerWidth,n=window.innerHeight,i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.classList.add("driver-overlay","driver-overlay-animated"),i.setAttribute("viewBox",`0 0 ${o} ${n}`),i.setAttribute("xmlSpace","preserve"),i.setAttribute("xmlnsXlink","http://www.w3.org/1999/xlink"),i.setAttribute("version","1.1"),i.setAttribute("preserveAspectRatio","xMinYMin slice"),i.style.fillRule="evenodd",i.style.clipRule="evenodd",i.style.strokeLinejoin="round",i.style.strokeMiterlimit="2",i.style.zIndex="10000",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.height="100%";let t=document.createElementNS("http://www.w3.org/2000/svg","path");return t.setAttribute("d",Q(e)),t.style.fill=d("overlayColor")||"rgb(0,0,0)",t.style.opacity=`${d("overlayOpacity")}`,t.style.pointerEvents="auto",t.style.cursor="auto",i.appendChild(t),i}function Q(e){let o=window.innerWidth,n=window.innerHeight,i=d("stagePadding")||0,t=d("stageRadius")||0,r=e.width+i*2,a=e.height+i*2,m=Math.min(t,r/2,a/2),s=Math.floor(Math.max(m,0)),h=e.x-i+s,l=e.y-i,v=r-s*2,g=a-s*2;return`M${o},0L0,0L0,${n}L${o},${n}L${o},0Z
    M${h},${l} h${v} a${s},${s} 0 0 1 ${s},${s} v${g} a${s},${s} 0 0 1 -${s},${s} h-${v} a${s},${s} 0 0 1 -${s},-${s} v-${g} a${s},${s} 0 0 1 ${s},-${s} z`}function ve(){let e=c("__overlaySvg");e&&e.remove()}function fe(){let e=document.getElementById("driver-dummy-element");if(e)return e;let o=document.createElement("div");return o.id="driver-dummy-element",o.style.width="0",o.style.height="0",o.style.pointerEvents="none",o.style.opacity="0",o.style.position="fixed",o.style.top="50%",o.style.left="50%",document.body.appendChild(o),o}function F(e){let{element:o}=e,n=typeof o=="string"?document.querySelector(o):o;n||(n=fe()),he(n,e)}function me(){let e=c("__activeElement"),o=c("__activeStep");e&&(Z(e),ce(),oe(e,o))}function he(e,o){let n=Date.now(),i=c("__activeStep"),t=c("__activeElement")||e,r=!t||t===e,a=e.id==="driver-dummy-element",m=t.id==="driver-dummy-element",s=d("animate"),h=o.onHighlightStarted||d("onHighlightStarted"),l=o?.onHighlighted||d("onHighlighted"),v=i?.onDeselected||d("onDeselected"),g=d(),w=c();!r&&v&&v(m?void 0:t,i,{config:g,state:w}),h&&h(a?void 0:e,o,{config:g,state:w});let p=!r&&s,f=!1;xe(),C("previousStep",i),C("previousElement",t),C("activeStep",o),C("activeElement",e);let u=()=>{if(c("__transitionCallback")!==u)return;let y=Date.now()-n,x=400-y<=400/2;o.popover&&x&&!f&&p&&(J(e,o),f=!0),d("animate")&&y<400?de(y,400,t,e):(Z(e),l&&l(a?void 0:e,o,{config:d(),state:c()}),C("__transitionCallback",void 0),C("__previousStep",i),C("__previousElement",t),C("__activeStep",o),C("__activeElement",e)),window.requestAnimationFrame(u)};C("__transitionCallback",u),window.requestAnimationFrame(u),V(e),!p&&o.popover&&J(e,o),t.classList.remove("driver-active-element","driver-no-interaction"),t.removeAttribute("aria-haspopup"),t.removeAttribute("aria-expanded"),t.removeAttribute("aria-controls"),d("disableActiveInteraction")&&e.classList.add("driver-no-interaction"),e.classList.add("driver-active-element"),e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","true"),e.setAttribute("aria-controls","driver-popover-content")}function ge(){var e;(e=document.getElementById("driver-dummy-element"))==null||e.remove(),document.querySelectorAll(".driver-active-element").forEach(o=>{o.classList.remove("driver-active-element","driver-no-interaction"),o.removeAttribute("aria-haspopup"),o.removeAttribute("aria-expanded"),o.removeAttribute("aria-controls")})}function P(){let e=c("__resizeTimeout");e&&window.cancelAnimationFrame(e),C("__resizeTimeout",window.requestAnimationFrame(me))}function we(e){var o;if(!c("isInitialized")||!(e.key==="Tab"||e.keyCode===9))return;let n=c("__activeElement"),i=(o=c("popover"))==null?void 0:o.wrapper,t=X([...i?[i]:[],...n?[n]:[]]),r=t[0],a=t[t.length-1];if(e.preventDefault(),e.shiftKey){let m=t[t.indexOf(document.activeElement)-1]||a;m?.focus()}else{let m=t[t.indexOf(document.activeElement)+1]||r;m?.focus()}}function U(e){(d("allowKeyboardControl")??!0)&&(e.key==="Escape"?N("escapePress"):e.key==="ArrowRight"?N("arrowRightPress"):e.key==="ArrowLeft"&&N("arrowLeftPress"))}function ee(e,o,n){let i=(t,r)=>{let a=t.target;e.contains(a)&&((!n||n(a))&&(t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()),r?.(t))};document.addEventListener("pointerdown",i,!0),document.addEventListener("mousedown",i,!0),document.addEventListener("pointerup",i,!0),document.addEventListener("mouseup",i,!0),document.addEventListener("click",t=>{i(t,o)},!0)}function ye(){window.addEventListener("keyup",U,!1),window.addEventListener("keydown",we,!1),window.addEventListener("resize",P),window.addEventListener("scroll",P)}function be(){window.removeEventListener("keyup",U),window.removeEventListener("resize",P),window.removeEventListener("scroll",P)}function xe(){let e=c("popover");e&&(e.wrapper.style.display="none")}function J(e,o){var n,i;let t=c("popover");t&&document.body.removeChild(t.wrapper),t=Se(),document.body.appendChild(t.wrapper);let{title:r,description:a,showButtons:m,disableButtons:s,showProgress:h,nextBtnText:l=d("nextBtnText")||"Next &rarr;",prevBtnText:v=d("prevBtnText")||"&larr; Previous",progressText:g=d("progressText")||"{current} of {total}"}=o.popover||{};t.nextButton.innerHTML=l,t.previousButton.innerHTML=v,t.progress.innerHTML=g,r?(t.title.innerText=r,t.title.style.display="block"):t.title.style.display="none",a?(t.description.innerHTML=a,t.description.style.display="block"):t.description.style.display="none";let w=m||d("showButtons"),p=h||d("showProgress")||!1,f=w?.includes("next")||w?.includes("previous")||p;t.closeButton.style.display=w.includes("close")?"block":"none",f?(t.footer.style.display="flex",t.progress.style.display=p?"block":"none",t.nextButton.style.display=w.includes("next")?"block":"none",t.previousButton.style.display=w.includes("previous")?"block":"none"):t.footer.style.display="none";let u=s||d("disableButtons")||[];u!=null&&u.includes("next")&&(t.nextButton.disabled=!0,t.nextButton.classList.add("driver-popover-btn-disabled")),u!=null&&u.includes("previous")&&(t.previousButton.disabled=!0,t.previousButton.classList.add("driver-popover-btn-disabled")),u!=null&&u.includes("close")&&(t.closeButton.disabled=!0,t.closeButton.classList.add("driver-popover-btn-disabled"));let y=t.wrapper;y.style.display="block",y.style.left="",y.style.top="",y.style.bottom="",y.style.right="",y.id="driver-popover-content",y.setAttribute("role","dialog"),y.setAttribute("aria-labelledby","driver-popover-title"),y.setAttribute("aria-describedby","driver-popover-description");let x=t.arrow;x.className="driver-popover-arrow";let k=((n=o.popover)==null?void 0:n.popoverClass)||d("popoverClass")||"";y.className=`driver-popover ${k}`.trim(),ee(t.wrapper,E=>{var B,$,T;let _=E.target,A=((B=o.popover)==null?void 0:B.onNextClick)||d("onNextClick"),H=(($=o.popover)==null?void 0:$.onPrevClick)||d("onPrevClick"),M=((T=o.popover)==null?void 0:T.onCloseClick)||d("onCloseClick");if(_.classList.contains("driver-popover-next-btn"))return A?A(e,o,{config:d(),state:c()}):N("nextClick");if(_.classList.contains("driver-popover-prev-btn"))return H?H(e,o,{config:d(),state:c()}):N("prevClick");if(_.classList.contains("driver-popover-close-btn"))return M?M(e,o,{config:d(),state:c()}):N("closeClick")},E=>!(t!=null&&t.description.contains(E))&&!(t!=null&&t.title.contains(E))&&E.className.includes("driver-popover")),C("popover",t);let b=((i=o.popover)==null?void 0:i.onPopoverRender)||d("onPopoverRender");b&&b(t,{config:d(),state:c()}),oe(e,o),V(y);let S=e.classList.contains("driver-dummy-element"),L=X([y,...S?[]:[e]]);L.length>0&&L[0].focus()}function te(){let e=c("popover");if(!(e!=null&&e.wrapper))return;let o=e.wrapper.getBoundingClientRect(),n=d("stagePadding")||0,i=d("popoverOffset")||0;return{width:o.width+n+i,height:o.height+n+i,realWidth:o.width,realHeight:o.height}}function Y(e,o){let{elementDimensions:n,popoverDimensions:i,popoverPadding:t,popoverArrowDimensions:r}=o;return e==="start"?Math.max(Math.min(n.top-t,window.innerHeight-i.realHeight-r.width),r.width):e==="end"?Math.max(Math.min(n.top-i?.realHeight+n.height+t,window.innerHeight-i?.realHeight-r.width),r.width):e==="center"?Math.max(Math.min(n.top+n.height/2-i?.realHeight/2,window.innerHeight-i?.realHeight-r.width),r.width):0}function K(e,o){let{elementDimensions:n,popoverDimensions:i,popoverPadding:t,popoverArrowDimensions:r}=o;return e==="start"?Math.max(Math.min(n.left-t,window.innerWidth-i.realWidth-r.width),r.width):e==="end"?Math.max(Math.min(n.left-i?.realWidth+n.width+t,window.innerWidth-i?.realWidth-r.width),r.width):e==="center"?Math.max(Math.min(n.left+n.width/2-i?.realWidth/2,window.innerWidth-i?.realWidth-r.width),r.width):0}function oe(e,o){let n=c("popover");if(!n)return;let{align:i="start",side:t="left"}=o?.popover||{},r=i,a=e.id==="driver-dummy-element"?"over":t,m=d("stagePadding")||0,s=te(),h=n.arrow.getBoundingClientRect(),l=e.getBoundingClientRect(),v=l.top-s.height,g=v>=0,w=window.innerHeight-(l.bottom+s.height),p=w>=0,f=l.left-s.width,u=f>=0,y=window.innerWidth-(l.right+s.width),x=y>=0,k=!g&&!p&&!u&&!x,b=a;if(a==="top"&&g?x=u=p=!1:a==="bottom"&&p?x=u=g=!1:a==="left"&&u?x=g=p=!1:a==="right"&&x&&(u=g=p=!1),a==="over"){let S=window.innerWidth/2-s.realWidth/2,L=window.innerHeight/2-s.realHeight/2;n.wrapper.style.left=`${S}px`,n.wrapper.style.right="auto",n.wrapper.style.top=`${L}px`,n.wrapper.style.bottom="auto"}else if(k){let S=window.innerWidth/2-s?.realWidth/2,L=10;n.wrapper.style.left=`${S}px`,n.wrapper.style.right="auto",n.wrapper.style.bottom=`${L}px`,n.wrapper.style.top="auto"}else if(u){let S=Math.min(f,window.innerWidth-s?.realWidth-h.width),L=Y(r,{elementDimensions:l,popoverDimensions:s,popoverPadding:m,popoverArrowDimensions:h});n.wrapper.style.left=`${S}px`,n.wrapper.style.top=`${L}px`,n.wrapper.style.bottom="auto",n.wrapper.style.right="auto",b="left"}else if(x){let S=Math.min(y,window.innerWidth-s?.realWidth-h.width),L=Y(r,{elementDimensions:l,popoverDimensions:s,popoverPadding:m,popoverArrowDimensions:h});n.wrapper.style.right=`${S}px`,n.wrapper.style.top=`${L}px`,n.wrapper.style.bottom="auto",n.wrapper.style.left="auto",b="right"}else if(g){let S=Math.min(v,window.innerHeight-s.realHeight-h.width),L=K(r,{elementDimensions:l,popoverDimensions:s,popoverPadding:m,popoverArrowDimensions:h});n.wrapper.style.top=`${S}px`,n.wrapper.style.left=`${L}px`,n.wrapper.style.bottom="auto",n.wrapper.style.right="auto",b="top"}else if(p){let S=Math.min(w,window.innerHeight-s?.realHeight-h.width),L=K(r,{elementDimensions:l,popoverDimensions:s,popoverPadding:m,popoverArrowDimensions:h});n.wrapper.style.left=`${L}px`,n.wrapper.style.bottom=`${S}px`,n.wrapper.style.top="auto",n.wrapper.style.right="auto",b="bottom"}k?n.arrow.classList.add("driver-popover-arrow-none"):Ce(r,b,e)}function Ce(e,o,n){let i=c("popover");if(!i)return;let t=n.getBoundingClientRect(),r=te(),a=i.arrow,m=r.width,s=window.innerWidth,h=t.width,l=t.left,v=r.height,g=window.innerHeight,w=t.top,p=t.height;a.className="driver-popover-arrow";let f=o,u=e;o==="top"?(l+h<=0?(f="right",u="end"):l+h-m<=0&&(f="top",u="start"),l>=s?(f="left",u="end"):l+m>=s&&(f="top",u="end")):o==="bottom"?(l+h<=0?(f="right",u="start"):l+h-m<=0&&(f="bottom",u="start"),l>=s?(f="left",u="start"):l+m>=s&&(f="bottom",u="end")):o==="left"?(w+p<=0?(f="bottom",u="end"):w+p-v<=0&&(f="left",u="start"),w>=g?(f="top",u="end"):w+v>=g&&(f="left",u="end")):o==="right"&&(w+p<=0?(f="bottom",u="start"):w+p-v<=0&&(f="right",u="start"),w>=g?(f="top",u="start"):w+v>=g&&(f="right",u="end")),f?(a.classList.add(`driver-popover-arrow-side-${f}`),a.classList.add(`driver-popover-arrow-align-${u}`)):a.classList.add("driver-popover-arrow-none")}function Se(){let e=document.createElement("div");e.classList.add("driver-popover");let o=document.createElement("div");o.classList.add("driver-popover-arrow");let n=document.createElement("header");n.id="driver-popover-title",n.classList.add("driver-popover-title"),n.style.display="none",n.innerText="Popover Title";let i=document.createElement("div");i.id="driver-popover-description",i.classList.add("driver-popover-description"),i.style.display="none",i.innerText="Popover description is here";let t=document.createElement("button");t.type="button",t.classList.add("driver-popover-close-btn"),t.setAttribute("aria-label","Close"),t.innerHTML="&times;";let r=document.createElement("footer");r.classList.add("driver-popover-footer");let a=document.createElement("span");a.classList.add("driver-popover-progress-text"),a.innerText="";let m=document.createElement("span");m.classList.add("driver-popover-navigation-btns");let s=document.createElement("button");s.type="button",s.classList.add("driver-popover-prev-btn"),s.innerHTML="&larr; Previous";let h=document.createElement("button");return h.type="button",h.classList.add("driver-popover-next-btn"),h.innerHTML="Next &rarr;",m.appendChild(s),m.appendChild(h),r.appendChild(a),r.appendChild(m),e.appendChild(t),e.appendChild(o),e.appendChild(n),e.appendChild(i),e.appendChild(r),{wrapper:e,arrow:o,title:n,description:i,footer:r,previousButton:s,nextButton:h,closeButton:t,footerButtons:m,progress:a}}function Le(){var e;let o=c("popover");o&&((e=o.wrapper.parentElement)==null||e.removeChild(o.wrapper))}function j(e={}){O(e);function o(){d("allowClose")&&h()}function n(){let l=c("activeIndex"),v=d("steps")||[];if(typeof l>"u")return;let g=l+1;v[g]?s(g):h()}function i(){let l=c("activeIndex"),v=d("steps")||[];if(typeof l>"u")return;let g=l-1;v[g]?s(g):h()}function t(l){(d("steps")||[])[l]?s(l):h()}function r(){var l;if(c("__transitionCallback"))return;let v=c("activeIndex"),g=c("__activeStep"),w=c("__activeElement");if(typeof v>"u"||typeof g>"u"||typeof c("activeIndex")>"u")return;let p=((l=g.popover)==null?void 0:l.onPrevClick)||d("onPrevClick");if(p)return p(w,g,{config:d(),state:c()});i()}function a(){var l;if(c("__transitionCallback"))return;let v=c("activeIndex"),g=c("__activeStep"),w=c("__activeElement");if(typeof v>"u"||typeof g>"u")return;let p=((l=g.popover)==null?void 0:l.onNextClick)||d("onNextClick");if(p)return p(w,g,{config:d(),state:c()});n()}function m(){c("isInitialized")||(C("isInitialized",!0),document.body.classList.add("driver-active",d("animate")?"driver-fade":"driver-simple"),ye(),I("overlayClick",o),I("escapePress",o),I("arrowLeftPress",r),I("arrowRightPress",a))}function s(l=0){var v,g,w,p,f,u,y,x;let k=d("steps");if(!k){console.error("No steps to drive through"),h();return}if(!k[l]){h();return}C("__activeOnDestroyed",document.activeElement),C("activeIndex",l);let b=k[l],S=k[l+1],L=k[l-1],E=((v=b.popover)==null?void 0:v.doneBtnText)||d("doneBtnText")||"Done",B=d("allowClose"),$=typeof((g=b.popover)==null?void 0:g.showProgress)<"u"?(w=b.popover)==null?void 0:w.showProgress:d("showProgress"),T=(((p=b.popover)==null?void 0:p.progressText)||d("progressText")||"{{current}} of {{total}}").replace("{{current}}",`${l+1}`).replace("{{total}}",`${k.length}`),_=((f=b.popover)==null?void 0:f.showButtons)||d("showButtons"),A=["next","previous",...B?["close"]:[]].filter(ne=>!(_!=null&&_.length)||_.includes(ne)),H=((u=b.popover)==null?void 0:u.onNextClick)||d("onNextClick"),M=((y=b.popover)==null?void 0:y.onPrevClick)||d("onPrevClick"),ie=((x=b.popover)==null?void 0:x.onCloseClick)||d("onCloseClick");F({...b,popover:{showButtons:A,nextBtnText:S?void 0:E,disableButtons:[...L?[]:["previous"]],showProgress:$,progressText:T,onNextClick:H||(()=>{S?s(l+1):h()}),onPrevClick:M||(()=>{s(l-1)}),onCloseClick:ie||(()=>{h()}),...b?.popover||{}}})}function h(l=!0){let v=c("__activeElement"),g=c("__activeStep"),w=c("__activeOnDestroyed"),p=d("onDestroyStarted");if(l&&p){let y=!v||v?.id==="driver-dummy-element";p(y?void 0:v,g,{config:d(),state:c()});return}let f=g?.onDeselected||d("onDeselected"),u=d("onDestroyed");if(document.body.classList.remove("driver-active","driver-fade","driver-simple"),be(),Le(),ge(),ve(),ae(),q(),v&&g){let y=v.id==="driver-dummy-element";f&&f(y?void 0:v,g,{config:d(),state:c()}),u&&u(y?void 0:v,g,{config:d(),state:c()})}w&&w.focus()}return{isActive:()=>c("isInitialized")||!1,refresh:P,drive:(l=0)=>{m(),s(l)},setConfig:O,setSteps:l=>{q(),O({...d(),steps:l})},getConfig:d,getState:c,getActiveIndex:()=>c("activeIndex"),isFirstStep:()=>c("activeIndex")===0,isLastStep:()=>{let l=d("steps")||[],v=c("activeIndex");return v!==void 0&&v===l.length-1},getActiveStep:()=>c("activeStep"),getActiveElement:()=>c("activeElement"),getPreviousElement:()=>c("previousElement"),getPreviousStep:()=>c("previousStep"),moveNext:n,movePrevious:i,moveTo:t,hasNextStep:()=>{let l=d("steps")||[],v=c("activeIndex");return v!==void 0&&l[v+1]},hasPreviousStep:()=>{let l=d("steps")||[],v=c("activeIndex");return v!==void 0&&l[v-1]},highlight:l=>{m(),F({...l,popover:l.popover?{showButtons:[],showProgress:!1,progressText:"",...l.popover}:void 0})},destroy:()=>{h(!1)}}}document.addEventListener("livewire:initialized",function(){Livewire.on("driverjs::change-css-selector-status",function({enabled:e}){if(e){let s=function(p){p.key==="Escape"&&(t=!1,m=null,i.style.display="none")},h=function(p){if(!(p instanceof Element))return;let f=[];for(;p.nodeType===Node.ELEMENT_NODE;){let u=p.nodeName.toLowerCase();if(p.id){u+="#"+p.id,f.unshift(u);break}else{let y=p,x=1;for(;y=y.previousElementSibling;)y.nodeName.toLowerCase()===u&&x++;x!==1&&(u+=":nth-of-type("+x+")")}f.unshift(u),p=p.parentNode}return f.join(" > ")},l=function(p){o=p.clientX,n=p.clientY,v(p.clientX,p.clientY)},v=function(p,f){if(!t)return;let u=10;a||(i.style.left=p-u+"px",i.style.top=f-u+"px",i.style.width="20px",i.style.height="20px",i.style.borderRadius="50%")},g=function(p){if(p.stopPropagation(),!t)return;a=!0;let f=document.querySelector(h(p.target));if(f){let u=f.offsetParent?f.offsetLeft+f.offsetParent.offsetLeft:f.offsetLeft,y=f.offsetParent?f.offsetTop+f.offsetParent.offsetTop:f.offsetTop,x=f.offsetWidth,k=f.offsetHeight,b=6;m=f,i.style.left=u-b+"px",i.style.top=y-b+"px",i.style.width=x+b*2-1+"px",i.style.height=k+b*2-1+"px",i.style.borderRadius="5px"}},w=function(p){t&&(a=!1)},o=0,n=0,i=document.querySelector("#circle-cursor");document.onmousemove=l,document.onkeyup=s,document.onmouseover=g,document.onmouseleave=w;let t=!1,r=window.navigator.clipboard,a=!1,m=null;document.addEventListener("keydown",function(p){p.ctrlKey&&p.code==="Space"&&!t&&(r?(t=!0,v(o,n),i.style.display="block",new FilamentNotification().title("Filament Tour - CSS Selector").body("Activated !<br>Press Ctrl + C to copy the CSS Selector of the selected element !").success().send()):new FilamentNotification().title("Filament Tour - CSS Selector").body("Your browser does not support the Clipboard API !<br>Don't forget to be in <b>https://</b> protocol").danger().send()),p.ctrlKey&&p.code==="KeyC"&&t&&(navigator.clipboard.writeText(h(m)??"Nothing selected !"),t=!1,m=null,i.style.display="none",new FilamentNotification().title("Filament Tour - CSS Selector").body("CSS Selector copied to clipboard !").success().send())})}})});document.addEventListener("livewire:initialized",async function(){let e=[],o=[];Livewire.dispatch("driverjs::load-elements",{request:window.location}),Livewire.on("driverjs::loaded-elements",function(i){i.tours.forEach(t=>{e.push(t),localStorage.getItem("tours")||localStorage.setItem("tours","[]"),t.route===window.location.pathname&&(i.only_visible_once&&localStorage.getItem("tours").includes(t.id)?t.alwaysShow&&n(t):n(t))}),i.highlights.forEach(t=>{if(o.push(t),t.route===window.location.pathname&&document.querySelector(t.parent)){parent=document.querySelector(t.parent),parent.parentNode.style.position="relative";let r=document.createElement("div");r.innerHTML=t.button,r.firstChild.classList.add(t.position),parent.parentNode.insertBefore(r.firstChild,parent)}})}),Livewire.on("driverjs::open-highlight",function(i){let t=o.find(r=>r.id===i);t?j({overlayColor:localStorage.theme==="light"?t.colors.light:t.colors.dark,onPopoverRender:(r,{config:a,state:m})=>{r.title.innerHTML="",r.title.innerHTML=m.activeStep.popover.title,m.activeStep.popover.description||(r.title.firstChild.style.justifyContent="center");let s="dark:text-white fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 mb-4";r.footer.parentElement.classList.add(...s.split(" "))}}).highlight(t):console.error(`Highlight with id '${i}' not found`)}),Livewire.on("driverjs::open-tour",function(i){let t=e.find(r=>r.id===i);t?n(t):console.error(`Tour with id '${i}' not found`)});function n(i){if(i.steps.length>0){let t=j({allowClose:!0,disableActiveInteraction:!0,overlayColor:localStorage.theme==="light"?i.colors.light:i.colors.dark,onDeselected:(r,a,{config:m,state:s})=>{},onCloseClick:(r,a,{config:m,state:s})=>{s.activeStep&&!s.activeStep.uncloseable&&t.destroy(),localStorage.getItem("tours").includes(i.id)||localStorage.setItem("tours",JSON.stringify([...JSON.parse(localStorage.getItem("tours")),i.id]))},onDestroyStarted:(r,a,{config:m,state:s})=>{s.activeStep&&!s.activeStep.uncloseable&&t.destroy()},onDestroyed:(r,a,{config:m,state:s})=>{},onNextClick:(r,a,{config:m,state:s})=>{t.isLastStep()&&(localStorage.getItem("tours").includes(i.id)||localStorage.setItem("tours",JSON.stringify([...JSON.parse(localStorage.getItem("tours")),i.id])),t.destroy()),a.onNextNotify&&new FilamentNotification().title(a.onNextNotify.title).body(a.onNextNotify.body).icon(a.onNextNotify.icon).iconColor(a.onNextNotify.iconColor).color(a.onNextNotify.color).duration(a.onNextNotify.duration).send(),a.onNextDispatch&&Livewire.dispatch(a.onNextDispatch.name,JSON.parse(a.onNextDispatch.args)),a.onNextClickSelector&&document.querySelector(a.onNextClickSelector).click(),a.onNextRedirect&&window.open(a.onNextRedirect.url,a.onNextRedirect.newTab?"_blank":"_self"),t.moveNext()},onPopoverRender:(r,{config:a,state:m})=>{m.activeStep.uncloseable&&document.querySelector(".driver-popover-close-btn").remove(),r.title.innerHTML="",r.title.innerHTML=m.activeStep.popover.title,m.activeStep.popover.description||(r.title.firstChild.style.justifyContent="center");let s="dark:text-white fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 mb-4";r.footer.parentElement.classList.add(...s.split(" ")),r.footer.innerHTML="",r.footer.classList.add("flex","mt-3"),r.footer.style.justifyContent="space-evenly",r.footer.classList.remove("driver-popover-footer");let h=document.createElement("button"),l="fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-primary gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-custom-600 text-white hover:bg-custom-500 dark:bg-custom-500 dark:hover:bg-custom-400 focus:ring-custom-500/50 dark:focus:ring-custom-400/50 fi-ac-btn-action";h.classList.add(...l.split(" "),"driver-popover-next-btn"),h.innerText=t.isLastStep()?i.doneButtonLabel:i.nextButtonLabel,h.style.setProperty("--c-400","var(--primary-400"),h.style.setProperty("--c-500","var(--primary-500"),h.style.setProperty("--c-600","var(--primary-600");let v=document.createElement("button"),g="fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-gray gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-white text-gray-950 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 ring-1 ring-gray-950/10 dark:ring-white/20 fi-ac-btn-action";v.classList.add(...g.split(" "),"driver-popover-prev-btn"),v.innerText=i.previousButtonLabel,t.isFirstStep()||r.footer.appendChild(v),r.footer.appendChild(h)},steps:JSON.parse(i.steps)});t.drive()}}});
