/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 962:
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./.yarn/__virtual__/@lipemat-js-boilerplate-gutenberg-virtual-b53edc2e95/0/cache/@lipemat-js-boilerplate-gutenberg-npm-2.11.0-f95d21e270-dda1d4faf8.zip/node_modules/@lipemat/js-boilerplate-gutenberg/dist/index.module.js ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addMiddleware: function() { return /* binding */ m; },
/* harmony export */   autoload: function() { return /* binding */ z; },
/* harmony export */   autoloadBlocks: function() { return /* binding */ U; },
/* harmony export */   autoloadPlugins: function() { return /* binding */ X; },
/* harmony export */   clearApplicationPassword: function() { return /* binding */ W; },
/* harmony export */   clearNonce: function() { return /* binding */ P; },
/* harmony export */   createMethods: function() { return /* binding */ G; },
/* harmony export */   defaultFetchHandler: function() { return /* binding */ B; },
/* harmony export */   doRequest: function() { return /* binding */ A; },
/* harmony export */   doRequestWithPagination: function() { return /* binding */ C; },
/* harmony export */   enableApplicationPassword: function() { return /* binding */ N; },
/* harmony export */   getAuthorizationUrl: function() { return /* binding */ D; },
/* harmony export */   hasApplicationPassword: function() { return /* binding */ M; },
/* harmony export */   hasExternalNonce: function() { return /* binding */ g; },
/* harmony export */   removeMiddleware: function() { return /* binding */ w; },
/* harmony export */   restoreNonce: function() { return /* binding */ E; },
/* harmony export */   restoreRootURL: function() { return /* binding */ R; },
/* harmony export */   setNonce: function() { return /* binding */ b; },
/* harmony export */   setRootURL: function() { return /* binding */ I; },
/* harmony export */   usePostMeta: function() { return /* binding */ F; },
/* harmony export */   useTerms: function() { return /* binding */ Y; },
/* harmony export */   wpapi: function() { return /* binding */ L; }
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ 6179);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ 8003);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ 1368);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/blocks */ 378);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/plugins */ 1398);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ 3284);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ 7363);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
function p(){return(p=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var l,v,h=[];function m(e){return h.push(e),h.length-1}function w(e){return delete h[e],h}function g(){return void 0!==v}function b(e){E(),v=m(function(e){function t(e,n){var r=e.headers,o=void 0===r?{}:r;for(var i in o)"x-wp-nonce"===i.toLowerCase()&&delete o[i];return n(p({},e,{headers:p({},o,{"X-WP-Nonce":t.nonce})}))}return t.nonce=e,t}(e))}function P(){void 0!==v&&(w(v),v=void 0),void 0===l&&(l=m(function(e,t){if(void 0!==e.headers)for(var n in e.headers)"x-wp-nonce"===n.toLowerCase()&&delete e.headers[n];return t(e,t)}))}function E(){void 0!==v&&w(v),void 0!==l&&w(l),v=void 0,l=void 0}var y=function(e,t){return void 0===t&&(t=!0),Promise.resolve(function(e,t){return void 0===t&&(t=!0),t?204===e.status?null:e.json?e.json():Promise.reject(e):e}(e,t)).catch(function(e){return T(e,t)})};function T(e,n){if(void 0===n&&(n=!0),!n)throw e;return function(e){var n={code:"invalid_json",message:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("The response is not a valid JSON response.")};if(!e||!e.json)throw n;return e.json().catch(function(){throw n})}(e).then(function(e){var n={code:"unknown_error",message:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("An unknown error occurred.")};throw"rest_cookie_invalid_nonce"===e.code&&g()&&(e.code="external_rest_cookie_invalid_nonce"),e||n})}var k,_=["url","path","data","parse"],j={Accept:"application/json, */*;q=0.1"},x={credentials:"include"},O=function(e){if(e.status>=200&&e.status<300)return e;throw e},B=function(e){var n=function e(t,n){return function(r){return void 0===n[t]?r:(0,n[t])(r,t===n.length-1?function(e){return e}:e(t+1,n))}}(0,h.filter(Boolean))(p({},x,e)),r=n.url,o=n.path,i=n.data,u=n.parse,s=void 0===u||u,c=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(n=i[r])>=0||(o[n]=e[n]);return o}(n,_),a=n.body,d=n.headers;return d=p({},j,d),i&&(a=JSON.stringify(i),d["Content-Type"]="application/json"),window.fetch(r||o,p({},c,{body:a,headers:d})).then(function(e){return Promise.resolve(e).then(O).catch(function(e){return T(e,s)}).then(function(e){return y(e,s)})},function(){throw{code:"fetch_error",message:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("You are probably offline.")}})},C=function(e,t,n){return Promise.resolve(A(e,t,n,!1)).then(function(e){return Promise.resolve(y(e)).then(function(t){return{items:t,totalPages:parseInt(e.headers.get("X-WP-TotalPages")||"1"),totalItems:parseInt(e.headers.get("X-WP-Total")||"0")}})})},A=function(t,r,o,i){void 0===i&&(i=!0);try{return Promise.resolve(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()(void 0===o||"GET"===r?{method:r,parse:i,path:(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_2__.addQueryArgs)(t,o)}:{data:o,method:r,parse:i,path:t}))}catch(e){return Promise.reject(e)}};function G(e){return{create:function(t){return A(e,"POST",t)},delete:function(t){return A(e+="/"+t,"DELETE",{force:!0})},get:function(t){return A(e,"GET",t)},getById:function(t,n){return A(e+="/"+t,"GET",n)},getWithPagination:function(t){return C(e,"GET",t)},trash:function(t){return A(e+="/"+t,"DELETE")},update:function(t){return A(e+="/"+t.id,"PATCH",t)}}}function L(t){var n={};return["categories","comments","blocks","media","menus","menu-locations","menu-items","statuses","pages","posts","tags","taxonomies","types","search"].map(function(e){return n[e]=function(){return G("/wp/v2/"+e)}}),n.menuLocations=function(){return G("/wp/v2/menu-locations")},n.menuItems=function(){return G("/wp/v2/menu-items")},n.users=function(){var e=G("/wp/v2/users");return e.delete=function(e,t){return void 0===t&&(t=!1),A("/wp/v2/users/"+e,"DELETE",{force:!0,reassign:t})},e},n.applicationPasswords=function(){return{create:function(e,t){return A("/wp/v2/users/"+e+"/application-passwords","POST",t)},delete:function(e,t){return A("/wp/v2/users/"+e+"/application-passwords/"+t,"DELETE")},get:function(e){return A("/wp/v2/users/"+e+"/application-passwords","GET")},getById:function(e,t){return A("/wp/v2/users/"+e+"/application-passwords/"+t,"GET")},introspect:function(e){return A("/wp/v2/users/"+e+"/application-passwords/introspect","GET")},update:function(e,t,n){return A("/wp/v2/users/"+e+"/application-passwords/"+t,"PUT",n)}}},n.settings=function(){return{get:function(){return A("/wp/v2/settings","GET")},update:function(e){return A("/wp/v2/settings","POST",e)}}},void 0!==t&&Object.keys(t).map(function(e){return n[e]=t[e]}),_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default().setFetchHandler(B),n}function R(){w(k)}function I(t,n){k&&w(k),k=m(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default().createRootURLMiddleware(t.replace(/\/$/,"")+"/")),window.location.hostname&&new URL(t).hostname===window.location.hostname?E():void 0!==n?b(n):g()||P()}var S,D=function(r){return Promise.resolve(function(o,i){try{var u=Promise.resolve(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({path:"/",method:"GET"})).then(function(e){return e.authentication["application-passwords"]?(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_2__.addQueryArgs)(e.authentication["application-passwords"].endpoints.authorization,r):{code:"application_passwords_disabled",message:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Application passwords are not enabled on this site."),data:null}})}catch(e){return e}return u&&u.then?u.then(void 0,function(e){return e}):u}())};function M(){return void 0!==S}function W(){void 0!==S&&(w(S),S=void 0)}function N(e,t){W(),S=m(function(n,r){var o=n.headers;return r(p({},n,{headers:p({},void 0===o?{}:o,{Authorization:"Basic "+btoa(e+":"+t)})}),r)})}var U=function(e,t){z({afterReload:q,beforeReload:J,getContext:e,pluginModule:t,register:_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.registerBlockType,unregister:_wordpress_blocks__WEBPACK_IMPORTED_MODULE_3__.unregisterBlockType,type:"block"})},X=function(e,t){z({afterReload:function(){},beforeReload:function(){},getContext:e,pluginModule:t,register:_wordpress_plugins__WEBPACK_IMPORTED_MODULE_4__.registerPlugin,unregister:_wordpress_plugins__WEBPACK_IMPORTED_MODULE_4__.unregisterPlugin,type:"plugin"})},z=function(e){var t=e.afterReload,n=e.beforeReload,r=e.getContext,o=e.pluginModule,i=e.register,u=e.unregister,s=e.type,c={},a=function(){n();var e=r();if(e){var o=[];return e.keys().forEach(function(t){var n=e(t);n.exclude||n!==c[t]&&(c[n.name+"-"+s]&&u(n.name),i(n.name,n.settings),o.push(n.name),c[n.name+"-"+s]=n)}),t(o),e}},d=a();o.hot&&null!=d&&d.id&&o.hot.accept(d.id,a)},H=null,J=function(){H=(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.select)("core/block-editor").getSelectedBlockClientId(),(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)("core/block-editor").clearSelectedBlock()},q=function(e){void 0===e&&(e=[]),(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.select)("core/block-editor").getBlocks().forEach(function(t){var n=t.clientId;e.includes(t.name)&&(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)("core/block-editor").selectBlock(n)}),H?(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)("core/block-editor").selectBlock(H):(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.dispatch)("core/block-editor").clearSelectedBlock(),H=null};function F(e){var t=(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useDispatch)("core/editor").editPost,n=(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(function(e){return{previous:e("core/editor").getCurrentPostAttribute("meta"),current:e("core/editor").getEditedPostAttribute("meta")}}),r=e?n.current[e]:n.current,o=e?n.previous[e]:n.previous,i=(0,react__WEBPACK_IMPORTED_MODULE_6__.useCallback)(function(n){var r;e&&t({meta:(r={},r[e]=n,r)})},[t,e]),u=(0,react__WEBPACK_IMPORTED_MODULE_6__.useCallback)(function(e,n){var r;t({meta:(r={},r[e]=n,r)})},[t]);return e?[r,i,o]:[r,u,o]}function Y(e){var t=(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useDispatch)("core/editor").editPost,n=(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.useSelect)(function(t){var n=t("core").getTaxonomy(e);return n?{taxonomy:n,current:t("core/editor").getEditedPostAttribute(n.rest_base),previous:t("core/editor").getCurrentPostAttribute(n.rest_base)}:{current:[],previous:[]}}),r=(0,react__WEBPACK_IMPORTED_MODULE_6__.useCallback)(function(e){try{var r;return Promise.resolve(n.taxonomy?t(((r={})[n.taxonomy.rest_base]=e,r)):void 0)}catch(e){return Promise.reject(e)}},[n,t]);return[n.current,r,n.previous]}
//# sourceMappingURL=index.module.js.map


/***/ }),

/***/ 7591:
/*!*********************************************!*\
  !*** ./js/src/components/ErrorBoundary.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ 7363);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globals/config */ 2279);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ 1368);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dompurify */ 5046);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_3__);




/**
 * Wrap any component in me, which may throw errors, and I will
 * prevent the entire UI from disappearing.
 *
 * Custom version special to Advanced Sidebar Menu with links to
 * support as well as debugging information.
 *
 * @link https://reactjs.org/docs/error-boundaries.html#introducing-error-boundaries
 */
class ErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }
  static getDerivedStateFromError() {
    // Update state, so the next render will show the fallback UI.
    return {
      hasError: true
    };
  }

  /**
   * Log information about the error when it happens.
   *
   * @notice Will log "Error: A cross-origin error was thrown. React doesn't have
   *         access to the actual error object in development" in React development
   *         mode but provides full error info in React production.
   */
  componentDidCatch(error, info) {
    console.log('%cError caught by the Advanced Sidebar ErrorBoundary!', 'color:orange; font-size: large; font-weight: bold');
    console.log(this.props);
    console.log(error);
    console.log(info);
    this.setState({
      error
    });
  }
  render() {
    if (this.state.hasError) {
      if (!_globals_config__WEBPACK_IMPORTED_MODULE_1__.CONFIG.siteInfo.scriptDebug) {
        return /*#__PURE__*/React.createElement("div", {
          className: 'components-panel__body is-opened'
        }, /*#__PURE__*/React.createElement("h4", {
          style: {
            color: 'red'
          }
        }, "Something went wrong!"), /*#__PURE__*/React.createElement("p", null, "Please ", /*#__PURE__*/React.createElement("a", {
          href: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_2__.addQueryArgs)((0,dompurify__WEBPACK_IMPORTED_MODULE_3__.sanitize)(window.location.href), {
            'script-debug': 'true'
          })
        }, "enable script debug"), " to retrieve error information."));
      }
      return /*#__PURE__*/React.createElement("div", {
        className: 'components-panel__body is-opened'
      }, /*#__PURE__*/React.createElement("h4", {
        style: {
          color: 'red'
        }
      }, "Something went wrong!"), /*#__PURE__*/React.createElement("p", null, "Please ", /*#__PURE__*/React.createElement("a", {
        target: "_blank",
        href: _globals_config__WEBPACK_IMPORTED_MODULE_1__.CONFIG.support,
        rel: "noreferrer"
      }, "create a support request"), " with the following:"), /*#__PURE__*/React.createElement("ol", null, /*#__PURE__*/React.createElement("li", null, "The ", /*#__PURE__*/React.createElement("a", {
        href: 'https://onpointplugins.com/how-to-retrieve-console-logs-from-your-browser/',
        target: '_blank',
        rel: "noreferrer"
      }, "logs from your browser console.")), /*#__PURE__*/React.createElement("li", null, "The following information.")), /*#__PURE__*/React.createElement("div", {
        style: {
          border: '2px groove',
          padding: '10px',
          width: '100%',
          overflowWrap: 'break-word'
        }
      }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("em", null, "Section")), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("code", null, this.props.section)), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("em", null, "Screen")), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("code", null, _globals_config__WEBPACK_IMPORTED_MODULE_1__.CONFIG.currentScreen)), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("em", null, "Message")), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("code", null, this.state.error?.message)), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("em", null, "Block")), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("code", null, this.props.block)), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("em", null, "Attributes")), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("code", null, JSON.stringify(this.props.attributes))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("em", null, "Site Info")), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("code", null, JSON.stringify(_globals_config__WEBPACK_IMPORTED_MODULE_1__.CONFIG.siteInfo))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, /*#__PURE__*/React.createElement("em", null, "Stack")), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("code", null, this.state.error?.stack))), /*#__PURE__*/React.createElement("p", null, "\xA0"), /*#__PURE__*/React.createElement("p", null, "\xA0"));
    }
    return this.props.children;
  }
}
/* harmony default export */ __webpack_exports__["default"] = (ErrorBoundary);

