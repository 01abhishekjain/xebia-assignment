(function() {
  "use strict";

  angular.module("xebia").controller("LoginController", LoginController);
  LoginController.$inject = ["swapi", "$state"];
  function LoginController(swapi, $state) {
    var vm = this;

    vm.login = login;

    function login() {
      swapi
        .auth(vm.name, vm.password)
        .then(login_success)
        .catch(login_failure);
    }

    function login_success() {
      $state.go("search", { name: vm.name });
    }
    function login_failure(err) {
      alert(err);
    }
  }
})();
