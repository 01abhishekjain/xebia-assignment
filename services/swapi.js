(function() {
  "use strict";

  angular.module("xebia").service("swapi", swapi);
  swapi.$inject = ["$http", "SWAPI_END_POINT", "$q"];

  function swapi($http, SWAPI_END_POINT, $q) {
    var that = this;
    that.auth = auth;
    that.search = search;

    function auth(name, password) {
      var promise = $q.defer();
      $http
        .get(SWAPI_END_POINT.url + "people/?search=" + name)
        .then(function(res) {
          if (!res.data || !res.data.results || !res.data.results.length) promise.reject("The user does not exist.");
          else {
            var user = res.data.results.find(function(character) {
              return character.name.toLowerCase() === name.toLowerCase();
            });
            if (!user) promise.reject("The user does not exist.");
            else if (user.birth_year !== password) promise.reject("Incorrect password!");
            else promise.resolve();
          }
        })
        .catch(function(err) {
          console.log("err: ", err);
          promise.reject("Something went wrong. Please try again later.");
        });

      return promise.promise;
    }

    function search(keyword) {
      return $http.get(SWAPI_END_POINT.url + "planets/?search=" + keyword);
    }
  }
})();
