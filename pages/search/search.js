(function() {
  "use strict";

  angular.module("xebia").controller("SearchController", SearchController);
  SearchController.$inject = ["swapi", "$stateParams", "$state"];

  function SearchController(swapi, $stateParams, $state) {
    var vm = this;
    vm.search = search;
    vm.user = $stateParams.name;
    vm.logout = logout;

    var requestTimes = [];
    var MAX_IN_A_MINUTE = 15;

    function logout() {
      $state.go("login");
    }

    function search() {
      if (requestTimes.length === MAX_IN_A_MINUTE && !minuteElapsed() && vm.user.toLowerCase() !== "luke skywalker") {
        vm.keyword = vm.keyword.substr(0, vm.keyword.length - 1); // trim the most recently typed character
        return alert("Please wait a while before trying again");
      } else {
        if (requestTimes.length === MAX_IN_A_MINUTE) requestTimes.shift(); // the array will only hold latest 15 request times
        requestTimes.push(new Date().getTime());
      }

      swapi
        .search(vm.keyword)
        .then(showResults)
        .catch(function(err) {
          alert(err);
        });
    }

    function showResults(res) {
      if (res.data && res.data.results) {
        vm.planets = res.data.results;
      }
    }

    function minuteElapsed() {
      var currentTime = new Date().getTime();
      var elapsedSeconds = (currentTime - requestTimes[0]) / 1000;
      return elapsedSeconds > 60;
    }
  }
})();