/***/ }),

/***/ 110:
/*!***********************************************!*\
  !*** ./js/src/components/TransformNotice.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DISMISS_KEY: function() { return /* binding */ DISMISS_KEY; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ 8003);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ 7363);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ 7537);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _transform_notice_pcss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transform-notice.pcss */ 2618);




const DISMISS_KEY = 'advanced-sidebar-menu/transform-notice-dismissed';

/**
 * Display a dismissible notice above widget forms to inform
 * users the widget may be transformed into a block.
 *
 * Only applies to legacy widgets which should theoretically
 * be phased out in favor of blocks.
 * This notice is intended to help facilitate the transition.
 *
 */
const TransformNotice = ({}) => {
  const [shown, setShown] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  if (!shown) {
    return null;
  }
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Notice, {
    className: _transform_notice_pcss__WEBPACK_IMPORTED_MODULE_3__["default"].wrap,
    politeness: 'polite',
    onDismiss: () => {
      setShown(false);
      localStorage.setItem(DISMISS_KEY, '1');
    },
    actions: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Blocks are the future of Advanced Sidebar Menu.', 'advanced-sidebar-menu'),
      url: 'https://onpointplugins.com/advanced-sidebar-menu/advanced-sidebar-menu-gutenberg-blocks/#transform-widgets-to-blocks',
      variant: 'link'
    }]
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-arrow-up-alt"
  }), "\xA0", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('This widget may be transformed into a block.', 'advanced-sidebar-menu'));
};
/* harmony default export */ __webpack_exports__["default"] = (TransformNotice);

/***/ }),

/***/ 2279:
/*!**********************************!*\
  !*** ./js/src/globals/config.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONFIG: function() { return /* binding */ CONFIG; }
/* harmony export */ });
const CONFIG = window.ADVANCED_SIDEBAR_MENU;

/***/ }),

/***/ 9946:
/*!***************************************!*\
  !*** ./js/src/gutenberg/SideLoad.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ 7537);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ 3284);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ 8085);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);



let firstClientId = '';
/**
 * The customizer area does not include a `PluginArea` component,
 * so our slot fills do not load.
 *
 * We can use filters, but the Fills double up each time
 * another block is added to the page.
 *
 * Track the clientId of the first block we add the Fill to
 * and only return the Fill for that block. The rest of the blocks
 * inherit the Fill from the first block via their Slots.
 */
const SideLoad = ({
  clientId,
  children
}) => {
  if (!(0,lodash__WEBPACK_IMPORTED_MODULE_2__.isEmpty)(firstClientId) && clientId !== firstClientId) {
    // Make sure block still exists.
    if (-1 !== (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.select)('core/block-editor').getBlockIndex(firstClientId)) {
      return null;
    }
  }
  firstClientId = clientId;
  return children ?? null;
};
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.withFilters)('advanced-sidebar-menu.blocks.side-load')(SideLoad));

/***/ }),

/***/ 9607:
/*!*********************************************!*\
  !*** ./js/src/gutenberg/blocks/Display.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/esnext.iterator.map.js */ 1432);
/* harmony import */ var core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ 7537);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _globals_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../globals/config */ 2279);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ 8003);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ 8085);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_string_replace__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-string-replace */ 7129);
/* harmony import */ var react_string_replace__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_string_replace__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/ErrorBoundary */ 7591);







const checkboxes = {
  /* translators: Selected taxonomy single label */
  include_parent: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Display highest level parent %s', 'advanced-sidebar-menu'),
  /* translators: Selected taxonomy single label */
  include_childless_parent: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Display menu when there is only the parent %s', 'advanced-sidebar-menu'),
  /* translators: Selected taxonomy plural label */
  display_all: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Always display child %s', 'advanced-sidebar-menu')
};

/**
 * Display Options shared between widgets.
 *
 * 1. Display the highest level parent page.
 * 2. Display menu when there is only the parent page.
 * 3. Always display child pages.
 * 5. Display levels of child pages.
 *
 */
const Display = ({
  attributes,
  setAttributes,
  type,
  name,
  clientId,
  children
}) => {
  const showLevels = _globals_config__WEBPACK_IMPORTED_MODULE_2__.CONFIG.blocks.pages.id === name && _globals_config__WEBPACK_IMPORTED_MODULE_2__.CONFIG.isPro || attributes.display_all;
  const fillProps = {
    type,
    attributes,
    name,
    setAttributes,
    clientId
  };
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Display', 'advanced-sidebar-menu')
  }, Object.keys(checkboxes).map(item => {
    let label = type?.labels?.singular_name.toLowerCase() ?? '';
    if ('display_all' === item) {
      label = type?.labels?.name.toLowerCase() ?? '';
    }
    return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
      key: item
      //eslint-disable-next-line @wordpress/valid-sprintf
      ,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(checkboxes[item], label),
      checked: !!attributes[item],
      onChange: checked => {
        setAttributes({
          [item]: checked
        });
      }
    });
  }), showLevels && /*#__PURE__*/React.createElement("div", {
    className: 'components-base-control'
  }, /* translators: {select html input}, {post type plural label} */
  react_string_replace__WEBPACK_IMPORTED_MODULE_5___default()((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Display %1$s levels of child %2$s', 'advanced-sidebar-menu').replace('%2$s', type?.labels?.name.toLowerCase() ?? ''), '%1$s', () => /*#__PURE__*/React.createElement("select", {
    key: 'levels',
    value: attributes.levels,
    onChange: ev => setAttributes({
      levels: parseInt(ev.target.value)
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: "100"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('- All -', 'advanced-sidebar-menu')), (0,lodash__WEBPACK_IMPORTED_MODULE_4__.range)(1, 10).map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: n
  }, n))))), children, /*#__PURE__*/React.createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_6__["default"], {
    attributes: attributes,
    block: name,
    section: 'Display/slots'
  }, _globals_config__WEBPACK_IMPORTED_MODULE_2__.CONFIG.blocks.pages.id === name && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Slot, {
    name: "advanced-sidebar-menu/pages/display",
    fillProps: fillProps
  }), _globals_config__WEBPACK_IMPORTED_MODULE_2__.CONFIG.blocks.categories.id === name && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Slot, {
    name: "advanced-sidebar-menu/categories/display",
    fillProps: fillProps
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (Display);

/***/ }),

/***/ 5438:
/*!**************************************************!*\
  !*** ./js/src/gutenberg/blocks/ExcludeField.tsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ 7537);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ 8003);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);


/**
 * The Exclude field shared between widgets.
 *
 * Removed and replaced via filter by the PRO version.
 */
const ExcludeField = ({
  type,
  attributes,
  setAttributes
}) => {
  const help = /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      //phpcs:ignore
      __html: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)( /* translators: 1: Opening anchor tag, 2: Closing anchor tag */
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('For more robust and intuitive exclusions use the %1$sPRO version%2$s.', 'advanced-sidebar-menu'), '<a href="https://onpointplugins.com/advanced-sidebar-menu/advanced-sidebar-menu-pro-widget-docs/advanced-sidebar-menu-pro-excluding-menu-items/?utm_source=exclude-field&utm_campaign=gopro&utm_medium=wp-dash" target="_blank">', '</a>')
    }
  });
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl
  /* translators: Selected post type plural label */, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('%s to exclude (ids, comma separated)', 'advanced-sidebar-menu'), type?.labels?.name ?? ''),
    value: attributes.exclude,
    help: help,
    onChange: value => {
      setAttributes({
        exclude: value
      });
    }
  });
};
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.withFilters)('advanced-sidebar-menu.blocks.exclude-field')(ExcludeField));

/***/ }),

/***/ 2038:
/*!***********************************************!*\
  !*** ./js/src/gutenberg/blocks/InfoPanel.tsx ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/esnext.iterator.map.js */ 1432);
/* harmony import */ var core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals/config */ 2279);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ 7537);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ 78);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/html-entities */ 8496);
/* harmony import */ var _wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ 8003);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _info_panel_pcss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./info-panel.pcss */ 8833);







const titleStyles = {
  color: '#3db634',
  fontWeight: 700
};
const headingStyles = {
  margin: '16px 0 0',
  fontSize: '1.2em'
};
const InfoPanel = ({}) => {
  return /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody
  // @ts-ignore -- @todo remove ignore on next update of @types.
  , {
    title: /*#__PURE__*/React.createElement("span", {
      style: titleStyles
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Go PRO', 'advanced-sidebar-menu')),
    className: _info_panel_pcss__WEBPACK_IMPORTED_MODULE_6__["default"].wrap,
    initialOpen: false
  }, /*#__PURE__*/React.createElement("h2", {
    style: headingStyles
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Advanced Sidebar Menu PRO', 'advanced-sidebar-menu')), /*#__PURE__*/React.createElement("ul", null, _globals_config__WEBPACK_IMPORTED_MODULE_1__.CONFIG.features.map(feature => /*#__PURE__*/React.createElement("li", {
    key: feature
  }, (0,_wordpress_html_entities__WEBPACK_IMPORTED_MODULE_4__.decodeEntities)(feature))), /*#__PURE__*/React.createElement("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('And so much more…', 'advanced-sidebar-menu'))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    className: _info_panel_pcss__WEBPACK_IMPORTED_MODULE_6__["default"].button,
    href: 'https://onpointplugins.com/product/advanced-sidebar-menu-pro/?utm_source=block-upgrade&utm_campaign=gopro&utm_medium=wp-dash#buy-now-choices',
    target: '_blank',
    rel: 'noreferrer',
    isPrimary: true
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Upgrade', 'advanced-sidebar-menu'))));
};
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.withFilters)('advanced-sidebar-menu.blocks.info-panel')(InfoPanel));

/***/ }),

/***/ 6630:
/*!*********************************************!*\
  !*** ./js/src/gutenberg/blocks/Preview.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sanitizeClientId: function() { return /* binding */ sanitizeClientId; }
/* harmony export */ });
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ 7073);
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_esnext_iterator_find_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/esnext.iterator.find.js */ 7839);
/* harmony import */ var core_js_modules_esnext_iterator_find_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_find_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ 7363);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _globals_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../globals/config */ 2279);
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/server-side-render */ 3882);
/* harmony import */ var _wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ 7537);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/block-editor */ 78);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! dompurify */ 5046);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/hooks */ 7031);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/i18n */ 8003);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/data */ 3284);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../helpers */ 8317);
/* harmony import */ var _preview_pcss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./preview.pcss */ 6691);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ 5311);
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }













/**
 * Sanitize a client id for use as an HTML id.
 *
 * Must not start with a `-` or a digit.
 *
 */
const sanitizeClientId = clientId => {
  return clientId.replace(/^([\d-])/, '_$1');
};

/**
 * If we are in the widgets' area, the block is wrapped in
 * a "sidebar" block. We retrieve the id to pass along with
 * the request to use the `widget_args` within the preview.
 *
 */
const getSidebarId = clientId => {
  if (!(0,_helpers__WEBPACK_IMPORTED_MODULE_11__.isScreen)(['widgets'])) {
    return '';
  }
  const rootId = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.select)('core/block-editor').getBlockRootClientId(clientId);
  if (rootId) {
    const ParentBlock = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_10__.select)('core/block-editor').getBlocksByClientId([rootId]);
    if (ParentBlock[0] && 'core/widget-area' === ParentBlock[0].name) {
      return ParentBlock[0]?.attributes?.id;
    }
  }
  return '';
};

/**
 * @notice Must use static constants, or the ServerSide requests
 *         will fire anytime something on the page is changed
 *         because the component re-renders.
 */
const Page = () => /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Placeholder, {
  className: _preview_pcss__WEBPACK_IMPORTED_MODULE_12__["default"].placeholder,
  icon: 'welcome-widgets-menus',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__.__)('Advanced Sidebar - Pages', 'advanced-sidebar-menu'),
  instructions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__.__)('No preview available', 'advanced-sidebar-menu')
});
const Category = () => /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Placeholder, {
  className: _preview_pcss__WEBPACK_IMPORTED_MODULE_12__["default"].placeholder,
  icon: 'welcome-widgets-menus',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__.__)('Advanced Sidebar - Categories', 'advanced-sidebar-menu'),
  instructions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__.__)('No preview available', 'advanced-sidebar-menu')
});
const Navigation = () => /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Placeholder, {
  className: _preview_pcss__WEBPACK_IMPORTED_MODULE_12__["default"].placeholder,
  icon: 'welcome-widgets-menus',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__.__)('Advanced Sidebar - Navigation', 'advanced-sidebar-menu'),
  instructions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__.__)('No preview available', 'advanced-sidebar-menu')
});

/**
 * @notice The styles will not display for the preview
 *         in the block inserter sidebar when Webpack
 *         is enabled because the iframe has a late init.
 *
 */
const placeholder = block => {
  switch (block) {
    case _globals_config__WEBPACK_IMPORTED_MODULE_3__.CONFIG.blocks.pages.id:
      return Page;
    case _globals_config__WEBPACK_IMPORTED_MODULE_3__.CONFIG.blocks.categories.id:
      return Category;
    case _globals_config__WEBPACK_IMPORTED_MODULE_3__.CONFIG.blocks.navigation?.id:
      return Navigation;
  }
  return () => /*#__PURE__*/React.createElement(React.Fragment, null);
};

