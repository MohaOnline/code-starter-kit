/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/js/api.js":
/*!******************************!*\
  !*** ./assets/src/js/api.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * List API on backend
 */

if (undefined === lpGlobalSettings) {
  throw new Error('lpGlobalSettings is undefined');
}
/* harmony default export */ __webpack_exports__["default"] = ({
  admin: {
    apiAdminNotice: lpGlobalSettings.rest + 'lp/v1/admin/tools/admin-notices',
    apiAdminOrderStatic: lpGlobalSettings.rest + 'lp/v1/orders/statistic',
    apiAddons: lpGlobalSettings.rest + 'lp/v1/addon/all',
    apiAddonAction: lpGlobalSettings.rest + 'lp/v1/addon/action',
    apiSearchCourses: lpGlobalSettings.rest + 'lp/v1/admin/tools/search-course',
    apiAssignUserCourse: lpGlobalSettings.rest + 'lp/v1/admin/tools/assign-user-course'
  },
  frontend: {
    apiWidgets: lpGlobalSettings.lp_rest_url + 'lp/v1/widgets/api'
  }
});

/***/ }),

/***/ "./assets/src/js/utils.js":
/*!********************************!*\
  !*** ./assets/src/js/utils.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lpAddQueryArgs: function() { return /* binding */ lpAddQueryArgs; },
/* harmony export */   lpFetchAPI: function() { return /* binding */ lpFetchAPI; },
/* harmony export */   lpGetCurrentURLNoParam: function() { return /* binding */ lpGetCurrentURLNoParam; }
/* harmony export */ });
const lpFetchAPI = (url, data = {}, functions = {}) => {
  if ('function' === typeof functions.before) {
    functions.before();
  }
  fetch(url, {
    method: 'GET',
    ...data
  }).then(response => response.json()).then(response => {
    if ('function' === typeof functions.success) {
      functions.success(response);
    }
  }).catch(err => {
    if ('function' === typeof functions.error) {
      functions.error(err);
    }
  }).finally(() => {
    if ('function' === typeof functions.completed) {
      functions.completed();
    }
  });
};
const lpGetCurrentURLNoParam = () => {
  let currentUrl = window.location.href;
  const hasParams = currentUrl.includes('?');
  if (hasParams) {
    currentUrl = currentUrl.split('?')[0];
  }
  return currentUrl;
};
const lpAddQueryArgs = (endpoint, args) => {
  const url = new URL(endpoint);
  Object.keys(args).forEach(arg => {
    url.searchParams.set(arg, args[arg]);
  });
  return url;
};


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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*******************************************!*\
  !*** ./assets/src/js/frontend/widgets.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./assets/src/js/utils.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api */ "./assets/src/js/api.js");


function widgetRestAPI() {
  const widgets = document.querySelectorAll('.learnpress-widget-wrapper');
  if (!widgets.length) {
    return;
  }
  const getResponse = ele => {
    const widget = ele.dataset.widget ? JSON.parse(ele.dataset.widget) : '';
    const url = _api__WEBPACK_IMPORTED_MODULE_1__["default"].frontend.apiWidgets;
    const paramsFetch = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...widget,
        ...{
          params_url: lpGlobalSettings.lpArchiveSkeleton
        }
      })
    };
    if (0 !== lpGlobalSettings.user_id) {
      paramsFetch.headers['X-WP-Nonce'] = lpGlobalSettings.nonce;
    }
    const callBack = {
      before: () => {},
      success: res => {
        const {
          data,
          status,
          message
        } = res;
        if (data && status === 'success') {
          ele.insertAdjacentHTML('afterbegin', data);
        } else if (message) {
          ele.insertAdjacentHTML('afterbegin', `<div class="lp-ajax-message error" style="display:block">${message}</div>`);
        }
      },
      error: error => {},
      completed: () => {
        delete ele.dataset.widget;
        ele.querySelector('.lp-skeleton-animation').remove();
      }
    };

    // Call API load widget
    (0,_utils__WEBPACK_IMPORTED_MODULE_0__.lpFetchAPI)(url, paramsFetch, callBack);
  };
  widgets.forEach(ele => {
    if (ele.classList.contains('learnpress-widget-wrapper__restapi')) {
      getResponse(ele);
    }
  });
}
document.addEventListener('DOMContentLoaded', function (event) {
  widgetRestAPI();
});
}();
/******/ })()
;
//# sourceMappingURL=widgets.js.map