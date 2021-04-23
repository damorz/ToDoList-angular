(function () {
  angular.module("MenuApp").config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to tab 1 if no other URL matches
    $urlRouterProvider.otherwise("/");

    // Set up UI states
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "src/templates/home.template.html",
      })

      .state("categories", {
        url: '/categories',
        templateUrl:'src/templates/main-categories.template.html',
        controller: 'MainCategoriesController as mainCategoriesList',
        resolve: {
          items: [
            "MenuDataService",
            function (MenuDataService) {
              return MenuDataService.getAllCategories();
            },
          ],
        },
      })

      .state("items", {
        url: "/{categoryShortName}/items",
        templateUrl: "src/templates/items.template.html",
        controller: "ItemsController as itemsList",
        resolve: {
            items: [
              "MenuDataService", "$stateParams",
              function (MenuDataService, $stateParams) {
                return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
              },
            ],
          },
      });
  }
})();