/**
 * Same as the `DefaultLoadingResponsePlaceholder` except we trigger
 * an action when the loading component is unmounted to allow
 * components to hook into when ServerSideRender has finished loading.
 *
 * @notice Using a constant to prevent reload on every content change.
 *
 */
const TriggerWhenLoadingFinished = ({
  children,
  attributes = {
    clientId: ''
  }
}) => {
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    // Call action when the loading component unmounts because loading is finished.
    return () => {
      // Give the preview a chance to load on WP 5.8.
      setTimeout(() => {
        $('[data-preview="' + `${attributes.clientId}` + '"]').find('a').on('click', ev => ev.preventDefault());
        (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_8__.doAction)('advanced-sidebar-menu.blocks.preview.loading-finished', {
          values: attributes,
          clientId: attributes.clientId
        });
      }, 100);
    };
  });

  /**
   * ServerSideRender returns a <RawHTML /> filled with an error object when fetch fails.
   *
   * We throw an error, so our `ErrorBoundary` will catch it, otherwise we end up
   * with a "React objects may not be used as children" error, which means nothing.
   */
  if (children?.props?.children?.errorMsg) {
    throw new Error(children?.props?.children?.errorMsg ?? 'Failed');
  }
  return /*#__PURE__*/React.createElement("div", {
    className: _preview_pcss__WEBPACK_IMPORTED_MODULE_12__["default"].spinWrap
  }, /*#__PURE__*/React.createElement("div", {
    className: _preview_pcss__WEBPACK_IMPORTED_MODULE_12__["default"].spin
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Spinner, null)), /*#__PURE__*/React.createElement("div", {
    className: _preview_pcss__WEBPACK_IMPORTED_MODULE_12__["default"].spinContent
  }, children));
};
const Preview = ({
  attributes,
  block,
  clientId
}) => {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.useBlockProps)();
  if ('' !== _globals_config__WEBPACK_IMPORTED_MODULE_3__.CONFIG.error) {
    return /*#__PURE__*/React.createElement("div", {
      className: _preview_pcss__WEBPACK_IMPORTED_MODULE_12__["default"].error,
      dangerouslySetInnerHTML: {
        __html: (0,dompurify__WEBPACK_IMPORTED_MODULE_7__.sanitize)(_globals_config__WEBPACK_IMPORTED_MODULE_3__.CONFIG.error)
      }
    });
  }
  const sanitizedClientId = sanitizeClientId(clientId);

  // Prevent styles from doubling up as they are already added via render in PHP.
  delete blockProps.style;
  return /*#__PURE__*/React.createElement("div", _extends({}, blockProps, {
    "data-preview": sanitizedClientId
  }), /*#__PURE__*/React.createElement((_wordpress_server_side_render__WEBPACK_IMPORTED_MODULE_4___default()), {
    EmptyResponsePlaceholder: placeholder(block),
    LoadingResponsePlaceholder: TriggerWhenLoadingFinished,
    attributes: {
      ...attributes,
      // Send custom attribute to determine server side renders.
      isServerSideRenderRequest: true,
      clientId: sanitizedClientId,
      sidebarId: getSidebarId(clientId)
    },
    block: block,
    httpMethod: 'POST'
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (Preview);

/***/ }),

/***/ 6949:
/*!*****************************************************!*\
  !*** ./js/src/gutenberg/blocks/categories/Edit.tsx ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/esnext.iterator.map.js */ 1432);
/* harmony import */ var core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ 3284);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _globals_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../globals/config */ 2279);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! dompurify */ 5046);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ 78);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Preview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Preview */ 6630);
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./block */ 833);
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/ErrorBoundary */ 7591);
/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Display */ 9607);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/components */ 7537);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/i18n */ 8003);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _InfoPanel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../InfoPanel */ 2038);
/* harmony import */ var _SideLoad__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../SideLoad */ 9946);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../helpers */ 8317);
/* harmony import */ var _pages_edit_pcss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../pages/edit.pcss */ 1753);
/* harmony import */ var _ExcludeField__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../ExcludeField */ 5438);
















const Edit = ({
  attributes,
  setAttributes,
  clientId,
  name
}) => {
  const taxonomy = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    const type = select('core').getTaxonomy(attributes.taxonomy ?? 'category');
    return type ?? select('core').getTaxonomy('category');
  }, [attributes.taxonomy]);

  // We have a version conflict or license error.
  if ('' !== _globals_config__WEBPACK_IMPORTED_MODULE_2__.CONFIG.error) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, null, /*#__PURE__*/React.createElement("div", {
      className: _pages_edit_pcss__WEBPACK_IMPORTED_MODULE_14__["default"].error,
      dangerouslySetInnerHTML: {
        __html: (0,dompurify__WEBPACK_IMPORTED_MODULE_3__.sanitize)(_globals_config__WEBPACK_IMPORTED_MODULE_2__.CONFIG.error)
      }
    })), /*#__PURE__*/React.createElement(_Preview__WEBPACK_IMPORTED_MODULE_5__["default"], {
      attributes: attributes,
      block: _block__WEBPACK_IMPORTED_MODULE_6__.block.id,
      clientId: clientId
    }));
  }
  const fillProps = {
    type: taxonomy,
    attributes,
    name,
    setAttributes,
    clientId
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, null, (0,_helpers__WEBPACK_IMPORTED_MODULE_13__.isScreen)(['widgets', 'site-editor', 'customize']) && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.PanelBody, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.TextControl, {
    value: attributes.title ?? '',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__.__)('Title', 'advanced-sidebar-menu'),
    onChange: title => setAttributes({
      title
    })
  })), /*#__PURE__*/React.createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_7__["default"], {
    attributes: attributes,
    block: name,
    section: 'categories/Edit/general'
  }, /*#__PURE__*/React.createElement(_Display__WEBPACK_IMPORTED_MODULE_8__["default"], {
    attributes: attributes,
    clientId: clientId,
    name: name,
    setAttributes: setAttributes,
    type: taxonomy
  }, (0,_helpers__WEBPACK_IMPORTED_MODULE_13__.isScreen)(['post']) && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.CheckboxControl
  /* translators: Selected taxonomy plural label */, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__.__)('Display %s on single posts', 'advanced-sidebar-menu'), taxonomy?.labels?.name.toLowerCase() ?? ''),
    checked: attributes.single,
    onChange: value => {
      setAttributes({
        single: value
      });
    }
  }), (0,_helpers__WEBPACK_IMPORTED_MODULE_13__.isScreen)(['widgets', 'customize']) && attributes.single && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.SelectControl, {
    /* translators: Selected taxonomy single label */
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__.__)('Display each single post\'s %s', 'advanced-sidebar-menu'), taxonomy?.labels?.name.toLowerCase() ?? ''),
    value: attributes.new_widget,
    options: Object.keys(_globals_config__WEBPACK_IMPORTED_MODULE_2__.CONFIG.categories.displayEach).map(key => ({
      value: key,
      label: _globals_config__WEBPACK_IMPORTED_MODULE_2__.CONFIG.categories.displayEach[key]
    }))
    /* eslint-disable-next-line camelcase */,
    onChange: new_widget => setAttributes({
      new_widget
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: 'components-panel__body is-opened'
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Slot, {
    name: "advanced-sidebar-menu/categories/general",
    fillProps: fillProps
  }), /*#__PURE__*/React.createElement(_ExcludeField__WEBPACK_IMPORTED_MODULE_15__["default"], {
    type: taxonomy,
    attributes: attributes,
    setAttributes: setAttributes
  }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: _globals_config__WEBPACK_IMPORTED_MODULE_2__.CONFIG.docs.category,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__.__)('block documentation', 'advanced-sidebar-menu'))))), /*#__PURE__*/React.createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_7__["default"], {
    attributes: attributes,
    block: name,
    section: 'categories/Edit/inspector'
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Slot, {
    name: "advanced-sidebar-menu/categories/inspector",
    fillProps: fillProps
  }))), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.BlockControls, null, /*#__PURE__*/React.createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_7__["default"], {
    attributes: attributes,
    block: name,
    section: 'categories/Edit/block-controls'
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_9__.Slot, {
    name: "advanced-sidebar-menu/categories/block-controls",
    fillProps: fillProps
  }))), /*#__PURE__*/React.createElement(_InfoPanel__WEBPACK_IMPORTED_MODULE_11__["default"], {
    clientId: clientId
  }), /*#__PURE__*/React.createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_7__["default"], {
    attributes: attributes,
    block: name,
    section: 'categories/Edit/preview'
  }, /*#__PURE__*/React.createElement(_Preview__WEBPACK_IMPORTED_MODULE_5__["default"], {
    attributes: attributes,
    block: _block__WEBPACK_IMPORTED_MODULE_6__.block.id,
    clientId: clientId
  })), /*#__PURE__*/React.createElement(_SideLoad__WEBPACK_IMPORTED_MODULE_12__["default"], {
    clientId: clientId
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (Edit);

/***/ }),

/***/ 833:
/*!******************************************************!*\
  !*** ./js/src/gutenberg/blocks/categories/block.tsx ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   block: function() { return /* binding */ block; },
/* harmony export */   name: function() { return /* binding */ name; },
/* harmony export */   settings: function() { return /* binding */ settings; }
/* harmony export */ });
/* harmony import */ var _globals_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../globals/config */ 2279);
/* harmony import */ var _Edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit */ 6949);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers */ 8317);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ 8003);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);





/**
 * Attributes specific to the widget as well as shared
 * widget attributes.
 *
 * @see \Advanced_Sidebar_Menu\Blocks\Block_Abstract::get_all_attributes
 * @see \Advanced_Sidebar_Menu\Blocks\Pages::get_attributes
 */

// Options used by basic when available from PRO.

/**
 * Attributes used for the example preview.
 * Combines some PRO and basic attributes.
 * The PRO attributes will only be sent if PRO is active.
 */
const EXAMPLE = {
  'display-posts': 'all',
  'display-posts/limit': 2,
  apply_current_page_parent_styles_to_parent: true,
  apply_current_page_styles_to_parent: true,
  block_style: true,
  border: true,
  border_color: '#333',
  bullet_style: 'none',
  child_page_bg_color: '#666',
  child_page_color: '#fff',
  parent_page_bg_color: '#282828',
  parent_page_color: '#0cc4c6',
  parent_page_font_weight: 'normal',
  display_all: true,
  grandchild_page_bg_color: '#989898',
  grandchild_page_color: '#282828',
  grandchild_page_font_weight: 'bold',
  include_childless_parent: true,
  include_parent: true,
  levels: 2
};
const block = _globals_config__WEBPACK_IMPORTED_MODULE_0__.CONFIG.blocks.categories;
const name = block.id;
const settings = {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Advanced Sidebar - Categories', 'advanced-sidebar-menu'),
  icon: 'welcome-widgets-menus',
  category: 'widgets',
  example: {
    attributes: EXAMPLE
  },
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/legacy-widget'],
      isMatch: ({
        idBase,
        instance
      }) => {
        if (!instance?.raw) {
          // Can't transform if raw instance is not shown in REST API.
          return false;
        }
        return 'advanced_sidebar_menu_category' === idBase;
      },
      transform: (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.transformLegacyWidget)(name)
    }]
  },
  // `attributes` are registered server side because we use ServerSideRender.
  // `supports` are registered server side for easy overrides.
  edit: props => /*#__PURE__*/React.createElement(_Edit__WEBPACK_IMPORTED_MODULE_1__["default"], props),
  save: () => null,
  apiVersion: 2
};

/***/ }),

/***/ 4305:
/*!************************************************!*\
  !*** ./js/src/gutenberg/blocks/pages/Edit.tsx ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/esnext.iterator.map.js */ 1432);
/* harmony import */ var core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_map_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ 78);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ 7537);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block */ 3146);
/* harmony import */ var _Preview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Preview */ 6630);
/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Display */ 9607);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ 3284);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _InfoPanel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../InfoPanel */ 2038);
/* harmony import */ var _globals_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../globals/config */ 2279);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! dompurify */ 5046);
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/i18n */ 8003);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../components/ErrorBoundary */ 7591);
/* harmony import */ var _SideLoad__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../SideLoad */ 9946);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../helpers */ 8317);
/* harmony import */ var _edit_pcss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./edit.pcss */ 1753);
/* harmony import */ var _ExcludeField__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../ExcludeField */ 5438);
















/**
 * Pages block content in the editor.
 */
