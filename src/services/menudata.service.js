(function () {
  "use strict";

  angular.module("MenuApp").service("MenuDataService", MenuDataService);

  MenuDataService.$inject = ["$q", "$timeout", "$http"];
  function MenuDataService($q, $timeout, $http) {
    var service = this;

    // List of shopping items
    var items = [];

    service.getAllCategories = function () {
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/categories.json",
      }).then(function (result) {
        // process result and only keep items that match
        var categoriesData = result.data;
        return categoriesData;
      });
    };

    service.getItemsForCategory = function (categoryShortName) {
      return $http({
        method: "GET",
        url: `https://davids-restaurant.herokuapp.com/menu_items.json?category=${categoryShortName}`,
      }).then(function (result) {
        // process result and only keep items that match
        var items = result.data;
        return items;
      });
    };

    // Simulates call to server
    // Returns a promise, NOT items array directly
    // service.getItems = function () {
    //   var deferred = $q.defer();

    //   // Wait 2 seconds before returning
    //   $timeout(function () {
    //     // deferred.reject(items);
    //     deferred.resolve(items);
    //   }, 800);

    //   return deferred.promise;
    // };
  }
})();
