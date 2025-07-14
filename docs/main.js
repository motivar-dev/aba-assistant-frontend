(self["webpackChunkABAAssistant"] = self["webpackChunkABAAssistant"] || []).push([["main"],{

/***/ 97900:
/*!********************************!*\
  !*** ./src/app-initializer.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppInitializer: () => (/* binding */ AppInitializer)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ 6923);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash-es */ 93362);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash-es */ 23950);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/AppConsts */ 98341);
/* harmony import */ var _shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/session/app-session.service */ 59626);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ 45312);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 81801);
/* harmony import */ var _shared_multi_tenancy_tenant_resolvers_subdomain_tenant_resolver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/multi-tenancy/tenant-resolvers/subdomain-tenant-resolver */ 55614);
/* harmony import */ var _shared_multi_tenancy_tenant_resolvers_query_string_tenant_resolver__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @shared/multi-tenancy/tenant-resolvers/query-string-tenant-resolver */ 77188);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 46443);












class AppInitializer {
  constructor(_injector, _platformLocation, _httpClient) {
    this._injector = _injector;
    this._platformLocation = _platformLocation;
    this._httpClient = _httpClient;
  }
  init() {
    return () => {
      abp.ui.setBusy();
      return new Promise((resolve, reject) => {
        _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.appBaseHref = this.getBaseHref();
        const appBaseUrl = this.getDocumentOrigin() + _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.appBaseHref;
        this.getApplicationConfig(appBaseUrl, () => {
          this.getUserConfiguration(() => {
            abp.event.trigger('abp.dynamicScriptsInitialized');
            // do not use constructor injection for AppSessionService
            const appSessionService = this._injector.get(_shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_2__.AppSessionService);
            appSessionService.init().then(result => {
              abp.ui.clearBusy();
              if (this.shouldLoadLocale()) {
                const angularLocale = this.convertAbpLocaleToAngularLocale(abp.localization.currentLanguage.name);
                __webpack_require__(77055)(`./${angularLocale}.mjs`).then(module => {
                  (0,_angular_common__WEBPACK_IMPORTED_MODULE_7__.registerLocaleData)(module.default);
                  resolve(result);
                }, reject);
              } else {
                resolve(result);
              }
            }, err => {
              abp.ui.clearBusy();
              reject(err);
            });
          });
        });
      });
    };
  }
  getBaseHref() {
    const baseUrl = this._platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
      return baseUrl;
    }
    return '/';
  }
  getDocumentOrigin() {
    if (!document.location.origin) {
      const port = document.location.port ? ':' + document.location.port : '';
      return document.location.protocol + '//' + document.location.hostname + port;
    }
    return document.location.origin;
  }
  shouldLoadLocale() {
    return abp.localization.currentLanguage.name && abp.localization.currentLanguage.name !== 'en-US';
  }
  convertAbpLocaleToAngularLocale(locale) {
    if (!_shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.localeMappings) {
      return locale;
    }
    const localeMapings = (0,lodash_es__WEBPACK_IMPORTED_MODULE_8__["default"])(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.localeMappings, {
      from: locale
    });
    if (localeMapings && localeMapings.length) {
      return localeMapings[0]['to'];
    }
    return locale;
  }
  getCurrentClockProvider(currentProviderName) {
    if (currentProviderName === 'unspecifiedClockProvider') {
      return abp.timing.unspecifiedClockProvider;
    }
    if (currentProviderName === 'utcClockProvider') {
      return abp.timing.utcClockProvider;
    }
    return abp.timing.localClockProvider;
  }
  getUserConfiguration(callback) {
    const cookieLangValue = abp.utils.getCookieValue('Abp.Localization.CultureName');
    const token = abp.auth.getToken();
    const requestHeaders = {
      'Abp.TenantId': `${abp.multiTenancy.getTenantIdCookie()}`,
      '.AspNetCore.Culture': `c=${cookieLangValue}|uic=${cookieLangValue}`
    };
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
    this._httpClient.get(`${_shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.remoteServiceBaseUrl}/AbpUserConfiguration/GetAll`, {
      headers: requestHeaders
    }).subscribe(response => {
      const result = response.result;
      (0,lodash_es__WEBPACK_IMPORTED_MODULE_9__["default"])(abp, result);
      abp.clock.provider = this.getCurrentClockProvider(result.clock.provider);
      moment_timezone__WEBPACK_IMPORTED_MODULE_0__.locale(abp.localization.currentLanguage.name);
      if (abp.clock.provider.supportsMultipleTimezone) {
        moment_timezone__WEBPACK_IMPORTED_MODULE_0__.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
      }
      callback();
    });
  }
  getApplicationConfig(appRootUrl, callback) {
    this._httpClient.get(`${appRootUrl}assets/${_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.appConfig}`, {
      headers: {
        'Abp.TenantId': `${abp.multiTenancy.getTenantIdCookie()}`
      }
    }).subscribe(response => {
      _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.appBaseUrl = response.appBaseUrl;
      _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.remoteServiceBaseUrl = response.remoteServiceBaseUrl;
      _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.localeMappings = response.localeMappings;
      // Find tenant from subdomain
      var tenancyName = this.resolveTenancyName(response.appBaseUrl);
      if (tenancyName == null) {
        callback();
      } else {
        this.ConfigureTenantIdCookie(tenancyName, callback);
      }
    });
  }
  ConfigureTenantIdCookie(tenancyName, callback) {
    let accountServiceProxy = this._injector.get(_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__.AccountServiceProxy);
    let input = new _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__.IsTenantAvailableInput();
    input.tenancyName = tenancyName;
    accountServiceProxy.isTenantAvailable(input).subscribe(result => {
      if (result.state === _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__.TenantAvailabilityState._1) {
        // Available
        abp.multiTenancy.setTenantIdCookie(result.tenantId);
      }
      callback();
    });
  }
  resolveTenancyName(appBaseUrl) {
    var subdomainTenantResolver = new _shared_multi_tenancy_tenant_resolvers_subdomain_tenant_resolver__WEBPACK_IMPORTED_MODULE_5__.SubdomainTenantResolver();
    var tenancyName = subdomainTenantResolver.resolve(appBaseUrl);
    if (tenancyName) {
      return tenancyName;
    }
    var queryStirngTenantResolver = new _shared_multi_tenancy_tenant_resolvers_query_string_tenant_resolver__WEBPACK_IMPORTED_MODULE_6__.QueryStringTenantResolver();
    var tenancyName = queryStirngTenantResolver.resolve(appBaseUrl);
    if (tenancyName) {
      return tenancyName;
    }
    // add other tenancy resolvers here, ex: CookieTenantResolver, QueryStringTenantResolver etc...
    return null;
  }
  static #_ = (() => this.ɵfac = function AppInitializer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AppInitializer)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_7__.PlatformLocation), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClient));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({
    token: AppInitializer,
    factory: AppInitializer.ɵfac,
    providedIn: 'root'
  }))();
}

/***/ }),

/***/ 45312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
const environment = {
  production: false,
  hmr: false,
  appConfig: 'appconfig.json'
};

/***/ }),

/***/ 5385:
/*!********************!*\
  !*** ./src/hmr.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hmrBootstrap: () => (/* binding */ hmrBootstrap)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angularclass_hmr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angularclass/hmr */ 3219);


const hmrBootstrap = (module, bootstrap) => {
  let ngModule;
  module.hot.accept();
  bootstrap().then(mod => ngModule = mod);
  module.hot.dispose(() => {
    const appRef = ngModule.injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = (0,_angularclass_hmr__WEBPACK_IMPORTED_MODULE_1__.createNewHosts)(elements);
    ngModule.destroy();
    makeVisible();
  });
};

/***/ }),

/***/ 84429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 80436);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environments/environment */ 45312);
/* harmony import */ var _root_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./root.module */ 77004);
/* harmony import */ var _hmr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hmr */ 5385);
/* harmony import */ var moment_min_locales_min__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment/min/locales.min */ 95711);
/* harmony import */ var moment_min_locales_min__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment_min_locales_min__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment-timezone */ 6923);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_4__);







if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.enableProdMode)();
}
const bootstrap = () => {
  return _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.platformBrowser().bootstrapModule(_root_module__WEBPACK_IMPORTED_MODULE_1__.RootModule);
};
/* "Hot Module Replacement" is enabled as described on
 * https://medium.com/@beeman/tutorial-enable-hrm-in-angular-cli-apps-1b0d13b80130#.sa87zkloh
 */
if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.hmr) {
  if (false) {} else {
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap(); // Regular bootstrap
}

/***/ }),

/***/ 17797:
/*!************************************!*\
  !*** ./src/root-routing.module.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RootRoutingModule: () => (/* binding */ RootRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);



const routes = [{
  path: '',
  redirectTo: '/app/about',
  pathMatch: 'full'
}, {
  path: 'account',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_account_account_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! account/account.module */ 55547)).then(m => m.AccountModule),
  // Lazy load account module
  data: {
    preload: true
  }
}, {
  path: 'app',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_app_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! app/app.module */ 50635)).then(m => m.AppModule),
  // Lazy load account module
  data: {
    preload: true
  }
}];
class RootRoutingModule {
  static #_ = (() => this.ɵfac = function RootRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || RootRoutingModule)();
  })();
  static #_2 = (() => this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
    type: RootRoutingModule
  }))();
  static #_3 = (() => this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forRoot(routes), _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  }))();
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](RootRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ }),

/***/ 91321:
/*!*******************************!*\
  !*** ./src/root.component.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RootComponent: () => (/* binding */ RootComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 95072);


class RootComponent {
  static #_ = (() => this.ɵfac = function RootComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || RootComponent)();
  })();
  static #_2 = (() => this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: RootComponent,
    selectors: [["app-root"]],
    decls: 1,
    vars: 0,
    template: function RootComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
      }
    },
    dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
    encapsulation: 2
  }))();
}

/***/ }),

/***/ 77004:
/*!****************************!*\
  !*** ./src/root.module.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RootModule: () => (/* binding */ RootModule),
/* harmony export */   getCurrentLanguage: () => (/* binding */ getCurrentLanguage)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/platform-browser */ 80436);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser/animations */ 43835);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-bootstrap/modal */ 2457);
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ 54195);
/* harmony import */ var ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-bootstrap/collapse */ 18751);
/* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-bootstrap/tabs */ 75119);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! abp-ng2-module */ 26173);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/shared.module */ 31699);
/* harmony import */ var _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/service-proxies/service-proxy.module */ 7707);
/* harmony import */ var _root_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./root-routing.module */ 17797);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @shared/AppConsts */ 98341);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 81801);
/* harmony import */ var _root_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./root.component */ 91321);
/* harmony import */ var _app_initializer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-initializer */ 97900);






















function getCurrentLanguage() {
  if (abp.localization.currentLanguage.name) {
    return abp.localization.currentLanguage.name;
  }
  // todo: Waiting for https://github.com/angular/angular/issues/31465 to be fixed.
  return 'en';
}
class RootModule {
  static #_ = (() => this.ɵfac = function RootModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || RootModule)();
  })();
  static #_2 = (() => this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
    type: RootModule,
    bootstrap: [_root_component__WEBPACK_IMPORTED_MODULE_5__.RootComponent]
  }))();
  static #_3 = (() => this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
    providers: [{
      provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HTTP_INTERCEPTORS,
      useClass: abp_ng2_module__WEBPACK_IMPORTED_MODULE_9__.AbpHttpInterceptor,
      multi: true
    }, {
      provide: _angular_core__WEBPACK_IMPORTED_MODULE_7__.APP_INITIALIZER,
      useFactory: appInitializer => appInitializer.init(),
      deps: [_app_initializer__WEBPACK_IMPORTED_MODULE_6__.AppInitializer],
      multi: true
    }, {
      provide: _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_4__.API_BASE_URL,
      useFactory: () => _shared_AppConsts__WEBPACK_IMPORTED_MODULE_3__.AppConsts.remoteServiceBaseUrl
    }, {
      provide: _angular_core__WEBPACK_IMPORTED_MODULE_7__.LOCALE_ID,
      useFactory: getCurrentLanguage
    }],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule.forRoot(), ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_12__.ModalModule.forRoot(), ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_13__.BsDropdownModule.forRoot(), ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_14__.CollapseModule.forRoot(), ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_15__.TabsModule.forRoot(), _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_1__.ServiceProxyModule, _root_routing_module__WEBPACK_IMPORTED_MODULE_2__.RootRoutingModule]
  }))();
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](RootModule, {
    declarations: [_root_component__WEBPACK_IMPORTED_MODULE_5__.RootComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_10__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_11__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClientModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule, ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_12__.ModalModule, ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_13__.BsDropdownModule, ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_14__.CollapseModule, ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_15__.TabsModule, _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_1__.ServiceProxyModule, _root_routing_module__WEBPACK_IMPORTED_MODULE_2__.RootRoutingModule]
  });
})();

/***/ }),

/***/ 98341:
/*!*********************************!*\
  !*** ./src/shared/AppConsts.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppConsts: () => (/* binding */ AppConsts)
/* harmony export */ });
class AppConsts {
  static #_ = (() => this.tenancyNamePlaceHolderInUrl = '{TENANCY_NAME}')();
  static #_2 = (() => this.localeMappings = [])();
  static #_3 = (() => this.userManagement = {
    defaultAdminUserName: 'admin'
  })();
  static #_4 = (() => this.localization = {
    defaultLocalizationSourceName: 'ABAAssistant'
  })();
  static #_5 = (() => this.authorization = {
    encryptedAuthTokenName: 'enc_auth_token'
  })();
}

/***/ }),

/***/ 18133:
/*!******************************************!*\
  !*** ./src/shared/app-component-base.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponentBase: () => (/* binding */ AppComponentBase)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 98341);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! abp-ng2-module */ 26173);
/* harmony import */ var _shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/session/app-session.service */ 59626);




class AppComponentBase {
  constructor(injector) {
    this.localizationSourceName = _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.localization.defaultLocalizationSourceName;
    this.localization = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.LocalizationService);
    this.permission = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.PermissionCheckerService);
    this.feature = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.FeatureCheckerService);
    this.notify = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.NotifyService);
    this.setting = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.SettingService);
    this.message = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.MessageService);
    this.multiTenancy = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.AbpMultiTenancyService);
    this.appSession = injector.get(_shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_1__.AppSessionService);
    this.elementRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef);
  }
  l(key, ...args) {
    let localizedText = this.localization.localize(key, this.localizationSourceName);
    if (!localizedText) {
      localizedText = key;
    }
    if (!args || !args.length) {
      return localizedText;
    }
    args.unshift(localizedText);
    return abp.utils.formatString.apply(this, args);
  }
  isGranted(permissionName) {
    return this.permission.isGranted(permissionName);
  }
}

/***/ }),

/***/ 43728:
/*!*********************************************!*\
  !*** ./src/shared/auth/app-auth.service.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppAuthService: () => (/* binding */ AppAuthService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 89475);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 98341);
/* harmony import */ var _shared_helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/helpers/UrlHelper */ 10617);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 81801);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! abp-ng2-module */ 26173);








class AppAuthService {
  constructor(_tokenAuthService, _router, _utilsService, _tokenService, _logService) {
    this._tokenAuthService = _tokenAuthService;
    this._router = _router;
    this._utilsService = _utilsService;
    this._tokenService = _tokenService;
    this._logService = _logService;
    this.clear();
  }
  logout(reload) {
    abp.auth.clearToken();
    abp.utils.deleteCookie(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.authorization.encryptedAuthTokenName);
    if (reload !== false) {
      location.href = _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.appBaseUrl;
    }
  }
  authenticate(finallyCallback) {
    finallyCallback = finallyCallback || (() => {});
    this._tokenAuthService.authenticate(this.authenticateModel).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.finalize)(() => {
      finallyCallback();
    })).subscribe(result => {
      this.processAuthenticateResult(result);
    });
  }
  processAuthenticateResult(authenticateResult) {
    this.authenticateResult = authenticateResult;
    if (authenticateResult.accessToken) {
      // Successfully logged in
      this.login(authenticateResult.accessToken, authenticateResult.encryptedAccessToken, authenticateResult.expireInSeconds, this.rememberMe);
    } else {
      // Unexpected result!
      this._logService.warn('Unexpected authenticateResult!');
      this._router.navigate(['account/login']);
    }
  }
  login(accessToken, encryptedAccessToken, expireInSeconds, rememberMe) {
    const tokenExpireDate = rememberMe ? new Date(new Date().getTime() + 1000 * expireInSeconds) : undefined;
    this._tokenService.setToken(accessToken, tokenExpireDate);
    this._utilsService.setCookieValue(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.authorization.encryptedAuthTokenName, encryptedAccessToken, tokenExpireDate, abp.appPath);
    let initialUrl = _shared_helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_1__.UrlHelper.initialUrl;
    if (initialUrl.indexOf('/login') > 0) {
      initialUrl = _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.appBaseUrl;
    }
    location.href = initialUrl;
  }
  clear() {
    this.authenticateModel = new _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__.AuthenticateModel();
    this.authenticateModel.rememberClient = false;
    this.authenticateResult = null;
    this.rememberMe = false;
  }
  static #_ = (() => this.ɵfac = function AppAuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AppAuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__.TokenAuthServiceProxy), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_6__.UtilsService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_6__.TokenService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_6__.LogService));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
    token: AppAuthService,
    factory: AppAuthService.ɵfac
  }))();
}

/***/ }),

/***/ 37191:
/*!*********************************************!*\
  !*** ./src/shared/auth/auth-route-guard.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRouteGuard: () => (/* binding */ AppRouteGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! abp-ng2-module */ 26173);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var _session_app_session_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../session/app-session.service */ 59626);




class AppRouteGuard {
  constructor(_permissionChecker, _router, _sessionService) {
    this._permissionChecker = _permissionChecker;
    this._router = _router;
    this._sessionService = _sessionService;
  }
  canActivate(route, state) {
    if (!this._sessionService.user) {
      this._router.navigate(['/account/login']);
      return false;
    }
    if (!route.data || !route.data['permission']) {
      return true;
    }
    if (this._permissionChecker.isGranted(route.data['permission'])) {
      return true;
    }
    this._router.navigate([this.selectBestRoute()]);
    return false;
  }
  canActivateChild(route, state) {
    return this.canActivate(route, state);
  }
  selectBestRoute() {
    if (!this._sessionService.user) {
      return '/account/login';
    }
    if (this._permissionChecker.isGranted('Pages.Users')) {
      return '/app/admin/users';
    }
    return '/app/home';
  }
  static #_ = (() => this.ɵfac = function AppRouteGuard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AppRouteGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.PermissionCheckerService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_session_app_session_service__WEBPACK_IMPORTED_MODULE_0__.AppSessionService));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AppRouteGuard,
    factory: AppRouteGuard.ɵfac
  }))();
}

/***/ }),

/***/ 42991:
/*!*******************************************************************!*\
  !*** ./src/shared/components/modal/abp-modal-footer.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbpModalFooterComponent: () => (/* binding */ AbpModalFooterComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);



class AbpModalFooterComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector) {
    super(injector);
    this.cancelLabel = this.l('Cancel');
    this.saveLabel = this.l('Save');
    this.onCancelClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  static #_ = (() => this.ɵfac = function AbpModalFooterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AbpModalFooterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
  })();
  static #_2 = (() => this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AbpModalFooterComponent,
    selectors: [["abp-modal-footer"]],
    inputs: {
      cancelLabel: "cancelLabel",
      cancelDisabled: "cancelDisabled",
      saveLabel: "saveLabel",
      saveDisabled: "saveDisabled"
    },
    outputs: {
      onCancelClick: "onCancelClick"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 5,
    vars: 4,
    consts: [[1, "modal-footer", "justify-content-between"], ["type", "button", 1, "btn", "btn-default", 3, "click", "disabled"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"]],
    template: function AbpModalFooterComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AbpModalFooterComponent_Template_button_click_1_listener() {
          return ctx.onCancelClick.emit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.cancelDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.cancelLabel, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.saveDisabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.saveLabel, " ");
      }
    },
    encapsulation: 2,
    changeDetection: 0
  }))();
}

/***/ }),

/***/ 417:
/*!*******************************************************************!*\
  !*** ./src/shared/components/modal/abp-modal-header.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbpModalHeaderComponent: () => (/* binding */ AbpModalHeaderComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);



class AbpModalHeaderComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector) {
    super(injector);
    this.onCloseClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  static #_ = (() => this.ɵfac = function AbpModalHeaderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AbpModalHeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
  })();
  static #_2 = (() => this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AbpModalHeaderComponent,
    selectors: [["abp-modal-header"]],
    inputs: {
      title: "title"
    },
    outputs: {
      onCloseClick: "onCloseClick"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 6,
    vars: 1,
    consts: [[1, "modal-header"], [1, "modal-title"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"]],
    template: function AbpModalHeaderComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "h4", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AbpModalHeaderComponent_Template_button_click_3_listener() {
          return ctx.onCloseClick.emit();
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\u00D7");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.title);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  }))();
}

/***/ }),

/***/ 18612:
/*!*******************************************************************************!*\
  !*** ./src/shared/components/pagination/abp-pagination-controls.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbpPaginationControlsComponent: () => (/* binding */ AbpPaginationControlsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-pagination */ 82423);




function AbpPaginationControlsComponent_ul_3_li_1_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AbpPaginationControlsComponent_ul_3_li_1_a_1_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](p_r3.previous());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AbpPaginationControlsComponent_ul_3_li_1_a_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AbpPaginationControlsComponent_ul_3_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AbpPaginationControlsComponent_ul_3_li_1_a_1_Template, 2, 0, "a", 7)(2, AbpPaginationControlsComponent_ul_3_li_1_a_2_Template, 2, 0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("disabled", p_r3.isFirstPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !p_r3.isFirstPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", p_r3.isFirstPage());
  }
}
function AbpPaginationControlsComponent_ul_3_li_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 6)(1, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AbpPaginationControlsComponent_ul_3_li_2_Template_a_click_1_listener() {
      const page_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](p_r3.setCurrent(page_r5.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const page_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("z-index", p_r3.getCurrent() === page_r5.value ? "0" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("active", p_r3.getCurrent() === page_r5.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", page_r5.label, " ");
  }
}
function AbpPaginationControlsComponent_ul_3_li_3_a_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AbpPaginationControlsComponent_ul_3_li_3_a_1_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](p_r3.next());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AbpPaginationControlsComponent_ul_3_li_3_a_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function AbpPaginationControlsComponent_ul_3_li_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AbpPaginationControlsComponent_ul_3_li_3_a_1_Template, 2, 0, "a", 7)(2, AbpPaginationControlsComponent_ul_3_li_3_a_2_Template, 2, 0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("disabled", p_r3.isLastPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !p_r3.isLastPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", p_r3.isLastPage());
  }
}
function AbpPaginationControlsComponent_ul_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ul", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AbpPaginationControlsComponent_ul_3_li_1_Template, 3, 4, "li", 4)(2, AbpPaginationControlsComponent_ul_3_li_2_Template, 3, 5, "li", 5)(3, AbpPaginationControlsComponent_ul_3_li_3_Template, 3, 4, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r6.directionLinks);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", p_r3.pages);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r6.directionLinks);
  }
}
class AbpPaginationControlsComponent {
  constructor() {
    this.maxSize = 7;
    this.previousLabel = 'Previous';
    this.nextLabel = 'Next';
    this.screenReaderPaginationLabel = 'Pagination';
    this.screenReaderPageLabel = 'page';
    this.screenReaderCurrentLabel = `You're on page`;
    this.pageChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this._directionLinks = true;
    this._autoHide = false;
  }
  get directionLinks() {
    return this._directionLinks;
  }
  set directionLinks(value) {
    this._directionLinks = !!value && value !== 'false';
  }
  get autoHide() {
    return this._autoHide;
  }
  set autoHide(value) {
    this._autoHide = !!value && value !== 'false';
  }
  static #_ = (() => this.ɵfac = function AbpPaginationControlsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AbpPaginationControlsComponent)();
  })();
  static #_2 = (() => this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
    type: AbpPaginationControlsComponent,
    selectors: [["abp-pagination-controls"]],
    inputs: {
      id: "id",
      maxSize: "maxSize",
      previousLabel: "previousLabel",
      nextLabel: "nextLabel",
      screenReaderPaginationLabel: "screenReaderPaginationLabel",
      screenReaderPageLabel: "screenReaderPageLabel",
      screenReaderCurrentLabel: "screenReaderCurrentLabel",
      directionLinks: "directionLinks",
      autoHide: "autoHide"
    },
    outputs: {
      pageChange: "pageChange"
    },
    decls: 4,
    vars: 3,
    consts: [["p", "paginationApi"], [3, "pageChange", "id", "maxSize"], ["class", "pagination m-0", 4, "ngIf"], [1, "pagination", "m-0"], ["class", "page-item", 3, "disabled", 4, "ngIf"], ["class", "page-item", 3, "active", "z-index", 4, "ngFor", "ngForOf"], [1, "page-item"], ["class", "page-link", "href", "javascript:;", 3, "click", 4, "ngIf"], ["class", "page-link", "href", "javascript:;", 4, "ngIf"], ["href", "javascript:;", 1, "page-link", 3, "click"], [1, "fas", "fa-chevron-left"], ["href", "javascript:;", 1, "page-link"], [1, "fas", "fa-chevron-right"]],
    template: function AbpPaginationControlsComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "pagination-template", 1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("pageChange", function AbpPaginationControlsComponent_Template_pagination_template_pageChange_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1);
          return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx.pageChange.emit($event));
        });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "nav");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AbpPaginationControlsComponent_ul_3_Template, 4, 3, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      }
      if (rf & 2) {
        const p_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("id", ctx.id)("maxSize", ctx.maxSize);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !(ctx.autoHide && p_r3.pages.length <= 1));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_1__.NgIf, ngx_pagination__WEBPACK_IMPORTED_MODULE_2__.PaginationControlsDirective],
    encapsulation: 2
  }))();
}

/***/ }),

/***/ 48339:
/*!******************************************************************************!*\
  !*** ./src/shared/components/validation/abp-validation.summary.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AbpValidationSummaryComponent: () => (/* binding */ AbpValidationSummaryComponent)
/* harmony export */ });
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 60316);



function AbpValidationSummaryComponent_ng_container_0_ng_container_1_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const validationError_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("d-block", !!ctx_r1.control.errors[validationError_r1.name]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r1.getValidationErrorMessage(validationError_r1), " ");
  }
}
function AbpValidationSummaryComponent_ng_container_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AbpValidationSummaryComponent_ng_container_0_ng_container_1_span_1_Template, 2, 3, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const validationError_r1 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !!ctx_r1.control.errors[validationError_r1.name]);
  }
}
function AbpValidationSummaryComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AbpValidationSummaryComponent_ng_container_0_ng_container_1_Template, 2, 1, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.validationErrors);
  }
}
class AbpValidationSummaryComponent extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector, _renderer) {
    super(injector);
    this._renderer = _renderer;
    this.defaultValidationErrors = [{
      name: 'required',
      localizationKey: 'ThisFieldIsRequired'
    }, {
      name: 'minlength',
      localizationKey: 'PleaseEnterAtLeastNCharacter',
      propertyKey: 'requiredLength'
    }, {
      name: 'maxlength',
      localizationKey: 'PleaseEnterNoMoreThanNCharacter',
      propertyKey: 'requiredLength'
    }, {
      name: 'email',
      localizationKey: 'InvalidEmailAddress'
    }, {
      name: 'pattern',
      localizationKey: 'InvalidPattern',
      propertyKey: 'requiredPattern'
    }, {
      name: 'validateEqual',
      localizationKey: 'PairsDoNotMatch'
    }];
    this.validationErrors = this.defaultValidationErrors;
  }
  set customValidationErrors(val) {
    if (val && val.length > 0) {
      const defaults = this.defaultValidationErrors.filter(defaultValidationError => !val.find(customValidationError => customValidationError.name === defaultValidationError.name));
      this.validationErrors = [...defaults, ...val];
    }
  }
  ngOnInit() {
    if (this.controlEl) {
      this.control.valueChanges.subscribe(() => {
        if (this.control.valid && (this.control.dirty || this.control.touched)) {
          this._renderer.removeClass(this.controlEl, 'is-invalid');
        }
      });
    }
  }
  getValidationErrorMessage(error) {
    if (this.controlEl) {
      this._renderer.addClass(this.controlEl, 'is-invalid');
    }
    const propertyValue = this.control.errors[error.name][error.propertyKey];
    return !!propertyValue ? this.l(error.localizationKey, propertyValue) : this.l(error.localizationKey);
  }
  static #_ = (() => this.ɵfac = function AbpValidationSummaryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AbpValidationSummaryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Renderer2));
  })();
  static #_2 = (() => this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
    type: AbpValidationSummaryComponent,
    selectors: [["abp-validation-summary"]],
    inputs: {
      control: "control",
      controlEl: "controlEl",
      customValidationErrors: "customValidationErrors"
    },
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]],
    decls: 1,
    vars: 1,
    consts: [[4, "ngIf"], [4, "ngFor", "ngForOf"], ["class", "error invalid-feedback", 3, "d-block", 4, "ngIf"], [1, "error", "invalid-feedback"]],
    template: function AbpValidationSummaryComponent_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, AbpValidationSummaryComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
      }
      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.control.invalid && (ctx.control.dirty || ctx.control.touched));
      }
    },
    dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf],
    encapsulation: 2
  }))();
}

/***/ }),

/***/ 56851:
/*!*************************************************!*\
  !*** ./src/shared/directives/busy.directive.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BusyDirective: () => (/* binding */ BusyDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);

class BusyDirective {
  constructor(_element) {
    this._element = _element;
  }
  set busy(isBusy) {
    this.refreshState(isBusy);
  }
  refreshState(isBusy) {
    if (isBusy === undefined) {
      return;
    }
    if (isBusy) {
      abp.ui.setBusy(this._element.nativeElement);
    } else {
      abp.ui.clearBusy(this._element.nativeElement);
    }
  }
  static #_ = (() => this.ɵfac = function BusyDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || BusyDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
  })();
  static #_2 = (() => this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: BusyDirective,
    selectors: [["", "busy", ""]],
    inputs: {
      busy: "busy"
    }
  }))();
}

/***/ }),

/***/ 70433:
/*!************************************************************!*\
  !*** ./src/shared/directives/equal-validator.directive.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EqualValidator: () => (/* binding */ EqualValidator)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 34456);



class EqualValidator {
  constructor(validateEqual, reverse) {
    this.validateEqual = validateEqual;
    this.reverse = reverse;
  }
  get isReverse() {
    if (!this.reverse) {
      return false;
    }
    return this.reverse === 'true' ? true : false;
  }
  validate(control) {
    // self value
    const value = control.value;
    // second control
    const control2 = control.root.get(this.validateEqual);
    // value not equal
    if (control2 && value !== control2.value && !this.isReverse) {
      return {
        validateEqual: true
      };
    }
    // value equal and reverse
    if (control2 && value === control2.value && this.isReverse) {
      delete control2.errors['validateEqual'];
      if (!Object.keys(control2.errors).length) {
        control2.setErrors(null);
      }
    }
    // value not equal and reverse
    if (control2 && value !== control2.value && this.isReverse) {
      control2.setErrors({
        validateEqual: true
      });
    }
    return null;
  }
  static #_ = (() => this.ɵfac = function EqualValidator_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || EqualValidator)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('validateEqual'), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('reverse'));
  })();
  static #_2 = (() => this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
    type: EqualValidator,
    selectors: [["", "validateEqual", "", "formControlName", ""], ["", "validateEqual", "", "formControl", ""], ["", "validateEqual", "", "ngModel", ""]],
    features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
      provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALIDATORS,
      useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => EqualValidator),
      multi: true
    }])]
  }))();
}

/***/ }),

/***/ 64172:
/*!*************************************************************!*\
  !*** ./src/shared/helpers/FormattedStringValueExtracter.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormattedStringValueExtracter: () => (/* binding */ FormattedStringValueExtracter)
/* harmony export */ });
class ExtractionResult {
  constructor(isMatch) {
    this.IsMatch = isMatch;
    this.Matches = [];
  }
}
var FormatStringTokenType;
(function (FormatStringTokenType) {
  FormatStringTokenType[FormatStringTokenType["ConstantText"] = 0] = "ConstantText";
  FormatStringTokenType[FormatStringTokenType["DynamicValue"] = 1] = "DynamicValue";
})(FormatStringTokenType || (FormatStringTokenType = {}));
class FormatStringToken {
  constructor(text, type) {
    this.Text = text;
    this.Type = type;
  }
}
class FormatStringTokenizer {
  Tokenize(format, includeBracketsForDynamicValues = false) {
    const tokens = [];
    let currentText = '';
    let inDynamicValue = false;
    for (let i = 0; i < format.length; i++) {
      const c = format[i];
      switch (c) {
        case '{':
          if (inDynamicValue) {
            throw new Error('Incorrect syntax at char ' + i + '! format string can not contain nested dynamic value expression!');
          }
          inDynamicValue = true;
          if (currentText.length > 0) {
            tokens.push(new FormatStringToken(currentText, FormatStringTokenType.ConstantText));
            currentText = '';
          }
          break;
        case '}':
          if (!inDynamicValue) {
            throw new Error('Incorrect syntax at char ' + i + '! These is no opening brackets for the closing bracket }.');
          }
          inDynamicValue = false;
          if (currentText.length <= 0) {
            throw new Error('Incorrect syntax at char ' + i + '! Brackets does not containt any chars.');
          }
          let dynamicValue = currentText;
          if (includeBracketsForDynamicValues) {
            dynamicValue = '{' + dynamicValue + '}';
          }
          tokens.push(new FormatStringToken(dynamicValue, FormatStringTokenType.DynamicValue));
          currentText = '';
          break;
        default:
          currentText += c;
          break;
      }
    }
    if (inDynamicValue) {
      throw new Error('There is no closing } char for an opened { char.');
    }
    if (currentText.length > 0) {
      tokens.push(new FormatStringToken(currentText, FormatStringTokenType.ConstantText));
    }
    return tokens;
  }
}
class FormattedStringValueExtracter {
  Extract(str, format) {
    if (str === format) {
      return new ExtractionResult(true);
    }
    const formatTokens = new FormatStringTokenizer().Tokenize(format);
    if (!formatTokens) {
      return new ExtractionResult(str === '');
    }
    const result = new ExtractionResult(true);
    for (let i = 0; i < formatTokens.length; i++) {
      const currentToken = formatTokens[i];
      const previousToken = i > 0 ? formatTokens[i - 1] : null;
      if (currentToken.Type === FormatStringTokenType.ConstantText) {
        if (i === 0) {
          if (str.indexOf(currentToken.Text) !== 0) {
            result.IsMatch = false;
            return result;
          }
          str = str.substr(currentToken.Text.length, str.length - currentToken.Text.length);
        } else {
          const matchIndex = str.indexOf(currentToken.Text);
          if (matchIndex < 0) {
            result.IsMatch = false;
            return result;
          }
          result.Matches.push({
            name: previousToken?.Text,
            value: str.substr(0, matchIndex)
          });
          str = str.substring(0, matchIndex + currentToken.Text.length);
        }
      }
    }
    const lastToken = formatTokens[formatTokens.length - 1];
    if (lastToken.Type === FormatStringTokenType.DynamicValue) {
      result.Matches.push({
        name: lastToken.Text,
        value: str
      });
    }
    return result;
  }
  IsMatch(str, format) {
    const result = new FormattedStringValueExtracter().Extract(str, format);
    if (!result.IsMatch) {
      return [];
    }
    const values = [];
    for (let i = 0; i < result.Matches.length; i++) {
      values.push(result.Matches[i].value);
    }
    return values;
  }
}

/***/ }),

/***/ 90563:
/*!**********************************************************!*\
  !*** ./src/shared/helpers/SubdomainTenancyNameFinder.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubdomainTenancyNameFinder: () => (/* binding */ SubdomainTenancyNameFinder)
/* harmony export */ });
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 98341);
/* harmony import */ var _shared_helpers_FormattedStringValueExtracter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/helpers/FormattedStringValueExtracter */ 64172);


class SubdomainTenancyNameFinder {
  urlHasTenancyNamePlaceholder(url) {
    return url.indexOf(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.tenancyNamePlaceHolderInUrl) >= 0;
  }
  getCurrentTenancyNameOrNull(rootAddress) {
    if (rootAddress.indexOf(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.tenancyNamePlaceHolderInUrl) < 0) {
      // Web site does not support subdomain tenant name
      return null;
    }
    const currentRootAddress = document.location.href;
    const formattedStringValueExtracter = new _shared_helpers_FormattedStringValueExtracter__WEBPACK_IMPORTED_MODULE_1__.FormattedStringValueExtracter();
    const values = formattedStringValueExtracter.IsMatch(currentRootAddress, rootAddress);
    if (!values.length) {
      return null;
    }
    return values[0];
  }
}

/***/ }),

/***/ 10617:
/*!*****************************************!*\
  !*** ./src/shared/helpers/UrlHelper.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UrlHelper: () => (/* binding */ UrlHelper)
/* harmony export */ });
class UrlHelper {
  /**
   * The URL requested, before initial routing.
   */
  static #_ = (() => this.initialUrl = location.href)();
  static getQueryParameters() {
    return document.location.search.replace(/(^\?)/, '').split('&').map(function (n) {
      return n = n.split('='), this[n[0]] = n[1], this;
    }.bind({}))[0];
  }
}

/***/ }),

/***/ 4166:
/*!***************************************************!*\
  !*** ./src/shared/layout/layout-store.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayoutStoreService: () => (/* binding */ LayoutStoreService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 75797);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 15424);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 91817);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37580);



class LayoutStoreService {
  constructor() {
    this.initialLayoutConfig = {
      sidebarExpanded: false
    };
    this.configSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(this.initialLayoutConfig);
    this.config$ = this.configSource.asObservable();
  }
  get sidebarExpanded() {
    return this.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.pluck)('sidebarExpanded'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.distinctUntilChanged)());
  }
  setSidebarExpanded(value) {
    this.configSource.next(Object.assign(this.configSource.value, {
      sidebarExpanded: value
    }));
  }
  static #_ = (() => this.ɵfac = function LayoutStoreService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || LayoutStoreService)();
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
    token: LayoutStoreService,
    factory: LayoutStoreService.ɵfac
  }))();
}

/***/ }),

/***/ 77188:
/*!***********************************************************************************!*\
  !*** ./src/shared/multi-tenancy/tenant-resolvers/query-string-tenant-resolver.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryStringTenantResolver: () => (/* binding */ QueryStringTenantResolver)
/* harmony export */ });
/* harmony import */ var _helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/UrlHelper */ 10617);

class QueryStringTenantResolver {
  resolve(appBaseUrl) {
    let queryParams = _helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_0__.UrlHelper.getQueryParameters();
    console.log('queryParams');
    console.log(queryParams);
    return queryParams['abp_tenancy_name'];
  }
}

/***/ }),

/***/ 55614:
/*!********************************************************************************!*\
  !*** ./src/shared/multi-tenancy/tenant-resolvers/subdomain-tenant-resolver.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubdomainTenantResolver: () => (/* binding */ SubdomainTenantResolver)
/* harmony export */ });
/* harmony import */ var _shared_helpers_SubdomainTenancyNameFinder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/helpers/SubdomainTenancyNameFinder */ 90563);

class SubdomainTenantResolver {
  resolve(appBaseUrl) {
    const subdomainTenancyNameFinder = new _shared_helpers_SubdomainTenancyNameFinder__WEBPACK_IMPORTED_MODULE_0__.SubdomainTenancyNameFinder();
    return subdomainTenancyNameFinder.getCurrentTenancyNameOrNull(appBaseUrl);
  }
}

/***/ }),

/***/ 95874:
/*!*******************************************!*\
  !*** ./src/shared/nav/app-url.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppUrlService: () => (/* binding */ AppUrlService)
/* harmony export */ });
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 98341);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _session_app_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../session/app-session.service */ 59626);



class AppUrlService {
  static #_ = (() => this.tenancyNamePlaceHolder = '{TENANCY_NAME}')();
  constructor(_appSessionService) {
    this._appSessionService = _appSessionService;
  }
  get appRootUrl() {
    if (this._appSessionService.tenant) {
      return this.getAppRootUrlOfTenant(this._appSessionService.tenant.tenancyName);
    } else {
      return this.getAppRootUrlOfTenant(null);
    }
  }
  /**
   * Returning url ends with '/'.
   */
  getAppRootUrlOfTenant(tenancyName) {
    let baseUrl = this.ensureEndsWith(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.appBaseUrl, '/');
    if (baseUrl.indexOf(AppUrlService.tenancyNamePlaceHolder) < 0) {
      return baseUrl;
    }
    if (baseUrl.indexOf(AppUrlService.tenancyNamePlaceHolder + '.') >= 0) {
      baseUrl = baseUrl.replace(AppUrlService.tenancyNamePlaceHolder + '.', AppUrlService.tenancyNamePlaceHolder);
      if (tenancyName) {
        tenancyName = tenancyName + '.';
      }
    }
    if (!tenancyName) {
      return baseUrl.replace(AppUrlService.tenancyNamePlaceHolder, '');
    }
    return baseUrl.replace(AppUrlService.tenancyNamePlaceHolder, tenancyName);
  }
  ensureEndsWith(str, c) {
    if (str.charAt(str.length - 1) !== c) {
      str = str + c;
    }
    return str;
  }
  removeFromEnd(str, c) {
    if (str.charAt(str.length - 1) === c) {
      str = str.substr(0, str.length - 1);
    }
    return str;
  }
  static #_2 = (() => this.ɵfac = function AppUrlService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AppUrlService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_session_app_session_service__WEBPACK_IMPORTED_MODULE_1__.AppSessionService));
  })();
  static #_3 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
    token: AppUrlService,
    factory: AppUrlService.ɵfac
  }))();
}

/***/ }),

/***/ 54747:
/*!*******************************************!*\
  !*** ./src/shared/pipes/localize.pipe.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalizePipe: () => (/* binding */ LocalizePipe)
/* harmony export */ });
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 18133);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);


class LocalizePipe extends _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase {
  constructor(injector) {
    super(injector);
  }
  transform(key, ...args) {
    return this.l(key, ...args);
  }
  static #_ = (() => this.ɵfac = function LocalizePipe_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || LocalizePipe)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector, 16));
  })();
  static #_2 = (() => this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
    name: "localize",
    type: LocalizePipe,
    pure: true
  }))();
}

/***/ }),

/***/ 81801:
/*!*******************************************************!*\
  !*** ./src/shared/service-proxies/service-proxies.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_BASE_URL: () => (/* binding */ API_BASE_URL),
/* harmony export */   AccountServiceProxy: () => (/* binding */ AccountServiceProxy),
/* harmony export */   AlunoDto: () => (/* binding */ AlunoDto),
/* harmony export */   AlunoDtoPagedResultDto: () => (/* binding */ AlunoDtoPagedResultDto),
/* harmony export */   AlunoServiceProxy: () => (/* binding */ AlunoServiceProxy),
/* harmony export */   ApiException: () => (/* binding */ ApiException),
/* harmony export */   AplicacaoPassoProtIntervencaoDto: () => (/* binding */ AplicacaoPassoProtIntervencaoDto),
/* harmony export */   AplicacaoProtocoloAvaliacaoDto: () => (/* binding */ AplicacaoProtocoloAvaliacaoDto),
/* harmony export */   AplicacaoProtocoloIntervencaoDto: () => (/* binding */ AplicacaoProtocoloIntervencaoDto),
/* harmony export */   ApplicationInfoDto: () => (/* binding */ ApplicationInfoDto),
/* harmony export */   AquisicaoHabilidadeDto: () => (/* binding */ AquisicaoHabilidadeDto),
/* harmony export */   AtuacaoDto: () => (/* binding */ AtuacaoDto),
/* harmony export */   AuthenticateModel: () => (/* binding */ AuthenticateModel),
/* harmony export */   AuthenticateResultModel: () => (/* binding */ AuthenticateResultModel),
/* harmony export */   CasoDto: () => (/* binding */ CasoDto),
/* harmony export */   CasoServiceProxy: () => (/* binding */ CasoServiceProxy),
/* harmony export */   ChangePasswordDto: () => (/* binding */ ChangePasswordDto),
/* harmony export */   ChangeUiThemeInput: () => (/* binding */ ChangeUiThemeInput),
/* harmony export */   ChangeUserLanguageDto: () => (/* binding */ ChangeUserLanguageDto),
/* harmony export */   CidadeDto: () => (/* binding */ CidadeDto),
/* harmony export */   ColabFuncaoOrgDto: () => (/* binding */ ColabFuncaoOrgDto),
/* harmony export */   ColabFuncaoOrgDtoPagedResultDto: () => (/* binding */ ColabFuncaoOrgDtoPagedResultDto),
/* harmony export */   ColaboradorDto: () => (/* binding */ ColaboradorDto),
/* harmony export */   ColaboradorDtoPagedResultDto: () => (/* binding */ ColaboradorDtoPagedResultDto),
/* harmony export */   ColaboradorServiceProxy: () => (/* binding */ ColaboradorServiceProxy),
/* harmony export */   ConfigurationServiceProxy: () => (/* binding */ ConfigurationServiceProxy),
/* harmony export */   CreateAlunoDto: () => (/* binding */ CreateAlunoDto),
/* harmony export */   CreateAplicacaoProtocoloAvaliacaoDto: () => (/* binding */ CreateAplicacaoProtocoloAvaliacaoDto),
/* harmony export */   CreateAplicacaoProtocoloIntervencaoDto: () => (/* binding */ CreateAplicacaoProtocoloIntervencaoDto),
/* harmony export */   CreateAtuacaoDto: () => (/* binding */ CreateAtuacaoDto),
/* harmony export */   CreateColabFuncaoOrgDto: () => (/* binding */ CreateColabFuncaoOrgDto),
/* harmony export */   CreateColaboradorDto: () => (/* binding */ CreateColaboradorDto),
/* harmony export */   CreateDominioDto: () => (/* binding */ CreateDominioDto),
/* harmony export */   CreateGestaoDto: () => (/* binding */ CreateGestaoDto),
/* harmony export */   CreateHabilidadeDto: () => (/* binding */ CreateHabilidadeDto),
/* harmony export */   CreateHierarquiaAjudaDto: () => (/* binding */ CreateHierarquiaAjudaDto),
/* harmony export */   CreateNivelDto: () => (/* binding */ CreateNivelDto),
/* harmony export */   CreatePassoProtIntervencaoDto: () => (/* binding */ CreatePassoProtIntervencaoDto),
/* harmony export */   CreateProtocoloAvaliacaoDto: () => (/* binding */ CreateProtocoloAvaliacaoDto),
/* harmony export */   CreateProtocoloIntervencaoDto: () => (/* binding */ CreateProtocoloIntervencaoDto),
/* harmony export */   CreateProvedorSaudeDto: () => (/* binding */ CreateProvedorSaudeDto),
/* harmony export */   CreateRegistroAtendimentoDto: () => (/* binding */ CreateRegistroAtendimentoDto),
/* harmony export */   CreateRegistroSupervisaoDto: () => (/* binding */ CreateRegistroSupervisaoDto),
/* harmony export */   CreateResponsavelDto: () => (/* binding */ CreateResponsavelDto),
/* harmony export */   CreateRoleDto: () => (/* binding */ CreateRoleDto),
/* harmony export */   CreateServicoPrestadoDto: () => (/* binding */ CreateServicoPrestadoDto),
/* harmony export */   CreateTecnicaDto: () => (/* binding */ CreateTecnicaDto),
/* harmony export */   CreateTenantDto: () => (/* binding */ CreateTenantDto),
/* harmony export */   CreateUnidadeEnsinoDto: () => (/* binding */ CreateUnidadeEnsinoDto),
/* harmony export */   CreateUserDto: () => (/* binding */ CreateUserDto),
/* harmony export */   CreateUserPessoaDto: () => (/* binding */ CreateUserPessoaDto),
/* harmony export */   CreateVersaoProtIntervencaoDto: () => (/* binding */ CreateVersaoProtIntervencaoDto),
/* harmony export */   DominioDto: () => (/* binding */ DominioDto),
/* harmony export */   DominioDtoPagedResultDto: () => (/* binding */ DominioDtoPagedResultDto),
/* harmony export */   EntityDto: () => (/* binding */ EntityDto),
/* harmony export */   FlatPermissionDto: () => (/* binding */ FlatPermissionDto),
/* harmony export */   FormatoEnsinoDto: () => (/* binding */ FormatoEnsinoDto),
/* harmony export */   FormatoEnsinoDtoPagedResultDto: () => (/* binding */ FormatoEnsinoDtoPagedResultDto),
/* harmony export */   FormatoEnsinoServiceProxy: () => (/* binding */ FormatoEnsinoServiceProxy),
/* harmony export */   FuncaoOrgDto: () => (/* binding */ FuncaoOrgDto),
/* harmony export */   FuncaoOrgDtoPagedResultDto: () => (/* binding */ FuncaoOrgDtoPagedResultDto),
/* harmony export */   FuncaoOrgServiceProxy: () => (/* binding */ FuncaoOrgServiceProxy),
/* harmony export */   GetCurrentLoginInformationsOutput: () => (/* binding */ GetCurrentLoginInformationsOutput),
/* harmony export */   GetRoleForEditOutput: () => (/* binding */ GetRoleForEditOutput),
/* harmony export */   HabilidadeDto: () => (/* binding */ HabilidadeDto),
/* harmony export */   HabilidadeDtoPagedResultDto: () => (/* binding */ HabilidadeDtoPagedResultDto),
/* harmony export */   HierarquiaAjudaDto: () => (/* binding */ HierarquiaAjudaDto),
/* harmony export */   HierarquiaAjudaDtoPagedResultDto: () => (/* binding */ HierarquiaAjudaDtoPagedResultDto),
/* harmony export */   HierarquiaAjudaServiceProxy: () => (/* binding */ HierarquiaAjudaServiceProxy),
/* harmony export */   Int64Entity: () => (/* binding */ Int64Entity),
/* harmony export */   Int64EntityDto: () => (/* binding */ Int64EntityDto),
/* harmony export */   Int64Int32KeyValuePair: () => (/* binding */ Int64Int32KeyValuePair),
/* harmony export */   IsTenantAvailableInput: () => (/* binding */ IsTenantAvailableInput),
/* harmony export */   IsTenantAvailableOutput: () => (/* binding */ IsTenantAvailableOutput),
/* harmony export */   NivelDto: () => (/* binding */ NivelDto),
/* harmony export */   NivelDtoPagedResultDto: () => (/* binding */ NivelDtoPagedResultDto),
/* harmony export */   PaisDto: () => (/* binding */ PaisDto),
/* harmony export */   PaisServiceProxy: () => (/* binding */ PaisServiceProxy),
/* harmony export */   ParticipacaoSupervisaoDto: () => (/* binding */ ParticipacaoSupervisaoDto),
/* harmony export */   PassoProtIntervencaoDto: () => (/* binding */ PassoProtIntervencaoDto),
/* harmony export */   PermissionDto: () => (/* binding */ PermissionDto),
/* harmony export */   PermissionDtoListResultDto: () => (/* binding */ PermissionDtoListResultDto),
/* harmony export */   PessoaDto: () => (/* binding */ PessoaDto),
/* harmony export */   ProtocoloAvaliacaoDto: () => (/* binding */ ProtocoloAvaliacaoDto),
/* harmony export */   ProtocoloAvaliacaoDtoPagedResultDto: () => (/* binding */ ProtocoloAvaliacaoDtoPagedResultDto),
/* harmony export */   ProtocoloAvaliacaoServiceProxy: () => (/* binding */ ProtocoloAvaliacaoServiceProxy),
/* harmony export */   ProtocoloIntervencaoDto: () => (/* binding */ ProtocoloIntervencaoDto),
/* harmony export */   ProtocoloIntervencaoDtoPagedResultDto: () => (/* binding */ ProtocoloIntervencaoDtoPagedResultDto),
/* harmony export */   ProtocoloIntervencaoServiceProxy: () => (/* binding */ ProtocoloIntervencaoServiceProxy),
/* harmony export */   ProvedorSaudeDto: () => (/* binding */ ProvedorSaudeDto),
/* harmony export */   ProvedorSaudeDtoPagedResultDto: () => (/* binding */ ProvedorSaudeDtoPagedResultDto),
/* harmony export */   ProvedorSaudeServiceProxy: () => (/* binding */ ProvedorSaudeServiceProxy),
/* harmony export */   RefBibliograficaDto: () => (/* binding */ RefBibliograficaDto),
/* harmony export */   RefBibliograficaDtoPagedResultDto: () => (/* binding */ RefBibliograficaDtoPagedResultDto),
/* harmony export */   RefBibliograficaServiceProxy: () => (/* binding */ RefBibliograficaServiceProxy),
/* harmony export */   ReforcadorDto: () => (/* binding */ ReforcadorDto),
/* harmony export */   RegisterInput: () => (/* binding */ RegisterInput),
/* harmony export */   RegisterOutput: () => (/* binding */ RegisterOutput),
/* harmony export */   RegistroAtendimentoDto: () => (/* binding */ RegistroAtendimentoDto),
/* harmony export */   RegistroSupervisaoDto: () => (/* binding */ RegistroSupervisaoDto),
/* harmony export */   ResetPasswordDto: () => (/* binding */ ResetPasswordDto),
/* harmony export */   ResponsavelDto: () => (/* binding */ ResponsavelDto),
/* harmony export */   ResponsavelDtoPagedResultDto: () => (/* binding */ ResponsavelDtoPagedResultDto),
/* harmony export */   ResponsavelServiceProxy: () => (/* binding */ ResponsavelServiceProxy),
/* harmony export */   RoleDto: () => (/* binding */ RoleDto),
/* harmony export */   RoleDtoListResultDto: () => (/* binding */ RoleDtoListResultDto),
/* harmony export */   RoleDtoPagedResultDto: () => (/* binding */ RoleDtoPagedResultDto),
/* harmony export */   RoleEditDto: () => (/* binding */ RoleEditDto),
/* harmony export */   RoleListDto: () => (/* binding */ RoleListDto),
/* harmony export */   RoleListDtoListResultDto: () => (/* binding */ RoleListDtoListResultDto),
/* harmony export */   RoleServiceProxy: () => (/* binding */ RoleServiceProxy),
/* harmony export */   ServicoPrestadoDto: () => (/* binding */ ServicoPrestadoDto),
/* harmony export */   ServicoPrestadoDtoPagedResultDto: () => (/* binding */ ServicoPrestadoDtoPagedResultDto),
/* harmony export */   ServicoPrestadoServiceProxy: () => (/* binding */ ServicoPrestadoServiceProxy),
/* harmony export */   SessionServiceProxy: () => (/* binding */ SessionServiceProxy),
/* harmony export */   SubtipoProvedorSaudeDto: () => (/* binding */ SubtipoProvedorSaudeDto),
/* harmony export */   TecnicaDto: () => (/* binding */ TecnicaDto),
/* harmony export */   TecnicaDtoPagedResultDto: () => (/* binding */ TecnicaDtoPagedResultDto),
/* harmony export */   TecnicaServiceProxy: () => (/* binding */ TecnicaServiceProxy),
/* harmony export */   TenantAvailabilityState: () => (/* binding */ TenantAvailabilityState),
/* harmony export */   TenantDto: () => (/* binding */ TenantDto),
/* harmony export */   TenantDtoPagedResultDto: () => (/* binding */ TenantDtoPagedResultDto),
/* harmony export */   TenantLoginInfoDto: () => (/* binding */ TenantLoginInfoDto),
/* harmony export */   TenantServiceProxy: () => (/* binding */ TenantServiceProxy),
/* harmony export */   TipoAjudaDto: () => (/* binding */ TipoAjudaDto),
/* harmony export */   TipoConfirmacaoHabilidadeDto: () => (/* binding */ TipoConfirmacaoHabilidadeDto),
/* harmony export */   TipoProvedorSaudeDto: () => (/* binding */ TipoProvedorSaudeDto),
/* harmony export */   TipoProvedorSaudeDtoPagedResultDto: () => (/* binding */ TipoProvedorSaudeDtoPagedResultDto),
/* harmony export */   TipoProvedorSaudeServiceProxy: () => (/* binding */ TipoProvedorSaudeServiceProxy),
/* harmony export */   TipoServicoPrestadoDto: () => (/* binding */ TipoServicoPrestadoDto),
/* harmony export */   TipoServicoPrestadoDtoPagedResultDto: () => (/* binding */ TipoServicoPrestadoDtoPagedResultDto),
/* harmony export */   TipoServicoPrestadoServiceProxy: () => (/* binding */ TipoServicoPrestadoServiceProxy),
/* harmony export */   TokenAuthServiceProxy: () => (/* binding */ TokenAuthServiceProxy),
/* harmony export */   UFDto: () => (/* binding */ UFDto),
/* harmony export */   UnidadeEnsinoDto: () => (/* binding */ UnidadeEnsinoDto),
/* harmony export */   UpdateAlunoDto: () => (/* binding */ UpdateAlunoDto),
/* harmony export */   UpdateAplicacaoPassoProtIntervencaoDto: () => (/* binding */ UpdateAplicacaoPassoProtIntervencaoDto),
/* harmony export */   UpdateAplicacaoProtocoloAvaliacaoDto: () => (/* binding */ UpdateAplicacaoProtocoloAvaliacaoDto),
/* harmony export */   UpdateAplicacaoProtocoloIntervencaoDto: () => (/* binding */ UpdateAplicacaoProtocoloIntervencaoDto),
/* harmony export */   UpdateColaboradorDto: () => (/* binding */ UpdateColaboradorDto),
/* harmony export */   UpdateDominioDto: () => (/* binding */ UpdateDominioDto),
/* harmony export */   UpdateHabilidadeDto: () => (/* binding */ UpdateHabilidadeDto),
/* harmony export */   UpdateHierarquiaAjudaDto: () => (/* binding */ UpdateHierarquiaAjudaDto),
/* harmony export */   UpdateNivelDto: () => (/* binding */ UpdateNivelDto),
/* harmony export */   UpdatePassoProtIntervencaoDto: () => (/* binding */ UpdatePassoProtIntervencaoDto),
/* harmony export */   UpdateProtocoloAvaliacaoDto: () => (/* binding */ UpdateProtocoloAvaliacaoDto),
/* harmony export */   UpdateProtocoloIntervencaoDto: () => (/* binding */ UpdateProtocoloIntervencaoDto),
/* harmony export */   UpdateProvedorSaudeDto: () => (/* binding */ UpdateProvedorSaudeDto),
/* harmony export */   UpdateResponsavelDto: () => (/* binding */ UpdateResponsavelDto),
/* harmony export */   UpdateServicoPrestadoDto: () => (/* binding */ UpdateServicoPrestadoDto),
/* harmony export */   UpdateTecnicaDto: () => (/* binding */ UpdateTecnicaDto),
/* harmony export */   UpdateVersaoProtIntervencaoDto: () => (/* binding */ UpdateVersaoProtIntervencaoDto),
/* harmony export */   UserDto: () => (/* binding */ UserDto),
/* harmony export */   UserDtoPagedResultDto: () => (/* binding */ UserDtoPagedResultDto),
/* harmony export */   UserLoginInfoDto: () => (/* binding */ UserLoginInfoDto),
/* harmony export */   UserServiceProxy: () => (/* binding */ UserServiceProxy),
/* harmony export */   VersaoProtIntervencaoDto: () => (/* binding */ VersaoProtIntervencaoDto),
/* harmony export */   VersaoProtIntervencaoDtoPagedResultDto: () => (/* binding */ VersaoProtIntervencaoDtoPagedResultDto)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 13255);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 61318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 77919);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 59452);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 43942);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 39545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.2.0.0 (NJsonSchema v11.1.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming







const API_BASE_URL = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('API_BASE_URL');
class AccountServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  isTenantAvailable(body) {
    let url_ = this.baseUrl + "/api/services/app/Account/IsTenantAvailable";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processIsTenantAvailable(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processIsTenantAvailable(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processIsTenantAvailable(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = IsTenantAvailableOutput.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  register(body) {
    let url_ = this.baseUrl + "/api/services/app/Account/Register";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processRegister(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processRegister(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processRegister(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RegisterOutput.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function AccountServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AccountServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AccountServiceProxy,
    factory: AccountServiceProxy.ɵfac
  }))();
}
class AlunoServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/Aluno/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/Aluno/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AlunoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  createUserParaPessoa(body) {
    let url_ = this.baseUrl + "/api/services/app/Aluno/CreateUserParaPessoa";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreateUserParaPessoa(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreateUserParaPessoa(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreateUserParaPessoa(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(keyword, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/Aluno/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AlunoDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/Aluno/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AlunoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/Aluno/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AlunoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function AlunoServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AlunoServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AlunoServiceProxy,
    factory: AlunoServiceProxy.ɵfac
  }))();
}
class CasoServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param colaboradorId (optional)
   * @param colabFuncaoOrgId (optional)
   * @param vinculoAtivo (optional)
   * @return OK
   */
  getAllCasos(colaboradorId, colabFuncaoOrgId, vinculoAtivo) {
    let url_ = this.baseUrl + "/api/services/app/Caso/GetAllCasos?";
    if (colaboradorId === null) throw new Error("The parameter 'colaboradorId' cannot be null.");else if (colaboradorId !== undefined) url_ += "ColaboradorId=" + encodeURIComponent("" + colaboradorId) + "&";
    if (colabFuncaoOrgId === null) throw new Error("The parameter 'colabFuncaoOrgId' cannot be null.");else if (colabFuncaoOrgId !== undefined) url_ += "ColabFuncaoOrgId=" + encodeURIComponent("" + colabFuncaoOrgId) + "&";
    if (vinculoAtivo === null) throw new Error("The parameter 'vinculoAtivo' cannot be null.");else if (vinculoAtivo !== undefined) url_ += "VinculoAtivo=" + encodeURIComponent("" + vinculoAtivo) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllCasos(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllCasos(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllCasos(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [];
          for (let item of resultData200) result200.push(CasoDto.fromJS(item));
        } else {
          result200 = null;
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param casoId (optional)
   * @param vinculoAtivo (optional)
   * @param colaboradorId (optional)
   * @param colabFuncaoOrgId (optional)
   * @param funcoesId (optional)
   * @return OK
   */
  getAllAtuacoes(casoId, vinculoAtivo, colaboradorId, colabFuncaoOrgId, funcoesId) {
    let url_ = this.baseUrl + "/api/services/app/Caso/GetAllAtuacoes?";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (vinculoAtivo === null) throw new Error("The parameter 'vinculoAtivo' cannot be null.");else if (vinculoAtivo !== undefined) url_ += "VinculoAtivo=" + encodeURIComponent("" + vinculoAtivo) + "&";
    if (colaboradorId === null) throw new Error("The parameter 'colaboradorId' cannot be null.");else if (colaboradorId !== undefined) url_ += "ColaboradorId=" + encodeURIComponent("" + colaboradorId) + "&";
    if (colabFuncaoOrgId === null) throw new Error("The parameter 'colabFuncaoOrgId' cannot be null.");else if (colabFuncaoOrgId !== undefined) url_ += "ColabFuncaoOrgId=" + encodeURIComponent("" + colabFuncaoOrgId) + "&";
    if (funcoesId === null) throw new Error("The parameter 'funcoesId' cannot be null.");else if (funcoesId !== undefined) funcoesId && funcoesId.forEach(item => {
      url_ += "FuncoesId=" + encodeURIComponent("" + item) + "&";
    });
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllAtuacoes(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllAtuacoes(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllAtuacoes(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [];
          for (let item of resultData200) result200.push(AtuacaoDto.fromJS(item));
        } else {
          result200 = null;
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getAtuacao(id) {
    let url_ = this.baseUrl + "/api/services/app/Caso/GetAtuacao?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAtuacao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAtuacao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAtuacao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AtuacaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  createAtuacao(body) {
    let url_ = this.baseUrl + "/api/services/app/Caso/CreateAtuacao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreateAtuacao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreateAtuacao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreateAtuacao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AtuacaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  removeAtuacao(body) {
    let url_ = this.baseUrl + "/api/services/app/Caso/RemoveAtuacao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processRemoveAtuacao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processRemoveAtuacao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processRemoveAtuacao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AtuacaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getAplicacaoProtocoloAvaliacao(id) {
    let url_ = this.baseUrl + "/api/services/app/Caso/GetAplicacaoProtocoloAvaliacao?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAplicacaoProtocoloAvaliacao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAplicacaoProtocoloAvaliacao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAplicacaoProtocoloAvaliacao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AplicacaoProtocoloAvaliacaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param casoId (optional)
   * @param protocoloAvaliacaoId (optional)
   * @return OK
   */
  getAllAplicacoesProtocoloAvaliacao(casoId, protocoloAvaliacaoId) {
    let url_ = this.baseUrl + "/api/services/app/Caso/GetAllAplicacoesProtocoloAvaliacao?";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (protocoloAvaliacaoId === null) throw new Error("The parameter 'protocoloAvaliacaoId' cannot be null.");else if (protocoloAvaliacaoId !== undefined) url_ += "ProtocoloAvaliacaoId=" + encodeURIComponent("" + protocoloAvaliacaoId) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllAplicacoesProtocoloAvaliacao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllAplicacoesProtocoloAvaliacao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllAplicacoesProtocoloAvaliacao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [];
          for (let item of resultData200) result200.push(AplicacaoProtocoloAvaliacaoDto.fromJS(item));
        } else {
          result200 = null;
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  createAplicacaoProtocoloAvaliacao(body) {
    let url_ = this.baseUrl + "/api/services/app/Caso/CreateAplicacaoProtocoloAvaliacao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreateAplicacaoProtocoloAvaliacao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreateAplicacaoProtocoloAvaliacao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreateAplicacaoProtocoloAvaliacao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AplicacaoProtocoloAvaliacaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  updateAplicacaoProtocoloAvaliacao(body) {
    let url_ = this.baseUrl + "/api/services/app/Caso/UpdateAplicacaoProtocoloAvaliacao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdateAplicacaoProtocoloAvaliacao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdateAplicacaoProtocoloAvaliacao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdateAplicacaoProtocoloAvaliacao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AplicacaoProtocoloAvaliacaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  removeAplicacaoProtocoloAvaliacao(body) {
    let url_ = this.baseUrl + "/api/services/app/Caso/RemoveAplicacaoProtocoloAvaliacao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processRemoveAplicacaoProtocoloAvaliacao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processRemoveAplicacaoProtocoloAvaliacao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processRemoveAplicacaoProtocoloAvaliacao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AplicacaoProtocoloAvaliacaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getAplicacaoProtocoloIntervencao(id) {
    let url_ = this.baseUrl + "/api/services/app/Caso/GetAplicacaoProtocoloIntervencao?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAplicacaoProtocoloIntervencao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAplicacaoProtocoloIntervencao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAplicacaoProtocoloIntervencao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AplicacaoProtocoloIntervencaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param casoId (optional)
   * @param protocoloIntervencaoId (optional)
   * @return OK
   */
  getAllAplicacoesProtocoloIntervencao(casoId, protocoloIntervencaoId) {
    let url_ = this.baseUrl + "/api/services/app/Caso/GetAllAplicacoesProtocoloIntervencao?";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (protocoloIntervencaoId === null) throw new Error("The parameter 'protocoloIntervencaoId' cannot be null.");else if (protocoloIntervencaoId !== undefined) url_ += "ProtocoloIntervencaoId=" + encodeURIComponent("" + protocoloIntervencaoId) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllAplicacoesProtocoloIntervencao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllAplicacoesProtocoloIntervencao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllAplicacoesProtocoloIntervencao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [];
          for (let item of resultData200) result200.push(AplicacaoProtocoloIntervencaoDto.fromJS(item));
        } else {
          result200 = null;
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  createAplicacaoProtocoloIntervencao(body) {
    let url_ = this.baseUrl + "/api/services/app/Caso/CreateAplicacaoProtocoloIntervencao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreateAplicacaoProtocoloIntervencao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreateAplicacaoProtocoloIntervencao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreateAplicacaoProtocoloIntervencao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AplicacaoProtocoloIntervencaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  updateAplicacaoProtocoloIntervencao(body) {
    let url_ = this.baseUrl + "/api/services/app/Caso/UpdateAplicacaoProtocoloIntervencao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdateAplicacaoProtocoloIntervencao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdateAplicacaoProtocoloIntervencao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdateAplicacaoProtocoloIntervencao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AplicacaoProtocoloIntervencaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  removeAplicacaoProtocoloIntervencao(body) {
    let url_ = this.baseUrl + "/api/services/app/Caso/RemoveAplicacaoProtocoloIntervencao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processRemoveAplicacaoProtocoloIntervencao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processRemoveAplicacaoProtocoloIntervencao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processRemoveAplicacaoProtocoloIntervencao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AplicacaoProtocoloIntervencaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  registrarAtendimento(body) {
    let url_ = this.baseUrl + "/api/services/app/Caso/RegistrarAtendimento";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processRegistrarAtendimento(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processRegistrarAtendimento(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processRegistrarAtendimento(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RegistroAtendimentoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getRegistroAtendimento(id) {
    let url_ = this.baseUrl + "/api/services/app/Caso/GetRegistroAtendimento?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetRegistroAtendimento(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetRegistroAtendimento(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetRegistroAtendimento(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RegistroAtendimentoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param casoId (optional)
   * @param aplicacaoProtocoloIntervencaoId (optional)
   * @param aplicacaoPassoProtIntervencaoId (optional)
   * @param atuacaoTerapeutaId (optional)
   * @param colabFuncaoId (optional)
   * @return OK
   */
  getAllRegistrosAtendimento(casoId, aplicacaoProtocoloIntervencaoId, aplicacaoPassoProtIntervencaoId, atuacaoTerapeutaId, colabFuncaoId) {
    let url_ = this.baseUrl + "/api/services/app/Caso/GetAllRegistrosAtendimento?";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (aplicacaoProtocoloIntervencaoId === null) throw new Error("The parameter 'aplicacaoProtocoloIntervencaoId' cannot be null.");else if (aplicacaoProtocoloIntervencaoId !== undefined) url_ += "AplicacaoProtocoloIntervencaoId=" + encodeURIComponent("" + aplicacaoProtocoloIntervencaoId) + "&";
    if (aplicacaoPassoProtIntervencaoId === null) throw new Error("The parameter 'aplicacaoPassoProtIntervencaoId' cannot be null.");else if (aplicacaoPassoProtIntervencaoId !== undefined) url_ += "AplicacaoPassoProtIntervencaoId=" + encodeURIComponent("" + aplicacaoPassoProtIntervencaoId) + "&";
    if (atuacaoTerapeutaId === null) throw new Error("The parameter 'atuacaoTerapeutaId' cannot be null.");else if (atuacaoTerapeutaId !== undefined) url_ += "AtuacaoTerapeutaId=" + encodeURIComponent("" + atuacaoTerapeutaId) + "&";
    if (colabFuncaoId === null) throw new Error("The parameter 'colabFuncaoId' cannot be null.");else if (colabFuncaoId !== undefined) url_ += "ColabFuncaoId=" + encodeURIComponent("" + colabFuncaoId) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllRegistrosAtendimento(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllRegistrosAtendimento(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllRegistrosAtendimento(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [];
          for (let item of resultData200) result200.push(RegistroAtendimentoDto.fromJS(item));
        } else {
          result200 = null;
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getUnidadeEnsino(id) {
    let url_ = this.baseUrl + "/api/services/app/Caso/GetUnidadeEnsino?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetUnidadeEnsino(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetUnidadeEnsino(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetUnidadeEnsino(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UnidadeEnsinoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param registroAtendimentoId (optional)
   * @param casoId (optional)
   * @param aplicacaoProtocoloIntervencaoId (optional)
   * @param aplicacaoPassoProtIntervencaoId (optional)
   * @param atuacaoTerapeutaId (optional)
   * @param colabFuncaoId (optional)
   * @return OK
   */
  getAllUnidadesEnsino(registroAtendimentoId, casoId, aplicacaoProtocoloIntervencaoId, aplicacaoPassoProtIntervencaoId, atuacaoTerapeutaId, colabFuncaoId) {
    let url_ = this.baseUrl + "/api/services/app/Caso/GetAllUnidadesEnsino?";
    if (registroAtendimentoId === null) throw new Error("The parameter 'registroAtendimentoId' cannot be null.");else if (registroAtendimentoId !== undefined) url_ += "RegistroAtendimentoId=" + encodeURIComponent("" + registroAtendimentoId) + "&";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (aplicacaoProtocoloIntervencaoId === null) throw new Error("The parameter 'aplicacaoProtocoloIntervencaoId' cannot be null.");else if (aplicacaoProtocoloIntervencaoId !== undefined) url_ += "AplicacaoProtocoloIntervencaoId=" + encodeURIComponent("" + aplicacaoProtocoloIntervencaoId) + "&";
    if (aplicacaoPassoProtIntervencaoId === null) throw new Error("The parameter 'aplicacaoPassoProtIntervencaoId' cannot be null.");else if (aplicacaoPassoProtIntervencaoId !== undefined) url_ += "AplicacaoPassoProtIntervencaoId=" + encodeURIComponent("" + aplicacaoPassoProtIntervencaoId) + "&";
    if (atuacaoTerapeutaId === null) throw new Error("The parameter 'atuacaoTerapeutaId' cannot be null.");else if (atuacaoTerapeutaId !== undefined) url_ += "AtuacaoTerapeutaId=" + encodeURIComponent("" + atuacaoTerapeutaId) + "&";
    if (colabFuncaoId === null) throw new Error("The parameter 'colabFuncaoId' cannot be null.");else if (colabFuncaoId !== undefined) url_ += "ColabFuncaoId=" + encodeURIComponent("" + colabFuncaoId) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllUnidadesEnsino(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllUnidadesEnsino(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllUnidadesEnsino(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [];
          for (let item of resultData200) result200.push(UnidadeEnsinoDto.fromJS(item));
        } else {
          result200 = null;
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  registrarSupervisao(body) {
    let url_ = this.baseUrl + "/api/services/app/Caso/RegistrarSupervisao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processRegistrarSupervisao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processRegistrarSupervisao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processRegistrarSupervisao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RegistroSupervisaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getRegistroSupervisao(id) {
    let url_ = this.baseUrl + "/api/services/app/Caso/GetRegistroSupervisao?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetRegistroSupervisao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetRegistroSupervisao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetRegistroSupervisao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RegistroSupervisaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param casoId (optional)
   * @param atuacaoSupervisorId (optional)
   * @param colabFuncaoSupervisorId (optional)
   * @param atuacaoParticipanteId (optional)
   * @param colabFuncaoParticipanteId (optional)
   * @return OK
   */
  getAllRegistrosSupervisao(casoId, atuacaoSupervisorId, colabFuncaoSupervisorId, atuacaoParticipanteId, colabFuncaoParticipanteId) {
    let url_ = this.baseUrl + "/api/services/app/Caso/GetAllRegistrosSupervisao?";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (atuacaoSupervisorId === null) throw new Error("The parameter 'atuacaoSupervisorId' cannot be null.");else if (atuacaoSupervisorId !== undefined) url_ += "AtuacaoSupervisorId=" + encodeURIComponent("" + atuacaoSupervisorId) + "&";
    if (colabFuncaoSupervisorId === null) throw new Error("The parameter 'colabFuncaoSupervisorId' cannot be null.");else if (colabFuncaoSupervisorId !== undefined) url_ += "ColabFuncaoSupervisorId=" + encodeURIComponent("" + colabFuncaoSupervisorId) + "&";
    if (atuacaoParticipanteId === null) throw new Error("The parameter 'atuacaoParticipanteId' cannot be null.");else if (atuacaoParticipanteId !== undefined) url_ += "AtuacaoParticipanteId=" + encodeURIComponent("" + atuacaoParticipanteId) + "&";
    if (colabFuncaoParticipanteId === null) throw new Error("The parameter 'colabFuncaoParticipanteId' cannot be null.");else if (colabFuncaoParticipanteId !== undefined) url_ += "ColabFuncaoParticipanteId=" + encodeURIComponent("" + colabFuncaoParticipanteId) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllRegistrosSupervisao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllRegistrosSupervisao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllRegistrosSupervisao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [];
          for (let item of resultData200) result200.push(RegistroSupervisaoDto.fromJS(item));
        } else {
          result200 = null;
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function CasoServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || CasoServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: CasoServiceProxy,
    factory: CasoServiceProxy.ɵfac
  }))();
}
class ColaboradorServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param colaboradorId (optional)
   * @param gestorId (optional)
   * @param gestorColaboradorId (optional)
   * @param funcoesOrgId (optional)
   * @param funcaoAtiva (optional)
   * @param casoId (optional)
   * @param keyword (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAllColabFuncoes(colaboradorId, gestorId, gestorColaboradorId, funcoesOrgId, funcaoAtiva, casoId, keyword, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/Colaborador/GetAllColabFuncoes?";
    if (colaboradorId === null) throw new Error("The parameter 'colaboradorId' cannot be null.");else if (colaboradorId !== undefined) url_ += "ColaboradorId=" + encodeURIComponent("" + colaboradorId) + "&";
    if (gestorId === null) throw new Error("The parameter 'gestorId' cannot be null.");else if (gestorId !== undefined) url_ += "GestorId=" + encodeURIComponent("" + gestorId) + "&";
    if (gestorColaboradorId === null) throw new Error("The parameter 'gestorColaboradorId' cannot be null.");else if (gestorColaboradorId !== undefined) url_ += "GestorColaboradorId=" + encodeURIComponent("" + gestorColaboradorId) + "&";
    if (funcoesOrgId === null) throw new Error("The parameter 'funcoesOrgId' cannot be null.");else if (funcoesOrgId !== undefined) funcoesOrgId && funcoesOrgId.forEach(item => {
      url_ += "FuncoesOrgId=" + encodeURIComponent("" + item) + "&";
    });
    if (funcaoAtiva === null) throw new Error("The parameter 'funcaoAtiva' cannot be null.");else if (funcaoAtiva !== undefined) url_ += "FuncaoAtiva=" + encodeURIComponent("" + funcaoAtiva) + "&";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllColabFuncoes(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllColabFuncoes(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllColabFuncoes(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ColabFuncaoOrgDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getColabFuncao(id) {
    let url_ = this.baseUrl + "/api/services/app/Colaborador/GetColabFuncao?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetColabFuncao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetColabFuncao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetColabFuncao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ColabFuncaoOrgDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  createColabFuncao(body) {
    let url_ = this.baseUrl + "/api/services/app/Colaborador/CreateColabFuncao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreateColabFuncao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreateColabFuncao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreateColabFuncao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ColabFuncaoOrgDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  createGestaoColabFuncao(body) {
    let url_ = this.baseUrl + "/api/services/app/Colaborador/CreateGestaoColabFuncao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreateGestaoColabFuncao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreateGestaoColabFuncao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreateGestaoColabFuncao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ColabFuncaoOrgDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  removeGestaoColabFuncao(body) {
    let url_ = this.baseUrl + "/api/services/app/Colaborador/RemoveGestaoColabFuncao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processRemoveGestaoColabFuncao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processRemoveGestaoColabFuncao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processRemoveGestaoColabFuncao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ColabFuncaoOrgDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  deleteColabFuncao(body) {
    let url_ = this.baseUrl + "/api/services/app/Colaborador/DeleteColabFuncao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDeleteColabFuncao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDeleteColabFuncao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDeleteColabFuncao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ColabFuncaoOrgDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/Colaborador/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ColaboradorDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  createUserParaPessoa(body) {
    let url_ = this.baseUrl + "/api/services/app/Colaborador/CreateUserParaPessoa";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreateUserParaPessoa(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreateUserParaPessoa(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreateUserParaPessoa(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param gestorId (optional)
   * @param gestorColaboradorId (optional)
   * @param funcoesOrgId (optional)
   * @param funcaoAtiva (optional)
   * @param casoId (optional)
   * @param keyword (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(gestorId, gestorColaboradorId, funcoesOrgId, funcaoAtiva, casoId, keyword, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/Colaborador/GetAll?";
    if (gestorId === null) throw new Error("The parameter 'gestorId' cannot be null.");else if (gestorId !== undefined) url_ += "GestorId=" + encodeURIComponent("" + gestorId) + "&";
    if (gestorColaboradorId === null) throw new Error("The parameter 'gestorColaboradorId' cannot be null.");else if (gestorColaboradorId !== undefined) url_ += "GestorColaboradorId=" + encodeURIComponent("" + gestorColaboradorId) + "&";
    if (funcoesOrgId === null) throw new Error("The parameter 'funcoesOrgId' cannot be null.");else if (funcoesOrgId !== undefined) funcoesOrgId && funcoesOrgId.forEach(item => {
      url_ += "FuncoesOrgId=" + encodeURIComponent("" + item) + "&";
    });
    if (funcaoAtiva === null) throw new Error("The parameter 'funcaoAtiva' cannot be null.");else if (funcaoAtiva !== undefined) url_ += "FuncaoAtiva=" + encodeURIComponent("" + funcaoAtiva) + "&";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ColaboradorDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/Colaborador/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ColaboradorDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/Colaborador/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ColaboradorDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/Colaborador/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function ColaboradorServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || ColaboradorServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: ColaboradorServiceProxy,
    factory: ColaboradorServiceProxy.ɵfac
  }))();
}
class ConfigurationServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  changeUiTheme(body) {
    let url_ = this.baseUrl + "/api/services/app/Configuration/ChangeUiTheme";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processChangeUiTheme(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processChangeUiTheme(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processChangeUiTheme(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function ConfigurationServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || ConfigurationServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: ConfigurationServiceProxy,
    factory: ConfigurationServiceProxy.ɵfac
  }))();
}
class FormatoEnsinoServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/FormatoEnsino/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = FormatoEnsinoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/FormatoEnsino/GetAll?";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = FormatoEnsinoDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/FormatoEnsino/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = FormatoEnsinoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/FormatoEnsino/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = FormatoEnsinoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/FormatoEnsino/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function FormatoEnsinoServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || FormatoEnsinoServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: FormatoEnsinoServiceProxy,
    factory: FormatoEnsinoServiceProxy.ɵfac
  }))();
}
class FuncaoOrgServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/FuncaoOrg/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = FuncaoOrgDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(keyword, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/FuncaoOrg/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = FuncaoOrgDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/FuncaoOrg/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = FuncaoOrgDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/FuncaoOrg/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = FuncaoOrgDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/FuncaoOrg/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function FuncaoOrgServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || FuncaoOrgServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: FuncaoOrgServiceProxy,
    factory: FuncaoOrgServiceProxy.ɵfac
  }))();
}
class HierarquiaAjudaServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/HierarquiaAjuda/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = HierarquiaAjudaDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/HierarquiaAjuda/GetAll?";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = HierarquiaAjudaDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/HierarquiaAjuda/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = HierarquiaAjudaDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/HierarquiaAjuda/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = HierarquiaAjudaDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/HierarquiaAjuda/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function HierarquiaAjudaServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || HierarquiaAjudaServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: HierarquiaAjudaServiceProxy,
    factory: HierarquiaAjudaServiceProxy.ɵfac
  }))();
}
class PaisServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param paisId (optional)
   * @param uFId (optional)
   * @param cidadeId (optional)
   * @return OK
   */
  getPais(paisId, uFId, cidadeId) {
    let url_ = this.baseUrl + "/api/services/app/Pais/GetPais?";
    if (paisId === null) throw new Error("The parameter 'paisId' cannot be null.");else if (paisId !== undefined) url_ += "PaisId=" + encodeURIComponent("" + paisId) + "&";
    if (uFId === null) throw new Error("The parameter 'uFId' cannot be null.");else if (uFId !== undefined) url_ += "UFId=" + encodeURIComponent("" + uFId) + "&";
    if (cidadeId === null) throw new Error("The parameter 'cidadeId' cannot be null.");else if (cidadeId !== undefined) url_ += "CidadeId=" + encodeURIComponent("" + cidadeId) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetPais(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetPais(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetPais(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = PaisDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @return OK
   */
  getAllPaises() {
    let url_ = this.baseUrl + "/api/services/app/Pais/GetAllPaises";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllPaises(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllPaises(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllPaises(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [];
          for (let item of resultData200) result200.push(PaisDto.fromJS(item));
        } else {
          result200 = null;
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param uFId (optional)
   * @param cidadeId (optional)
   * @return OK
   */
  getUnidadeFederal(uFId, cidadeId) {
    let url_ = this.baseUrl + "/api/services/app/Pais/GetUnidadeFederal?";
    if (uFId === null) throw new Error("The parameter 'uFId' cannot be null.");else if (uFId !== undefined) url_ += "UFId=" + encodeURIComponent("" + uFId) + "&";
    if (cidadeId === null) throw new Error("The parameter 'cidadeId' cannot be null.");else if (cidadeId !== undefined) url_ += "CidadeId=" + encodeURIComponent("" + cidadeId) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetUnidadeFederal(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetUnidadeFederal(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetUnidadeFederal(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UFDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param paisId (optional)
   * @return OK
   */
  getAllUnidadesFederais(paisId) {
    let url_ = this.baseUrl + "/api/services/app/Pais/GetAllUnidadesFederais?";
    if (paisId === null) throw new Error("The parameter 'paisId' cannot be null.");else if (paisId !== undefined) url_ += "PaisId=" + encodeURIComponent("" + paisId) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllUnidadesFederais(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllUnidadesFederais(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllUnidadesFederais(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [];
          for (let item of resultData200) result200.push(UFDto.fromJS(item));
        } else {
          result200 = null;
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getCidade(id) {
    let url_ = this.baseUrl + "/api/services/app/Pais/GetCidade?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetCidade(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetCidade(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetCidade(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = CidadeDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param paisId (optional)
   * @param uFId (optional)
   * @return OK
   */
  getAllCidades(paisId, uFId) {
    let url_ = this.baseUrl + "/api/services/app/Pais/GetAllCidades?";
    if (paisId === null) throw new Error("The parameter 'paisId' cannot be null.");else if (paisId !== undefined) url_ += "PaisId=" + encodeURIComponent("" + paisId) + "&";
    if (uFId === null) throw new Error("The parameter 'uFId' cannot be null.");else if (uFId !== undefined) url_ += "UFId=" + encodeURIComponent("" + uFId) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllCidades(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllCidades(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllCidades(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [];
          for (let item of resultData200) result200.push(CidadeDto.fromJS(item));
        } else {
          result200 = null;
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function PaisServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || PaisServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: PaisServiceProxy,
    factory: PaisServiceProxy.ɵfac
  }))();
}
class ProtocoloAvaliacaoServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getByAplicacao(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/GetByAplicacao?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetByAplicacao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetByAplicacao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetByAplicacao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ProtocoloAvaliacaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param casoId (optional)
   * @param habilidadesId (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(keyword, casoId, habilidadesId, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (habilidadesId === null) throw new Error("The parameter 'habilidadesId' cannot be null.");else if (habilidadesId !== undefined) habilidadesId && habilidadesId.forEach(item => {
      url_ += "HabilidadesId=" + encodeURIComponent("" + item) + "&";
    });
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ProtocoloAvaliacaoDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @return OK
   */
  getAllTiposConfirmacaoHabilidade() {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/GetAllTiposConfirmacaoHabilidade";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllTiposConfirmacaoHabilidade(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllTiposConfirmacaoHabilidade(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllTiposConfirmacaoHabilidade(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (Array.isArray(resultData200)) {
          result200 = [];
          for (let item of resultData200) result200.push(TipoConfirmacaoHabilidadeDto.fromJS(item));
        } else {
          result200 = null;
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param protocoloId (optional)
   * @param casoId (optional)
   * @param habilidadesId (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAllNiveis(keyword, protocoloId, casoId, habilidadesId, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/GetAllNiveis?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (protocoloId === null) throw new Error("The parameter 'protocoloId' cannot be null.");else if (protocoloId !== undefined) url_ += "ProtocoloId=" + encodeURIComponent("" + protocoloId) + "&";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (habilidadesId === null) throw new Error("The parameter 'habilidadesId' cannot be null.");else if (habilidadesId !== undefined) habilidadesId && habilidadesId.forEach(item => {
      url_ += "HabilidadesId=" + encodeURIComponent("" + item) + "&";
    });
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllNiveis(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllNiveis(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllNiveis(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = NivelDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getNivel(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/GetNivel?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetNivel(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetNivel(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetNivel(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = NivelDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  createNivel(body) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/CreateNivel";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreateNivel(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreateNivel(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreateNivel(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = NivelDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  updateNivel(body) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/UpdateNivel";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdateNivel(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdateNivel(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdateNivel(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = NivelDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  deleteNivel(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/DeleteNivel?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDeleteNivel(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDeleteNivel(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDeleteNivel(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param protocoloId (optional)
   * @param nivelId (optional)
   * @param casoId (optional)
   * @param habilidadesId (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAllDominios(keyword, protocoloId, nivelId, casoId, habilidadesId, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/GetAllDominios?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (protocoloId === null) throw new Error("The parameter 'protocoloId' cannot be null.");else if (protocoloId !== undefined) url_ += "ProtocoloId=" + encodeURIComponent("" + protocoloId) + "&";
    if (nivelId === null) throw new Error("The parameter 'nivelId' cannot be null.");else if (nivelId !== undefined) url_ += "NivelId=" + encodeURIComponent("" + nivelId) + "&";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (habilidadesId === null) throw new Error("The parameter 'habilidadesId' cannot be null.");else if (habilidadesId !== undefined) habilidadesId && habilidadesId.forEach(item => {
      url_ += "HabilidadesId=" + encodeURIComponent("" + item) + "&";
    });
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllDominios(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllDominios(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllDominios(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = DominioDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getDominio(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/GetDominio?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetDominio(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetDominio(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetDominio(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = DominioDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  createDominio(body) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/CreateDominio";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreateDominio(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreateDominio(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreateDominio(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = DominioDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  updateDominio(body) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/UpdateDominio";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdateDominio(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdateDominio(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdateDominio(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = DominioDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  deleteDominio(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/DeleteDominio?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDeleteDominio(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDeleteDominio(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDeleteDominio(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param avulsas (optional)
   * @param personalizadas (optional)
   * @param dominioId (optional)
   * @param nivelId (optional)
   * @param protocoloId (optional)
   * @param casoId (optional)
   * @param habilidadesId (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAllHabilidades(keyword, avulsas, personalizadas, dominioId, nivelId, protocoloId, casoId, habilidadesId, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/GetAllHabilidades?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (avulsas === null) throw new Error("The parameter 'avulsas' cannot be null.");else if (avulsas !== undefined) url_ += "Avulsas=" + encodeURIComponent("" + avulsas) + "&";
    if (personalizadas === null) throw new Error("The parameter 'personalizadas' cannot be null.");else if (personalizadas !== undefined) url_ += "Personalizadas=" + encodeURIComponent("" + personalizadas) + "&";
    if (dominioId === null) throw new Error("The parameter 'dominioId' cannot be null.");else if (dominioId !== undefined) url_ += "DominioId=" + encodeURIComponent("" + dominioId) + "&";
    if (nivelId === null) throw new Error("The parameter 'nivelId' cannot be null.");else if (nivelId !== undefined) url_ += "NivelId=" + encodeURIComponent("" + nivelId) + "&";
    if (protocoloId === null) throw new Error("The parameter 'protocoloId' cannot be null.");else if (protocoloId !== undefined) url_ += "ProtocoloId=" + encodeURIComponent("" + protocoloId) + "&";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (habilidadesId === null) throw new Error("The parameter 'habilidadesId' cannot be null.");else if (habilidadesId !== undefined) habilidadesId && habilidadesId.forEach(item => {
      url_ += "HabilidadesId=" + encodeURIComponent("" + item) + "&";
    });
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllHabilidades(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllHabilidades(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllHabilidades(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = HabilidadeDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  createHabilidade(body) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/CreateHabilidade";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreateHabilidade(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreateHabilidade(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreateHabilidade(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = HabilidadeDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getHabilidade(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/GetHabilidade?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetHabilidade(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetHabilidade(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetHabilidade(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = HabilidadeDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  updateHabilidade(body) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/UpdateHabilidade";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdateHabilidade(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdateHabilidade(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdateHabilidade(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = HabilidadeDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  deleteHabilidade(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/DeleteHabilidade?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDeleteHabilidade(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDeleteHabilidade(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDeleteHabilidade(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ProtocoloAvaliacaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ProtocoloAvaliacaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ProtocoloAvaliacaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloAvaliacao/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function ProtocoloAvaliacaoServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || ProtocoloAvaliacaoServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: ProtocoloAvaliacaoServiceProxy,
    factory: ProtocoloAvaliacaoServiceProxy.ɵfac
  }))();
}
class ProtocoloIntervencaoServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getByAplicacao(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloIntervencao/GetByAplicacao?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetByAplicacao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetByAplicacao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetByAplicacao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = VersaoProtIntervencaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloIntervencao/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ProtocoloIntervencaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloIntervencao/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param protocoloIntervencaoId (optional)
   * @param casoId (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAllVersoes(protocoloIntervencaoId, casoId, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloIntervencao/GetAllVersoes?";
    if (protocoloIntervencaoId === null) throw new Error("The parameter 'protocoloIntervencaoId' cannot be null.");else if (protocoloIntervencaoId !== undefined) url_ += "ProtocoloIntervencaoId=" + encodeURIComponent("" + protocoloIntervencaoId) + "&";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllVersoes(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllVersoes(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllVersoes(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = VersaoProtIntervencaoDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  createVersao(body) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloIntervencao/CreateVersao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreateVersao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreateVersao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreateVersao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = VersaoProtIntervencaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getVersao(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloIntervencao/GetVersao?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetVersao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetVersao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetVersao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = VersaoProtIntervencaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  updateVersao(body) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloIntervencao/UpdateVersao";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdateVersao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdateVersao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdateVersao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = VersaoProtIntervencaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  deleteVersao(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloIntervencao/DeleteVersao?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDeleteVersao(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDeleteVersao(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDeleteVersao(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloIntervencao/GetAll?";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ProtocoloIntervencaoDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloIntervencao/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ProtocoloIntervencaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/ProtocoloIntervencao/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ProtocoloIntervencaoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function ProtocoloIntervencaoServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || ProtocoloIntervencaoServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: ProtocoloIntervencaoServiceProxy,
    factory: ProtocoloIntervencaoServiceProxy.ɵfac
  }))();
}
class ProvedorSaudeServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/ProvedorSaude/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ProvedorSaudeDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param alunoId (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(alunoId, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/ProvedorSaude/GetAll?";
    if (alunoId === null) throw new Error("The parameter 'alunoId' cannot be null.");else if (alunoId !== undefined) url_ += "AlunoId=" + encodeURIComponent("" + alunoId) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ProvedorSaudeDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/ProvedorSaude/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ProvedorSaudeDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/ProvedorSaude/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ProvedorSaudeDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/ProvedorSaude/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function ProvedorSaudeServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || ProvedorSaudeServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: ProvedorSaudeServiceProxy,
    factory: ProvedorSaudeServiceProxy.ɵfac
  }))();
}
class RefBibliograficaServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/RefBibliografica/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RefBibliograficaDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(keyword, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/RefBibliografica/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RefBibliograficaDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/RefBibliografica/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RefBibliograficaDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/RefBibliografica/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RefBibliograficaDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/RefBibliografica/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function RefBibliograficaServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || RefBibliograficaServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: RefBibliograficaServiceProxy,
    factory: RefBibliograficaServiceProxy.ɵfac
  }))();
}
class ResponsavelServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/Responsavel/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ResponsavelDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  createUserParaPessoa(body) {
    let url_ = this.baseUrl + "/api/services/app/Responsavel/CreateUserParaPessoa";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreateUserParaPessoa(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreateUserParaPessoa(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreateUserParaPessoa(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(keyword, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/Responsavel/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ResponsavelDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/Responsavel/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ResponsavelDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/Responsavel/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ResponsavelDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/Responsavel/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function ResponsavelServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || ResponsavelServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: ResponsavelServiceProxy,
    factory: ResponsavelServiceProxy.ɵfac
  }))();
}
class RoleServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/Role/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param permission (optional)
   * @return OK
   */
  getRoles(permission) {
    let url_ = this.baseUrl + "/api/services/app/Role/GetRoles?";
    if (permission === null) throw new Error("The parameter 'permission' cannot be null.");else if (permission !== undefined) url_ += "Permission=" + encodeURIComponent("" + permission) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetRoles(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetRoles(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetRoles(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleListDtoListResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/Role/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/Role/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @return OK
   */
  getAllPermissions() {
    let url_ = this.baseUrl + "/api/services/app/Role/GetAllPermissions";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAllPermissions(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAllPermissions(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAllPermissions(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = PermissionDtoListResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  getRoleForEdit(id) {
    let url_ = this.baseUrl + "/api/services/app/Role/GetRoleForEdit?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetRoleForEdit(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetRoleForEdit(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetRoleForEdit(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetRoleForEditOutput.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/Role/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(keyword, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/Role/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function RoleServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || RoleServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: RoleServiceProxy,
    factory: RoleServiceProxy.ɵfac
  }))();
}
class ServicoPrestadoServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/ServicoPrestado/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ServicoPrestadoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param colaboradorId (optional)
   * @param colaboradorFuncaoId (optional)
   * @param atuacaoId (optional)
   * @param casoId (optional)
   * @param aPartirDe (optional)
   * @param ate (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(colaboradorId, colaboradorFuncaoId, atuacaoId, casoId, aPartirDe, ate, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/ServicoPrestado/GetAll?";
    if (colaboradorId === null) throw new Error("The parameter 'colaboradorId' cannot be null.");else if (colaboradorId !== undefined) url_ += "ColaboradorId=" + encodeURIComponent("" + colaboradorId) + "&";
    if (colaboradorFuncaoId === null) throw new Error("The parameter 'colaboradorFuncaoId' cannot be null.");else if (colaboradorFuncaoId !== undefined) url_ += "ColaboradorFuncaoId=" + encodeURIComponent("" + colaboradorFuncaoId) + "&";
    if (atuacaoId === null) throw new Error("The parameter 'atuacaoId' cannot be null.");else if (atuacaoId !== undefined) url_ += "AtuacaoId=" + encodeURIComponent("" + atuacaoId) + "&";
    if (casoId === null) throw new Error("The parameter 'casoId' cannot be null.");else if (casoId !== undefined) url_ += "CasoId=" + encodeURIComponent("" + casoId) + "&";
    if (aPartirDe === null) throw new Error("The parameter 'aPartirDe' cannot be null.");else if (aPartirDe !== undefined) url_ += "APartirDe=" + encodeURIComponent(aPartirDe ? "" + aPartirDe.toISOString() : "") + "&";
    if (ate === null) throw new Error("The parameter 'ate' cannot be null.");else if (ate !== undefined) url_ += "Ate=" + encodeURIComponent(ate ? "" + ate.toISOString() : "") + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ServicoPrestadoDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/ServicoPrestado/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ServicoPrestadoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/ServicoPrestado/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = ServicoPrestadoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/ServicoPrestado/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function ServicoPrestadoServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || ServicoPrestadoServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: ServicoPrestadoServiceProxy,
    factory: ServicoPrestadoServiceProxy.ɵfac
  }))();
}
class SessionServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @return OK
   */
  getCurrentLoginInformations() {
    let url_ = this.baseUrl + "/api/services/app/Session/GetCurrentLoginInformations";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetCurrentLoginInformations(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetCurrentLoginInformations(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetCurrentLoginInformations(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = GetCurrentLoginInformationsOutput.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function SessionServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || SessionServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: SessionServiceProxy,
    factory: SessionServiceProxy.ɵfac
  }))();
}
class TecnicaServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/Tecnica/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TecnicaDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param refBibId (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(keyword, refBibId, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/Tecnica/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (refBibId === null) throw new Error("The parameter 'refBibId' cannot be null.");else if (refBibId !== undefined) url_ += "RefBibId=" + encodeURIComponent("" + refBibId) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TecnicaDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/Tecnica/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TecnicaDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/Tecnica/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TecnicaDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/Tecnica/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function TecnicaServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || TecnicaServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: TecnicaServiceProxy,
    factory: TecnicaServiceProxy.ɵfac
  }))();
}
class TenantServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/Tenant/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TenantDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/Tenant/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/Tenant/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TenantDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param isActive (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(keyword, isActive, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/Tenant/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (isActive === null) throw new Error("The parameter 'isActive' cannot be null.");else if (isActive !== undefined) url_ += "IsActive=" + encodeURIComponent("" + isActive) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TenantDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/Tenant/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TenantDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function TenantServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || TenantServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: TenantServiceProxy,
    factory: TenantServiceProxy.ɵfac
  }))();
}
class TipoProvedorSaudeServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/TipoProvedorSaude/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TipoProvedorSaudeDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(keyword, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/TipoProvedorSaude/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TipoProvedorSaudeDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/TipoProvedorSaude/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TipoProvedorSaudeDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/TipoProvedorSaude/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TipoProvedorSaudeDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/TipoProvedorSaude/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function TipoProvedorSaudeServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || TipoProvedorSaudeServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: TipoProvedorSaudeServiceProxy,
    factory: TipoProvedorSaudeServiceProxy.ɵfac
  }))();
}
class TipoServicoPrestadoServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param nome (optional)
   * @param funcaoId (optional)
   * @param registravelAvulso (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(nome, funcaoId, registravelAvulso, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/TipoServicoPrestado/GetAll?";
    if (nome === null) throw new Error("The parameter 'nome' cannot be null.");else if (nome !== undefined) url_ += "Nome=" + encodeURIComponent("" + nome) + "&";
    if (funcaoId === null) throw new Error("The parameter 'funcaoId' cannot be null.");else if (funcaoId !== undefined) url_ += "FuncaoId=" + encodeURIComponent("" + funcaoId) + "&";
    if (registravelAvulso === null) throw new Error("The parameter 'registravelAvulso' cannot be null.");else if (registravelAvulso !== undefined) url_ += "RegistravelAvulso=" + encodeURIComponent("" + registravelAvulso) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TipoServicoPrestadoDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/TipoServicoPrestado/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TipoServicoPrestadoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/TipoServicoPrestado/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TipoServicoPrestadoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/TipoServicoPrestado/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = TipoServicoPrestadoDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/TipoServicoPrestado/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function TipoServicoPrestadoServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || TipoServicoPrestadoServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: TipoServicoPrestadoServiceProxy,
    factory: TipoServicoPrestadoServiceProxy.ɵfac
  }))();
}
class TokenAuthServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  authenticate(body) {
    let url_ = this.baseUrl + "/api/TokenAuth/Authenticate";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processAuthenticate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processAuthenticate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processAuthenticate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = AuthenticateResultModel.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function TokenAuthServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || TokenAuthServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: TokenAuthServiceProxy,
    factory: TokenAuthServiceProxy.ɵfac
  }))();
}
class UserServiceProxy {
  constructor(http, baseUrl) {
    this.jsonParseReviver = undefined;
    this.http = http;
    this.baseUrl = baseUrl ?? "";
  }
  /**
   * @param body (optional)
   * @return OK
   */
  create(body) {
    let url_ = this.baseUrl + "/api/services/app/User/Create";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processCreate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processCreate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processCreate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  update(body) {
    let url_ = this.baseUrl + "/api/services/app/User/Update";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processUpdate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processUpdate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processUpdate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  delete(id) {
    let url_ = this.baseUrl + "/api/services/app/User/Delete?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
    };
    return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDelete(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDelete(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDelete(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  activate(body) {
    let url_ = this.baseUrl + "/api/services/app/User/Activate";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processActivate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processActivate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processActivate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  deActivate(body) {
    let url_ = this.baseUrl + "/api/services/app/User/DeActivate";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processDeActivate(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processDeActivate(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processDeActivate(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @return OK
   */
  getRoles() {
    let url_ = this.baseUrl + "/api/services/app/User/GetRoles";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetRoles(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetRoles(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetRoles(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = RoleDtoListResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  changeLanguage(body) {
    let url_ = this.baseUrl + "/api/services/app/User/ChangeLanguage";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processChangeLanguage(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processChangeLanguage(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processChangeLanguage(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  changePassword(body) {
    let url_ = this.baseUrl + "/api/services/app/User/ChangePassword";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processChangePassword(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processChangePassword(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processChangePassword(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : null;
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param body (optional)
   * @return OK
   */
  resetPassword(body) {
    let url_ = this.baseUrl + "/api/services/app/User/ResetPassword";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(body);
    let options_ = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "text/plain"
      })
    };
    return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processResetPassword(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processResetPassword(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processResetPassword(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : null;
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param id (optional)
   * @return OK
   */
  get(id) {
    let url_ = this.baseUrl + "/api/services/app/User/Get?";
    if (id === null) throw new Error("The parameter 'id' cannot be null.");else if (id !== undefined) url_ += "Id=" + encodeURIComponent("" + id) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGet(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGet(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGet(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  /**
   * @param keyword (optional)
   * @param isActive (optional)
   * @param skipCount (optional)
   * @param maxResultCount (optional)
   * @return OK
   */
  getAll(keyword, isActive, skipCount, maxResultCount) {
    let url_ = this.baseUrl + "/api/services/app/User/GetAll?";
    if (keyword === null) throw new Error("The parameter 'keyword' cannot be null.");else if (keyword !== undefined) url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
    if (isActive === null) throw new Error("The parameter 'isActive' cannot be null.");else if (isActive !== undefined) url_ += "IsActive=" + encodeURIComponent("" + isActive) + "&";
    if (skipCount === null) throw new Error("The parameter 'skipCount' cannot be null.");else if (skipCount !== undefined) url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
    if (maxResultCount === null) throw new Error("The parameter 'maxResultCount' cannot be null.");else if (maxResultCount !== undefined) url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
    url_ = url_.replace(/[?&]$/, "");
    let options_ = {
      observe: "response",
      responseType: "blob",
      headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
        "Accept": "text/plain"
      })
    };
    return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(response_ => {
      return this.processGetAll(response_);
    })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(response_ => {
      if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
        try {
          return this.processGetAll(response_);
        } catch (e) {
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
        }
      } else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
    }));
  }
  processGetAll(response) {
    const status = response.status;
    const responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body : response.error instanceof Blob ? response.error : undefined;
    let _headers = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        let result200 = null;
        let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = UserDtoPagedResultDto.fromJS(resultData200);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
      }));
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(_responseText => {
        return throwException("An unexpected server error occurred.", status, _responseText, _headers);
      }));
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
  }
  static #_ = (() => this.ɵfac = function UserServiceProxy_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || UserServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: UserServiceProxy,
    factory: UserServiceProxy.ɵfac
  }))();
}
class AlunoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.responsaveis = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.generoId = _data["generoId"];
      this.genero_Abreviacao = _data["genero_Abreviacao"];
      this.genero_Nome = _data["genero_Nome"];
      this.cpf = _data["cpf"];
      this.dataNascimento = _data["dataNascimento"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataNascimento"].toString()) : undefined;
      this.infoContato_Email = _data["infoContato_Email"];
      this.infoContato_Telefone1 = _data["infoContato_Telefone1"];
      this.infoContato_Telefone2 = _data["infoContato_Telefone2"];
      this.endereco_Linha1 = _data["endereco_Linha1"];
      this.endereco_Linha2 = _data["endereco_Linha2"];
      this.endereco_Bairro = _data["endereco_Bairro"];
      this.endereco_CodigoPostal = _data["endereco_CodigoPostal"];
      this.endereco_CidadeId = _data["endereco_CidadeId"];
      this.userId = _data["userId"];
      this.casoId = _data["casoId"];
      if (Array.isArray(_data["responsaveis"])) {
        this.responsaveis = [];
        for (let item of _data["responsaveis"]) this.responsaveis.push(Int64EntityDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new AlunoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["generoId"] = this.generoId;
    data["genero_Abreviacao"] = this.genero_Abreviacao;
    data["genero_Nome"] = this.genero_Nome;
    data["cpf"] = this.cpf;
    data["dataNascimento"] = this.dataNascimento ? this.dataNascimento.format('YYYY-MM-DD') : undefined;
    data["infoContato_Email"] = this.infoContato_Email;
    data["infoContato_Telefone1"] = this.infoContato_Telefone1;
    data["infoContato_Telefone2"] = this.infoContato_Telefone2;
    data["endereco_Linha1"] = this.endereco_Linha1;
    data["endereco_Linha2"] = this.endereco_Linha2;
    data["endereco_Bairro"] = this.endereco_Bairro;
    data["endereco_CodigoPostal"] = this.endereco_CodigoPostal;
    data["endereco_CidadeId"] = this.endereco_CidadeId;
    data["userId"] = this.userId;
    data["casoId"] = this.casoId;
    if (Array.isArray(this.responsaveis)) {
      data["responsaveis"] = [];
      for (let item of this.responsaveis) data["responsaveis"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new AlunoDto();
    result.init(json);
    return result;
  }
}
class AlunoDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(AlunoDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new AlunoDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new AlunoDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class AplicacaoPassoProtIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.modeloPassoId = _data["modeloPassoId"];
      this.dataInicio = _data["dataInicio"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataInicio"].toString()) : undefined;
      this.dataLinhaDeBase = _data["dataLinhaDeBase"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataLinhaDeBase"].toString()) : undefined;
      this.dataIntroducao = _data["dataIntroducao"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataIntroducao"].toString()) : undefined;
      this.dataCriterioAlcancado = _data["dataCriterioAlcancado"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataCriterioAlcancado"].toString()) : undefined;
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new AplicacaoPassoProtIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["modeloPassoId"] = this.modeloPassoId;
    data["dataInicio"] = this.dataInicio ? this.dataInicio.toISOString() : undefined;
    data["dataLinhaDeBase"] = this.dataLinhaDeBase ? this.dataLinhaDeBase.toISOString() : undefined;
    data["dataIntroducao"] = this.dataIntroducao ? this.dataIntroducao.toISOString() : undefined;
    data["dataCriterioAlcancado"] = this.dataCriterioAlcancado ? this.dataCriterioAlcancado.toISOString() : undefined;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new AplicacaoPassoProtIntervencaoDto();
    result.init(json);
    return result;
  }
}
class AplicacaoProtocoloAvaliacaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.habilidades = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.protocoloAvaliacaoId = _data["protocoloAvaliacaoId"];
      this.dataInicio = _data["dataInicio"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataInicio"].toString()) : undefined;
      this.dataArquivamento = _data["dataArquivamento"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataArquivamento"].toString()) : undefined;
      if (Array.isArray(_data["habilidades"])) {
        this.habilidades = [];
        for (let item of _data["habilidades"]) this.habilidades.push(AquisicaoHabilidadeDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new AplicacaoProtocoloAvaliacaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["protocoloAvaliacaoId"] = this.protocoloAvaliacaoId;
    data["dataInicio"] = this.dataInicio ? this.dataInicio.toISOString() : undefined;
    data["dataArquivamento"] = this.dataArquivamento ? this.dataArquivamento.toISOString() : undefined;
    if (Array.isArray(this.habilidades)) {
      data["habilidades"] = [];
      for (let item of this.habilidades) data["habilidades"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new AplicacaoProtocoloAvaliacaoDto();
    result.init(json);
    return result;
  }
}
class AplicacaoProtocoloIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.passos = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.modeloId = _data["modeloId"];
      this.dataInicio = _data["dataInicio"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataInicio"].toString()) : undefined;
      this.dataManutencao = _data["dataManutencao"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataManutencao"].toString()) : undefined;
      this.dataAmbienteNatural = _data["dataAmbienteNatural"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataAmbienteNatural"].toString()) : undefined;
      this.dataArquivamento = _data["dataArquivamento"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataArquivamento"].toString()) : undefined;
      if (Array.isArray(_data["passos"])) {
        this.passos = [];
        for (let item of _data["passos"]) this.passos.push(AplicacaoPassoProtIntervencaoDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new AplicacaoProtocoloIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["modeloId"] = this.modeloId;
    data["dataInicio"] = this.dataInicio ? this.dataInicio.toISOString() : undefined;
    data["dataManutencao"] = this.dataManutencao ? this.dataManutencao.toISOString() : undefined;
    data["dataAmbienteNatural"] = this.dataAmbienteNatural ? this.dataAmbienteNatural.toISOString() : undefined;
    data["dataArquivamento"] = this.dataArquivamento ? this.dataArquivamento.toISOString() : undefined;
    if (Array.isArray(this.passos)) {
      data["passos"] = [];
      for (let item of this.passos) data["passos"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new AplicacaoProtocoloIntervencaoDto();
    result.init(json);
    return result;
  }
}
class ApplicationInfoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.version = _data["version"];
      this.releaseDate = _data["releaseDate"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["releaseDate"].toString()) : undefined;
      if (_data["features"]) {
        this.features = {};
        for (let key in _data["features"]) {
          if (_data["features"].hasOwnProperty(key)) this.features[key] = _data["features"][key];
        }
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ApplicationInfoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["version"] = this.version;
    data["releaseDate"] = this.releaseDate ? this.releaseDate.toISOString() : undefined;
    if (this.features) {
      data["features"] = {};
      for (let key in this.features) {
        if (this.features.hasOwnProperty(key)) data["features"][key] = this.features[key];
      }
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ApplicationInfoDto();
    result.init(json);
    return result;
  }
}
class AquisicaoHabilidadeDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.habilidadeId = _data["habilidadeId"];
      this.dataAdquirida = _data["dataAdquirida"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataAdquirida"].toString()) : undefined;
      this.confirmacaoDireta = _data["confirmacaoDireta"];
      this.notaConfirmacao = _data["notaConfirmacao"];
      this.atendimentoAquisicaoId = _data["atendimentoAquisicaoId"];
      this.atuacaoRelatorConfirmacaoId = _data["atuacaoRelatorConfirmacaoId"];
      this.observacao = _data["observacao"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new AquisicaoHabilidadeDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["habilidadeId"] = this.habilidadeId;
    data["dataAdquirida"] = this.dataAdquirida ? this.dataAdquirida.toISOString() : undefined;
    data["confirmacaoDireta"] = this.confirmacaoDireta;
    data["notaConfirmacao"] = this.notaConfirmacao;
    data["atendimentoAquisicaoId"] = this.atendimentoAquisicaoId;
    data["atuacaoRelatorConfirmacaoId"] = this.atuacaoRelatorConfirmacaoId;
    data["observacao"] = this.observacao;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new AquisicaoHabilidadeDto();
    result.init(json);
    return result;
  }
}
class AtuacaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.colabFuncaoId = _data["colabFuncaoId"];
      this.casoId = _data["casoId"];
      this.dataInicio = _data["dataInicio"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataInicio"].toString()) : undefined;
      this.dataFim = _data["dataFim"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataFim"].toString()) : undefined;
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new AtuacaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["colabFuncaoId"] = this.colabFuncaoId;
    data["casoId"] = this.casoId;
    data["dataInicio"] = this.dataInicio ? this.dataInicio.toISOString() : undefined;
    data["dataFim"] = this.dataFim ? this.dataFim.toISOString() : undefined;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new AtuacaoDto();
    result.init(json);
    return result;
  }
}
class AuthenticateModel {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.userNameOrEmailAddress = _data["userNameOrEmailAddress"];
      this.password = _data["password"];
      this.rememberClient = _data["rememberClient"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new AuthenticateModel();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["userNameOrEmailAddress"] = this.userNameOrEmailAddress;
    data["password"] = this.password;
    data["rememberClient"] = this.rememberClient;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new AuthenticateModel();
    result.init(json);
    return result;
  }
}
class AuthenticateResultModel {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.accessToken = _data["accessToken"];
      this.encryptedAccessToken = _data["encryptedAccessToken"];
      this.expireInSeconds = _data["expireInSeconds"];
      this.userId = _data["userId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new AuthenticateResultModel();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["accessToken"] = this.accessToken;
    data["encryptedAccessToken"] = this.encryptedAccessToken;
    data["expireInSeconds"] = this.expireInSeconds;
    data["userId"] = this.userId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new AuthenticateResultModel();
    result.init(json);
    return result;
  }
}
class CasoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.aluno = new PessoaDto();
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.aluno = _data["aluno"] ? PessoaDto.fromJS(_data["aluno"]) : new PessoaDto();
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CasoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["aluno"] = this.aluno ? this.aluno.toJSON() : undefined;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CasoDto();
    result.init(json);
    return result;
  }
}
class ChangePasswordDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.currentPassword = _data["currentPassword"];
      this.newPassword = _data["newPassword"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ChangePasswordDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["currentPassword"] = this.currentPassword;
    data["newPassword"] = this.newPassword;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ChangePasswordDto();
    result.init(json);
    return result;
  }
}
class ChangeUiThemeInput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.theme = _data["theme"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ChangeUiThemeInput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["theme"] = this.theme;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ChangeUiThemeInput();
    result.init(json);
    return result;
  }
}
class ChangeUserLanguageDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.languageName = _data["languageName"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ChangeUserLanguageDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["languageName"] = this.languageName;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ChangeUserLanguageDto();
    result.init(json);
    return result;
  }
}
class CidadeDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.ufId = _data["ufId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CidadeDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["ufId"] = this.ufId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CidadeDto();
    result.init(json);
    return result;
  }
}
class ColabFuncaoOrgDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.funcaoOrgId = _data["funcaoOrgId"];
      this.colaboradorId = _data["colaboradorId"];
      this.dataInicio = _data["dataInicio"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataInicio"].toString()) : undefined;
      this.dataFim = _data["dataFim"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataFim"].toString()) : undefined;
      this.gestorId = _data["gestorId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ColabFuncaoOrgDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["funcaoOrgId"] = this.funcaoOrgId;
    data["colaboradorId"] = this.colaboradorId;
    data["dataInicio"] = this.dataInicio ? this.dataInicio.toISOString() : undefined;
    data["dataFim"] = this.dataFim ? this.dataFim.toISOString() : undefined;
    data["gestorId"] = this.gestorId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ColabFuncaoOrgDto();
    result.init(json);
    return result;
  }
}
class ColabFuncaoOrgDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(ColabFuncaoOrgDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ColabFuncaoOrgDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ColabFuncaoOrgDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class ColaboradorDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.generoId = _data["generoId"];
      this.genero_Abreviacao = _data["genero_Abreviacao"];
      this.genero_Nome = _data["genero_Nome"];
      this.cpf = _data["cpf"];
      this.dataNascimento = _data["dataNascimento"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataNascimento"].toString()) : undefined;
      this.infoContato_Email = _data["infoContato_Email"];
      this.infoContato_Telefone1 = _data["infoContato_Telefone1"];
      this.infoContato_Telefone2 = _data["infoContato_Telefone2"];
      this.endereco_Linha1 = _data["endereco_Linha1"];
      this.endereco_Linha2 = _data["endereco_Linha2"];
      this.endereco_Bairro = _data["endereco_Bairro"];
      this.endereco_CodigoPostal = _data["endereco_CodigoPostal"];
      this.endereco_CidadeId = _data["endereco_CidadeId"];
      this.userId = _data["userId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ColaboradorDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["generoId"] = this.generoId;
    data["genero_Abreviacao"] = this.genero_Abreviacao;
    data["genero_Nome"] = this.genero_Nome;
    data["cpf"] = this.cpf;
    data["dataNascimento"] = this.dataNascimento ? this.dataNascimento.format('YYYY-MM-DD') : undefined;
    data["infoContato_Email"] = this.infoContato_Email;
    data["infoContato_Telefone1"] = this.infoContato_Telefone1;
    data["infoContato_Telefone2"] = this.infoContato_Telefone2;
    data["endereco_Linha1"] = this.endereco_Linha1;
    data["endereco_Linha2"] = this.endereco_Linha2;
    data["endereco_Bairro"] = this.endereco_Bairro;
    data["endereco_CodigoPostal"] = this.endereco_CodigoPostal;
    data["endereco_CidadeId"] = this.endereco_CidadeId;
    data["userId"] = this.userId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ColaboradorDto();
    result.init(json);
    return result;
  }
}
class ColaboradorDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(ColaboradorDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ColaboradorDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ColaboradorDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class CreateAlunoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.responsaveis = [];
    }
  }
  init(_data) {
    if (_data) {
      this.nome = _data["nome"];
      this.generoId = _data["generoId"];
      this.cpf = _data["cpf"];
      this.dataNascimento = _data["dataNascimento"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataNascimento"].toString()) : undefined;
      this.infoContato_Email = _data["infoContato_Email"];
      this.infoContato_Telefone1 = _data["infoContato_Telefone1"];
      this.infoContato_Telefone2 = _data["infoContato_Telefone2"];
      this.endereco_Linha1 = _data["endereco_Linha1"];
      this.endereco_Linha2 = _data["endereco_Linha2"];
      this.endereco_Bairro = _data["endereco_Bairro"];
      this.endereco_CodigoPostal = _data["endereco_CodigoPostal"];
      this.endereco_CidadeId = _data["endereco_CidadeId"];
      if (Array.isArray(_data["responsaveis"])) {
        this.responsaveis = [];
        for (let item of _data["responsaveis"]) this.responsaveis.push(Int64EntityDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateAlunoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["nome"] = this.nome;
    data["generoId"] = this.generoId;
    data["cpf"] = this.cpf;
    data["dataNascimento"] = this.dataNascimento ? this.dataNascimento.format('YYYY-MM-DD') : undefined;
    data["infoContato_Email"] = this.infoContato_Email;
    data["infoContato_Telefone1"] = this.infoContato_Telefone1;
    data["infoContato_Telefone2"] = this.infoContato_Telefone2;
    data["endereco_Linha1"] = this.endereco_Linha1;
    data["endereco_Linha2"] = this.endereco_Linha2;
    data["endereco_Bairro"] = this.endereco_Bairro;
    data["endereco_CodigoPostal"] = this.endereco_CodigoPostal;
    data["endereco_CidadeId"] = this.endereco_CidadeId;
    if (Array.isArray(this.responsaveis)) {
      data["responsaveis"] = [];
      for (let item of this.responsaveis) data["responsaveis"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateAlunoDto();
    result.init(json);
    return result;
  }
}
class CreateAplicacaoProtocoloAvaliacaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.casoId = _data["casoId"];
      this.protocoloAvaliacaoId = _data["protocoloAvaliacaoId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateAplicacaoProtocoloAvaliacaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["casoId"] = this.casoId;
    data["protocoloAvaliacaoId"] = this.protocoloAvaliacaoId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateAplicacaoProtocoloAvaliacaoDto();
    result.init(json);
    return result;
  }
}
class CreateAplicacaoProtocoloIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.casoId = _data["casoId"];
      this.protocoloIntervencaoId = _data["protocoloIntervencaoId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateAplicacaoProtocoloIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["casoId"] = this.casoId;
    data["protocoloIntervencaoId"] = this.protocoloIntervencaoId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateAplicacaoProtocoloIntervencaoDto();
    result.init(json);
    return result;
  }
}
class CreateAtuacaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.casoId = _data["casoId"];
      this.colabFuncaoId = _data["colabFuncaoId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateAtuacaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["casoId"] = this.casoId;
    data["colabFuncaoId"] = this.colabFuncaoId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateAtuacaoDto();
    result.init(json);
    return result;
  }
}
class CreateColabFuncaoOrgDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.colaboradorId = _data["colaboradorId"];
      this.funcaoOrgId = _data["funcaoOrgId"];
      this.gestorId = _data["gestorId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateColabFuncaoOrgDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["colaboradorId"] = this.colaboradorId;
    data["funcaoOrgId"] = this.funcaoOrgId;
    data["gestorId"] = this.gestorId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateColabFuncaoOrgDto();
    result.init(json);
    return result;
  }
}
class CreateColaboradorDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.nome = _data["nome"];
      this.generoId = _data["generoId"];
      this.cpf = _data["cpf"];
      this.dataNascimento = _data["dataNascimento"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataNascimento"].toString()) : undefined;
      this.infoContato_Email = _data["infoContato_Email"];
      this.infoContato_Telefone1 = _data["infoContato_Telefone1"];
      this.infoContato_Telefone2 = _data["infoContato_Telefone2"];
      this.endereco_Linha1 = _data["endereco_Linha1"];
      this.endereco_Linha2 = _data["endereco_Linha2"];
      this.endereco_Bairro = _data["endereco_Bairro"];
      this.endereco_CodigoPostal = _data["endereco_CodigoPostal"];
      this.endereco_CidadeId = _data["endereco_CidadeId"];
      if (Array.isArray(_data["funcoes"])) {
        this.funcoes = [];
        for (let item of _data["funcoes"]) this.funcoes.push(item);
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateColaboradorDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["nome"] = this.nome;
    data["generoId"] = this.generoId;
    data["cpf"] = this.cpf;
    data["dataNascimento"] = this.dataNascimento ? this.dataNascimento.format('YYYY-MM-DD') : undefined;
    data["infoContato_Email"] = this.infoContato_Email;
    data["infoContato_Telefone1"] = this.infoContato_Telefone1;
    data["infoContato_Telefone2"] = this.infoContato_Telefone2;
    data["endereco_Linha1"] = this.endereco_Linha1;
    data["endereco_Linha2"] = this.endereco_Linha2;
    data["endereco_Bairro"] = this.endereco_Bairro;
    data["endereco_CodigoPostal"] = this.endereco_CodigoPostal;
    data["endereco_CidadeId"] = this.endereco_CidadeId;
    if (Array.isArray(this.funcoes)) {
      data["funcoes"] = [];
      for (let item of this.funcoes) data["funcoes"].push(item);
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateColaboradorDto();
    result.init(json);
    return result;
  }
}
class CreateDominioDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.habilidades = [];
    }
  }
  init(_data) {
    if (_data) {
      this.nivelId = _data["nivelId"];
      this.codigo = _data["codigo"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      if (Array.isArray(_data["habilidades"])) {
        this.habilidades = [];
        for (let item of _data["habilidades"]) this.habilidades.push(CreateHabilidadeDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateDominioDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["nivelId"] = this.nivelId;
    data["codigo"] = this.codigo;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    if (Array.isArray(this.habilidades)) {
      data["habilidades"] = [];
      for (let item of this.habilidades) data["habilidades"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateDominioDto();
    result.init(json);
    return result;
  }
}
class CreateGestaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.novoGerenciadoId = _data["novoGerenciadoId"];
      this.gestorId = _data["gestorId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateGestaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["novoGerenciadoId"] = this.novoGerenciadoId;
    data["gestorId"] = this.gestorId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateGestaoDto();
    result.init(json);
    return result;
  }
}
class CreateHabilidadeDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.isPersonalizada = _data["isPersonalizada"];
      this.dominioId = _data["dominioId"];
      this.codigo = _data["codigo"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.confirmacaoExplicitaRequeridaId = _data["confirmacaoExplicitaRequeridaId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateHabilidadeDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["isPersonalizada"] = this.isPersonalizada;
    data["dominioId"] = this.dominioId;
    data["codigo"] = this.codigo;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["confirmacaoExplicitaRequeridaId"] = this.confirmacaoExplicitaRequeridaId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateHabilidadeDto();
    result.init(json);
    return result;
  }
}
class CreateHierarquiaAjudaDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.tiposAjuda = [];
    }
  }
  init(_data) {
    if (_data) {
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      if (Array.isArray(_data["tiposAjuda"])) {
        this.tiposAjuda = [];
        for (let item of _data["tiposAjuda"]) this.tiposAjuda.push(TipoAjudaDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateHierarquiaAjudaDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    if (Array.isArray(this.tiposAjuda)) {
      data["tiposAjuda"] = [];
      for (let item of this.tiposAjuda) data["tiposAjuda"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateHierarquiaAjudaDto();
    result.init(json);
    return result;
  }
}
class CreateNivelDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.dominios = [];
    }
  }
  init(_data) {
    if (_data) {
      this.protocoloAvaliacaoId = _data["protocoloAvaliacaoId"];
      this.ordenador = _data["ordenador"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.mesIniFaixaEtaria = _data["mesIniFaixaEtaria"];
      this.mesFimFaixaEtaria = _data["mesFimFaixaEtaria"];
      if (Array.isArray(_data["dominios"])) {
        this.dominios = [];
        for (let item of _data["dominios"]) this.dominios.push(CreateDominioDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateNivelDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["protocoloAvaliacaoId"] = this.protocoloAvaliacaoId;
    data["ordenador"] = this.ordenador;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["mesIniFaixaEtaria"] = this.mesIniFaixaEtaria;
    data["mesFimFaixaEtaria"] = this.mesFimFaixaEtaria;
    if (Array.isArray(this.dominios)) {
      data["dominios"] = [];
      for (let item of this.dominios) data["dominios"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateNivelDto();
    result.init(json);
    return result;
  }
}
class CreatePassoProtIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.desc = _data["desc"];
      this.marcoHabilidadeLinhaDeBaseId = _data["marcoHabilidadeLinhaDeBaseId"];
      this.marcoHabilidadeIntroducaoId = _data["marcoHabilidadeIntroducaoId"];
      this.marcoHabilidadeCriterioAlcancadoId = _data["marcoHabilidadeCriterioAlcancadoId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreatePassoProtIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["desc"] = this.desc;
    data["marcoHabilidadeLinhaDeBaseId"] = this.marcoHabilidadeLinhaDeBaseId;
    data["marcoHabilidadeIntroducaoId"] = this.marcoHabilidadeIntroducaoId;
    data["marcoHabilidadeCriterioAlcancadoId"] = this.marcoHabilidadeCriterioAlcancadoId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreatePassoProtIntervencaoDto();
    result.init(json);
    return result;
  }
}
class CreateProtocoloAvaliacaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.niveis = [];
    }
  }
  init(_data) {
    if (_data) {
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.refBibliograficaId = _data["refBibliograficaId"];
      if (Array.isArray(_data["niveis"])) {
        this.niveis = [];
        for (let item of _data["niveis"]) this.niveis.push(CreateNivelDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateProtocoloAvaliacaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["refBibliograficaId"] = this.refBibliograficaId;
    if (Array.isArray(this.niveis)) {
      data["niveis"] = [];
      for (let item of this.niveis) data["niveis"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateProtocoloAvaliacaoDto();
    result.init(json);
    return result;
  }
}
class CreateProtocoloIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.versaoPadrao = new CreateVersaoProtIntervencaoDto();
    }
  }
  init(_data) {
    if (_data) {
      this.nome = _data["nome"];
      this.versaoPadrao = _data["versaoPadrao"] ? CreateVersaoProtIntervencaoDto.fromJS(_data["versaoPadrao"]) : new CreateVersaoProtIntervencaoDto();
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateProtocoloIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["nome"] = this.nome;
    data["versaoPadrao"] = this.versaoPadrao ? this.versaoPadrao.toJSON() : undefined;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateProtocoloIntervencaoDto();
    result.init(json);
    return result;
  }
}
class CreateProvedorSaudeDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.subtipoId = _data["subtipoId"];
      this.alunoId = _data["alunoId"];
      this.campoInfo = _data["campoInfo"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateProvedorSaudeDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["subtipoId"] = this.subtipoId;
    data["alunoId"] = this.alunoId;
    data["campoInfo"] = this.campoInfo;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateProvedorSaudeDto();
    result.init(json);
    return result;
  }
}
class CreateRegistroAtendimentoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.casoId = _data["casoId"];
      this.atuacaoTerapeutaId = _data["atuacaoTerapeutaId"];
      this.inicio = _data["inicio"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["inicio"].toString()) : undefined;
      this.fim = _data["fim"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["fim"].toString()) : undefined;
      if (Array.isArray(_data["unidadesEnsino"])) {
        this.unidadesEnsino = [];
        for (let item of _data["unidadesEnsino"]) this.unidadesEnsino.push(CreateUnidadeEnsinoDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateRegistroAtendimentoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["casoId"] = this.casoId;
    data["atuacaoTerapeutaId"] = this.atuacaoTerapeutaId;
    data["inicio"] = this.inicio ? this.inicio.toISOString() : undefined;
    data["fim"] = this.fim ? this.fim.toISOString() : undefined;
    if (Array.isArray(this.unidadesEnsino)) {
      data["unidadesEnsino"] = [];
      for (let item of this.unidadesEnsino) data["unidadesEnsino"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateRegistroAtendimentoDto();
    result.init(json);
    return result;
  }
}
class CreateRegistroSupervisaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.participacoes = [];
    }
  }
  init(_data) {
    if (_data) {
      this.casoId = _data["casoId"];
      this.atuacaoSupervisorId = _data["atuacaoSupervisorId"];
      this.inicio = _data["inicio"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["inicio"].toString()) : undefined;
      this.fim = _data["fim"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["fim"].toString()) : undefined;
      if (Array.isArray(_data["participacoes"])) {
        this.participacoes = [];
        for (let item of _data["participacoes"]) this.participacoes.push(ParticipacaoSupervisaoDto.fromJS(item));
      }
      this.desc = _data["desc"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateRegistroSupervisaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["casoId"] = this.casoId;
    data["atuacaoSupervisorId"] = this.atuacaoSupervisorId;
    data["inicio"] = this.inicio ? this.inicio.toISOString() : undefined;
    data["fim"] = this.fim ? this.fim.toISOString() : undefined;
    if (Array.isArray(this.participacoes)) {
      data["participacoes"] = [];
      for (let item of this.participacoes) data["participacoes"].push(item.toJSON());
    }
    data["desc"] = this.desc;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateRegistroSupervisaoDto();
    result.init(json);
    return result;
  }
}
class CreateResponsavelDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.dependentes = [];
    }
  }
  init(_data) {
    if (_data) {
      this.nome = _data["nome"];
      this.generoId = _data["generoId"];
      this.cpf = _data["cpf"];
      this.dataNascimento = _data["dataNascimento"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataNascimento"].toString()) : undefined;
      this.infoContato_Email = _data["infoContato_Email"];
      this.infoContato_Telefone1 = _data["infoContato_Telefone1"];
      this.infoContato_Telefone2 = _data["infoContato_Telefone2"];
      this.endereco_Linha1 = _data["endereco_Linha1"];
      this.endereco_Linha2 = _data["endereco_Linha2"];
      this.endereco_Bairro = _data["endereco_Bairro"];
      this.endereco_CodigoPostal = _data["endereco_CodigoPostal"];
      this.endereco_CidadeId = _data["endereco_CidadeId"];
      if (Array.isArray(_data["dependentes"])) {
        this.dependentes = [];
        for (let item of _data["dependentes"]) this.dependentes.push(Int64EntityDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateResponsavelDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["nome"] = this.nome;
    data["generoId"] = this.generoId;
    data["cpf"] = this.cpf;
    data["dataNascimento"] = this.dataNascimento ? this.dataNascimento.format('YYYY-MM-DD') : undefined;
    data["infoContato_Email"] = this.infoContato_Email;
    data["infoContato_Telefone1"] = this.infoContato_Telefone1;
    data["infoContato_Telefone2"] = this.infoContato_Telefone2;
    data["endereco_Linha1"] = this.endereco_Linha1;
    data["endereco_Linha2"] = this.endereco_Linha2;
    data["endereco_Bairro"] = this.endereco_Bairro;
    data["endereco_CodigoPostal"] = this.endereco_CodigoPostal;
    data["endereco_CidadeId"] = this.endereco_CidadeId;
    if (Array.isArray(this.dependentes)) {
      data["dependentes"] = [];
      for (let item of this.dependentes) data["dependentes"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateResponsavelDto();
    result.init(json);
    return result;
  }
}
class CreateRoleDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.normalizedName = _data["normalizedName"];
      this.description = _data["description"];
      if (Array.isArray(_data["grantedPermissions"])) {
        this.grantedPermissions = [];
        for (let item of _data["grantedPermissions"]) this.grantedPermissions.push(item);
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateRoleDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["normalizedName"] = this.normalizedName;
    data["description"] = this.description;
    if (Array.isArray(this.grantedPermissions)) {
      data["grantedPermissions"] = [];
      for (let item of this.grantedPermissions) data["grantedPermissions"].push(item);
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateRoleDto();
    result.init(json);
    return result;
  }
}
class CreateServicoPrestadoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.colabFuncaoOrgId = _data["colabFuncaoOrgId"];
      this.tipoServicoId = _data["tipoServicoId"];
      this.inicio = _data["inicio"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["inicio"].toString()) : undefined;
      this.fim = _data["fim"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["fim"].toString()) : undefined;
      this.casoId = _data["casoId"];
      this.atuacaoId = _data["atuacaoId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateServicoPrestadoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["colabFuncaoOrgId"] = this.colabFuncaoOrgId;
    data["tipoServicoId"] = this.tipoServicoId;
    data["inicio"] = this.inicio ? this.inicio.toISOString() : undefined;
    data["fim"] = this.fim ? this.fim.toISOString() : undefined;
    data["casoId"] = this.casoId;
    data["atuacaoId"] = this.atuacaoId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateServicoPrestadoDto();
    result.init(json);
    return result;
  }
}
class CreateTecnicaDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.refBibliograficaId = _data["refBibliograficaId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateTecnicaDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["refBibliograficaId"] = this.refBibliograficaId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateTecnicaDto();
    result.init(json);
    return result;
  }
}
class CreateTenantDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.tenancyName = _data["tenancyName"];
      this.name = _data["name"];
      this.adminEmailAddress = _data["adminEmailAddress"];
      this.connectionString = _data["connectionString"];
      this.isActive = _data["isActive"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateTenantDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["tenancyName"] = this.tenancyName;
    data["name"] = this.name;
    data["adminEmailAddress"] = this.adminEmailAddress;
    data["connectionString"] = this.connectionString;
    data["isActive"] = this.isActive;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateTenantDto();
    result.init(json);
    return result;
  }
}
class CreateUnidadeEnsinoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.ajudas = [];
    }
  }
  init(_data) {
    if (_data) {
      this.passoId = _data["passoId"];
      this.tipo = _data["tipo"];
      this.descricao = _data["descricao"];
      if (Array.isArray(_data["ajudas"])) {
        this.ajudas = [];
        for (let item of _data["ajudas"]) this.ajudas.push(Int64Int32KeyValuePair.fromJS(item));
      }
      this.observacao = _data["observacao"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateUnidadeEnsinoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["passoId"] = this.passoId;
    data["tipo"] = this.tipo;
    data["descricao"] = this.descricao;
    if (Array.isArray(this.ajudas)) {
      data["ajudas"] = [];
      for (let item of this.ajudas) data["ajudas"].push(item.toJSON());
    }
    data["observacao"] = this.observacao;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateUnidadeEnsinoDto();
    result.init(json);
    return result;
  }
}
class CreateUserDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.userName = _data["userName"];
      this.name = _data["name"];
      this.surname = _data["surname"];
      this.emailAddress = _data["emailAddress"];
      this.isActive = _data["isActive"];
      if (Array.isArray(_data["roleNames"])) {
        this.roleNames = [];
        for (let item of _data["roleNames"]) this.roleNames.push(item);
      }
      this.password = _data["password"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateUserDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["userName"] = this.userName;
    data["name"] = this.name;
    data["surname"] = this.surname;
    data["emailAddress"] = this.emailAddress;
    data["isActive"] = this.isActive;
    if (Array.isArray(this.roleNames)) {
      data["roleNames"] = [];
      for (let item of this.roleNames) data["roleNames"].push(item);
    }
    data["password"] = this.password;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateUserDto();
    result.init(json);
    return result;
  }
}
class CreateUserPessoaDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.pessoaId = _data["pessoaId"];
      this.username = _data["username"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateUserPessoaDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["pessoaId"] = this.pessoaId;
    data["username"] = this.username;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateUserPessoaDto();
    result.init(json);
    return result;
  }
}
class CreateVersaoProtIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.objetivosAlvo = [];
      this.formatosEnsino = [];
      this.passosProtIntervencao = [];
      this.tecnicasUtilizadas = [];
    }
  }
  init(_data) {
    if (_data) {
      this.protocoloIntervencaoId = _data["protocoloIntervencaoId"];
      if (Array.isArray(_data["objetivosAlvo"])) {
        this.objetivosAlvo = [];
        for (let item of _data["objetivosAlvo"]) this.objetivosAlvo.push(Int64EntityDto.fromJS(item));
      }
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.sd_EstimuloDiscriminativo = _data["sd_EstimuloDiscriminativo"];
      this.resposta = _data["resposta"];
      if (Array.isArray(_data["reforcadores"])) {
        this.reforcadores = [];
        for (let item of _data["reforcadores"]) this.reforcadores.push(ReforcadorDto.fromJS(item));
      }
      this.criterioEvolucao = _data["criterioEvolucao"];
      if (Array.isArray(_data["formatosEnsino"])) {
        this.formatosEnsino = [];
        for (let item of _data["formatosEnsino"]) this.formatosEnsino.push(EntityDto.fromJS(item));
      }
      this.tentativas_Dia1 = _data["tentativas_Dia1"];
      this.tentativas_Dia2 = _data["tentativas_Dia2"];
      this.tentativas_Dia3 = _data["tentativas_Dia3"];
      this.tentativas_Dia4 = _data["tentativas_Dia4"];
      this.tentativas_Dia5 = _data["tentativas_Dia5"];
      this.tentativas_Dia6 = _data["tentativas_Dia6"];
      this.tentativas_Dia7 = _data["tentativas_Dia7"];
      this.hierarquiaAjudaId = _data["hierarquiaAjudaId"];
      this.procedimentoEvanescimentoEnsino_CriterioManutencao = _data["procedimentoEvanescimentoEnsino_CriterioManutencao"];
      this.procedimentoEvanescimentoEnsino_CriterioAmbienteNatural = _data["procedimentoEvanescimentoEnsino_CriterioAmbienteNatural"];
      this.procedimentoEvanescimentoEnsino_CriterioArquivamento = _data["procedimentoEvanescimentoEnsino_CriterioArquivamento"];
      this.marcoHabilidadeManutencaoId = _data["marcoHabilidadeManutencaoId"];
      this.marcoHabilidadeAmbienteNaturalId = _data["marcoHabilidadeAmbienteNaturalId"];
      this.marcoHabilidadeArquivamentoId = _data["marcoHabilidadeArquivamentoId"];
      if (Array.isArray(_data["passosProtIntervencao"])) {
        this.passosProtIntervencao = [];
        for (let item of _data["passosProtIntervencao"]) this.passosProtIntervencao.push(CreatePassoProtIntervencaoDto.fromJS(item));
      }
      if (Array.isArray(_data["tecnicasUtilizadas"])) {
        this.tecnicasUtilizadas = [];
        for (let item of _data["tecnicasUtilizadas"]) this.tecnicasUtilizadas.push(EntityDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new CreateVersaoProtIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["protocoloIntervencaoId"] = this.protocoloIntervencaoId;
    if (Array.isArray(this.objetivosAlvo)) {
      data["objetivosAlvo"] = [];
      for (let item of this.objetivosAlvo) data["objetivosAlvo"].push(item.toJSON());
    }
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["sd_EstimuloDiscriminativo"] = this.sd_EstimuloDiscriminativo;
    data["resposta"] = this.resposta;
    if (Array.isArray(this.reforcadores)) {
      data["reforcadores"] = [];
      for (let item of this.reforcadores) data["reforcadores"].push(item.toJSON());
    }
    data["criterioEvolucao"] = this.criterioEvolucao;
    if (Array.isArray(this.formatosEnsino)) {
      data["formatosEnsino"] = [];
      for (let item of this.formatosEnsino) data["formatosEnsino"].push(item.toJSON());
    }
    data["tentativas_Dia1"] = this.tentativas_Dia1;
    data["tentativas_Dia2"] = this.tentativas_Dia2;
    data["tentativas_Dia3"] = this.tentativas_Dia3;
    data["tentativas_Dia4"] = this.tentativas_Dia4;
    data["tentativas_Dia5"] = this.tentativas_Dia5;
    data["tentativas_Dia6"] = this.tentativas_Dia6;
    data["tentativas_Dia7"] = this.tentativas_Dia7;
    data["hierarquiaAjudaId"] = this.hierarquiaAjudaId;
    data["procedimentoEvanescimentoEnsino_CriterioManutencao"] = this.procedimentoEvanescimentoEnsino_CriterioManutencao;
    data["procedimentoEvanescimentoEnsino_CriterioAmbienteNatural"] = this.procedimentoEvanescimentoEnsino_CriterioAmbienteNatural;
    data["procedimentoEvanescimentoEnsino_CriterioArquivamento"] = this.procedimentoEvanescimentoEnsino_CriterioArquivamento;
    data["marcoHabilidadeManutencaoId"] = this.marcoHabilidadeManutencaoId;
    data["marcoHabilidadeAmbienteNaturalId"] = this.marcoHabilidadeAmbienteNaturalId;
    data["marcoHabilidadeArquivamentoId"] = this.marcoHabilidadeArquivamentoId;
    if (Array.isArray(this.passosProtIntervencao)) {
      data["passosProtIntervencao"] = [];
      for (let item of this.passosProtIntervencao) data["passosProtIntervencao"].push(item.toJSON());
    }
    if (Array.isArray(this.tecnicasUtilizadas)) {
      data["tecnicasUtilizadas"] = [];
      for (let item of this.tecnicasUtilizadas) data["tecnicasUtilizadas"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new CreateVersaoProtIntervencaoDto();
    result.init(json);
    return result;
  }
}
class DominioDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nivelId = _data["nivelId"];
      this.codigo = _data["codigo"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new DominioDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nivelId"] = this.nivelId;
    data["codigo"] = this.codigo;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new DominioDto();
    result.init(json);
    return result;
  }
}
class DominioDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(DominioDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new DominioDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new DominioDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class EntityDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new EntityDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new EntityDto();
    result.init(json);
    return result;
  }
}
class FlatPermissionDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.description = _data["description"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new FlatPermissionDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["description"] = this.description;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new FlatPermissionDto();
    result.init(json);
    return result;
  }
}
class FormatoEnsinoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.refBibliograficaId = _data["refBibliograficaId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new FormatoEnsinoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["refBibliograficaId"] = this.refBibliograficaId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new FormatoEnsinoDto();
    result.init(json);
    return result;
  }
}
class FormatoEnsinoDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(FormatoEnsinoDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new FormatoEnsinoDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new FormatoEnsinoDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class FuncaoOrgDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.roleId = _data["roleId"];
      this.nome = _data["nome"];
      this.acessoAdministrativo = _data["acessoAdministrativo"];
      this.acessoFinanceiro = _data["acessoFinanceiro"];
      this.acessoTecnico = _data["acessoTecnico"];
      this.acessoCasoNome = _data["acessoCasoNome"];
      this.funcaoGestoraDiretaId = _data["funcaoGestoraDiretaId"];
      if (Array.isArray(_data["funcoesGeridasDiretamente"])) {
        this.funcoesGeridasDiretamente = [];
        for (let item of _data["funcoesGeridasDiretamente"]) this.funcoesGeridasDiretamente.push(EntityDto.fromJS(item));
      }
      if (Array.isArray(_data["tiposServicoPrestado"])) {
        this.tiposServicoPrestado = [];
        for (let item of _data["tiposServicoPrestado"]) this.tiposServicoPrestado.push(EntityDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new FuncaoOrgDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["roleId"] = this.roleId;
    data["nome"] = this.nome;
    data["acessoAdministrativo"] = this.acessoAdministrativo;
    data["acessoFinanceiro"] = this.acessoFinanceiro;
    data["acessoTecnico"] = this.acessoTecnico;
    data["acessoCasoNome"] = this.acessoCasoNome;
    data["funcaoGestoraDiretaId"] = this.funcaoGestoraDiretaId;
    if (Array.isArray(this.funcoesGeridasDiretamente)) {
      data["funcoesGeridasDiretamente"] = [];
      for (let item of this.funcoesGeridasDiretamente) data["funcoesGeridasDiretamente"].push(item.toJSON());
    }
    if (Array.isArray(this.tiposServicoPrestado)) {
      data["tiposServicoPrestado"] = [];
      for (let item of this.tiposServicoPrestado) data["tiposServicoPrestado"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new FuncaoOrgDto();
    result.init(json);
    return result;
  }
}
class FuncaoOrgDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(FuncaoOrgDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new FuncaoOrgDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new FuncaoOrgDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class GetCurrentLoginInformationsOutput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.application = _data["application"] ? ApplicationInfoDto.fromJS(_data["application"]) : undefined;
      this.user = _data["user"] ? UserLoginInfoDto.fromJS(_data["user"]) : undefined;
      this.tenant = _data["tenant"] ? TenantLoginInfoDto.fromJS(_data["tenant"]) : undefined;
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new GetCurrentLoginInformationsOutput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["application"] = this.application ? this.application.toJSON() : undefined;
    data["user"] = this.user ? this.user.toJSON() : undefined;
    data["tenant"] = this.tenant ? this.tenant.toJSON() : undefined;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new GetCurrentLoginInformationsOutput();
    result.init(json);
    return result;
  }
}
class GetRoleForEditOutput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.role = _data["role"] ? RoleEditDto.fromJS(_data["role"]) : undefined;
      if (Array.isArray(_data["permissions"])) {
        this.permissions = [];
        for (let item of _data["permissions"]) this.permissions.push(FlatPermissionDto.fromJS(item));
      }
      if (Array.isArray(_data["grantedPermissionNames"])) {
        this.grantedPermissionNames = [];
        for (let item of _data["grantedPermissionNames"]) this.grantedPermissionNames.push(item);
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new GetRoleForEditOutput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["role"] = this.role ? this.role.toJSON() : undefined;
    if (Array.isArray(this.permissions)) {
      data["permissions"] = [];
      for (let item of this.permissions) data["permissions"].push(item.toJSON());
    }
    if (Array.isArray(this.grantedPermissionNames)) {
      data["grantedPermissionNames"] = [];
      for (let item of this.grantedPermissionNames) data["grantedPermissionNames"].push(item);
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new GetRoleForEditOutput();
    result.init(json);
    return result;
  }
}
class HabilidadeDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.codigo = _data["codigo"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.confirmacaoExplicitaRequeridaId = _data["confirmacaoExplicitaRequeridaId"];
      this.dominioId = _data["dominioId"];
      this.isPersonalizada = _data["isPersonalizada"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new HabilidadeDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["codigo"] = this.codigo;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["confirmacaoExplicitaRequeridaId"] = this.confirmacaoExplicitaRequeridaId;
    data["dominioId"] = this.dominioId;
    data["isPersonalizada"] = this.isPersonalizada;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new HabilidadeDto();
    result.init(json);
    return result;
  }
}
class HabilidadeDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(HabilidadeDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new HabilidadeDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new HabilidadeDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class HierarquiaAjudaDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.tiposAjuda = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      if (Array.isArray(_data["tiposAjuda"])) {
        this.tiposAjuda = [];
        for (let item of _data["tiposAjuda"]) this.tiposAjuda.push(TipoAjudaDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new HierarquiaAjudaDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    if (Array.isArray(this.tiposAjuda)) {
      data["tiposAjuda"] = [];
      for (let item of this.tiposAjuda) data["tiposAjuda"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new HierarquiaAjudaDto();
    result.init(json);
    return result;
  }
}
class HierarquiaAjudaDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(HierarquiaAjudaDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new HierarquiaAjudaDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new HierarquiaAjudaDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class Int64Entity {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new Int64Entity();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new Int64Entity();
    result.init(json);
    return result;
  }
}
class Int64EntityDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new Int64EntityDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new Int64EntityDto();
    result.init(json);
    return result;
  }
}
class Int64Int32KeyValuePair {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.key = _data["key"];
      this.value = _data["value"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new Int64Int32KeyValuePair();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["key"] = this.key;
    data["value"] = this.value;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new Int64Int32KeyValuePair();
    result.init(json);
    return result;
  }
}
class IsTenantAvailableInput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.tenancyName = _data["tenancyName"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new IsTenantAvailableInput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["tenancyName"] = this.tenancyName;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new IsTenantAvailableInput();
    result.init(json);
    return result;
  }
}
class IsTenantAvailableOutput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.state = _data["state"];
      this.tenantId = _data["tenantId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new IsTenantAvailableOutput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["state"] = this.state;
    data["tenantId"] = this.tenantId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new IsTenantAvailableOutput();
    result.init(json);
    return result;
  }
}
class NivelDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.protocoloAvaliacaoId = _data["protocoloAvaliacaoId"];
      this.ordenador = _data["ordenador"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.mesIniFaixaEtaria = _data["mesIniFaixaEtaria"];
      this.mesFimFaixaEtaria = _data["mesFimFaixaEtaria"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new NivelDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["protocoloAvaliacaoId"] = this.protocoloAvaliacaoId;
    data["ordenador"] = this.ordenador;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["mesIniFaixaEtaria"] = this.mesIniFaixaEtaria;
    data["mesFimFaixaEtaria"] = this.mesFimFaixaEtaria;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new NivelDto();
    result.init(json);
    return result;
  }
}
class NivelDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(NivelDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new NivelDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new NivelDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class PaisDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.abreviacao = _data["abreviacao"];
      this.nome = _data["nome"];
      this.ufId = _data["ufId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new PaisDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["abreviacao"] = this.abreviacao;
    data["nome"] = this.nome;
    data["ufId"] = this.ufId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new PaisDto();
    result.init(json);
    return result;
  }
}
class ParticipacaoSupervisaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.atuacaoParticipanteId = _data["atuacaoParticipanteId"];
      this.servicoPrestadoId = _data["servicoPrestadoId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ParticipacaoSupervisaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["atuacaoParticipanteId"] = this.atuacaoParticipanteId;
    data["servicoPrestadoId"] = this.servicoPrestadoId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ParticipacaoSupervisaoDto();
    result.init(json);
    return result;
  }
}
class PassoProtIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.ordenador = _data["ordenador"];
      this.desc = _data["desc"];
      this.marcoHabilidadeLinhaDeBaseId = _data["marcoHabilidadeLinhaDeBaseId"];
      this.marcoHabilidadeIntroducaoId = _data["marcoHabilidadeIntroducaoId"];
      this.marcoHabilidadeCriterioAlcancadoId = _data["marcoHabilidadeCriterioAlcancadoId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new PassoProtIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["ordenador"] = this.ordenador;
    data["desc"] = this.desc;
    data["marcoHabilidadeLinhaDeBaseId"] = this.marcoHabilidadeLinhaDeBaseId;
    data["marcoHabilidadeIntroducaoId"] = this.marcoHabilidadeIntroducaoId;
    data["marcoHabilidadeCriterioAlcancadoId"] = this.marcoHabilidadeCriterioAlcancadoId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new PassoProtIntervencaoDto();
    result.init(json);
    return result;
  }
}
class PermissionDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.description = _data["description"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new PermissionDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["description"] = this.description;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new PermissionDto();
    result.init(json);
    return result;
  }
}
class PermissionDtoListResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(PermissionDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new PermissionDtoListResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new PermissionDtoListResultDto();
    result.init(json);
    return result;
  }
}
class PessoaDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.generoId = _data["generoId"];
      this.genero_Abreviacao = _data["genero_Abreviacao"];
      this.genero_Nome = _data["genero_Nome"];
      this.cpf = _data["cpf"];
      this.dataNascimento = _data["dataNascimento"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataNascimento"].toString()) : undefined;
      this.infoContato_Email = _data["infoContato_Email"];
      this.infoContato_Telefone1 = _data["infoContato_Telefone1"];
      this.infoContato_Telefone2 = _data["infoContato_Telefone2"];
      this.endereco_Linha1 = _data["endereco_Linha1"];
      this.endereco_Linha2 = _data["endereco_Linha2"];
      this.endereco_Bairro = _data["endereco_Bairro"];
      this.endereco_CodigoPostal = _data["endereco_CodigoPostal"];
      this.endereco_CidadeId = _data["endereco_CidadeId"];
      this.userId = _data["userId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new PessoaDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["generoId"] = this.generoId;
    data["genero_Abreviacao"] = this.genero_Abreviacao;
    data["genero_Nome"] = this.genero_Nome;
    data["cpf"] = this.cpf;
    data["dataNascimento"] = this.dataNascimento ? this.dataNascimento.format('YYYY-MM-DD') : undefined;
    data["infoContato_Email"] = this.infoContato_Email;
    data["infoContato_Telefone1"] = this.infoContato_Telefone1;
    data["infoContato_Telefone2"] = this.infoContato_Telefone2;
    data["endereco_Linha1"] = this.endereco_Linha1;
    data["endereco_Linha2"] = this.endereco_Linha2;
    data["endereco_Bairro"] = this.endereco_Bairro;
    data["endereco_CodigoPostal"] = this.endereco_CodigoPostal;
    data["endereco_CidadeId"] = this.endereco_CidadeId;
    data["userId"] = this.userId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new PessoaDto();
    result.init(json);
    return result;
  }
}
class ProtocoloAvaliacaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.refBibliograficaId = _data["refBibliograficaId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ProtocoloAvaliacaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["refBibliograficaId"] = this.refBibliograficaId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ProtocoloAvaliacaoDto();
    result.init(json);
    return result;
  }
}
class ProtocoloAvaliacaoDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(ProtocoloAvaliacaoDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ProtocoloAvaliacaoDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ProtocoloAvaliacaoDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class ProtocoloIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.versoes = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.versaoPadraoId = _data["versaoPadraoId"];
      if (Array.isArray(_data["versoes"])) {
        this.versoes = [];
        for (let item of _data["versoes"]) this.versoes.push(Int64EntityDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ProtocoloIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["versaoPadraoId"] = this.versaoPadraoId;
    if (Array.isArray(this.versoes)) {
      data["versoes"] = [];
      for (let item of this.versoes) data["versoes"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ProtocoloIntervencaoDto();
    result.init(json);
    return result;
  }
}
class ProtocoloIntervencaoDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(ProtocoloIntervencaoDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ProtocoloIntervencaoDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ProtocoloIntervencaoDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class ProvedorSaudeDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.subtipoId = _data["subtipoId"];
      this.alunoId = _data["alunoId"];
      this.campoInfo = _data["campoInfo"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ProvedorSaudeDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["subtipoId"] = this.subtipoId;
    data["alunoId"] = this.alunoId;
    data["campoInfo"] = this.campoInfo;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ProvedorSaudeDto();
    result.init(json);
    return result;
  }
}
class ProvedorSaudeDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(ProvedorSaudeDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ProvedorSaudeDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ProvedorSaudeDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class RefBibliograficaDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.refString = _data["refString"];
      this.link = _data["link"];
      if (Array.isArray(_data["tecnicas"])) {
        this.tecnicas = [];
        for (let item of _data["tecnicas"]) this.tecnicas.push(EntityDto.fromJS(item));
      }
      if (Array.isArray(_data["protocolosAvaliacao"])) {
        this.protocolosAvaliacao = [];
        for (let item of _data["protocolosAvaliacao"]) this.protocolosAvaliacao.push(EntityDto.fromJS(item));
      }
      if (Array.isArray(_data["formatosEnsino"])) {
        this.formatosEnsino = [];
        for (let item of _data["formatosEnsino"]) this.formatosEnsino.push(EntityDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RefBibliograficaDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["refString"] = this.refString;
    data["link"] = this.link;
    if (Array.isArray(this.tecnicas)) {
      data["tecnicas"] = [];
      for (let item of this.tecnicas) data["tecnicas"].push(item.toJSON());
    }
    if (Array.isArray(this.protocolosAvaliacao)) {
      data["protocolosAvaliacao"] = [];
      for (let item of this.protocolosAvaliacao) data["protocolosAvaliacao"].push(item.toJSON());
    }
    if (Array.isArray(this.formatosEnsino)) {
      data["formatosEnsino"] = [];
      for (let item of this.formatosEnsino) data["formatosEnsino"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RefBibliograficaDto();
    result.init(json);
    return result;
  }
}
class RefBibliograficaDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(RefBibliograficaDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RefBibliograficaDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RefBibliograficaDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class ReforcadorDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.index = _data["index"];
      this.nome = _data["nome"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ReforcadorDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["index"] = this.index;
    data["nome"] = this.nome;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ReforcadorDto();
    result.init(json);
    return result;
  }
}
class RegisterInput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.name = _data["name"];
      this.surname = _data["surname"];
      this.userName = _data["userName"];
      this.emailAddress = _data["emailAddress"];
      this.password = _data["password"];
      this.captchaResponse = _data["captchaResponse"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RegisterInput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["name"] = this.name;
    data["surname"] = this.surname;
    data["userName"] = this.userName;
    data["emailAddress"] = this.emailAddress;
    data["password"] = this.password;
    data["captchaResponse"] = this.captchaResponse;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RegisterInput();
    result.init(json);
    return result;
  }
}
class RegisterOutput {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.canLogin = _data["canLogin"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RegisterOutput();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["canLogin"] = this.canLogin;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RegisterOutput();
    result.init(json);
    return result;
  }
}
class RegistroAtendimentoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.servicoPrestadoId = _data["servicoPrestadoId"];
      this.casoId = _data["casoId"];
      this.atuacaoTerapeutaId = _data["atuacaoTerapeutaId"];
      this.inicio = _data["inicio"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["inicio"].toString()) : undefined;
      this.fim = _data["fim"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["fim"].toString()) : undefined;
      if (Array.isArray(_data["unidadesEnsino"])) {
        this.unidadesEnsino = [];
        for (let item of _data["unidadesEnsino"]) this.unidadesEnsino.push(Int64Entity.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RegistroAtendimentoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["servicoPrestadoId"] = this.servicoPrestadoId;
    data["casoId"] = this.casoId;
    data["atuacaoTerapeutaId"] = this.atuacaoTerapeutaId;
    data["inicio"] = this.inicio ? this.inicio.toISOString() : undefined;
    data["fim"] = this.fim ? this.fim.toISOString() : undefined;
    if (Array.isArray(this.unidadesEnsino)) {
      data["unidadesEnsino"] = [];
      for (let item of this.unidadesEnsino) data["unidadesEnsino"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RegistroAtendimentoDto();
    result.init(json);
    return result;
  }
}
class RegistroSupervisaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.participacoes = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.servicoPrestadoId = _data["servicoPrestadoId"];
      this.casoId = _data["casoId"];
      this.atuacaoSupervisorId = _data["atuacaoSupervisorId"];
      this.inicio = _data["inicio"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["inicio"].toString()) : undefined;
      this.fim = _data["fim"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["fim"].toString()) : undefined;
      if (Array.isArray(_data["participacoes"])) {
        this.participacoes = [];
        for (let item of _data["participacoes"]) this.participacoes.push(ParticipacaoSupervisaoDto.fromJS(item));
      }
      this.desc = _data["desc"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RegistroSupervisaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["servicoPrestadoId"] = this.servicoPrestadoId;
    data["casoId"] = this.casoId;
    data["atuacaoSupervisorId"] = this.atuacaoSupervisorId;
    data["inicio"] = this.inicio ? this.inicio.toISOString() : undefined;
    data["fim"] = this.fim ? this.fim.toISOString() : undefined;
    if (Array.isArray(this.participacoes)) {
      data["participacoes"] = [];
      for (let item of this.participacoes) data["participacoes"].push(item.toJSON());
    }
    data["desc"] = this.desc;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RegistroSupervisaoDto();
    result.init(json);
    return result;
  }
}
class ResetPasswordDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.adminPassword = _data["adminPassword"];
      this.userId = _data["userId"];
      this.newPassword = _data["newPassword"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ResetPasswordDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["adminPassword"] = this.adminPassword;
    data["userId"] = this.userId;
    data["newPassword"] = this.newPassword;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ResetPasswordDto();
    result.init(json);
    return result;
  }
}
class ResponsavelDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.dependentes = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.generoId = _data["generoId"];
      this.genero_Abreviacao = _data["genero_Abreviacao"];
      this.genero_Nome = _data["genero_Nome"];
      this.cpf = _data["cpf"];
      this.dataNascimento = _data["dataNascimento"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataNascimento"].toString()) : undefined;
      this.infoContato_Email = _data["infoContato_Email"];
      this.infoContato_Telefone1 = _data["infoContato_Telefone1"];
      this.infoContato_Telefone2 = _data["infoContato_Telefone2"];
      this.endereco_Linha1 = _data["endereco_Linha1"];
      this.endereco_Linha2 = _data["endereco_Linha2"];
      this.endereco_Bairro = _data["endereco_Bairro"];
      this.endereco_CodigoPostal = _data["endereco_CodigoPostal"];
      this.endereco_CidadeId = _data["endereco_CidadeId"];
      this.userId = _data["userId"];
      if (Array.isArray(_data["dependentes"])) {
        this.dependentes = [];
        for (let item of _data["dependentes"]) this.dependentes.push(Int64EntityDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ResponsavelDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["generoId"] = this.generoId;
    data["genero_Abreviacao"] = this.genero_Abreviacao;
    data["genero_Nome"] = this.genero_Nome;
    data["cpf"] = this.cpf;
    data["dataNascimento"] = this.dataNascimento ? this.dataNascimento.format('YYYY-MM-DD') : undefined;
    data["infoContato_Email"] = this.infoContato_Email;
    data["infoContato_Telefone1"] = this.infoContato_Telefone1;
    data["infoContato_Telefone2"] = this.infoContato_Telefone2;
    data["endereco_Linha1"] = this.endereco_Linha1;
    data["endereco_Linha2"] = this.endereco_Linha2;
    data["endereco_Bairro"] = this.endereco_Bairro;
    data["endereco_CodigoPostal"] = this.endereco_CodigoPostal;
    data["endereco_CidadeId"] = this.endereco_CidadeId;
    data["userId"] = this.userId;
    if (Array.isArray(this.dependentes)) {
      data["dependentes"] = [];
      for (let item of this.dependentes) data["dependentes"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ResponsavelDto();
    result.init(json);
    return result;
  }
}
class ResponsavelDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(ResponsavelDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ResponsavelDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ResponsavelDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class RoleDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.normalizedName = _data["normalizedName"];
      this.description = _data["description"];
      if (Array.isArray(_data["grantedPermissions"])) {
        this.grantedPermissions = [];
        for (let item of _data["grantedPermissions"]) this.grantedPermissions.push(item);
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RoleDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["normalizedName"] = this.normalizedName;
    data["description"] = this.description;
    if (Array.isArray(this.grantedPermissions)) {
      data["grantedPermissions"] = [];
      for (let item of this.grantedPermissions) data["grantedPermissions"].push(item);
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleDto();
    result.init(json);
    return result;
  }
}
class RoleDtoListResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(RoleDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RoleDtoListResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleDtoListResultDto();
    result.init(json);
    return result;
  }
}
class RoleDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(RoleDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RoleDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class RoleEditDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.description = _data["description"];
      this.isStatic = _data["isStatic"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RoleEditDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["description"] = this.description;
    data["isStatic"] = this.isStatic;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleEditDto();
    result.init(json);
    return result;
  }
}
class RoleListDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.displayName = _data["displayName"];
      this.isStatic = _data["isStatic"];
      this.isDefault = _data["isDefault"];
      this.creationTime = _data["creationTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["creationTime"].toString()) : undefined;
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RoleListDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["displayName"] = this.displayName;
    data["isStatic"] = this.isStatic;
    data["isDefault"] = this.isDefault;
    data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : undefined;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleListDto();
    result.init(json);
    return result;
  }
}
class RoleListDtoListResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(RoleListDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new RoleListDtoListResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new RoleListDtoListResultDto();
    result.init(json);
    return result;
  }
}
class ServicoPrestadoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.colabFuncaoOrgId = _data["colabFuncaoOrgId"];
      this.tipoServicoId = _data["tipoServicoId"];
      this.inicio = _data["inicio"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["inicio"].toString()) : undefined;
      this.fim = _data["fim"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["fim"].toString()) : undefined;
      this.casoId = _data["casoId"];
      this.atuacaoId = _data["atuacaoId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ServicoPrestadoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["colabFuncaoOrgId"] = this.colabFuncaoOrgId;
    data["tipoServicoId"] = this.tipoServicoId;
    data["inicio"] = this.inicio ? this.inicio.toISOString() : undefined;
    data["fim"] = this.fim ? this.fim.toISOString() : undefined;
    data["casoId"] = this.casoId;
    data["atuacaoId"] = this.atuacaoId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ServicoPrestadoDto();
    result.init(json);
    return result;
  }
}
class ServicoPrestadoDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(ServicoPrestadoDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new ServicoPrestadoDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new ServicoPrestadoDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class SubtipoProvedorSaudeDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.tipoId = _data["tipoId"];
      this.nome = _data["nome"];
      this.usaCampoDadosAdicionais = _data["usaCampoDadosAdicionais"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new SubtipoProvedorSaudeDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["tipoId"] = this.tipoId;
    data["nome"] = this.nome;
    data["usaCampoDadosAdicionais"] = this.usaCampoDadosAdicionais;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new SubtipoProvedorSaudeDto();
    result.init(json);
    return result;
  }
}
class TecnicaDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.refBibliograficaId = _data["refBibliograficaId"];
      if (Array.isArray(_data["referencias"])) {
        this.referencias = [];
        for (let item of _data["referencias"]) this.referencias.push(Int64EntityDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TecnicaDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["refBibliograficaId"] = this.refBibliograficaId;
    if (Array.isArray(this.referencias)) {
      data["referencias"] = [];
      for (let item of this.referencias) data["referencias"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TecnicaDto();
    result.init(json);
    return result;
  }
}
class TecnicaDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(TecnicaDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TecnicaDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TecnicaDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
var TenantAvailabilityState;
(function (TenantAvailabilityState) {
  TenantAvailabilityState[TenantAvailabilityState["_1"] = 1] = "_1";
  TenantAvailabilityState[TenantAvailabilityState["_2"] = 2] = "_2";
  TenantAvailabilityState[TenantAvailabilityState["_3"] = 3] = "_3";
})(TenantAvailabilityState || (TenantAvailabilityState = {}));
class TenantDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.tenancyName = _data["tenancyName"];
      this.name = _data["name"];
      this.isActive = _data["isActive"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TenantDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["tenancyName"] = this.tenancyName;
    data["name"] = this.name;
    data["isActive"] = this.isActive;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TenantDto();
    result.init(json);
    return result;
  }
}
class TenantDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(TenantDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TenantDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TenantDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class TenantLoginInfoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.tenancyName = _data["tenancyName"];
      this.name = _data["name"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TenantLoginInfoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["tenancyName"] = this.tenancyName;
    data["name"] = this.name;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TenantLoginInfoDto();
    result.init(json);
    return result;
  }
}
class TipoAjudaDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.sigla = _data["sigla"];
      this.desc = _data["desc"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TipoAjudaDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["sigla"] = this.sigla;
    data["desc"] = this.desc;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TipoAjudaDto();
    result.init(json);
    return result;
  }
}
class TipoConfirmacaoHabilidadeDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.permiteAquisicaoAutomatica = _data["permiteAquisicaoAutomatica"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TipoConfirmacaoHabilidadeDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["permiteAquisicaoAutomatica"] = this.permiteAquisicaoAutomatica;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TipoConfirmacaoHabilidadeDto();
    result.init(json);
    return result;
  }
}
class TipoProvedorSaudeDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.subtipos = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      if (Array.isArray(_data["subtipos"])) {
        this.subtipos = [];
        for (let item of _data["subtipos"]) this.subtipos.push(SubtipoProvedorSaudeDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TipoProvedorSaudeDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    if (Array.isArray(this.subtipos)) {
      data["subtipos"] = [];
      for (let item of this.subtipos) data["subtipos"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TipoProvedorSaudeDto();
    result.init(json);
    return result;
  }
}
class TipoProvedorSaudeDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(TipoProvedorSaudeDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TipoProvedorSaudeDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TipoProvedorSaudeDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class TipoServicoPrestadoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.funcoesOrg = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      if (Array.isArray(_data["funcoesOrg"])) {
        this.funcoesOrg = [];
        for (let item of _data["funcoesOrg"]) this.funcoesOrg.push(EntityDto.fromJS(item));
      }
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.remuneracaoFixa = _data["remuneracaoFixa"];
      this.remuneracaoHora = _data["remuneracaoHora"];
      this.registravelAvulso = _data["registravelAvulso"];
      this.associadoACaso = _data["associadoACaso"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TipoServicoPrestadoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    if (Array.isArray(this.funcoesOrg)) {
      data["funcoesOrg"] = [];
      for (let item of this.funcoesOrg) data["funcoesOrg"].push(item.toJSON());
    }
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["remuneracaoFixa"] = this.remuneracaoFixa;
    data["remuneracaoHora"] = this.remuneracaoHora;
    data["registravelAvulso"] = this.registravelAvulso;
    data["associadoACaso"] = this.associadoACaso;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TipoServicoPrestadoDto();
    result.init(json);
    return result;
  }
}
class TipoServicoPrestadoDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(TipoServicoPrestadoDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new TipoServicoPrestadoDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new TipoServicoPrestadoDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class UFDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.abreviacao = _data["abreviacao"];
      this.nome = _data["nome"];
      this.paisId = _data["paisId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UFDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["abreviacao"] = this.abreviacao;
    data["nome"] = this.nome;
    data["paisId"] = this.paisId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UFDto();
    result.init(json);
    return result;
  }
}
class UnidadeEnsinoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.ajudas = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.registroAtendimentoId = _data["registroAtendimentoId"];
      this.passoId = _data["passoId"];
      this.tipo = _data["tipo"];
      this.descricao = _data["descricao"];
      if (Array.isArray(_data["ajudas"])) {
        this.ajudas = [];
        for (let item of _data["ajudas"]) this.ajudas.push(Int64Int32KeyValuePair.fromJS(item));
      }
      this.observacao = _data["observacao"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UnidadeEnsinoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["registroAtendimentoId"] = this.registroAtendimentoId;
    data["passoId"] = this.passoId;
    data["tipo"] = this.tipo;
    data["descricao"] = this.descricao;
    if (Array.isArray(this.ajudas)) {
      data["ajudas"] = [];
      for (let item of this.ajudas) data["ajudas"].push(item.toJSON());
    }
    data["observacao"] = this.observacao;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UnidadeEnsinoDto();
    result.init(json);
    return result;
  }
}
class UpdateAlunoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.generoId = _data["generoId"];
      this.cpf = _data["cpf"];
      this.dataNascimento = _data["dataNascimento"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataNascimento"].toString()) : undefined;
      this.infoContato_Email = _data["infoContato_Email"];
      this.infoContato_Telefone1 = _data["infoContato_Telefone1"];
      this.infoContato_Telefone2 = _data["infoContato_Telefone2"];
      this.endereco_Linha1 = _data["endereco_Linha1"];
      this.endereco_Linha2 = _data["endereco_Linha2"];
      this.endereco_Bairro = _data["endereco_Bairro"];
      this.endereco_CodigoPostal = _data["endereco_CodigoPostal"];
      this.endereco_CidadeId = _data["endereco_CidadeId"];
      if (Array.isArray(_data["responsaveis"])) {
        this.responsaveis = [];
        for (let item of _data["responsaveis"]) this.responsaveis.push(Int64EntityDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateAlunoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["generoId"] = this.generoId;
    data["cpf"] = this.cpf;
    data["dataNascimento"] = this.dataNascimento ? this.dataNascimento.format('YYYY-MM-DD') : undefined;
    data["infoContato_Email"] = this.infoContato_Email;
    data["infoContato_Telefone1"] = this.infoContato_Telefone1;
    data["infoContato_Telefone2"] = this.infoContato_Telefone2;
    data["endereco_Linha1"] = this.endereco_Linha1;
    data["endereco_Linha2"] = this.endereco_Linha2;
    data["endereco_Bairro"] = this.endereco_Bairro;
    data["endereco_CodigoPostal"] = this.endereco_CodigoPostal;
    data["endereco_CidadeId"] = this.endereco_CidadeId;
    if (Array.isArray(this.responsaveis)) {
      data["responsaveis"] = [];
      for (let item of this.responsaveis) data["responsaveis"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateAlunoDto();
    result.init(json);
    return result;
  }
}
class UpdateAplicacaoPassoProtIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.dataInicio = _data["dataInicio"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataInicio"].toString()) : undefined;
      this.dataLinhaDeBase = _data["dataLinhaDeBase"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataLinhaDeBase"].toString()) : undefined;
      this.dataIntroducao = _data["dataIntroducao"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataIntroducao"].toString()) : undefined;
      this.dataCriterioAlcancado = _data["dataCriterioAlcancado"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataCriterioAlcancado"].toString()) : undefined;
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateAplicacaoPassoProtIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["dataInicio"] = this.dataInicio ? this.dataInicio.toISOString() : undefined;
    data["dataLinhaDeBase"] = this.dataLinhaDeBase ? this.dataLinhaDeBase.toISOString() : undefined;
    data["dataIntroducao"] = this.dataIntroducao ? this.dataIntroducao.toISOString() : undefined;
    data["dataCriterioAlcancado"] = this.dataCriterioAlcancado ? this.dataCriterioAlcancado.toISOString() : undefined;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateAplicacaoPassoProtIntervencaoDto();
    result.init(json);
    return result;
  }
}
class UpdateAplicacaoProtocoloAvaliacaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.habilidades = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      if (Array.isArray(_data["habilidades"])) {
        this.habilidades = [];
        for (let item of _data["habilidades"]) this.habilidades.push(AquisicaoHabilidadeDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateAplicacaoProtocoloAvaliacaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    if (Array.isArray(this.habilidades)) {
      data["habilidades"] = [];
      for (let item of this.habilidades) data["habilidades"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateAplicacaoProtocoloAvaliacaoDto();
    result.init(json);
    return result;
  }
}
class UpdateAplicacaoProtocoloIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.passos = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.dataManutencao = _data["dataManutencao"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataManutencao"].toString()) : undefined;
      this.dataAmbienteNatural = _data["dataAmbienteNatural"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataAmbienteNatural"].toString()) : undefined;
      this.dataArquivamento = _data["dataArquivamento"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataArquivamento"].toString()) : undefined;
      if (Array.isArray(_data["passos"])) {
        this.passos = [];
        for (let item of _data["passos"]) this.passos.push(UpdateAplicacaoPassoProtIntervencaoDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateAplicacaoProtocoloIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["dataManutencao"] = this.dataManutencao ? this.dataManutencao.toISOString() : undefined;
    data["dataAmbienteNatural"] = this.dataAmbienteNatural ? this.dataAmbienteNatural.toISOString() : undefined;
    data["dataArquivamento"] = this.dataArquivamento ? this.dataArquivamento.toISOString() : undefined;
    if (Array.isArray(this.passos)) {
      data["passos"] = [];
      for (let item of this.passos) data["passos"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateAplicacaoProtocoloIntervencaoDto();
    result.init(json);
    return result;
  }
}
class UpdateColaboradorDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.generoId = _data["generoId"];
      this.cpf = _data["cpf"];
      this.dataNascimento = _data["dataNascimento"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataNascimento"].toString()) : undefined;
      this.infoContato_Email = _data["infoContato_Email"];
      this.infoContato_Telefone1 = _data["infoContato_Telefone1"];
      this.infoContato_Telefone2 = _data["infoContato_Telefone2"];
      this.endereco_Linha1 = _data["endereco_Linha1"];
      this.endereco_Linha2 = _data["endereco_Linha2"];
      this.endereco_Bairro = _data["endereco_Bairro"];
      this.endereco_CodigoPostal = _data["endereco_CodigoPostal"];
      this.endereco_CidadeId = _data["endereco_CidadeId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateColaboradorDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["generoId"] = this.generoId;
    data["cpf"] = this.cpf;
    data["dataNascimento"] = this.dataNascimento ? this.dataNascimento.format('YYYY-MM-DD') : undefined;
    data["infoContato_Email"] = this.infoContato_Email;
    data["infoContato_Telefone1"] = this.infoContato_Telefone1;
    data["infoContato_Telefone2"] = this.infoContato_Telefone2;
    data["endereco_Linha1"] = this.endereco_Linha1;
    data["endereco_Linha2"] = this.endereco_Linha2;
    data["endereco_Bairro"] = this.endereco_Bairro;
    data["endereco_CodigoPostal"] = this.endereco_CodigoPostal;
    data["endereco_CidadeId"] = this.endereco_CidadeId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateColaboradorDto();
    result.init(json);
    return result;
  }
}
class UpdateDominioDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.codigo = _data["codigo"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateDominioDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["codigo"] = this.codigo;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateDominioDto();
    result.init(json);
    return result;
  }
}
class UpdateHabilidadeDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.codigo = _data["codigo"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateHabilidadeDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["codigo"] = this.codigo;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateHabilidadeDto();
    result.init(json);
    return result;
  }
}
class UpdateHierarquiaAjudaDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.tiposAjuda = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      if (Array.isArray(_data["tiposAjuda"])) {
        this.tiposAjuda = [];
        for (let item of _data["tiposAjuda"]) this.tiposAjuda.push(TipoAjudaDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateHierarquiaAjudaDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    if (Array.isArray(this.tiposAjuda)) {
      data["tiposAjuda"] = [];
      for (let item of this.tiposAjuda) data["tiposAjuda"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateHierarquiaAjudaDto();
    result.init(json);
    return result;
  }
}
class UpdateNivelDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.ordenador = _data["ordenador"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.mesIniFaixaEtaria = _data["mesIniFaixaEtaria"];
      this.mesFimFaixaEtaria = _data["mesFimFaixaEtaria"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateNivelDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["ordenador"] = this.ordenador;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["mesIniFaixaEtaria"] = this.mesIniFaixaEtaria;
    data["mesFimFaixaEtaria"] = this.mesFimFaixaEtaria;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateNivelDto();
    result.init(json);
    return result;
  }
}
class UpdatePassoProtIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.ordenador = _data["ordenador"];
      this.desc = _data["desc"];
      this.marcoHabilidadeLinhaDeBaseId = _data["marcoHabilidadeLinhaDeBaseId"];
      this.marcoHabilidadeIntroducaoId = _data["marcoHabilidadeIntroducaoId"];
      this.marcoHabilidadeCriterioAlcancadoId = _data["marcoHabilidadeCriterioAlcancadoId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdatePassoProtIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["ordenador"] = this.ordenador;
    data["desc"] = this.desc;
    data["marcoHabilidadeLinhaDeBaseId"] = this.marcoHabilidadeLinhaDeBaseId;
    data["marcoHabilidadeIntroducaoId"] = this.marcoHabilidadeIntroducaoId;
    data["marcoHabilidadeCriterioAlcancadoId"] = this.marcoHabilidadeCriterioAlcancadoId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdatePassoProtIntervencaoDto();
    result.init(json);
    return result;
  }
}
class UpdateProtocoloAvaliacaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.refBibliograficaId = _data["refBibliograficaId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateProtocoloAvaliacaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["refBibliograficaId"] = this.refBibliograficaId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateProtocoloAvaliacaoDto();
    result.init(json);
    return result;
  }
}
class UpdateProtocoloIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.versaoPadraoId = _data["versaoPadraoId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateProtocoloIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["versaoPadraoId"] = this.versaoPadraoId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateProtocoloIntervencaoDto();
    result.init(json);
    return result;
  }
}
class UpdateProvedorSaudeDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.campoInfo = _data["campoInfo"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateProvedorSaudeDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["campoInfo"] = this.campoInfo;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateProvedorSaudeDto();
    result.init(json);
    return result;
  }
}
class UpdateResponsavelDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.dependentes = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.generoId = _data["generoId"];
      this.cpf = _data["cpf"];
      this.dataNascimento = _data["dataNascimento"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataNascimento"].toString()) : undefined;
      this.infoContato_Email = _data["infoContato_Email"];
      this.infoContato_Telefone1 = _data["infoContato_Telefone1"];
      this.infoContato_Telefone2 = _data["infoContato_Telefone2"];
      this.endereco_Linha1 = _data["endereco_Linha1"];
      this.endereco_Linha2 = _data["endereco_Linha2"];
      this.endereco_Bairro = _data["endereco_Bairro"];
      this.endereco_CodigoPostal = _data["endereco_CodigoPostal"];
      this.endereco_CidadeId = _data["endereco_CidadeId"];
      if (Array.isArray(_data["dependentes"])) {
        this.dependentes = [];
        for (let item of _data["dependentes"]) this.dependentes.push(Int64EntityDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateResponsavelDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["generoId"] = this.generoId;
    data["cpf"] = this.cpf;
    data["dataNascimento"] = this.dataNascimento ? this.dataNascimento.format('YYYY-MM-DD') : undefined;
    data["infoContato_Email"] = this.infoContato_Email;
    data["infoContato_Telefone1"] = this.infoContato_Telefone1;
    data["infoContato_Telefone2"] = this.infoContato_Telefone2;
    data["endereco_Linha1"] = this.endereco_Linha1;
    data["endereco_Linha2"] = this.endereco_Linha2;
    data["endereco_Bairro"] = this.endereco_Bairro;
    data["endereco_CodigoPostal"] = this.endereco_CodigoPostal;
    data["endereco_CidadeId"] = this.endereco_CidadeId;
    if (Array.isArray(this.dependentes)) {
      data["dependentes"] = [];
      for (let item of this.dependentes) data["dependentes"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateResponsavelDto();
    result.init(json);
    return result;
  }
}
class UpdateServicoPrestadoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.inicio = _data["inicio"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["inicio"].toString()) : undefined;
      this.fim = _data["fim"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["fim"].toString()) : undefined;
      this.casoId = _data["casoId"];
      this.atuacaoId = _data["atuacaoId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateServicoPrestadoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["inicio"] = this.inicio ? this.inicio.toISOString() : undefined;
    data["fim"] = this.fim ? this.fim.toISOString() : undefined;
    data["casoId"] = this.casoId;
    data["atuacaoId"] = this.atuacaoId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateServicoPrestadoDto();
    result.init(json);
    return result;
  }
}
class UpdateTecnicaDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.refBibliograficaId = _data["refBibliograficaId"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateTecnicaDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["refBibliograficaId"] = this.refBibliograficaId;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateTecnicaDto();
    result.init(json);
    return result;
  }
}
class UpdateVersaoProtIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.objetivosAlvo = [];
      this.formatosEnsino = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      if (Array.isArray(_data["objetivosAlvo"])) {
        this.objetivosAlvo = [];
        for (let item of _data["objetivosAlvo"]) this.objetivosAlvo.push(Int64EntityDto.fromJS(item));
      }
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.sd_EstimuloDiscriminativo = _data["sd_EstimuloDiscriminativo"];
      this.resposta = _data["resposta"];
      if (Array.isArray(_data["reforcadores"])) {
        this.reforcadores = [];
        for (let item of _data["reforcadores"]) this.reforcadores.push(ReforcadorDto.fromJS(item));
      }
      this.criterioEvolucao = _data["criterioEvolucao"];
      if (Array.isArray(_data["formatosEnsino"])) {
        this.formatosEnsino = [];
        for (let item of _data["formatosEnsino"]) this.formatosEnsino.push(EntityDto.fromJS(item));
      }
      this.tentativas_Dia1 = _data["tentativas_Dia1"];
      this.tentativas_Dia2 = _data["tentativas_Dia2"];
      this.tentativas_Dia3 = _data["tentativas_Dia3"];
      this.tentativas_Dia4 = _data["tentativas_Dia4"];
      this.tentativas_Dia5 = _data["tentativas_Dia5"];
      this.tentativas_Dia6 = _data["tentativas_Dia6"];
      this.tentativas_Dia7 = _data["tentativas_Dia7"];
      this.hierarquiaAjudaId = _data["hierarquiaAjudaId"];
      this.procedimentoEvanescimentoEnsino_CriterioManutencao = _data["procedimentoEvanescimentoEnsino_CriterioManutencao"];
      this.procedimentoEvanescimentoEnsino_CriterioAmbienteNatural = _data["procedimentoEvanescimentoEnsino_CriterioAmbienteNatural"];
      this.procedimentoEvanescimentoEnsino_CriterioArquivamento = _data["procedimentoEvanescimentoEnsino_CriterioArquivamento"];
      this.marcoHabilidadeManutencaoId = _data["marcoHabilidadeManutencaoId"];
      this.marcoHabilidadeAmbienteNaturalId = _data["marcoHabilidadeAmbienteNaturalId"];
      this.marcoHabilidadeArquivamentoId = _data["marcoHabilidadeArquivamentoId"];
      if (Array.isArray(_data["passosProtIntervencao"])) {
        this.passosProtIntervencao = [];
        for (let item of _data["passosProtIntervencao"]) this.passosProtIntervencao.push(UpdatePassoProtIntervencaoDto.fromJS(item));
      }
      if (Array.isArray(_data["tecnicasUtilizadas"])) {
        this.tecnicasUtilizadas = [];
        for (let item of _data["tecnicasUtilizadas"]) this.tecnicasUtilizadas.push(EntityDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateVersaoProtIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    if (Array.isArray(this.objetivosAlvo)) {
      data["objetivosAlvo"] = [];
      for (let item of this.objetivosAlvo) data["objetivosAlvo"].push(item.toJSON());
    }
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["sd_EstimuloDiscriminativo"] = this.sd_EstimuloDiscriminativo;
    data["resposta"] = this.resposta;
    if (Array.isArray(this.reforcadores)) {
      data["reforcadores"] = [];
      for (let item of this.reforcadores) data["reforcadores"].push(item.toJSON());
    }
    data["criterioEvolucao"] = this.criterioEvolucao;
    if (Array.isArray(this.formatosEnsino)) {
      data["formatosEnsino"] = [];
      for (let item of this.formatosEnsino) data["formatosEnsino"].push(item.toJSON());
    }
    data["tentativas_Dia1"] = this.tentativas_Dia1;
    data["tentativas_Dia2"] = this.tentativas_Dia2;
    data["tentativas_Dia3"] = this.tentativas_Dia3;
    data["tentativas_Dia4"] = this.tentativas_Dia4;
    data["tentativas_Dia5"] = this.tentativas_Dia5;
    data["tentativas_Dia6"] = this.tentativas_Dia6;
    data["tentativas_Dia7"] = this.tentativas_Dia7;
    data["hierarquiaAjudaId"] = this.hierarquiaAjudaId;
    data["procedimentoEvanescimentoEnsino_CriterioManutencao"] = this.procedimentoEvanescimentoEnsino_CriterioManutencao;
    data["procedimentoEvanescimentoEnsino_CriterioAmbienteNatural"] = this.procedimentoEvanescimentoEnsino_CriterioAmbienteNatural;
    data["procedimentoEvanescimentoEnsino_CriterioArquivamento"] = this.procedimentoEvanescimentoEnsino_CriterioArquivamento;
    data["marcoHabilidadeManutencaoId"] = this.marcoHabilidadeManutencaoId;
    data["marcoHabilidadeAmbienteNaturalId"] = this.marcoHabilidadeAmbienteNaturalId;
    data["marcoHabilidadeArquivamentoId"] = this.marcoHabilidadeArquivamentoId;
    if (Array.isArray(this.passosProtIntervencao)) {
      data["passosProtIntervencao"] = [];
      for (let item of this.passosProtIntervencao) data["passosProtIntervencao"].push(item.toJSON());
    }
    if (Array.isArray(this.tecnicasUtilizadas)) {
      data["tecnicasUtilizadas"] = [];
      for (let item of this.tecnicasUtilizadas) data["tecnicasUtilizadas"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UpdateVersaoProtIntervencaoDto();
    result.init(json);
    return result;
  }
}
class UserDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.userName = _data["userName"];
      this.name = _data["name"];
      this.surname = _data["surname"];
      this.emailAddress = _data["emailAddress"];
      this.isActive = _data["isActive"];
      this.fullName = _data["fullName"];
      this.lastLoginTime = _data["lastLoginTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["lastLoginTime"].toString()) : undefined;
      this.creationTime = _data["creationTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["creationTime"].toString()) : undefined;
      if (Array.isArray(_data["roleNames"])) {
        this.roleNames = [];
        for (let item of _data["roleNames"]) this.roleNames.push(item);
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UserDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["userName"] = this.userName;
    data["name"] = this.name;
    data["surname"] = this.surname;
    data["emailAddress"] = this.emailAddress;
    data["isActive"] = this.isActive;
    data["fullName"] = this.fullName;
    data["lastLoginTime"] = this.lastLoginTime ? this.lastLoginTime.toISOString() : undefined;
    data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : undefined;
    if (Array.isArray(this.roleNames)) {
      data["roleNames"] = [];
      for (let item of this.roleNames) data["roleNames"].push(item);
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UserDto();
    result.init(json);
    return result;
  }
}
class UserDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(UserDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UserDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UserDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class UserLoginInfoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.surname = _data["surname"];
      this.userName = _data["userName"];
      this.emailAddress = _data["emailAddress"];
      this.aluno = _data["aluno"] ? Int64EntityDto.fromJS(_data["aluno"]) : undefined;
      this.colaborador = _data["colaborador"] ? Int64EntityDto.fromJS(_data["colaborador"]) : undefined;
      this.responsavel = _data["responsavel"] ? Int64EntityDto.fromJS(_data["responsavel"]) : undefined;
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new UserLoginInfoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["surname"] = this.surname;
    data["userName"] = this.userName;
    data["emailAddress"] = this.emailAddress;
    data["aluno"] = this.aluno ? this.aluno.toJSON() : undefined;
    data["colaborador"] = this.colaborador ? this.colaborador.toJSON() : undefined;
    data["responsavel"] = this.responsavel ? this.responsavel.toJSON() : undefined;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new UserLoginInfoDto();
    result.init(json);
    return result;
  }
}
class VersaoProtIntervencaoDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
    if (!data) {
      this.objetivosAlvo = [];
      this.reforcadores = [];
      this.formatosEnsino = [];
    }
  }
  init(_data) {
    if (_data) {
      this.id = _data["id"];
      this.protocoloIntervencaoId = _data["protocoloIntervencaoId"];
      this.protocoloIntervencaoNome = _data["protocoloIntervencaoNome"];
      this.dataCriacao = _data["dataCriacao"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["dataCriacao"].toString()) : undefined;
      if (Array.isArray(_data["objetivosAlvo"])) {
        this.objetivosAlvo = [];
        for (let item of _data["objetivosAlvo"]) this.objetivosAlvo.push(Int64EntityDto.fromJS(item));
      }
      this.nome = _data["nome"];
      this.desc = _data["desc"];
      this.sd_EstimuloDiscriminativo = _data["sd_EstimuloDiscriminativo"];
      this.resposta = _data["resposta"];
      if (Array.isArray(_data["reforcadores"])) {
        this.reforcadores = [];
        for (let item of _data["reforcadores"]) this.reforcadores.push(ReforcadorDto.fromJS(item));
      }
      this.criterioEvolucao = _data["criterioEvolucao"];
      if (Array.isArray(_data["formatosEnsino"])) {
        this.formatosEnsino = [];
        for (let item of _data["formatosEnsino"]) this.formatosEnsino.push(EntityDto.fromJS(item));
      }
      this.tentativas_Dia1 = _data["tentativas_Dia1"];
      this.tentativas_Dia2 = _data["tentativas_Dia2"];
      this.tentativas_Dia3 = _data["tentativas_Dia3"];
      this.tentativas_Dia4 = _data["tentativas_Dia4"];
      this.tentativas_Dia5 = _data["tentativas_Dia5"];
      this.tentativas_Dia6 = _data["tentativas_Dia6"];
      this.tentativas_Dia7 = _data["tentativas_Dia7"];
      this.hierarquiaAjudaId = _data["hierarquiaAjudaId"];
      this.procedimentoEvanescimentoEnsino_CriterioManutencao = _data["procedimentoEvanescimentoEnsino_CriterioManutencao"];
      this.procedimentoEvanescimentoEnsino_CriterioAmbienteNatural = _data["procedimentoEvanescimentoEnsino_CriterioAmbienteNatural"];
      this.procedimentoEvanescimentoEnsino_CriterioArquivamento = _data["procedimentoEvanescimentoEnsino_CriterioArquivamento"];
      this.marcoHabilidadeManutencaoId = _data["marcoHabilidadeManutencaoId"];
      this.marcoHabilidadeAmbienteNaturalId = _data["marcoHabilidadeAmbienteNaturalId"];
      this.marcoHabilidadeArquivamentoId = _data["marcoHabilidadeArquivamentoId"];
      if (Array.isArray(_data["passosProtIntervencao"])) {
        this.passosProtIntervencao = [];
        for (let item of _data["passosProtIntervencao"]) this.passosProtIntervencao.push(PassoProtIntervencaoDto.fromJS(item));
      }
      if (Array.isArray(_data["tecnicasUtilizadas"])) {
        this.tecnicasUtilizadas = [];
        for (let item of _data["tecnicasUtilizadas"]) this.tecnicasUtilizadas.push(EntityDto.fromJS(item));
      }
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new VersaoProtIntervencaoDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["protocoloIntervencaoId"] = this.protocoloIntervencaoId;
    data["protocoloIntervencaoNome"] = this.protocoloIntervencaoNome;
    data["dataCriacao"] = this.dataCriacao ? this.dataCriacao.toISOString() : undefined;
    if (Array.isArray(this.objetivosAlvo)) {
      data["objetivosAlvo"] = [];
      for (let item of this.objetivosAlvo) data["objetivosAlvo"].push(item.toJSON());
    }
    data["nome"] = this.nome;
    data["desc"] = this.desc;
    data["sd_EstimuloDiscriminativo"] = this.sd_EstimuloDiscriminativo;
    data["resposta"] = this.resposta;
    if (Array.isArray(this.reforcadores)) {
      data["reforcadores"] = [];
      for (let item of this.reforcadores) data["reforcadores"].push(item.toJSON());
    }
    data["criterioEvolucao"] = this.criterioEvolucao;
    if (Array.isArray(this.formatosEnsino)) {
      data["formatosEnsino"] = [];
      for (let item of this.formatosEnsino) data["formatosEnsino"].push(item.toJSON());
    }
    data["tentativas_Dia1"] = this.tentativas_Dia1;
    data["tentativas_Dia2"] = this.tentativas_Dia2;
    data["tentativas_Dia3"] = this.tentativas_Dia3;
    data["tentativas_Dia4"] = this.tentativas_Dia4;
    data["tentativas_Dia5"] = this.tentativas_Dia5;
    data["tentativas_Dia6"] = this.tentativas_Dia6;
    data["tentativas_Dia7"] = this.tentativas_Dia7;
    data["hierarquiaAjudaId"] = this.hierarquiaAjudaId;
    data["procedimentoEvanescimentoEnsino_CriterioManutencao"] = this.procedimentoEvanescimentoEnsino_CriterioManutencao;
    data["procedimentoEvanescimentoEnsino_CriterioAmbienteNatural"] = this.procedimentoEvanescimentoEnsino_CriterioAmbienteNatural;
    data["procedimentoEvanescimentoEnsino_CriterioArquivamento"] = this.procedimentoEvanescimentoEnsino_CriterioArquivamento;
    data["marcoHabilidadeManutencaoId"] = this.marcoHabilidadeManutencaoId;
    data["marcoHabilidadeAmbienteNaturalId"] = this.marcoHabilidadeAmbienteNaturalId;
    data["marcoHabilidadeArquivamentoId"] = this.marcoHabilidadeArquivamentoId;
    if (Array.isArray(this.passosProtIntervencao)) {
      data["passosProtIntervencao"] = [];
      for (let item of this.passosProtIntervencao) data["passosProtIntervencao"].push(item.toJSON());
    }
    if (Array.isArray(this.tecnicasUtilizadas)) {
      data["tecnicasUtilizadas"] = [];
      for (let item of this.tecnicasUtilizadas) data["tecnicasUtilizadas"].push(item.toJSON());
    }
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new VersaoProtIntervencaoDto();
    result.init(json);
    return result;
  }
}
class VersaoProtIntervencaoDtoPagedResultDto {
  constructor(data) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }
  init(_data) {
    if (_data) {
      if (Array.isArray(_data["items"])) {
        this.items = [];
        for (let item of _data["items"]) this.items.push(VersaoProtIntervencaoDto.fromJS(item));
      }
      this.totalCount = _data["totalCount"];
    }
  }
  static fromJS(data) {
    data = typeof data === 'object' ? data : {};
    let result = new VersaoProtIntervencaoDtoPagedResultDto();
    result.init(data);
    return result;
  }
  toJSON(data) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.items)) {
      data["items"] = [];
      for (let item of this.items) data["items"].push(item.toJSON());
    }
    data["totalCount"] = this.totalCount;
    return data;
  }
  clone() {
    const json = this.toJSON();
    let result = new VersaoProtIntervencaoDtoPagedResultDto();
    result.init(json);
    return result;
  }
}
class ApiException extends Error {
  constructor(message, status, response, headers, result) {
    super();
    this.isApiException = true;
    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }
  static isApiException(obj) {
    return obj.isApiException === true;
  }
}
function throwException(message, status, response, headers, result) {
  if (result !== null && result !== undefined) return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(result);else return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(new ApiException(message, status, response, headers, null));
}
function blobToText(blob) {
  return new rxjs__WEBPACK_IMPORTED_MODULE_7__.Observable(observer => {
    if (!blob) {
      observer.next("");
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = event => {
        observer.next(event.target.result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}

/***/ }),

/***/ 7707:
/*!************************************************************!*\
  !*** ./src/shared/service-proxies/service-proxy.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalService: () => (/* binding */ LocalService),
/* harmony export */   ServiceProxyModule: () => (/* binding */ ServiceProxyModule)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 46443);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! abp-ng2-module */ 26173);
/* harmony import */ var _service_proxies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service-proxies */ 81801);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);




class LocalService {
  static #_ = (() => this.ɵfac = function LocalService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || LocalService)();
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: LocalService,
    factory: LocalService.ɵfac
  }))();
}
class ServiceProxyModule {
  static #_ = (() => this.ɵfac = function ServiceProxyModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || ServiceProxyModule)();
  })();
  static #_2 = (() => this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
    type: ServiceProxyModule
  }))();
  static #_3 = (() => this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
    providers: [_service_proxies__WEBPACK_IMPORTED_MODULE_0__.RoleServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.SessionServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.TenantServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.UserServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.AlunoServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.CasoServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.ResponsavelServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.ColaboradorServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.PaisServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.ProtocoloAvaliacaoServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.FuncaoOrgServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.TipoProvedorSaudeServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.ProvedorSaudeServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.TecnicaServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.RefBibliograficaServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.FormatoEnsinoServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.HierarquiaAjudaServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.ProtocoloIntervencaoServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.TipoServicoPrestadoServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.ServicoPrestadoServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.TokenAuthServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.AccountServiceProxy, _service_proxies__WEBPACK_IMPORTED_MODULE_0__.ConfigurationServiceProxy, LocalService, {
      provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HTTP_INTERCEPTORS,
      useClass: abp_ng2_module__WEBPACK_IMPORTED_MODULE_3__.AbpHttpInterceptor,
      multi: true
    }]
  }))();
}

/***/ }),

/***/ 59626:
/*!***************************************************!*\
  !*** ./src/shared/session/app-session.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppSessionService: () => (/* binding */ AppSessionService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 81801);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! abp-ng2-module */ 26173);



class AppSessionService {
  constructor(_sessionService, _abpMultiTenancyService) {
    this._sessionService = _sessionService;
    this._abpMultiTenancyService = _abpMultiTenancyService;
  }
  get application() {
    return this._application;
  }
  get user() {
    return this._user;
  }
  get userId() {
    return this.user ? this.user.id : null;
  }
  get tenant() {
    return this._tenant;
  }
  get tenantId() {
    return this.tenant ? this.tenant.id : null;
  }
  getShownLoginName() {
    const userName = this._user.userName;
    if (!this._abpMultiTenancyService.isEnabled) {
      return userName;
    }
    return (this._tenant ? this._tenant.tenancyName : '.') + '\\' + userName;
  }
  init() {
    return new Promise((resolve, reject) => {
      this._sessionService.getCurrentLoginInformations().toPromise().then(result => {
        this._application = result.application;
        this._user = result.user;
        this._tenant = result.tenant;
        resolve(true);
      }, err => {
        reject(err);
      });
    });
  }
  changeTenantIfNeeded(tenantId) {
    if (this.isCurrentTenant(tenantId)) {
      return false;
    }
    abp.multiTenancy.setTenantIdCookie(tenantId);
    location.reload();
    return true;
  }
  isCurrentTenant(tenantId) {
    if (!tenantId && this.tenant) {
      return false;
    } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
      return false;
    }
    return true;
  }
  static #_ = (() => this.ɵfac = function AppSessionService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || AppSessionService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_0__.SessionServiceProxy), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.AbpMultiTenancyService));
  })();
  static #_2 = (() => this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
    token: AppSessionService,
    factory: AppSessionService.ɵfac
  }))();
}

/***/ }),

/***/ 31699:
/*!*************************************!*\
  !*** ./src/shared/shared.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharedModule: () => (/* binding */ SharedModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 60316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 95072);
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-pagination */ 82423);
/* harmony import */ var _session_app_session_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./session/app-session.service */ 59626);
/* harmony import */ var _nav_app_url_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nav/app-url.service */ 95874);
/* harmony import */ var _auth_app_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/app-auth.service */ 43728);
/* harmony import */ var _auth_auth_route_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/auth-route-guard */ 37191);
/* harmony import */ var _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shared/pipes/localize.pipe */ 54747);
/* harmony import */ var _components_pagination_abp_pagination_controls_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/pagination/abp-pagination-controls.component */ 18612);
/* harmony import */ var _components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/validation/abp-validation.summary.component */ 48339);
/* harmony import */ var _components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/modal/abp-modal-header.component */ 417);
/* harmony import */ var _components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/modal/abp-modal-footer.component */ 42991);
/* harmony import */ var _layout_layout_store_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./layout/layout-store.service */ 4166);
/* harmony import */ var _directives_busy_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./directives/busy.directive */ 56851);
/* harmony import */ var _directives_equal_validator_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./directives/equal-validator.directive */ 70433);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 37580);
















class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [_session_app_session_service__WEBPACK_IMPORTED_MODULE_0__.AppSessionService, _nav_app_url_service__WEBPACK_IMPORTED_MODULE_1__.AppUrlService, _auth_app_auth_service__WEBPACK_IMPORTED_MODULE_2__.AppAuthService, _auth_auth_route_guard__WEBPACK_IMPORTED_MODULE_3__.AppRouteGuard, _layout_layout_store_service__WEBPACK_IMPORTED_MODULE_9__.LayoutStoreService]
    };
  }
  static #_ = (() => this.ɵfac = function SharedModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || SharedModule)();
  })();
  static #_2 = (() => this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineNgModule"]({
    type: SharedModule
  }))();
  static #_3 = (() => this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjector"]({
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule, ngx_pagination__WEBPACK_IMPORTED_MODULE_15__.NgxPaginationModule]
  }))();
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵsetNgModuleScope"](SharedModule, {
    declarations: [_components_pagination_abp_pagination_controls_component__WEBPACK_IMPORTED_MODULE_5__.AbpPaginationControlsComponent, _components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_6__.AbpValidationSummaryComponent, _components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_7__.AbpModalHeaderComponent, _components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_8__.AbpModalFooterComponent, _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_4__.LocalizePipe, _directives_busy_directive__WEBPACK_IMPORTED_MODULE_10__.BusyDirective, _directives_equal_validator_directive__WEBPACK_IMPORTED_MODULE_11__.EqualValidator],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_14__.RouterModule, ngx_pagination__WEBPACK_IMPORTED_MODULE_15__.NgxPaginationModule],
    exports: [_components_pagination_abp_pagination_controls_component__WEBPACK_IMPORTED_MODULE_5__.AbpPaginationControlsComponent, _components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_6__.AbpValidationSummaryComponent, _components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_7__.AbpModalHeaderComponent, _components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_8__.AbpModalFooterComponent, _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_4__.LocalizePipe, _directives_busy_directive__WEBPACK_IMPORTED_MODULE_10__.BusyDirective, _directives_equal_validator_directive__WEBPACK_IMPORTED_MODULE_11__.EqualValidator]
  });
})();

/***/ }),

/***/ 77055:
/*!***********************************************************************************!*\
  !*** ./node_modules/@angular/common/locales/ lazy ^\.\/.*\.mjs$ namespace object ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af-NA.mjs": [
		14610,
		"node_modules_angular_common_locales_af-NA_mjs"
	],
	"./af.mjs": [
		35188,
		"node_modules_angular_common_locales_af_mjs"
	],
	"./agq.mjs": [
		9070,
		"node_modules_angular_common_locales_agq_mjs"
	],
	"./ak.mjs": [
		6561,
		"node_modules_angular_common_locales_ak_mjs"
	],
	"./am.mjs": [
		94455,
		"node_modules_angular_common_locales_am_mjs"
	],
	"./ar-AE.mjs": [
		36095,
		"node_modules_angular_common_locales_ar-AE_mjs"
	],
	"./ar-BH.mjs": [
		15651,
		"node_modules_angular_common_locales_ar-BH_mjs"
	],
	"./ar-DJ.mjs": [
		45071,
		"node_modules_angular_common_locales_ar-DJ_mjs"
	],
	"./ar-DZ.mjs": [
		40287,
		"node_modules_angular_common_locales_ar-DZ_mjs"
	],
	"./ar-EG.mjs": [
		98865,
		"node_modules_angular_common_locales_ar-EG_mjs"
	],
	"./ar-EH.mjs": [
		62838,
		"node_modules_angular_common_locales_ar-EH_mjs"
	],
	"./ar-ER.mjs": [
		13052,
		"node_modules_angular_common_locales_ar-ER_mjs"
	],
	"./ar-IL.mjs": [
		54198,
		"node_modules_angular_common_locales_ar-IL_mjs"
	],
	"./ar-IQ.mjs": [
		14523,
		"node_modules_angular_common_locales_ar-IQ_mjs"
	],
	"./ar-JO.mjs": [
		9084,
		"node_modules_angular_common_locales_ar-JO_mjs"
	],
	"./ar-KM.mjs": [
		79537,
		"node_modules_angular_common_locales_ar-KM_mjs"
	],
	"./ar-KW.mjs": [
		98867,
		"node_modules_angular_common_locales_ar-KW_mjs"
	],
	"./ar-LB.mjs": [
		78207,
		"node_modules_angular_common_locales_ar-LB_mjs"
	],
	"./ar-LY.mjs": [
		66332,
		"node_modules_angular_common_locales_ar-LY_mjs"
	],
	"./ar-MA.mjs": [
		35407,
		"node_modules_angular_common_locales_ar-MA_mjs"
	],
	"./ar-MR.mjs": [
		38532,
		"node_modules_angular_common_locales_ar-MR_mjs"
	],
	"./ar-OM.mjs": [
		60237,
		"node_modules_angular_common_locales_ar-OM_mjs"
	],
	"./ar-PS.mjs": [
		55338,
		"node_modules_angular_common_locales_ar-PS_mjs"
	],
	"./ar-QA.mjs": [
		42995,
		"node_modules_angular_common_locales_ar-QA_mjs"
	],
	"./ar-SA.mjs": [
		45373,
		"node_modules_angular_common_locales_ar-SA_mjs"
	],
	"./ar-SD.mjs": [
		30064,
		"node_modules_angular_common_locales_ar-SD_mjs"
	],
	"./ar-SO.mjs": [
		22627,
		"node_modules_angular_common_locales_ar-SO_mjs"
	],
	"./ar-SS.mjs": [
		8599,
		"node_modules_angular_common_locales_ar-SS_mjs"
	],
	"./ar-SY.mjs": [
		31493,
		"node_modules_angular_common_locales_ar-SY_mjs"
	],
	"./ar-TD.mjs": [
		76913,
		"node_modules_angular_common_locales_ar-TD_mjs"
	],
	"./ar-TN.mjs": [
		55331,
		"node_modules_angular_common_locales_ar-TN_mjs"
	],
	"./ar-YE.mjs": [
		51351,
		"node_modules_angular_common_locales_ar-YE_mjs"
	],
	"./ar.mjs": [
		45512,
		"node_modules_angular_common_locales_ar_mjs"
	],
	"./as.mjs": [
		67849,
		"node_modules_angular_common_locales_as_mjs"
	],
	"./asa.mjs": [
		26570,
		"node_modules_angular_common_locales_asa_mjs"
	],
	"./ast.mjs": [
		26015,
		"node_modules_angular_common_locales_ast_mjs"
	],
	"./az-Cyrl.mjs": [
		10691,
		"node_modules_angular_common_locales_az-Cyrl_mjs"
	],
	"./az-Latn.mjs": [
		7158,
		"node_modules_angular_common_locales_az-Latn_mjs"
	],
	"./az.mjs": [
		15920,
		"node_modules_angular_common_locales_az_mjs"
	],
	"./bas.mjs": [
		67273,
		"node_modules_angular_common_locales_bas_mjs"
	],
	"./be-tarask.mjs": [
		55831,
		"node_modules_angular_common_locales_be-tarask_mjs"
	],
	"./be.mjs": [
		96846,
		"node_modules_angular_common_locales_be_mjs"
	],
	"./bem.mjs": [
		93779,
		"node_modules_angular_common_locales_bem_mjs"
	],
	"./bez.mjs": [
		65892,
		"node_modules_angular_common_locales_bez_mjs"
	],
	"./bg.mjs": [
		43868,
		"node_modules_angular_common_locales_bg_mjs"
	],
	"./bm.mjs": [
		84806,
		"node_modules_angular_common_locales_bm_mjs"
	],
	"./bn-IN.mjs": [
		33551,
		"node_modules_angular_common_locales_bn-IN_mjs"
	],
	"./bn.mjs": [
		18021,
		"node_modules_angular_common_locales_bn_mjs"
	],
	"./bo-IN.mjs": [
		94168,
		"node_modules_angular_common_locales_bo-IN_mjs"
	],
	"./bo.mjs": [
		8116,
		"node_modules_angular_common_locales_bo_mjs"
	],
	"./br.mjs": [
		79153,
		"node_modules_angular_common_locales_br_mjs"
	],
	"./brx.mjs": [
		23251,
		"node_modules_angular_common_locales_brx_mjs"
	],
	"./bs-Cyrl.mjs": [
		35523,
		"node_modules_angular_common_locales_bs-Cyrl_mjs"
	],
	"./bs-Latn.mjs": [
		46486,
		"node_modules_angular_common_locales_bs-Latn_mjs"
	],
	"./bs.mjs": [
		16592,
		"node_modules_angular_common_locales_bs_mjs"
	],
	"./ca-AD.mjs": [
		31933,
		"node_modules_angular_common_locales_ca-AD_mjs"
	],
	"./ca-ES-valencia.mjs": [
		6222,
		"node_modules_angular_common_locales_ca-ES-valencia_mjs"
	],
	"./ca-FR.mjs": [
		64714,
		"node_modules_angular_common_locales_ca-FR_mjs"
	],
	"./ca-IT.mjs": [
		55365,
		"node_modules_angular_common_locales_ca-IT_mjs"
	],
	"./ca.mjs": [
		28765,
		"node_modules_angular_common_locales_ca_mjs"
	],
	"./ccp-IN.mjs": [
		64583,
		"node_modules_angular_common_locales_ccp-IN_mjs"
	],
	"./ccp.mjs": [
		14525,
		"node_modules_angular_common_locales_ccp_mjs"
	],
	"./ce.mjs": [
		53777,
		"node_modules_angular_common_locales_ce_mjs"
	],
	"./ceb.mjs": [
		33905,
		"node_modules_angular_common_locales_ceb_mjs"
	],
	"./cgg.mjs": [
		11238,
		"node_modules_angular_common_locales_cgg_mjs"
	],
	"./chr.mjs": [
		36538,
		"node_modules_angular_common_locales_chr_mjs"
	],
	"./ckb-IR.mjs": [
		96333,
		"node_modules_angular_common_locales_ckb-IR_mjs"
	],
	"./ckb.mjs": [
		85791,
		"node_modules_angular_common_locales_ckb_mjs"
	],
	"./cs.mjs": [
		83543,
		"node_modules_angular_common_locales_cs_mjs"
	],
	"./cy.mjs": [
		27397,
		"node_modules_angular_common_locales_cy_mjs"
	],
	"./da-GL.mjs": [
		66184,
		"node_modules_angular_common_locales_da-GL_mjs"
	],
	"./da.mjs": [
		67564,
		"node_modules_angular_common_locales_da_mjs"
	],
	"./dav.mjs": [
		78702,
		"node_modules_angular_common_locales_dav_mjs"
	],
	"./de-AT.mjs": [
		76622,
		"node_modules_angular_common_locales_de-AT_mjs"
	],
	"./de-BE.mjs": [
		29958,
		"node_modules_angular_common_locales_de-BE_mjs"
	],
	"./de-CH.mjs": [
		6412,
		"node_modules_angular_common_locales_de-CH_mjs"
	],
	"./de-IT.mjs": [
		73606,
		"node_modules_angular_common_locales_de-IT_mjs"
	],
	"./de-LI.mjs": [
		77044,
		"node_modules_angular_common_locales_de-LI_mjs"
	],
	"./de-LU.mjs": [
		57776,
		"node_modules_angular_common_locales_de-LU_mjs"
	],
	"./de.mjs": [
		73840,
		"node_modules_angular_common_locales_de_mjs"
	],
	"./dje.mjs": [
		78120,
		"node_modules_angular_common_locales_dje_mjs"
	],
	"./doi.mjs": [
		65059,
		"node_modules_angular_common_locales_doi_mjs"
	],
	"./dsb.mjs": [
		73660,
		"node_modules_angular_common_locales_dsb_mjs"
	],
	"./dua.mjs": [
		71293,
		"node_modules_angular_common_locales_dua_mjs"
	],
	"./dyo.mjs": [
		16679,
		"node_modules_angular_common_locales_dyo_mjs"
	],
	"./dz.mjs": [
		45679,
		"node_modules_angular_common_locales_dz_mjs"
	],
	"./ebu.mjs": [
		61821,
		"node_modules_angular_common_locales_ebu_mjs"
	],
	"./ee-TG.mjs": [
		77847,
		"node_modules_angular_common_locales_ee-TG_mjs"
	],
	"./ee.mjs": [
		29499,
		"node_modules_angular_common_locales_ee_mjs"
	],
	"./el-CY.mjs": [
		31607,
		"node_modules_angular_common_locales_el-CY_mjs"
	],
	"./el.mjs": [
		17546,
		"node_modules_angular_common_locales_el_mjs"
	],
	"./en-001.mjs": [
		33434,
		"node_modules_angular_common_locales_en-001_mjs"
	],
	"./en-150.mjs": [
		24341,
		"node_modules_angular_common_locales_en-150_mjs"
	],
	"./en-AE.mjs": [
		23599,
		"node_modules_angular_common_locales_en-AE_mjs"
	],
	"./en-AG.mjs": [
		39525,
		"node_modules_angular_common_locales_en-AG_mjs"
	],
	"./en-AI.mjs": [
		13051,
		"node_modules_angular_common_locales_en-AI_mjs"
	],
	"./en-AS.mjs": [
		64617,
		"node_modules_angular_common_locales_en-AS_mjs"
	],
	"./en-AT.mjs": [
		64630,
		"node_modules_angular_common_locales_en-AT_mjs"
	],
	"./en-AU.mjs": [
		35167,
		"node_modules_angular_common_locales_en-AU_mjs"
	],
	"./en-BB.mjs": [
		54465,
		"node_modules_angular_common_locales_en-BB_mjs"
	],
	"./en-BE.mjs": [
		83726,
		"node_modules_angular_common_locales_en-BE_mjs"
	],
	"./en-BI.mjs": [
		35274,
		"node_modules_angular_common_locales_en-BI_mjs"
	],
	"./en-BM.mjs": [
		90374,
		"node_modules_angular_common_locales_en-BM_mjs"
	],
	"./en-BS.mjs": [
		86512,
		"node_modules_angular_common_locales_en-BS_mjs"
	],
	"./en-BW.mjs": [
		20492,
		"node_modules_angular_common_locales_en-BW_mjs"
	],
	"./en-BZ.mjs": [
		80521,
		"node_modules_angular_common_locales_en-BZ_mjs"
	],
	"./en-CA.mjs": [
		56989,
		"node_modules_angular_common_locales_en-CA_mjs"
	],
	"./en-CC.mjs": [
		31943,
		"node_modules_angular_common_locales_en-CC_mjs"
	],
	"./en-CH.mjs": [
		15588,
		"node_modules_angular_common_locales_en-CH_mjs"
	],
	"./en-CK.mjs": [
		67039,
		"node_modules_angular_common_locales_en-CK_mjs"
	],
	"./en-CM.mjs": [
		39689,
		"node_modules_angular_common_locales_en-CM_mjs"
	],
	"./en-CX.mjs": [
		33204,
		"node_modules_angular_common_locales_en-CX_mjs"
	],
	"./en-CY.mjs": [
		43109,
		"node_modules_angular_common_locales_en-CY_mjs"
	],
	"./en-DE.mjs": [
		43760,
		"node_modules_angular_common_locales_en-DE_mjs"
	],
	"./en-DG.mjs": [
		71522,
		"node_modules_angular_common_locales_en-DG_mjs"
	],
	"./en-DK.mjs": [
		52054,
		"node_modules_angular_common_locales_en-DK_mjs"
	],
	"./en-DM.mjs": [
		50056,
		"node_modules_angular_common_locales_en-DM_mjs"
	],
	"./en-ER.mjs": [
		30156,
		"node_modules_angular_common_locales_en-ER_mjs"
	],
	"./en-FI.mjs": [
		92478,
		"node_modules_angular_common_locales_en-FI_mjs"
	],
	"./en-FJ.mjs": [
		60765,
		"node_modules_angular_common_locales_en-FJ_mjs"
	],
	"./en-FK.mjs": [
		58028,
		"node_modules_angular_common_locales_en-FK_mjs"
	],
	"./en-FM.mjs": [
		9858,
		"node_modules_angular_common_locales_en-FM_mjs"
	],
	"./en-GB.mjs": [
		27666,
		"node_modules_angular_common_locales_en-GB_mjs"
	],
	"./en-GD.mjs": [
		43996,
		"node_modules_angular_common_locales_en-GD_mjs"
	],
	"./en-GG.mjs": [
		88311,
		"node_modules_angular_common_locales_en-GG_mjs"
	],
	"./en-GH.mjs": [
		53176,
		"node_modules_angular_common_locales_en-GH_mjs"
	],
	"./en-GI.mjs": [
		62169,
		"node_modules_angular_common_locales_en-GI_mjs"
	],
	"./en-GM.mjs": [
		68677,
		"node_modules_angular_common_locales_en-GM_mjs"
	],
	"./en-GU.mjs": [
		13181,
		"node_modules_angular_common_locales_en-GU_mjs"
	],
	"./en-GY.mjs": [
		45353,
		"node_modules_angular_common_locales_en-GY_mjs"
	],
	"./en-HK.mjs": [
		59130,
		"node_modules_angular_common_locales_en-HK_mjs"
	],
	"./en-IE.mjs": [
		62967,
		"node_modules_angular_common_locales_en-IE_mjs"
	],
	"./en-IL.mjs": [
		68998,
		"node_modules_angular_common_locales_en-IL_mjs"
	],
	"./en-IM.mjs": [
		56271,
		"node_modules_angular_common_locales_en-IM_mjs"
	],
	"./en-IN.mjs": [
		92308,
		"node_modules_angular_common_locales_en-IN_mjs"
	],
	"./en-IO.mjs": [
		85861,
		"node_modules_angular_common_locales_en-IO_mjs"
	],
	"./en-JE.mjs": [
		32726,
		"node_modules_angular_common_locales_en-JE_mjs"
	],
	"./en-JM.mjs": [
		27486,
		"node_modules_angular_common_locales_en-JM_mjs"
	],
	"./en-KE.mjs": [
		46201,
		"node_modules_angular_common_locales_en-KE_mjs"
	],
	"./en-KI.mjs": [
		30573,
		"node_modules_angular_common_locales_en-KI_mjs"
	],
	"./en-KN.mjs": [
		60114,
		"node_modules_angular_common_locales_en-KN_mjs"
	],
	"./en-KY.mjs": [
		96605,
		"node_modules_angular_common_locales_en-KY_mjs"
	],
	"./en-LC.mjs": [
		91622,
		"node_modules_angular_common_locales_en-LC_mjs"
	],
	"./en-LR.mjs": [
		36863,
		"node_modules_angular_common_locales_en-LR_mjs"
	],
	"./en-LS.mjs": [
		84118,
		"node_modules_angular_common_locales_en-LS_mjs"
	],
	"./en-MG.mjs": [
		28105,
		"node_modules_angular_common_locales_en-MG_mjs"
	],
	"./en-MH.mjs": [
		37150,
		"node_modules_angular_common_locales_en-MH_mjs"
	],
	"./en-MO.mjs": [
		95217,
		"node_modules_angular_common_locales_en-MO_mjs"
	],
	"./en-MP.mjs": [
		37958,
		"node_modules_angular_common_locales_en-MP_mjs"
	],
	"./en-MS.mjs": [
		52485,
		"node_modules_angular_common_locales_en-MS_mjs"
	],
	"./en-MT.mjs": [
		82858,
		"node_modules_angular_common_locales_en-MT_mjs"
	],
	"./en-MU.mjs": [
		88371,
		"node_modules_angular_common_locales_en-MU_mjs"
	],
	"./en-MV.mjs": [
		94456,
		"node_modules_angular_common_locales_en-MV_mjs"
	],
	"./en-MW.mjs": [
		3449,
		"node_modules_angular_common_locales_en-MW_mjs"
	],
	"./en-MY.mjs": [
		8631,
		"node_modules_angular_common_locales_en-MY_mjs"
	],
	"./en-NA.mjs": [
		10078,
		"node_modules_angular_common_locales_en-NA_mjs"
	],
	"./en-NF.mjs": [
		48913,
		"node_modules_angular_common_locales_en-NF_mjs"
	],
	"./en-NG.mjs": [
		11472,
		"node_modules_angular_common_locales_en-NG_mjs"
	],
	"./en-NL.mjs": [
		27331,
		"node_modules_angular_common_locales_en-NL_mjs"
	],
	"./en-NR.mjs": [
		18221,
		"node_modules_angular_common_locales_en-NR_mjs"
	],
	"./en-NU.mjs": [
		94738,
		"node_modules_angular_common_locales_en-NU_mjs"
	],
	"./en-NZ.mjs": [
		29861,
		"node_modules_angular_common_locales_en-NZ_mjs"
	],
	"./en-PG.mjs": [
		71046,
		"node_modules_angular_common_locales_en-PG_mjs"
	],
	"./en-PH.mjs": [
		35137,
		"node_modules_angular_common_locales_en-PH_mjs"
	],
	"./en-PK.mjs": [
		66802,
		"node_modules_angular_common_locales_en-PK_mjs"
	],
	"./en-PN.mjs": [
		41719,
		"node_modules_angular_common_locales_en-PN_mjs"
	],
	"./en-PR.mjs": [
		6723,
		"node_modules_angular_common_locales_en-PR_mjs"
	],
	"./en-PW.mjs": [
		91830,
		"node_modules_angular_common_locales_en-PW_mjs"
	],
	"./en-RW.mjs": [
		15004,
		"node_modules_angular_common_locales_en-RW_mjs"
	],
	"./en-SB.mjs": [
		70926,
		"node_modules_angular_common_locales_en-SB_mjs"
	],
	"./en-SC.mjs": [
		11735,
		"node_modules_angular_common_locales_en-SC_mjs"
	],
	"./en-SD.mjs": [
		12160,
		"node_modules_angular_common_locales_en-SD_mjs"
	],
	"./en-SE.mjs": [
		7489,
		"node_modules_angular_common_locales_en-SE_mjs"
	],
	"./en-SG.mjs": [
		93915,
		"node_modules_angular_common_locales_en-SG_mjs"
	],
	"./en-SH.mjs": [
		36116,
		"node_modules_angular_common_locales_en-SH_mjs"
	],
	"./en-SI.mjs": [
		92101,
		"node_modules_angular_common_locales_en-SI_mjs"
	],
	"./en-SL.mjs": [
		76600,
		"node_modules_angular_common_locales_en-SL_mjs"
	],
	"./en-SS.mjs": [
		4231,
		"node_modules_angular_common_locales_en-SS_mjs"
	],
	"./en-SX.mjs": [
		61028,
		"node_modules_angular_common_locales_en-SX_mjs"
	],
	"./en-SZ.mjs": [
		17206,
		"node_modules_angular_common_locales_en-SZ_mjs"
	],
	"./en-TC.mjs": [
		74734,
		"node_modules_angular_common_locales_en-TC_mjs"
	],
	"./en-TK.mjs": [
		11110,
		"node_modules_angular_common_locales_en-TK_mjs"
	],
	"./en-TO.mjs": [
		68810,
		"node_modules_angular_common_locales_en-TO_mjs"
	],
	"./en-TT.mjs": [
		91665,
		"node_modules_angular_common_locales_en-TT_mjs"
	],
	"./en-TV.mjs": [
		54443,
		"node_modules_angular_common_locales_en-TV_mjs"
	],
	"./en-TZ.mjs": [
		68255,
		"node_modules_angular_common_locales_en-TZ_mjs"
	],
	"./en-UG.mjs": [
		10481,
		"node_modules_angular_common_locales_en-UG_mjs"
	],
	"./en-UM.mjs": [
		36931,
		"node_modules_angular_common_locales_en-UM_mjs"
	],
	"./en-VC.mjs": [
		82644,
		"node_modules_angular_common_locales_en-VC_mjs"
	],
	"./en-VG.mjs": [
		87544,
		"node_modules_angular_common_locales_en-VG_mjs"
	],
	"./en-VI.mjs": [
		71374,
		"node_modules_angular_common_locales_en-VI_mjs"
	],
	"./en-VU.mjs": [
		1882,
		"node_modules_angular_common_locales_en-VU_mjs"
	],
	"./en-WS.mjs": [
		93723,
		"node_modules_angular_common_locales_en-WS_mjs"
	],
	"./en-ZA.mjs": [
		49482,
		"node_modules_angular_common_locales_en-ZA_mjs"
	],
	"./en-ZM.mjs": [
		55406,
		"node_modules_angular_common_locales_en-ZM_mjs"
	],
	"./en-ZW.mjs": [
		56836,
		"node_modules_angular_common_locales_en-ZW_mjs"
	],
	"./en.mjs": [
		39032,
		"node_modules_angular_common_locales_en_mjs"
	],
	"./eo.mjs": [
		48025,
		"node_modules_angular_common_locales_eo_mjs"
	],
	"./es-419.mjs": [
		3292,
		"node_modules_angular_common_locales_es-419_mjs"
	],
	"./es-AR.mjs": [
		91611,
		"node_modules_angular_common_locales_es-AR_mjs"
	],
	"./es-BO.mjs": [
		75899,
		"node_modules_angular_common_locales_es-BO_mjs"
	],
	"./es-BR.mjs": [
		75894,
		"node_modules_angular_common_locales_es-BR_mjs"
	],
	"./es-BZ.mjs": [
		19678,
		"node_modules_angular_common_locales_es-BZ_mjs"
	],
	"./es-CL.mjs": [
		10503,
		"node_modules_angular_common_locales_es-CL_mjs"
	],
	"./es-CO.mjs": [
		13964,
		"node_modules_angular_common_locales_es-CO_mjs"
	],
	"./es-CR.mjs": [
		42009,
		"node_modules_angular_common_locales_es-CR_mjs"
	],
	"./es-CU.mjs": [
		88454,
		"node_modules_angular_common_locales_es-CU_mjs"
	],
	"./es-DO.mjs": [
		92465,
		"node_modules_angular_common_locales_es-DO_mjs"
	],
	"./es-EA.mjs": [
		45588,
		"node_modules_angular_common_locales_es-EA_mjs"
	],
	"./es-EC.mjs": [
		62246,
		"node_modules_angular_common_locales_es-EC_mjs"
	],
	"./es-GQ.mjs": [
		26062,
		"node_modules_angular_common_locales_es-GQ_mjs"
	],
	"./es-GT.mjs": [
		49051,
		"node_modules_angular_common_locales_es-GT_mjs"
	],
	"./es-HN.mjs": [
		9839,
		"node_modules_angular_common_locales_es-HN_mjs"
	],
	"./es-IC.mjs": [
		67738,
		"node_modules_angular_common_locales_es-IC_mjs"
	],
	"./es-MX.mjs": [
		40997,
		"node_modules_angular_common_locales_es-MX_mjs"
	],
	"./es-NI.mjs": [
		53753,
		"node_modules_angular_common_locales_es-NI_mjs"
	],
	"./es-PA.mjs": [
		81227,
		"node_modules_angular_common_locales_es-PA_mjs"
	],
	"./es-PE.mjs": [
		43591,
		"node_modules_angular_common_locales_es-PE_mjs"
	],
	"./es-PH.mjs": [
		80442,
		"node_modules_angular_common_locales_es-PH_mjs"
	],
	"./es-PR.mjs": [
		78368,
		"node_modules_angular_common_locales_es-PR_mjs"
	],
	"./es-PY.mjs": [
		85747,
		"node_modules_angular_common_locales_es-PY_mjs"
	],
	"./es-SV.mjs": [
		73077,
		"node_modules_angular_common_locales_es-SV_mjs"
	],
	"./es-US.mjs": [
		60518,
		"node_modules_angular_common_locales_es-US_mjs"
	],
	"./es-UY.mjs": [
		3228,
		"node_modules_angular_common_locales_es-UY_mjs"
	],
	"./es-VE.mjs": [
		34821,
		"node_modules_angular_common_locales_es-VE_mjs"
	],
	"./es.mjs": [
		41565,
		"node_modules_angular_common_locales_es_mjs"
	],
	"./et.mjs": [
		55458,
		"node_modules_angular_common_locales_et_mjs"
	],
	"./eu.mjs": [
		54155,
		"node_modules_angular_common_locales_eu_mjs"
	],
	"./ewo.mjs": [
		40900,
		"node_modules_angular_common_locales_ewo_mjs"
	],
	"./extra/af-NA.mjs": [
		34709,
		"node_modules_angular_common_locales_extra_af-NA_mjs"
	],
	"./extra/af.mjs": [
		77465,
		"node_modules_angular_common_locales_extra_af_mjs"
	],
	"./extra/agq.mjs": [
		41301,
		"node_modules_angular_common_locales_extra_agq_mjs"
	],
	"./extra/ak.mjs": [
		59292,
		"node_modules_angular_common_locales_extra_ak_mjs"
	],
	"./extra/am.mjs": [
		42962,
		"node_modules_angular_common_locales_extra_am_mjs"
	],
	"./extra/ar-AE.mjs": [
		66916,
		"node_modules_angular_common_locales_extra_ar-AE_mjs"
	],
	"./extra/ar-BH.mjs": [
		24804,
		"node_modules_angular_common_locales_extra_ar-BH_mjs"
	],
	"./extra/ar-DJ.mjs": [
		93364,
		"node_modules_angular_common_locales_extra_ar-DJ_mjs"
	],
	"./extra/ar-DZ.mjs": [
		59396,
		"node_modules_angular_common_locales_extra_ar-DZ_mjs"
	],
	"./extra/ar-EG.mjs": [
		78626,
		"node_modules_angular_common_locales_extra_ar-EG_mjs"
	],
	"./extra/ar-EH.mjs": [
		10741,
		"node_modules_angular_common_locales_extra_ar-EH_mjs"
	],
	"./extra/ar-ER.mjs": [
		11607,
		"node_modules_angular_common_locales_extra_ar-ER_mjs"
	],
	"./extra/ar-IL.mjs": [
		43189,
		"node_modules_angular_common_locales_extra_ar-IL_mjs"
	],
	"./extra/ar-IQ.mjs": [
		23744,
		"node_modules_angular_common_locales_extra_ar-IQ_mjs"
	],
	"./extra/ar-JO.mjs": [
		85755,
		"node_modules_angular_common_locales_extra_ar-JO_mjs"
	],
	"./extra/ar-KM.mjs": [
		60766,
		"node_modules_angular_common_locales_extra_ar-KM_mjs"
	],
	"./extra/ar-KW.mjs": [
		21620,
		"node_modules_angular_common_locales_extra_ar-KW_mjs"
	],
	"./extra/ar-LB.mjs": [
		97316,
		"node_modules_angular_common_locales_extra_ar-LB_mjs"
	],
	"./extra/ar-LY.mjs": [
		1943,
		"node_modules_angular_common_locales_extra_ar-LY_mjs"
	],
	"./extra/ar-MA.mjs": [
		39092,
		"node_modules_angular_common_locales_extra_ar-MA_mjs"
	],
	"./extra/ar-MR.mjs": [
		86719,
		"node_modules_angular_common_locales_extra_ar-MR_mjs"
	],
	"./extra/ar-OM.mjs": [
		20346,
		"node_modules_angular_common_locales_extra_ar-OM_mjs"
	],
	"./extra/ar-PS.mjs": [
		76185,
		"node_modules_angular_common_locales_extra_ar-PS_mjs"
	],
	"./extra/ar-QA.mjs": [
		69272,
		"node_modules_angular_common_locales_extra_ar-QA_mjs"
	],
	"./extra/ar-SA.mjs": [
		76674,
		"node_modules_angular_common_locales_extra_ar-SA_mjs"
	],
	"./extra/ar-SD.mjs": [
		10055,
		"node_modules_angular_common_locales_extra_ar-SD_mjs"
	],
	"./extra/ar-SO.mjs": [
		5028,
		"node_modules_angular_common_locales_extra_ar-SO_mjs"
	],
	"./extra/ar-SS.mjs": [
		72512,
		"node_modules_angular_common_locales_extra_ar-SS_mjs"
	],
	"./extra/ar-SY.mjs": [
		14026,
		"node_modules_angular_common_locales_extra_ar-SY_mjs"
	],
	"./extra/ar-TD.mjs": [
		86338,
		"node_modules_angular_common_locales_extra_ar-TD_mjs"
	],
	"./extra/ar-TN.mjs": [
		64872,
		"node_modules_angular_common_locales_extra_ar-TN_mjs"
	],
	"./extra/ar-YE.mjs": [
		1148,
		"node_modules_angular_common_locales_extra_ar-YE_mjs"
	],
	"./extra/ar.mjs": [
		86389,
		"node_modules_angular_common_locales_extra_ar_mjs"
	],
	"./extra/as.mjs": [
		36548,
		"node_modules_angular_common_locales_extra_as_mjs"
	],
	"./extra/asa.mjs": [
		70937,
		"node_modules_angular_common_locales_extra_asa_mjs"
	],
	"./extra/ast.mjs": [
		30020,
		"node_modules_angular_common_locales_extra_ast_mjs"
	],
	"./extra/az-Cyrl.mjs": [
		59760,
		"node_modules_angular_common_locales_extra_az-Cyrl_mjs"
	],
	"./extra/az-Latn.mjs": [
		80677,
		"node_modules_angular_common_locales_extra_az-Latn_mjs"
	],
	"./extra/az.mjs": [
		28477,
		"node_modules_angular_common_locales_extra_az_mjs"
	],
	"./extra/bas.mjs": [
		81278,
		"node_modules_angular_common_locales_extra_bas_mjs"
	],
	"./extra/be-tarask.mjs": [
		90720,
		"node_modules_angular_common_locales_extra_be-tarask_mjs"
	],
	"./extra/be.mjs": [
		94539,
		"node_modules_angular_common_locales_extra_be_mjs"
	],
	"./extra/bem.mjs": [
		88988,
		"node_modules_angular_common_locales_extra_bem_mjs"
	],
	"./extra/bez.mjs": [
		3403,
		"node_modules_angular_common_locales_extra_bez_mjs"
	],
	"./extra/bg.mjs": [
		29201,
		"node_modules_angular_common_locales_extra_bg_mjs"
	],
	"./extra/bm.mjs": [
		59203,
		"node_modules_angular_common_locales_extra_bm_mjs"
	],
	"./extra/bn-IN.mjs": [
		2372,
		"node_modules_angular_common_locales_extra_bn-IN_mjs"
	],
	"./extra/bn.mjs": [
		72936,
		"node_modules_angular_common_locales_extra_bn_mjs"
	],
	"./extra/bo-IN.mjs": [
		11291,
		"node_modules_angular_common_locales_extra_bo-IN_mjs"
	],
	"./extra/bo.mjs": [
		48297,
		"node_modules_angular_common_locales_extra_bo_mjs"
	],
	"./extra/br.mjs": [
		77564,
		"node_modules_angular_common_locales_extra_br_mjs"
	],
	"./extra/brx.mjs": [
		81640,
		"node_modules_angular_common_locales_extra_brx_mjs"
	],
	"./extra/bs-Cyrl.mjs": [
		77472,
		"node_modules_angular_common_locales_extra_bs-Cyrl_mjs"
	],
	"./extra/bs-Latn.mjs": [
		99125,
		"node_modules_angular_common_locales_extra_bs-Latn_mjs"
	],
	"./extra/bs.mjs": [
		73389,
		"node_modules_angular_common_locales_extra_bs_mjs"
	],
	"./extra/ca-AD.mjs": [
		98,
		"node_modules_angular_common_locales_extra_ca-AD_mjs"
	],
	"./extra/ca-ES-valencia.mjs": [
		36999,
		"node_modules_angular_common_locales_extra_ca-ES-valencia_mjs"
	],
	"./extra/ca-FR.mjs": [
		12225,
		"node_modules_angular_common_locales_extra_ca-FR_mjs"
	],
	"./extra/ca-IT.mjs": [
		83354,
		"node_modules_angular_common_locales_extra_ca-IT_mjs"
	],
	"./extra/ca.mjs": [
		74652,
		"node_modules_angular_common_locales_extra_ca_mjs"
	],
	"./extra/ccp-IN.mjs": [
		99442,
		"node_modules_angular_common_locales_extra_ccp-IN_mjs"
	],
	"./extra/ccp.mjs": [
		65086,
		"node_modules_angular_common_locales_extra_ccp_mjs"
	],
	"./extra/ce.mjs": [
		19392,
		"node_modules_angular_common_locales_extra_ce_mjs"
	],
	"./extra/ceb.mjs": [
		13918,
		"node_modules_angular_common_locales_extra_ceb_mjs"
	],
	"./extra/cgg.mjs": [
		63301,
		"node_modules_angular_common_locales_extra_cgg_mjs"
	],
	"./extra/chr.mjs": [
		58957,
		"node_modules_angular_common_locales_extra_chr_mjs"
	],
	"./extra/ckb-IR.mjs": [
		81532,
		"node_modules_angular_common_locales_extra_ckb-IR_mjs"
	],
	"./extra/ckb.mjs": [
		79364,
		"node_modules_angular_common_locales_extra_ckb_mjs"
	],
	"./extra/cs.mjs": [
		71102,
		"node_modules_angular_common_locales_extra_cs_mjs"
	],
	"./extra/cy.mjs": [
		94436,
		"node_modules_angular_common_locales_extra_cy_mjs"
	],
	"./extra/da-GL.mjs": [
		5875,
		"node_modules_angular_common_locales_extra_da-GL_mjs"
	],
	"./extra/da.mjs": [
		16141,
		"node_modules_angular_common_locales_extra_da_mjs"
	],
	"./extra/dav.mjs": [
		40825,
		"node_modules_angular_common_locales_extra_dav_mjs"
	],
	"./extra/de-AT.mjs": [
		11673,
		"node_modules_angular_common_locales_extra_de-AT_mjs"
	],
	"./extra/de-BE.mjs": [
		93413,
		"node_modules_angular_common_locales_extra_de-BE_mjs"
	],
	"./extra/de-CH.mjs": [
		39279,
		"node_modules_angular_common_locales_extra_de-CH_mjs"
	],
	"./extra/de-IT.mjs": [
		18545,
		"node_modules_angular_common_locales_extra_de-IT_mjs"
	],
	"./extra/de-LI.mjs": [
		77131,
		"node_modules_angular_common_locales_extra_de-LI_mjs"
	],
	"./extra/de-LU.mjs": [
		21071,
		"node_modules_angular_common_locales_extra_de-LU_mjs"
	],
	"./extra/de.mjs": [
		29761,
		"node_modules_angular_common_locales_extra_de_mjs"
	],
	"./extra/dje.mjs": [
		58403,
		"node_modules_angular_common_locales_extra_dje_mjs"
	],
	"./extra/doi.mjs": [
		69384,
		"node_modules_angular_common_locales_extra_doi_mjs"
	],
	"./extra/dsb.mjs": [
		25207,
		"node_modules_angular_common_locales_extra_dsb_mjs"
	],
	"./extra/dua.mjs": [
		64354,
		"node_modules_angular_common_locales_extra_dua_mjs"
	],
	"./extra/dyo.mjs": [
		97592,
		"node_modules_angular_common_locales_extra_dyo_mjs"
	],
	"./extra/dz.mjs": [
		12630,
		"node_modules_angular_common_locales_extra_dz_mjs"
	],
	"./extra/ebu.mjs": [
		15246,
		"node_modules_angular_common_locales_extra_ebu_mjs"
	],
	"./extra/ee-TG.mjs": [
		65208,
		"node_modules_angular_common_locales_extra_ee-TG_mjs"
	],
	"./extra/ee.mjs": [
		3998,
		"node_modules_angular_common_locales_extra_ee_mjs"
	],
	"./extra/el-CY.mjs": [
		76276,
		"node_modules_angular_common_locales_extra_el-CY_mjs"
	],
	"./extra/el.mjs": [
		82335,
		"node_modules_angular_common_locales_extra_el_mjs"
	],
	"./extra/en-001.mjs": [
		57643,
		"node_modules_angular_common_locales_extra_en-001_mjs"
	],
	"./extra/en-150.mjs": [
		1192,
		"node_modules_angular_common_locales_extra_en-150_mjs"
	],
	"./extra/en-AE.mjs": [
		71012,
		"node_modules_angular_common_locales_extra_en-AE_mjs"
	],
	"./extra/en-AG.mjs": [
		342,
		"node_modules_angular_common_locales_extra_en-AG_mjs"
	],
	"./extra/en-AI.mjs": [
		97104,
		"node_modules_angular_common_locales_extra_en-AI_mjs"
	],
	"./extra/en-AS.mjs": [
		88394,
		"node_modules_angular_common_locales_extra_en-AS_mjs"
	],
	"./extra/en-AT.mjs": [
		98533,
		"node_modules_angular_common_locales_extra_en-AT_mjs"
	],
	"./extra/en-AU.mjs": [
		88628,
		"node_modules_angular_common_locales_extra_en-AU_mjs"
	],
	"./extra/en-BB.mjs": [
		28638,
		"node_modules_angular_common_locales_extra_en-BB_mjs"
	],
	"./extra/en-BE.mjs": [
		86705,
		"node_modules_angular_common_locales_extra_en-BE_mjs"
	],
	"./extra/en-BI.mjs": [
		68629,
		"node_modules_angular_common_locales_extra_en-BI_mjs"
	],
	"./extra/en-BM.mjs": [
		19593,
		"node_modules_angular_common_locales_extra_en-BM_mjs"
	],
	"./extra/en-BS.mjs": [
		16471,
		"node_modules_angular_common_locales_extra_en-BS_mjs"
	],
	"./extra/en-BW.mjs": [
		10555,
		"node_modules_angular_common_locales_extra_en-BW_mjs"
	],
	"./extra/en-BZ.mjs": [
		29446,
		"node_modules_angular_common_locales_extra_en-BZ_mjs"
	],
	"./extra/en-CA.mjs": [
		25842,
		"node_modules_angular_common_locales_extra_en-CA_mjs"
	],
	"./extra/en-CC.mjs": [
		86912,
		"node_modules_angular_common_locales_extra_en-CC_mjs"
	],
	"./extra/en-CH.mjs": [
		47315,
		"node_modules_angular_common_locales_extra_en-CH_mjs"
	],
	"./extra/en-CK.mjs": [
		35000,
		"node_modules_angular_common_locales_extra_en-CK_mjs"
	],
	"./extra/en-CM.mjs": [
		99462,
		"node_modules_angular_common_locales_extra_en-CM_mjs"
	],
	"./extra/en-CX.mjs": [
		54435,
		"node_modules_angular_common_locales_extra_en-CX_mjs"
	],
	"./extra/en-CY.mjs": [
		46458,
		"node_modules_angular_common_locales_extra_en-CY_mjs"
	],
	"./extra/en-DE.mjs": [
		78331,
		"node_modules_angular_common_locales_extra_en-DE_mjs"
	],
	"./extra/en-DG.mjs": [
		91905,
		"node_modules_angular_common_locales_extra_en-DG_mjs"
	],
	"./extra/en-DK.mjs": [
		76517,
		"node_modules_angular_common_locales_extra_en-DK_mjs"
	],
	"./extra/en-DM.mjs": [
		56979,
		"node_modules_angular_common_locales_extra_en-DM_mjs"
	],
	"./extra/en-ER.mjs": [
		27383,
		"node_modules_angular_common_locales_extra_en-ER_mjs"
	],
	"./extra/en-FI.mjs": [
		21625,
		"node_modules_angular_common_locales_extra_en-FI_mjs"
	],
	"./extra/en-FJ.mjs": [
		27210,
		"node_modules_angular_common_locales_extra_en-FJ_mjs"
	],
	"./extra/en-FK.mjs": [
		62451,
		"node_modules_angular_common_locales_extra_en-FK_mjs"
	],
	"./extra/en-FM.mjs": [
		31013,
		"node_modules_angular_common_locales_extra_en-FM_mjs"
	],
	"./extra/en-GB.mjs": [
		26549,
		"node_modules_angular_common_locales_extra_en-GB_mjs"
	],
	"./extra/en-GD.mjs": [
		92419,
		"node_modules_angular_common_locales_extra_en-GD_mjs"
	],
	"./extra/en-GG.mjs": [
		32328,
		"node_modules_angular_common_locales_extra_en-GG_mjs"
	],
	"./extra/en-GH.mjs": [
		90727,
		"node_modules_angular_common_locales_extra_en-GH_mjs"
	],
	"./extra/en-GI.mjs": [
		58814,
		"node_modules_angular_common_locales_extra_en-GI_mjs"
	],
	"./extra/en-GM.mjs": [
		80642,
		"node_modules_angular_common_locales_extra_en-GM_mjs"
	],
	"./extra/en-GU.mjs": [
		74794,
		"node_modules_angular_common_locales_extra_en-GU_mjs"
	],
	"./extra/en-GY.mjs": [
		97070,
		"node_modules_angular_common_locales_extra_en-GY_mjs"
	],
	"./extra/en-HK.mjs": [
		54041,
		"node_modules_angular_common_locales_extra_en-HK_mjs"
	],
	"./extra/en-IE.mjs": [
		49900,
		"node_modules_angular_common_locales_extra_en-IE_mjs"
	],
	"./extra/en-IL.mjs": [
		58965,
		"node_modules_angular_common_locales_extra_en-IL_mjs"
	],
	"./extra/en-IM.mjs": [
		88388,
		"node_modules_angular_common_locales_extra_en-IM_mjs"
	],
	"./extra/en-IN.mjs": [
		34399,
		"node_modules_angular_common_locales_extra_en-IN_mjs"
	],
	"./extra/en-IO.mjs": [
		40566,
		"node_modules_angular_common_locales_extra_en-IO_mjs"
	],
	"./extra/en-JE.mjs": [
		50681,
		"node_modules_angular_common_locales_extra_en-JE_mjs"
	],
	"./extra/en-JM.mjs": [
		72577,
		"node_modules_angular_common_locales_extra_en-JM_mjs"
	],
	"./extra/en-KE.mjs": [
		29878,
		"node_modules_angular_common_locales_extra_en-KE_mjs"
	],
	"./extra/en-KI.mjs": [
		98370,
		"node_modules_angular_common_locales_extra_en-KI_mjs"
	],
	"./extra/en-KN.mjs": [
		49277,
		"node_modules_angular_common_locales_extra_en-KN_mjs"
	],
	"./extra/en-KY.mjs": [
		63762,
		"node_modules_angular_common_locales_extra_en-KY_mjs"
	],
	"./extra/en-LC.mjs": [
		16853,
		"node_modules_angular_common_locales_extra_en-LC_mjs"
	],
	"./extra/en-LR.mjs": [
		58452,
		"node_modules_angular_common_locales_extra_en-LR_mjs"
	],
	"./extra/en-LS.mjs": [
		14437,
		"node_modules_angular_common_locales_extra_en-LS_mjs"
	],
	"./extra/en-MG.mjs": [
		33898,
		"node_modules_angular_common_locales_extra_en-MG_mjs"
	],
	"./extra/en-MH.mjs": [
		26061,
		"node_modules_angular_common_locales_extra_en-MH_mjs"
	],
	"./extra/en-MO.mjs": [
		2578,
		"node_modules_angular_common_locales_extra_en-MO_mjs"
	],
	"./extra/en-MP.mjs": [
		69301,
		"node_modules_angular_common_locales_extra_en-MP_mjs"
	],
	"./extra/en-MS.mjs": [
		46454,
		"node_modules_angular_common_locales_extra_en-MS_mjs"
	],
	"./extra/en-MT.mjs": [
		62793,
		"node_modules_angular_common_locales_extra_en-MT_mjs"
	],
	"./extra/en-MU.mjs": [
		75080,
		"node_modules_angular_common_locales_extra_en-MU_mjs"
	],
	"./extra/en-MV.mjs": [
		35171,
		"node_modules_angular_common_locales_extra_en-MV_mjs"
	],
	"./extra/en-MW.mjs": [
		954,
		"node_modules_angular_common_locales_extra_en-MW_mjs"
	],
	"./extra/en-MY.mjs": [
		79468,
		"node_modules_angular_common_locales_extra_en-MY_mjs"
	],
	"./extra/en-NA.mjs": [
		10377,
		"node_modules_angular_common_locales_extra_en-NA_mjs"
	],
	"./extra/en-NF.mjs": [
		94038,
		"node_modules_angular_common_locales_extra_en-NF_mjs"
	],
	"./extra/en-NG.mjs": [
		64575,
		"node_modules_angular_common_locales_extra_en-NG_mjs"
	],
	"./extra/en-NL.mjs": [
		27052,
		"node_modules_angular_common_locales_extra_en-NL_mjs"
	],
	"./extra/en-NR.mjs": [
		65130,
		"node_modules_angular_common_locales_extra_en-NR_mjs"
	],
	"./extra/en-NU.mjs": [
		68933,
		"node_modules_angular_common_locales_extra_en-NU_mjs"
	],
	"./extra/en-NZ.mjs": [
		50162,
		"node_modules_angular_common_locales_extra_en-NZ_mjs"
	],
	"./extra/en-PG.mjs": [
		49301,
		"node_modules_angular_common_locales_extra_en-PG_mjs"
	],
	"./extra/en-PH.mjs": [
		50370,
		"node_modules_angular_common_locales_extra_en-PH_mjs"
	],
	"./extra/en-PK.mjs": [
		67377,
		"node_modules_angular_common_locales_extra_en-PK_mjs"
	],
	"./extra/en-PN.mjs": [
		40236,
		"node_modules_angular_common_locales_extra_en-PN_mjs"
	],
	"./extra/en-PR.mjs": [
		82968,
		"node_modules_angular_common_locales_extra_en-PR_mjs"
	],
	"./extra/en-PW.mjs": [
		63378,
		"node_modules_angular_common_locales_extra_en-PW_mjs"
	],
	"./extra/en-RW.mjs": [
		52619,
		"node_modules_angular_common_locales_extra_en-RW_mjs"
	],
	"./extra/en-SB.mjs": [
		37425,
		"node_modules_angular_common_locales_extra_en-SB_mjs"
	],
	"./extra/en-SC.mjs": [
		99984,
		"node_modules_angular_common_locales_extra_en-SC_mjs"
	],
	"./extra/en-SD.mjs": [
		14151,
		"node_modules_angular_common_locales_extra_en-SD_mjs"
	],
	"./extra/en-SE.mjs": [
		98590,
		"node_modules_angular_common_locales_extra_en-SE_mjs"
	],
	"./extra/en-SG.mjs": [
		60140,
		"node_modules_angular_common_locales_extra_en-SG_mjs"
	],
	"./extra/en-SH.mjs": [
		15843,
		"node_modules_angular_common_locales_extra_en-SH_mjs"
	],
	"./extra/en-SI.mjs": [
		81626,
		"node_modules_angular_common_locales_extra_en-SI_mjs"
	],
	"./extra/en-SL.mjs": [
		97663,
		"node_modules_angular_common_locales_extra_en-SL_mjs"
	],
	"./extra/en-SS.mjs": [
		8147,
		"node_modules_angular_common_locales_extra_en-SS_mjs"
	],
	"./extra/en-SX.mjs": [
		33459,
		"node_modules_angular_common_locales_extra_en-SX_mjs"
	],
	"./extra/en-SZ.mjs": [
		92633,
		"node_modules_angular_common_locales_extra_en-SZ_mjs"
	],
	"./extra/en-TC.mjs": [
		55581,
		"node_modules_angular_common_locales_extra_en-TC_mjs"
	],
	"./extra/en-TK.mjs": [
		59637,
		"node_modules_angular_common_locales_extra_en-TK_mjs"
	],
	"./extra/en-TO.mjs": [
		53129,
		"node_modules_angular_common_locales_extra_en-TO_mjs"
	],
	"./extra/en-TT.mjs": [
		92914,
		"node_modules_angular_common_locales_extra_en-TT_mjs"
	],
	"./extra/en-TV.mjs": [
		40192,
		"node_modules_angular_common_locales_extra_en-TV_mjs"
	],
	"./extra/en-TZ.mjs": [
		76052,
		"node_modules_angular_common_locales_extra_en-TZ_mjs"
	],
	"./extra/en-UG.mjs": [
		69874,
		"node_modules_angular_common_locales_extra_en-UG_mjs"
	],
	"./extra/en-UM.mjs": [
		95384,
		"node_modules_angular_common_locales_extra_en-UM_mjs"
	],
	"./extra/en-VC.mjs": [
		58091,
		"node_modules_angular_common_locales_extra_en-VC_mjs"
	],
	"./extra/en-VG.mjs": [
		20455,
		"node_modules_angular_common_locales_extra_en-VG_mjs"
	],
	"./extra/en-VI.mjs": [
		11849,
		"node_modules_angular_common_locales_extra_en-VI_mjs"
	],
	"./extra/en-VU.mjs": [
		36941,
		"node_modules_angular_common_locales_extra_en-VU_mjs"
	],
	"./extra/en-WS.mjs": [
		31140,
		"node_modules_angular_common_locales_extra_en-WS_mjs"
	],
	"./extra/en-ZA.mjs": [
		40309,
		"node_modules_angular_common_locales_extra_en-ZA_mjs"
	],
	"./extra/en-ZM.mjs": [
		27761,
		"node_modules_angular_common_locales_extra_en-ZM_mjs"
	],
	"./extra/en-ZW.mjs": [
		23795,
		"node_modules_angular_common_locales_extra_en-ZW_mjs"
	],
	"./extra/en.mjs": [
		18293,
		"node_modules_angular_common_locales_extra_en_mjs"
	],
	"./extra/eo.mjs": [
		14532,
		"node_modules_angular_common_locales_extra_eo_mjs"
	],
	"./extra/es-419.mjs": [
		67329,
		"node_modules_angular_common_locales_extra_es-419_mjs"
	],
	"./extra/es-AR.mjs": [
		52688,
		"node_modules_angular_common_locales_extra_es-AR_mjs"
	],
	"./extra/es-BO.mjs": [
		92159,
		"node_modules_angular_common_locales_extra_es-BO_mjs"
	],
	"./extra/es-BR.mjs": [
		42585,
		"node_modules_angular_common_locales_extra_es-BR_mjs"
	],
	"./extra/es-BZ.mjs": [
		41185,
		"node_modules_angular_common_locales_extra_es-BZ_mjs"
	],
	"./extra/es-CL.mjs": [
		98272,
		"node_modules_angular_common_locales_extra_es-CL_mjs"
	],
	"./extra/es-CO.mjs": [
		92827,
		"node_modules_angular_common_locales_extra_es-CO_mjs"
	],
	"./extra/es-CR.mjs": [
		76470,
		"node_modules_angular_common_locales_extra_es-CR_mjs"
	],
	"./extra/es-CU.mjs": [
		71241,
		"node_modules_angular_common_locales_extra_es-CU_mjs"
	],
	"./extra/es-DO.mjs": [
		74930,
		"node_modules_angular_common_locales_extra_es-DO_mjs"
	],
	"./extra/es-EA.mjs": [
		55839,
		"node_modules_angular_common_locales_extra_es-EA_mjs"
	],
	"./extra/es-EC.mjs": [
		8149,
		"node_modules_angular_common_locales_extra_es-EC_mjs"
	],
	"./extra/es-GQ.mjs": [
		92249,
		"node_modules_angular_common_locales_extra_es-GQ_mjs"
	],
	"./extra/es-GT.mjs": [
		93748,
		"node_modules_angular_common_locales_extra_es-GT_mjs"
	],
	"./extra/es-HN.mjs": [
		17191,
		"node_modules_angular_common_locales_extra_es-HN_mjs"
	],
	"./extra/es-IC.mjs": [
		50969,
		"node_modules_angular_common_locales_extra_es-IC_mjs"
	],
	"./extra/es-MX.mjs": [
		95798,
		"node_modules_angular_common_locales_extra_es-MX_mjs"
	],
	"./extra/es-NI.mjs": [
		35614,
		"node_modules_angular_common_locales_extra_es-NI_mjs"
	],
	"./extra/es-PA.mjs": [
		22336,
		"node_modules_angular_common_locales_extra_es-PA_mjs"
	],
	"./extra/es-PE.mjs": [
		8220,
		"node_modules_angular_common_locales_extra_es-PE_mjs"
	],
	"./extra/es-PH.mjs": [
		84441,
		"node_modules_angular_common_locales_extra_es-PH_mjs"
	],
	"./extra/es-PR.mjs": [
		15307,
		"node_modules_angular_common_locales_extra_es-PR_mjs"
	],
	"./extra/es-PY.mjs": [
		5032,
		"node_modules_angular_common_locales_extra_es-PY_mjs"
	],
	"./extra/es-SV.mjs": [
		95082,
		"node_modules_angular_common_locales_extra_es-SV_mjs"
	],
	"./extra/es-US.mjs": [
		83317,
		"node_modules_angular_common_locales_extra_es-US_mjs"
	],
	"./extra/es-UY.mjs": [
		93031,
		"node_modules_angular_common_locales_extra_es-UY_mjs"
	],
	"./extra/es-VE.mjs": [
		9938,
		"node_modules_angular_common_locales_extra_es-VE_mjs"
	],
	"./extra/es.mjs": [
		82016,
		"node_modules_angular_common_locales_extra_es_mjs"
	],
	"./extra/et.mjs": [
		35511,
		"node_modules_angular_common_locales_extra_et_mjs"
	],
	"./extra/eu.mjs": [
		37230,
		"node_modules_angular_common_locales_extra_eu_mjs"
	],
	"./extra/ewo.mjs": [
		8975,
		"node_modules_angular_common_locales_extra_ewo_mjs"
	],
	"./extra/fa-AF.mjs": [
		39653,
		"node_modules_angular_common_locales_extra_fa-AF_mjs"
	],
	"./extra/fa.mjs": [
		19139,
		"node_modules_angular_common_locales_extra_fa_mjs"
	],
	"./extra/ff-Adlm-BF.mjs": [
		1844,
		"node_modules_angular_common_locales_extra_ff-Adlm-BF_mjs"
	],
	"./extra/ff-Adlm-CM.mjs": [
		20799,
		"node_modules_angular_common_locales_extra_ff-Adlm-CM_mjs"
	],
	"./extra/ff-Adlm-GH.mjs": [
		1109,
		"node_modules_angular_common_locales_extra_ff-Adlm-GH_mjs"
	],
	"./extra/ff-Adlm-GM.mjs": [
		64360,
		"node_modules_angular_common_locales_extra_ff-Adlm-GM_mjs"
	],
	"./extra/ff-Adlm-GW.mjs": [
		57682,
		"node_modules_angular_common_locales_extra_ff-Adlm-GW_mjs"
	],
	"./extra/ff-Adlm-LR.mjs": [
		10762,
		"node_modules_angular_common_locales_extra_ff-Adlm-LR_mjs"
	],
	"./extra/ff-Adlm-MR.mjs": [
		32525,
		"node_modules_angular_common_locales_extra_ff-Adlm-MR_mjs"
	],
	"./extra/ff-Adlm-NE.mjs": [
		87939,
		"node_modules_angular_common_locales_extra_ff-Adlm-NE_mjs"
	],
	"./extra/ff-Adlm-NG.mjs": [
		42409,
		"node_modules_angular_common_locales_extra_ff-Adlm-NG_mjs"
	],
	"./extra/ff-Adlm-SL.mjs": [
		35213,
		"node_modules_angular_common_locales_extra_ff-Adlm-SL_mjs"
	],
	"./extra/ff-Adlm-SN.mjs": [
		72375,
		"node_modules_angular_common_locales_extra_ff-Adlm-SN_mjs"
	],
	"./extra/ff-Adlm.mjs": [
		31019,
		"node_modules_angular_common_locales_extra_ff-Adlm_mjs"
	],
	"./extra/ff-CM.mjs": [
		99661,
		"node_modules_angular_common_locales_extra_ff-CM_mjs"
	],
	"./extra/ff-GN.mjs": [
		65922,
		"node_modules_angular_common_locales_extra_ff-GN_mjs"
	],
	"./extra/ff-Latn-BF.mjs": [
		72331,
		"node_modules_angular_common_locales_extra_ff-Latn-BF_mjs"
	],
	"./extra/ff-Latn-CM.mjs": [
		84832,
		"node_modules_angular_common_locales_extra_ff-Latn-CM_mjs"
	],
	"./extra/ff-Latn-GH.mjs": [
		32754,
		"node_modules_angular_common_locales_extra_ff-Latn-GH_mjs"
	],
	"./extra/ff-Latn-GM.mjs": [
		19575,
		"node_modules_angular_common_locales_extra_ff-Latn-GM_mjs"
	],
	"./extra/ff-Latn-GN.mjs": [
		35292,
		"node_modules_angular_common_locales_extra_ff-Latn-GN_mjs"
	],
	"./extra/ff-Latn-GW.mjs": [
		99477,
		"node_modules_angular_common_locales_extra_ff-Latn-GW_mjs"
	],
	"./extra/ff-Latn-LR.mjs": [
		22137,
		"node_modules_angular_common_locales_extra_ff-Latn-LR_mjs"
	],
	"./extra/ff-Latn-MR.mjs": [
		13494,
		"node_modules_angular_common_locales_extra_ff-Latn-MR_mjs"
	],
	"./extra/ff-Latn-NE.mjs": [
		54092,
		"node_modules_angular_common_locales_extra_ff-Latn-NE_mjs"
	],
	"./extra/ff-Latn-NG.mjs": [
		7390,
		"node_modules_angular_common_locales_extra_ff-Latn-NG_mjs"
	],
	"./extra/ff-Latn-SL.mjs": [
		40954,
		"node_modules_angular_common_locales_extra_ff-Latn-SL_mjs"
	],
	"./extra/ff-Latn.mjs": [
		85314,
		"node_modules_angular_common_locales_extra_ff-Latn_mjs"
	],
	"./extra/ff-MR.mjs": [
		89112,
		"node_modules_angular_common_locales_extra_ff-MR_mjs"
	],
	"./extra/ff.mjs": [
		84132,
		"node_modules_angular_common_locales_extra_ff_mjs"
	],
	"./extra/fi.mjs": [
		7499,
		"node_modules_angular_common_locales_extra_fi_mjs"
	],
	"./extra/fil.mjs": [
		7981,
		"node_modules_angular_common_locales_extra_fil_mjs"
	],
	"./extra/fo-DK.mjs": [
		86621,
		"node_modules_angular_common_locales_extra_fo-DK_mjs"
	],
	"./extra/fo.mjs": [
		76061,
		"node_modules_angular_common_locales_extra_fo_mjs"
	],
	"./extra/fr-BE.mjs": [
		79278,
		"node_modules_angular_common_locales_extra_fr-BE_mjs"
	],
	"./extra/fr-BF.mjs": [
		49165,
		"node_modules_angular_common_locales_extra_fr-BF_mjs"
	],
	"./extra/fr-BI.mjs": [
		57002,
		"node_modules_angular_common_locales_extra_fr-BI_mjs"
	],
	"./extra/fr-BJ.mjs": [
		51417,
		"node_modules_angular_common_locales_extra_fr-BJ_mjs"
	],
	"./extra/fr-BL.mjs": [
		44879,
		"node_modules_angular_common_locales_extra_fr-BL_mjs"
	],
	"./extra/fr-CA.mjs": [
		98397,
		"node_modules_angular_common_locales_extra_fr-CA_mjs"
	],
	"./extra/fr-CD.mjs": [
		78640,
		"node_modules_angular_common_locales_extra_fr-CD_mjs"
	],
	"./extra/fr-CF.mjs": [
		47490,
		"node_modules_angular_common_locales_extra_fr-CF_mjs"
	],
	"./extra/fr-CG.mjs": [
		29835,
		"node_modules_angular_common_locales_extra_fr-CG_mjs"
	],
	"./extra/fr-CH.mjs": [
		6468,
		"node_modules_angular_common_locales_extra_fr-CH_mjs"
	],
	"./extra/fr-CI.mjs": [
		56309,
		"node_modules_angular_common_locales_extra_fr-CI_mjs"
	],
	"./extra/fr-CM.mjs": [
		30569,
		"node_modules_angular_common_locales_extra_fr-CM_mjs"
	],
	"./extra/fr-DJ.mjs": [
		13695,
		"node_modules_angular_common_locales_extra_fr-DJ_mjs"
	],
	"./extra/fr-DZ.mjs": [
		2127,
		"node_modules_angular_common_locales_extra_fr-DZ_mjs"
	],
	"./extra/fr-GA.mjs": [
		9345,
		"node_modules_angular_common_locales_extra_fr-GA_mjs"
	],
	"./extra/fr-GF.mjs": [
		69230,
		"node_modules_angular_common_locales_extra_fr-GF_mjs"
	],
	"./extra/fr-GN.mjs": [
		57190,
		"node_modules_angular_common_locales_extra_fr-GN_mjs"
	],
	"./extra/fr-GP.mjs": [
		88976,
		"node_modules_angular_common_locales_extra_fr-GP_mjs"
	],
	"./extra/fr-GQ.mjs": [
		51537,
		"node_modules_angular_common_locales_extra_fr-GQ_mjs"
	],
	"./extra/fr-HT.mjs": [
		80173,
		"node_modules_angular_common_locales_extra_fr-HT_mjs"
	],
	"./extra/fr-KM.mjs": [
		35905,
		"node_modules_angular_common_locales_extra_fr-KM_mjs"
	],
	"./extra/fr-LU.mjs": [
		85608,
		"node_modules_angular_common_locales_extra_fr-LU_mjs"
	],
	"./extra/fr-MA.mjs": [
		4031,
		"node_modules_angular_common_locales_extra_fr-MA_mjs"
	],
	"./extra/fr-MC.mjs": [
		39989,
		"node_modules_angular_common_locales_extra_fr-MC_mjs"
	],
	"./extra/fr-MF.mjs": [
		62120,
		"node_modules_angular_common_locales_extra_fr-MF_mjs"
	],
	"./extra/fr-MG.mjs": [
		49833,
		"node_modules_angular_common_locales_extra_fr-MG_mjs"
	],
	"./extra/fr-ML.mjs": [
		10434,
		"node_modules_angular_common_locales_extra_fr-ML_mjs"
	],
	"./extra/fr-MQ.mjs": [
		92463,
		"node_modules_angular_common_locales_extra_fr-MQ_mjs"
	],
	"./extra/fr-MR.mjs": [
		72756,
		"node_modules_angular_common_locales_extra_fr-MR_mjs"
	],
	"./extra/fr-MU.mjs": [
		39827,
		"node_modules_angular_common_locales_extra_fr-MU_mjs"
	],
	"./extra/fr-NC.mjs": [
		89356,
		"node_modules_angular_common_locales_extra_fr-NC_mjs"
	],
	"./extra/fr-NE.mjs": [
		99490,
		"node_modules_angular_common_locales_extra_fr-NE_mjs"
	],
	"./extra/fr-PF.mjs": [
		25551,
		"node_modules_angular_common_locales_extra_fr-PF_mjs"
	],
	"./extra/fr-PM.mjs": [
		25244,
		"node_modules_angular_common_locales_extra_fr-PM_mjs"
	],
	"./extra/fr-RE.mjs": [
		7006,
		"node_modules_angular_common_locales_extra_fr-RE_mjs"
	],
	"./extra/fr-RW.mjs": [
		70908,
		"node_modules_angular_common_locales_extra_fr-RW_mjs"
	],
	"./extra/fr-SC.mjs": [
		90935,
		"node_modules_angular_common_locales_extra_fr-SC_mjs"
	],
	"./extra/fr-SN.mjs": [
		3690,
		"node_modules_angular_common_locales_extra_fr-SN_mjs"
	],
	"./extra/fr-SY.mjs": [
		73717,
		"node_modules_angular_common_locales_extra_fr-SY_mjs"
	],
	"./extra/fr-TD.mjs": [
		82433,
		"node_modules_angular_common_locales_extra_fr-TD_mjs"
	],
	"./extra/fr-TG.mjs": [
		97746,
		"node_modules_angular_common_locales_extra_fr-TG_mjs"
	],
	"./extra/fr-TN.mjs": [
		52403,
		"node_modules_angular_common_locales_extra_fr-TN_mjs"
	],
	"./extra/fr-VU.mjs": [
		50234,
		"node_modules_angular_common_locales_extra_fr-VU_mjs"
	],
	"./extra/fr-WF.mjs": [
		48766,
		"node_modules_angular_common_locales_extra_fr-WF_mjs"
	],
	"./extra/fr-YT.mjs": [
		50286,
		"node_modules_angular_common_locales_extra_fr-YT_mjs"
	],
	"./extra/fr.mjs": [
		99704,
		"node_modules_angular_common_locales_extra_fr_mjs"
	],
	"./extra/fur.mjs": [
		70463,
		"node_modules_angular_common_locales_extra_fur_mjs"
	],
	"./extra/fy.mjs": [
		33371,
		"node_modules_angular_common_locales_extra_fy_mjs"
	],
	"./extra/ga-GB.mjs": [
		57138,
		"node_modules_angular_common_locales_extra_ga-GB_mjs"
	],
	"./extra/ga.mjs": [
		45816,
		"node_modules_angular_common_locales_extra_ga_mjs"
	],
	"./extra/gd.mjs": [
		3845,
		"node_modules_angular_common_locales_extra_gd_mjs"
	],
	"./extra/gl.mjs": [
		39181,
		"node_modules_angular_common_locales_extra_gl_mjs"
	],
	"./extra/gsw-FR.mjs": [
		40538,
		"node_modules_angular_common_locales_extra_gsw-FR_mjs"
	],
	"./extra/gsw-LI.mjs": [
		75519,
		"node_modules_angular_common_locales_extra_gsw-LI_mjs"
	],
	"./extra/gsw.mjs": [
		6810,
		"node_modules_angular_common_locales_extra_gsw_mjs"
	],
	"./extra/gu.mjs": [
		57924,
		"node_modules_angular_common_locales_extra_gu_mjs"
	],
	"./extra/guz.mjs": [
		50274,
		"node_modules_angular_common_locales_extra_guz_mjs"
	],
	"./extra/gv.mjs": [
		3935,
		"node_modules_angular_common_locales_extra_gv_mjs"
	],
	"./extra/ha-GH.mjs": [
		33091,
		"node_modules_angular_common_locales_extra_ha-GH_mjs"
	],
	"./extra/ha-NE.mjs": [
		51049,
		"node_modules_angular_common_locales_extra_ha-NE_mjs"
	],
	"./extra/ha.mjs": [
		67801,
		"node_modules_angular_common_locales_extra_ha_mjs"
	],
	"./extra/haw.mjs": [
		71156,
		"node_modules_angular_common_locales_extra_haw_mjs"
	],
	"./extra/he.mjs": [
		74309,
		"node_modules_angular_common_locales_extra_he_mjs"
	],
	"./extra/hi-Latn.mjs": [
		52737,
		"node_modules_angular_common_locales_extra_hi-Latn_mjs"
	],
	"./extra/hi.mjs": [
		89697,
		"node_modules_angular_common_locales_extra_hi_mjs"
	],
	"./extra/hr-BA.mjs": [
		26084,
		"node_modules_angular_common_locales_extra_hr-BA_mjs"
	],
	"./extra/hr.mjs": [
		37562,
		"node_modules_angular_common_locales_extra_hr_mjs"
	],
	"./extra/hsb.mjs": [
		44219,
		"node_modules_angular_common_locales_extra_hsb_mjs"
	],
	"./extra/hu.mjs": [
		76725,
		"node_modules_angular_common_locales_extra_hu_mjs"
	],
	"./extra/hy.mjs": [
		35441,
		"node_modules_angular_common_locales_extra_hy_mjs"
	],
	"./extra/ia.mjs": [
		41774,
		"node_modules_angular_common_locales_extra_ia_mjs"
	],
	"./extra/id.mjs": [
		13179,
		"node_modules_angular_common_locales_extra_id_mjs"
	],
	"./extra/ig.mjs": [
		51808,
		"node_modules_angular_common_locales_extra_ig_mjs"
	],
	"./extra/ii.mjs": [
		32070,
		"node_modules_angular_common_locales_extra_ii_mjs"
	],
	"./extra/is.mjs": [
		62188,
		"node_modules_angular_common_locales_extra_is_mjs"
	],
	"./extra/it-CH.mjs": [
		5905,
		"node_modules_angular_common_locales_extra_it-CH_mjs"
	],
	"./extra/it-SM.mjs": [
		76412,
		"node_modules_angular_common_locales_extra_it-SM_mjs"
	],
	"./extra/it-VA.mjs": [
		44871,
		"node_modules_angular_common_locales_extra_it-VA_mjs"
	],
	"./extra/it.mjs": [
		44779,
		"node_modules_angular_common_locales_extra_it_mjs"
	],
	"./extra/ja.mjs": [
		65295,
		"node_modules_angular_common_locales_extra_ja_mjs"
	],
	"./extra/jgo.mjs": [
		97004,
		"node_modules_angular_common_locales_extra_jgo_mjs"
	],
	"./extra/jmc.mjs": [
		74682,
		"node_modules_angular_common_locales_extra_jmc_mjs"
	],
	"./extra/jv.mjs": [
		34952,
		"node_modules_angular_common_locales_extra_jv_mjs"
	],
	"./extra/ka.mjs": [
		32356,
		"node_modules_angular_common_locales_extra_ka_mjs"
	],
	"./extra/kab.mjs": [
		73450,
		"node_modules_angular_common_locales_extra_kab_mjs"
	],
	"./extra/kam.mjs": [
		65613,
		"node_modules_angular_common_locales_extra_kam_mjs"
	],
	"./extra/kde.mjs": [
		47622,
		"node_modules_angular_common_locales_extra_kde_mjs"
	],
	"./extra/kea.mjs": [
		98517,
		"node_modules_angular_common_locales_extra_kea_mjs"
	],
	"./extra/kgp.mjs": [
		12978,
		"node_modules_angular_common_locales_extra_kgp_mjs"
	],
	"./extra/khq.mjs": [
		95670,
		"node_modules_angular_common_locales_extra_khq_mjs"
	],
	"./extra/ki.mjs": [
		70572,
		"node_modules_angular_common_locales_extra_ki_mjs"
	],
	"./extra/kk.mjs": [
		9022,
		"node_modules_angular_common_locales_extra_kk_mjs"
	],
	"./extra/kkj.mjs": [
		47268,
		"node_modules_angular_common_locales_extra_kkj_mjs"
	],
	"./extra/kl.mjs": [
		47857,
		"node_modules_angular_common_locales_extra_kl_mjs"
	],
	"./extra/kln.mjs": [
		8181,
		"node_modules_angular_common_locales_extra_kln_mjs"
	],
	"./extra/km.mjs": [
		10416,
		"node_modules_angular_common_locales_extra_km_mjs"
	],
	"./extra/kn.mjs": [
		26987,
		"node_modules_angular_common_locales_extra_kn_mjs"
	],
	"./extra/ko-KP.mjs": [
		44486,
		"node_modules_angular_common_locales_extra_ko-KP_mjs"
	],
	"./extra/ko.mjs": [
		30850,
		"node_modules_angular_common_locales_extra_ko_mjs"
	],
	"./extra/kok.mjs": [
		53553,
		"node_modules_angular_common_locales_extra_kok_mjs"
	],
	"./extra/ks-Arab.mjs": [
		30511,
		"node_modules_angular_common_locales_extra_ks-Arab_mjs"
	],
	"./extra/ks-Deva.mjs": [
		32521,
		"node_modules_angular_common_locales_extra_ks-Deva_mjs"
	],
	"./extra/ks.mjs": [
		67302,
		"node_modules_angular_common_locales_extra_ks_mjs"
	],
	"./extra/ksb.mjs": [
		83140,
		"node_modules_angular_common_locales_extra_ksb_mjs"
	],
	"./extra/ksf.mjs": [
		84904,
		"node_modules_angular_common_locales_extra_ksf_mjs"
	],
	"./extra/ksh.mjs": [
		6782,
		"node_modules_angular_common_locales_extra_ksh_mjs"
	],
	"./extra/ku.mjs": [
		89624,
		"node_modules_angular_common_locales_extra_ku_mjs"
	],
	"./extra/kw.mjs": [
		25002,
		"node_modules_angular_common_locales_extra_kw_mjs"
	],
	"./extra/ky.mjs": [
		12572,
		"node_modules_angular_common_locales_extra_ky_mjs"
	],
	"./extra/lag.mjs": [
		52704,
		"node_modules_angular_common_locales_extra_lag_mjs"
	],
	"./extra/lb.mjs": [
		50550,
		"node_modules_angular_common_locales_extra_lb_mjs"
	],
	"./extra/lg.mjs": [
		39875,
		"node_modules_angular_common_locales_extra_lg_mjs"
	],
	"./extra/lkt.mjs": [
		15569,
		"node_modules_angular_common_locales_extra_lkt_mjs"
	],
	"./extra/ln-AO.mjs": [
		69935,
		"node_modules_angular_common_locales_extra_ln-AO_mjs"
	],
	"./extra/ln-CF.mjs": [
		96,
		"node_modules_angular_common_locales_extra_ln-CF_mjs"
	],
	"./extra/ln-CG.mjs": [
		95425,
		"node_modules_angular_common_locales_extra_ln-CG_mjs"
	],
	"./extra/ln.mjs": [
		76514,
		"node_modules_angular_common_locales_extra_ln_mjs"
	],
	"./extra/lo.mjs": [
		75211,
		"node_modules_angular_common_locales_extra_lo_mjs"
	],
	"./extra/lrc-IQ.mjs": [
		59392,
		"node_modules_angular_common_locales_extra_lrc-IQ_mjs"
	],
	"./extra/lrc.mjs": [
		96309,
		"node_modules_angular_common_locales_extra_lrc_mjs"
	],
	"./extra/lt.mjs": [
		43736,
		"node_modules_angular_common_locales_extra_lt_mjs"
	],
	"./extra/lu.mjs": [
		69081,
		"node_modules_angular_common_locales_extra_lu_mjs"
	],
	"./extra/luo.mjs": [
		96812,
		"node_modules_angular_common_locales_extra_luo_mjs"
	],
	"./extra/luy.mjs": [
		19922,
		"node_modules_angular_common_locales_extra_luy_mjs"
	],
	"./extra/lv.mjs": [
		38602,
		"node_modules_angular_common_locales_extra_lv_mjs"
	],
	"./extra/mai.mjs": [
		84115,
		"node_modules_angular_common_locales_extra_mai_mjs"
	],
	"./extra/mas-TZ.mjs": [
		92056,
		"node_modules_angular_common_locales_extra_mas-TZ_mjs"
	],
	"./extra/mas.mjs": [
		88081,
		"node_modules_angular_common_locales_extra_mas_mjs"
	],
	"./extra/mer.mjs": [
		47028,
		"node_modules_angular_common_locales_extra_mer_mjs"
	],
	"./extra/mfe.mjs": [
		73986,
		"node_modules_angular_common_locales_extra_mfe_mjs"
	],
	"./extra/mg.mjs": [
		35924,
		"node_modules_angular_common_locales_extra_mg_mjs"
	],
	"./extra/mgh.mjs": [
		20848,
		"node_modules_angular_common_locales_extra_mgh_mjs"
	],
	"./extra/mgo.mjs": [
		81991,
		"node_modules_angular_common_locales_extra_mgo_mjs"
	],
	"./extra/mi.mjs": [
		52786,
		"node_modules_angular_common_locales_extra_mi_mjs"
	],
	"./extra/mk.mjs": [
		64,
		"node_modules_angular_common_locales_extra_mk_mjs"
	],
	"./extra/ml.mjs": [
		39607,
		"node_modules_angular_common_locales_extra_ml_mjs"
	],
	"./extra/mn.mjs": [
		82298,
		"node_modules_angular_common_locales_extra_mn_mjs"
	],
	"./extra/mni-Beng.mjs": [
		41665,
		"node_modules_angular_common_locales_extra_mni-Beng_mjs"
	],
	"./extra/mni.mjs": [
		17214,
		"node_modules_angular_common_locales_extra_mni_mjs"
	],
	"./extra/mr.mjs": [
		13001,
		"node_modules_angular_common_locales_extra_mr_mjs"
	],
	"./extra/ms-BN.mjs": [
		62709,
		"node_modules_angular_common_locales_extra_ms-BN_mjs"
	],
	"./extra/ms-ID.mjs": [
		26814,
		"node_modules_angular_common_locales_extra_ms-ID_mjs"
	],
	"./extra/ms-SG.mjs": [
		71243,
		"node_modules_angular_common_locales_extra_ms-SG_mjs"
	],
	"./extra/ms.mjs": [
		25288,
		"node_modules_angular_common_locales_extra_ms_mjs"
	],
	"./extra/mt.mjs": [
		67199,
		"node_modules_angular_common_locales_extra_mt_mjs"
	],
	"./extra/mua.mjs": [
		33359,
		"node_modules_angular_common_locales_extra_mua_mjs"
	],
	"./extra/my.mjs": [
		73602,
		"node_modules_angular_common_locales_extra_my_mjs"
	],
	"./extra/mzn.mjs": [
		80629,
		"node_modules_angular_common_locales_extra_mzn_mjs"
	],
	"./extra/naq.mjs": [
		31752,
		"node_modules_angular_common_locales_extra_naq_mjs"
	],
	"./extra/nb-SJ.mjs": [
		11310,
		"node_modules_angular_common_locales_extra_nb-SJ_mjs"
	],
	"./extra/nb.mjs": [
		92144,
		"node_modules_angular_common_locales_extra_nb_mjs"
	],
	"./extra/nd.mjs": [
		78846,
		"node_modules_angular_common_locales_extra_nd_mjs"
	],
	"./extra/nds-NL.mjs": [
		16356,
		"node_modules_angular_common_locales_extra_nds-NL_mjs"
	],
	"./extra/nds.mjs": [
		95309,
		"node_modules_angular_common_locales_extra_nds_mjs"
	],
	"./extra/ne-IN.mjs": [
		33137,
		"node_modules_angular_common_locales_extra_ne-IN_mjs"
	],
	"./extra/ne.mjs": [
		36935,
		"node_modules_angular_common_locales_extra_ne_mjs"
	],
	"./extra/nl-AW.mjs": [
		72403,
		"node_modules_angular_common_locales_extra_nl-AW_mjs"
	],
	"./extra/nl-BE.mjs": [
		77148,
		"node_modules_angular_common_locales_extra_nl-BE_mjs"
	],
	"./extra/nl-BQ.mjs": [
		74992,
		"node_modules_angular_common_locales_extra_nl-BQ_mjs"
	],
	"./extra/nl-CW.mjs": [
		6061,
		"node_modules_angular_common_locales_extra_nl-CW_mjs"
	],
	"./extra/nl-SR.mjs": [
		33296,
		"node_modules_angular_common_locales_extra_nl-SR_mjs"
	],
	"./extra/nl-SX.mjs": [
		91642,
		"node_modules_angular_common_locales_extra_nl-SX_mjs"
	],
	"./extra/nl.mjs": [
		438,
		"node_modules_angular_common_locales_extra_nl_mjs"
	],
	"./extra/nmg.mjs": [
		53626,
		"node_modules_angular_common_locales_extra_nmg_mjs"
	],
	"./extra/nn.mjs": [
		48260,
		"node_modules_angular_common_locales_extra_nn_mjs"
	],
	"./extra/nnh.mjs": [
		67872,
		"node_modules_angular_common_locales_extra_nnh_mjs"
	],
	"./extra/no.mjs": [
		18837,
		"node_modules_angular_common_locales_extra_no_mjs"
	],
	"./extra/nus.mjs": [
		82286,
		"node_modules_angular_common_locales_extra_nus_mjs"
	],
	"./extra/nyn.mjs": [
		29663,
		"node_modules_angular_common_locales_extra_nyn_mjs"
	],
	"./extra/om-KE.mjs": [
		71405,
		"node_modules_angular_common_locales_extra_om-KE_mjs"
	],
	"./extra/om.mjs": [
		91252,
		"node_modules_angular_common_locales_extra_om_mjs"
	],
	"./extra/or.mjs": [
		27627,
		"node_modules_angular_common_locales_extra_or_mjs"
	],
	"./extra/os-RU.mjs": [
		94608,
		"node_modules_angular_common_locales_extra_os-RU_mjs"
	],
	"./extra/os.mjs": [
		28930,
		"node_modules_angular_common_locales_extra_os_mjs"
	],
	"./extra/pa-Arab.mjs": [
		50330,
		"node_modules_angular_common_locales_extra_pa-Arab_mjs"
	],
	"./extra/pa-Guru.mjs": [
		22933,
		"node_modules_angular_common_locales_extra_pa-Guru_mjs"
	],
	"./extra/pa.mjs": [
		6337,
		"node_modules_angular_common_locales_extra_pa_mjs"
	],
	"./extra/pcm.mjs": [
		34124,
		"node_modules_angular_common_locales_extra_pcm_mjs"
	],
	"./extra/pl.mjs": [
		77492,
		"node_modules_angular_common_locales_extra_pl_mjs"
	],
	"./extra/ps-PK.mjs": [
		175,
		"node_modules_angular_common_locales_extra_ps-PK_mjs"
	],
	"./extra/ps.mjs": [
		13867,
		"node_modules_angular_common_locales_extra_ps_mjs"
	],
	"./extra/pt-AO.mjs": [
		12345,
		"node_modules_angular_common_locales_extra_pt-AO_mjs"
	],
	"./extra/pt-CH.mjs": [
		36664,
		"node_modules_angular_common_locales_extra_pt-CH_mjs"
	],
	"./extra/pt-CV.mjs": [
		87262,
		"node_modules_angular_common_locales_extra_pt-CV_mjs"
	],
	"./extra/pt-GQ.mjs": [
		41101,
		"node_modules_angular_common_locales_extra_pt-GQ_mjs"
	],
	"./extra/pt-GW.mjs": [
		6971,
		"node_modules_angular_common_locales_extra_pt-GW_mjs"
	],
	"./extra/pt-LU.mjs": [
		70812,
		"node_modules_angular_common_locales_extra_pt-LU_mjs"
	],
	"./extra/pt-MO.mjs": [
		47909,
		"node_modules_angular_common_locales_extra_pt-MO_mjs"
	],
	"./extra/pt-MZ.mjs": [
		2248,
		"node_modules_angular_common_locales_extra_pt-MZ_mjs"
	],
	"./extra/pt-PT.mjs": [
		10513,
		"node_modules_angular_common_locales_extra_pt-PT_mjs"
	],
	"./extra/pt-ST.mjs": [
		22812,
		"node_modules_angular_common_locales_extra_pt-ST_mjs"
	],
	"./extra/pt-TL.mjs": [
		97453,
		"node_modules_angular_common_locales_extra_pt-TL_mjs"
	],
	"./extra/pt.mjs": [
		79692,
		"node_modules_angular_common_locales_extra_pt_mjs"
	],
	"./extra/qu-BO.mjs": [
		57042,
		"node_modules_angular_common_locales_extra_qu-BO_mjs"
	],
	"./extra/qu-EC.mjs": [
		18351,
		"node_modules_angular_common_locales_extra_qu-EC_mjs"
	],
	"./extra/qu.mjs": [
		24842,
		"node_modules_angular_common_locales_extra_qu_mjs"
	],
	"./extra/rm.mjs": [
		68723,
		"node_modules_angular_common_locales_extra_rm_mjs"
	],
	"./extra/rn.mjs": [
		74808,
		"node_modules_angular_common_locales_extra_rn_mjs"
	],
	"./extra/ro-MD.mjs": [
		88237,
		"node_modules_angular_common_locales_extra_ro-MD_mjs"
	],
	"./extra/ro.mjs": [
		153,
		"node_modules_angular_common_locales_extra_ro_mjs"
	],
	"./extra/rof.mjs": [
		91573,
		"node_modules_angular_common_locales_extra_rof_mjs"
	],
	"./extra/ru-BY.mjs": [
		81963,
		"node_modules_angular_common_locales_extra_ru-BY_mjs"
	],
	"./extra/ru-KG.mjs": [
		39646,
		"node_modules_angular_common_locales_extra_ru-KG_mjs"
	],
	"./extra/ru-KZ.mjs": [
		25043,
		"node_modules_angular_common_locales_extra_ru-KZ_mjs"
	],
	"./extra/ru-MD.mjs": [
		72299,
		"node_modules_angular_common_locales_extra_ru-MD_mjs"
	],
	"./extra/ru-UA.mjs": [
		3590,
		"node_modules_angular_common_locales_extra_ru-UA_mjs"
	],
	"./extra/ru.mjs": [
		53400,
		"node_modules_angular_common_locales_extra_ru_mjs"
	],
	"./extra/rw.mjs": [
		75569,
		"node_modules_angular_common_locales_extra_rw_mjs"
	],
	"./extra/rwk.mjs": [
		98568,
		"node_modules_angular_common_locales_extra_rwk_mjs"
	],
	"./extra/sa.mjs": [
		96012,
		"node_modules_angular_common_locales_extra_sa_mjs"
	],
	"./extra/sah.mjs": [
		67592,
		"node_modules_angular_common_locales_extra_sah_mjs"
	],
	"./extra/saq.mjs": [
		12289,
		"node_modules_angular_common_locales_extra_saq_mjs"
	],
	"./extra/sat-Olck.mjs": [
		86710,
		"node_modules_angular_common_locales_extra_sat-Olck_mjs"
	],
	"./extra/sat.mjs": [
		88572,
		"node_modules_angular_common_locales_extra_sat_mjs"
	],
	"./extra/sbp.mjs": [
		10173,
		"node_modules_angular_common_locales_extra_sbp_mjs"
	],
	"./extra/sc.mjs": [
		42705,
		"node_modules_angular_common_locales_extra_sc_mjs"
	],
	"./extra/sd-Arab.mjs": [
		52554,
		"node_modules_angular_common_locales_extra_sd-Arab_mjs"
	],
	"./extra/sd-Deva.mjs": [
		40968,
		"node_modules_angular_common_locales_extra_sd-Deva_mjs"
	],
	"./extra/sd.mjs": [
		23153,
		"node_modules_angular_common_locales_extra_sd_mjs"
	],
	"./extra/se-FI.mjs": [
		95558,
		"node_modules_angular_common_locales_extra_se-FI_mjs"
	],
	"./extra/se-SE.mjs": [
		44313,
		"node_modules_angular_common_locales_extra_se-SE_mjs"
	],
	"./extra/se.mjs": [
		78384,
		"node_modules_angular_common_locales_extra_se_mjs"
	],
	"./extra/seh.mjs": [
		10932,
		"node_modules_angular_common_locales_extra_seh_mjs"
	],
	"./extra/ses.mjs": [
		58695,
		"node_modules_angular_common_locales_extra_ses_mjs"
	],
	"./extra/sg.mjs": [
		89794,
		"node_modules_angular_common_locales_extra_sg_mjs"
	],
	"./extra/shi-Latn.mjs": [
		99460,
		"node_modules_angular_common_locales_extra_shi-Latn_mjs"
	],
	"./extra/shi-Tfng.mjs": [
		22864,
		"node_modules_angular_common_locales_extra_shi-Tfng_mjs"
	],
	"./extra/shi.mjs": [
		49638,
		"node_modules_angular_common_locales_extra_shi_mjs"
	],
	"./extra/si.mjs": [
		34500,
		"node_modules_angular_common_locales_extra_si_mjs"
	],
	"./extra/sk.mjs": [
		86678,
		"node_modules_angular_common_locales_extra_sk_mjs"
	],
	"./extra/sl.mjs": [
		56041,
		"node_modules_angular_common_locales_extra_sl_mjs"
	],
	"./extra/smn.mjs": [
		2882,
		"node_modules_angular_common_locales_extra_smn_mjs"
	],
	"./extra/sn.mjs": [
		1571,
		"node_modules_angular_common_locales_extra_sn_mjs"
	],
	"./extra/so-DJ.mjs": [
		95681,
		"node_modules_angular_common_locales_extra_so-DJ_mjs"
	],
	"./extra/so-ET.mjs": [
		99384,
		"node_modules_angular_common_locales_extra_so-ET_mjs"
	],
	"./extra/so-KE.mjs": [
		74923,
		"node_modules_angular_common_locales_extra_so-KE_mjs"
	],
	"./extra/so.mjs": [
		36730,
		"node_modules_angular_common_locales_extra_so_mjs"
	],
	"./extra/sq-MK.mjs": [
		55561,
		"node_modules_angular_common_locales_extra_sq-MK_mjs"
	],
	"./extra/sq-XK.mjs": [
		58222,
		"node_modules_angular_common_locales_extra_sq-XK_mjs"
	],
	"./extra/sq.mjs": [
		87868,
		"node_modules_angular_common_locales_extra_sq_mjs"
	],
	"./extra/sr-Cyrl-BA.mjs": [
		62888,
		"node_modules_angular_common_locales_extra_sr-Cyrl-BA_mjs"
	],
	"./extra/sr-Cyrl-ME.mjs": [
		31061,
		"node_modules_angular_common_locales_extra_sr-Cyrl-ME_mjs"
	],
	"./extra/sr-Cyrl-XK.mjs": [
		3840,
		"node_modules_angular_common_locales_extra_sr-Cyrl-XK_mjs"
	],
	"./extra/sr-Cyrl.mjs": [
		82686,
		"node_modules_angular_common_locales_extra_sr-Cyrl_mjs"
	],
	"./extra/sr-Latn-BA.mjs": [
		89495,
		"node_modules_angular_common_locales_extra_sr-Latn-BA_mjs"
	],
	"./extra/sr-Latn-ME.mjs": [
		51510,
		"node_modules_angular_common_locales_extra_sr-Latn-ME_mjs"
	],
	"./extra/sr-Latn-XK.mjs": [
		87131,
		"node_modules_angular_common_locales_extra_sr-Latn-XK_mjs"
	],
	"./extra/sr-Latn.mjs": [
		38463,
		"node_modules_angular_common_locales_extra_sr-Latn_mjs"
	],
	"./extra/sr.mjs": [
		52919,
		"node_modules_angular_common_locales_extra_sr_mjs"
	],
	"./extra/su-Latn.mjs": [
		75654,
		"node_modules_angular_common_locales_extra_su-Latn_mjs"
	],
	"./extra/su.mjs": [
		85632,
		"node_modules_angular_common_locales_extra_su_mjs"
	],
	"./extra/sv-AX.mjs": [
		51603,
		"node_modules_angular_common_locales_extra_sv-AX_mjs"
	],
	"./extra/sv-FI.mjs": [
		25471,
		"node_modules_angular_common_locales_extra_sv-FI_mjs"
	],
	"./extra/sv.mjs": [
		47003,
		"node_modules_angular_common_locales_extra_sv_mjs"
	],
	"./extra/sw-CD.mjs": [
		48258,
		"node_modules_angular_common_locales_extra_sw-CD_mjs"
	],
	"./extra/sw-KE.mjs": [
		32563,
		"node_modules_angular_common_locales_extra_sw-KE_mjs"
	],
	"./extra/sw-UG.mjs": [
		65003,
		"node_modules_angular_common_locales_extra_sw-UG_mjs"
	],
	"./extra/sw.mjs": [
		61650,
		"node_modules_angular_common_locales_extra_sw_mjs"
	],
	"./extra/ta-LK.mjs": [
		58501,
		"node_modules_angular_common_locales_extra_ta-LK_mjs"
	],
	"./extra/ta-MY.mjs": [
		66452,
		"node_modules_angular_common_locales_extra_ta-MY_mjs"
	],
	"./extra/ta-SG.mjs": [
		53140,
		"node_modules_angular_common_locales_extra_ta-SG_mjs"
	],
	"./extra/ta.mjs": [
		95389,
		"node_modules_angular_common_locales_extra_ta_mjs"
	],
	"./extra/te.mjs": [
		95665,
		"node_modules_angular_common_locales_extra_te_mjs"
	],
	"./extra/teo-KE.mjs": [
		15933,
		"node_modules_angular_common_locales_extra_teo-KE_mjs"
	],
	"./extra/teo.mjs": [
		7108,
		"node_modules_angular_common_locales_extra_teo_mjs"
	],
	"./extra/tg.mjs": [
		26827,
		"node_modules_angular_common_locales_extra_tg_mjs"
	],
	"./extra/th.mjs": [
		3460,
		"node_modules_angular_common_locales_extra_th_mjs"
	],
	"./extra/ti-ER.mjs": [
		1815,
		"node_modules_angular_common_locales_extra_ti-ER_mjs"
	],
	"./extra/ti.mjs": [
		53301,
		"node_modules_angular_common_locales_extra_ti_mjs"
	],
	"./extra/tk.mjs": [
		28735,
		"node_modules_angular_common_locales_extra_tk_mjs"
	],
	"./extra/to.mjs": [
		38467,
		"node_modules_angular_common_locales_extra_to_mjs"
	],
	"./extra/tr-CY.mjs": [
		44187,
		"node_modules_angular_common_locales_extra_tr-CY_mjs"
	],
	"./extra/tr.mjs": [
		29710,
		"node_modules_angular_common_locales_extra_tr_mjs"
	],
	"./extra/tt.mjs": [
		70944,
		"node_modules_angular_common_locales_extra_tt_mjs"
	],
	"./extra/twq.mjs": [
		58776,
		"node_modules_angular_common_locales_extra_twq_mjs"
	],
	"./extra/tzm.mjs": [
		61515,
		"node_modules_angular_common_locales_extra_tzm_mjs"
	],
	"./extra/ug.mjs": [
		30620,
		"node_modules_angular_common_locales_extra_ug_mjs"
	],
	"./extra/uk.mjs": [
		65144,
		"node_modules_angular_common_locales_extra_uk_mjs"
	],
	"./extra/und.mjs": [
		71307,
		"node_modules_angular_common_locales_extra_und_mjs"
	],
	"./extra/ur-IN.mjs": [
		31843,
		"node_modules_angular_common_locales_extra_ur-IN_mjs"
	],
	"./extra/ur.mjs": [
		65905,
		"node_modules_angular_common_locales_extra_ur_mjs"
	],
	"./extra/uz-Arab.mjs": [
		38786,
		"node_modules_angular_common_locales_extra_uz-Arab_mjs"
	],
	"./extra/uz-Cyrl.mjs": [
		37348,
		"node_modules_angular_common_locales_extra_uz-Cyrl_mjs"
	],
	"./extra/uz-Latn.mjs": [
		1289,
		"node_modules_angular_common_locales_extra_uz-Latn_mjs"
	],
	"./extra/uz.mjs": [
		98793,
		"node_modules_angular_common_locales_extra_uz_mjs"
	],
	"./extra/vai-Latn.mjs": [
		97422,
		"node_modules_angular_common_locales_extra_vai-Latn_mjs"
	],
	"./extra/vai-Vaii.mjs": [
		59652,
		"node_modules_angular_common_locales_extra_vai-Vaii_mjs"
	],
	"./extra/vai.mjs": [
		67208,
		"node_modules_angular_common_locales_extra_vai_mjs"
	],
	"./extra/vi.mjs": [
		31323,
		"node_modules_angular_common_locales_extra_vi_mjs"
	],
	"./extra/vun.mjs": [
		50219,
		"node_modules_angular_common_locales_extra_vun_mjs"
	],
	"./extra/wae.mjs": [
		809,
		"node_modules_angular_common_locales_extra_wae_mjs"
	],
	"./extra/wo.mjs": [
		85598,
		"node_modules_angular_common_locales_extra_wo_mjs"
	],
	"./extra/xh.mjs": [
		23888,
		"node_modules_angular_common_locales_extra_xh_mjs"
	],
	"./extra/xog.mjs": [
		89042,
		"node_modules_angular_common_locales_extra_xog_mjs"
	],
	"./extra/yav.mjs": [
		22176,
		"node_modules_angular_common_locales_extra_yav_mjs"
	],
	"./extra/yi.mjs": [
		73238,
		"node_modules_angular_common_locales_extra_yi_mjs"
	],
	"./extra/yo-BJ.mjs": [
		39913,
		"node_modules_angular_common_locales_extra_yo-BJ_mjs"
	],
	"./extra/yo.mjs": [
		1864,
		"node_modules_angular_common_locales_extra_yo_mjs"
	],
	"./extra/yrl-CO.mjs": [
		20318,
		"node_modules_angular_common_locales_extra_yrl-CO_mjs"
	],
	"./extra/yrl-VE.mjs": [
		94635,
		"node_modules_angular_common_locales_extra_yrl-VE_mjs"
	],
	"./extra/yrl.mjs": [
		82059,
		"node_modules_angular_common_locales_extra_yrl_mjs"
	],
	"./extra/yue-Hans.mjs": [
		76228,
		"node_modules_angular_common_locales_extra_yue-Hans_mjs"
	],
	"./extra/yue-Hant.mjs": [
		11235,
		"node_modules_angular_common_locales_extra_yue-Hant_mjs"
	],
	"./extra/yue.mjs": [
		61263,
		"node_modules_angular_common_locales_extra_yue_mjs"
	],
	"./extra/zgh.mjs": [
		86267,
		"node_modules_angular_common_locales_extra_zgh_mjs"
	],
	"./extra/zh-Hans-HK.mjs": [
		87695,
		"node_modules_angular_common_locales_extra_zh-Hans-HK_mjs"
	],
	"./extra/zh-Hans-MO.mjs": [
		51840,
		"node_modules_angular_common_locales_extra_zh-Hans-MO_mjs"
	],
	"./extra/zh-Hans-SG.mjs": [
		31070,
		"node_modules_angular_common_locales_extra_zh-Hans-SG_mjs"
	],
	"./extra/zh-Hans.mjs": [
		2576,
		"node_modules_angular_common_locales_extra_zh-Hans_mjs"
	],
	"./extra/zh-Hant-HK.mjs": [
		37702,
		"node_modules_angular_common_locales_extra_zh-Hant-HK_mjs"
	],
	"./extra/zh-Hant-MO.mjs": [
		37162,
		"node_modules_angular_common_locales_extra_zh-Hant-MO_mjs"
	],
	"./extra/zh-Hant.mjs": [
		45188,
		"node_modules_angular_common_locales_extra_zh-Hant_mjs"
	],
	"./extra/zh.mjs": [
		55422,
		"node_modules_angular_common_locales_extra_zh_mjs"
	],
	"./extra/zu.mjs": [
		6643,
		"node_modules_angular_common_locales_extra_zu_mjs"
	],
	"./fa-AF.mjs": [
		57626,
		"node_modules_angular_common_locales_fa-AF_mjs"
	],
	"./fa.mjs": [
		70774,
		"node_modules_angular_common_locales_fa_mjs"
	],
	"./ff-Adlm-BF.mjs": [
		49893,
		"node_modules_angular_common_locales_ff-Adlm-BF_mjs"
	],
	"./ff-Adlm-CM.mjs": [
		86097,
		"node_modules_angular_common_locales_ff-Adlm-CM_mjs"
	],
	"./ff-Adlm-GH.mjs": [
		42560,
		"node_modules_angular_common_locales_ff-Adlm-GH_mjs"
	],
	"./ff-Adlm-GM.mjs": [
		18765,
		"node_modules_angular_common_locales_ff-Adlm-GM_mjs"
	],
	"./ff-Adlm-GW.mjs": [
		26047,
		"node_modules_angular_common_locales_ff-Adlm-GW_mjs"
	],
	"./ff-Adlm-LR.mjs": [
		81351,
		"node_modules_angular_common_locales_ff-Adlm-LR_mjs"
	],
	"./ff-Adlm-MR.mjs": [
		53788,
		"node_modules_angular_common_locales_ff-Adlm-MR_mjs"
	],
	"./ff-Adlm-NE.mjs": [
		36266,
		"node_modules_angular_common_locales_ff-Adlm-NE_mjs"
	],
	"./ff-Adlm-NG.mjs": [
		888,
		"node_modules_angular_common_locales_ff-Adlm-NG_mjs"
	],
	"./ff-Adlm-SL.mjs": [
		76928,
		"node_modules_angular_common_locales_ff-Adlm-SL_mjs"
	],
	"./ff-Adlm-SN.mjs": [
		55506,
		"node_modules_angular_common_locales_ff-Adlm-SN_mjs"
	],
	"./ff-Adlm.mjs": [
		62672,
		"node_modules_angular_common_locales_ff-Adlm_mjs"
	],
	"./ff-CM.mjs": [
		51170,
		"node_modules_angular_common_locales_ff-CM_mjs"
	],
	"./ff-GN.mjs": [
		21029,
		"node_modules_angular_common_locales_ff-GN_mjs"
	],
	"./ff-Latn-BF.mjs": [
		34222,
		"node_modules_angular_common_locales_ff-Latn-BF_mjs"
	],
	"./ff-Latn-CM.mjs": [
		30754,
		"node_modules_angular_common_locales_ff-Latn-CM_mjs"
	],
	"./ff-Latn-GH.mjs": [
		57235,
		"node_modules_angular_common_locales_ff-Latn-GH_mjs"
	],
	"./ff-Latn-GM.mjs": [
		64294,
		"node_modules_angular_common_locales_ff-Latn-GM_mjs"
	],
	"./ff-Latn-GN.mjs": [
		25797,
		"node_modules_angular_common_locales_ff-Latn-GN_mjs"
	],
	"./ff-Latn-GW.mjs": [
		83916,
		"node_modules_angular_common_locales_ff-Latn-GW_mjs"
	],
	"./ff-Latn-LR.mjs": [
		86384,
		"node_modules_angular_common_locales_ff-Latn-LR_mjs"
	],
	"./ff-Latn-MR.mjs": [
		11035,
		"node_modules_angular_common_locales_ff-Latn-MR_mjs"
	],
	"./ff-Latn-NE.mjs": [
		6745,
		"node_modules_angular_common_locales_ff-Latn-NE_mjs"
	],
	"./ff-Latn-NG.mjs": [
		47571,
		"node_modules_angular_common_locales_ff-Latn-NG_mjs"
	],
	"./ff-Latn-SL.mjs": [
		53787,
		"node_modules_angular_common_locales_ff-Latn-SL_mjs"
	],
	"./ff-Latn.mjs": [
		72873,
		"node_modules_angular_common_locales_ff-Latn_mjs"
	],
	"./ff-MR.mjs": [
		71419,
		"node_modules_angular_common_locales_ff-MR_mjs"
	],
	"./ff.mjs": [
		87113,
		"node_modules_angular_common_locales_ff_mjs"
	],
	"./fi.mjs": [
		25886,
		"node_modules_angular_common_locales_fi_mjs"
	],
	"./fil.mjs": [
		67066,
		"node_modules_angular_common_locales_fil_mjs"
	],
	"./fo-DK.mjs": [
		3166,
		"node_modules_angular_common_locales_fo-DK_mjs"
	],
	"./fo.mjs": [
		27280,
		"node_modules_angular_common_locales_fo_mjs"
	],
	"./fr-BE.mjs": [
		59329,
		"node_modules_angular_common_locales_fr-BE_mjs"
	],
	"./fr-BF.mjs": [
		55794,
		"node_modules_angular_common_locales_fr-BF_mjs"
	],
	"./fr-BI.mjs": [
		74565,
		"node_modules_angular_common_locales_fr-BI_mjs"
	],
	"./fr-BJ.mjs": [
		29414,
		"node_modules_angular_common_locales_fr-BJ_mjs"
	],
	"./fr-BL.mjs": [
		51736,
		"node_modules_angular_common_locales_fr-BL_mjs"
	],
	"./fr-CA.mjs": [
		24194,
		"node_modules_angular_common_locales_fr-CA_mjs"
	],
	"./fr-CD.mjs": [
		34279,
		"node_modules_angular_common_locales_fr-CD_mjs"
	],
	"./fr-CF.mjs": [
		66045,
		"node_modules_angular_common_locales_fr-CF_mjs"
	],
	"./fr-CG.mjs": [
		80268,
		"node_modules_angular_common_locales_fr-CG_mjs"
	],
	"./fr-CH.mjs": [
		35971,
		"node_modules_angular_common_locales_fr-CH_mjs"
	],
	"./fr-CI.mjs": [
		1754,
		"node_modules_angular_common_locales_fr-CI_mjs"
	],
	"./fr-CM.mjs": [
		47254,
		"node_modules_angular_common_locales_fr-CM_mjs"
	],
	"./fr-DJ.mjs": [
		35364,
		"node_modules_angular_common_locales_fr-DJ_mjs"
	],
	"./fr-DZ.mjs": [
		96180,
		"node_modules_angular_common_locales_fr-DZ_mjs"
	],
	"./fr-GA.mjs": [
		82662,
		"node_modules_angular_common_locales_fr-GA_mjs"
	],
	"./fr-GF.mjs": [
		64505,
		"node_modules_angular_common_locales_fr-GF_mjs"
	],
	"./fr-GN.mjs": [
		85486,
		"node_modules_angular_common_locales_fr-GN_mjs"
	],
	"./fr-GP.mjs": [
		97279,
		"node_modules_angular_common_locales_fr-GP_mjs"
	],
	"./fr-GQ.mjs": [
		3446,
		"node_modules_angular_common_locales_fr-GQ_mjs"
	],
	"./fr-HT.mjs": [
		36814,
		"node_modules_angular_common_locales_fr-HT_mjs"
	],
	"./fr-KM.mjs": [
		63662,
		"node_modules_angular_common_locales_fr-KM_mjs"
	],
	"./fr-LU.mjs": [
		85635,
		"node_modules_angular_common_locales_fr-LU_mjs"
	],
	"./fr-MA.mjs": [
		98212,
		"node_modules_angular_common_locales_fr-MA_mjs"
	],
	"./fr-MC.mjs": [
		43894,
		"node_modules_angular_common_locales_fr-MC_mjs"
	],
	"./fr-MF.mjs": [
		33219,
		"node_modules_angular_common_locales_fr-MF_mjs"
	],
	"./fr-MG.mjs": [
		67770,
		"node_modules_angular_common_locales_fr-MG_mjs"
	],
	"./fr-ML.mjs": [
		3217,
		"node_modules_angular_common_locales_fr-ML_mjs"
	],
	"./fr-MQ.mjs": [
		32180,
		"node_modules_angular_common_locales_fr-MQ_mjs"
	],
	"./fr-MR.mjs": [
		12495,
		"node_modules_angular_common_locales_fr-MR_mjs"
	],
	"./fr-MU.mjs": [
		37080,
		"node_modules_angular_common_locales_fr-MU_mjs"
	],
	"./fr-NC.mjs": [
		23411,
		"node_modules_angular_common_locales_fr-NC_mjs"
	],
	"./fr-NE.mjs": [
		3877,
		"node_modules_angular_common_locales_fr-NE_mjs"
	],
	"./fr-PF.mjs": [
		61172,
		"node_modules_angular_common_locales_fr-PF_mjs"
	],
	"./fr-PM.mjs": [
		48183,
		"node_modules_angular_common_locales_fr-PM_mjs"
	],
	"./fr-RE.mjs": [
		6833,
		"node_modules_angular_common_locales_fr-RE_mjs"
	],
	"./fr-RW.mjs": [
		30683,
		"node_modules_angular_common_locales_fr-RW_mjs"
	],
	"./fr-SC.mjs": [
		7040,
		"node_modules_angular_common_locales_fr-SC_mjs"
	],
	"./fr-SN.mjs": [
		86981,
		"node_modules_angular_common_locales_fr-SN_mjs"
	],
	"./fr-SY.mjs": [
		27853,
		"node_modules_angular_common_locales_fr-SY_mjs"
	],
	"./fr-TD.mjs": [
		55634,
		"node_modules_angular_common_locales_fr-TD_mjs"
	],
	"./fr-TG.mjs": [
		12033,
		"node_modules_angular_common_locales_fr-TG_mjs"
	],
	"./fr-TN.mjs": [
		64792,
		"node_modules_angular_common_locales_fr-TN_mjs"
	],
	"./fr-VU.mjs": [
		95037,
		"node_modules_angular_common_locales_fr-VU_mjs"
	],
	"./fr-WF.mjs": [
		40169,
		"node_modules_angular_common_locales_fr-WF_mjs"
	],
	"./fr-YT.mjs": [
		89773,
		"node_modules_angular_common_locales_fr-YT_mjs"
	],
	"./fr.mjs": [
		45669,
		"node_modules_angular_common_locales_fr_mjs"
	],
	"./fur.mjs": [
		95760,
		"node_modules_angular_common_locales_fur_mjs"
	],
	"./fy.mjs": [
		64142,
		"node_modules_angular_common_locales_fy_mjs"
	],
	"./ga-GB.mjs": [
		98649,
		"node_modules_angular_common_locales_ga-GB_mjs"
	],
	"./ga.mjs": [
		82849,
		"node_modules_angular_common_locales_ga_mjs"
	],
	"./gd.mjs": [
		81852,
		"node_modules_angular_common_locales_gd_mjs"
	],
	"./gl.mjs": [
		62452,
		"node_modules_angular_common_locales_gl_mjs"
	],
	"./gsw-FR.mjs": [
		64911,
		"node_modules_angular_common_locales_gsw-FR_mjs"
	],
	"./gsw-LI.mjs": [
		75854,
		"node_modules_angular_common_locales_gsw-LI_mjs"
	],
	"./gsw.mjs": [
		40662,
		"node_modules_angular_common_locales_gsw_mjs"
	],
	"./gu.mjs": [
		41981,
		"node_modules_angular_common_locales_gu_mjs"
	],
	"./guz.mjs": [
		66365,
		"node_modules_angular_common_locales_guz_mjs"
	],
	"./gv.mjs": [
		78302,
		"node_modules_angular_common_locales_gv_mjs"
	],
	"./ha-GH.mjs": [
		4736,
		"node_modules_angular_common_locales_ha-GH_mjs"
	],
	"./ha-NE.mjs": [
		80650,
		"node_modules_angular_common_locales_ha-NE_mjs"
	],
	"./ha.mjs": [
		99344,
		"node_modules_angular_common_locales_ha_mjs"
	],
	"./haw.mjs": [
		3563,
		"node_modules_angular_common_locales_haw_mjs"
	],
	"./he.mjs": [
		16972,
		"node_modules_angular_common_locales_he_mjs"
	],
	"./hi-Latn.mjs": [
		3681,
		"node_modules_angular_common_locales_hi-Latn_mjs"
	],
	"./hi.mjs": [
		5640,
		"node_modules_angular_common_locales_hi_mjs"
	],
	"./hr-BA.mjs": [
		96771,
		"node_modules_angular_common_locales_hr-BA_mjs"
	],
	"./hr.mjs": [
		67963,
		"node_modules_angular_common_locales_hr_mjs"
	],
	"./hsb.mjs": [
		43192,
		"node_modules_angular_common_locales_hsb_mjs"
	],
	"./hu.mjs": [
		8828,
		"node_modules_angular_common_locales_hu_mjs"
	],
	"./hy.mjs": [
		43352,
		"node_modules_angular_common_locales_hy_mjs"
	],
	"./ia.mjs": [
		20379,
		"node_modules_angular_common_locales_ia_mjs"
	],
	"./id.mjs": [
		48974,
		"node_modules_angular_common_locales_id_mjs"
	],
	"./ig.mjs": [
		89133,
		"node_modules_angular_common_locales_ig_mjs"
	],
	"./ii.mjs": [
		89683,
		"node_modules_angular_common_locales_ii_mjs"
	],
	"./is.mjs": [
		96529,
		"node_modules_angular_common_locales_is_mjs"
	],
	"./it-CH.mjs": [
		52402,
		"node_modules_angular_common_locales_it-CH_mjs"
	],
	"./it-SM.mjs": [
		40711,
		"node_modules_angular_common_locales_it-SM_mjs"
	],
	"./it-VA.mjs": [
		1820,
		"node_modules_angular_common_locales_it-VA_mjs"
	],
	"./it.mjs": [
		38462,
		"node_modules_angular_common_locales_it_mjs"
	],
	"./ja.mjs": [
		59245,
		"node_modules_angular_common_locales_ja_mjs"
	],
	"./jgo.mjs": [
		34167,
		"node_modules_angular_common_locales_jgo_mjs"
	],
	"./jmc.mjs": [
		84381,
		"node_modules_angular_common_locales_jmc_mjs"
	],
	"./jv.mjs": [
		55941,
		"node_modules_angular_common_locales_jv_mjs"
	],
	"./ka.mjs": [
		8357,
		"node_modules_angular_common_locales_ka_mjs"
	],
	"./kab.mjs": [
		21469,
		"node_modules_angular_common_locales_kab_mjs"
	],
	"./kam.mjs": [
		76410,
		"node_modules_angular_common_locales_kam_mjs"
	],
	"./kde.mjs": [
		71737,
		"node_modules_angular_common_locales_kde_mjs"
	],
	"./kea.mjs": [
		8314,
		"node_modules_angular_common_locales_kea_mjs"
	],
	"./kgp.mjs": [
		77249,
		"node_modules_angular_common_locales_kgp_mjs"
	],
	"./khq.mjs": [
		54673,
		"node_modules_angular_common_locales_khq_mjs"
	],
	"./ki.mjs": [
		13677,
		"node_modules_angular_common_locales_ki_mjs"
	],
	"./kk.mjs": [
		85463,
		"node_modules_angular_common_locales_kk_mjs"
	],
	"./kkj.mjs": [
		60031,
		"node_modules_angular_common_locales_kkj_mjs"
	],
	"./kl.mjs": [
		31968,
		"node_modules_angular_common_locales_kl_mjs"
	],
	"./kln.mjs": [
		93658,
		"node_modules_angular_common_locales_kln_mjs"
	],
	"./km.mjs": [
		27297,
		"node_modules_angular_common_locales_km_mjs"
	],
	"./kn.mjs": [
		94194,
		"node_modules_angular_common_locales_kn_mjs"
	],
	"./ko-KP.mjs": [
		78801,
		"node_modules_angular_common_locales_ko-KP_mjs"
	],
	"./ko.mjs": [
		10171,
		"node_modules_angular_common_locales_ko_mjs"
	],
	"./kok.mjs": [
		86722,
		"node_modules_angular_common_locales_kok_mjs"
	],
	"./ks-Arab.mjs": [
		99756,
		"node_modules_angular_common_locales_ks-Arab_mjs"
	],
	"./ks-Deva.mjs": [
		56566,
		"node_modules_angular_common_locales_ks-Deva_mjs"
	],
	"./ks.mjs": [
		32287,
		"node_modules_angular_common_locales_ks_mjs"
	],
	"./ksb.mjs": [
		84511,
		"node_modules_angular_common_locales_ksb_mjs"
	],
	"./ksf.mjs": [
		21923,
		"node_modules_angular_common_locales_ksf_mjs"
	],
	"./ksh.mjs": [
		2141,
		"node_modules_angular_common_locales_ksh_mjs"
	],
	"./ku.mjs": [
		88585,
		"node_modules_angular_common_locales_ku_mjs"
	],
	"./kw.mjs": [
		99491,
		"node_modules_angular_common_locales_kw_mjs"
	],
	"./ky.mjs": [
		22237,
		"node_modules_angular_common_locales_ky_mjs"
	],
	"./lag.mjs": [
		40543,
		"node_modules_angular_common_locales_lag_mjs"
	],
	"./lb.mjs": [
		72495,
		"node_modules_angular_common_locales_lb_mjs"
	],
	"./lg.mjs": [
		84618,
		"node_modules_angular_common_locales_lg_mjs"
	],
	"./lkt.mjs": [
		76258,
		"node_modules_angular_common_locales_lkt_mjs"
	],
	"./ln-AO.mjs": [
		60676,
		"node_modules_angular_common_locales_ln-AO_mjs"
	],
	"./ln-CF.mjs": [
		83983,
		"node_modules_angular_common_locales_ln-CF_mjs"
	],
	"./ln-CG.mjs": [
		80358,
		"node_modules_angular_common_locales_ln-CG_mjs"
	],
	"./ln.mjs": [
		78299,
		"node_modules_angular_common_locales_ln_mjs"
	],
	"./lo.mjs": [
		69650,
		"node_modules_angular_common_locales_lo_mjs"
	],
	"./lrc-IQ.mjs": [
		13885,
		"node_modules_angular_common_locales_lrc-IQ_mjs"
	],
	"./lrc.mjs": [
		29910,
		"node_modules_angular_common_locales_lrc_mjs"
	],
	"./lt.mjs": [
		29865,
		"node_modules_angular_common_locales_lt_mjs"
	],
	"./lu.mjs": [
		42152,
		"node_modules_angular_common_locales_lu_mjs"
	],
	"./luo.mjs": [
		62059,
		"node_modules_angular_common_locales_luo_mjs"
	],
	"./luy.mjs": [
		99213,
		"node_modules_angular_common_locales_luy_mjs"
	],
	"./lv.mjs": [
		2243,
		"node_modules_angular_common_locales_lv_mjs"
	],
	"./mai.mjs": [
		27564,
		"node_modules_angular_common_locales_mai_mjs"
	],
	"./mas-TZ.mjs": [
		12277,
		"node_modules_angular_common_locales_mas-TZ_mjs"
	],
	"./mas.mjs": [
		97446,
		"node_modules_angular_common_locales_mas_mjs"
	],
	"./mer.mjs": [
		10795,
		"node_modules_angular_common_locales_mer_mjs"
	],
	"./mfe.mjs": [
		59113,
		"node_modules_angular_common_locales_mfe_mjs"
	],
	"./mg.mjs": [
		45833,
		"node_modules_angular_common_locales_mg_mjs"
	],
	"./mgh.mjs": [
		21307,
		"node_modules_angular_common_locales_mgh_mjs"
	],
	"./mgo.mjs": [
		62172,
		"node_modules_angular_common_locales_mgo_mjs"
	],
	"./mi.mjs": [
		54439,
		"node_modules_angular_common_locales_mi_mjs"
	],
	"./mk.mjs": [
		79485,
		"node_modules_angular_common_locales_mk_mjs"
	],
	"./ml.mjs": [
		93378,
		"node_modules_angular_common_locales_ml_mjs"
	],
	"./mn.mjs": [
		64176,
		"node_modules_angular_common_locales_mn_mjs"
	],
	"./mni-Beng.mjs": [
		20176,
		"node_modules_angular_common_locales_mni-Beng_mjs"
	],
	"./mni.mjs": [
		44517,
		"node_modules_angular_common_locales_mni_mjs"
	],
	"./mr.mjs": [
		55700,
		"node_modules_angular_common_locales_mr_mjs"
	],
	"./ms-BN.mjs": [
		65866,
		"node_modules_angular_common_locales_ms-BN_mjs"
	],
	"./ms-ID.mjs": [
		88013,
		"node_modules_angular_common_locales_ms-ID_mjs"
	],
	"./ms-SG.mjs": [
		23100,
		"node_modules_angular_common_locales_ms-SG_mjs"
	],
	"./ms.mjs": [
		65605,
		"node_modules_angular_common_locales_ms_mjs"
	],
	"./mt.mjs": [
		55466,
		"node_modules_angular_common_locales_mt_mjs"
	],
	"./mua.mjs": [
		84432,
		"node_modules_angular_common_locales_mua_mjs"
	],
	"./my.mjs": [
		42711,
		"node_modules_angular_common_locales_my_mjs"
	],
	"./mzn.mjs": [
		53702,
		"node_modules_angular_common_locales_mzn_mjs"
	],
	"./naq.mjs": [
		42103,
		"node_modules_angular_common_locales_naq_mjs"
	],
	"./nb-SJ.mjs": [
		91969,
		"node_modules_angular_common_locales_nb-SJ_mjs"
	],
	"./nb.mjs": [
		26013,
		"node_modules_angular_common_locales_nb_mjs"
	],
	"./nd.mjs": [
		57451,
		"node_modules_angular_common_locales_nd_mjs"
	],
	"./nds-NL.mjs": [
		69901,
		"node_modules_angular_common_locales_nds-NL_mjs"
	],
	"./nds.mjs": [
		57082,
		"node_modules_angular_common_locales_nds_mjs"
	],
	"./ne-IN.mjs": [
		85342,
		"node_modules_angular_common_locales_ne-IN_mjs"
	],
	"./ne.mjs": [
		75106,
		"node_modules_angular_common_locales_ne_mjs"
	],
	"./nl-AW.mjs": [
		23844,
		"node_modules_angular_common_locales_nl-AW_mjs"
	],
	"./nl-BE.mjs": [
		2023,
		"node_modules_angular_common_locales_nl-BE_mjs"
	],
	"./nl-BQ.mjs": [
		9499,
		"node_modules_angular_common_locales_nl-BQ_mjs"
	],
	"./nl-CW.mjs": [
		42014,
		"node_modules_angular_common_locales_nl-CW_mjs"
	],
	"./nl-SR.mjs": [
		18619,
		"node_modules_angular_common_locales_nl-SR_mjs"
	],
	"./nl-SX.mjs": [
		37145,
		"node_modules_angular_common_locales_nl-SX_mjs"
	],
	"./nl.mjs": [
		69091,
		"node_modules_angular_common_locales_nl_mjs"
	],
	"./nmg.mjs": [
		8829,
		"node_modules_angular_common_locales_nmg_mjs"
	],
	"./nn.mjs": [
		58185,
		"node_modules_angular_common_locales_nn_mjs"
	],
	"./nnh.mjs": [
		58363,
		"node_modules_angular_common_locales_nnh_mjs"
	],
	"./no.mjs": [
		35848,
		"node_modules_angular_common_locales_no_mjs"
	],
	"./nus.mjs": [
		96169,
		"node_modules_angular_common_locales_nus_mjs"
	],
	"./nyn.mjs": [
		65648,
		"node_modules_angular_common_locales_nyn_mjs"
	],
	"./om-KE.mjs": [
		26350,
		"node_modules_angular_common_locales_om-KE_mjs"
	],
	"./om.mjs": [
		79901,
		"node_modules_angular_common_locales_om_mjs"
	],
	"./or.mjs": [
		32202,
		"node_modules_angular_common_locales_or_mjs"
	],
	"./os-RU.mjs": [
		61143,
		"node_modules_angular_common_locales_os-RU_mjs"
	],
	"./os.mjs": [
		67443,
		"node_modules_angular_common_locales_os_mjs"
	],
	"./pa-Arab.mjs": [
		34701,
		"node_modules_angular_common_locales_pa-Arab_mjs"
	],
	"./pa-Guru.mjs": [
		32994,
		"node_modules_angular_common_locales_pa-Guru_mjs"
	],
	"./pa.mjs": [
		10040,
		"node_modules_angular_common_locales_pa_mjs"
	],
	"./pcm.mjs": [
		41628,
		"node_modules_angular_common_locales_pcm_mjs"
	],
	"./pl.mjs": [
		4013,
		"node_modules_angular_common_locales_pl_mjs"
	],
	"./ps-PK.mjs": [
		76919,
		"node_modules_angular_common_locales_ps-PK_mjs"
	],
	"./ps.mjs": [
		24378,
		"node_modules_angular_common_locales_ps_mjs"
	],
	"./pt-AO.mjs": [
		31262,
		"node_modules_angular_common_locales_pt-AO_mjs"
	],
	"./pt-CH.mjs": [
		50803,
		"node_modules_angular_common_locales_pt-CH_mjs"
	],
	"./pt-CV.mjs": [
		14845,
		"node_modules_angular_common_locales_pt-CV_mjs"
	],
	"./pt-GQ.mjs": [
		20582,
		"node_modules_angular_common_locales_pt-GQ_mjs"
	],
	"./pt-GW.mjs": [
		42904,
		"node_modules_angular_common_locales_pt-GW_mjs"
	],
	"./pt-LU.mjs": [
		98387,
		"node_modules_angular_common_locales_pt-LU_mjs"
	],
	"./pt-MO.mjs": [
		89714,
		"node_modules_angular_common_locales_pt-MO_mjs"
	],
	"./pt-MZ.mjs": [
		36967,
		"node_modules_angular_common_locales_pt-MZ_mjs"
	],
	"./pt-PT.mjs": [
		13606,
		"node_modules_angular_common_locales_pt-PT_mjs"
	],
	"./pt-ST.mjs": [
		73559,
		"node_modules_angular_common_locales_pt-ST_mjs"
	],
	"./pt-TL.mjs": [
		94778,
		"node_modules_angular_common_locales_pt-TL_mjs"
	],
	"./pt.mjs": [
		58581,
		"node_modules_angular_common_locales_pt_mjs"
	],
	"./qu-BO.mjs": [
		79465,
		"node_modules_angular_common_locales_qu-BO_mjs"
	],
	"./qu-EC.mjs": [
		26320,
		"node_modules_angular_common_locales_qu-EC_mjs"
	],
	"./qu.mjs": [
		92143,
		"node_modules_angular_common_locales_qu_mjs"
	],
	"./rm.mjs": [
		94198,
		"node_modules_angular_common_locales_rm_mjs"
	],
	"./rn.mjs": [
		17045,
		"node_modules_angular_common_locales_rn_mjs"
	],
	"./ro-MD.mjs": [
		64022,
		"node_modules_angular_common_locales_ro-MD_mjs"
	],
	"./ro.mjs": [
		72644,
		"node_modules_angular_common_locales_ro_mjs"
	],
	"./rof.mjs": [
		81990,
		"node_modules_angular_common_locales_rof_mjs"
	],
	"./ru-BY.mjs": [
		76848,
		"node_modules_angular_common_locales_ru-BY_mjs"
	],
	"./ru-KG.mjs": [
		70589,
		"node_modules_angular_common_locales_ru-KG_mjs"
	],
	"./ru-KZ.mjs": [
		11192,
		"node_modules_angular_common_locales_ru-KZ_mjs"
	],
	"./ru-MD.mjs": [
		66292,
		"node_modules_angular_common_locales_ru-MD_mjs"
	],
	"./ru-UA.mjs": [
		77377,
		"node_modules_angular_common_locales_ru-UA_mjs"
	],
	"./ru.mjs": [
		87566,
		"node_modules_angular_common_locales_ru_mjs"
	],
	"./rw.mjs": [
		52860,
		"node_modules_angular_common_locales_rw_mjs"
	],
	"./rwk.mjs": [
		14643,
		"node_modules_angular_common_locales_rwk_mjs"
	],
	"./sa.mjs": [
		26221,
		"node_modules_angular_common_locales_sa_mjs"
	],
	"./sah.mjs": [
		19783,
		"node_modules_angular_common_locales_sah_mjs"
	],
	"./saq.mjs": [
		46150,
		"node_modules_angular_common_locales_saq_mjs"
	],
	"./sat-Olck.mjs": [
		42391,
		"node_modules_angular_common_locales_sat-Olck_mjs"
	],
	"./sat.mjs": [
		96563,
		"node_modules_angular_common_locales_sat_mjs"
	],
	"./sbp.mjs": [
		69438,
		"node_modules_angular_common_locales_sbp_mjs"
	],
	"./sc.mjs": [
		89559,
		"node_modules_angular_common_locales_sc_mjs"
	],
	"./sd-Arab.mjs": [
		725,
		"node_modules_angular_common_locales_sd-Arab_mjs"
	],
	"./sd-Deva.mjs": [
		85931,
		"node_modules_angular_common_locales_sd-Deva_mjs"
	],
	"./sd.mjs": [
		50016,
		"node_modules_angular_common_locales_sd_mjs"
	],
	"./se-FI.mjs": [
		32637,
		"node_modules_angular_common_locales_se-FI_mjs"
	],
	"./se-SE.mjs": [
		7970,
		"node_modules_angular_common_locales_se-SE_mjs"
	],
	"./se.mjs": [
		6273,
		"node_modules_angular_common_locales_se_mjs"
	],
	"./seh.mjs": [
		80371,
		"node_modules_angular_common_locales_seh_mjs"
	],
	"./ses.mjs": [
		24656,
		"node_modules_angular_common_locales_ses_mjs"
	],
	"./sg.mjs": [
		11387,
		"node_modules_angular_common_locales_sg_mjs"
	],
	"./shi-Latn.mjs": [
		51857,
		"node_modules_angular_common_locales_shi-Latn_mjs"
	],
	"./shi-Tfng.mjs": [
		2809,
		"node_modules_angular_common_locales_shi-Tfng_mjs"
	],
	"./shi.mjs": [
		93745,
		"node_modules_angular_common_locales_shi_mjs"
	],
	"./si.mjs": [
		21509,
		"node_modules_angular_common_locales_si_mjs"
	],
	"./sk.mjs": [
		21935,
		"node_modules_angular_common_locales_sk_mjs"
	],
	"./sl.mjs": [
		98680,
		"node_modules_angular_common_locales_sl_mjs"
	],
	"./smn.mjs": [
		65981,
		"node_modules_angular_common_locales_smn_mjs"
	],
	"./sn.mjs": [
		17706,
		"node_modules_angular_common_locales_sn_mjs"
	],
	"./so-DJ.mjs": [
		81218,
		"node_modules_angular_common_locales_so-DJ_mjs"
	],
	"./so-ET.mjs": [
		69691,
		"node_modules_angular_common_locales_so-ET_mjs"
	],
	"./so-KE.mjs": [
		81252,
		"node_modules_angular_common_locales_so-KE_mjs"
	],
	"./so.mjs": [
		52947,
		"node_modules_angular_common_locales_so_mjs"
	],
	"./sq-MK.mjs": [
		96822,
		"node_modules_angular_common_locales_sq-MK_mjs"
	],
	"./sq-XK.mjs": [
		49361,
		"node_modules_angular_common_locales_sq-XK_mjs"
	],
	"./sq.mjs": [
		65405,
		"node_modules_angular_common_locales_sq_mjs"
	],
	"./sr-Cyrl-BA.mjs": [
		49933,
		"node_modules_angular_common_locales_sr-Cyrl-BA_mjs"
	],
	"./sr-Cyrl-ME.mjs": [
		89480,
		"node_modules_angular_common_locales_sr-Cyrl-ME_mjs"
	],
	"./sr-Cyrl-XK.mjs": [
		20921,
		"node_modules_angular_common_locales_sr-Cyrl-XK_mjs"
	],
	"./sr-Cyrl.mjs": [
		45714,
		"node_modules_angular_common_locales_sr-Cyrl_mjs"
	],
	"./sr-Latn-BA.mjs": [
		81318,
		"node_modules_angular_common_locales_sr-Latn-BA_mjs"
	],
	"./sr-Latn-ME.mjs": [
		25575,
		"node_modules_angular_common_locales_sr-Latn-ME_mjs"
	],
	"./sr-Latn-XK.mjs": [
		53934,
		"node_modules_angular_common_locales_sr-Latn-XK_mjs"
	],
	"./sr-Latn.mjs": [
		5436,
		"node_modules_angular_common_locales_sr-Latn_mjs"
	],
	"./sr.mjs": [
		1726,
		"node_modules_angular_common_locales_sr_mjs"
	],
	"./su-Latn.mjs": [
		79857,
		"node_modules_angular_common_locales_su-Latn_mjs"
	],
	"./su.mjs": [
		56913,
		"node_modules_angular_common_locales_su_mjs"
	],
	"./sv-AX.mjs": [
		60456,
		"node_modules_angular_common_locales_sv-AX_mjs"
	],
	"./sv-FI.mjs": [
		10512,
		"node_modules_angular_common_locales_sv-FI_mjs"
	],
	"./sv.mjs": [
		23554,
		"node_modules_angular_common_locales_sv_mjs"
	],
	"./sw-CD.mjs": [
		14869,
		"node_modules_angular_common_locales_sw-CD_mjs"
	],
	"./sw-KE.mjs": [
		45196,
		"node_modules_angular_common_locales_sw-KE_mjs"
	],
	"./sw-UG.mjs": [
		14328,
		"node_modules_angular_common_locales_sw-UG_mjs"
	],
	"./sw.mjs": [
		19691,
		"node_modules_angular_common_locales_sw_mjs"
	],
	"./ta-LK.mjs": [
		44330,
		"node_modules_angular_common_locales_ta-LK_mjs"
	],
	"./ta-MY.mjs": [
		66803,
		"node_modules_angular_common_locales_ta-MY_mjs"
	],
	"./ta-SG.mjs": [
		56343,
		"node_modules_angular_common_locales_ta-SG_mjs"
	],
	"./ta.mjs": [
		99580,
		"node_modules_angular_common_locales_ta_mjs"
	],
	"./te.mjs": [
		44320,
		"node_modules_angular_common_locales_te_mjs"
	],
	"./teo-KE.mjs": [
		7668,
		"node_modules_angular_common_locales_teo-KE_mjs"
	],
	"./teo.mjs": [
		7843,
		"node_modules_angular_common_locales_teo_mjs"
	],
	"./tg.mjs": [
		83250,
		"node_modules_angular_common_locales_tg_mjs"
	],
	"./th.mjs": [
		24261,
		"node_modules_angular_common_locales_th_mjs"
	],
	"./ti-ER.mjs": [
		20112,
		"node_modules_angular_common_locales_ti-ER_mjs"
	],
	"./ti.mjs": [
		68276,
		"node_modules_angular_common_locales_ti_mjs"
	],
	"./tk.mjs": [
		56870,
		"node_modules_angular_common_locales_tk_mjs"
	],
	"./to.mjs": [
		97770,
		"node_modules_angular_common_locales_to_mjs"
	],
	"./tr-CY.mjs": [
		1036,
		"node_modules_angular_common_locales_tr-CY_mjs"
	],
	"./tr.mjs": [
		20039,
		"node_modules_angular_common_locales_tr_mjs"
	],
	"./tt.mjs": [
		85393,
		"node_modules_angular_common_locales_tt_mjs"
	],
	"./twq.mjs": [
		81395,
		"node_modules_angular_common_locales_twq_mjs"
	],
	"./tzm.mjs": [
		96144,
		"node_modules_angular_common_locales_tzm_mjs"
	],
	"./ug.mjs": [
		14161,
		"node_modules_angular_common_locales_ug_mjs"
	],
	"./uk.mjs": [
		10357,
		"node_modules_angular_common_locales_uk_mjs"
	],
	"./und.mjs": [
		6248,
		"node_modules_angular_common_locales_und_mjs"
	],
	"./ur-IN.mjs": [
		38944,
		"node_modules_angular_common_locales_ur-IN_mjs"
	],
	"./ur.mjs": [
		62524,
		"node_modules_angular_common_locales_ur_mjs"
	],
	"./uz-Arab.mjs": [
		38201,
		"node_modules_angular_common_locales_uz-Arab_mjs"
	],
	"./uz-Cyrl.mjs": [
		32223,
		"node_modules_angular_common_locales_uz-Cyrl_mjs"
	],
	"./uz-Latn.mjs": [
		33138,
		"node_modules_angular_common_locales_uz-Latn_mjs"
	],
	"./uz.mjs": [
		43124,
		"node_modules_angular_common_locales_uz_mjs"
	],
	"./vai-Latn.mjs": [
		50543,
		"node_modules_angular_common_locales_vai-Latn_mjs"
	],
	"./vai-Vaii.mjs": [
		70517,
		"node_modules_angular_common_locales_vai-Vaii_mjs"
	],
	"./vai.mjs": [
		10759,
		"node_modules_angular_common_locales_vai_mjs"
	],
	"./vi.mjs": [
		39310,
		"node_modules_angular_common_locales_vi_mjs"
	],
	"./vun.mjs": [
		1476,
		"node_modules_angular_common_locales_vun_mjs"
	],
	"./wae.mjs": [
		39038,
		"node_modules_angular_common_locales_wae_mjs"
	],
	"./wo.mjs": [
		49695,
		"node_modules_angular_common_locales_wo_mjs"
	],
	"./xh.mjs": [
		24838,
		"node_modules_angular_common_locales_xh_mjs"
	],
	"./xog.mjs": [
		45929,
		"node_modules_angular_common_locales_xog_mjs"
	],
	"./yav.mjs": [
		59679,
		"node_modules_angular_common_locales_yav_mjs"
	],
	"./yi.mjs": [
		80163,
		"node_modules_angular_common_locales_yi_mjs"
	],
	"./yo-BJ.mjs": [
		60214,
		"node_modules_angular_common_locales_yo-BJ_mjs"
	],
	"./yo.mjs": [
		48917,
		"node_modules_angular_common_locales_yo_mjs"
	],
	"./yrl-CO.mjs": [
		51539,
		"node_modules_angular_common_locales_yrl-CO_mjs"
	],
	"./yrl-VE.mjs": [
		70394,
		"node_modules_angular_common_locales_yrl-VE_mjs"
	],
	"./yrl.mjs": [
		49064,
		"node_modules_angular_common_locales_yrl_mjs"
	],
	"./yue-Hans.mjs": [
		51081,
		"node_modules_angular_common_locales_yue-Hans_mjs"
	],
	"./yue-Hant.mjs": [
		72662,
		"node_modules_angular_common_locales_yue-Hant_mjs"
	],
	"./yue.mjs": [
		22224,
		"node_modules_angular_common_locales_yue_mjs"
	],
	"./zgh.mjs": [
		69488,
		"node_modules_angular_common_locales_zgh_mjs"
	],
	"./zh-Hans-HK.mjs": [
		37114,
		"node_modules_angular_common_locales_zh-Hans-HK_mjs"
	],
	"./zh-Hans-MO.mjs": [
		5713,
		"node_modules_angular_common_locales_zh-Hans-MO_mjs"
	],
	"./zh-Hans-SG.mjs": [
		90811,
		"node_modules_angular_common_locales_zh-Hans-SG_mjs"
	],
	"./zh-Hans.mjs": [
		94136,
		"node_modules_angular_common_locales_zh-Hans_mjs"
	],
	"./zh-Hant-HK.mjs": [
		55227,
		"node_modules_angular_common_locales_zh-Hant-HK_mjs"
	],
	"./zh-Hant-MO.mjs": [
		11804,
		"node_modules_angular_common_locales_zh-Hant-MO_mjs"
	],
	"./zh-Hant.mjs": [
		52591,
		"node_modules_angular_common_locales_zh-Hant_mjs"
	],
	"./zh.mjs": [
		6747,
		"node_modules_angular_common_locales_zh_mjs"
	],
	"./zu.mjs": [
		30038,
		"node_modules_angular_common_locales_zu_mjs"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 77055;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 32220:
/*!********************************************************************************!*\
  !*** ./node_modules/moment-timezone/node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": 47,
	"./af.js": 47,
	"./ar": 77211,
	"./ar-dz": 91406,
	"./ar-dz.js": 91406,
	"./ar-kw": 63838,
	"./ar-kw.js": 63838,
	"./ar-ly": 57219,
	"./ar-ly.js": 57219,
	"./ar-ma": 63082,
	"./ar-ma.js": 63082,
	"./ar-ps": 6897,
	"./ar-ps.js": 6897,
	"./ar-sa": 78048,
	"./ar-sa.js": 78048,
	"./ar-tn": 86146,
	"./ar-tn.js": 86146,
	"./ar.js": 77211,
	"./az": 66227,
	"./az.js": 66227,
	"./be": 32805,
	"./be.js": 32805,
	"./bg": 84707,
	"./bg.js": 84707,
	"./bm": 44045,
	"./bm.js": 44045,
	"./bn": 19460,
	"./bn-bd": 61991,
	"./bn-bd.js": 61991,
	"./bn.js": 19460,
	"./bo": 35083,
	"./bo.js": 35083,
	"./br": 30112,
	"./br.js": 30112,
	"./bs": 19831,
	"./bs.js": 19831,
	"./ca": 60512,
	"./ca.js": 60512,
	"./cs": 34714,
	"./cs.js": 34714,
	"./cv": 79557,
	"./cv.js": 79557,
	"./cy": 33592,
	"./cy.js": 33592,
	"./da": 29443,
	"./da.js": 29443,
	"./de": 13127,
	"./de-at": 33221,
	"./de-at.js": 33221,
	"./de-ch": 75195,
	"./de-ch.js": 75195,
	"./de.js": 13127,
	"./dv": 39818,
	"./dv.js": 39818,
	"./el": 88853,
	"./el.js": 88853,
	"./en-au": 33786,
	"./en-au.js": 33786,
	"./en-ca": 25640,
	"./en-ca.js": 25640,
	"./en-gb": 44709,
	"./en-gb.js": 44709,
	"./en-ie": 15042,
	"./en-ie.js": 15042,
	"./en-il": 68521,
	"./en-il.js": 68521,
	"./en-in": 25031,
	"./en-in.js": 25031,
	"./en-nz": 97068,
	"./en-nz.js": 97068,
	"./en-sg": 37678,
	"./en-sg.js": 37678,
	"./eo": 82156,
	"./eo.js": 82156,
	"./es": 60920,
	"./es-do": 14540,
	"./es-do.js": 14540,
	"./es-mx": 17452,
	"./es-mx.js": 17452,
	"./es-us": 48773,
	"./es-us.js": 48773,
	"./es.js": 60920,
	"./et": 53357,
	"./et.js": 53357,
	"./eu": 27342,
	"./eu.js": 27342,
	"./fa": 25549,
	"./fa.js": 25549,
	"./fi": 80133,
	"./fi.js": 80133,
	"./fil": 8957,
	"./fil.js": 8957,
	"./fo": 32071,
	"./fo.js": 32071,
	"./fr": 6260,
	"./fr-ca": 24005,
	"./fr-ca.js": 24005,
	"./fr-ch": 25070,
	"./fr-ch.js": 25070,
	"./fr.js": 6260,
	"./fy": 77941,
	"./fy.js": 77941,
	"./ga": 36660,
	"./ga.js": 36660,
	"./gd": 80127,
	"./gd.js": 80127,
	"./gl": 55031,
	"./gl.js": 55031,
	"./gom-deva": 38706,
	"./gom-deva.js": 38706,
	"./gom-latn": 58621,
	"./gom-latn.js": 58621,
	"./gu": 15096,
	"./gu.js": 15096,
	"./he": 80195,
	"./he.js": 80195,
	"./hi": 93391,
	"./hi.js": 93391,
	"./hr": 40042,
	"./hr.js": 40042,
	"./hu": 94259,
	"./hu.js": 94259,
	"./hy-am": 31366,
	"./hy-am.js": 31366,
	"./id": 76281,
	"./id.js": 76281,
	"./is": 55132,
	"./is.js": 55132,
	"./it": 45609,
	"./it-ch": 49045,
	"./it-ch.js": 49045,
	"./it.js": 45609,
	"./ja": 41265,
	"./ja.js": 41265,
	"./jv": 48500,
	"./jv.js": 48500,
	"./ka": 78984,
	"./ka.js": 78984,
	"./kk": 22634,
	"./kk.js": 22634,
	"./km": 94924,
	"./km.js": 94924,
	"./kn": 82389,
	"./kn.js": 82389,
	"./ko": 6678,
	"./ko.js": 6678,
	"./ku": 57892,
	"./ku-kmr": 72531,
	"./ku-kmr.js": 72531,
	"./ku.js": 57892,
	"./ky": 89072,
	"./ky.js": 89072,
	"./lb": 51438,
	"./lb.js": 51438,
	"./lo": 76937,
	"./lo.js": 76937,
	"./lt": 51176,
	"./lt.js": 51176,
	"./lv": 36466,
	"./lv.js": 36466,
	"./me": 29030,
	"./me.js": 29030,
	"./mi": 90306,
	"./mi.js": 90306,
	"./mk": 1336,
	"./mk.js": 1336,
	"./ml": 10125,
	"./ml.js": 10125,
	"./mn": 33739,
	"./mn.js": 33739,
	"./mr": 27543,
	"./mr.js": 27543,
	"./ms": 28768,
	"./ms-my": 3195,
	"./ms-my.js": 3195,
	"./ms.js": 28768,
	"./mt": 29269,
	"./mt.js": 29269,
	"./my": 59570,
	"./my.js": 59570,
	"./nb": 69324,
	"./nb.js": 69324,
	"./ne": 70169,
	"./ne.js": 70169,
	"./nl": 89970,
	"./nl-be": 13206,
	"./nl-be.js": 13206,
	"./nl.js": 89970,
	"./nn": 13736,
	"./nn.js": 13736,
	"./oc-lnc": 64180,
	"./oc-lnc.js": 64180,
	"./pa-in": 14571,
	"./pa-in.js": 14571,
	"./pl": 16412,
	"./pl.js": 16412,
	"./pt": 63220,
	"./pt-br": 92197,
	"./pt-br.js": 92197,
	"./pt.js": 63220,
	"./ro": 62459,
	"./ro.js": 62459,
	"./ru": 88389,
	"./ru.js": 88389,
	"./sd": 86851,
	"./sd.js": 86851,
	"./se": 5212,
	"./se.js": 5212,
	"./si": 30456,
	"./si.js": 30456,
	"./sk": 60546,
	"./sk.js": 60546,
	"./sl": 3979,
	"./sl.js": 3979,
	"./sq": 99008,
	"./sq.js": 99008,
	"./sr": 33305,
	"./sr-cyrl": 71832,
	"./sr-cyrl.js": 71832,
	"./sr.js": 33305,
	"./ss": 63050,
	"./ss.js": 63050,
	"./sv": 39157,
	"./sv.js": 39157,
	"./sw": 47094,
	"./sw.js": 47094,
	"./ta": 70963,
	"./ta.js": 70963,
	"./te": 87063,
	"./te.js": 87063,
	"./tet": 69835,
	"./tet.js": 69835,
	"./tg": 80057,
	"./tg.js": 80057,
	"./th": 82420,
	"./th.js": 82420,
	"./tk": 80541,
	"./tk.js": 80541,
	"./tl-ph": 80293,
	"./tl-ph.js": 80293,
	"./tlh": 97922,
	"./tlh.js": 97922,
	"./tr": 11846,
	"./tr.js": 11846,
	"./tzl": 72424,
	"./tzl.js": 72424,
	"./tzm": 83743,
	"./tzm-latn": 64649,
	"./tzm-latn.js": 64649,
	"./tzm.js": 83743,
	"./ug-cn": 31432,
	"./ug-cn.js": 31432,
	"./uk": 88624,
	"./uk.js": 88624,
	"./ur": 30431,
	"./ur.js": 30431,
	"./uz": 24567,
	"./uz-latn": 22145,
	"./uz-latn.js": 22145,
	"./uz.js": 24567,
	"./vi": 5397,
	"./vi.js": 5397,
	"./x-pseudo": 6757,
	"./x-pseudo.js": 6757,
	"./yo": 9592,
	"./yo.js": 9592,
	"./zh-cn": 97522,
	"./zh-cn.js": 97522,
	"./zh-hk": 25310,
	"./zh-hk.js": 25310,
	"./zh-mo": 89235,
	"./zh-mo.js": 89235,
	"./zh-tw": 32102,
	"./zh-tw.js": 32102
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
webpackContext.id = 32220;

/***/ }),

/***/ 35358:
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": 85637,
	"./af.js": 85637,
	"./ar": 6777,
	"./ar-dz": 74508,
	"./ar-dz.js": 74508,
	"./ar-kw": 67504,
	"./ar-kw.js": 67504,
	"./ar-ly": 95373,
	"./ar-ly.js": 95373,
	"./ar-ma": 92412,
	"./ar-ma.js": 92412,
	"./ar-sa": 36670,
	"./ar-sa.js": 36670,
	"./ar-tn": 36448,
	"./ar-tn.js": 36448,
	"./ar.js": 6777,
	"./az": 23009,
	"./az.js": 23009,
	"./be": 28299,
	"./be.js": 28299,
	"./bg": 4685,
	"./bg.js": 4685,
	"./bm": 11171,
	"./bm.js": 11171,
	"./bn": 23590,
	"./bn-bd": 5841,
	"./bn-bd.js": 5841,
	"./bn.js": 23590,
	"./bo": 54309,
	"./bo.js": 54309,
	"./br": 54130,
	"./br.js": 54130,
	"./bs": 8033,
	"./bs.js": 8033,
	"./ca": 55294,
	"./ca.js": 55294,
	"./cs": 53028,
	"./cs.js": 53028,
	"./cv": 5807,
	"./cv.js": 5807,
	"./cy": 70342,
	"./cy.js": 70342,
	"./da": 38269,
	"./da.js": 38269,
	"./de": 11489,
	"./de-at": 42123,
	"./de-at.js": 42123,
	"./de-ch": 17757,
	"./de-ch.js": 17757,
	"./de.js": 11489,
	"./dv": 28152,
	"./dv.js": 28152,
	"./el": 7687,
	"./el.js": 7687,
	"./en-au": 46668,
	"./en-au.js": 46668,
	"./en-ca": 76798,
	"./en-ca.js": 76798,
	"./en-gb": 53615,
	"./en-gb.js": 53615,
	"./en-ie": 91364,
	"./en-ie.js": 91364,
	"./en-il": 79907,
	"./en-il.js": 79907,
	"./en-in": 70533,
	"./en-in.js": 70533,
	"./en-nz": 33190,
	"./en-nz.js": 33190,
	"./en-sg": 51096,
	"./en-sg.js": 51096,
	"./eo": 3962,
	"./eo.js": 3962,
	"./es": 37726,
	"./es-do": 65010,
	"./es-do.js": 65010,
	"./es-mx": 63654,
	"./es-mx.js": 63654,
	"./es-us": 59043,
	"./es-us.js": 59043,
	"./es.js": 37726,
	"./et": 25343,
	"./et.js": 25343,
	"./eu": 90728,
	"./eu.js": 90728,
	"./fa": 60787,
	"./fa.js": 60787,
	"./fi": 71771,
	"./fi.js": 71771,
	"./fil": 45335,
	"./fil.js": 45335,
	"./fo": 69761,
	"./fo.js": 69761,
	"./fr": 1670,
	"./fr-ca": 28991,
	"./fr-ca.js": 28991,
	"./fr-ch": 97280,
	"./fr-ch.js": 97280,
	"./fr.js": 1670,
	"./fy": 24203,
	"./fy.js": 24203,
	"./ga": 69858,
	"./ga.js": 69858,
	"./gd": 38605,
	"./gd.js": 38605,
	"./gl": 27365,
	"./gl.js": 27365,
	"./gom-deva": 33896,
	"./gom-deva.js": 33896,
	"./gom-latn": 95587,
	"./gom-latn.js": 95587,
	"./gu": 97950,
	"./gu.js": 97950,
	"./he": 92029,
	"./he.js": 92029,
	"./hi": 51897,
	"./hi.js": 51897,
	"./hr": 29816,
	"./hr.js": 29816,
	"./hu": 22253,
	"./hu.js": 22253,
	"./hy-am": 28196,
	"./hy-am.js": 28196,
	"./id": 51307,
	"./id.js": 51307,
	"./is": 95474,
	"./is.js": 95474,
	"./it": 23099,
	"./it-ch": 45807,
	"./it-ch.js": 45807,
	"./it.js": 23099,
	"./ja": 19127,
	"./ja.js": 19127,
	"./jv": 30182,
	"./jv.js": 30182,
	"./ka": 10758,
	"./ka.js": 10758,
	"./kk": 93444,
	"./kk.js": 93444,
	"./km": 72034,
	"./km.js": 72034,
	"./kn": 46223,
	"./kn.js": 46223,
	"./ko": 83064,
	"./ko.js": 83064,
	"./ku": 8714,
	"./ku.js": 8714,
	"./ky": 12062,
	"./ky.js": 12062,
	"./lb": 84796,
	"./lb.js": 84796,
	"./lo": 19279,
	"./lo.js": 19279,
	"./lt": 106,
	"./lt.js": 106,
	"./lv": 11840,
	"./lv.js": 11840,
	"./me": 42240,
	"./me.js": 42240,
	"./mi": 13588,
	"./mi.js": 13588,
	"./mk": 15518,
	"./mk.js": 15518,
	"./ml": 37823,
	"./ml.js": 37823,
	"./mn": 98657,
	"./mn.js": 98657,
	"./mr": 61285,
	"./mr.js": 61285,
	"./ms": 43014,
	"./ms-my": 86253,
	"./ms-my.js": 86253,
	"./ms.js": 43014,
	"./mt": 20167,
	"./mt.js": 20167,
	"./my": 47940,
	"./my.js": 47940,
	"./nb": 50014,
	"./nb.js": 50014,
	"./ne": 49023,
	"./ne.js": 49023,
	"./nl": 34208,
	"./nl-be": 71412,
	"./nl-be.js": 71412,
	"./nl.js": 34208,
	"./nn": 81354,
	"./nn.js": 81354,
	"./oc-lnc": 40870,
	"./oc-lnc.js": 40870,
	"./pa-in": 80389,
	"./pa-in.js": 80389,
	"./pl": 7342,
	"./pl.js": 7342,
	"./pt": 34774,
	"./pt-br": 73003,
	"./pt-br.js": 73003,
	"./pt.js": 34774,
	"./ro": 85333,
	"./ro.js": 85333,
	"./ru": 73451,
	"./ru.js": 73451,
	"./sd": 43921,
	"./sd.js": 43921,
	"./se": 59682,
	"./se.js": 59682,
	"./si": 80582,
	"./si.js": 80582,
	"./sk": 4348,
	"./sk.js": 4348,
	"./sl": 95337,
	"./sl.js": 95337,
	"./sq": 39358,
	"./sq.js": 39358,
	"./sr": 50683,
	"./sr-cyrl": 69382,
	"./sr-cyrl.js": 69382,
	"./sr.js": 50683,
	"./ss": 51156,
	"./ss.js": 51156,
	"./sv": 29855,
	"./sv.js": 29855,
	"./sw": 18536,
	"./sw.js": 18536,
	"./ta": 15373,
	"./ta.js": 15373,
	"./te": 37809,
	"./te.js": 37809,
	"./tet": 61297,
	"./tet.js": 61297,
	"./tg": 92527,
	"./tg.js": 92527,
	"./th": 85862,
	"./th.js": 85862,
	"./tk": 79331,
	"./tk.js": 79331,
	"./tl-ph": 44387,
	"./tl-ph.js": 44387,
	"./tlh": 3592,
	"./tlh.js": 3592,
	"./tr": 79732,
	"./tr.js": 79732,
	"./tzl": 99570,
	"./tzl.js": 99570,
	"./tzm": 83553,
	"./tzm-latn": 7699,
	"./tzm-latn.js": 7699,
	"./tzm.js": 83553,
	"./ug-cn": 25674,
	"./ug-cn.js": 25674,
	"./uk": 69974,
	"./uk.js": 69974,
	"./ur": 45773,
	"./ur.js": 45773,
	"./uz": 357,
	"./uz-latn": 77135,
	"./uz-latn.js": 77135,
	"./uz.js": 357,
	"./vi": 20043,
	"./vi.js": 20043,
	"./x-pseudo": 40767,
	"./x-pseudo.js": 40767,
	"./yo": 80150,
	"./yo.js": 80150,
	"./zh-cn": 21828,
	"./zh-cn.js": 21828,
	"./zh-hk": 86644,
	"./zh-hk.js": 86644,
	"./zh-mo": 79305,
	"./zh-mo.js": 79305,
	"./zh-tw": 31860,
	"./zh-tw.js": 31860
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
webpackContext.id = 35358;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(84429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map