const Edit = ({
  attributes,
  setAttributes,
  clientId,
  name
}) => {
  const postType = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => {
    const type = select('core').getPostType(attributes.post_type ?? 'page');
    return type ?? select('core').getPostType('page');
  }, [attributes.post_type]);

  // We have a version conflict or license error.
  if ('' !== _globals_config__WEBPACK_IMPORTED_MODULE_8__.CONFIG.error) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, /*#__PURE__*/React.createElement("div", {
      className: _edit_pcss__WEBPACK_IMPORTED_MODULE_14__["default"].error,
      dangerouslySetInnerHTML: {
        __html: (0,dompurify__WEBPACK_IMPORTED_MODULE_9__.sanitize)(_globals_config__WEBPACK_IMPORTED_MODULE_8__.CONFIG.error)
      }
    })), /*#__PURE__*/React.createElement(_Preview__WEBPACK_IMPORTED_MODULE_4__["default"], {
      attributes: attributes,
      block: _block__WEBPACK_IMPORTED_MODULE_3__.block.id,
      clientId: clientId
    }));
  }
  const fillProps = {
    type: postType,
    attributes,
    name,
    setAttributes,
    clientId
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,_helpers__WEBPACK_IMPORTED_MODULE_13__.isScreen)(['widgets', 'site-editor', 'customize']) && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
    value: attributes.title ?? '',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__.__)('Title', 'advanced-sidebar-menu'),
    onChange: title => setAttributes({
      title
    })
  })), /*#__PURE__*/React.createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_11__["default"], {
    attributes: attributes,
    block: name,
    section: 'pages/Edit/general'
  }, /*#__PURE__*/React.createElement(_Display__WEBPACK_IMPORTED_MODULE_5__["default"], {
    attributes: attributes,
    clientId: clientId,
    name: name,
    setAttributes: setAttributes,
    type: postType
  }), /*#__PURE__*/React.createElement("div", {
    className: 'components-panel__body is-opened'
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Slot, {
    name: "advanced-sidebar-menu/pages/general",
    fillProps: fillProps
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__.__)('Order by', 'advanced-sidebar-menu'),
    value: attributes.order_by,
    labelPosition: 'side',
    options: Object.entries(_globals_config__WEBPACK_IMPORTED_MODULE_8__.CONFIG.pages.orderBy).map(([value, label]) => ({
      value,
      label
    })),
    onChange: value => {
      setAttributes({
        order_by: value
      });
    }
  }), /*#__PURE__*/React.createElement(_ExcludeField__WEBPACK_IMPORTED_MODULE_15__["default"], {
    type: postType,
    attributes: attributes,
    setAttributes: setAttributes
  }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: _globals_config__WEBPACK_IMPORTED_MODULE_8__.CONFIG.docs.page,
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_10__.__)('block documentation', 'advanced-sidebar-menu'))))), /*#__PURE__*/React.createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_11__["default"], {
    attributes: attributes,
    block: name,
    section: 'pages/Edit/inspector'
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Slot, {
    name: "advanced-sidebar-menu/pages/inspector",
    fillProps: fillProps
  }))), /*#__PURE__*/React.createElement(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, null, /*#__PURE__*/React.createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_11__["default"], {
    attributes: attributes,
    block: name,
    section: 'pages/Edit/block-controls'
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Slot, {
    name: "advanced-sidebar-menu/pages/block-controls",
    fillProps: fillProps
  }))), /*#__PURE__*/React.createElement(_InfoPanel__WEBPACK_IMPORTED_MODULE_7__["default"], {
    clientId: clientId
  }), /*#__PURE__*/React.createElement(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_11__["default"], {
    attributes: attributes,
    block: name,
    section: 'pages/Edit/preview'
  }, /*#__PURE__*/React.createElement(_Preview__WEBPACK_IMPORTED_MODULE_4__["default"], {
    attributes: attributes,
    block: _block__WEBPACK_IMPORTED_MODULE_3__.block.id,
    clientId: clientId
  })), /*#__PURE__*/React.createElement(_SideLoad__WEBPACK_IMPORTED_MODULE_12__["default"], {
    clientId: clientId
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (Edit);

/***/ }),

/***/ 3146:
/*!*************************************************!*\
  !*** ./js/src/gutenberg/blocks/pages/block.tsx ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   block: function() { return /* binding */ block; },
/* harmony export */   name: function() { return /* binding */ name; },
/* harmony export */   settings: function() { return /* binding */ settings; }
/* harmony export */ });
/* harmony import */ var _globals_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../globals/config */ 2279);
/* harmony import */ var _Edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit */ 4305);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helpers */ 8317);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ 8003);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);





/**
 * Attributes specific to the widget as well as shared
 * widget attributes.
 *
 * @see \Advanced_Sidebar_Menu\Blocks\Block_Abstract::get_all_attributes
 * @see \Advanced_Sidebar_Menu\Blocks\Pages::get_attributes
 */

// Options used by basic when available from PRO.

/**
 * Attributes used for the example preview.
 * Combines some PRO and basic attributes.
 * The PRO attributes will only be sent if PRO is active.
 */
const EXAMPLE = {
  apply_current_page_parent_styles_to_parent: true,
  apply_current_page_styles_to_parent: true,
  block_style: true,
  border: true,
  border_color: '#333',
  bullet_style: 'none',
  child_page_bg_color: '#666',
  child_page_color: '#fff',
  current_page_bg_color: '#282828',
  current_page_color: '#0cc4c6',
  current_page_font_weight: 'normal',
  current_page_parent_bg_color: '#333',
  display_all: true,
  grandchild_page_bg_color: '#989898',
  grandchild_page_color: '#282828',
  grandchild_page_font_weight: 'bold',
  include_childless_parent: true,
  include_parent: true,
  levels: 2,
  parent_page_bg_color: '#666',
  parent_page_color: '#fff'
};
const block = _globals_config__WEBPACK_IMPORTED_MODULE_0__.CONFIG.blocks.pages;
const name = block.id;
const settings = {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Advanced Sidebar - Pages', 'advanced-sidebar-menu'),
  icon: 'welcome-widgets-menus',
  category: 'widgets',
  example: {
    attributes: EXAMPLE
  },
  transforms: {
    from: [{
      type: 'block',
      blocks: ['core/legacy-widget'],
      isMatch: ({
        idBase,
        instance
      }) => {
        if (!instance?.raw) {
          // Can't transform if raw instance is not shown in REST API.
          return false;
        }
        return 'advanced_sidebar_menu' === idBase;
      },
      transform: (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.transformLegacyWidget)(name)
    }]
  },
  // `attributes` are registered server side because we use ServerSideRender.
  // `supports` are registered server side for easy overrides.
  edit: props => /*#__PURE__*/React.createElement(_Edit__WEBPACK_IMPORTED_MODULE_1__["default"], props),
  save: () => null,
  apiVersion: 2
};

/***/ }),

/***/ 8317:
/*!*************************************!*\
  !*** ./js/src/gutenberg/helpers.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isScreen: function() { return /* binding */ isScreen; },
/* harmony export */   transformLegacyWidget: function() { return /* binding */ transformLegacyWidget; }
/* harmony export */ });
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ 7073);
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ 8229);
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/blocks */ 378);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _globals_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../globals/config */ 2279);




/**
 * Are we on one of the provided screens?
 */
const isScreen = screens => {
  return screens.includes(_globals_config__WEBPACK_IMPORTED_MODULE_3__.CONFIG.currentScreen);
};

/**
 * Transform a legacy widget to the matching block.
 *
 */
const transformLegacyWidget = name => ({
  instance
}) => {
  return (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_2__.createBlock)(name, translateLegacyWidget(instance.raw));
};

/**
 * Translate the widget's "checked" to the boolean
 * version used in the block.
 *
 */
const translateLegacyWidget = settings => {
  Object.entries(settings).forEach(([key, value]) => {
    if ('checked' === value) {
      settings[key] = true;
    }
    if ('object' === typeof value) {
      translateLegacyWidget(settings[key]);
    }
    // Old widgets used to use "0" for some defaults.
    if ('0' === value) {
      delete settings[key];
    }
  });
  return settings;
};

/***/ }),

/***/ 8435:
/*!***********************************!*\
  !*** ./js/src/gutenberg/index.ts ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lipemat_js_boilerplate_gutenberg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lipemat/js-boilerplate-gutenberg */ 962);
/* harmony import */ var _blocks_Preview__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks/Preview */ 6630);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ 8317);
/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ErrorBoundary */ 7591);
/* module decorator */ module = __webpack_require__.hmd(module);





/**
 * Use our custom autoloader to automatically require,
 * register and add HMR support to Gutenberg related items.
 *
 * Will load from specified directory recursively.
 */
/* harmony default export */ __webpack_exports__["default"] = (() => {
  // Load all blocks
  (0,_lipemat_js_boilerplate_gutenberg__WEBPACK_IMPORTED_MODULE_3__.autoloadBlocks)(() => __webpack_require__(85), module);

  // Expose helpers and Preview component to window, so we can use them in PRO.
  window.ADVANCED_SIDEBAR_MENU.ErrorBoundary = _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_2__["default"];
  window.ADVANCED_SIDEBAR_MENU.Preview = _blocks_Preview__WEBPACK_IMPORTED_MODULE_0__["default"];
  window.ADVANCED_SIDEBAR_MENU.transformLegacyWidget = _helpers__WEBPACK_IMPORTED_MODULE_1__.transformLegacyWidget;
});

/***/ }),

/***/ 9642:
/*!************************************!*\
  !*** ./js/src/modules/widgets.tsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/esnext.iterator.constructor.js */ 7073);
/* harmony import */ var core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/esnext.iterator.for-each.js */ 8229);
/* harmony import */ var core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom */ 1533);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_TransformNotice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/TransformNotice */ 110);
/* harmony import */ var _globals_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../globals/config */ 2279);
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ 5311);





function renderTransformNotice() {
  // Only render on the block based widgets screen.
  if (_globals_config__WEBPACK_IMPORTED_MODULE_4__.CONFIG.siteInfo.classicWidgets) {
    return;
  }
  // Don't render if the user has dismissed the notice.
  if ('1' === localStorage.getItem(_components_TransformNotice__WEBPACK_IMPORTED_MODULE_3__.DISMISS_KEY)) {
    return;
  }
  const placeholders = document.querySelectorAll('[data-js="advanced-sidebar-menu/transform-notice"]');

  /**
   * This is not a priority component, so it anything fails
   * we fail silently.
   */
  try {
    placeholders.forEach(placeholder => {
      // eslint-disable-next-line -- Still using React 17 on some WP versions.
      react_dom__WEBPACK_IMPORTED_MODULE_2___default().render( /*#__PURE__*/React.createElement(_components_TransformNotice__WEBPACK_IMPORTED_MODULE_3__["default"], null), placeholder);
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * Modern JS for legacy widgets on the widgets screen.
 *
 * @see resources/js/advanced-sidebar-menu.js for the legacy JS.
 */
/* harmony default export */ __webpack_exports__["default"] = (() => {
  // Only load on the widgets screen.
  if ('1' !== _globals_config__WEBPACK_IMPORTED_MODULE_4__.CONFIG.isWidgets) {
    return;
  }
  // Fire when each widget loads.
  jQuery(document).on('widget-added', function () {
    renderTransformNotice();
  });
});

/***/ }),

/***/ 2618:
/*!*************************************************!*\
  !*** ./js/src/components/transform-notice.pcss ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"wrap":"transform-notice__wrap__mq"});

/***/ }),

/***/ 8833:
/*!*************************************************!*\
  !*** ./js/src/gutenberg/blocks/info-panel.pcss ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"wrap":"info-panel__wrap__k_","button":"info-panel__button__Fg"});

/***/ }),

/***/ 1753:
/*!*************************************************!*\
  !*** ./js/src/gutenberg/blocks/pages/edit.pcss ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"error":"edit__error__lZ"});

/***/ }),

/***/ 6691:
/*!**********************************************!*\
  !*** ./js/src/gutenberg/blocks/preview.pcss ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"placeholder":"preview__placeholder__HI","error":"preview__error__Nl","spin-wrap":"preview__spin-wrap__o0","spinWrap":"preview__spin-wrap__o0","spin":"preview__spin__Oj","spin-content":"preview__spin-content__uC","spinContent":"preview__spin-content__uC"});

/***/ }),

/***/ 9634:
/*!***************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/a-callable.js ***!
  \***************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ 8965);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 5539:
/*!****************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/an-instance.js ***!
  \****************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ 2233);

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw new $TypeError('Incorrect invocation');
};


/***/ }),

/***/ 1270:
/*!**************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/an-object.js ***!
  \**************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(/*! ../internals/is-object */ 1955);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 5399:
/*!*******************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/array-includes.js ***!
  \*******************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ 143);
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ 2841);
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ 4298);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 1242:
/*!*************************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \*************************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ 1270);
var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ 4317);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ 5669:
/*!****************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/classof-raw.js ***!
  \****************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 5540);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 4906:
/*!************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/classof.js ***!
  \************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ 8112);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ 5669);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 6093);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 5762:
/*!********************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/copy-constructor-properties.js ***!
  \********************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 9198);
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ 9232);
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ 1805);
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ 6008);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 2827:
/*!*****************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/correct-prototype-getter.js ***!
  \*****************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ 1509);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 134:
/*!******************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/create-iter-result-object.js ***!
  \******************************************************************************************************************************/
/***/ (function(module) {

"use strict";

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};


/***/ }),

/***/ 2625:
/*!***********************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \***********************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 9906);
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ 6008);
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ 4381);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 4381:
/*!*******************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/create-property-descriptor.js ***!
  \*******************************************************************************************************************************/
/***/ (function(module) {

"use strict";

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 6933:
/*!********************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/define-built-in.js ***!
  \********************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ 6008);
var makeBuiltIn = __webpack_require__(/*! ../internals/make-built-in */ 907);
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ 2172);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 1307:
/*!*********************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/define-built-ins.js ***!
  \*********************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ 6933);

module.exports = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ 2172:
/*!***************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/define-global-property.js ***!
  \***************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ 3560);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 9906:
/*!****************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/descriptors.js ***!
  \****************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ 1509);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ 9422:
/*!*****************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/document-all.js ***!
  \*****************************************************************************************************************/
/***/ (function(module) {

"use strict";

var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),

/***/ 1281:
/*!****************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/document-create-element.js ***!
  \****************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ 3560);
var isObject = __webpack_require__(/*! ../internals/is-object */ 1955);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 5396:
/*!**********************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/engine-user-agent.js ***!
  \**********************************************************************************************************************/
/***/ (function(module) {

"use strict";

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ 9127:
/*!**********************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/engine-v8-version.js ***!
  \**********************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ 3560);
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ 5396);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 5771:
/*!******************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/enum-bug-keys.js ***!
  \******************************************************************************************************************/
/***/ (function(module) {

"use strict";

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 8487:
/*!***********************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/export.js ***!
  \***********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ 3560);
var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ 1805).f);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ 2625);
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ 6933);
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ 2172);
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ 5762);
var isForced = __webpack_require__(/*! ../internals/is-forced */ 8336);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 1509:
/*!**********************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/fails.js ***!
  \**********************************************************************************************************/
/***/ (function(module) {

"use strict";

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 3595:
/*!**************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/function-bind-context.js ***!
  \**************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ 3898);
var aCallable = __webpack_require__(/*! ../internals/a-callable */ 9634);
var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ 36);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 36:
/*!*************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/function-bind-native.js ***!
  \*************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ 1509);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 9208:
/*!******************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/function-call.js ***!
  \******************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ 36);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 3707:
/*!******************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/function-name.js ***!
  \******************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 9906);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 9198);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 3898:
/*!*********************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/function-uncurry-this-clause.js ***!
  \*********************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ 5669);
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 5540);

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ 5540:
/*!**************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/function-uncurry-this.js ***!
  \**************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ 36);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 9281:
/*!*****************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/get-built-in.js ***!
  \*****************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ 3560);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 4615:
/*!************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/get-iterator-direct.js ***!
  \************************************************************************************************************************/
/***/ (function(module) {

"use strict";

// `GetIteratorDirect(obj)` abstract operation
// https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
module.exports = function (obj) {
  return {
    iterator: obj,
    next: obj.next,
    done: false
  };
};


/***/ }),

/***/ 3602:
/*!************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/get-iterator-method.js ***!
  \************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(/*! ../internals/classof */ 4906);
var getMethod = __webpack_require__(/*! ../internals/get-method */ 271);
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ 3570);
var Iterators = __webpack_require__(/*! ../internals/iterators */ 9084);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 6093);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ 2576:
/*!*****************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/get-iterator.js ***!
  \*****************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(/*! ../internals/function-call */ 9208);
