//Declares an app level module which depends on filters and services
var myApp = angular.module('cheaperChoice', [
	'ui.router', 
	'cheaperChoice.services'
  	// 'cheaperChoice.controllers'
]);

myApp.config(function($stateProvider, $urlRouterProvider) {
	// for any unmatched url, redirect to /homepage
	$urlRouterProvider.otherwise('/homepage');
	$stateProvider
		.state('homepage', {
			url: "/homepage",
			templateUrl: "static/partials/homepage.html" 

		})
		.state('results', {
			url: "/results", 
			templateUrl: "static/partials/results.html"
		});
});