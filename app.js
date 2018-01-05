(function() {
  "use strict";

  angular
    .module("xebia", ["ui.router"])
    .config(config)
    .constant("SWAPI_END_POINT", {
      url: "https://swapi.co/api/"
    });

  function config($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push("interceptor");

    // set up routes
    $stateProvider
      .state({
        name: "login",
        url: "/login",
        templateUrl: "pages/login/login.html",
        controller: "LoginController as login"
      })
      .state({
        name: "search",
        url: "/search",
        params: { name: null },
        templateUrl: "pages/search/search.html",
        controller: "SearchController as search"
      });
    $urlRouterProvider.otherwise("login");
  }
})();