var aCallable = __webpack_require__(/*! ../internals/a-callable */ 9634);
var anObject = __webpack_require__(/*! ../internals/an-object */ 1270);
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ 8965);
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ 3602);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw new $TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ 271:
/*!***************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/get-method.js ***!
  \***************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var aCallable = __webpack_require__(/*! ../internals/a-callable */ 9634);
var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ 3570);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 3560:
/*!***********************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/global.js ***!
  \***********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || this || Function('return this')();


/***/ }),

/***/ 9198:
/*!*********************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/has-own-property.js ***!
  \*********************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 5540);
var toObject = __webpack_require__(/*! ../internals/to-object */ 9421);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3424:
/*!****************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/hidden-keys.js ***!
  \****************************************************************************************************************/
/***/ (function(module) {

"use strict";

module.exports = {};


/***/ }),

/***/ 834:
/*!*********************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/html.js ***!
  \*********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ 9281);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 2334:
/*!*******************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/ie8-dom-define.js ***!
  \*******************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 9906);
var fails = __webpack_require__(/*! ../internals/fails */ 1509);
var createElement = __webpack_require__(/*! ../internals/document-create-element */ 1281);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ 9565:
/*!*******************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/indexed-object.js ***!
  \*******************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 5540);
var fails = __webpack_require__(/*! ../internals/fails */ 1509);
var classof = __webpack_require__(/*! ../internals/classof-raw */ 5669);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 5400:
/*!*******************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/inspect-source.js ***!
  \*******************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 5540);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);
var store = __webpack_require__(/*! ../internals/shared-store */ 4218);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 9720:
/*!*******************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/internal-state.js ***!
  \*******************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/weak-map-basic-detection */ 5545);
var global = __webpack_require__(/*! ../internals/global */ 3560);
var isObject = __webpack_require__(/*! ../internals/is-object */ 1955);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ 2625);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 9198);
var shared = __webpack_require__(/*! ../internals/shared-store */ 4218);
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ 7166);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ 3424);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 7465:
/*!*****************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/is-array-iterator-method.js ***!
  \*****************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 6093);
var Iterators = __webpack_require__(/*! ../internals/iterators */ 9084);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 442:
/*!****************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/is-callable.js ***!
  \****************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $documentAll = __webpack_require__(/*! ../internals/document-all */ 9422);

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 8336:
/*!**************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/is-forced.js ***!
  \**************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ 1509);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 3570:
/*!*************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/is-null-or-undefined.js ***!
  \*************************************************************************************************************************/
/***/ (function(module) {

"use strict";

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 1955:
/*!**************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/is-object.js ***!
  \**************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);
var $documentAll = __webpack_require__(/*! ../internals/document-all */ 9422);

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 8114:
/*!************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/is-pure.js ***!
  \************************************************************************************************************/
/***/ (function(module) {

"use strict";

module.exports = false;


/***/ }),

/***/ 4687:
/*!**************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/is-symbol.js ***!
  \**************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ 9281);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ 2233);
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ 9346);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 5931:
/*!************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/iterate.js ***!
  \************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__(/*! ../internals/function-bind-context */ 3595);
var call = __webpack_require__(/*! ../internals/function-call */ 9208);
var anObject = __webpack_require__(/*! ../internals/an-object */ 1270);
var tryToString = __webpack_require__(/*! ../internals/try-to-string */ 8965);
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ 7465);
var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ 4298);
var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ 2233);
var getIterator = __webpack_require__(/*! ../internals/get-iterator */ 2576);
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ 3602);
var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ 4317);

var $TypeError = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),

/***/ 4317:
/*!*******************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/iterator-close.js ***!
  \*******************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(/*! ../internals/function-call */ 9208);
var anObject = __webpack_require__(/*! ../internals/an-object */ 1270);
var getMethod = __webpack_require__(/*! ../internals/get-method */ 271);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ 6302:
/*!**************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/iterator-create-proxy.js ***!
  \**************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(/*! ../internals/function-call */ 9208);
var create = __webpack_require__(/*! ../internals/object-create */ 8890);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ 2625);
var defineBuiltIns = __webpack_require__(/*! ../internals/define-built-ins */ 1307);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 6093);
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ 9720);
var getMethod = __webpack_require__(/*! ../internals/get-method */ 271);
var IteratorPrototype = (__webpack_require__(/*! ../internals/iterators-core */ 4365).IteratorPrototype);
var createIterResultObject = __webpack_require__(/*! ../internals/create-iter-result-object */ 134);
var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ 4317);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ITERATOR_HELPER = 'IteratorHelper';
var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
var setInternalState = InternalStateModule.set;

var createIteratorProxyPrototype = function (IS_ITERATOR) {
  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

  return defineBuiltIns(create(IteratorPrototype), {
    next: function next() {
      var state = getInternalState(this);
      // for simplification:
      //   for `%WrapForValidIteratorPrototype%.next` our `nextHandler` returns `IterResultObject`
      //   for `%IteratorHelperPrototype%.next` - just a value
      if (IS_ITERATOR) return state.nextHandler();
      try {
        var result = state.done ? undefined : state.nextHandler();
        return createIterResultObject(result, state.done);
      } catch (error) {
        state.done = true;
        throw error;
      }
    },
    'return': function () {
      var state = getInternalState(this);
      var iterator = state.iterator;
      state.done = true;
      if (IS_ITERATOR) {
        var returnMethod = getMethod(iterator, 'return');
        return returnMethod ? call(returnMethod, iterator) : createIterResultObject(undefined, true);
      }
      if (state.inner) try {
        iteratorClose(state.inner.iterator, 'normal');
      } catch (error) {
        return iteratorClose(iterator, 'throw', error);
      }
      iteratorClose(iterator, 'normal');
      return createIterResultObject(undefined, true);
    }
  });
};

var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
var IteratorHelperPrototype = createIteratorProxyPrototype(false);

createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

module.exports = function (nextHandler, IS_ITERATOR) {
  var IteratorProxy = function Iterator(record, state) {
    if (state) {
      state.iterator = record.iterator;
      state.next = record.next;
    } else state = record;
    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
    state.nextHandler = nextHandler;
    state.counter = 0;
    state.done = false;
    setInternalState(this, state);
  };

  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

  return IteratorProxy;
};


/***/ }),

/***/ 2243:
/*!*****************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/iterator-map.js ***!
  \*****************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(/*! ../internals/function-call */ 9208);
var aCallable = __webpack_require__(/*! ../internals/a-callable */ 9634);
var anObject = __webpack_require__(/*! ../internals/an-object */ 1270);
var getIteratorDirect = __webpack_require__(/*! ../internals/get-iterator-direct */ 4615);
var createIteratorProxy = __webpack_require__(/*! ../internals/iterator-create-proxy */ 6302);
var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ 1242);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var result = anObject(call(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
});

// `Iterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
module.exports = function map(mapper) {
  anObject(this);
  aCallable(mapper);
  return new IteratorProxy(getIteratorDirect(this), {
    mapper: mapper
  });
};


/***/ }),

/***/ 4365:
/*!*******************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/iterators-core.js ***!
  \*******************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ 1509);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);
var isObject = __webpack_require__(/*! ../internals/is-object */ 1955);
var create = __webpack_require__(/*! ../internals/object-create */ 8890);
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ 8123);
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ 6933);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 6093);
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 8114);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 9084:
/*!**************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/iterators.js ***!
  \**************************************************************************************************************/
/***/ (function(module) {

"use strict";

module.exports = {};


/***/ }),

/***/ 4298:
/*!*************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/length-of-array-like.js ***!
  \*************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toLength = __webpack_require__(/*! ../internals/to-length */ 6725);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 907:
/*!******************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/make-built-in.js ***!
  \******************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 5540);
var fails = __webpack_require__(/*! ../internals/fails */ 1509);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 9198);
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 9906);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(/*! ../internals/function-name */ 3707).CONFIGURABLE);
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ 5400);
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ 9720);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 2598:
/*!***************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/math-trunc.js ***!
  \***************************************************************************************************************/
/***/ (function(module) {

"use strict";

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 8890:
/*!******************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/object-create.js ***!
  \******************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(/*! ../internals/an-object */ 1270);
var definePropertiesModule = __webpack_require__(/*! ../internals/object-define-properties */ 1986);
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ 5771);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ 3424);
var html = __webpack_require__(/*! ../internals/html */ 834);
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ 1281);
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ 7166);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 1986:
/*!*****************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/object-define-properties.js ***!
  \*****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 9906);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ 4501);
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ 6008);
var anObject = __webpack_require__(/*! ../internals/an-object */ 1270);
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ 143);
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ 8211);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 6008:
/*!***************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/object-define-property.js ***!
  \***************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 9906);
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ 2334);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ 4501);
var anObject = __webpack_require__(/*! ../internals/an-object */ 1270);
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ 9122);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1805:
/*!***************************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \***************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 9906);
var call = __webpack_require__(/*! ../internals/function-call */ 9208);
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ 9598);
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ 4381);
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ 143);
var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ 9122);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 9198);
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ 2334);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 3497:
/*!**********************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/object-get-own-property-names.js ***!
  \**********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ 4101);
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ 5771);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 6436:
/*!************************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 8123:
/*!****************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/object-get-prototype-of.js ***!
  \****************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 9198);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);
var toObject = __webpack_require__(/*! ../internals/to-object */ 9421);
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ 7166);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ 2827);

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 2233:
/*!***************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/object-is-prototype-of.js ***!
  \***************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 5540);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 4101:
/*!*************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/object-keys-internal.js ***!
  \*************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 5540);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 9198);
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ 143);
var indexOf = (__webpack_require__(/*! ../internals/array-includes */ 5399).indexOf);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ 3424);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 8211:
/*!****************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/object-keys.js ***!
  \****************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ 4101);
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ 5771);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 9598:
/*!**********************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \**********************************************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 360:
/*!**************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/ordinary-to-primitive.js ***!
  \**************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(/*! ../internals/function-call */ 9208);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);
var isObject = __webpack_require__(/*! ../internals/is-object */ 1955);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 9232:
/*!*************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/own-keys.js ***!
  \*************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ 9281);
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 5540);
var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ 3497);
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ 6436);
var anObject = __webpack_require__(/*! ../internals/an-object */ 1270);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 1350:
/*!*****************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/require-object-coercible.js ***!
  \*****************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ 3570);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 7166:
/*!***************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/shared-key.js ***!
  \***************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var shared = __webpack_require__(/*! ../internals/shared */ 357);
var uid = __webpack_require__(/*! ../internals/uid */ 9450);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 4218:
/*!*****************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/shared-store.js ***!
  \*****************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ 3560);
var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ 2172);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 357:
/*!***********************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/shared.js ***!
  \***********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 8114);
var store = __webpack_require__(/*! ../internals/shared-store */ 4218);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.33.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.33.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 944:
/*!*********************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/symbol-constructor-detection.js ***!
  \*********************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ 9127);
var fails = __webpack_require__(/*! ../internals/fails */ 1509);
var global = __webpack_require__(/*! ../internals/global */ 3560);

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 2841:
/*!**********************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/to-absolute-index.js ***!
  \**********************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ 185);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 143:
/*!**********************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/to-indexed-object.js ***!
  \**********************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ 9565);
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ 1350);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 185:
/*!***************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/to-integer-or-infinity.js ***!
  \***************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var trunc = __webpack_require__(/*! ../internals/math-trunc */ 2598);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 6725:
/*!**************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/to-length.js ***!
  \**************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ 185);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 9421:
/*!**************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/to-object.js ***!
  \**************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ 1350);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 4826:
/*!*****************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/to-primitive.js ***!
  \*****************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var call = __webpack_require__(/*! ../internals/function-call */ 9208);
var isObject = __webpack_require__(/*! ../internals/is-object */ 1955);
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ 4687);
var getMethod = __webpack_require__(/*! ../internals/get-method */ 271);
var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ 360);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 6093);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 9122:
/*!********************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/to-property-key.js ***!
  \********************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ 4826);
var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ 4687);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 8112:
/*!**************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/to-string-tag-support.js ***!
  \**************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 6093);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 8965:
/*!******************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/try-to-string.js ***!
  \******************************************************************************************************************/
/***/ (function(module) {

"use strict";

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9450:
/*!********************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/uid.js ***!
  \********************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ 5540);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 9346:
/*!**********************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \**********************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ 944);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 4501:
/*!****************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/v8-prototype-define-bug.js ***!
  \****************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ 9906);
var fails = __webpack_require__(/*! ../internals/fails */ 1509);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ 5545:
/*!*****************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/weak-map-basic-detection.js ***!
  \*****************************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ 3560);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 6093:
/*!**********************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/internals/well-known-symbol.js ***!
  \**********************************************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ 3560);
var shared = __webpack_require__(/*! ../internals/shared */ 357);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 9198);
var uid = __webpack_require__(/*! ../internals/uid */ 9450);
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ 944);
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ 9346);

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 7073:
/*!******************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/modules/esnext.iterator.constructor.js ***!
  \******************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ 8487);
var global = __webpack_require__(/*! ../internals/global */ 3560);
var anInstance = __webpack_require__(/*! ../internals/an-instance */ 5539);
var isCallable = __webpack_require__(/*! ../internals/is-callable */ 442);
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ 8123);
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ 2625);
var fails = __webpack_require__(/*! ../internals/fails */ 1509);
var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ 9198);
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ 6093);
var IteratorPrototype = (__webpack_require__(/*! ../internals/iterators-core */ 4365).IteratorPrototype);
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 8114);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var $TypeError = TypeError;
var NativeIterator = global.Iterator;

