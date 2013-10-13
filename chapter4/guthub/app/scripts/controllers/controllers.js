'use strict';

//DATA: are in web-server.js - monkey patched

var app = angular.module('guthub',
    //the directive names and services names aren't fvile names. They are the names provided during the syntax call for directive and services
    ['guthub.directives', 'guthub.services']);  //services and directives dependencies

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {
        controller: 'ListCtrl',
        resolve: {
          recipes: ["MultiRecipeLoader", function(MultiRecipeLoader) {
            return MultiRecipeLoader();
          }]
        },
        templateUrl:'/views/list.html'
      }).when('/edit/:recipeId', {
        controller: 'EditCtrl',
        resolve: {
          recipe: ["RecipeLoader", function(RecipeLoader) {
            return RecipeLoader();
          }]
        },
        templateUrl:'/views/recipeForm.html'
      }).when('/view/:recipeId', {
        controller: 'ViewCtrl',
        resolve: {
          recipe: ["RecipeLoader", function(RecipeLoader) {
            return RecipeLoader();
          }]
        },
        templateUrl:'/views/viewRecipe.html'
      }).when('/new', {
        controller: 'NewCtrl',
        templateUrl:'/views/recipeForm.html'
      }).otherwise({redirectTo:'/'});\
}]);

//list controller: responsible for displaying all the recipes in the system
app.controller('ListCtrl', ['$scope', 'recipes',
    function($scope, recipes) {
        $scope.recipes = recipes;
    }
]);

//view controller: has edit function exposed on the scope - that changes location of the address bar
app.controller('ViewCtrl', ['$scope', '$location', 'recipe',
    function($scope, $location, recipe) {
        $scope.recipe = recipe;

        //the edit function simply points to the form's url - angular detects the url path change and displays the forms
        $scope.edit = function() {
            $location.path('/edit/' + recipe.id);
        };
}]);

//
app.controller('EditCtrl', ['$scope', '$location', 'recipe',
function($scope, $location, recipe) {
    $scope.recipe = recipe;

        $scope.save = function() {
            $scope.recipe.$save(function(recipe) {
                $location.path('/view/' + recipe.id);
            });
        };

        $scope.remove = function() {
            delete $scope.recipe;
            $location.path('/');
        };
}]);

app.controller('NewCtrl', ['$scope', '$location', 'Recipe',
  function($scope, $location, Recipe) {
    $scope.recipe = new Recipe({
        ingredients: [ {} ]
  });

  $scope.save = function() {
    $scope.recipe.$save(function(recipe) {
        $location.path('/view/' + recipe.id);

    });
  };
}]);

app.controller('IngredientsCtrl', ['$scope',
  function($scope) {
  $scope.addIngredient = function() {
    var ingredients = $scope.recipe.ingredients;
    ingredients[ingredients.length] = {};
  };
  $scope.removeIngredient = function(index) {
    $scope.recipe.ingredients.splice(index, 1);
  };
}]);
