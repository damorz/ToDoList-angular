(function () {
  angular.module("TaskApp").config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to tab 1 if no other URL matches
    $urlRouterProvider.otherwise("/");

    // Set up UI states
    $stateProvider
      .state("task", {
        url: "/",
        templateUrl: "src/templates/task.template.html",
        controller: "TaskController as taskCtrl",
      })

      .state("history", {
        url: "/history",
        templateUrl: "src/templates/history.template.html",
        controller: "HistoryController as historyCtrl",
      })

      .state("about", {
        url: "/about",
        templateUrl: "src/templates/about.template.html",
      })
  }
})();