// FF56- have non-standard global helper `Iterator`
var FORCED = IS_PURE
  || !isCallable(NativeIterator)
  || NativeIterator.prototype !== IteratorPrototype
  // FF44- non-standard `Iterator` passes previous tests
  || !fails(function () { NativeIterator({}); });

var IteratorConstructor = function Iterator() {
  anInstance(this, IteratorPrototype);
  if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable');
};

if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) {
  createNonEnumerableProperty(IteratorPrototype, TO_STRING_TAG, 'Iterator');
}

if (FORCED || !hasOwn(IteratorPrototype, 'constructor') || IteratorPrototype.constructor === Object) {
  createNonEnumerableProperty(IteratorPrototype, 'constructor', IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype;

// `Iterator` constructor
// https://github.com/tc39/proposal-iterator-helpers
$({ global: true, constructor: true, forced: FORCED }, {
  Iterator: IteratorConstructor
});


/***/ }),

/***/ 7839:
/*!***********************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/modules/esnext.iterator.find.js ***!
  \***********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ 8487);
var iterate = __webpack_require__(/*! ../internals/iterate */ 5931);
var aCallable = __webpack_require__(/*! ../internals/a-callable */ 9634);
var anObject = __webpack_require__(/*! ../internals/an-object */ 1270);
var getIteratorDirect = __webpack_require__(/*! ../internals/get-iterator-direct */ 4615);

// `Iterator.prototype.find` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true }, {
  find: function find(predicate) {
    anObject(this);
    aCallable(predicate);
    var record = getIteratorDirect(this);
    var counter = 0;
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop(value);
    }, { IS_RECORD: true, INTERRUPTED: true }).result;
  }
});


/***/ }),

/***/ 8229:
/*!***************************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/modules/esnext.iterator.for-each.js ***!
  \***************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ 8487);
var iterate = __webpack_require__(/*! ../internals/iterate */ 5931);
var aCallable = __webpack_require__(/*! ../internals/a-callable */ 9634);
var anObject = __webpack_require__(/*! ../internals/an-object */ 1270);
var getIteratorDirect = __webpack_require__(/*! ../internals/get-iterator-direct */ 4615);

// `Iterator.prototype.forEach` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    anObject(this);
    aCallable(fn);
    var record = getIteratorDirect(this);
    var counter = 0;
    iterate(record, function (value) {
      fn(value, counter++);
    }, { IS_RECORD: true });
  }
});


/***/ }),

/***/ 1432:
/*!**********************************************************************************************************************!*\
  !*** ./.yarn/cache/core-js-npm-3.33.0-44b65b93c9-dd62217935.zip/node_modules/core-js/modules/esnext.iterator.map.js ***!
  \**********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ 8487);
var map = __webpack_require__(/*! ../internals/iterator-map */ 2243);
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ 8114);

// `Iterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
  map: map
});


/***/ }),

/***/ 5046:
/*!*********************************************************************************************************!*\
  !*** ./.yarn/cache/dompurify-npm-3.0.6-7fc9c1bb20-e5c6cdc5fe.zip/node_modules/dompurify/dist/purify.js ***!
  \*********************************************************************************************************/
