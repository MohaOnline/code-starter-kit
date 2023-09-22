/*! For license information please see index.js.LICENSE.txt */
!function(){var e={875:function(e,t){var n;!function(){"use strict";var a={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var l=typeof n;if("string"===l||"number"===l)e.push(n);else if(Array.isArray(n)){if(n.length){var r=i.apply(null,n);r&&e.push(r)}}else if("object"===l){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var o in n)a.call(n,o)&&n[o]&&e.push(o)}}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n)}()}},t={};function n(a){var i=t[a];if(void 0!==i)return i.exports;var l=t[a]={exports:{}};return e[a](l,l.exports,n),l.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";var e=window.wp.element,t=window.wp.i18n,a=window.wpmi.store,i=window.wpmi.components;function l({icon:t,settings:n}){return(0,e.createElement)("div",{className:"wpmi__icon-preview attachment-info"},(0,e.createElement)("div",{className:"thumbnail thumbnail-image"},(0,e.createElement)("i",{className:t})),(0,e.createElement)("div",{className:"details"},(0,e.createElement)("div",{className:"filename"},t),(0,e.createElement)("div",{className:"uploaded"},n.align),(0,e.createElement)("div",{className:"file-size"},n.size," ",(0,e.createElement)("em",null,"(em)"))))}var r=window.wp.components;const{WPMI_PREFIX:o}=wpmi_navmenu;function c({settings:n,onChangeSettings:a}){const i=e=>{const{name:t,value:i}=e.target,l={...n,[t]:i};a(l)};return(0,e.createElement)("div",{className:"attachment-info"},(0,e.createElement)("form",null,(0,e.createElement)("label",{className:"setting"},(0,e.createElement)("span",null,(0,t.__)("Hide Label","wp-menu-icons")),(0,e.createElement)("select",{id:o+"-input-label",className:o+"-input",name:"label",onChange:i,value:n.label},(0,e.createElement)("option",{value:""},(0,t.__)("No","wp-menu-icons")),(0,e.createElement)("option",{value:"1"},(0,t.__)("Yes","wp-menu-icons")))),(0,e.createElement)("label",{className:"setting"},(0,e.createElement)("span",null,(0,t.__)("Position","wp-menu-icons")),(0,e.createElement)("select",{id:o+"-input-position",className:o+"-input",name:"position",onChange:i,value:n.position},(0,e.createElement)("option",{value:"before"},(0,t.__)("Before","wp-menu-icons")),(0,e.createElement)("option",{value:"after"},(0,t.__)("After","wp-menu-icons")))),(0,e.createElement)("label",{className:"setting"},(0,e.createElement)("span",null,(0,t.__)("Vertical Align","wp-menu-icons")),(0,e.createElement)("select",{id:o+"-input-align",className:o+"-input",name:"align",onChange:i,value:n.align},(0,e.createElement)("option",{value:"top"},"Top"),(0,e.createElement)("option",{value:"middle"},"Middle"),(0,e.createElement)("option",{value:"bottom"},"Bottom"))),(0,e.createElement)("label",{className:"setting"},(0,e.createElement)("span",null,(0,t.__)("Size","wp-menu-icons")," ",(0,e.createElement)("em",null,"(em)")),(0,e.createElement)("input",{id:o+"-input-size",className:o+"-input",name:"size",type:"number",min:"0.1",step:"0.1",onChange:i,value:n.size})),(0,e.createElement)(r.ColorPicker,{value:n.color,onChangeComplete:e=>a({...n,color:e.hex})}),(0,e.createElement)("label",{className:"wpmi-color-picker"},(0,e.createElement)("span",{className:"container"}))))}function s({settings:n,onChangeSettings:a}){const i={...n};return(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{tabIndex:"0",className:"attachment-details save-ready"},(0,e.createElement)("h2",null,(0,t.__)("Icon","wp-menu-icons"),(0,e.createElement)("span",{className:"settings-save-status"},(0,e.createElement)("span",{className:"spinner"}),(0,e.createElement)("span",{className:"saved"},(0,t.__)("Saved","wp-menu-icons"))))),(0,e.createElement)(l,{icon:n.icon,settings:i}),(0,e.createElement)(c,{settings:n,onChangeSettings:a}))}var m=window.lodash;function u({settings:n,prevSettings:a,onSave:i,onRemove:l}){return(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{className:"media-toolbar-secondary"}),(0,e.createElement)("div",{className:"media-toolbar-primary search-form"},(0,e.createElement)("button",{type:"button",className:"button media-button button-large button-primary media-button-select save",onClick:e=>{e.preventDefault();const t=document.getElementById("menu-item-"+n.id),a=document.getElementById("menu-item-settings-"+n.id);a.querySelectorAll("#wpmi-input-label").forEach((e=>e.value=n.label)),a.querySelectorAll("#wpmi-input-position").forEach((e=>e.value=n.position)),a.querySelectorAll("#wpmi-input-align").forEach((e=>e.value=n.align)),a.querySelectorAll("#wpmi-input-size").forEach((e=>e.value=n.size)),a.querySelectorAll("#wpmi-input-icon").forEach((e=>e.value=n.icon)),a.querySelectorAll("#wpmi-input-color").forEach((e=>e.value=n.color));const l=t.querySelector(".menu-item-wpmi_icon"),r=t.querySelector(".menu-item-wpmi_plus");l&&l.remove();const o=document.createElement("i");o.className="menu-item-wpmi_icon "+n.icon,r.after(o),i()},disabled:(0,m.isEqual)(n,a)},(0,t.__)("Save","wp-menu-icons")),(0,e.createElement)("button",{type:"button",className:"button media-button button-large button-secondary remove",onClick:e=>{e.preventDefault();const t=document.getElementById("menu-item-"+n.id),a=document.getElementById("menu-item-settings-"+n.id);a.querySelectorAll("#wpmi-input-label").forEach((e=>e.value="")),a.querySelectorAll("#wpmi-input-position").forEach((e=>e.value="")),a.querySelectorAll("#wpmi-input-align").forEach((e=>e.value="")),a.querySelectorAll("#wpmi-input-size").forEach((e=>e.value="")),a.querySelectorAll("#wpmi-input-icon").forEach((e=>e.value="")),a.querySelectorAll("#wpmi-input-color").forEach((e=>e.value=""));const i=t.querySelector(".menu-item-wpmi_icon");i&&i.remove(),l()}},(0,t.__)("Remove","wp-menu-icons"))))}const{WPMI_PLUGIN_NAME:p,WPMI_PREFIX:d,WPMI_PREMIUM_SELL_URL:v}=wpmi_navmenu;var E=()=>{const{currentLibrary:n,isResolvingCurrentLibrary:l}=(0,a.useCurrentLibrary)(),{iconMap:r,isLoadingIconMap:o,filterIcons:c}=(0,a.useCurrentLibraryIconMap)(),[m,E]=(0,e.useState)(!1),[g,b]=(0,e.useState)(""),[f,w]=(0,e.useState)({}),[y,h]=(0,e.useState)({}),_=()=>E(!1),S=e=>{const t=e.id.split("-")[2],n=document.getElementById("menu-item-settings-"+t),a={label:n.querySelector("#wpmi-input-label").value,position:n.querySelector("#wpmi-input-position").value,align:n.querySelector("#wpmi-input-align").value,size:n.querySelector("#wpmi-input-size").value,icon:n.querySelector("#wpmi-input-icon").value,color:n.querySelector("#wpmi-input-color").value,id:t};w(a),h(a),E(!0)},N={settings:f,onChangeSettings:w},I={settings:f,prevSettings:y,onSave:_,onRemove:_};return(0,e.useEffect)((()=>{document.querySelectorAll(".menu-item-wpmi_open").forEach((e=>e.addEventListener("click",(e=>{e.preventDefault();const t=e.target.closest("li");t&&S(t)}))));const e=document.getElementById("menu-to-edit");e&&new MutationObserver((e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)e.querySelector(".menu-item-wpmi_open").addEventListener("click",(t=>{t.preventDefault(),S(e)}))})).observe(e,{childList:!0})}),[]),(0,e.createElement)(i.Modal,{title:p,pluginPrefix:d,show:m,onClose:_,premiumSelURL:v,premiumTitle:"Premium",tabTitle:n?.label,toolbar:!0,toolbarSearchIn:n?.label,onChangeToolbar:b,sidebarContent:(0,e.createElement)(s,{...N}),footerContent:(0,e.createElement)(u,{...I})},l&&o?(0,e.createElement)(i.Spinner,null):r.length>0?(0,e.createElement)(i.IconMap,{iconMap:c(g),onChangeIcon:e=>w({...f,icon:e}),icon:f.icon}):(0,t.__)("The library does not contain icons","wp-menu-icons"))},g=n(875),b=n.n(g);const{WPMI_PREFIX:f}=wpmi_navmenu,w=document.querySelector(".menu-edit"),y=document.createElement("input");function h(){const{libraries:n,isResolvingLibraries:l,hasResolvedLibraries:r,hasLibraries:o}=(0,a.useLibraries)(),{currentLibrary:c,currentLibraryName:s,setCurrentLibraryName:m}=(0,a.useCurrentLibrary)(),{settings:u,hasResolvedSettings:p}=(0,a.useSettingsEntities)(),d=e=>m(e.target.value);return(0,e.useEffect)((()=>{c&&(y.value=s)}),[s,c]),!l||r||p?o?(0,e.createElement)("div",{id:`tabs-panel-${f}-themes`,className:"tabs-panel tabs-panel-active"},(0,e.createElement)("ul",{id:f+"-themes-checklist",className:"categorychecklist form-no-clear"},n.filter((e=>u.active_libraries.includes(e.name))).map((({name:t,label:n,type:a,is_loaded:i})=>{const l="uploaded"===a;return(0,e.createElement)("li",{key:t},(0,e.createElement)("label",{className:b()("menu-item-title",l&&"wpmi__premium-badge")},(0,e.createElement)("input",{type:"radio",className:f+"-item-checkbox",name:f+"_font",disabled:!i,value:t,checked:t===s,onChange:d}),n))})))):(0,e.createElement)("div",null,(0,t.__)("There are no active libraries.","wp-menu-icons"),";"):(0,e.createElement)(i.Spinner,null)}y.type="hidden",y.id="wpmi_font",y.name="wpmi_font",w&&w.append(y);const{WPMI_PREFIX:_}=wpmi_navmenu;var S;S=()=>{const t=document.createElement("div");document.querySelector("body").append(t);const n=document.getElementById(`posttype-${_}-themes`);t&&(0,e.render)((0,e.createElement)(E,null),t),n&&(0,e.render)((0,e.createElement)(h,null),n)},/comp|inter|loaded/.test(document.readyState)?S():document.addEventListener("DOMContentLoaded",S,!1)}()}();