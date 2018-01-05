(function() {
  "use strict";

  angular.module("xebia").service("interceptor", interceptor);
  interceptor.$inject = [];

  function interceptor() {
    var that = this;
    that.request = outBound;
    that.requestError = inBound;
    that.response = inBound;
    that.responseError = inBound;
  }

  function outBound(conf) {
    showLoader();
    return conf;
  }
  function inBound(conf) {
    hideLoader();
    return conf;
  }

  function showLoader() {
    document.getElementById("progress").style.display = "block";
  }

  function hideLoader() {
    document.getElementById("progress").style.display = "none";
  }
})();