/***/ (function(module) {

/*! @license DOMPurify 3.0.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.6/LICENSE */

(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  const {
    entries,
    setPrototypeOf,
    isFrozen,
    getPrototypeOf,
    getOwnPropertyDescriptor
  } = Object;
  let {
    freeze,
    seal,
    create
  } = Object; // eslint-disable-line import/no-mutable-exports

  let {
    apply,
    construct
  } = typeof Reflect !== 'undefined' && Reflect;

  if (!freeze) {
    freeze = function freeze(x) {
      return x;
    };
  }

  if (!seal) {
    seal = function seal(x) {
      return x;
    };
  }

  if (!apply) {
    apply = function apply(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }

  if (!construct) {
    construct = function construct(Func, args) {
      return new Func(...args);
    };
  }

  const arrayForEach = unapply(Array.prototype.forEach);
  const arrayPop = unapply(Array.prototype.pop);
  const arrayPush = unapply(Array.prototype.push);
  const stringToLowerCase = unapply(String.prototype.toLowerCase);
  const stringToString = unapply(String.prototype.toString);
  const stringMatch = unapply(String.prototype.match);
  const stringReplace = unapply(String.prototype.replace);
  const stringIndexOf = unapply(String.prototype.indexOf);
  const stringTrim = unapply(String.prototype.trim);
  const regExpTest = unapply(RegExp.prototype.test);
  const typeErrorCreate = unconstruct(TypeError);
  /**
   * Creates a new function that calls the given function with a specified thisArg and arguments.
   *
   * @param {Function} func - The function to be wrapped and called.
   * @returns {Function} A new function that calls the given function with a specified thisArg and arguments.
   */

  function unapply(func) {
    return function (thisArg) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return apply(func, thisArg, args);
    };
  }
  /**
   * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
   *
   * @param {Function} func - The constructor function to be wrapped and called.
   * @returns {Function} A new function that constructs an instance of the given constructor function with the provided arguments.
   */


  function unconstruct(func) {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return construct(func, args);
    };
  }
  /**
   * Add properties to a lookup table
   *
   * @param {Object} set - The set to which elements will be added.
   * @param {Array} array - The array containing elements to be added to the set.
   * @param {Function} transformCaseFunc - An optional function to transform the case of each element before adding to the set.
   * @returns {Object} The modified set with added elements.
   */


  function addToSet(set, array) {
    let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;

    if (setPrototypeOf) {
      // Make 'in' and truthy checks like Boolean(set.constructor)
      // independent of any properties defined on Object.prototype.
      // Prevent prototype setters from intercepting set as a this value.
      setPrototypeOf(set, null);
    }

    let l = array.length;

    while (l--) {
      let element = array[l];

      if (typeof element === 'string') {
        const lcElement = transformCaseFunc(element);

        if (lcElement !== element) {
          // Config presets (e.g. tags.js, attrs.js) are immutable.
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }

          element = lcElement;
        }
      }

      set[element] = true;
    }

    return set;
  }
  /**
   * Shallow clone an object
   *
   * @param {Object} object - The object to be cloned.
   * @returns {Object} A new object that copies the original.
   */


  function clone(object) {
    const newObject = create(null);

    for (const [property, value] of entries(object)) {
      if (getOwnPropertyDescriptor(object, property) !== undefined) {
        newObject[property] = value;
      }
    }

    return newObject;
  }
  /**
   * This method automatically checks if the prop is function or getter and behaves accordingly.
   *
   * @param {Object} object - The object to look up the getter function in its prototype chain.
   * @param {String} prop - The property name for which to find the getter function.
   * @returns {Function} The getter function found in the prototype chain or a fallback function.
   */

  function lookupGetter(object, prop) {
    while (object !== null) {
      const desc = getOwnPropertyDescriptor(object, prop);

      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }

        if (typeof desc.value === 'function') {
          return unapply(desc.value);
        }
      }

      object = getPrototypeOf(object);
    }

    function fallbackValue(element) {
      console.warn('fallback value for', element);
      return null;
    }

    return fallbackValue;
  }

  const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']); // SVG

  const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
  const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']); // List of SVG elements that are disallowed by default.
  // We still need to know them so that we can do namespace
  // checks properly in case one wants to add them to
  // allow-list.

  const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
  const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']); // Similarly to SVG, we want to know all MathML elements,
  // even those that we disallow by default.

  const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
  const text = freeze(['#text']);

  const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot']);
  const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
  const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
  const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

  const MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm); // Specify template detection regex for SAFE_FOR_TEMPLATES mode

  const ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
  const TMPLIT_EXPR = seal(/\${[\w\W]*}/gm);
  const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/); // eslint-disable-line no-useless-escape

  const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape

  const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
  );
  const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
  );
  const DOCTYPE_NAME = seal(/^html$/i);

  var EXPRESSIONS = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MUSTACHE_EXPR: MUSTACHE_EXPR,
    ERB_EXPR: ERB_EXPR,
    TMPLIT_EXPR: TMPLIT_EXPR,
    DATA_ATTR: DATA_ATTR,
    ARIA_ATTR: ARIA_ATTR,
    IS_ALLOWED_URI: IS_ALLOWED_URI,
    IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA,
    ATTR_WHITESPACE: ATTR_WHITESPACE,
    DOCTYPE_NAME: DOCTYPE_NAME
  });

  const getGlobal = function getGlobal() {
    return typeof window === 'undefined' ? null : window;
  };
  /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param {?TrustedTypePolicyFactory} trustedTypes The policy factory.
   * @param {HTMLScriptElement} purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
   * @return {?TrustedTypePolicy} The policy created (or null, if Trusted Types
   * are not supported or creating the policy failed).
   */


  const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
    if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
      return null;
    } // Allow the callers to control the unique policy name
    // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
    // Policy creation with duplicate names throws in Trusted Types.


    let suffix = null;
    const ATTR_NAME = 'data-tt-policy-suffix';

    if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
      suffix = purifyHostElement.getAttribute(ATTR_NAME);
    }

    const policyName = 'dompurify' + (suffix ? '#' + suffix : '');

    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML(html) {
          return html;
        },

        createScriptURL(scriptUrl) {
          return scriptUrl;
        }

      });
    } catch (_) {
      // Policy creation failed (most likely another DOMPurify script has
      // already run). Skip creating the policy, as this will only cause errors
      // if TT are enforced.
      console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
      return null;
    }
  };

  function createDOMPurify() {
    let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();

    const DOMPurify = root => createDOMPurify(root);
    /**
     * Version label, exposed for easier checks
     * if DOMPurify is up to date or not
     */


    DOMPurify.version = '3.0.6';
    /**
     * Array of elements that DOMPurify removed during sanitation.
     * Empty if nothing was removed.
     */

    DOMPurify.removed = [];

    if (!window || !window.document || window.document.nodeType !== 9) {
      // Not running in a browser, provide a factory function
      // so that you can pass your own Window
      DOMPurify.isSupported = false;
      return DOMPurify;
    }

    let {
      document
    } = window;
    const originalDocument = document;
    const currentScript = originalDocument.currentScript;
    const {
      DocumentFragment,
      HTMLTemplateElement,
      Node,
      Element,
      NodeFilter,
      NamedNodeMap = window.NamedNodeMap || window.MozNamedAttrMap,
      HTMLFormElement,
      DOMParser,
      trustedTypes
    } = window;
    const ElementPrototype = Element.prototype;
    const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
    const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
    const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
    const getParentNode = lookupGetter(ElementPrototype, 'parentNode'); // As per issue #47, the web-components registry is inherited by a
    // new document created via createHTMLDocument. As per the spec
    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
    // a new empty registry is used when creating a template contents owner
    // document, so we use that as our parent document to ensure nothing
    // is inherited.

    if (typeof HTMLTemplateElement === 'function') {
      const template = document.createElement('template');

      if (template.content && template.content.ownerDocument) {
        document = template.content.ownerDocument;
      }
    }

    let trustedTypesPolicy;
    let emptyHTML = '';
    const {
      implementation,
      createNodeIterator,
      createDocumentFragment,
      getElementsByTagName
    } = document;
    const {
      importNode
    } = originalDocument;
    let hooks = {};
    /**
     * Expose whether this browser supports running the full DOMPurify.
     */

    DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
    const {
      MUSTACHE_EXPR,
      ERB_EXPR,
      TMPLIT_EXPR,
      DATA_ATTR,
      ARIA_ATTR,
      IS_SCRIPT_OR_DATA,
      ATTR_WHITESPACE
    } = EXPRESSIONS;
    let {
      IS_ALLOWED_URI: IS_ALLOWED_URI$1
    } = EXPRESSIONS;
    /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */

    /* allowed element names */

    let ALLOWED_TAGS = null;
    const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
    /* Allowed attribute names */

    let ALLOWED_ATTR = null;
    const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
    /*
     * Configure how DOMPUrify should handle custom elements and their attributes as well as customized built-in elements.
     * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
     * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
     * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
     */

    let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));
    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */

    let FORBID_TAGS = null;
    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */

    let FORBID_ATTR = null;
    /* Decide if ARIA attributes are okay */

    let ALLOW_ARIA_ATTR = true;
    /* Decide if custom data attributes are okay */

    let ALLOW_DATA_ATTR = true;
    /* Decide if unknown protocols are okay */

    let ALLOW_UNKNOWN_PROTOCOLS = false;
    /* Decide if self-closing tags in attributes are allowed.
     * Usually removed due to a mXSS issue in jQuery 3.0 */

    let ALLOW_SELF_CLOSE_IN_ATTR = true;
    /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */

    let SAFE_FOR_TEMPLATES = false;
    /* Decide if document with <html>... should be returned */

    let WHOLE_DOCUMENT = false;
    /* Track whether config is already set on this instance of DOMPurify. */

    let SET_CONFIG = false;
    /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */

    let FORCE_BODY = false;
    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */

    let RETURN_DOM = false;
    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */

    let RETURN_DOM_FRAGMENT = false;
    /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */

    let RETURN_TRUSTED_TYPE = false;
    /* Output should be free from DOM clobbering attacks?
     * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
     */

    let SANITIZE_DOM = true;
    /* Achieve full DOM Clobbering protection by isolating the namespace of named
     * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
     *
     * HTML/DOM spec rules that enable DOM Clobbering:
     *   - Named Access on Window (§7.3.3)
     *   - DOM Tree Accessors (§3.1.5)
     *   - Form Element Parent-Child Relations (§4.10.3)
     *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
     *   - HTMLCollection (§4.2.10.2)
     *
     * Namespace isolation is implemented by prefixing `id` and `name` attributes
     * with a constant string, i.e., `user-content-`
     */

    let SANITIZE_NAMED_PROPS = false;
    const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
    /* Keep element content when removing element? */

    let KEEP_CONTENT = true;
    /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */

    let IN_PLACE = false;
    /* Allow usage of profiles like html, svg and mathMl */

    let USE_PROFILES = {};
    /* Tags to ignore content of when KEEP_CONTENT is true */

    let FORBID_CONTENTS = null;
    const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
    /* Tags that are safe for data: URIs */

    let DATA_URI_TAGS = null;
    const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
    /* Attributes safe for values like "javascript:" */

    let URI_SAFE_ATTRIBUTES = null;
    const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
    const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
    const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
    /* Document namespace */

    let NAMESPACE = HTML_NAMESPACE;
    let IS_EMPTY_INPUT = false;
    /* Allowed XHTML+XML namespaces */

    let ALLOWED_NAMESPACES = null;
    const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
    /* Parsing of strict XHTML documents */

    let PARSER_MEDIA_TYPE = null;
    const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
    const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
    let transformCaseFunc = null;
    /* Keep a reference to config to pass to hooks */

    let CONFIG = null;
    /* Ideally, do not touch anything below this line */

    /* ______________________________________________ */

    const formElement = document.createElement('form');

    const isRegexOrFunction = function isRegexOrFunction(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };
    /**
     * _parseConfig
     *
     * @param  {Object} cfg optional config literal
     */
    // eslint-disable-next-line complexity


    const _parseConfig = function _parseConfig() {
      let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (CONFIG && CONFIG === cfg) {
        return;
      }
      /* Shield configuration object from tampering */


      if (!cfg || typeof cfg !== 'object') {
        cfg = {};
      }
      /* Shield configuration object from prototype pollution */


      cfg = clone(cfg);
      PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
      SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE; // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.

      transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
      /* Set configuration parameters */

      ALLOWED_TAGS = 'ALLOWED_TAGS' in cfg ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = 'ALLOWED_ATTR' in cfg ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      ALLOWED_NAMESPACES = 'ALLOWED_NAMESPACES' in cfg ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
      URI_SAFE_ATTRIBUTES = 'ADD_URI_SAFE_ATTR' in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), // eslint-disable-line indent
      cfg.ADD_URI_SAFE_ATTR, // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = 'ADD_DATA_URI_TAGS' in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), // eslint-disable-line indent
      cfg.ADD_DATA_URI_TAGS, // eslint-disable-line indent
      transformCaseFunc // eslint-disable-line indent
      ) // eslint-disable-line indent
      : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = 'FORBID_CONTENTS' in cfg ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = 'FORBID_TAGS' in cfg ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : {};
      FORBID_ATTR = 'FORBID_ATTR' in cfg ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : {};
      USE_PROFILES = 'USE_PROFILES' in cfg ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true

      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true

      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false

      ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true

      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false

      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false

      RETURN_DOM = cfg.RETURN_DOM || false; // Default false

      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false

      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false

      FORCE_BODY = cfg.FORCE_BODY || false; // Default false

      SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true

      SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false

      KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true

      IN_PLACE = cfg.IN_PLACE || false; // Default false

      IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
      NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
      CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};

      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
      }

      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
      }

      if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === 'boolean') {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
      }

      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }

      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }
      /* Parse profile info */


      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, [...text]);
        ALLOWED_ATTR = [];

        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }

        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }

        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }
      /* Merge configuration parameters */


      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }

        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }

      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }

        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }

      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
      }

      if (cfg.FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }

        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
      }
      /* Add #text in case KEEP_CONTENT is set to true */


      if (KEEP_CONTENT) {
        ALLOWED_TAGS['#text'] = true;
      }
      /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */


      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
      }
      /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */


      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ['tbody']);
        delete FORBID_TAGS.tbody;
      }

      if (cfg.TRUSTED_TYPES_POLICY) {
        if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        }

        if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        } // Overwrite existing TrustedTypes policy.


        trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY; // Sign local variables required by `sanitize`.

        emptyHTML = trustedTypesPolicy.createHTML('');
      } else {
        // Uninitialized policy, attempt to initialize the internal dompurify policy.
        if (trustedTypesPolicy === undefined) {
          trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
        } // If creating the internal policy succeeded sign internal variables.


        if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') {
          emptyHTML = trustedTypesPolicy.createHTML('');
        }
      } // Prevent further manipulation of configuration.
      // Not available in IE8, Safari 5, etc.


      if (freeze) {
        freeze(cfg);
      }

      CONFIG = cfg;
    };

    const MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
    const HTML_INTEGRATION_POINTS = addToSet({}, ['foreignobject', 'desc', 'title', 'annotation-xml']); // Certain elements are allowed in both SVG and HTML
    // namespace. We need to specify them explicitly
    // so that they don't get erroneously deleted from
    // HTML namespace.

    const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
    /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */

    const ALL_SVG_TAGS = addToSet({}, svg$1);
    addToSet(ALL_SVG_TAGS, svgFilters);
    addToSet(ALL_SVG_TAGS, svgDisallowed);
    const ALL_MATHML_TAGS = addToSet({}, mathMl$1);
    addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
    /**
     * @param  {Element} element a DOM element whose namespace is being checked
     * @returns {boolean} Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */

    const _checkValidNamespace = function _checkValidNamespace(element) {
      let parent = getParentNode(element); // In JSDOM, if we're inside shadow DOM, then parentNode
      // can be null. We just simulate parent in this case.

      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: NAMESPACE,
          tagName: 'template'
        };
      }

      const tagName = stringToLowerCase(element.tagName);
      const parentTagName = stringToLowerCase(parent.tagName);

      if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
        return false;
      }

      if (element.namespaceURI === SVG_NAMESPACE) {
        // The only way to switch from HTML namespace to SVG
        // is via <svg>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'svg';
        } // The only way to switch from MathML to SVG is via`
        // svg if parent is either <annotation-xml> or MathML
        // text integration points.


        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        } // We only allow elements that are defined in SVG
        // spec. All others are disallowed in SVG namespace.


        return Boolean(ALL_SVG_TAGS[tagName]);
      }

      if (element.namespaceURI === MATHML_NAMESPACE) {
        // The only way to switch from HTML namespace to MathML
        // is via <math>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'math';
        } // The only way to switch from SVG to MathML is via
        // <math> and HTML integration points


        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
        } // We only allow elements that are defined in MathML
        // spec. All others are disallowed in MathML namespace.


        return Boolean(ALL_MATHML_TAGS[tagName]);
      }

      if (element.namespaceURI === HTML_NAMESPACE) {
        // The only way to switch from SVG to HTML is via
        // HTML integration points, and from MathML to HTML
        // is via MathML text integration points
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }

        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        } // We disallow tags that are specific for MathML
        // or SVG and should never appear in HTML namespace


        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      } // For XHTML and XML documents that support custom namespaces


      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
        return true;
      } // The code should never reach this place (this means
      // that the element somehow got namespace that is not
      // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
      // Return false just in case.


      return false;
    };
    /**
     * _forceRemove
     *
     * @param  {Node} node a DOM node
     */


    const _forceRemove = function _forceRemove(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });

      try {
        // eslint-disable-next-line unicorn/prefer-dom-node-remove
        node.parentNode.removeChild(node);
      } catch (_) {
        node.remove();
      }
    };
    /**
     * _removeAttribute
     *
     * @param  {String} name an Attribute name
     * @param  {Node} node a DOM node
     */


    const _removeAttribute = function _removeAttribute(name, node) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: node.getAttributeNode(name),
          from: node
        });
      } catch (_) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: node
        });
      }

      node.removeAttribute(name); // We void attribute values for unremovable "is"" attributes

      if (name === 'is' && !ALLOWED_ATTR[name]) {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(node);
          } catch (_) {}
        } else {
          try {
            node.setAttribute(name, '');
          } catch (_) {}
        }
      }
    };
    /**
     * _initDocument
     *
     * @param  {String} dirty a string of dirty markup
     * @return {Document} a DOM, filled with the dirty markup
     */


    const _initDocument = function _initDocument(dirty) {
      /* Create a HTML document */
      let doc = null;
      let leadingWhitespace = null;

      if (FORCE_BODY) {
        dirty = '<remove></remove>' + dirty;
      } else {
        /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
        const matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }

      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
        // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
      }

      const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */

      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_) {}
      }
      /* Use createHTMLDocument in case DOMParser is not available */


      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, 'template', null);

        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
        } catch (_) {// Syntax error if dirtyPayload is invalid xml
        }
      }

      const body = doc.body || doc.documentElement;

      if (dirty && leadingWhitespace) {
        body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }
      /* Work on whole document or just its body */


      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
      }

      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };
    /**
     * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
     *
     * @param  {Node} root The root element or node to start traversing on.
     * @return {NodeIterator} The created NodeIterator
     */


    const _createNodeIterator = function _createNodeIterator(root) {
      return createNodeIterator.call(root.ownerDocument || root, root, // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null);
    };
    /**
     * _isClobbered
     *
     * @param  {Node} elm element to check for clobbering attacks
     * @return {Boolean} true if clobbered, false if safe
     */


    const _isClobbered = function _isClobbered(elm) {
      return elm instanceof HTMLFormElement && (typeof elm.nodeName !== 'string' || typeof elm.textContent !== 'string' || typeof elm.removeChild !== 'function' || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== 'function' || typeof elm.setAttribute !== 'function' || typeof elm.namespaceURI !== 'string' || typeof elm.insertBefore !== 'function' || typeof elm.hasChildNodes !== 'function');
    };
    /**
     * Checks whether the given object is a DOM node.
     *
     * @param  {Node} object object to check whether it's a DOM node
     * @return {Boolean} true is object is a DOM node
     */


    const _isNode = function _isNode(object) {
      return typeof Node === 'function' && object instanceof Node;
    };
    /**
     * _executeHook
     * Execute user configurable hooks
     *
     * @param  {String} entryPoint  Name of the hook's entry point
     * @param  {Node} currentNode node to work on with the hook
     * @param  {Object} data additional hook parameters
     */


    const _executeHook = function _executeHook(entryPoint, currentNode, data) {
      if (!hooks[entryPoint]) {
        return;
      }

      arrayForEach(hooks[entryPoint], hook => {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    };
    /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     *
     * @param   {Node} currentNode to check for permission to exist
     * @return  {Boolean} true if node was killed, false if left alive
     */


    const _sanitizeElements = function _sanitizeElements(currentNode) {
      let content = null;
      /* Execute a hook if present */

      _executeHook('beforeSanitizeElements', currentNode, null);
      /* Check if element is clobbered or can clobber */


      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Now let's check the element's type and name */


      const tagName = transformCaseFunc(currentNode.nodeName);
      /* Execute a hook if present */

      _executeHook('uponSanitizeElement', currentNode, {
        tagName,
        allowedTags: ALLOWED_TAGS
      });
      /* Detect mXSS attempts abusing namespace confusion */


      if (currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Remove element if anything forbids its presence */


      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        /* Check if we have a custom element to handle */
        if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
            return false;
          }

          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
            return false;
          }
        }
        /* Keep content except for bad-listed elements */


        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          const parentNode = getParentNode(currentNode) || currentNode.parentNode;
          const childNodes = getChildNodes(currentNode) || currentNode.childNodes;

          if (childNodes && parentNode) {
            const childCount = childNodes.length;

            for (let i = childCount - 1; i >= 0; --i) {
              parentNode.insertBefore(cloneNode(childNodes[i], true), getNextSibling(currentNode));
            }
          }
        }

        _forceRemove(currentNode);

        return true;
      }
      /* Check whether element has a valid namespace */


      if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Make sure that older browsers don't get fallback-tag mXSS */


      if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);

        return true;
      }
      /* Sanitize element content to be template-safe */


      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
        /* Get the element's text content */
        content = currentNode.textContent;
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          content = stringReplace(content, expr, ' ');
        });

        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeElements', currentNode, null);

      return false;
    };
    /**
     * _isValidAttribute
     *
     * @param  {string} lcTag Lowercase tag name of containing element.
     * @param  {string} lcName Lowercase attribute name.
     * @param  {string} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid, otherwise false.
     */
    // eslint-disable-next-line complexity


    const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
        return false;
      }
      /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */


      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR, lcName)) ; else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        if ( // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
          return false;
        }
        /* Check value is safe. First, is attr inert? If so, is safe */

      } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA, stringReplace(value, ATTR_WHITESPACE, ''))) ; else if (value) {
        return false;
      } else ;

      return true;
    };
    /**
     * _isBasicCustomElement
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     *
     * @param {string} tagName name of the tag of the node to sanitize
     * @returns {boolean} Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
     */


    const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
      return tagName.indexOf('-') > 0;
    };
    /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param  {Node} currentNode to sanitize
     */


    const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
      /* Execute a hook if present */
      _executeHook('beforeSanitizeAttributes', currentNode, null);

      const {
        attributes
      } = currentNode;
      /* Check if we have attributes; if not we might have a text node */

      if (!attributes) {
        return;
      }

      const hookEvent = {
        attrName: '',
        attrValue: '',
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR
      };
      let l = attributes.length;
      /* Go backwards over all attributes; safely remove bad ones */

      while (l--) {
        const attr = attributes[l];
        const {
          name,
          namespaceURI,
          value: attrValue
        } = attr;
        const lcName = transformCaseFunc(name);
        let value = name === 'value' ? attrValue : stringTrim(attrValue);
        /* Execute a hook if present */

        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set

        _executeHook('uponSanitizeAttribute', currentNode, hookEvent);

        value = hookEvent.attrValue;
        /* Did the hooks approve of the attribute? */

        if (hookEvent.forceKeepAttr) {
          continue;
        }
        /* Remove attribute */


        _removeAttribute(name, currentNode);
        /* Did the hooks approve of the attribute? */


        if (!hookEvent.keepAttr) {
          continue;
        }
        /* Work around a security issue in jQuery 3.0 */


        if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);

          continue;
        }
        /* Sanitize attribute content to be template-safe */


        if (SAFE_FOR_TEMPLATES) {
          arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
            value = stringReplace(value, expr, ' ');
          });
        }
        /* Is `value` valid for this attribute? */


        const lcTag = transformCaseFunc(currentNode.nodeName);

        if (!_isValidAttribute(lcTag, lcName, value)) {
          continue;
        }
        /* Full DOM Clobbering protection via namespace isolation,
         * Prefix id and name attributes with `user-content-`
         */


        if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name')) {
          // Remove the attribute with this value
          _removeAttribute(name, currentNode); // Prefix the value and later re-create the attribute with the sanitized value


          value = SANITIZE_NAMED_PROPS_PREFIX + value;
        }
        /* Handle attributes that require Trusted Types */


        if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
          if (namespaceURI) ; else {
            switch (trustedTypes.getAttributeType(lcTag, lcName)) {
              case 'TrustedHTML':
                {
                  value = trustedTypesPolicy.createHTML(value);
                  break;
                }

              case 'TrustedScriptURL':
                {
                  value = trustedTypesPolicy.createScriptURL(value);
                  break;
                }
            }
          }
        }
        /* Handle invalid data-* attribute set by try-catching it */


        try {
          if (namespaceURI) {
            currentNode.setAttributeNS(namespaceURI, name, value);
          } else {
            /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
            currentNode.setAttribute(name, value);
          }

          arrayPop(DOMPurify.removed);
        } catch (_) {}
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeAttributes', currentNode, null);
    };
    /**
     * _sanitizeShadowDOM
     *
     * @param  {DocumentFragment} fragment to iterate over recursively
     */


    const _sanitizeShadowDOM = function _sanitizeShadowDOM(fragment) {
      let shadowNode = null;

      const shadowIterator = _createNodeIterator(fragment);
      /* Execute a hook if present */


      _executeHook('beforeSanitizeShadowDOM', fragment, null);

      while (shadowNode = shadowIterator.nextNode()) {
        /* Execute a hook if present */
        _executeHook('uponSanitizeShadowNode', shadowNode, null);
        /* Sanitize tags and elements */


        if (_sanitizeElements(shadowNode)) {
          continue;
        }
        /* Deep shadow DOM detected */


        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(shadowNode.content);
        }
        /* Check attributes, sanitize if necessary */


        _sanitizeAttributes(shadowNode);
      }
      /* Execute a hook if present */


      _executeHook('afterSanitizeShadowDOM', fragment, null);
    };
    /**
     * Sanitize
     * Public method providing core sanitation functionality
     *
     * @param {String|Node} dirty string or DOM node
     * @param {Object} cfg object
     */
    // eslint-disable-next-line complexity


    DOMPurify.sanitize = function (dirty) {
      let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let body = null;
      let importedNode = null;
      let currentNode = null;
      let returnNode = null;
      /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */

      IS_EMPTY_INPUT = !dirty;

      if (IS_EMPTY_INPUT) {
        dirty = '<!-->';
      }
      /* Stringify, in case dirty is an object */


      if (typeof dirty !== 'string' && !_isNode(dirty)) {
        if (typeof dirty.toString === 'function') {
          dirty = dirty.toString();

          if (typeof dirty !== 'string') {
            throw typeErrorCreate('dirty is not a string, aborting');
          }
        } else {
          throw typeErrorCreate('toString is not a function');
        }
      }
      /* Return dirty HTML if DOMPurify cannot run */


      if (!DOMPurify.isSupported) {
        return dirty;
      }
      /* Assign config vars */


      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }
      /* Clean up removed elements */


      DOMPurify.removed = [];
      /* Check if dirty is correctly typed for IN_PLACE */

      if (typeof dirty === 'string') {
        IN_PLACE = false;
      }

      if (IN_PLACE) {
        /* Do some early pre-sanitization to avoid unsafe root nodes */
        if (dirty.nodeName) {
          const tagName = transformCaseFunc(dirty.nodeName);

          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
          }
        }
      } else if (dirty instanceof Node) {
        /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
        body = _initDocument('<!---->');
        importedNode = body.ownerDocument.importNode(dirty, true);

        if (importedNode.nodeType === 1 && importedNode.nodeName === 'BODY') {
          /* Node is already a body, use as is */
          body = importedNode;
        } else if (importedNode.nodeName === 'HTML') {
          body = importedNode;
        } else {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          body.appendChild(importedNode);
        }
      } else {
        /* Exit directly if we have nothing to do */
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf('<') === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }
        /* Initialize the document to work on */


        body = _initDocument(dirty);
        /* Check we have a DOM node from the data */

        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
        }
      }
      /* Remove first element node (ours) if FORCE_BODY is set */


      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }
      /* Get node iterator */


      const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
      /* Now start iterating over the created document */


      while (currentNode = nodeIterator.nextNode()) {
        /* Sanitize tags and elements */
        if (_sanitizeElements(currentNode)) {
          continue;
        }
        /* Shadow DOM detected, sanitize it */


        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }
        /* Check attributes, sanitize if necessary */


        _sanitizeAttributes(currentNode);
      }
      /* If we sanitized `dirty` in-place, return it. */


      if (IN_PLACE) {
        return dirty;
      }
      /* Return sanitized string or DOM */


      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);

          while (body.firstChild) {
            // eslint-disable-next-line unicorn/prefer-dom-node-append
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }

        if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
          /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */
          returnNode = importNode.call(originalDocument, returnNode, true);
        }

        return returnNode;
      }

      let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
      /* Serialize doctype if allowed */

      if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
      }
      /* Sanitize final string template-safe */


      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR, ERB_EXPR, TMPLIT_EXPR], expr => {
          serializedHTML = stringReplace(serializedHTML, expr, ' ');
        });
      }

      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };
    /**
     * Public method to set the configuration once
     * setConfig
     *
     * @param {Object} cfg configuration object
     */


    DOMPurify.setConfig = function () {
      let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _parseConfig(cfg);

      SET_CONFIG = true;
    };
    /**
     * Public method to remove the configuration
     * clearConfig
     *
     */


    DOMPurify.clearConfig = function () {
      CONFIG = null;
      SET_CONFIG = false;
    };
    /**
     * Public method to check if an attribute value is valid.
     * Uses last set config, if any. Otherwise, uses config defaults.
     * isValidAttribute
     *
     * @param  {String} tag Tag name of containing element.
     * @param  {String} attr Attribute name.
     * @param  {String} value Attribute value.
     * @return {Boolean} Returns true if `value` is valid. Otherwise, returns false.
     */


    DOMPurify.isValidAttribute = function (tag, attr, value) {
      /* Initialize shared config vars if necessary. */
      if (!CONFIG) {
        _parseConfig({});
      }

      const lcTag = transformCaseFunc(tag);
      const lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };
    /**
     * AddHook
     * Public method to add DOMPurify hooks
     *
     * @param {String} entryPoint entry point for the hook to add
     * @param {Function} hookFunction function to execute
     */


    DOMPurify.addHook = function (entryPoint, hookFunction) {
      if (typeof hookFunction !== 'function') {
        return;
      }

      hooks[entryPoint] = hooks[entryPoint] || [];
      arrayPush(hooks[entryPoint], hookFunction);
    };
    /**
     * RemoveHook
     * Public method to remove a DOMPurify hook at a given entryPoint
     * (pops it from the stack of hooks if more are present)
     *
     * @param {String} entryPoint entry point for the hook to remove
     * @return {Function} removed(popped) hook
     */


    DOMPurify.removeHook = function (entryPoint) {
      if (hooks[entryPoint]) {
        return arrayPop(hooks[entryPoint]);
      }
    };
    /**
     * RemoveHooks
     * Public method to remove all DOMPurify hooks at a given entryPoint
     *
     * @param  {String} entryPoint entry point for the hooks to remove
     */


    DOMPurify.removeHooks = function (entryPoint) {
      if (hooks[entryPoint]) {
        hooks[entryPoint] = [];
      }
    };
    /**
     * RemoveAllHooks
     * Public method to remove all DOMPurify hooks
     */


    DOMPurify.removeAllHooks = function () {
      hooks = {};
    };

    return DOMPurify;
  }

  var purify = createDOMPurify();

  return purify;

}));
//# sourceMappingURL=purify.js.map


