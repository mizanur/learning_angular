'use strict';

//Directives and Services are injected (dependencies) into Controllers

var directives = angular.module('guthub.directives', []);

directives.directive('butterbar', ['$rootScope',                //directives $rootScope
    function($rootScope) {
      return {
        link: function(scope, element, attrs) {
          element.addClass('hide');

          $rootScope.$on('$routeChangeStart', function() {      //event listener added to the scope
            element.removeClass('hide');
          });

          $rootScope.$on('$routeChangeSuccess', function() {
            element.addClass('hide');
          });
        }
      };
    }
]);

directives.directive('focus',
    function() {
      return {
        link: function(scope, element, attrs) {
          element[0].focus();
        }
      };
    }
);
