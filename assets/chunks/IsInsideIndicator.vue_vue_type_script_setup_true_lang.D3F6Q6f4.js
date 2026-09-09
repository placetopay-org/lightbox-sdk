import{d as L,o as P,c as C,k as A,F as B,j as w}from"./framework.C2MzLXzv.js";var v;(function(e){e.WRAPPER_ID="placetopay_lightbox_wrapper",e.IFRAME_ID="placetopay_lightbox",e.CLOSE_BUTTON_ID="placetopay_close_button",e.STYLES_ID="placetopay-lightbox"})(v||(v={}));var m;(function(e){e.CLOSE="close",e.UPDATE_STYLES="updateStyles",e.HIDE_CLOSE_BUTTON="hideCloseButton",e.CLOSE_BY_USER="closeByUser"})(m||(m={}));var r;(function(e){e.BACKDROP_COLOR="--placetopay-lightbox-backdrop-color",e.RADIUS="--placetopay-lightbox-border-radius",e.MAX_HEIGHT="--placetopay-lightbox-max-height",e.MAX_WIDTH="--placetopay-lightbox-max-width",e.POSITION="--placetopay-lightbox-position",e.WRAPPER_WIDTH="--placetopay-lightbox-wrapper-width",e.WRAPPER_HEIGHT="--placetopay-lightbox-wrapper-height"})(r||(r={}));const k=(e,t,o)=>(globalThis.opener||globalThis.parent).postMessage({type:e,preventClose:o,payload:t},"*"),h=(e,t)=>{document.documentElement.style.setProperty(e,t)},x=e=>{document.documentElement.style.removeProperty(e)};let d=null,g=null;const E={},D=e=>e??`placetopay_${crypto.randomUUID()}`,H={en:{popupTitle:"Popup Opened",popupMessage:"Please complete the process in the popup window. This window will remain blocked until finished.",continueButton:"Continue",cancelButton:"Cancel"},es:{popupTitle:"Popup Abierto",popupMessage:"Por favor, complete el proceso en la ventana emergente. Esta ventana permanecerá bloqueada hasta que finalice.",continueButton:"Continuar",cancelButton:"Cancelar"}};function W(){return(navigator.language||navigator.userLanguage).startsWith("es")?"es":"en"}function y(e){const t=W();return H[t][e]}const M=()=>{if(g)return;g=document.createElement("div"),g.className="placetopay-lightbox-backdrop-overlay",g.style.cssText=`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 9998;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;const e=document.createElement("div");e.className="placetopay-lightbox-backdrop-message-container",e.style.cssText=`
        background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        border-radius: 16px;
        padding: 40px;
        max-width: 420px;
        margin: 20px;
        text-align: center;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;const t=document.createElement("h2");t.className="placetopay-lightbox-backdrop-title",t.textContent=y("popupTitle"),t.style.cssText=`
        margin: 0 0 20px 0;
        font-size: 22px;
        font-weight: 700;
        color: #ffffff;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    `;const o=document.createElement("p");o.className="placetopay-lightbox-backdrop-message",o.textContent=y("popupMessage"),o.style.cssText=`
        margin: 0;
        font-size: 15px;
        line-height: 1.6;
        color: #d1d5db;
        opacity: 0.9;
    `;const n=document.createElement("button");n.textContent=y("continueButton"),n.style.cssText=`
        margin-top: 20px;
        margin-right: 10px;
        padding: 10px 18px;
        cursor: pointer;
        border-radius: 8px;
        border: none;
        background: #ffffff;
        color: #000000;
        font-weight: 600;
    `,n.onclick=()=>{d&&!d.closed&&d.focus()};const l=document.createElement("button");if(l.textContent=y("cancelButton"),l.style.cssText=`
        margin-top: 20px;
        padding: 10px 18px;
        cursor: pointer;
        border-radius: 8px;
        border: 1px solid #ffffff;
        background: transparent;
        color: #ffffff;
        font-weight: 600;
    `,l.onclick=()=>{d&&!d.closed&&d.close(),I()},e.appendChild(t),e.appendChild(o),e.appendChild(n),e.appendChild(l),g.appendChild(e),document.body.appendChild(g),document.body.classList.add("placetopay-lightbox-open"),document.body.style.overflow="hidden",d){const a=setInterval(()=>{d!=null&&d.closed&&(clearInterval(a),I())},1e3)}},I=()=>{g&&(document.body.removeChild(g),g=null),document.body.style.overflow="",document.body.classList.remove("placetopay-lightbox-open"),d=null,k(m.CLOSE_BY_USER)},U=(e,t="self",o)=>{switch(t){case"blank":d=window.open(e,"_blank");break;case"popup":{const a=(window.screen.width-512)/2,s=(window.screen.height-640)/2;d=window.open(e,D(o),`popup=true,width=512,height=640,left=${a},top=${s}`);break}case"self":default:window.location.href=e;break}return d&&o&&(E[o]={window:d,type:t}),d?M():window.location.href=e,d},N=e=>{const t=E[e];t&&(t.window.closed||t.window.close(),delete E[e],I())},$=e=>e in E;let T;const j=({id:e,url:t,element:o,callbacks:n,styles:l,closeButtonEnabled:a,enforceStyles:s,allowRedirects:c,backupTarget:p,allowPayment:b})=>{if(p==="self"&&!c)return;if(Y()&&(window.self!==window.top&&window.parent.postMessage({type:"placetopay-lightbox:redirect",url:t},"*"),p!=="self"||c)){U(t,p,e),R({id:e,callbacks:n,styles:l,closeButton:void 0,enforceStyles:s});return}const i=document.createElement("div");i.id=e,i.className=v.WRAPPER_ID,o!==document.body&&(i.style.setProperty(r.POSITION,"absolute"),i.style.setProperty(r.WRAPPER_HEIGHT,"100%"),i.style.setProperty(r.WRAPPER_WIDTH,"100%"));const u=document.createElement("iframe");u.src=t,u.id=v.IFRAME_ID,b&&u.setAttribute("allow","payment"),S(l),o.appendChild(i),i.appendChild(u);let f;a&&(f=document.createElement("button"),f.id=v.CLOSE_BUTTON_ID,f.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#4b5563" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>',f.addEventListener("click",()=>{O(e)}),i.appendChild(f)),R({id:e,callbacks:n,styles:l,closeButton:f,enforceStyles:s})},R=({id:e,callbacks:t,styles:o,closeButton:n,enforceStyles:l})=>{T=a=>{var s;if(a.data.type===m.CLOSE&&O(e),a.data.type===m.UPDATE_STYLES){const c=l?Object.assign(Object.assign({},a.data.payload),o):Object.assign(Object.assign({},o),a.data.payload);S(c)}a.data.type===m.HIDE_CLOSE_BUTTON&&(n==null||n.remove()),(s=t[a.data.type])===null||s===void 0||s.call(t,a.data.payload)},globalThis.addEventListener("message",T)},O=e=>{if($(e)){N(e),globalThis.removeEventListener("message",T);return}const t=document.getElementById(e);if(t)t.remove(),F(),globalThis.removeEventListener("message",T);else throw new Error(`Frame from "${e}" not found`)},F=()=>{x(r.BACKDROP_COLOR),x(r.RADIUS),x(r.MAX_HEIGHT),x(r.MAX_WIDTH)},S=e=>{var t,o,n,l,a,s,c,p;h(r.BACKDROP_COLOR,G((t=e.backdropColor)!==null&&t!==void 0?t:"#000000",(o=e.backdropOpacity)!==null&&o!==void 0?o:.7)),h(r.RADIUS,`${(n=e.radius)!==null&&n!==void 0?n:0}px`),h(r.MAX_HEIGHT,_("height",(l=e.height)!==null&&l!==void 0?l:640)),h(r.MAX_WIDTH,_("width",(a=e.width)!==null&&a!==void 0?a:512)),h(r.POSITION,(s=e.position)!==null&&s!==void 0?s:"fixed"),h(r.WRAPPER_WIDTH,_("width",(c=e.wrapperWidth)!==null&&c!==void 0?c:"100vw")),h(r.WRAPPER_HEIGHT,_("height",(p=e.wrapperHeight)!==null&&p!==void 0?p:"100vh"))},G=(e,t)=>{var o;const n=(o=e==null?void 0:e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(l,a,s,c)=>"#"+a+a+s+s+c+c).substring(1).match(/.{2}/g))===null||o===void 0?void 0:o.map(l=>parseInt(l,16));return n.push(t),`rgba(${n.join(", ")})`},_=(e,t)=>{const o=String(t);if(o.match(/^\d+(vh|vw|px|%)$/))return o;if(o.match(/^\d+$/))return`${o}px`;console.warn(`Invalid ${e}. Must be a number, a number followed by "px", or a number followed by "%".`)},X=()=>globalThis.location!==globalThis.parent.location,Y=()=>/iPhone|iPad|iPod/i.test(navigator.userAgent)||/^((?!chrome|android).)*safari/i.test(navigator.userAgent),z=e=>k(m.UPDATE_STYLES,e),K=()=>k(m.HIDE_CLOSE_BUTTON),Z=(e,t)=>{k(m.CLOSE,e,t)},ee=(e,t)=>{var o,n,l,a,s,c,p,b;const i={id:(o=t==null?void 0:t.id)!==null&&o!==void 0?o:new URL(e).origin,element:(n=t==null?void 0:t.element)!==null&&n!==void 0?n:document.body,allowRedirects:(l=t==null?void 0:t.allowRedirects)!==null&&l!==void 0?l:!0,callbacks:(a=t==null?void 0:t.callbacks)!==null&&a!==void 0?a:{},closeButton:(s=t==null?void 0:t.closeButton)!==null&&s!==void 0?s:!0,styles:(c=t==null?void 0:t.styles)!==null&&c!==void 0?c:{},backupTarget:(p=t==null?void 0:t.backupTarget)!==null&&p!==void 0?p:"self",allowPayment:(b=t==null?void 0:t.allowPayment)!==null&&b!==void 0?b:!1,url:e,close:()=>O(i.id),updateStyles:z,hideCloseButton:K,on:(u,f)=>{i.callbacks[u]=f},open:()=>{var u;j({id:i.id,url:e,element:i.element,callbacks:i.callbacks,styles:i.styles,closeButtonEnabled:i.closeButton,enforceStyles:(u=t==null?void 0:t.enforceStyles)!==null&&u!==void 0?u:!1,allowRedirects:i.allowRedirects,backupTarget:i.backupTarget,allowPayment:i.allowPayment})}};return t!=null&&t.launch&&i.open(),i},q="/lightbox-sdk/check.svg",V="/lightbox-sdk/cross.svg",J={class:"flex gap-1 items-center"},te=L({__name:"IsInsideIndicator",setup(e){return(t,o)=>(P(),C("div",J,[A(X)()?(P(),C(B,{key:0},[o[0]||(o[0]=w("img",{src:q,alt:"check"},null,-1)),o[1]||(o[1]=w("span",{class:"font-medium text-primary text-sm"},"currently inside a lightbox",-1))],64)):(P(),C(B,{key:1},[o[2]||(o[2]=w("img",{src:V,alt:"cross"},null,-1)),o[3]||(o[3]=w("span",{class:"font-medium text-gray-500 text-sm"},"currently outside of a lightbox",-1))],64))]))}});export{te as _,ee as c,Z as e,K as h,z as u};
