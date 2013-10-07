'use strict';

//Directives and Services are injected (dependencies) into Controllers

var services = angular.module('guthub.services',
    ['ngResource']); //loading ngResource - and naming it as guthub.services, and assigning it as services variable

// Angular Services 1 - instantiated: $resource - for RESTful resources
services.factory('Recipe', ['$resource',                //Recipe service
    function($resource) {
        return $resource('/recipes/:id', {id: '@id'}); // R
}]);

// Angular Services 2 - instantiated: $resource - for RESTful resources
services.factory('MultiRecipeLoader', ['Recipe', '$q',
    function(Recipe, $q) {
      return function() {
        var delay = $q.defer();

        Recipe.query(function(recipes) {
          delay.resolve(recipes);
        }, function() {
          delay.reject('Unable to fetch recipes');
        });

         return delay.promise;
      };
}]);

// Angular Services 3 - instantiated: $resource - for RESTful resources
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