/***/ }),

/***/ 7129:
/*!*************************************************************************************************************************!*\
  !*** ./.yarn/cache/react-string-replace-npm-1.1.1-614c815872-fd5058bbb3.zip/node_modules/react-string-replace/index.js ***!
  \*************************************************************************************************************************/
/***/ (function(module) {

/* eslint-disable vars-on-top, no-var, prefer-template */
var isRegExp = function (re) { 
  return re instanceof RegExp;
};
var escapeRegExp = function escapeRegExp(string) {
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
    reHasRegExpChar = RegExp(reRegExpChar.source);

  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : string;
};
var isString = function (value) {
  return typeof value === 'string';
};
var flatten = function (array) {
  var newArray = [];

  array.forEach(function (item) {
    if (Array.isArray(item)) {
      newArray = newArray.concat(item);
    } else {
      newArray.push(item);
    }
  });

  return newArray;
};

/**
 * Given a string, replace every substring that is matched by the `match` regex
 * with the result of calling `fn` on matched substring. The result will be an
 * array with all odd indexed elements containing the replacements. The primary
 * use case is similar to using String.prototype.replace except for React.
 *
 * React will happily render an array as children of a react element, which
 * makes this approach very useful for tasks like surrounding certain text
 * within a string with react elements.
 *
 * Example:
 * matchReplace(
 *   'Emphasize all phone numbers like 884-555-4443.',
 *   /([\d|-]+)/g,
 *   (number, i) => <strong key={i}>{number}</strong>
 * );
 * // => ['Emphasize all phone numbers like ', <strong>884-555-4443</strong>, '.'
 *
 * @param {string} str
 * @param {RegExp|str} match Must contain a matching group
 * @param {function} fn
 * @return {array}
 */
function replaceString(str, match, fn) {
  var curCharStart = 0;
  var curCharLen = 0;

  if (str === '') {
    return str;
  } else if (!str || !isString(str)) {
    throw new TypeError('First argument to react-string-replace#replaceString must be a string');
  }

  var re = match;

  if (!isRegExp(re)) {
    re = new RegExp('(' + escapeRegExp(re) + ')', 'gi');
  }

  var result = str.split(re);

  // Apply fn to all odd elements
  for (var i = 1, length = result.length; i < length; i += 2) {
    /** @see {@link https://github.com/iansinnott/react-string-replace/issues/74} */
    if (result[i] === undefined || result[i - 1] === undefined) {
      console.warn('reactStringReplace: Encountered undefined value during string replacement. Your RegExp may not be working the way you expect.');
      continue;
    }

    curCharLen = result[i].length;
    curCharStart += result[i - 1].length;
    result[i] = fn(result[i], i, curCharStart);
    curCharStart += curCharLen;
  }

  return result;
}

module.exports = function reactStringReplace(source, match, fn) {
  if (!Array.isArray(source)) source = [source];

  return flatten(source.map(function(x) {
    return isString(x) ? replaceString(x, match, fn) : x;
  }));
};


/***/ }),

/***/ 85:
/*!***************************************************!*\
  !*** ./js/src/gutenberg/blocks/ sync block\.tsx$ ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./categories/block.tsx": 833,
	"./pages/block.tsx": 3146,
	"gutenberg/blocks/categories/block.tsx": 833,
	"gutenberg/blocks/pages/block.tsx": 3146
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 85;

/***/ }),

/***/ 7363:
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = React;

/***/ }),

/***/ 1533:
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ (function(module) {

"use strict";
module.exports = ReactDOM;

/***/ }),

/***/ 5311:
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = jQuery;

/***/ }),

/***/ 8085:
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = lodash;

/***/ }),

/***/ 6179:
/*!******************************!*\
  !*** external "wp.apiFetch" ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = wp.apiFetch;

/***/ }),

/***/ 78:
/*!*********************************!*\
  !*** external "wp.blockEditor" ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = wp.blockEditor;

/***/ }),

/***/ 378:
/*!****************************!*\
  !*** external "wp.blocks" ***!
  \****************************/
/***/ (function(module) {

"use strict";
module.exports = wp.blocks;

/***/ }),

/***/ 7537:
/*!********************************!*\
  !*** external "wp.components" ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = wp.components;

/***/ }),

/***/ 3284:
/*!**************************!*\
  !*** external "wp.data" ***!
  \**************************/
/***/ (function(module) {

"use strict";
module.exports = wp.data;

/***/ }),

/***/ 7031:
/*!***************************!*\
  !*** external "wp.hooks" ***!
  \***************************/
/***/ (function(module) {

"use strict";
module.exports = wp.hooks;

/***/ }),

/***/ 8496:
/*!**********************************!*\
  !*** external "wp.htmlEntities" ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = wp.htmlEntities;

/***/ }),

/***/ 8003:
/*!**************************!*\
  !*** external "wp.i18n" ***!
  \**************************/
/***/ (function(module) {

"use strict";
module.exports = wp.i18n;

/***/ }),

/***/ 1398:
/*!*****************************!*\
  !*** external "wp.plugins" ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = wp.plugins;

/***/ }),

/***/ 3882:
/*!**************************************!*\
  !*** external "wp.serverSideRender" ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = wp.serverSideRender;

/***/ }),

/***/ 1368:
/*!*************************!*\
  !*** external "wp.url" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = wp.url;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.hmd = function(module) {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: function() {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!********************************!*\
  !*** ./js/src/block-editor.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/widgets */ 9642);

console.debug('Advanced Sidebar - Loaded');
(0,_modules_widgets__WEBPACK_IMPORTED_MODULE_0__["default"])();

/**
 * 1. Blocks can't be lazy loaded, or they will be unavailable
 *    intermittently when developing.
 * 2. Theme Customizers must wait until the page is finished loading.
 *
 * @version 1.1.0
 */
if (typeof window.wp.element !== 'undefined' && typeof window.wp.plugins !== 'undefined') {
  (__webpack_require__(/*! ./gutenberg */ 8435)["default"])();
} else if (typeof window.wp.customize !== 'undefined') {
  window.wp.customize.bind('ready', () => {
    (__webpack_require__(/*! ./gutenberg */ 8435)["default"])();
  });
}
}();
/******/ })()
;
//# sourceMappingURL=advanced-sidebar-menu-block-editor.js.map