(function () {
  "use strict";

  angular.module("MenuApp").controller("ItemsController", ItemsController);

  ItemsController.$inject = ["$stateParams", "MenuDataService", "items"];
  function ItemsController($stateParams, MenuDataService, items) {
    var categoriesItems = this;
    categoriesItems.shortName = $stateParams.categoryShortName;
    categoriesItems.menuItem = items.menu_items;
    categoriesItems.categoryName = items.category.name;
    console.log(categoriesItems.menuItem);
  }
})();
