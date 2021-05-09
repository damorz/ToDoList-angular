(function () {
  'use strict';

  angular.module("TaskApp", ["ui.router"])
  .controller("mainController", mainController);

  mainController.$inject = ['$scope','$location'];
  function mainController($scope, $location) {
    $scope.isCalendarPage = function () {
      if ($location.path() === '/calendar') {
        return true;
      }
      return false;
    }
  }
})();
