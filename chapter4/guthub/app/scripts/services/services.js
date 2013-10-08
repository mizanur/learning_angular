'use strict';

//Directives and Services are injected (dependencies) into Controllers

var services = angular.module('guthub.services',
    ['ngResource']); //loading ngResource - and naming it as guthub.services, and assigning it as services variable

// Angular Services 1 - instantiated: $resource - for RESTful resources  - .get(), .save(), .query(), .remote(), .delete()

services.factory('Recipe', ['$resource',                //Recipe service
    function($resource) {
        return $resource('/recipes/:id', {id: '@id'});
    }
]);

//The next two services (2 and 3) are loaders - used to hook up with the routes - multi-page display

// Angular Services 2 - instantiated:
// Loads Multiple Recipes

services.factory('MultiRecipeLoader', ['Recipe', '$q',  //STEP 1: $q < deferred object , angular js promises used for chaining asynchronous functions
    function(Recipe, $q) {
      return function() {
        var delay = $q.defer();

        Recipe.query(function(recipes) {
          delay.resolve(recipes);       //STEP 3: Resolve the deferred object when the server returns the value
        }, function() {
          delay.reject('Unable to fetch recipes');
        });

         return delay.promise;
      };
    }
]);

// Angular Services 3 - instantiated:
//Loads single Recipes

services.factory('RecipeLoader', ['Recipe', '$route', '$q',
    function(Recipe, $route, $q) {
    return function() {

        var delay = $q.defer();
        Recipe.get({id: $route.current.params.recipeId}, function(recipe) {
            delay.resolve(recipe);
        }, function() {
                delay.reject('Unable to fetch recipe '  + $route.current.params.recipeId);
           });

        return delay.promise;
    };
}]);
