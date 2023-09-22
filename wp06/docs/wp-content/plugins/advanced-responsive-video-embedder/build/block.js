!function(){var e={184:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var a=i.apply(null,n);a&&e.push(a)}}else if("object"===o){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var l in n)r.call(n,l)&&n[l]&&e.push(l)}}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n)}()}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";var e=window.wp.element,t=JSON.parse('{"name":"nextgenthemes/arve-block"}'),r=window.wp.i18n,i=window.wp.serverSideRender,o=n.n(i),a=window.wp.blockEditor,l=window.wp.components,s=window.wp.blocks,c=n(184),u=n.n(c);const{name:p}=t,{settings:d,options:m}=window.ArveBlockJsBefore;delete d.align.options.center;const h=new DOMParser;function f(e){const t=[];return Object.entries(e).forEach((([e,n])=>{const r={label:n,value:e};t.push(r)})),t}function g(t){const n=[],i={},o=(0,e.createElement)("p",null,(0,r.__)("To edit the featured image, you need permission to upload media."));let s;Object.values(d).forEach((e=>{i[e.tag]=[]})),Object.entries(d).forEach((([n,c])=>{const u=t.attributes[n];i[c.tag].push((0,e.createElement)(e.Fragment,null,"boolean"===c.type&&(0,e.createElement)(l.ToggleControl,{key:n,label:c.label,help:b(c),checked:!!u,onChange:e=>t.setAttributes({[n]:e})}),"select"===c.type&&(0,e.createElement)(l.SelectControl,{key:n,value:u,label:c.label,help:b(c),options:f(c.options),onChange:e=>t.setAttributes({[n]:e})}),"string"===c.type&&(0,e.createElement)(l.TextControl,{key:n,label:c.label,placeholder:c.placeholder,help:b(c),value:u,onChange:e=>(function(e,t,n){if("url"===e){const e=h.parseFromString(t,"text/html").querySelector("iframe");if(e&&e.getAttribute("src")){t=e.src;const r=e.width,i=e.height;r&&i&&n.setAttributes({aspect_ratio:v(r,i)})}}}(n,e,t),t.setAttributes({[n]:e}))}),"attachment"===c.type&&(0,e.createElement)(l.BaseControl,{key:n,className:"editor-post-featured-image",help:b(c)},(0,e.createElement)(a.MediaUploadCheck,{fallback:o},(0,e.createElement)(a.MediaUpload,{title:(0,r.__)("Thumbnail"),onSelect:e=>(s=e,t.setAttributes({[n]:e.id.toString(),[n+"_url"]:e.url})),allowedTypes:["image"],modalClass:"editor-post-featured-image__media-modal",render:({open:t})=>((t,n,i)=>(0,e.createElement)("div",{className:"editor-post-featured-image__container"},(0,e.createElement)(l.Button,{className:n?"editor-post-featured-image__preview":"editor-post-featured-image__toggle",onClick:t,"aria-label":n?(0,r.__)("Edit or update the image"):null,"aria-describedby":n?`editor-post-featured-image-${n}-describedby`:""},!!n&&!!i&&(0,e.createElement)("div",{style:{overflow:"hidden"}},(0,e.createElement)(l.ResponsiveWrapper,{naturalWidth:640,naturalHeight:360,isInline:!0},(0,e.createElement)("img",{src:i,alt:"ARVE Thumbnail",style:{width:"100%",height:"100%",objectFit:"cover"}}))),!n&&(0,r.__)("Set Thumbnail")),(0,e.createElement)(l.DropZone,null)))(t,u,""),value:u})),!!u&&!1,!!u&&(0,e.createElement)(a.MediaUploadCheck,null,(0,e.createElement)(l.Button,{onClick:()=>t.setAttributes({[n]:"",[n+"_url"]:""}),isLink:!0,isDestructive:!0},(0,r.__)("Remove Thumbnail"))))))}));let c=!0;return i.main.push((0,e.createElement)(l.BaseControl,{key:"info",help:(0,r.__)("You can disable the extensive help texts on the ARVE settings page to clean up this UI","advanced-responsive-video-embedder")},(0,e.createElement)(l.BaseControl.VisualLabel,null,(0,r.__)("Info","advanced-responsive-video-embedder")))),Object.keys(i).forEach((t=>{var r;n.push((0,e.createElement)(l.PanelBody,{key:t,title:(r=t,r.charAt(0).toUpperCase()+r.slice(1)),initialOpen:c},i[t])),c=!1})),n}function b(t){if("string"!=typeof t.description)return"";if("string"==typeof t.descriptionlinktext){const n=t.description.split(t.descriptionlinktext);return(0,e.createElement)(e.Fragment,null,n[0],(0,e.createElement)("a",{href:t.descriptionlink},t.descriptionlinktext),n[1])}return t.description}function v(e,t){const n=y(e,t);return e/n+":"+t/n}function y(e,t){return t?y(t,e%t):e}(0,s.registerBlockType)(p,{edit:function(t){const{attributes:{mode:n,align:r,maxwidth:i}}=t;let l=!0;const s={},c=JSON.parse(JSON.stringify(t.attributes));delete c.align,delete c.maxwidth,!i||"left"!==r&&"right"!==r?"left"!==r&&"right"!==r||(s.width="100%",s.maxWidth=m.align_maxwidth):(s.width="100%",s.maxWidth=i);const p=(0,a.useBlockProps)({style:s});return("normal"===n||!n&&"normal"===m.mode)&&(l=!1),(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{...p,key:"block"},(0,e.createElement)(o(),{className:u()({"arve-ssr":!0,"arve-ssr--pointer-events-none":!l}),block:"nextgenthemes/arve-block",attributes:c,skipBlockSupportAttributes:!0})),(0,e.createElement)(a.InspectorControls,{key:"insp"},g(t)))}})}()}();